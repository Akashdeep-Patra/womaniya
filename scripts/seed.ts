/**
 * Seed script — populates the database with dummy data for all entities
 * so the storefront and admin panel render properly out of the box.
 *
 * Run: pnpm db:seed
 *
 * Safe to run multiple times — checks for existing records before inserting.
 */
import { config } from 'dotenv';
config({ path: '.env.local' });

import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import * as schema from '../db/schema';
import { eq } from 'drizzle-orm';

const db = drizzle(sql, { schema });

// ─── Categories ──────────────────────────────────────────────────

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

// ─── Collections ─────────────────────────────────────────────────

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

// ─── Products (minimal set for rendering) ────────────────────────

const PRODUCTS = [
  {
    slug: 'rupkotha-indigo-jamdani',
    name_en: 'Rupkotha — Indigo Dhakai Jamdani',
    name_bn: 'রূপকথা — নীল ঢাকাই জামদানি',
    description_en: 'A masterpiece of the Dhakai loom — deep indigo muslin with intricate floral jamdani motifs woven by hand. Lightweight, breathable, and luminous.',
    description_bn: 'ঢাকাই তাঁতের এক অনবদ্য সৃষ্টি — গভীর নীল মসলিনে হাতে বোনা ফুলের জামদানি নকশা।',
    price: '12500',
    category: 'Dhakai Jamdani',
    image_url: '/placeholder-saree.svg',
    is_featured: true,
    status: 'published',
    fabric: 'Pure Muslin',
    origin: 'Phulia, West Bengal',
  },
  {
    slug: 'meher-chanderi-blouse',
    name_en: 'MEHER — Chanderi Silk Blouse',
    name_bn: 'মেহের — চান্দেরি সিল্ক ব্লাউজ',
    description_en: 'Chanderi silk blouse with delicate golden zari border and zardozi handwork. Designed for the modern woman who honours tradition.',
    description_bn: 'সোনালি জরি বর্ডার আর জরদোজি হাতের কাজ সহ চান্দেরি সিল্ক ব্লাউজ।',
    price: '4500',
    category: 'Designer Blouse',
    image_url: '/placeholder-saree.svg',
    is_featured: true,
    status: 'published',
    fabric: 'Chanderi Silk',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    slug: 'nadia-ivory-tant',
    name_en: 'Nadia Ivory Tant Saree',
    name_bn: 'নদীয়া আইভরি তাঁত শাড়ি',
    description_en: 'Airy handloom tant from the looms of Nadia — ivory white with a crimson border. The quintessential Bengal summer saree.',
    description_bn: 'নদীয়ার তাঁতে বোনা হালকা সাদা শাড়ি, লাল পাড় — বাংলার গরমের জন্য আদর্শ।',
    price: '2800',
    category: 'Bengal Tant',
    image_url: '/placeholder-saree.svg',
    is_featured: true,
    status: 'published',
    fabric: 'Handloom Cotton',
    origin: 'Nadia, West Bengal',
  },
  {
    slug: 'teal-pochampally-ikkat',
    name_en: 'Teal Pochampally Ikkat',
    name_bn: 'টিল পোচামপল্লি ইক্কাট',
    description_en: 'Resist-dyed Pochampally ikkat in deep teal with geometric diamond motifs. Each pattern emerges from the dye-before-weave technique.',
    description_bn: 'গভীর টিল রঙে জ্যামিতিক হীরা নকশার পোচামপল্লি ইক্কাট।',
    price: '8900',
    category: 'Ikkat Pochampally',
    image_url: '/placeholder-saree.svg',
    is_featured: false,
    status: 'published',
    fabric: 'Pure Silk',
    origin: 'Pochampally, Telangana',
  },
  {
    slug: 'kutch-crimson-ajrakh',
    name_en: 'Kutch Crimson Ajrakh',
    name_bn: 'কচ্ছ ক্রিমসন আজরখ',
    description_en: 'Hand block printed ajrakh in rich crimson — natural dyes pressed into cloth with centuries-old wooden blocks from Kutch, Gujarat.',
    description_bn: 'কচ্ছের শতাব্দী প্রাচীন কাঠের ব্লক দিয়ে প্রাকৃতিক রঙে ছাপা আজরখ।',
    price: '6200',
    category: 'Ajrakh Block Print',
    image_url: '/placeholder-saree.svg',
    is_featured: false,
    status: 'published',
    fabric: 'Handloom Cotton',
    origin: 'Ajrakhpur, Gujarat',
  },
  {
    slug: 'olive-heritage-kurta-set',
    name_en: 'Olive Heritage Kurta Set',
    name_bn: 'অলিভ হেরিটেজ কুর্তা সেট',
    description_en: 'A relaxed-fit kurta set in olive handloom cotton with hand block printed accents. Heritage silhouette for everyday wear.',
    description_bn: 'অলিভ হ্যান্ডলুম কটনে হ্যান্ড ব্লক প্রিন্ট কুর্তা সেট — রোজকারের জন্য।',
    price: '3800',
    category: 'Ready to Wear',
    image_url: '/placeholder-saree.svg',
    is_featured: true,
    status: 'published',
    fabric: 'Khadi Cotton',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  },
];

