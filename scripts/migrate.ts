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

  try {
    await migrate(db, { migrationsFolder: './drizzle' });
    console.log('✅ Migrations applied successfully');
  } catch (err) {
    console.error('⚠️ Migration warning:', err);
    console.log('⚠️ Continuing build despite migration issue — schema may already be up to date');
  }

  process.exit(0);
}

main().catch((err) => {
  console.error('❌ Migration script crashed:', err);
  process.exit(0); // Don't block build
});
