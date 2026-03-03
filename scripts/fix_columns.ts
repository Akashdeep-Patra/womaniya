import { config } from 'dotenv';
config({ path: '.env.local' });
import { sql } from 'drizzle-orm';
import { db } from '../lib/db';

async function run() {
  await db.execute(sql`ALTER TABLE products ALTER COLUMN sizes TYPE jsonb USING CASE WHEN sizes IS NULL OR sizes = '' THEN '[]'::jsonb ELSE ('["' || replace(sizes, ',', '","') || '"]') ::jsonb END;`);
  await db.execute(sql`ALTER TABLE products ALTER COLUMN sizes SET DEFAULT '[]'::jsonb;`);
  await db.execute(sql`ALTER TABLE products ALTER COLUMN colors TYPE jsonb USING CASE WHEN colors IS NULL OR colors = '' THEN '[]'::jsonb ELSE ('["' || replace(colors, ',', '","') || '"]') ::jsonb END;`);
  await db.execute(sql`ALTER TABLE products ALTER COLUMN colors SET DEFAULT '[]'::jsonb;`);
  console.log('Done');
}
run().catch(console.error);