import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { recordMediaAsset } from '@/actions/media';

export async function POST(request: Request): Promise<NextResponse> {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('file') as File | null;

  if (!file || file.size === 0) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
  }

  const maxSize = 25 * 1024 * 1024; // 25MB
  if (file.size > maxSize) {
    return NextResponse.json({ error: 'File too large (max 25MB)' }, { status: 400 });
  }

  try {
    const filename = `products/${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    const blob = await put(filename, file, { access: 'public' });

    // Record in media_assets for the library — don't fail the upload if this errors
    try {
      await recordMediaAsset({
        url: blob.url,
        filename,
        mime_type: file.type,
        size_bytes: file.size,
      });
    } catch (e) {
      console.error('[Upload] Failed to record media asset:', e);
    }

    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error('[Upload] Error:', error);
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    );
  }
}
