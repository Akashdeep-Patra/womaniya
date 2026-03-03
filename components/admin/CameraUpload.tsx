'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { ImagePlus, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

interface Props {
  onUpload: (url: string) => void;
  onUploadMultiple?: (urls: string[]) => void;
  name?: string;
  initialUrl?: string | null;
  compact?: boolean;
  multiple?: boolean;
}

export function CameraUpload({
  onUpload,
  onUploadMultiple,
  name = 'image',
  initialUrl,
  compact,
  multiple,
}: Props) {
  const t = useTranslations('admin');
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(initialUrl || null);
  const [uploading, setUploading] = useState(false);

  const uploadFile = async (file: File): Promise<string | null> => {
    const fd = new FormData();
    fd.set('file', file);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = (await res.json()) as { url: string };
      return data.url;
    } catch {
      return null;
    }
  };

  const handleSingleFile = async (file: File) => {
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    setUploading(true);
    try {
      const url = await uploadFile(file);
      if (url) onUpload(url);
    } finally {
      setUploading(false);
    }
  };

  const handleMultipleFiles = async (files: File[]) => {
    if (files.length === 0) return;
    setUploading(true);
    try {
      const results = await Promise.all(files.map(uploadFile));
      const urls = results.filter((u): u is string => u !== null);
      if (onUploadMultiple && urls.length > 0) {
        onUploadMultiple(urls);
      } else {
        urls.forEach((url) => onUpload(url));
      }
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    if (multiple) {
      handleMultipleFiles(Array.from(fileList));
    } else {
      const file = fileList[0];
      if (file) handleSingleFile(file);
    }
  };

  const clear = () => {
    setPreview(null);
    if (inputRef.current) inputRef.current.value = '';
    onUpload('');
  };

  return (
    <div className="w-full">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        multiple={multiple}
        name={name}
        className="sr-only"
        onChange={handleChange}
      />

      {preview ? (
        <div className="relative w-full aspect-4/5 rounded-sm overflow-hidden bg-bengal-mati">
          <Image src={preview} alt="Preview" fill className="object-cover" />

          {uploading && (
            <div className="absolute inset-0 bg-bengal-kajal/60 flex flex-col items-center justify-center gap-3">
              <div className="w-8 h-8 border-3 border-bengal-kori border-t-transparent rounded-full animate-spin" />
              <p className="text-bengal-kori text-xs tracking-widest">{t('uploading')}</p>
            </div>
          )}

          {!uploading && (
            <button
              type="button"
              onClick={clear}
              className="absolute top-1.5 right-1.5 w-10 h-10 bg-bengal-kajal/80 rounded-full flex items-center justify-center touch-manipulation active:scale-90 transition-transform"
            >
              <X size={16} className="text-bengal-kori" />
            </button>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={cn(
            compact ? 'w-full h-full' : 'w-full aspect-4/5',
            'rounded-sm border-2 border-dashed border-bengal-kansa/50',
            'flex flex-col items-center justify-center gap-3',
            'bg-bengal-mati/50 hover:bg-bengal-mati transition-colors',
            'active:scale-[0.99] touch-manipulation',
            uploading && 'pointer-events-none opacity-60'
          )}
        >
          {uploading ? (
            <div className="w-8 h-8 border-3 border-bengal-sindoor border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <div
                className={cn(
                  'rounded-full bg-bengal-sindoor/10 flex items-center justify-center',
                  compact ? 'w-10 h-10' : 'w-14 h-14'
                )}
              >
                <ImagePlus size={compact ? 18 : 26} className="text-bengal-sindoor" />
              </div>
              {!compact && (
                <div className="text-center">
                  <p className="text-bengal-kajal font-medium text-sm">{t('photo')}</p>
                  <p className="text-bengal-kajal/50 text-xs mt-0.5">{t('photo_hint')}</p>
                </div>
              )}
            </>
          )}
        </button>
      )}
    </div>
  );
}
