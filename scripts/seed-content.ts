/**
 * Seed content_overrides table from JSON message files.
 * Run: pnpm tsx scripts/seed-content.ts
 *
 * Skips keys that already exist in the DB (no overwrite).
 * Safe to run multiple times.
 */
import { config } from 'dotenv';

config({ path: '.env.local' });

import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql as pgPool } from '@vercel/postgres';
import { sql } from 'drizzle-orm';

import enMessages from '../messages/en.json';
import bnMessages from '../messages/bn.json';

const SKIP_NAMESPACES = ['admin'];

async function main() {
  console.log('Seeding content overrides...');

  const db = drizzle(pgPool);

  const locales = [
    { code: 'en', messages: enMessages },
    { code: 'bn', messages: bnMessages },
  ];

  let inserted = 0;
  let skipped = 0;

  for (const { code, messages } of locales) {
    for (const [namespace, keys] of Object.entries(messages)) {
      if (SKIP_NAMESPACES.includes(namespace)) continue;
      if (typeof keys !== 'object' || keys === null) continue;

      for (const [key, value] of Object.entries(keys as Record<string, string>)) {
        try {
          await db.execute(
            sql`INSERT INTO content_overrides (locale, namespace, key, value)
                VALUES (${code}, ${namespace}, ${key}, ${value})
                ON CONFLICT (locale, namespace, key) DO NOTHING`,
          );
          inserted++;
        } catch {
          skipped++;
        }
      }
    }
  }

  console.log(`Done. Inserted: ${inserted}, Skipped: ${skipped}`);
  process.exit(0);
}

main().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
