'use client';

import { useCallback, useState } from 'react';
import Image from 'next/image';
import { ImagePlus, X, UploadCloud } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useDropzone } from 'react-dropzone';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface Props {
  onUpload: (url: string) => void;
  onUploadMultiple?: (urls: string[]) => void;
  name?: string;
  initialUrl?: string | null;
  compact?: boolean;
  multiple?: boolean;
}

interface UploadingFile {
  id: string;
  file: File;
  progress: number;
  preview: string;
  error?: string;
}

// XHR upload utility with progress tracking
function uploadWithProgress(
  file: File,
  onProgress: (pct: number) => void
): Promise<string> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/upload', true);

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        const percentComplete = Math.round((e.loaded / e.total) * 100);
        onProgress(percentComplete);
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const res = JSON.parse(xhr.responseText);
          if (res.url) {
            resolve(res.url);
          } else {
            reject(new Error(res.error || 'Upload failed'));
          }
        } catch (err) {
          reject(new Error('Invalid response'));
        }
      } else {
        reject(new Error(`Upload failed with status ${xhr.status}`));
      }
    };

    xhr.onerror = () => reject(new Error('Network error during upload'));

    const formData = new FormData();
    formData.append('file', file);
    xhr.send(formData);
  });
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
  
  // Single mode state
  const [singlePreview, setSinglePreview] = useState<string | null>(initialUrl || null);
  
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
        setUploadingFiles((prev) => [...prev, ...newUploads]);
        
        const urls: string[] = [];
        
        // Upload concurrently but track progress individually
        await Promise.all(
          newUploads.map(async (uploadItem) => {
            try {
              const url = await uploadWithProgress(uploadItem.file, (pct) => {
                setUploadingFiles((prev) =>
                  prev.map((p) => (p.id === uploadItem.id ? { ...p, progress: pct } : p))
                );
              });
              urls.push(url);
              // Mark as complete by setting progress to 100
              setUploadingFiles((prev) =>
                prev.map((p) => (p.id === uploadItem.id ? { ...p, progress: 100 } : p))
              );
            } catch (err) {
              const msg = err instanceof Error ? err.message : 'Upload failed';
              toast.error(`Failed to upload ${uploadItem.file.name}: ${msg}`);
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
          const url = await uploadWithProgress(file, (pct) => {
            setUploadingFiles([{ ...newUploads[0], progress: pct }]);
          });
          onUpload(url);
        } catch (err) {
          const msg = err instanceof Error ? err.message : 'Upload failed';
          toast.error(msg);
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
    },
    multiple,
    disabled: isUploading && !multiple,
  });

  const clearSingle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSinglePreview(null);
    onUpload('');
  };

  // If SINGLE mode and we have a preview
  if (!multiple && singlePreview) {
    const currentUpload = uploadingFiles[0];
    const isWorking = currentUpload && currentUpload.progress < 100;

    return (
      <div className="relative w-full aspect-4/5 rounded-sm overflow-hidden bg-bengal-mati border border-bengal-kansa/20">
        <Image src={singlePreview} alt="Preview" fill className="object-cover" />

        {isWorking && (
          <div className="absolute inset-0 bg-bengal-kajal/60 flex flex-col items-center justify-center gap-4 p-4 backdrop-blur-sm">
            <div className="w-full max-w-[120px] bg-bengal-kori/20 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-bengal-kori h-full transition-all duration-300 ease-out" 
                style={{ width: `${currentUpload.progress}%` }} 
              />
            </div>
            <p className="text-bengal-kori text-[10px] tracking-widest uppercase font-medium">
              {currentUpload.progress}%
            </p>
          </div>
        )}

        {!isWorking && (
          <button
            type="button"
            onClick={clearSingle}
            className="absolute top-1.5 right-1.5 w-8 h-8 bg-bengal-kajal/80 hover:bg-bengal-alta rounded-full flex items-center justify-center touch-manipulation active:scale-90 transition-all z-10"
          >
            <X size={14} className="text-bengal-kori" />
          </button>
        )}
      </div>
    );
  }

  // MULTIPLE mode OR empty SINGLE mode
  return (
    <div className="w-full flex flex-col gap-3">
      <div
        {...getRootProps()}
        className={cn(
          compact ? 'w-full h-full min-h-[96px]' : 'w-full aspect-4/5',
          'rounded-sm border-2 border-dashed transition-all duration-200 cursor-pointer',
          'flex flex-col items-center justify-center gap-3 relative overflow-hidden',
          isDragActive 
            ? 'border-bengal-sindoor bg-bengal-sindoor/5' 
            : 'border-bengal-kansa/40 bg-bengal-mati/40 hover:bg-bengal-mati/80 hover:border-bengal-kansa/60',
          isUploading && !multiple && 'pointer-events-none opacity-60'
        )}
      >
        <input {...getInputProps({ name })} />
        
        <div
          className={cn(
            'rounded-full flex items-center justify-center transition-colors',
            isDragActive ? 'bg-bengal-sindoor text-white' : 'bg-bengal-sindoor/10 text-bengal-sindoor',
            compact ? 'w-10 h-10' : 'w-14 h-14'
          )}
        >
          {isDragActive ? <UploadCloud size={compact ? 18 : 26} /> : <ImagePlus size={compact ? 18 : 26} />}
        </div>
        
        {!compact && (
          <div className="text-center px-4">
            <p className={cn(
              "font-medium text-sm transition-colors",
              isDragActive ? "text-bengal-sindoor" : "text-bengal-kajal"
            )}>
              {isDragActive ? 'Drop images here' : t('photo')}
            </p>
            <p className="text-bengal-kajal/50 text-xs mt-1 leading-relaxed">
              {multiple ? 'Drag & drop multiple files, or click to select' : t('photo_hint')}
            </p>
          </div>
        )}
      </div>

      {/* Progress tracking for MULTIPLE uploads */}
      {multiple && uploadingFiles.length > 0 && (
        <div className="flex flex-col gap-2 mt-2">
          {uploadingFiles.map((uf) => (
            <div key={uf.id} className="flex items-center gap-3 p-2 rounded bg-bengal-kori border border-bengal-kansa/20">
              <div className="w-10 h-10 rounded overflow-hidden bg-bengal-mati relative shrink-0">
                <Image src={uf.preview} alt="preview" fill className="object-cover opacity-80" />
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-center gap-1.5">
                <div className="flex justify-between items-center text-[10px] uppercase tracking-wider font-sans-en">
                  <span className="text-bengal-kajal truncate pr-2">{uf.file.name}</span>
                  <span className={uf.error ? 'text-bengal-alta' : 'text-bengal-kajal/60 shrink-0'}>
                    {uf.error ? 'Failed' : `${uf.progress}%`}
                  </span>
                </div>
                {!uf.error && (
                  <div className="w-full h-1 bg-bengal-mati rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-bengal-sindoor transition-all duration-300 ease-out"
                      style={{ width: `${uf.progress}%` }}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
