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
import { faker } from '@faker-js/faker';

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
    status: 'published' as const,
    is_featured: true,
  },
  {
    slug: 'inaya-2025',
    name_en: 'INAYA 2025',
    name_bn: 'ইনায়া ২০২৫',
    description_en: 'A celebration of grace and heritage — contemporary silhouettes woven with traditional craft.',
    description_bn: 'গ্রেস আর ঐতিহ্যের উদযাপন — ঐতিহ্যবাহী কারুকাজে আধুনিক ডিজাইন।',
    status: 'published' as const,
    is_featured: true,
  },
  {
    slug: 'evara-2025',
    name_en: 'EVARA 2025',
    name_bn: 'ইভারা ২০২৫',
    description_en: 'Timeless elegance meets modern design — handcrafted pieces for the discerning woman.',
    description_bn: 'চিরকালীন সৌন্দর্য আর আধুনিক ডিজাইনের মিলন — বিচক্ষণ নারীর জন্য হাতে তৈরি।',
    status: 'published' as const,
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

const INDIAN_FABRICS = ['Pure Silk', 'Chanderi Silk', 'Muslin', 'Cotton-Silk Blend', 'Handloom Cotton', 'Tussar Silk', 'Khadi Cotton', 'Linen'];
const COLORS = ['Crimson Red', 'Indigo Blue', 'Mustard Yellow', 'Forest Green', 'Ivory', 'Midnight Black', 'Turquoise', 'Maroon', 'Teal', 'Olive'];
const BENGALI_PREFIXES = ['অপরাজিতা', 'নন্দিনী', 'চিত্রা', 'মৃণালিনী', 'বনলতা', 'মালতী', 'পদ্মা', 'কাদম্বরী', 'শর্মিষ্ঠা', 'চারুলতা'];

function generateFakeProduct(catMap: Map<string, any>, categorySlug: string) {
  const cat = catMap.get(categorySlug);
  const color = faker.helpers.arrayElement(COLORS);
  const fabric = faker.helpers.arrayElement(INDIAN_FABRICS);
  
  // Create realistic sounding names based on category
  let nameEn = '';
  if (categorySlug === 'blouse') {
    nameEn = `${faker.person.firstName('female').toUpperCase()} — ${fabric} Blouse`;
  } else if (categorySlug === 'jamdani') {
    nameEn = `${color} Dhakai Jamdani`;
  } else if (categorySlug === 'tant') {
    nameEn = `Nadia ${color} Tant Saree`;
  } else if (categorySlug === 'ikkat') {
    nameEn = `${color} Pochampally Ikkat`;
  } else if (categorySlug === 'ajrakh') {
    nameEn = `Kutch ${color} Ajrakh`;
  } else {
    nameEn = `${color} Heritage ${faker.helpers.arrayElement(['Kurta Set', 'Dress', 'Tunic'])}`;
  }

  const nameBn = `${faker.helpers.arrayElement(BENGALI_PREFIXES)} — ${nameEn.split('—')[1] || nameEn}`;
  const slug = faker.helpers.slugify(nameEn).toLowerCase() + '-' + faker.string.alphanumeric(4);
  const price = faker.commerce.price({ min: 1500, max: 25000, dec: 0 });

  return {
    slug,
    name_en: nameEn,
    name_bn: nameBn,
    description_en: `${faker.commerce.productAdjective()} ${fabric} piece. ${faker.lorem.sentences(2)} Handcrafted by master artisans with intricate detailing.`,
    description_bn: `খুবই সুন্দর এবং ঐতিহ্যবাহী হাতে বোনা কাপড়। ${faker.lorem.sentence()} বাংলার তাঁতিদের নিখুঁত কাজ।`,
    price: price.toString(),
    category: cat?.name_en ?? categorySlug,
    category_id: cat?.id ?? null,
    image_url: '/placeholder-saree.svg',
    is_featured: faker.datatype.boolean(0.3), // 30% chance of being featured
    status: 'published',
    sizes: ['blouse', 'ready-to-wear'].includes(categorySlug) ? ['S', 'M', 'L', 'XL', 'XXL'] : [],
    colors: faker.helpers.arrayElements(COLORS, { min: 1, max: 3 }),
    fabric: fabric,
  };
}

async function seedFakeProducts() {
  console.log('Seeding fake products...');

  const cats = await db.query.categories.findMany();
  const catMap = new Map(cats.map((c) => [c.slug, c]));
  
  // We'll generate 10 products per category
  const NUM_PER_CATEGORY = 10;
  
  for (const cat of CATEGORIES) {
    for (let i = 0; i < NUM_PER_CATEGORY; i++) {
      const prod = generateFakeProduct(catMap, cat.slug);
      
      const existing = await db.query.products.findFirst({
        where: (p, { eq }) => eq(p.slug, prod.slug),
      });
      
      if (!existing) {
        await db.insert(schema.products).values(prod);
        console.log(`  + [${cat.slug}] ${prod.name_en}`);
      }
    }
  }
}

async function linkProductsToCollections() {
  console.log('Linking products to collections...');

  const collections = await db.query.collections.findMany();
  if (collections.length === 0) return;

  const allProducts = await db.query.products.findMany();

  for (const col of collections) {
    // Pick 5-10 random products for each collection
    const numProducts = faker.number.int({ min: 5, max: 10 });
    const selectedProducts = faker.helpers.arrayElements(allProducts, numProducts);
    
    for (let i = 0; i < selectedProducts.length; i++) {
      const prod = selectedProducts[i];
      const existing = await db.query.collectionProducts.findFirst({
        where: (cp, { and, eq }) => and(
          eq(cp.collection_id, col.id),
          eq(cp.product_id, prod.id),
        ),
      });
      
      if (!existing) {
        await db.insert(schema.collectionProducts).values({
          collection_id: col.id,
          product_id: prod.id,
          sort_order: i,
        });
        console.log(`  + Linked "${prod.name_en}" to ${col.name_en}`);
      }
    }
  }
}

async function main() {
  console.log('Starting seed...\n');

  await seedCategories();
  console.log('');
  await seedCollections();
  console.log('');
  await seedFakeProducts();
  console.log('');
  await linkProductsToCollections();

  console.log('\nSeed complete!');
  process.exit(0);
}

main().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
