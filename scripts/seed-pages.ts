/**
 * Seed essential Womaniya pages into the database.
 * Run: pnpm tsx scripts/seed-pages.ts
 *
 * Safe to re-run — uses upsert on slug.
 */
import 'dotenv/config';
import { db }     from '../lib/db';
import { pages, pageSections } from '../db/schema';
import { eq }     from 'drizzle-orm';

interface SeedSection {
  section_type: 'richtext' | 'image_text' | 'quote' | 'cta' | 'hero' | 'gallery' | 'testimonial';
  content_json: Record<string, unknown>;
  sort_order:   number;
}

interface SeedPage {
  slug:               string;
  title_en:           string;
  title_bn?:          string;
  seo_title_en?:      string;
  seo_description_en?: string;
  page_type:          'static' | 'landing';
  sections:           SeedSection[];
}

const SEED_PAGES: SeedPage[] = [
  // ─── Shipping & Delivery ────────────────────────────────────────────────
  {
    slug: 'shipping-delivery',
    title_en: 'Shipping & Delivery',
    title_bn: 'শিপিং ও ডেলিভারি',
    seo_title_en: 'Shipping & Delivery Policy — Womaniya',
    seo_description_en: 'Womaniya delivers handloom garments across India. Learn about our shipping timelines, charges, and how to track your order.',
    page_type: 'static',
    sections: [
      {
        section_type: 'richtext',
        sort_order: 1,
        content_json: {
          content_en: `## How We Ship

Every Womaniya piece is carefully packed and dispatched with love from Kolkata. We ship across India via trusted courier partners — currently Blue Dart and Delhivery.

## Processing Time

- Orders are processed within **1–3 business days** of payment confirmation
- During sale periods or festive seasons, processing may take up to **5 business days**
- You'll receive a WhatsApp message with your tracking details once dispatched

## Delivery Timeline

- **Kolkata (Metro)** — 1–3 business days after dispatch
- **Major cities** (Mumbai, Delhi, Bengaluru, Chennai, Hyderabad) — 3–5 business days
- **Rest of India** — 5–8 business days
- **Remote areas & North-East** — 7–12 business days

These are estimates and may vary based on courier conditions and public holidays.

## Shipping Charges

- **Free shipping** on all orders above ₹1,499
- **₹99 flat fee** for orders below ₹1,499

## Urgent Orders?

Need something sooner? Message us on WhatsApp before placing your order. We can sometimes arrange expedited delivery for Kolkata orders and will always try our best.

📱 WhatsApp: +91 91431 61829

## International Shipping

We currently ship within India only. For international orders, please reach out to us on WhatsApp and we'll do our best to accommodate you.`,
        },
      },
      {
        section_type: 'cta',
        sort_order: 2,
        content_json: {
          title: 'Questions About Your Order?',
          text: "We're always happy to help. Message us on WhatsApp and we'll get back to you within a few hours.",
          button_text: 'WhatsApp Us',
          button_url: 'https://wa.me/919143161829?text=Hi%20Womaniya!%20I%20have%20a%20question%20about%20shipping.',
        },
      },
    ],
  },

  // ─── Returns & Exchanges ────────────────────────────────────────────────
  {
    slug: 'returns-exchanges',
    title_en: 'Returns & Exchanges',
    title_bn: 'রিটার্ন ও এক্সচেঞ্জ',
    seo_title_en: 'Returns & Exchange Policy — Womaniya',
    seo_description_en: 'We want you to love every Womaniya piece. Read our 7-day return and exchange policy for handloom garments.',
    page_type: 'static',
    sections: [
      {
        section_type: 'richtext',
        sort_order: 1,
        content_json: {
          content_en: `## Our Promise

Every Womaniya piece is handcrafted by artisans and inspected carefully before shipping. If something isn't right, we want to make it right.

## Return Policy — 7 Days

We accept returns within **7 days** of delivery, provided the item:

- Is **unworn, unwashed, and unaltered**
- Has the **original tags attached**
- Is in its **original packaging**
- Is free from stains, perfume, or damage

## What Cannot Be Returned

- Items purchased during **sales or at a discounted price**
- **Customised or made-to-order** pieces
- Items that show signs of wear, washing, or damage
- Items without original tags/packaging

## How to Initiate a Return

1. **WhatsApp us** at +91 91431 61829 within 7 days of delivery
2. Share your **order details** and a brief reason for return
3. We'll confirm eligibility and arrange a **free pickup** from your address
4. Once we receive and inspect the item, your refund or exchange is processed

## Exchanges

Prefer a different size or colour? We'll try our best to exchange — subject to availability. If the desired item isn't available, we'll issue store credit or a full refund.

## Refund Timeline

- Refunds are processed within **5–7 business days** of us receiving the returned item
- Refunds are issued to the **original payment method** (UPI, card, bank transfer)
- You'll receive a WhatsApp confirmation once your refund is processed

## Damaged or Wrong Item?

If you received a damaged or incorrect item, please message us immediately with photos. We'll arrange a replacement or full refund at no extra cost — no questions asked.`,
        },
      },
      {
        section_type: 'quote',
        sort_order: 2,
        content_json: {
          text: "Every thread is woven with intention. If a piece doesn't feel right, we'll make it right.",
          author: 'Womaniya',
        },
      },
      {
        section_type: 'cta',
        sort_order: 3,
        content_json: {
          title: 'Need to Return Something?',
          text: "Reach out to us on WhatsApp within 7 days of delivery and we'll take care of everything.",
          button_text: 'Start a Return',
          button_url: 'https://wa.me/919143161829?text=Hi%20Womaniya!%20I%20would%20like%20to%20return%20an%20item.',
        },
      },
    ],
  },

  // ─── Care Instructions ──────────────────────────────────────────────────
  {
    slug: 'care-guide',
    title_en: 'Care Guide',
    title_bn: 'যত্নের নির্দেশিকা',
    seo_title_en: 'How to Care for Handloom — Womaniya Care Guide',
    seo_description_en: 'Learn how to properly care for your Womaniya handloom garments. Washing, drying, ironing, and storage tips to keep your pieces beautiful for years.',
    page_type: 'static',
    sections: [
      {
        section_type: 'richtext',
        sort_order: 1,
        content_json: {
          content_en: `## Caring for Your Womaniya Piece

Handloom fabrics are living textiles — they improve with care. With the right attention, your Womaniya garment will stay beautiful for years and become softer with every wash.

## Washing

- **Hand wash** is always recommended for all handloom and Jamdani pieces
- Use **cold or lukewarm water only** — never hot water
- Use a **mild, pH-neutral detergent** (Ezee, Genteel, or baby shampoo work well)
- Do not wring or twist — **gently squeeze** out excess water
- If machine washing, use the **delicate cycle only**, inside a mesh laundry bag
- Wash **separately** from other fabrics, especially dark colours the first time

## Drying

- **Dry in shade** — direct sunlight can fade natural dyes and weaken fibres
- Lay flat on a clean towel or hang from the shoulders — never clip the hem
- Avoid the dryer — heat damages handloom fibres and causes shrinkage

## Ironing

- Iron on **medium-low heat** while slightly damp for best results
- Iron on the **reverse side** to protect the surface and any embellishments
- For Jamdani and Ikkat pieces, use a **thin cotton cloth** between the iron and fabric
- Do not iron directly over any embroidery or embellishments

## Storing

- Store **clean and dry** — moisture can lead to mildew and damage natural fibres
- Fold neatly and place in a **cotton muslin bag** — avoid plastic bags which trap moisture
- Add a **neem sachet or cedar block** to deter insects naturally
- Refold along different lines every few months to avoid permanent crease marks

## Colour Care

- First wash may release excess dye — this is normal for natural and vegetable-dyed fabrics
- Wash **separately** for the first 2–3 washes
- Avoid soaking for long periods as it can cause colour bleeding

## Professional Dry Cleaning

- Only required for very structured or embellished pieces
- Always inform the dry cleaner that the garment is **handwoven**

Your Womaniya piece is a work of art. A little extra care goes a long way.`,
        },
      },
      {
        section_type: 'quote',
        sort_order: 2,
        content_json: {
          text: 'A handloom garment cared for with intention tells a story that only grows richer with time.',
          author: 'Womaniya',
        },
      },
    ],
  },

  // ─── Size Guide ─────────────────────────────────────────────────────────
  {
    slug: 'size-guide',
    title_en: 'Size Guide',
    title_bn: 'মাপের গাইড',
    seo_title_en: 'Size Guide — Womaniya Handloom',
    seo_description_en: 'Find your perfect fit with the Womaniya size guide. All measurements are in inches.',
    page_type: 'static',
    sections: [
      {
        section_type: 'richtext',
        sort_order: 1,
        content_json: {
          content_en: `## How to Measure

Use a soft measuring tape and measure over light clothing. All measurements are in **inches**.

## Tops, Blouses & Kurtas

| Size | Chest | Waist | Hip | Length |
|------|-------|-------|-----|--------|
| XS   | 32    | 26    | 34  | 38     |
| S    | 34    | 28    | 36  | 39     |
| M    | 36    | 30    | 38  | 40     |
| L    | 38    | 32    | 40  | 41     |
| XL   | 40    | 34    | 42  | 42     |
| XXL  | 42    | 36    | 44  | 43     |

## Skirts & Bottoms

| Size | Waist | Hip | Length |
|------|-------|-----|--------|
| XS   | 26    | 34  | 38     |
| S    | 28    | 36  | 39     |
| M    | 30    | 38  | 40     |
| L    | 32    | 40  | 41     |
| XL   | 34    | 42  | 42     |
| XXL  | 36    | 44  | 43     |

## Dresses

| Size | Chest | Waist | Hip | Length |
|------|-------|-------|-----|--------|
| XS   | 32    | 26    | 34  | 52     |
| S    | 34    | 28    | 36  | 53     |
| M    | 36    | 30    | 38  | 54     |
| L    | 38    | 32    | 40  | 55     |
| XL   | 40    | 34    | 42  | 56     |
| XXL  | 42    | 36    | 44  | 57     |

## Between Two Sizes?

Go up a size for a relaxed fit, or stick with the smaller size for a more tailored look. Our garments are designed with ease built in.

## Need a Custom Size?

Many of our pieces can be made to measure. Message us on WhatsApp with your measurements and we'll confirm availability.

📱 +91 91431 61829`,
        },
      },
      {
        section_type: 'cta',
        sort_order: 2,
        content_json: {
          title: 'Not Sure About Your Size?',
          text: "Send us a WhatsApp message with your measurements and we'll recommend the perfect size for you.",
          button_text: 'Ask Us',
          button_url: 'https://wa.me/919143161829?text=Hi!%20I%20need%20help%20with%20sizing.',
        },
      },
    ],
  },

  // ─── Contact ────────────────────────────────────────────────────────────
  {
    slug: 'contact',
    title_en: 'Contact Us',
    title_bn: 'যোগাযোগ করুন',
    seo_title_en: 'Contact Womaniya — WhatsApp, Instagram & More',
    seo_description_en: 'Get in touch with Womaniya for orders, returns, styling advice, or wholesale enquiries.',
    page_type: 'static',
    sections: [
      {
        section_type: 'richtext',
        sort_order: 1,
        content_json: {
          content_en: `## Get in Touch

We love hearing from you — whether it's about an order, a styling question, a collaboration, or just to say hello.

## WhatsApp (Fastest Response)

The quickest way to reach us is on WhatsApp. We typically respond within a few hours on business days.

📱 **+91 91431 61829**

Available: **Monday – Saturday, 10 AM – 7 PM IST**

## Instagram

Follow us for new arrivals, behind-the-scenes from our weavers, and styling inspiration.

📸 **@womaniyakolkata**

Feel free to DM us on Instagram too — we read every message.

## For Wholesale & Bulk Orders

Interested in stocking Womaniya? We work with select boutiques and retailers who share our values of sustainability and craftsmanship. Reach out via WhatsApp with your store details.

## For Press & Collaborations

We'd love to work with photographers, stylists, writers, and creators who are passionate about handloom and Indian heritage textiles. Message us on WhatsApp or Instagram.

## Based in Kolkata

We're a Kolkata-born brand rooted in the handloom traditions of West Bengal and beyond. While we don't have a walk-in store, we sometimes host pop-ups and trunk shows — follow us on Instagram to stay in the loop.`,
        },
      },
      {
        section_type: 'cta',
        sort_order: 2,
        content_json: {
          title: 'Say Hello',
          text: "Drop us a message on WhatsApp — we'd love to help you find your perfect piece.",
          button_text: 'WhatsApp Us Now',
          button_url: 'https://wa.me/919143161829?text=Hi%20Womaniya!%20I%20have%20a%20question.',
        },
      },
    ],
  },

  // ─── FAQ ────────────────────────────────────────────────────────────────
  {
    slug: 'faq',
    title_en: 'Frequently Asked Questions',
    title_bn: 'সাধারণ প্রশ্নাবলি',
    seo_title_en: 'FAQ — Womaniya Handloom',
    seo_description_en: 'Answers to common questions about Womaniya orders, shipping, returns, sizing, and handloom care.',
    page_type: 'static',
    sections: [
      {
        section_type: 'richtext',
        sort_order: 1,
        content_json: {
          content_en: `## Orders & Payment

### How do I place an order?

You can browse our shop and add items to your cart. We also accept orders directly via WhatsApp (+91 91431 61829) if you'd like a more personal experience or have specific requests.

### What payment methods do you accept?

We accept UPI, credit/debit cards, net banking, and most major wallets through our secure checkout. For WhatsApp orders, we accept UPI transfers.

### Can I modify or cancel my order?

You can cancel or modify your order within **2 hours** of placing it. After that, it may have already been dispatched. Message us on WhatsApp immediately and we'll do our best.

## Shipping

### How long does delivery take?

Orders are dispatched within 1–3 business days. Delivery typically takes 3–8 business days depending on your location. Kolkata deliveries are usually faster (1–3 days after dispatch).

### Do you ship outside India?

Currently we ship within India only. For international shipping enquiries, please contact us on WhatsApp.

### How do I track my order?

You'll receive a tracking link via WhatsApp once your order is dispatched.

## Products & Sizing

### Are your garments true to size?

Our pieces are designed with ease and comfort in mind. Refer to our Size Guide for detailed measurements. When in doubt, size up. You can also WhatsApp us with your measurements for a personalised recommendation.

### Will colours look the same as in photos?

We photograph in natural light to show colours as accurately as possible. Slight variations can occur due to screen settings. Natural and vegetable-dyed fabrics may also have subtle variations — these are part of the handloom character, not defects.

### Is there colour bleeding in the first wash?

Some natural-dyed fabrics may release a small amount of dye in the first 1–2 washes. Always wash separately initially. This is completely normal and part of working with authentic handloom.

## Handloom & Craft

### Where are your garments made?

All Womaniya pieces are handcrafted by skilled artisans across India — primarily from Bengal, Andhra Pradesh, and Odisha. We believe in paying fair wages and working directly with weavers.

### What fabrics do you use?

We work primarily with handwoven cotton, Jamdani, Ikkat, and Pochampally weaves. All fabrics are natural fibre-based — no synthetics.

### Can I request a custom or bespoke piece?

Yes! We love custom orders. Share your ideas via WhatsApp and we'll work with our artisans to create something special for you.

## Returns

### What is your return policy?

We accept returns within 7 days of delivery for unworn, unwashed items with original tags. See our full Returns & Exchanges page for details.

### How long does a refund take?

Refunds are processed within 5–7 business days of receiving the returned item, back to your original payment method.`,
        },
      },
      {
        section_type: 'cta',
        sort_order: 2,
        content_json: {
          title: 'Still Have Questions?',
          text: "We're just a WhatsApp message away. Ask us anything.",
          button_text: 'WhatsApp Us',
          button_url: 'https://wa.me/919143161829?text=Hi!%20I%20have%20a%20question.',
        },
      },
    ],
  },

  // ─── Privacy Policy ─────────────────────────────────────────────────────
  {
    slug: 'privacy-policy',
    title_en: 'Privacy Policy',
    title_bn: 'গোপনীয়তা নীতি',
    seo_title_en: 'Privacy Policy — Womaniya',
    seo_description_en: 'How Womaniya collects, uses, and protects your personal information.',
    page_type: 'static',
    sections: [
      {
        section_type: 'richtext',
        sort_order: 1,
        content_json: {
          content_en: `## Privacy Policy

*Last updated: March 2025*

Womaniya ("we", "us", "our") is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information when you shop with us.

## What We Collect

- **Contact details** — name, phone number, email address
- **Delivery information** — shipping address
- **Payment information** — processed securely via Razorpay/payment gateways (we do not store card details)
- **Order history** — to help with returns, exchanges, and support
- **WhatsApp conversations** — to process and support your orders

## How We Use Your Information

- To process and fulfil your orders
- To communicate order updates and tracking information
- To respond to your enquiries and support requests
- To improve our products and services
- To send occasional updates about new arrivals (only if you've opted in)

## What We Don't Do

- We do not sell, rent, or share your personal information with third parties for marketing purposes
- We do not store your payment card details
- We do not send unsolicited marketing messages

## Third-Party Services

We use trusted third-party services to operate our store:
- **Vercel** — website hosting
- **Payment gateways** — secure payment processing
- **Courier partners** — order delivery

Each of these partners has their own privacy policies and handles data in accordance with applicable laws.

## Data Security

We implement appropriate security measures to protect your data. Our website uses HTTPS encryption. Access to customer data is restricted to authorised team members only.

## Your Rights

You have the right to:
- Access the personal data we hold about you
- Request correction of inaccurate data
- Request deletion of your data (subject to legal obligations)
- Opt out of marketing communications at any time

To exercise any of these rights, contact us on WhatsApp: +91 91431 61829

## Cookies

Our website uses minimal, essential cookies for functionality (session management, cart persistence). We do not use tracking or advertising cookies.

## Changes to This Policy

We may update this policy from time to time. Significant changes will be communicated via our website or WhatsApp.

## Contact

For any privacy-related questions, please reach out via WhatsApp at +91 91431 61829 or email us at womaniya2019@gmail.com`,
        },
      },
    ],
  },

  // ─── Terms & Conditions ─────────────────────────────────────────────────
  {
    slug: 'terms-conditions',
    title_en: 'Terms & Conditions',
    title_bn: 'শর্তাবলি',
    seo_title_en: 'Terms & Conditions — Womaniya',
    seo_description_en: 'Terms and conditions for shopping with Womaniya.',
    page_type: 'static',
    sections: [
      {
        section_type: 'richtext',
        sort_order: 1,
        content_json: {
          content_en: `## Terms & Conditions

*Last updated: March 2025*

By using the Womaniya website and placing orders with us, you agree to the following terms.

## Products

- All products are **handcrafted** and may have minor variations in colour, texture, and dimensions — this is the nature of handloom and is not a defect
- Product images are representative; slight colour variation due to screen settings or natural dyeing is expected
- Availability is subject to stock — we reserve the right to cancel orders for out-of-stock items and issue a full refund

## Orders & Payments

- Orders are confirmed upon successful payment
- We reserve the right to refuse or cancel orders at our discretion, with a full refund issued
- Pricing is in Indian Rupees (INR) and includes applicable taxes
- We are not responsible for additional customs duties on international shipments (where applicable)

## Shipping

- Shipping timelines are estimates and subject to courier conditions
- Risk of loss passes to the buyer once the order is handed to the courier
- In the event of a lost shipment, we will work with the courier to resolve the issue

## Returns & Refunds

- Our return policy is detailed on the Returns & Exchanges page
- Refunds are issued to the original payment method within 5–7 business days of receiving returned goods

## Intellectual Property

- All content on the Womaniya website — including images, text, and designs — is our property or used with permission
- You may not reproduce, distribute, or use our content without written permission

## Limitation of Liability

To the extent permitted by law, Womaniya's liability for any claim related to a purchase is limited to the value of that purchase.

## Governing Law

These terms are governed by the laws of India. Any disputes will be subject to the jurisdiction of courts in Kolkata, West Bengal.

## Contact

For questions about these terms, WhatsApp us at +91 91431 61829.`,
        },
      },
    ],
  },

  // ─── Sustainability ──────────────────────────────────────────────────────
  {
    slug: 'sustainability',
    title_en: 'Our Sustainability Commitment',
    title_bn: 'আমাদের টেকসই প্রতিশ্রুতি',
    seo_title_en: 'Sustainability — Womaniya Conscious Handloom',
    seo_description_en: "How Womaniya commits to ethical fashion, fair artisan wages, natural fibres, and preserving India's handloom heritage.",
    page_type: 'landing',
    sections: [
      {
        section_type: 'richtext',
        sort_order: 1,
        content_json: {
          content_en: `## Fashion That Gives Back

At Womaniya, we believe fashion should be beautiful without being wasteful. Every choice we make — from the fibres we source to the artisans we partner with — is guided by a simple principle: **do less harm, create more good**.

## Natural Fibres Only

We work exclusively with natural fibres — cotton, silk, linen, and their handwoven blends. No synthetics, no microplastics, no fast-fashion shortcuts. Natural fibres are biodegradable, breathable, and kinder to the planet.

## Fair Artisan Wages

Every Womaniya piece is handcrafted by skilled weavers — many of them women — in weaving communities across Bengal, Andhra Pradesh, and Odisha. We pay **above-market wages** and build long-term relationships with our artisan partners. We believe the person who makes your garment deserves as much consideration as the person who wears it.

## Slow Fashion by Design

We don't do seasons. We don't do mass production. We create limited, thoughtful collections that are meant to last — garments you'll reach for again and again, not throw away after one season. Buy less, choose well, keep longer.

## Preserving a Living Heritage

The handloom traditions we work with — Jamdani, Ikkat, Pochampally, Kantha — are UNESCO-recognised heritage crafts. Every Womaniya purchase directly supports the survival of these traditions and the communities built around them.

## Minimal Packaging

Our garments are packed in recycled tissue paper and biodegradable packaging. We avoid plastic wherever possible. Our shipping bags are 100% recycled materials.

## What We're Still Working On

We're honest about our journey. We're working on:
- Transitioning to fully natural dyes across all product lines
- Measuring and reducing our carbon footprint more formally
- Building more transparent supply chain documentation

We believe in progress, not perfection.`,
        },
      },
      {
        section_type: 'quote',
        sort_order: 2,
        content_json: {
          text: 'The most sustainable garment is the one you already love. Buy once, wear forever.',
          author: 'Womaniya',
        },
      },
      {
        section_type: 'cta',
        sort_order: 3,
        content_json: {
          title: 'Shop with Purpose',
          text: 'Every Womaniya purchase supports real artisans and keeps a living heritage alive.',
          button_text: 'Explore the Collection',
          button_url: '/shop',
        },
      },
    ],
  },
];

