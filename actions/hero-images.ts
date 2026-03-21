'use server';

import { z } from 'zod';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { heroImages, type HeroImage } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

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

/** Public — returns active hero images ordered by slot. */
export async function getHeroImages(): Promise<HeroImage[]> {
  return db.select().from(heroImages).orderBy(heroImages.slot);
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
  revalidatePath('/');
  revalidatePath('/en');
  revalidatePath('/bn');
}

export async function deleteHeroImage(slot: number): Promise<void> {
  await requireAdmin();
  const validSlot = z.number().int().min(1).max(5).parse(slot);
  await db.delete(heroImages).where(eq(heroImages.slot, validSlot));
  revalidatePath('/');
  revalidatePath('/en');
  revalidatePath('/bn');
}