async function seedProducts() {
  console.log('Seeding products...');
  const cats = await db.query.categories.findMany();
  const catMap = new Map(cats.map((c) => [c.name_en, c]));

  for (const prod of PRODUCTS) {
    const existing = await db.query.products.findFirst({
      where: (p, { eq }) => eq(p.slug, prod.slug),
    });
    if (!existing) {
      const cat = catMap.get(prod.category);
      await db.insert(schema.products).values({
        ...prod,
        category_id: cat?.id ?? null,
        sizes: (prod as any).sizes ?? [],
        colors: [],
      });
      console.log(`  + ${prod.name_en}`);
    } else {
      console.log(`  = ${prod.name_en} (already exists)`);
    }
  }
}

async function linkProductsToCollections() {
  console.log('Linking products to collections...');
  const allCollections = await db.query.collections.findMany();
  const allProducts = await db.query.products.findMany();
  if (allCollections.length === 0 || allProducts.length === 0) return;

  for (const col of allCollections) {
    const count = Math.min(allProducts.length, 4);
    const start = allCollections.indexOf(col) * 2;
    const selected = allProducts.slice(start, start + count);

    for (let i = 0; i < selected.length; i++) {
      const prod = selected[i];
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
        console.log(`  + Linked "${prod.name_en}" → ${col.name_en}`);
      }
    }
  }
}

// ─── Campaigns ───────────────────────────────────────────────────

const CAMPAIGNS = [
  {
    slug: 'durga-puja-2025',
    name_en: 'Durga Puja 2025',
    name_bn: 'দুর্গা পুজো ২০২৫',
    description_en: 'Celebrate the divine feminine with our curated Durga Puja collection — Chanderi blouses, Jamdani sarees, and heritage accessories.',
    description_bn: 'দুর্গা পুজোর জন্য বিশেষ সংগ্রহ — চান্দেরি ব্লাউজ, জামদানি শাড়ি, আর ঐতিহ্যবাহী অ্যাক্সেসরিজ।',
    announcement_text_en: 'Durga Puja Collection is LIVE — Shop heritage pieces crafted for the goddess in you.',
    announcement_text_bn: 'দুর্গা পুজো কালেকশন এসে গেছে — তোমার মধ্যে যে দেবী, তার জন্য তৈরি।',
    cta_url: '/en/collections',
    status: 'published' as const,
    starts_at: new Date('2025-09-15'),
    ends_at: new Date('2025-10-10'),
  },
  {
    slug: 'summer-loom-2026',
    name_en: 'Summer Loom 2026',
    name_bn: 'সামার লুম ২০২৬',
    description_en: 'Light, breathable, luminous — handloom pieces designed for the Indian summer. Tant sarees, cotton kurtas, and airy ikkat.',
    description_bn: 'হালকা, শ্বাসযোগ্য, উজ্জ্বল — ভারতীয় গ্রীষ্মের জন্য তৈরি হ্যান্ডলুম কাপড়।',
    announcement_text_en: 'Summer Loom is here — lightweight handloom for the season.',
    announcement_text_bn: 'সামার লুম এসে গেছে — গরমের জন্য হালকা হ্যান্ডলুম।',
    cta_url: '/en/shop',
    status: 'published' as const,
    starts_at: new Date('2026-03-01'),
    ends_at: new Date('2026-06-30'),
  },
];