/* ── Runner ──────────────────────────────────────────────────────────── */
async function run() {
  console.log(`Seeding ${SEED_PAGES.length} pages…\n`);

  for (const seed of SEED_PAGES) {
    // Upsert page
    const existing = await db.query.pages.findFirst({
      where: (p, { eq }) => eq(p.slug, seed.slug),
    });

    let pageId: number;

    if (existing) {
      await db
        .update(pages)
        .set({
          title_en:           seed.title_en,
          title_bn:           seed.title_bn ?? null,
          seo_title_en:       seed.seo_title_en ?? null,
          seo_description_en: seed.seo_description_en ?? null,
          page_type:          seed.page_type,
          status:             'published',
          published_at:       new Date(),
          updated_at:         new Date(),
        })
        .where(eq(pages.id, existing.id));
      pageId = existing.id;
      console.log(`  ✓ Updated   [${pageId}] ${seed.slug}`);
    } else {
      const [created] = await db
        .insert(pages)
        .values({
          slug:               seed.slug,
          title_en:           seed.title_en,
          title_bn:           seed.title_bn ?? null,
          seo_title_en:       seed.seo_title_en ?? null,
          seo_description_en: seed.seo_description_en ?? null,
          page_type:          seed.page_type,
          status:             'published',
          published_at:       new Date(),
          images:             [],
        })
        .returning({ id: pages.id });
      pageId = created.id;
      console.log(`  ✓ Created   [${pageId}] ${seed.slug}`);
    }

    // Replace sections — delete existing then re-insert
    await db.delete(pageSections).where(eq(pageSections.page_id, pageId));

    for (const sec of seed.sections) {
      await db.insert(pageSections).values({
        page_id:      pageId,
        section_type: sec.section_type,
        content_json: sec.content_json,
        sort_order:   sec.sort_order,
      });
    }
    console.log(`            └─ ${seed.sections.length} section(s) written`);
  }

  console.log('\n✅ All pages seeded successfully.\n');
  process.exit(0);
}

run().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
