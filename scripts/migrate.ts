/**
 * Migration runner — executed automatically during Vercel builds
 * via the `vercel-build` script in package.json.
 *
 * Applies any pending SQL migration files from ./drizzle/ to the database.
 * Safe to run multiple times — Drizzle tracks applied migrations in
 * a `__drizzle_migrations` table it manages automatically.
 */
import { config } from 'dotenv';

config({ path: '.env.local' });

import { drizzle }  from 'drizzle-orm/vercel-postgres';
import { migrate }  from 'drizzle-orm/vercel-postgres/migrator';
import { sql }      from '@vercel/postgres';

async function main() {
  console.log('🔄 Running database migrations...');

  const db = drizzle(sql);

  await migrate(db, { migrationsFolder: './drizzle' });

  console.log('✅ Migrations applied successfully');
  process.exit(0);
}

main().catch((err) => {
  console.error('❌ Migration failed:', err);
  process.exit(1);
});
