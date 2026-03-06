'use server';

import { revalidatePath } from 'next/cache';
import { del } from '@vercel/blob';
import { db }             from '@/lib/db';
import { mediaAssets }    from '@/db/schema';
import { eq }             from 'drizzle-orm';
import { z }              from 'zod';
import { logger }         from '@/lib/logger';

const UpdateMediaSchema = z.object({
  alt_en: z.string().max(300).optional(),
  alt_bn: z.string().max(300).optional(),
  tags:   z.string().optional(),
});

export async function getAllMedia() {
  return db.query.mediaAssets.findMany({
    orderBy: (m, { desc }) => [desc(m.created_at)],
  });
}

export async function deleteMedia(id: number) {
  const asset = await db.query.mediaAssets.findFirst({
    where: eq(mediaAssets.id, id),
    columns: { url: true },
  });

  if (asset?.url) {
    try {
      await del(asset.url);
    } catch (e) {
      logger.warn('Failed to delete blob, removing DB record anyway', { url: asset.url, error: e });
    }
  }

  await db.delete(mediaAssets).where(eq(mediaAssets.id, id));
  revalidatePath('/');
}

export async function updateMediaMetadata(id: number, formData: FormData) {
  const raw = {
    alt_en: formData.get('alt_en') as string || undefined,
    alt_bn: formData.get('alt_bn') as string || undefined,
    tags:   formData.get('tags') as string || undefined,
  };

  const parsed = UpdateMediaSchema.safeParse(raw);
  if (!parsed.success) {
    throw new Error(parsed.error.issues.map((i) => i.message).join(', '));
  }

  const data = parsed.data;

  await db.update(mediaAssets).set({
    alt_en: data.alt_en ?? null,
    alt_bn: data.alt_bn ?? null,
    tags: data.tags ?? null,
  }).where(eq(mediaAssets.id, id));

  revalidatePath('/');
}

// uploadImageToBlob is used via upload.ts, but let's record it in media_assets
export async function recordMediaAsset(data: {
  url: string;
  filename: string;
  mime_type?: string;
  size_bytes?: number;
}) {
  await db.insert(mediaAssets).values({
    url:        data.url,
    filename:   data.filename,
    mime_type:  data.mime_type ?? null,
    size_bytes: data.size_bytes ?? null,
  });
  revalidatePath('/');
}