async function seedCampaigns() {
  console.log('Seeding campaigns...');
  for (const campaign of CAMPAIGNS) {
    const existing = await db.query.campaigns.findFirst({
      where: (c, { eq }) => eq(c.slug, campaign.slug),
    });
    if (!existing) {
      await db.insert(schema.campaigns).values(campaign);
      console.log(`  + ${campaign.name_en}`);
    } else {
      console.log(`  = ${campaign.name_en} (already exists)`);
    }
  }
}

// ─── Banners ─────────────────────────────────────────────────────

async function seedBanners() {
  console.log('Seeding banners...');
  const allCampaigns = await db.query.campaigns.findMany();
  const allCollections = await db.query.collections.findMany();
  const allCategories = await db.query.categories.findMany();

  const campaignMap = new Map(allCampaigns.map((c) => [c.slug, c]));
  const collectionMap = new Map(allCollections.map((c) => [c.slug, c]));
  const categoryMap = new Map(allCategories.map((c) => [c.slug, c]));

  const BANNERS = [
    {
      placement: 'hero',
      images: ['/instagram/2026-01-30_12-28-39_UTC_5.jpg'],
      image_url: '/instagram/2026-01-30_12-28-39_UTC_5.jpg',
      title_en: 'Heritage Woven for You',
      title_bn: 'তোমার জন্য বোনা ঐতিহ্য',
      subtitle_en: 'Explore our handloom collection — from Jamdani to Ajrakh.',
      subtitle_bn: 'জামদানি থেকে আজরখ — আমাদের হ্যান্ডলুম কালেকশন দেখো।',
      cta_text_en: 'Shop Now',
      cta_text_bn: 'কেনাকাটা করো',
      cta_url: '/en/shop',
      sort_order: 0,
      status: 'published' as const,
      campaign_id: campaignMap.get('summer-loom-2026')?.id ?? null,
    },
    {
      placement: 'hero',
      images: ['/instagram/2026-02-02_12-37-01_UTC_2.jpg'],
      image_url: '/instagram/2026-02-02_12-37-01_UTC_2.jpg',
      title_en: 'The DEVI Collection',
      title_bn: 'দেবী কালেকশন',
      subtitle_en: 'Chanderi blouses adorned with golden zari — for the goddess in you.',
      subtitle_bn: 'সোনালি জরির চান্দেরি ব্লাউজ — তোমার মধ্যে যে দেবী।',
      cta_text_en: 'Explore DEVI',
      cta_text_bn: 'দেবী দেখো',
      cta_url: '/en/collections',
      sort_order: 1,
      status: 'published' as const,
      collection_id: collectionMap.get('devi')?.id ?? null,
    },
    {
      placement: 'category_hero',
      images: ['/instagram/2026-01-30_12-28-39_UTC_5.jpg'],
      image_url: '/instagram/2026-01-30_12-28-39_UTC_5.jpg',
      title_en: 'Dhakai Jamdani',
      title_bn: 'ঢাকাই জামদানি',
      subtitle_en: 'UNESCO-recognised intangible heritage, woven by masters.',
      subtitle_bn: 'UNESCO স্বীকৃত অমূল্য ঐতিহ্য।',
      cta_text_en: 'View All',
      cta_text_bn: 'সব দেখো',
      cta_url: '/en/category/jamdani',
      sort_order: 2,
      status: 'published' as const,
      category_id: categoryMap.get('jamdani')?.id ?? null,
    },
  ];

  for (const banner of BANNERS) {
    const existing = await db.query.banners.findFirst({
      where: (b, { and, eq }) => and(
        eq(b.title_en, banner.title_en!),
        eq(b.placement, banner.placement),
      ),
    });
    if (!existing) {
      await db.insert(schema.banners).values(banner);
      console.log(`  + ${banner.title_en} (${banner.placement})`);
    } else {
      console.log(`  = ${banner.title_en} (already exists)`);
    }
  }
}

// ─── Pages & Stories ─────────────────────────────────────────────

