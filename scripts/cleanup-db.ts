import { config } from 'dotenv';
config({ path: '.env.local' });
import { db } from '../lib/db';
import { sql } from 'drizzle-orm';

async function main() {
  console.log('Cleaning up partial push state...');
  try {
    // Drop the tables created by 0001 and 0002
    await db.execute(sql`
      DROP TABLE IF EXISTS "banners" CASCADE;
      DROP TABLE IF EXISTS "campaigns" CASCADE;
      DROP TABLE IF EXISTS "categories" CASCADE;
      DROP TABLE IF EXISTS "collection_products" CASCADE;
      DROP TABLE IF EXISTS "collections" CASCADE;
      DROP TABLE IF EXISTS "media_assets" CASCADE;
      DROP TABLE IF EXISTS "page_sections" CASCADE;
      DROP TABLE IF EXISTS "pages" CASCADE;
      DROP TABLE IF EXISTS "product_images" CASCADE;
      DROP TABLE IF EXISTS "admins" CASCADE;
      
      -- Drop the columns added to products
      ALTER TABLE "products" DROP COLUMN IF EXISTS "category_id";
      ALTER TABLE "products" DROP COLUMN IF EXISTS "status";
      ALTER TABLE "products" DROP COLUMN IF EXISTS "seo_title_en";
      ALTER TABLE "products" DROP COLUMN IF EXISTS "seo_description_en";
      ALTER TABLE "products" DROP COLUMN IF EXISTS "updated_at";
    `);
    console.log('Cleanup successful. You can now run migrations.');
  } catch (e) {
    console.error(e);
  }
  process.exit(0);
}

main();