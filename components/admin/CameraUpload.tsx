'use client';

import { useCallback, useState } from 'react';
import Image from 'next/image';
import { ImagePlus, X, UploadCloud, FolderOpen } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useDropzone } from 'react-dropzone';
import imageCompression from 'browser-image-compression';
import { cn } from '@/lib/utils';
import { notify } from '@/lib/notify';
import { MediaPicker } from './MediaPicker';
import type { MediaAsset } from '@/db/schema';

interface Props {
  onUpload: (url: string) => void;
  onUploadMultiple?: (urls: string[]) => void;
  name?: string;
  initialUrl?: string | null;
  compact?: boolean;
  multiple?: boolean;
  enableLibrary?: boolean;
  pathPrefix?: string;
}

interface UploadingFile {
  id: string;
  file: File;
  progress: number;
  preview: string;
  error?: string;
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
): Promise<{ url: string }> {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('pathname', pathname);

    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable && onProgress) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    });

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          resolve(JSON.parse(xhr.responseText));
        } catch {
          reject(new Error('Invalid server response'));
        }
      } else if (xhr.status === 413) {
        reject(new Error('File too large — the server rejected the upload. Try a smaller image.'));
      } else {
        try {
          const body = JSON.parse(xhr.responseText);
          reject(new Error(body.error || `Upload failed (HTTP ${xhr.status})`));
        } catch {
          reject(new Error(`Upload failed (HTTP ${xhr.status})`));
        }
      }
    });

    xhr.addEventListener('error', () => reject(new Error('Network error — check your connection and try again')));
    xhr.addEventListener('abort', () => reject(new Error('Upload cancelled')));

    xhr.open('POST', '/api/upload-file');
    xhr.send(formData);
  });
}

async function compressAndUpload(
  file: File,
  onProgress?: (pct: number) => void,
  pathPrefix = 'uploads',
): Promise<{ url: string }> {
  onProgress?.(5);

  // Phase 1: Compress and convert to WebP (5→80%)
  const processedFile = await imageCompression(file, {
    ...COMPRESSION_OPTIONS,
    onProgress: (pct: number) => {
      onProgress?.(Math.round(5 + pct * 0.75));
    },
  });

  onProgress?.(80);

  // Guard: reject if compressed file still exceeds Vercel's body limit
  const compressedMB = processedFile.size / (1024 * 1024);
  if (compressedMB > MAX_UPLOAD_MB) {
    throw new Error(
      `Image too large after compression (${compressedMB.toFixed(1)} MB). Max is ${MAX_UPLOAD_MB} MB. Try a smaller image or crop it first.`
    );
  }

  // Phase 2: Upload to server via XHR with progress (80→100%)
  const baseName = file.name.replace(/\.[^.]+$/, '').replace(/[^a-zA-Z0-9.-]/g, '_').replace(/\.{2,}/g, '');
  const blobPath = `${pathPrefix}/${Date.now()}-${baseName || 'upload'}.webp`;

  const result = await uploadViaXhr(
    new File([processedFile], `${baseName || 'upload'}.webp`, { type: 'image/webp' }),
    blobPath,
    (uploadPct) => {
      onProgress?.(Math.round(80 + uploadPct * 0.2));
    },
  );

  return result;
}

