import { db } from '@/lib/db';
import { activityLog } from '@/db/schema';
import { logger } from '@/lib/logger';

/**
 * Fire-and-forget activity logger. Called from already-authed server actions.
 * Lives in lib/ (not 'use server') so it is NOT exposed as a client-callable
 * server action. Only server-side code can import and call this function.
 */
export async function logActivity(params: {
  action: string;
  entity_type: string;
  entity_id?: number;
  entity_name: string;
  details?: string;
}) {
  try {
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