const PAGES_DATA = [
  {
    slug: 'about-us',
    title_en: 'About Womaniya',
    title_bn: 'ওমনিয়া সম্পর্কে',
    page_type: 'static' as const,
    status: 'published' as const,
    seo_title_en: 'About Womaniya — Authentic Handloom Heritage',
    seo_description_en: 'Learn about Womaniya — our mission to preserve India\'s handloom heritage through contemporary fashion.',
    sections: [
      {
        section_type: 'richtext',
        content_json: {
          body_en: '<h2>Where Tradition Meets Today</h2><p>At Womaniya, we celebrate the beauty of handloom traditions by transforming them into contemporary, wearable fashion. Rooted in craft and guided by conscious design, our work brings together heritage textiles and modern silhouettes that fit seamlessly into everyday life.</p><p>We collaborate closely with skilled Jamdani weavers, Chanderi silk artisans, Ikkat Pochampally craftsmen, and Ajrakh block printers — communities whose knowledge has been passed down through generations.</p>',
          body_bn: '<h2>যেখানে ঐতিহ্য আজকের সাথে মেলে</h2><p>ওমনিয়ায় আমরা হ্যান্ডলুম ঐতিহ্যের সৌন্দর্যকে আধুনিক, পরিধানযোগ্য ফ্যাশনে রূপান্তরিত করি।</p>',
        },
        sort_order: 0,
      },
      {
        section_type: 'richtext',
        content_json: {
          body_en: '<h2>Our Artisan Communities</h2><p>Every textile is thoughtfully created through slow, mindful processes — handspun, handwoven, and hand block printed — preserving the authenticity and soul of true craftsmanship. By working directly with local artisans and weaving communities, we support sustainable livelihoods while keeping India\'s rich textile legacy alive.</p>',
          body_bn: '<h2>আমাদের কারিগর সম্প্রদায়</h2><p>প্রতিটি কাপড় ধীরে, মনোযোগ দিয়ে তৈরি — হাতে কাটা, হাতে বোনা, হাতে ব্লক প্রিন্ট করা।</p>',
        },
        sort_order: 1,
      },
    ],
  },
  {
    slug: 'shipping-returns',
    title_en: 'Shipping & Returns',
    title_bn: 'শিপিং ও রিটার্ন',
    page_type: 'static' as const,
    status: 'published' as const,
    seo_title_en: 'Shipping & Returns — Womaniya',
    seo_description_en: 'Free shipping across India on orders above ₹2,000. Easy 7-day returns on all handloom products.',
    sections: [
      {
        section_type: 'richtext',
        content_json: {
          body_en: '<h2>Shipping Policy</h2><p>We ship across India via trusted courier partners. Orders above ₹2,000 qualify for free shipping. Standard delivery takes 5–7 business days. Express delivery (2–3 days) is available for an additional ₹150.</p><h2>Returns & Exchanges</h2><p>We accept returns within 7 days of delivery. Items must be unworn, unwashed, and in original packaging. Handloom products may have minor variations — these are marks of authenticity, not defects.</p>',
          body_bn: '<h2>শিপিং নীতি</h2><p>আমরা সারা ভারতে শিপ করি। ₹২,০০০-এর উপরে অর্ডারে ফ্রি শিপিং।</p>',
        },
        sort_order: 0,
      },
    ],
  },
  {
    slug: 'the-jamdani-legacy',
    title_en: 'The Jamdani Legacy — A Thread Through Time',
    title_bn: 'জামদানির উত্তরাধিকার — সময়ের সুতো',
    page_type: 'story' as const,
    status: 'published' as const,
    seo_title_en: 'The Jamdani Legacy — Womaniya Stories',
    seo_description_en: 'Discover the centuries-old art of Jamdani weaving — from the Mughal courts to the looms of modern Bengal.',
    sections: [
      {
        section_type: 'richtext',
        content_json: {
          body_en: '<p>The Jamdani is not merely a fabric — it is a whispered conversation between the weaver and the loom, a dialogue that has continued unbroken for over two thousand years.</p><p>Born in the muslin workshops of Dhaka during the Mughal era, Jamdani was once so fine that an entire saree could pass through a finger ring. The weavers of Phulia and Shantipur in West Bengal carry forward this tradition today, each motif — the peacock, the lotus, the geometric diamond — woven directly into the fabric without any additional thread or embroidery.</p>',
          body_bn: '<p>জামদানি শুধু কাপড় নয় — এটা তাঁতি আর তাঁতের মধ্যে দুই হাজার বছরের কথোপকথন।</p>',
        },
        sort_order: 0,
      },
      {
        section_type: 'richtext',
        content_json: {
          body_en: '<p>At Womaniya, we source our Jamdani directly from the weaving families of Phulia. Each saree takes between 15 days to 3 months to complete, depending on the intricacy of the design. The weavers work in pairs — one controls the loom while the other interlaces the supplementary weft threads by hand to create the distinctive motifs.</p><p>When you wear a Jamdani, you wear patience. You wear devotion. You wear a living heritage.</p>',
          body_bn: '<p>ওমনিয়ায় আমরা ফুলিয়ার তাঁতি পরিবারদের কাছ থেকে সরাসরি জামদানি সংগ্রহ করি। প্রতিটি শাড়ি তৈরি হতে ১৫ দিন থেকে ৩ মাস লাগে।</p>',
        },
        sort_order: 1,
      },
    ],
  },
  {
    slug: 'meet-the-weavers',
    title_en: 'Meet the Weavers of Phulia',
    title_bn: 'ফুলিয়ার তাঁতিদের সাথে পরিচয়',
    page_type: 'story' as const,
    status: 'published' as const,
    seo_title_en: 'Meet the Weavers — Womaniya Stories',
    seo_description_en: 'The hands behind the handloom — meet the master weavers of Phulia who keep the Jamdani tradition alive.',
    sections: [
      {
        section_type: 'richtext',
        content_json: {
          body_en: '<p>In the quiet village of Phulia, about 100 kilometres north of Kolkata, the rhythmic clack of handlooms is the heartbeat of the community. Here, families have woven Jamdani and Tant for generations — a craft passed from father to son, mother to daughter.</p><p>Rahim Ansari, a third-generation weaver, begins his day before dawn. "Each thread carries a prayer," he says, adjusting the warp on his pit loom. "My grandfather taught my father, my father taught me. This loom is our inheritance."</p>',
          body_bn: '<p>কলকাতা থেকে প্রায় ১০০ কিলোমিটার উত্তরে ফুলিয়া গ্রামে তাঁতের ছন্দময় শব্দ সম্প্রদায়ের হৃদস্পন্দন।</p>',
        },
        sort_order: 0,
      },
    ],
  },
];

