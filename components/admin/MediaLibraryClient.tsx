'use client';

import { useState, useTransition } from 'react';
import Image from 'next/image';
import { CameraUpload } from './CameraUpload';
import { Trash2, Copy, Tag, Check, X } from 'lucide-react';
import { toast } from 'sonner';
import { deleteMedia, updateMediaMetadata, recordMediaAsset } from '@/actions/media';
import { BengalInput, BengalButton } from '@/components/bengal';
import type { MediaAsset } from '@/db/schema';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export function MediaLibraryClient({ initialMedia }: { initialMedia: MediaAsset[] }) {
  const [assets, setAssets] = useState(initialMedia);
  const [selectedAsset, setSelectedAsset] = useState<MediaAsset | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleUpload = async (url: string) => {
    // In a real app we'd get filename from the file object directly, but CameraUpload just returns URL
    const filename = url.split('/').pop() || 'uploaded-image.jpg';
    
    // Optimistic UI update
    const tempAsset: MediaAsset = {
      id: Date.now(),
      url,
      filename,
      alt_en: null,
      alt_bn: null,
      mime_type: 'image/jpeg',
      size_bytes: null,
      width: null,
      height: null,
      tags: null,
      created_at: new Date(),
    };
    
    setAssets(prev => [tempAsset, ...prev]);

    startTransition(async () => {
      try {
        await recordMediaAsset({ url, filename });
        // Refresh could be done here if needed, or rely on router.refresh()
        toast.success('Image uploaded successfully');
      } catch (err) {
        toast.error('Failed to record upload in DB');
      }
    });
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success('URL copied to clipboard');
  };

  const handleDelete = (id: number) => {
    if (!window.confirm('Are you sure you want to delete this media?')) return;
    
    startTransition(async () => {
      try {
        await deleteMedia(id);
        setAssets(prev => prev.filter(a => a.id !== id));
        setSelectedAsset(null);
        toast.success('Deleted successfully');
      } catch {
        toast.error('Failed to delete');
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
        toast.success('Metadata updated');
        // Optimistic update
        setAssets(prev => prev.map(a => 
          a.id === selectedAsset.id ? {
            ...a,
            alt_en: formData.get('alt_en') as string,
            tags: formData.get('tags') as string,
          } : a
        ));
      } catch {
        toast.error('Failed to update');
      }
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      
      {/* ─── Grid ─── */}
      <div className={cn("bg-card p-6 rounded-2xl border border-border transition-all", selectedAsset ? "lg:col-span-3" : "lg:col-span-4")}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-sans font-semibold tracking-tight text-xl text-foreground">All Media</h3>
          <div className="w-48">
            <CameraUpload onUpload={handleUpload} compact />
          </div>
        </div>

        {assets.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-border rounded-xl">
            <p className="text-muted-foreground text-sm">No media uploaded yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            <AnimatePresence>
              {assets.map((asset) => (
                <motion.button
                  key={asset.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={() => setSelectedAsset(asset)}
                  className={cn(
                    "relative aspect-square rounded-lg overflow-hidden border-2 transition-all hover:shadow-md",
                    selectedAsset?.id === asset.id ? "border-primary shadow-lg" : "border-border border-transparent"
                  )}
                >
                  <Image src={asset.url} alt={asset.alt_en || 'Media'} fill className="object-cover" sizes="(max-width: 768px) 50vw, 20vw" />
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* ─── Sidebar / Detail Panel ─── */}
      {selectedAsset && (
        <div className="bg-card text-card-foreground p-6 rounded-2xl border border-border lg:col-span-1 shadow-sm sticky top-24 h-[calc(100vh-120px)] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-sans font-semibold tracking-tight text-lg text-foreground">Asset Details</h4>
            <button onClick={() => setSelectedAsset(null)} className="text-muted-foreground hover:text-foreground"><X size={18} /></button>
          </div>
          
          <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-muted mb-4 border border-border">
            <Image src={selectedAsset.url} alt={selectedAsset.alt_en || 'Selected'} fill className="object-contain" />
          </div>

          <div className="flex flex-col gap-2 mb-6">
            <p className="text-xs text-foreground/60 break-all">{selectedAsset.filename}</p>
            <p className="text-[10px] uppercase tracking-widest text-foreground/40">
              {new Date(selectedAsset.created_at || '').toLocaleDateString()}
            </p>
            <div className="flex gap-2 mt-2">
              <BengalButton type="button" variant="outline" size="sm" className="flex-1 text-xs py-1" onClick={() => copyUrl(selectedAsset.url)}>
                <Copy size={14} className="mr-1" /> Copy URL
              </BengalButton>
              <button 
                onClick={() => handleDelete(selectedAsset.id)}
                disabled={isPending}
                className="px-3 border border-bengal-alta text-bengal-alta rounded text-xs hover:bg-bengal-alta/10 transition-colors flex items-center justify-center disabled:opacity-50"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>

          <hr className="border-bengal-kansa/10 my-6" />

          <form onSubmit={handleUpdateMeta} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] tracking-widest uppercase font-medium text-foreground/70 font-sans-en">Alt Text (SEO)</label>
              <input 
                name="alt_en" 
                defaultValue={selectedAsset.alt_en || ''} 
                className="w-full text-sm p-2 border-b border-bengal-kansa/30 bg-transparent focus:outline-none focus:border-bengal-sindoor transition-colors" 
                placeholder="Describe this image..."
              />
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] tracking-widest uppercase font-medium text-foreground/70 font-sans-en">Tags</label>
              <input 
                name="tags" 
                defaultValue={selectedAsset.tags || ''} 
                className="w-full text-sm p-2 border-b border-bengal-kansa/30 bg-transparent focus:outline-none focus:border-bengal-sindoor transition-colors" 
                placeholder="hero, banner, summer..."
              />
            </div>

            <BengalButton type="submit" variant="primary" size="sm" loading={isPending} className="mt-2 text-xs py-2">
              Save Changes
            </BengalButton>
          </form>
        </div>
      )}

    </div>
  );
}