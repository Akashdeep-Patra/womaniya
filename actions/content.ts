'use server';
import { auth } from '@/auth';

import { db } from '@/lib/db';
import { contentOverrides } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { updateTag } from 'next/cache';
import { unstable_cache } from 'next/cache';
import { logger } from '@/lib/logger';
import { logActivity } from '@/lib/activity-logger';

type OverrideMap = Record<string, Record<string, string>>;

export async function getContentOverrides(locale: string): Promise<OverrideMap> {
  try {
    const rows = await db
      .select()
      .from(contentOverrides)
      .where(eq(contentOverrides.locale, locale));

    const map: OverrideMap = {};
    for (const row of rows) {
      if (!map[row.namespace]) map[row.namespace] = {};
      map[row.namespace][row.key] = row.value;
    }
    return map;
  } catch (error) {
    logger.error('Failed to get content overrides', { error });
    return {};
  }
}

export const getCachedContentOverrides = unstable_cache(
  async (locale: string) => getContentOverrides(locale),
  ['content-overrides'],
  { revalidate: 60, tags: ['content-overrides'] },
);

export async function saveContentOverrides({
  locale,
  namespace,
  entries,
}: {
  locale: string;
  namespace: string;
  entries: Record<string, string>;
}) {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');
  for (const [key, value] of Object.entries(entries)) {
    await db
      .insert(contentOverrides)
      .values({ locale, namespace, key, value, updated_at: new Date() })
      .onConflictDoUpdate({
        target: [contentOverrides.locale, contentOverrides.namespace, contentOverrides.key],
        set: { value, updated_at: new Date() },
      });
  }

  logActivity({ action: 'updated', entity_type: 'content', entity_name: `${namespace} (${locale})` }).catch(() => {});

  updateTag('content-overrides');
}

export async function resetContentKey({
  locale,
  namespace,
  key,
}: {
  locale: string;
  namespace: string;
  key: string;
}) {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');
  await db
    .delete(contentOverrides)
    .where(
      and(
        eq(contentOverrides.locale, locale),
        eq(contentOverrides.namespace, namespace),
        eq(contentOverrides.key, key),
      ),
    );

  updateTag('content-overrides');
}

export async function resetNamespaceContent(locale: string, namespace: string) {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');
  await db
    .delete(contentOverrides)
    .where(
      and(
        eq(contentOverrides.locale, locale),
        eq(contentOverrides.namespace, namespace),
      ),
    );

  updateTag('content-overrides');
}
