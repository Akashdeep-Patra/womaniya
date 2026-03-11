import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { auth } from '@/auth';
import { recordMediaAsset } from '@/actions/media';
import { ratelimit } from '@/lib/ratelimit';
import { logger } from '@/lib/logger';

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (ratelimit) {
      const ip = request.headers.get('x-forwarded-for') ?? '127.0.0.1';
      const { success } = await ratelimit.limit(`upload_file_${ip}`);
      if (!success) {
        return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
      }
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const pathname = (formData.get('pathname') as string) || `uploads/${Date.now()}-upload.webp`;
    const skipRecord = formData.get('skipRecord') === '1';

    if (!file || file.size === 0) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const MAX_SIZE = 4 * 1024 * 1024; // 4 MB
    if (file.size > MAX_SIZE) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      return NextResponse.json(
        { error: `File too large (${sizeMB} MB). Maximum upload size is 4 MB. Please compress or resize the image.` },
        { status: 413 },
      );
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif', 'image/svg+xml', 'image/heic', 'image/heif'];
    if (file.type && !allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: `File type '${file.type}' not allowed. Accepted: JPEG, PNG, WebP, AVIF, HEIC.` }, { status: 400 });
    }

    const safePath = pathname.replace(/\.\./g, '').replace(/^\/+/, '');

    const blob = await put(safePath, file, {
      access: 'public',
      contentType: file.type || 'image/webp',
    });

    if (!skipRecord) {
      try {
        await recordMediaAsset({
          url: blob.url,
          filename: blob.pathname,
          mime_type: file.type || 'image/webp',
          size_bytes: file.size,
        });
      } catch (e) {
        logger.warn('Failed to record media asset', { url: blob.url, error: e });
      }
    }

    return NextResponse.json({ url: blob.url });
  } catch (error) {
    logger.error('Upload file error', { error });
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}
