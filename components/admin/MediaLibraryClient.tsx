'use client';

import { useState, useTransition, useCallback, useRef, useEffect, useMemo, memo } from 'react';
import Image from 'next/image';
import { CameraUpload } from './CameraUpload';
import { Trash2, Copy, X, Link2, ImageIcon, Zap, Loader2, CheckCircle2, AlertTriangle, Search } from 'lucide-react';
import { notify } from '@/lib/notify';
import { deleteMedia, updateMediaMetadata } from '@/actions/media';
import { swapBlobUrl } from '@/actions/blob-optimize';
import imageCompression from 'browser-image-compression';
import { BengalButton } from '@/components/bengal';
import type { MediaAsset } from '@/db/schema';
import type { MediaUsage } from '@/actions/media';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useVirtualizer } from '@tanstack/react-virtual';

function formatBytes(bytes: number | null | undefined) {
  if (!bytes) return '—';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatMime(mime: string | null | undefined, filename?: string | null) {
  if (mime && mime !== 'unknown') return mime.replace('image/', '').toUpperCase();
  const ext = (filename || '').split('.').pop()?.toLowerCase();
  if (ext === 'webp') return 'WEBP';
  if (ext === 'avif') return 'AVIF';
  if (ext === 'png') return 'PNG';
  if (ext === 'jpg' || ext === 'jpeg') return 'JPEG';
  return 'IMG';
}

function isOptimized(asset: MediaAsset) {
  const mime = asset.mime_type?.toLowerCase() || '';
  const filename = asset.filename?.toLowerCase() || asset.url?.toLowerCase() || '';
  return mime === 'image/webp' || mime === 'image/avif' || filename.endsWith('.webp') || filename.endsWith('.avif');
}

function isBlobUrl(url: string) {
  return url.startsWith('https://') || url.startsWith('http://');
}

function toFullUrl(url: string) {
  if (isBlobUrl(url)) return url;
  return `${window.location.origin}${url.startsWith('/') ? '' : '/'}${url}`;
}

const MAX_UPLOAD_MB = 4;
const COMPRESSION_OPTIONS = {
  maxSizeMB: 2,
  maxWidthOrHeight: 2400,
  useWebWorker: true,
  initialQuality: 0.85,
  fileType: 'image/webp' as const,
  preserveExif: true,
};

function uploadViaXhr(
  file: File,
  pathname: string,
  onProgress?: (pct: number) => void,
  options?: { skipRecord?: boolean },
): Promise<{ url: string }> {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('pathname', pathname);
    if (options?.skipRecord) formData.append('skipRecord', '1');

    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable && onProgress) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    });

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try { resolve(JSON.parse(xhr.responseText)); }
        catch { reject(new Error('Invalid server response')); }
      } else if (xhr.status === 413) {
        reject(new Error('File too large — the server rejected the upload. Try a smaller image.'));
      } else {
        try {
          const body = JSON.parse(xhr.responseText);
          reject(new Error(body.error || `Upload failed (HTTP ${xhr.status})`));
        } catch { reject(new Error(`Upload failed (HTTP ${xhr.status})`)); }
      }
    });

    xhr.addEventListener('error', () => reject(new Error('Network error — check your connection and try again')));
    xhr.addEventListener('abort', () => reject(new Error('Upload cancelled')));

    xhr.open('POST', '/api/upload-file');
    xhr.send(formData);
  });
}

type OptStatus = 'idle' | 'compressing' | 'uploading' | 'swapping' | 'done' | 'skipped' | 'error';
type FilterMode = 'all' | 'optimized' | 'unoptimized' | 'unlinked';

/** Responsive column count based on container width */
function useColumns(containerRef: React.RefObject<HTMLDivElement | null>, hasSidebar: boolean) {
  const [cols, setCols] = useState(2);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const w = el.clientWidth;
      // Responsive breakpoints for the grid container
      if (w >= 1200) setCols(hasSidebar ? 5 : 6);
      else if (w >= 900) setCols(hasSidebar ? 4 : 5);
      else if (w >= 600) setCols(4);
      else if (w >= 400) setCols(3);
      else setCols(2);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [containerRef, hasSidebar]);

  return cols;
}