async function seedPages() {
  console.log('Seeding pages & stories...');
  for (const pageData of PAGES_DATA) {
    const { sections, ...page } = pageData;
    const existing = await db.query.pages.findFirst({
      where: (p, { eq }) => eq(p.slug, page.slug),
    });
    if (!existing) {
      const [inserted] = await db.insert(schema.pages).values(page).returning({ id: schema.pages.id });
      if (inserted && sections.length > 0) {
        await db.insert(schema.pageSections).values(
          sections.map((s) => ({
            page_id: inserted.id,
            section_type: s.section_type,
            content_json: s.content_json,
            sort_order: s.sort_order,
          })),
        );
      }
      console.log(`  + [${page.page_type}] ${page.title_en}`);
    } else {
      console.log(`  = [${page.page_type}] ${page.title_en} (already exists)`);
    }
  }
}

// ─── Testimonials ────────────────────────────────────────────────

const TESTIMONIALS = [
  {
    quote_en: 'Each thread I weave carries a prayer. It is not just cloth; it is my family\'s legacy.',
    quote_bn: 'প্রতিটি সুতোয় একটি প্রার্থনা বোনা। এটা শুধু কাপড় নয়; এটা আমার পরিবারের উত্তরাধিকার।',
    author_name: 'Rahim Ansari',
    author_title: 'Master Weaver, Phulia',
    source: 'anecdotal' as const,
    rating: null,
    sort_order: 0,
    status: 'published' as const,
  },
  {
    quote_en: 'Wearing a Womaniya Jamdani feels like wearing a piece of history. The craftsmanship is palpable.',
    quote_bn: 'ওমনিয়ার জামদানি পরলে মনে হয় ইতিহাসের একটা টুকরো গায়ে জড়িয়ে আছে। কারিগরি যেন হাতে ছোঁয়া যায়।',
    author_name: 'Arundhati M.',
    author_title: 'Kolkata',
    source: 'google' as const,
    rating: 5,
    sort_order: 1,
    status: 'published' as const,
  },
  {
    quote_en: 'We don\'t rush the loom. The design decides its own time.',
    quote_bn: 'তাঁত তাড়াহুড়ো করা যায় না। নকশা নিজেই ঠিক করে নেয় তার সময়।',
    author_name: 'Karim Khatri',
    author_title: 'Block Printer, Ajrakhpur',
    source: 'anecdotal' as const,
    rating: null,
    sort_order: 2,
    status: 'published' as const,
  },
  {
    quote_en: 'I ordered a Chanderi blouse for my sister\'s wedding and it arrived beautifully packaged. The zari work is exquisite — better than what I\'ve seen in stores.',
    quote_bn: 'আমার বোনের বিয়ের জন্য একটা চান্দেরি ব্লাউজ অর্ডার করেছিলাম। প্যাকেজিং অসাধারণ। জরির কাজ দোকানে যা পাওয়া যায় তার চেয়ে অনেক ভালো।',
    author_name: 'Priya Sen',
    author_title: 'Mumbai',
    source: 'instagram' as const,
    rating: 5,
    sort_order: 3,
    status: 'published' as const,
  },
  {
    quote_en: 'The Ikkat saree I bought is absolutely stunning. The colours are vibrant and the weave is incredibly soft. Will definitely order again!',
    quote_bn: 'যে ইক্কাট শাড়িটা কিনেছি সেটা অসাধারণ। রং উজ্জ্বল আর বুনন অবিশ্বাস্য নরম। আবার অবশ্যই অর্ডার করব!',
    author_name: 'Deepa R.',
    author_title: 'Bangalore',
    source: 'google' as const,
    rating: 4,
    sort_order: 4,
    status: 'published' as const,
  },
  {
    quote_en: 'My grandmother wove Jamdani. Seeing Womaniya keep this art alive brings tears to my eyes. Thank you for honouring our heritage.',
    quote_bn: 'আমার ঠাকুমা জামদানি বুনতেন। ওমনিয়া এই শিল্পকে বাঁচিয়ে রাখছে দেখে চোখে জল আসে। আমাদের ঐতিহ্যকে সম্মান করার জন্য ধন্যবাদ।',
    author_name: 'Fatima Begum',
    author_title: 'Dhaka',
    source: 'whatsapp' as const,
    rating: null,
    sort_order: 5,
    status: 'published' as const,
  },
  {
    quote_en: 'Received my Tant saree yesterday. The fabric is so light and airy — perfect for Bengal summers. The border design is unique and elegant.',
    quote_bn: null,
    author_name: 'Suchitra D.',
    author_title: 'Kolkata',
    source: 'facebook' as const,
    rating: 5,
    sort_order: 6,
    status: 'published' as const,
  },
  {
    quote_en: 'As a textile researcher, I\'m impressed by the authenticity of Womaniya\'s collection. They genuinely support artisan communities.',
    quote_bn: null,
    author_name: 'Dr. Meera Iyer',
    author_title: 'Textile Researcher, NIFT',
    source: 'email' as const,
    rating: null,
    sort_order: 7,
    status: 'published' as const,
  },
];

async function seedTestimonials() {
  console.log('Seeding testimonials...');
  for (const testimonial of TESTIMONIALS) {
    const existing = await db.query.testimonials.findFirst({
      where: (t, { and, eq }) => and(
        eq(t.author_name, testimonial.author_name),
        eq(t.quote_en, testimonial.quote_en),
      ),
    });
    if (!existing) {
      await db.insert(schema.testimonials).values(testimonial);
      console.log(`  + "${testimonial.author_name}" (${testimonial.source})`);
    } else {
      console.log(`  = "${testimonial.author_name}" (already exists)`);
    }
  }
}

// ─── Main ────────────────────────────────────────────────────────

async function main() {
  console.log('Starting seed...\n');

  await seedCategories();
  console.log('');
  await seedCollections();
  console.log('');
  await seedProducts();
  console.log('');
  await linkProductsToCollections();
  console.log('');
  await seedCampaigns();
  console.log('');
  await seedBanners();
  console.log('');
  await seedPages();
  console.log('');
  await seedTestimonials();

  console.log('\nSeed complete!');
  process.exit(0);
}

main().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
