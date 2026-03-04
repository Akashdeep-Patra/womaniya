'use client';

import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Upload, X } from 'lucide-react';
import { uploadImageToBlob } from '@/actions/upload';
import Image from 'next/image';

type ImageUploaderProps = {
  value?: string;
  onChange: (url: string) => void;
  onRemove?: () => void;
  className?: string;
  aspect?: 'square' | 'landscape' | 'portrait';
};

export function ImageUploader({
  value,
  onChange,
  onRemove,
  className,
  aspect = 'landscape',
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const aspectClass = {
    square: 'aspect-square',
    landscape: 'aspect-video',
    portrait: 'aspect-[3/4]',
  }[aspect];

  const handleUpload = useCallback(async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.set('file', file);
      const url = await uploadImageToBlob(formData);
      onChange(url);
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setUploading(false);
    }
  }, [onChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith('image/')) handleUpload(file);
  }, [handleUpload]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
  }, [handleUpload]);

  if (value) {
    return (
      <div className={cn('relative rounded-lg overflow-hidden border border-border group', aspectClass, className)}>
        <Image src={value} alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
          {onRemove && (
            <button
              onClick={onRemove}
              className="w-9 h-9 rounded-full bg-background/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-foreground"
            >
              <X size={16} className="text-destructive" />
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <label
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      className={cn(
        'flex flex-col items-center justify-center rounded-lg border-2 border-dashed cursor-pointer transition-colors',
        dragOver ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/40',
        uploading && 'pointer-events-none opacity-50',
        aspectClass,
        className,
      )}
    >
      <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
      {uploading ? (
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
            <Upload size={20} className="text-muted-foreground" />
          </div>
          <p className="text-xs text-muted-foreground">
            Drop image or <span className="text-primary underline">browse</span>
          </p>
        </>
      )}
    </label>
  );
}