export function MediaLibraryClient({
  initialMedia,
  usageMap = {},
}: {
  initialMedia: MediaAsset[];
  usageMap?: Record<string, MediaUsage[]>;
}) {
  const [assets, setAssets] = useState(initialMedia);
  const [selectedAsset, setSelectedAsset] = useState<MediaAsset | null>(null);
  const [isPending, startTransition] = useTransition();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState<FilterMode>('all');

  // Optimization state
  const [optStatuses, setOptStatuses] = useState<Map<string, OptStatus>>(new Map());
  const [optPercents, setOptPercents] = useState<Map<string, number>>(new Map());
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optProgress, setOptProgress] = useState({ done: 0, total: 0, savedBytes: 0 });

  // Cleanup state
  const [isCleaning, setIsCleaning] = useState(false);
  const [cleanProgress, setCleanProgress] = useState({ done: 0, total: 0, freedBytes: 0 });

  // Virtualization
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cols = useColumns(gridContainerRef, !!selectedAsset);

  // Filtered + searched assets
  const filteredAssets = useMemo(() => {
    let result = assets;

    if (filterMode === 'optimized') result = result.filter(a => isOptimized(a));
    else if (filterMode === 'unoptimized') result = result.filter(a => !isOptimized(a));
    else if (filterMode === 'unlinked') result = result.filter(a => !(usageMap[a.url]?.length));

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(a =>
        (a.filename || '').toLowerCase().includes(q) ||
        (a.alt_en || '').toLowerCase().includes(q) ||
        (a.tags || '').toLowerCase().includes(q)
      );
    }

    return result;
  }, [assets, filterMode, searchQuery, usageMap]);

  const unoptimizedAssets = assets.filter(a => !isOptimized(a));
  const unoptimizedCount = unoptimizedAssets.length;

  // Virtual grid: items arranged in rows
  const rowCount = Math.ceil(filteredAssets.length / cols);
  const GAP = 12;
  // Each card: image (aspect-square) + footer (~40px) + gap
  const ROW_HEIGHT = 220; // approximate, accounts for image + metadata footer

  const virtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => scrollContainerRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 3,
  });

  const unlinkedCount = assets.filter(a => !(usageMap[a.url]?.length)).length;

  const handleCleanup = useCallback(async () => {
    const unlinked = assets.filter(a => !(usageMap[a.url]?.length));
    if (unlinked.length === 0) return;
    if (!window.confirm(`Delete ${unlinked.length} unlinked media asset${unlinked.length > 1 ? 's' : ''} and their blobs? This cannot be undone.`)) return;

    setIsCleaning(true);
    setCleanProgress({ done: 0, total: unlinked.length, freedBytes: 0 });

    let freedBytes = 0;
    let deleted = 0;

    for (const asset of unlinked) {
      try {
        await deleteMedia(asset.id);
        freedBytes += asset.size_bytes ?? 0;
        deleted++;
        setAssets(prev => prev.filter(a => a.id !== asset.id));
      } catch {
        // continue with next
      }
      setCleanProgress({ done: deleted, total: unlinked.length, freedBytes });
    }

    setSelectedAsset(prev => {
      if (prev && !(usageMap[prev.url]?.length)) return null;
      return prev;
    });

    if (deleted > 0) {
      notify.success('media', 'deleted', `Removed ${deleted} unlinked assets — ${formatBytes(freedBytes)} freed`);
    }
    setIsCleaning(false);
  }, [assets, usageMap]);

  const setOptStatus = (url: string, status: OptStatus) => {
    setOptStatuses(prev => {
      const next = new Map(prev);
      next.set(url, status);
      return next;
    });
  };

  const setOptPercent = (url: string, pct: number) => {
    setOptPercents(prev => {
      const next = new Map(prev);
      next.set(url, pct);
      return next;
    });
  };

  const optimizeOne = async (asset: MediaAsset): Promise<number> => {
    const { url } = asset;
    try {
      setOptStatus(url, 'compressing');
      setOptPercent(url, 0);

      const fetchUrl = isBlobUrl(url) ? url : toFullUrl(url);
      const response = await fetch(fetchUrl);
      if (!response.ok) {
        setOptStatus(url, 'error');
        return 0;
      }

      const blob = await response.blob();
      const originalSize = blob.size;
      const alreadyWebp = blob.type === 'image/webp' || url.toLowerCase().endsWith('.webp');

      if (alreadyWebp) {
        setOptStatus(url, 'skipped');
        return 0;
      }

      const file = new File([blob], 'image.jpg', { type: blob.type || 'image/jpeg' });
      const compressed = await imageCompression(file, {
        ...COMPRESSION_OPTIONS,
        onProgress: (pct: number) => setOptPercent(url, Math.round(pct * 0.7)),
      });

      // Guard: reject if compressed file still exceeds Vercel's body limit
      const compressedMB = compressed.size / (1024 * 1024);
      if (compressedMB > MAX_UPLOAD_MB) {
        setOptStatus(url, 'error');
        return 0;
      }

      setOptStatus(url, 'uploading');
      setOptPercent(url, 70);

      const pathSegments = url.split('/');
      const oldName = pathSegments[pathSegments.length - 1] || 'image';
      const baseName = oldName.replace(/\.[^.]+$/, '').replace(/[^a-zA-Z0-9.-]/g, '_');
      const blobPath = `optimized/${Date.now()}-${baseName}.webp`;

      const newBlob = await uploadViaXhr(
        new File([compressed], `${baseName}.webp`, { type: 'image/webp' }),
        blobPath,
        (uploadPct) => setOptPercent(url, Math.round(70 + uploadPct * 0.2)),
        { skipRecord: true },
      );

      setOptStatus(url, 'swapping');
      setOptPercent(url, 90);
      await swapBlobUrl(url, newBlob.url, compressed.size, blobPath);

      setAssets(prev => prev.map(a =>
        a.url === url ? { ...a, url: newBlob.url, mime_type: 'image/webp', size_bytes: compressed.size, filename: blobPath } : a
      ));

      setOptStatus(url, 'done');
      setOptPercent(url, 100);
      return originalSize - compressed.size;
    } catch {
      setOptStatus(url, 'error');
      return 0;
    }
  };

  const optimizeAll = useCallback(async () => {
    if (unoptimizedAssets.length === 0) return;
    setIsOptimizing(true);
    setOptProgress({ done: 0, total: unoptimizedAssets.length, savedBytes: 0 });

    let totalSaved = 0;
    let completed = 0;
    const queue = [...unoptimizedAssets];

    const workers = Array.from({ length: 2 }, async () => {
      while (queue.length > 0) {
        const asset = queue.shift();
        if (!asset) break;
        const saved = await optimizeOne(asset);
        totalSaved += saved;
        completed++;
        setOptProgress({ done: completed, total: unoptimizedAssets.length, savedBytes: totalSaved });
      }
    });

    await Promise.all(workers);
    setIsOptimizing(false);

    const skippedCount = unoptimizedAssets.filter(a => optStatuses.get(a.url) === 'skipped' || (optStatuses.get(a.url) !== 'done' && optStatuses.get(a.url) !== 'error')).length;
    if (totalSaved > 0) {
      notify.success('media', 'updated', `Optimization complete — ${formatBytes(totalSaved)} saved`);
    } else if (skippedCount > 0) {
      notify.info(`${skippedCount} image${skippedCount > 1 ? 's' : ''} skipped — already small or compression wouldn't help`);
    } else {
      notify.info('No images needed optimization');
    }
  }, [unoptimizedAssets, optStatuses]);

  const handleUpload = async (url: string) => {
    const filename = url.split('/').pop() || 'uploaded-image.webp';
    const tempAsset: MediaAsset = {
      id: Date.now(), url, filename,
      alt_en: null, alt_bn: null, mime_type: 'image/webp',
      size_bytes: null, width: null, height: null, tags: null, created_at: new Date(),
    };
    setAssets(prev => [tempAsset, ...prev]);
    notify.success('media', 'uploaded');
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(toFullUrl(url));
    notify.info('URL copied to clipboard');
  };

  const handleDelete = (id: number) => {
    if (!window.confirm('Are you sure you want to delete this media?')) return;
    startTransition(async () => {
      try {
        await deleteMedia(id);
        setAssets(prev => prev.filter(a => a.id !== id));
        setSelectedAsset(null);
        notify.success('media', 'deleted');
      } catch (err) {
        notify.error('media', 'deleted', err);
      }
    });
  };

  const handleUpdateMeta = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedAsset) return;
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      try {
        await updateMediaMetadata(selectedAsset.id, formData);
        notify.success('media', 'updated');
        setAssets(prev => prev.map(a =>
          a.id === selectedAsset.id ? {
            ...a,
            alt_en: formData.get('alt_en') as string,
            tags: formData.get('tags') as string,
          } : a
        ));
      } catch {
        notify.error('media', 'updated');
      }
    });
  };

  const selectedUsage = selectedAsset ? (usageMap[selectedAsset.url] || []) : [];

  const FILTERS: { key: FilterMode; label: string }[] = [
    { key: 'all', label: `All (${assets.length})` },
    { key: 'unoptimized', label: `Unoptimized (${unoptimizedCount})` },
    { key: 'optimized', label: `Optimized (${assets.length - unoptimizedCount})` },
    { key: 'unlinked', label: `Unlinked (${unlinkedCount})` },
  ];

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* ─── Grid ─── */}
        <div
          ref={gridContainerRef}
          className={cn("bg-card p-4 md:p-6 rounded-2xl border border-border transition-all flex flex-col", selectedAsset ? "lg:col-span-3" : "lg:col-span-4")}
        >
          {/* Toolbar */}
          <div className="flex items-center justify-between gap-2 mb-3 shrink-0">
            <h3 className="font-sans font-semibold tracking-tight text-lg md:text-xl text-foreground shrink-0">All Media</h3>
            <div className="flex items-center gap-1.5 md:gap-2">
              {unlinkedCount > 0 && (
                <button
                  onClick={handleCleanup}
                  disabled={isCleaning}
                  className={cn(
                    "inline-flex items-center gap-1 px-2 py-1.5 md:px-3 md:py-2 rounded-lg md:rounded-xl text-[10px] md:text-xs font-medium transition-all",
                    isCleaning
                      ? "bg-red-500/10 text-red-600 cursor-wait"
                      : "bg-red-500/10 text-red-700 hover:bg-red-500/20 dark:text-red-400 cursor-pointer"
                  )}
                >
                  {isCleaning ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} />}
                  <span className="hidden sm:inline">{isCleaning ? `${cleanProgress.done}/${cleanProgress.total}` : `Clean Up`}</span>
                  <span className="tabular-nums">{isCleaning ? '' : unlinkedCount}</span>
                </button>
              )}
              {unoptimizedCount > 0 && (
                <button
                  onClick={optimizeAll}
                  disabled={isOptimizing}
                  className={cn(
                    "inline-flex items-center gap-1 px-2 py-1.5 md:px-3 md:py-2 rounded-lg md:rounded-xl text-[10px] md:text-xs font-medium transition-all",
                    isOptimizing
                      ? "bg-amber-500/10 text-amber-600 cursor-wait"
                      : "bg-amber-500/10 text-amber-700 hover:bg-amber-500/20 dark:text-amber-400 cursor-pointer"
                  )}
                >
                  {isOptimizing ? <Loader2 size={12} className="animate-spin" /> : <Zap size={12} />}
                  <span className="hidden sm:inline">{isOptimizing ? `${optProgress.done}/${optProgress.total}` : `Optimize`}</span>
                  <span className="tabular-nums">{isOptimizing ? '' : unoptimizedCount}</span>
                </button>
              )}
              <div className="w-24 md:w-32 shrink-0">
                <CameraUpload onUpload={handleUpload} compact pathPrefix="media" />
              </div>
            </div>
          </div>

          {/* Search + Filter bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-3 shrink-0">
            <div className="relative flex-1 min-w-0">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, alt, tags..."
                className="w-full text-xs md:text-sm pl-8 pr-3 py-1.5 md:py-2 rounded-lg md:rounded-xl border border-border bg-transparent cursor-text focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div className="flex gap-1 overflow-x-auto [&::-webkit-scrollbar]:hidden">
              {FILTERS.map(f => (
                <button
                  key={f.key}
                  onClick={() => setFilterMode(f.key)}
                  className={cn(
                    "px-2 py-1 md:px-2.5 md:py-1.5 rounded-md md:rounded-lg text-[10px] md:text-[11px] font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0",
                    filterMode === f.key
                      ? "bg-foreground text-background"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Progress bars */}
          {(isOptimizing || isCleaning) && (
            <div className="mb-3 space-y-2 shrink-0">
              {isOptimizing && (
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] md:text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1"><Zap size={10} className="text-amber-500" /> Optimizing {optProgress.done}/{optProgress.total}</span>
                    <span className="text-green-600 font-medium">{formatBytes(optProgress.savedBytes)} saved</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1 overflow-hidden">
                    <div className="h-full bg-green-500 transition-all duration-300" style={{ width: `${optProgress.total > 0 ? (optProgress.done / optProgress.total) * 100 : 0}%` }} />
                  </div>
                </div>
              )}
              {isCleaning && (
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] md:text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1"><Trash2 size={10} className="text-red-500" /> Cleaning {cleanProgress.done}/{cleanProgress.total}</span>
                    <span className="text-red-600 font-medium">{formatBytes(cleanProgress.freedBytes)} freed</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1 overflow-hidden">
                    <div className="h-full bg-red-500 transition-all duration-300" style={{ width: `${cleanProgress.total > 0 ? (cleanProgress.done / cleanProgress.total) * 100 : 0}%` }} />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Virtualized Grid */}
          {filteredAssets.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-border rounded-xl">
              <p className="text-muted-foreground text-sm">
                {assets.length === 0 ? 'No media uploaded yet.' : 'No results match your filters.'}
              </p>
            </div>
          ) : (
            <div
              ref={scrollContainerRef}
              className="flex-1 overflow-y-auto min-h-0"
              style={{ maxHeight: 'calc(100vh - 320px)' }}
            >
              <div
                className="relative w-full"
                style={{ height: `${virtualizer.getTotalSize()}px` }}
              >
                {virtualizer.getVirtualItems().map(virtualRow => {
                  const startIdx = virtualRow.index * cols;
                  const rowAssets = filteredAssets.slice(startIdx, startIdx + cols);

                  return (
                    <div
                      key={virtualRow.key}
                      className="absolute top-0 left-0 w-full"
                      style={{
                        height: `${virtualRow.size}px`,
                        transform: `translateY(${virtualRow.start}px)`,
                      }}
                    >
                      <div
                        className="grid h-full"
                        style={{
                          gridTemplateColumns: `repeat(${cols}, 1fr)`,
                          gap: `${GAP}px`,
                          paddingBottom: `${GAP}px`,
                        }}
                      >
                        {rowAssets.map(asset => (
                          <MediaCard
                            key={asset.id}
                            asset={asset}
                            isSelected={selectedAsset?.id === asset.id}
                            isLinked={(usageMap[asset.url] || []).length > 0}
                            linkCount={(usageMap[asset.url] || []).length}
                            optimized={isOptimized(asset)}
                            optStatus={optStatuses.get(asset.url)}
                            optPercent={optPercents.get(asset.url)}
                            onSelect={() => setSelectedAsset(asset)}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* Scroll status */}
              <div className="sticky bottom-0 py-2 text-center">
                <span className="text-[10px] text-muted-foreground bg-card/80 px-3 py-1 rounded-full">
                  {filteredAssets.length} assets{filteredAssets.length !== assets.length ? ` (filtered from ${assets.length})` : ''}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* ─── Desktop Sidebar ─── */}
        {selectedAsset && (
          <div className="hidden lg:block bg-card text-card-foreground p-6 rounded-2xl border border-border lg:col-span-1 shadow-sm sticky top-24 h-[calc(100vh-120px)] overflow-y-auto">
            <DetailContent
              asset={selectedAsset}
              usage={selectedUsage}
              isPending={isPending}
              isOptimized={isOptimized(selectedAsset)}
              onClose={() => setSelectedAsset(null)}
              onDelete={handleDelete}
              onCopy={copyUrl}
              onSubmit={handleUpdateMeta}
            />
          </div>
        )}
      </div>

      {/* ─── Mobile Bottom Sheet ─── */}
      <AnimatePresence>
        {selectedAsset && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-50 lg:hidden cursor-pointer"
              onClick={() => setSelectedAsset(null)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-card rounded-t-2xl border-t border-border shadow-2xl max-h-[85vh] flex flex-col"
            >
              <div className="flex justify-center pt-3 pb-1 shrink-0 cursor-grab active:cursor-grabbing" onClick={() => setSelectedAsset(null)}>
                <div className="w-10 h-1 bg-muted-foreground/30 rounded-full" />
              </div>
              <div className="overflow-y-auto px-5 pb-8 pt-2 flex-1 overscroll-contain">
                <DetailContent
                  asset={selectedAsset}
                  usage={selectedUsage}
                  isPending={isPending}
                  isOptimized={isOptimized(selectedAsset)}
                  onClose={() => setSelectedAsset(null)}
                  onDelete={handleDelete}
                  onCopy={copyUrl}
                  onSubmit={handleUpdateMeta}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─── Media Card (memoized for virtualization) ─── */
const MediaCard = memo(function MediaCard({
  asset,
  isSelected,
  isLinked,
  linkCount,
  optimized,
  optStatus,
  optPercent,
  onSelect,
}: {
  asset: MediaAsset;
  isSelected: boolean;
  isLinked: boolean;
  linkCount: number;
  optimized: boolean;
  optStatus?: OptStatus;
  optPercent?: number;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "relative rounded-xl overflow-hidden border-2 transition-all hover:shadow-md text-left group cursor-pointer",
        isSelected ? "border-primary shadow-lg" : "border-transparent hover:border-border"
      )}
    >
      <div className="relative aspect-square bg-muted">
        <Image src={asset.url} alt={asset.alt_en || 'Media'} fill className="object-cover" sizes="(max-width: 768px) 33vw, 20vw" />

        {/* Format badge */}
        <span className={cn(
          "absolute top-1.5 left-1.5 text-[9px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded-md",
          optimized ? "bg-green-600/80 text-white" : "bg-amber-600/80 text-white"
        )}>
          {formatMime(asset.mime_type, asset.filename || asset.url)}
        </span>

        {/* Linked indicator */}
        {isLinked && (
          <span className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-green-500/90 flex items-center justify-center" title={`Used by ${linkCount} entity`}>
            <Link2 size={10} className="text-white" />
          </span>
        )}

        {/* Optimization overlay */}
        {optStatus && !['idle', 'done', 'skipped', 'error'].includes(optStatus) && (
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-1.5">
            <Loader2 size={16} className="text-white animate-spin" />
            <span className="text-[9px] text-white/90 uppercase tracking-wider font-medium">{optStatus}</span>
            {optPercent != null && (
              <div className="w-3/4 bg-white/20 rounded-full h-1 overflow-hidden">
                <div className="h-full bg-white/80 transition-all duration-200" style={{ width: `${optPercent}%` }} />
              </div>
            )}
          </div>
        )}
        {optStatus === 'done' && (
          <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center pointer-events-none">
            <CheckCircle2 size={24} className="text-green-500 drop-shadow-md" />
          </div>
        )}
        {optStatus === 'error' && (
          <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center pointer-events-none">
            <AlertTriangle size={20} className="text-red-500 drop-shadow-md" />
          </div>
        )}
      </div>

      {/* Metadata footer */}
      <div className="px-2 py-1.5 bg-card border-t border-border">
        <p className="text-[10px] text-foreground/70 truncate font-medium">
          {asset.filename?.split('/').pop() || 'untitled'}
        </p>
        <div className="flex items-center justify-between mt-0.5">
          <span className="text-[9px] text-muted-foreground tabular-nums">{formatBytes(asset.size_bytes)}</span>
          <span className="text-[9px] text-muted-foreground">
            {asset.created_at ? new Date(asset.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }) : ''}
          </span>
        </div>
      </div>
    </button>
  );
});

/* ─── Shared Detail Content ─── */
function DetailContent({
  asset,
  usage,
  isPending,
  isOptimized: optimized,
  onClose,
  onDelete,
  onCopy,
  onSubmit,
}: {
  asset: MediaAsset;
  usage: MediaUsage[];
  isPending: boolean;
  isOptimized: boolean;
  onClose: () => void;
  onDelete: (id: number) => void;
  onCopy: (url: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <h4 className="font-sans font-semibold tracking-tight text-lg text-foreground">Asset Details</h4>
          {optimized ? (
            <span className="text-[9px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded-md bg-green-500/15 text-green-600">Optimized</span>
          ) : (
            <span className="text-[9px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded-md bg-amber-500/15 text-amber-600">Unoptimized</span>
          )}
        </div>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
          <X size={18} />
        </button>
      </div>

      <div className="relative aspect-video lg:aspect-square w-full rounded-xl overflow-hidden bg-muted mb-4 border border-border">
        <Image src={asset.url} alt={asset.alt_en || 'Selected'} fill className="object-contain" sizes="(max-width: 1024px) 100vw, 25vw" />
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        <MetaItem label="Filename" value={asset.filename?.split('/').pop() || '—'} />
        <MetaItem label="Folder" value={asset.filename?.includes('/') ? asset.filename.split('/').slice(0, -1).join('/') : 'root'} />
        <MetaItem label="Format" value={asset.mime_type && asset.mime_type !== 'unknown' ? asset.mime_type : formatMime(asset.mime_type, asset.filename || asset.url)} />
        <MetaItem label="Size" value={formatBytes(asset.size_bytes)} />
        <MetaItem label="Dimensions" value={asset.width && asset.height ? `${asset.width} × ${asset.height}` : '—'} />
        <MetaItem label="Uploaded" value={asset.created_at ? new Date(asset.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'} />
        <MetaItem label="Alt Text" value={asset.alt_en || '—'} span2 />
        <MetaItem label="Tags" value={asset.tags || '—'} span2 />
      </div>

      {usage.length > 0 && (
        <div className="mb-4">
          <p className="text-[10px] tracking-widest uppercase font-medium text-muted-foreground mb-2">Used by</p>
          <div className="flex flex-wrap gap-1.5">
            {usage.map((u, i) => (
              <span
                key={`${u.entity}-${u.id}-${i}`}
                className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-lg bg-primary/8 text-primary font-medium"
              >
                <Link2 size={10} />
                {u.entity}: {u.name}
              </span>
            ))}
          </div>
        </div>
      )}
      {usage.length === 0 && (
        <div className="mb-4 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
          <p className="text-[11px] text-amber-700 dark:text-amber-400 font-medium flex items-center gap-1.5">
            <ImageIcon size={12} />
            Not linked to any entity
          </p>
        </div>
      )}

      <div className="flex gap-2 mb-5">
        <BengalButton type="button" variant="outline" size="sm" className="flex-1 text-xs py-2 cursor-pointer" onClick={() => onCopy(asset.url)}>
          <Copy size={14} className="mr-1.5" /> Copy URL
        </BengalButton>
        <button
          onClick={() => onDelete(asset.id)}
          disabled={isPending}
          className="px-3 border border-destructive/50 text-destructive rounded-xl text-xs hover:bg-destructive/10 transition-colors flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Trash2 size={14} />
        </button>
      </div>

      <hr className="border-border my-4" />

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] tracking-widest uppercase font-medium text-muted-foreground">Alt Text (SEO)</label>
          <input
            name="alt_en"
            defaultValue={asset.alt_en || ''}
            className="w-full text-sm p-2.5 rounded-xl border border-border bg-transparent cursor-text focus:outline-none focus:border-primary transition-colors"
            placeholder="Describe this image..."
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] tracking-widest uppercase font-medium text-muted-foreground">Tags</label>
          <input
            name="tags"
            defaultValue={asset.tags || ''}
            className="w-full text-sm p-2.5 rounded-xl border border-border bg-transparent cursor-text focus:outline-none focus:border-primary transition-colors"
            placeholder="hero, banner, summer..."
          />
        </div>
        <BengalButton type="submit" variant="primary" size="sm" loading={isPending} className="text-xs py-2.5">
          Save Changes
        </BengalButton>
      </form>
    </>
  );
}

function MetaItem({ label, value, span2 }: { label: string; value: string; span2?: boolean }) {
  return (
    <div className={cn("rounded-lg bg-muted/50 px-3 py-2", span2 && "col-span-2")}>
      <p className="text-[9px] tracking-widest uppercase text-muted-foreground mb-0.5">{label}</p>
      <p className="text-xs font-medium text-foreground truncate" title={value}>{value}</p>
    </div>
  );
}
