'use server';

import { auth } from '@/auth';
import { db } from '@/lib/db';
import { activityLog } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';

export async function getRecentActivity(limit = 20) {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');

  const safeLimit = Math.min(Math.max(1, Math.floor(limit)), 100);

  return db.query.activityLog.findMany({
    orderBy: (a, { desc }) => [desc(a.created_at)],
    limit: safeLimit,
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
