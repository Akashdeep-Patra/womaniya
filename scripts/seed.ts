/**
 * Seed script — populates the database with default categories, collections,
 * and sample products so the storefront works out of the box.
 *
 * Run: pnpm db:seed
 *
 * Safe to run multiple times — uses ON CONFLICT DO NOTHING for categories.
 */
import { config } from 'dotenv';
config({ path: '.env.local' });

import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import * as schema from '../db/schema';
import { eq } from 'drizzle-orm';

const db = drizzle(sql, { schema });

const CATEGORIES = [
  {
    slug: 'jamdani',
    name_en: 'Dhakai Jamdani',
    name_bn: 'ঢাকাই জামদানি',
    description_en: 'The poetry of Bengal — woven thread by thread by masters in Dhaka and Murshidabad. A UNESCO-recognised intangible heritage.',
    description_bn: 'বাংলার কবিতা কাপড়ে লেখা। ঢাকা আর মুর্শিদাবাদের ওস্তাদরা সুতোয় যে জ্যামিতি বোনেন — সেটা UNESCO-ও মাথা নত করে স্বীকার করেছে।',
    sort_order: 0,
    status: 'published' as const,
  },
  {
    slug: 'blouse',
    name_en: 'Designer Blouse',
    name_bn: 'ডিজাইনার ব্লাউজ',
    description_en: 'Chanderi silk, zardozi handwork, golden zari motifs — crafted to perfection in Kolkata. The perfect match for your saree.',
    description_bn: 'চান্দেরি সিল্ক, জরদোজি হাতের কাজ, সোনালি জরি — কলকাতায় তৈরি। তোমার শাড়ির সাথে পারফেক্ট ম্যাচ।',
    sort_order: 1,
    status: 'published' as const,
  },
  {
    slug: 'tant',
    name_en: 'Bengal Tant',
    name_bn: 'বাংলার তাঁত',
    description_en: 'Airy, breathable, and luminous — the everyday luxury of Bengal woven fine on looms of Nadia and Murshidabad.',
    description_bn: 'হালকা, শ্বাসযোগ্য, উজ্জ্বল — নদীয়া আর মুর্শিদাবাদের তাঁতে বোনা। বাংলার রোদ-বৃষ্টির সাথে পরিচিত কাপড়।',
    sort_order: 2,
    status: 'published' as const,
  },
  {
    slug: 'ikkat',
    name_en: 'Ikkat Pochampally',
    name_bn: 'ইক্কাট পোচামপল্লি',
    description_en: 'Resist-dyed threads rhythmically bound before weaving, creating geometric patterns that shimmer and move.',
    description_bn: 'আগে রং, তারপর বোনন। সুতো যখন কাপড় হয়, তখন নকশা ফুটে ওঠে যেন নিজেই — এই জাদুর নাম ইক্কাট।',
    sort_order: 3,
    status: 'published' as const,
  },
  {
    slug: 'ajrakh',
    name_en: 'Ajrakh Block Print',
    name_bn: 'আজরখ ব্লক প্রিন্ট',
    description_en: 'Ancient geometry pressed into living cloth using hand-carved wooden blocks and natural dyes.',
    description_bn: 'কাঠের ব্লক, প্রাকৃতিক রং, শতাব্দীর পুরনো হাত — একটা কাপড়ে পুরো ইতিহাস।',
    sort_order: 4,
    status: 'published' as const,
  },
  {
    slug: 'ready-to-wear',
    name_en: 'Ready to Wear',
    name_bn: 'রেডি টু ওয়্যার',
    description_en: 'Heritage silhouettes designed for modern life — comfortable, expressive, and effortlessly wearable.',
    description_bn: 'ঐতিহ্যের কাপড়, আধুনিকের কাটছাঁট। রোজকারের জীবনে পরা যায় — office থেকে adda, সব জায়গায়।',
    sort_order: 5,
    status: 'published' as const,
  },
];

const COLLECTIONS = [
  {
    slug: 'devi',
    name_en: 'DEVI',
    name_bn: 'দেবী',
    description_en: 'Embrace the divine elegance — our signature Durga Puja collection featuring Chanderi blouses adorned with golden zari motifs.',
    description_bn: 'দেবীর মতো রাজকীয় — দুর্গা পুজোর জন্য বিশেষ সংগ্রহ। চান্দেরি ব্লাউজে সোনালি জরির কাজ।',
    status: 'live' as const,
    is_featured: true,
  },
  {
    slug: 'inaya-2025',
    name_en: 'INAYA 2025',
    name_bn: 'ইনায়া ২০২৫',
    description_en: 'A celebration of grace and heritage — contemporary silhouettes woven with traditional craft.',
    description_bn: 'গ্রেস আর ঐতিহ্যের উদযাপন — ঐতিহ্যবাহী কারুকাজে আধুনিক ডিজাইন।',
    status: 'live' as const,
    is_featured: true,
  },
  {
    slug: 'evara-2025',
    name_en: 'EVARA 2025',
    name_bn: 'ইভারা ২০২৫',
    description_en: 'Timeless elegance meets modern design — handcrafted pieces for the discerning woman.',
    description_bn: 'চিরকালীন সৌন্দর্য আর আধুনিক ডিজাইনের মিলন — বিচক্ষণ নারীর জন্য হাতে তৈরি।',
    status: 'live' as const,
    is_featured: false,
  },
];

