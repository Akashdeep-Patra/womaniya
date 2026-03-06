'use server';

import { auth } from '@/auth';
import { db } from '@/lib/db';
import { activityLog } from '@/db/schema';
import { eq, desc, sql } from 'drizzle-orm';
import { logger } from '@/lib/logger';

/**
 * Fire-and-forget activity logger. Called from already-authed CRUD actions.
 * Also checks auth itself to prevent direct invocation by malicious clients.
 * Wrapped so logging failures never break the parent action.
 */
export async function logActivity(params: {
  action: string;
  entity_type: string;
  entity_id?: number;
  entity_name: string;
  details?: string;
}) {
  try {
    const session = await auth();
    if (!session) return;

    await db.insert(activityLog).values({
      action:      params.action,
      entity_type: params.entity_type,
      entity_id:   params.entity_id ?? null,
      entity_name: params.entity_name,
      details:     params.details ?? null,
    });
  } catch (e) {
    logger.warn('Failed to log activity', { error: e, params });
  }
}

export async function getRecentActivity(limit = 20) {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');

  return db.query.activityLog.findMany({
    orderBy: (a, { desc }) => [desc(a.created_at)],
    limit,
  });
}

export async function getUnreadCount() {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');

  const [result] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(activityLog)
    .where(eq(activityLog.is_read, false));

  return result?.count ?? 0;
}

export async function markAllAsRead() {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');

  await db
    .update(activityLog)
    .set({ is_read: true })
    .where(eq(activityLog.is_read, false));
}
