'use server';
import { auth } from '@/auth';
import { unstable_cache, updateTag } from 'next/cache';

import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import { settings } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { logger } from '@/lib/logger';
import { logActivity } from '@/lib/activity-logger';

const _getSettings = unstable_cache(async () => {
  try {
    const allSettings = await db.query.settings.findMany();
    const settingsMap: Record<string, string> = {};
    for (const s of allSettings) {
      settingsMap[s.key] = s.value;
    }
    return settingsMap;
  } catch (error) {
    logger.error('Failed to get settings', { error });
    return {};
  }
}, ['all-settings'], { revalidate: 60, tags: ['settings'] });

export async function getSettings() {
  return _getSettings();
}

export async function getSetting(key: string, defaultValue = '') {
  const all = await _getSettings();
  return all[key] ?? defaultValue;
}

export async function updateSettings(data: Record<string, string>) {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');
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

  logActivity({
    action: 'updated',
    entity_type: 'settings',
    entity_name: Object.keys(data).join(', '),
  }).catch(() => {});

  updateTag('settings');
  revalidatePath('/');
  revalidatePath('/en');
  revalidatePath('/bn');
}
