'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { X, Search, Check } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

type MediaAsset = {
  id: number;
  url: string;
  filename: string;
  alt_en?: string | null;
};

type MediaPickerProps = {
  open: boolean;
  onClose: () => void;
  onSelect: (asset: MediaAsset) => void;
  selected?: string;
};

export function MediaPicker({ open, onClose, onSelect, selected }: MediaPickerProps) {
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (open) {
      fetch('/api/media')
        .then((r) => r.json())
        .then(setAssets)
        .catch(() => {});
    }
  }, [open]);

  const filtered = assets.filter(
    (a) =>
      a.filename.toLowerCase().includes(search.toLowerCase()) ||
      a.alt_en?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-4 lg:inset-16 z-50 bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#C5A059]/10">
              <h2 className="font-editorial text-lg">Media Library</h2>
              <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-[#1A1918]/5">
                <X size={18} />
              </button>
            </div>
            <div className="px-5 py-3 border-b border-[#C5A059]/5">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1A1918]/30" />
                <input
                  type="text"
                  placeholder="Search media..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm bg-[#1A1918]/5 rounded-md border-0 focus:ring-1 focus:ring-[#C5A059]/30 outline-none"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              {filtered.length === 0 ? (
                <p className="text-sm text-[#1A1918]/40 text-center py-12">No media found</p>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                  {filtered.map((asset) => (
                    <button
                      key={asset.id}
                      onClick={() => onSelect(asset)}
                      className={cn(
                        'relative aspect-square rounded-lg overflow-hidden border-2 transition-colors group',
                        selected === asset.url
                          ? 'border-[#C5A059]'
                          : 'border-transparent hover:border-[#C5A059]/30',
                      )}
                    >
                      <Image src={asset.url} alt={asset.alt_en ?? ''} fill className="object-cover" />
                      {selected === asset.url && (
                        <div className="absolute inset-0 bg-[#C5A059]/20 flex items-center justify-center">
                          <div className="w-6 h-6 rounded-full bg-[#C5A059] flex items-center justify-center">
                            <Check size={14} className="text-white" />
                          </div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
