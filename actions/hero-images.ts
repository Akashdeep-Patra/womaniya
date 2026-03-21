'use server';

import { z } from 'zod';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { heroImages, type HeroImage } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath, updateTag, unstable_cache } from 'next/cache';

// Allowlist for CSS object-position — prevents CSS injection
const POSITION_RE = /^(top|bottom|left|right|center|\d+(\.\d+)?%)(\s+(top|bottom|left|right|center|\d+(\.\d+)?%))?$/i;

const upsertSchema = z.object({
  slot:      z.number().int().min(1).max(5),
  src:       z.string().min(1).max(2048),
  alt:       z.string().max(500),
  position:  z.string().regex(POSITION_RE, 'Invalid CSS position value'),
  is_active: z.boolean(),
});

async function requireAdmin() {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');
}

/**
 * Cached DB fetch for hero images — tagged 'hero-images'.
 * The result is cached in Next.js Data Cache (equivalent to build-time static data)
 * and only revalidated when an admin saves via upsertHeroImage / deleteHeroImage.
 * This means the homepage serves hero image data without a live DB roundtrip.
 */
const getCachedHeroImages = unstable_cache(
  async (): Promise<HeroImage[]> => {
    return db.select().from(heroImages).orderBy(heroImages.slot);
  },
  ['hero-images'],
  { tags: ['hero-images'], revalidate: false },  // never auto-expire — only cleared on admin save
);

/** Public — returns hero images from cache (no DB roundtrip on every request). */
export async function getHeroImages(): Promise<HeroImage[]> {
  return getCachedHeroImages();
}

export async function upsertHeroImage(data: z.input<typeof upsertSchema>): Promise<void> {
  await requireAdmin();
  const validated = upsertSchema.parse(data);
  await db
    .insert(heroImages)
    .values(validated)
    .onConflictDoUpdate({
      target: heroImages.slot,
      set: {
        src:        validated.src,
        alt:        validated.alt,
        position:   validated.position,
        is_active:  validated.is_active,
        updated_at: new Date(),
      },
    });
  // Invalidate cache + revalidate homepage paths so changes appear immediately
  updateTag('hero-images');
  revalidatePath('/en', 'page');
  revalidatePath('/bn', 'page');
}

export async function deleteHeroImage(slot: number): Promise<void> {
  await requireAdmin();
  const validSlot = z.number().int().min(1).max(5).parse(slot);
  await db.delete(heroImages).where(eq(heroImages.slot, validSlot));
  updateTag('hero-images');
  revalidatePath('/en', 'page');
  revalidatePath('/bn', 'page');
}
