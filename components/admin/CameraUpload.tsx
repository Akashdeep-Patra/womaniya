'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { Camera, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

interface Props {
  onUpload: (url: string) => void;
  name?:    string;  // form field name
  initialUrl?: string | null;
  compact?: boolean;
}

export function CameraUpload({ onUpload, name = 'image', initialUrl, compact }: Props) {
  const t            = useTranslations('admin');
  const inputRef     = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(initialUrl || null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file: File) => {
    if (!file) return;

    // Local preview
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    setUploading(true);

    try {
      const fd = new FormData();
      fd.set('file', file);

      const res  = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json() as { url: string };
      onUpload(data.url);
    } catch {
      // Keep preview; user can retry
    } finally {
      setUploading(false);
    }
  };

  const clear = () => {
    setPreview(null);
    if (inputRef.current) inputRef.current.value = '';
    onUpload('');
  };

  return (
    <div className="w-full">
      {/* Hidden real file input — targets device camera */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        name={name}
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />

      {preview ? (
        <div className="relative w-full aspect-[4/5] rounded-sm overflow-hidden bg-bengal-mati">
          <Image src={preview} alt="Preview" fill className="object-cover" />

          {/* Uploading overlay */}
          {uploading && (
            <div className="absolute inset-0 bg-bengal-kajal/60 flex flex-col items-center justify-center gap-3">
              <div className="w-8 h-8 border-3 border-bengal-kori border-t-transparent rounded-full animate-spin" />
              <p className="text-bengal-kori text-xs tracking-widest">{t('uploading')}</p>
            </div>
          )}

          {/* Remove button */}
          {!uploading && (
            <button
              type="button"
              onClick={clear}
              className="absolute top-2 right-2 w-8 h-8 bg-bengal-kajal/80 rounded-full flex items-center justify-center"
            >
              <X size={14} className="text-bengal-kori" />
            </button>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={cn(
            'w-full aspect-[4/5] rounded-sm border-2 border-dashed border-bengal-kansa/50',
            'flex flex-col items-center justify-center gap-3',
            'bg-bengal-mati/50 hover:bg-bengal-mati transition-colors',
            'active:scale-[0.99] touch-manipulation'
          )}
        >
          <div className="w-14 h-14 rounded-full bg-bengal-sindoor/10 flex items-center justify-center">
            <Camera size={26} className="text-bengal-sindoor" />
          </div>
          <div className="text-center">
            <p className="text-bengal-kajal font-medium text-sm">{t('photo')}</p>
            <p className="text-bengal-kajal/50 text-xs mt-0.5">{t('photo_hint')}</p>
          </div>
        </button>
      )}
    </div>
  );
}