async function seedCategories() {
  console.log('Seeding categories...');
  for (const cat of CATEGORIES) {
    const existing = await db.query.categories.findFirst({
      where: (c, { eq }) => eq(c.slug, cat.slug),
    });
    if (!existing) {
      await db.insert(schema.categories).values(cat);
      console.log(`  + ${cat.name_en}`);
    } else {
      console.log(`  = ${cat.name_en} (already exists)`);
    }
  }
}

async function seedCollections() {
  console.log('Seeding collections...');
  for (const col of COLLECTIONS) {
    const existing = await db.query.collections.findFirst({
      where: (c, { eq }) => eq(c.slug, col.slug),
    });
    if (!existing) {
      await db.insert(schema.collections).values(col);
      console.log(`  + ${col.name_en}`);
    } else {
      console.log(`  = ${col.name_en} (already exists)`);
    }
  }
}

async function seedSampleProducts() {
  console.log('Seeding sample products...');

  const cats = await db.query.categories.findMany();
  const catMap = new Map(cats.map((c) => [c.slug, c]));

  const PRODUCTS = [
    {
      slug: 'crimson-dhakai-jamdani',
      name_en: 'Crimson Dhakai Jamdani',
      name_bn: 'ক্রিমসন ঢাকাই জামদানি',
      description_en: 'A stunning handwoven Dhakai Jamdani in deep crimson with intricate traditional motifs. Each piece takes 15-30 days to weave on a traditional loom.',
      description_bn: 'গভীর ক্রিমসন রঙে ঐতিহ্যবাহী নকশায় হাতে বোনা ঢাকাই জামদানি। প্রতিটি শাড়ি তৈরি হতে ১৫-৩০ দিন সময় লাগে।',
      price: '8500',
      category_slug: 'jamdani',
      is_featured: true,
      fabric: 'Cotton-Silk blend',
    },
    {
      slug: 'ivory-gold-jamdani',
      name_en: 'Ivory & Gold Jamdani',
      name_bn: 'আইভরি ও গোল্ড জামদানি',
      description_en: 'Elegant ivory Jamdani with golden zari work, perfect for special occasions. Handwoven by master artisans of Murshidabad.',
      description_bn: 'সোনালি জরির কাজে আইভরি জামদানি, বিশেষ অনুষ্ঠানের জন্য আদর্শ। মুর্শিদাবাদের ওস্তাদ কারিগরদের হাতে বোনা।',
      price: '12000',
      category_slug: 'jamdani',
      is_featured: true,
      fabric: 'Muslin',
    },
    {
      slug: 'stuti-chanderi-blouse',
      name_en: 'STUTI — Chanderi Blouse',
      name_bn: 'স্তুতি — চান্দেরি ব্লাউজ',
      description_en: 'From our DEVI collection — exquisite Chanderi blouse adorned with golden zari motifs. Crafted to perfection in Kolkata.',
      description_bn: 'আমাদের দেবী সংগ্রহ থেকে — সোনালি জরির নকশায় সুন্দর চান্দেরি ব্লাউজ। কলকাতায় নিখুঁতভাবে তৈরি।',
      price: '3500',
      category_slug: 'blouse',
      is_featured: true,
      fabric: 'Chanderi Silk',
      sizes: 'S, M, L, XL',
      colors: 'Gold, Maroon, Ivory',
    },
    {
      slug: 'shloka-silk-blouse',
      name_en: 'SHLOKA — Silk Blouse',
      name_bn: 'শ্লোকা — সিল্ক ব্লাউজ',
      description_en: 'A silk blouse that speaks the language of royalty. Adorned with floral motif zardozi handwork on the back.',
      description_bn: 'রাজকীয়তার ভাষায় কথা বলা একটি সিল্ক ব্লাউজ। পিছনে ফুলের নকশায় জরদোজি হাতের কাজ।',
      price: '4200',
      category_slug: 'blouse',
      is_featured: true,
      fabric: 'Pure Silk',
      sizes: 'S, M, L, XL',
      colors: 'Red, Navy, Black',
    },
    {
      slug: 'nadia-tant-saree',
      name_en: 'Nadia Tant Saree',
      name_bn: 'নদীয়া তাঁত শাড়ি',
      description_en: 'Light, breathable Bengal Tant from the looms of Nadia. Perfect for everyday elegance in the Bengal heat.',
      description_bn: 'নদীয়ার তাঁতে বোনা হালকা, আরামদায়ক বাংলার তাঁত শাড়ি। বাংলার গরমে রোজকারের সৌন্দর্যের জন্য আদর্শ।',
      price: '2800',
      category_slug: 'tant',
      is_featured: false,
      fabric: 'Cotton',
    },
    {
      slug: 'pochampally-ikkat-saree',
      name_en: 'Pochampally Ikkat Saree',
      name_bn: 'পোচামপল্লি ইক্কাট শাড়ি',
      description_en: 'Vibrant geometric patterns created through the ancient resist-dyeing technique of Pochampally.',
      description_bn: 'পোচামপল্লির প্রাচীন রেজিস্ট-ডাইং কৌশলে তৈরি প্রাণবন্ত জ্যামিতিক নকশা।',
      price: '5500',
      category_slug: 'ikkat',
      is_featured: false,
      fabric: 'Silk',
    },
    {
      slug: 'kutch-ajrakh-dupatta',
      name_en: 'Kutch Ajrakh Dupatta',
      name_bn: 'কচ্ছ আজরখ দুপাট্টা',
      description_en: 'Hand block-printed with natural indigo and madder dyes. Each piece is a meditation in precision by Kutch artisans.',
      description_bn: 'প্রাকৃতিক নীল ও মেজেন্টা রঙে হাতে ব্লক প্রিন্ট করা। কচ্ছের কারিগরদের ধৈর্যের ফসল।',
      price: '1800',
      category_slug: 'ajrakh',
      is_featured: false,
      fabric: 'Cotton',
    },
    {
      slug: 'heritage-kurta-set',
      name_en: 'Heritage Kurta Set',
      name_bn: 'হেরিটেজ কুর্তা সেট',
      description_en: 'A modern kurta set crafted from handloom fabric. Heritage silhouettes designed for everyday comfort.',
      description_bn: 'হ্যান্ডলুম কাপড়ে তৈরি আধুনিক কুর্তা সেট। রোজকারের আরামের জন্য ঐতিহ্যবাহী ডিজাইন।',
      price: '3200',
      category_slug: 'ready-to-wear',
      is_featured: false,
      fabric: 'Handloom Cotton',
      sizes: 'S, M, L, XL, XXL',
    },
  ];

  for (const prod of PRODUCTS) {
    const existing = await db.query.products.findFirst({
      where: (p, { eq }) => eq(p.slug, prod.slug),
    });
    if (existing) {
      console.log(`  = ${prod.name_en} (already exists)`);
      continue;
    }

    const cat = catMap.get(prod.category_slug);
    await db.insert(schema.products).values({
      slug: prod.slug,
      name_en: prod.name_en,
      name_bn: prod.name_bn ?? null,
      description_en: prod.description_en ?? null,
      description_bn: prod.description_bn ?? null,
      price: prod.price,
      category: cat?.name_en ?? prod.category_slug,
      category_id: cat?.id ?? null,
      image_url: '/placeholder-saree.svg',
      is_featured: prod.is_featured,
      status: 'published',
      sizes: prod.sizes ?? null,
      colors: prod.colors ?? null,
      fabric: prod.fabric ?? null,
    });
    console.log(`  + ${prod.name_en}`);
  }
}

async function linkProductsToCollections() {
  console.log('Linking products to collections...');

  const deviCol = await db.query.collections.findFirst({
    where: (c, { eq }) => eq(c.slug, 'devi'),
  });
  if (!deviCol) return;

  const blouseProducts = await db.query.products.findMany({
    where: (p, { eq }) => eq(p.category, 'Designer Blouse'),
  });

  for (let i = 0; i < blouseProducts.length; i++) {
    const existing = await db.query.collectionProducts.findFirst({
      where: (cp, { and, eq }) => and(
        eq(cp.collection_id, deviCol.id),
        eq(cp.product_id, blouseProducts[i].id),
      ),
    });
    if (!existing) {
      await db.insert(schema.collectionProducts).values({
        collection_id: deviCol.id,
        product_id: blouseProducts[i].id,
        sort_order: i,
      });
      console.log(`  + Linked "${blouseProducts[i].name_en}" to DEVI`);
    }
  }
}

async function main() {
  console.log('Starting seed...\n');

  await seedCategories();
  console.log('');
  await seedCollections();
  console.log('');
  await seedSampleProducts();
  console.log('');
  await linkProductsToCollections();

  console.log('\nSeed complete!');
  process.exit(0);
}

main().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
