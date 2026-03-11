'use server';
import { auth } from '@/auth';

import { put } from '@vercel/blob';
import { recordMediaAsset } from '@/actions/media';
import { logger } from '@/lib/logger';

export async function uploadImageToBlob(formData: FormData, pathPrefix = 'products'): Promise<string> {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');
  const file = formData.get('file') as File;

  if (!file || file.size === 0) {
    throw new Error('No file provided');
  }

  const MAX_SIZE = 4 * 1024 * 1024; // 4 MB
  if (file.size > MAX_SIZE) {
    const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
    throw new Error(`File too large (${sizeMB} MB). Maximum is 4 MB. Please compress or resize the image first.`);
  }

  const filename = `${pathPrefix}/${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
  const { url } = await put(filename, file, {
    access: 'public',
    contentType: file.type || 'image/jpeg',
  });

  try {
    await recordMediaAsset({
      url,
      filename,
      mime_type: file.type,
      size_bytes: file.size,
    });
  } catch (e) {
    logger.warn('Failed to record media asset after upload', { url, error: e });
  }

  return url;
}