export function CameraUpload({
  onUpload,
  onUploadMultiple,
  name = 'image',
  initialUrl,
  compact,
  multiple,
  enableLibrary = true,
  pathPrefix = 'uploads',
}: Props) {
  const t = useTranslations('admin');

  // Single mode state
  const [singlePreview, setSinglePreview] = useState<string | null>(initialUrl || null);

  // Media library picker
  const [pickerOpen, setPickerOpen] = useState(false);
  
  // Multi mode state
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      setIsUploading(true);

      // Create local states for all incoming files
      const newUploads: UploadingFile[] = acceptedFiles.map((file) => ({
        id: Math.random().toString(36).substring(7),
        file,
        progress: 0,
        preview: URL.createObjectURL(file),
      }));

      if (multiple) {
        setUploadingFiles((prev) => [...newUploads, ...prev]);
        
        const urls: string[] = [];
        
        // Upload concurrently but track progress individually
        await Promise.all(
          newUploads.map(async (uploadItem) => {
            try {
              const newBlob = await compressAndUpload(uploadItem.file, (pct) => {
                setUploadingFiles((prev) =>
                  prev.map((p) => (p.id === uploadItem.id ? { ...p, progress: pct } : p))
                );
              }, pathPrefix);
              
              urls.push(newBlob.url);
              // Mark as complete by setting progress to 100
              setUploadingFiles((prev) =>
                prev.map((p) => (p.id === uploadItem.id ? { ...p, progress: 100 } : p))
              );
            } catch (err) {
              const msg = err instanceof Error ? err.message : 'Upload failed';
              notify.error('media', 'uploaded', `Failed to upload ${uploadItem.file.name}: ${msg}`);
              setUploadingFiles((prev) =>
                prev.map((p) => (p.id === uploadItem.id ? { ...p, error: msg } : p))
              );
            }
          })
        );

        if (urls.length > 0) {
          if (onUploadMultiple) {
            onUploadMultiple(urls);
          } else {
            urls.forEach(url => onUpload(url));
          }
        }
        
        // Clean up UI after a short delay so user sees 100%
        setTimeout(() => {
          setUploadingFiles((prev) => prev.filter((p) => p.error)); // Keep only errors if any
          newUploads.forEach((u) => URL.revokeObjectURL(u.preview));
        }, 1500);

      } else {
        // Single file mode
        const file = acceptedFiles[0];
        const previewUrl = URL.createObjectURL(file);
        setSinglePreview(previewUrl);
        setUploadingFiles([newUploads[0]]);

        try {
          const newBlob = await compressAndUpload(file, (pct) => {
            setUploadingFiles([{ ...newUploads[0], progress: pct }]);
          }, pathPrefix);
          onUpload(newBlob.url);
        } catch (err) {
          const msg = err instanceof Error ? err.message : 'Upload failed';
          notify.error('media', 'uploaded', msg);
          setSinglePreview(null);
        } finally {
          setUploadingFiles([]);
        }
      }

      setIsUploading(false);
    },
    [multiple, onUpload, onUploadMultiple]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/webp': [],
      'image/avif': [],
      'image/heic': [],
      'image/heif': [],
    },
    multiple,
    disabled: isUploading && !multiple,
  });

  const clearSingle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSinglePreview(null);
    onUpload('');
  };

  const handlePickerSelect = (asset: MediaAsset) => {
    setPickerOpen(false);
    if (multiple) {
      if (onUploadMultiple) {
        onUploadMultiple([asset.url]);
      } else {
        onUpload(asset.url);
      }
    } else {
      setSinglePreview(asset.url);
      onUpload(asset.url);
    }
  };

  // If SINGLE mode and we have a preview
  if (!multiple && singlePreview) {
    const currentUpload = uploadingFiles[0];
    const isWorking = currentUpload && currentUpload.progress < 100;

    return (
      <div className="relative w-full aspect-4/5 rounded-xl overflow-hidden bg-muted border border-border">
        <Image src={singlePreview} alt="Preview" fill className="object-cover" />

        {isWorking && (
          <div className="absolute inset-0 bg-background/60 flex flex-col items-center justify-center gap-2 p-2 backdrop-blur-sm">
            <span className={cn("font-medium", currentUpload?.error ? "text-destructive text-xs" : "text-foreground text-[10px] tracking-widest")}>
              {currentUpload?.error ? 'Failed' : `${currentUpload?.progress ?? 0}%`}
            </span>
            {!currentUpload?.error && (
              <div className="w-full bg-foreground/20 rounded-full h-1 overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300 ease-out"
                  style={{ width: `${currentUpload?.progress ?? 0}%` }}
                />
              </div>
            )}
          </div>
        )}

        {!isWorking && (
          <>
            {enableLibrary && (
              <button
                type="button"
                onClick={() => setPickerOpen(true)}
                className="absolute top-1.5 left-1.5 w-8 h-8 bg-foreground/80 hover:bg-primary rounded-full flex items-center justify-center cursor-pointer touch-manipulation active:scale-90 transition-all z-10"
              >
                <FolderOpen size={14} className="text-background" />
              </button>
            )}
            <button
              type="button"
              onClick={clearSingle}
              className="absolute top-1.5 right-1.5 w-8 h-8 bg-foreground/80 hover:bg-destructive rounded-full flex items-center justify-center cursor-pointer touch-manipulation active:scale-90 transition-all z-10"
            >
              <X size={14} className="text-background" />
            </button>
          </>
        )}

        {enableLibrary && (
          <MediaPicker
            open={pickerOpen}
            onClose={() => setPickerOpen(false)}
            onSelect={handlePickerSelect}
            selected={singlePreview ?? undefined}
          />
        )}
      </div>
    );
  }

  // MULTIPLE mode OR empty SINGLE mode
  return (
    <div className={cn("flex gap-3", compact ? "flex-row-reverse" : "flex-col w-full")}>
      <div
        {...getRootProps()}
        className={cn(
          compact ? 'w-24 h-24 shrink-0' : 'w-full aspect-4/5',
          'rounded-xl border-2 border-dashed transition-all duration-200 cursor-pointer',
          'flex flex-col items-center justify-center gap-3 relative overflow-hidden',
          isDragActive 
            ? 'border-primary bg-primary/5' 
            : 'border-border/60 bg-muted/40 hover:bg-muted/80 hover:border-border',
          isUploading && !multiple && 'pointer-events-none opacity-60'
        )}
      >
        <input {...getInputProps({ name })} />
        
        <div
          className={cn(
            'rounded-full flex items-center justify-center transition-colors',
            isDragActive ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary',
            compact ? 'w-10 h-10' : 'w-14 h-14'
          )}
        >
          {isDragActive ? <UploadCloud size={compact ? 18 : 26} /> : <ImagePlus size={compact ? 18 : 26} />}
        </div>
        
        {!compact && (
          <div className="text-center px-4">
            <p className={cn(
              "font-medium text-sm transition-colors",
              isDragActive ? "text-primary" : "text-foreground"
            )}>
              {isDragActive ? 'Drop images here' : t('photo')}
            </p>
            <p className="text-muted-foreground text-xs mt-1 leading-relaxed">
              {multiple ? 'Drag & drop multiple files, or click to select' : t('photo_hint')}
            </p>
          </div>
        )}

        {enableLibrary && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setPickerOpen(true); }}
            className={cn(
              "flex items-center gap-1.5 text-primary hover:text-primary/80 cursor-pointer transition-colors z-10",
              compact ? "text-[10px]" : "text-xs"
            )}
          >
            <FolderOpen size={compact ? 12 : 14} />
            {!compact && 'Browse Library'}
          </button>
        )}
      </div>

      {/* Progress tracking for MULTIPLE uploads - Horizontal scroll */}
      {multiple && uploadingFiles.length > 0 && (
        <div className={cn(
          "flex overflow-x-auto gap-3 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]",
          compact ? "items-center" : "w-full mt-1 pb-2"
        )}>
          {uploadingFiles.map((uf) => (
            <div
              key={uf.id}
              className={cn(
                "flex flex-col gap-2 p-1.5 rounded-lg bg-card border border-border shrink-0 snap-start shadow-sm",
                compact ? "w-24 h-24" : "w-28"
              )}
            >
              <div className="w-full h-full rounded-md overflow-hidden bg-muted relative">
                <Image src={uf.preview} alt="preview" fill className="object-cover opacity-80" />
                
                {/* Overlay Progress */}
                <div className="absolute inset-0 bg-background/60 flex flex-col items-center justify-center gap-2 p-2 backdrop-blur-sm">
                  <span className={cn("font-medium", uf.error ? "text-destructive text-xs" : "text-foreground text-[10px] tracking-widest")}>
                    {uf.error ? 'Failed' : `${uf.progress}%`}
                  </span>
                  {!uf.error && (
                    <div className="w-full bg-foreground/20 rounded-full h-1 overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-300 ease-out"
                        style={{ width: `${uf.progress}%` }}
                      />
                    </div>
                  )}
                </div>
              </div>
              
              {!compact && (
                <div className="px-1 pb-1 flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-[10px] font-sans font-medium">
                    <span className="text-foreground truncate pr-2" title={uf.file.name}>
                      {uf.file.name.length > 12 ? uf.file.name.substring(0, 10) + '...' : uf.file.name}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {enableLibrary && (
        <MediaPicker
          open={pickerOpen}
          onClose={() => setPickerOpen(false)}
          onSelect={handlePickerSelect}
        />
      )}
    </div>
  );
}
