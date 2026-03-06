import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { ratelimit } from '@/lib/ratelimit';
import { logger } from '@/lib/logger';

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    if (ratelimit) {
      const ip = request.headers.get('x-forwarded-for') ?? '127.0.0.1';
      const { success } = await ratelimit.limit(`upload_token_${ip}`);
      if (!success) {
        return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
      }
    }

    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (
        pathname: string,
        /* clientPayload */
      ) => {
        // Authenticate the user before generating the token
        const session = await auth();
        if (!session) {
          throw new Error('Unauthorized');
        }

        logger.info('Upload token generated', { pathname, user: session.user?.email || 'admin' });

        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'],
          maximumSizeInBytes: 25 * 1024 * 1024, // 25MB
          tokenPayload: JSON.stringify({
            userId: session.user?.id || 'admin',
          }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // Run after the upload is completed
        logger.info('Upload completed', { url: blob.url });
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    logger.error('Upload handler error', { error });
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }, // The webhook will retry 5 times waiting for a 200
    );
  }
}
