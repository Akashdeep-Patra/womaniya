'use server';

import { put } from '@vercel/blob';

export async function uploadImageToBlob(formData: FormData): Promise<string> {
  const file = formData.get('file') as File;

  if (!file || file.size === 0) {
    throw new Error('No file provided');
  }

  const filename  = `products/${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
  const { url }   = await put(filename, file, { access: 'public' });

  return url;
}
