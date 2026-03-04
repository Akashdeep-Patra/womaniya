'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import { settings } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function getSettings() {
  try {
    const allSettings = await db.query.settings.findMany();
    const settingsMap: Record<string, string> = {};
    for (const s of allSettings) {
      settingsMap[s.key] = s.value;
    }
    return settingsMap;
  } catch (error) {
    console.error('[getSettings] Error:', error);
    // If the table doesn't exist yet or query fails, return empty gracefully
    return {};
  }
}

export async function getSetting(key: string, defaultValue = '') {
  try {
    const s = await db.query.settings.findFirst({
      where: (table, { eq }) => eq(table.key, key),
    });
    return s?.value ?? defaultValue;
  } catch (error) {
    console.error(`[getSetting ${key}] Error:`, error);
    return defaultValue;
  }
}

export async function updateSettings(data: Record<string, string>) {
  for (const [key, value] of Object.entries(data)) {
    const existing = await db.query.settings.findFirst({
      where: (table, { eq }) => eq(table.key, key),
    });

    if (existing) {
      await db.update(settings).set({ value, updated_at: new Date() }).where(eq(settings.key, key));
    } else {
      await db.insert(settings).values({ key, value });
    }
  }

  revalidatePath('/');
  revalidatePath('/en');
  revalidatePath('/bn');
}