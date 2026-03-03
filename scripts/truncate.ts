import { config } from 'dotenv';
config({ path: '.env.local' });
import { sql } from 'drizzle-orm';
import { db } from '../lib/db';

async function main() {
  console.log('Truncating tables...');
  await db.execute(sql`TRUNCATE TABLE products, product_images, collection_products, collections, categories, campaigns, banners, pages, page_sections, media_assets, settings CASCADE;`);
  console.log('✅ All dummy data removed successfully! (Admin accounts were kept)');
}
main().catch(console.error);
