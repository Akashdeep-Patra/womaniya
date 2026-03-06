'use server';
import { auth } from '@/auth';

import { put } from '@vercel/blob';
import { recordMediaAsset } from '@/actions/media';
import { logger } from '@/lib/logger';

export async function uploadImageToBlob(formData: FormData): Promise<string> {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');
  const file = formData.get('file') as File;

  if (!file || file.size === 0) {
    throw new Error('No file provided');
  }

  const filename = `products/${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
  const { url } = await put(filename, file, { access: 'public' });

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
