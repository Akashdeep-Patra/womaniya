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

  // ─── Returns & Exchanges ────────────────────────────────────────────────
  {
    slug: 'returns-exchanges',
    title_en: 'Returns & Exchanges',
    title_bn: 'রিটার্ন ও এক্সচেঞ্জ',
    seo_title_en: 'Returns & Exchange Policy — Womaniya',
    seo_description_en: 'We want you to love every Womaniya piece. Read our 7-day return and exchange policy for handloom and Jamdani sarees.',
    page_type: 'static',
    sections: [
      {
        section_type: 'hero',
        sort_order: 0,
        content_json: {
          title: 'Our Returns & Exchange Policy',
          subtitle: 'Every piece is made with care. If something isn\'t right, we\'ll make it right.',
          image_url: '/instagram/2026-02-25_12-56-26_UTC_3.jpg',
          cta_text: 'Contact Us on WhatsApp',
          cta_url: 'https://wa.me/919143161829?text=Hi%20Womaniya!%20I%20would%20like%20to%20return%20or%20exchange%20an%20item.',
        },
      },
      {
        section_type: 'richtext',
        sort_order: 1,
        content_json: {
          content_en: `## Our Promise to You

Every Womaniya saree is handwoven by master artisans and passes through a careful quality inspection before it leaves our hands. We take great pride in what we send to you — and if anything isn't right, we want to know.

## Return Policy — 7 Days

We accept returns within **7 days of delivery**, provided the item meets the following conditions:

- The saree is **unworn, unwashed, and unaltered**
- All **original tags are intact** and attached
- The piece is in its **original tissue-wrapped packaging**
- There are no stains, perfume traces, or signs of handling
- The blouse piece (if included) has not been cut or stitched

We understand that shopping handwoven sarees online requires trust. If you receive something that doesn't match your expectations, we will always work with you to find a resolution.

## What Cannot Be Returned

The following items are not eligible for return:

- Sarees purchased during a **sale, promotional offer, or at a discounted price**
- **Made-to-order or customised** pieces (including custom blouse stitching)
- Items showing signs of wear, washing, pressing, or perfume
- Pieces returned without original tags or packaging
- Items where more than 7 days have elapsed since delivery

## How to Initiate a Return

The process is simple and entirely handled over WhatsApp:

1. **Message us on WhatsApp** at +91 91431 61829 within 7 days of receiving your order
2. Share your **order number** and the reason for return (photos help us process faster)
3. We will confirm eligibility and coordinate a **free doorstep pickup** from your address
4. Once the saree arrives with us and passes inspection, your refund or exchange is processed promptly

## Exchanges

Would you prefer a different colourway, weave, or style? We are happy to arrange an exchange — subject to availability. If the piece you want is not currently in stock, we will issue **store credit** or a **full refund** to your original payment method.

## Refund Timeline

- Refunds are initiated within **5–7 business days** of us receiving and inspecting the returned saree
- Funds are returned to the **original payment method** — UPI, credit card, debit card, or net banking
- You will receive a **WhatsApp confirmation** with the refund reference once it has been processed
- Bank processing times may add an additional 2–3 days depending on your bank

## Received a Damaged or Wrong Item?

If your order arrived damaged, with a weaving flaw, or if you received the wrong piece — please message us **immediately** with clear photographs. We will arrange a replacement or full refund at absolutely no cost to you. No lengthy forms, no arguments. Your trust matters more than anything else.

## Custom Saree Orders

For made-to-order pieces, including sarees woven to a specific colour, count, or border design, we are unable to accept returns as each piece is created exclusively for you. However, if there is a quality or craftsmanship issue, we will always make it right.`,
        },
      },
      {
        section_type: 'quote',
        sort_order: 2,
        content_json: {
          text: 'Every thread is woven with intention. If a piece doesn\'t feel right, we will make it right — no questions asked.',
          author: 'Womaniya',
        },
      },
      {
        section_type: 'cta',
        sort_order: 3,
        content_json: {
          title: 'Need to Return or Exchange?',
          text: 'Reach out to us on WhatsApp within 7 days of delivery. We will walk you through everything and make the process as seamless as possible.',
          button_text: 'Start a Return on WhatsApp',
          button_url: 'https://wa.me/919143161829?text=Hi%20Womaniya!%20I%20would%20like%20to%20initiate%20a%20return%20for%20my%20order.',
        },
      },
    ],
  },

  // ─── Shipping & Delivery ────────────────────────────────────────────────
  {
    slug: 'shipping-delivery',
    title_en: 'Shipping & Delivery',
    title_bn: 'শিপিং ও ডেলিভারি',
    seo_title_en: 'Shipping & Delivery Policy — Womaniya Handloom Sarees',
    seo_description_en: 'Womaniya ships handloom and Jamdani sarees across India from Kolkata. Learn about our shipping timelines, charges, and order tracking.',
    page_type: 'static',
    sections: [
      {
        section_type: 'hero',
        sort_order: 0,
        content_json: {
          title: 'Shipping & Delivery',
          subtitle: 'Your handwoven saree, carefully packed and dispatched from the heart of Kolkata.',
          image_url: '/instagram/2026-02-25_12-56-26_UTC_1.jpg',
          cta_text: 'Shop Now',
          cta_url: '/shop',
        },
      },
      {
        section_type: 'richtext',
        sort_order: 1,
        content_json: {
          content_en: `## Dispatched with Love from Kolkata

Every Womaniya saree is handwoven in Bengal and carefully packed by hand before it travels to you. We use trusted courier partners — currently **Blue Dart** and **Delhivery** — to ensure your piece arrives safely, wherever you are in India.

## Order Processing Time

- Orders are processed within **1–2 business days** of payment confirmation
- During festive seasons (Durga Puja, Diwali, Eid) or sale periods, processing may extend to **3–4 business days**
- You will receive a **WhatsApp message with your AWB tracking number** as soon as your order is dispatched
- Orders placed on Sundays or public holidays are processed the next business day

## Delivery Timelines

| Location | Estimated Delivery |
|---|---|
| **Kolkata (within city)** | 1–2 business days after dispatch |
| **West Bengal (rest of state)** | 2–3 business days after dispatch |
| **Major metros** (Delhi, Mumbai, Bengaluru, Chennai, Hyderabad, Pune) | 3–5 business days after dispatch |
| **Rest of India** | 5–7 business days after dispatch |
| **Remote areas, Andaman & Nicobar, Lakshadweep** | 7–14 business days after dispatch |
| **North-East India** | 7–10 business days after dispatch |

These are estimates based on typical courier transit times and may vary due to local conditions, weather, or public holidays.

## Shipping Charges

- **Free shipping** on all orders above **₹1,499**
- **₹99 flat fee** for orders below ₹1,499
- For remote pin codes, an additional ₹50–₹100 surcharge may apply — we will notify you before dispatching

## Tracking Your Order

Once your saree is dispatched, you will receive:
- A **WhatsApp message** with the courier name, AWB number, and a tracking link
- You can track your shipment directly on the courier's website

If you haven't received tracking details within 3 business days of ordering, please message us on WhatsApp.

## Packaging

We take packaging seriously because your saree is precious. Every order is:
- Wrapped in **recycled tissue paper**
- Placed in a **biodegradable kraft mailer** or rigid box for fragile pieces
- Sealed securely to prevent any moisture or transit damage

We are gradually eliminating all plastic from our packaging.

## International Shipping

We currently ship within **India only**. If you are based abroad and would like to order, please reach out to us on WhatsApp (+91 91431 61829) — we can sometimes arrange international delivery through third-party logistics partners for a custom quote.

## Urgent or Same-Day Delivery (Kolkata Only)

Need a saree urgently for a puja or occasion? Message us on WhatsApp before noon on a weekday and we'll do our best to arrange same-day or next-day delivery within Kolkata at an additional charge.`,
        },
      },
      {
        section_type: 'cta',
        sort_order: 2,
        content_json: {
          title: 'Questions About Your Order?',
          text: 'We are always happy to help. Message us on WhatsApp and we will get back to you within a few hours on business days.',
          button_text: 'WhatsApp Us',
          button_url: 'https://wa.me/919143161829?text=Hi%20Womaniya!%20I%20have%20a%20question%20about%20my%20order%20or%20shipping.',
        },
      },
    ],
  },

  // ─── Care Guide ─────────────────────────────────────────────────────────
  {
    slug: 'care-guide',
    title_en: 'Care Guide',
    title_bn: 'যত্নের নির্দেশিকা',
    seo_title_en: 'How to Care for Your Handloom Saree — Womaniya Care Guide',
    seo_description_en: 'Detailed care instructions for Jamdani, handloom cotton, and silk sarees from Womaniya. Washing, drying, ironing, folding, and storage tips.',
    page_type: 'landing',
    sections: [
      {
        section_type: 'hero',
        sort_order: 0,
        content_json: {
          title: 'Caring for Your Womaniya Saree',
          subtitle: 'A handwoven Jamdani or handloom saree is not just fabric — it is a living textile. Treat it with care and it will only grow more beautiful.',
          image_url: '/instagram/2026-02-11_10-27-03_UTC_1.jpg',
          cta_text: 'Shop the Collection',
          cta_url: '/shop',
        },
      },
      {
        section_type: 'richtext',
        sort_order: 1,
        content_json: {
          content_en: `## Why Handloom Needs Special Care

Handwoven sarees — whether Jamdani, Tant, Muslin, or Kantha silk — are made from natural fibres on traditional looms by skilled artisans. Unlike mill-made fabrics, handloom has a distinctive texture, a natural lustre, and a gentle hand-feel that should be preserved with mindful care. The good news: handloom only gets softer and more beautiful with every careful wash.

## Washing Your Saree

**For Jamdani and fine Muslin sarees:**
- Always **hand wash** — machine washing risks snagging the delicate motifs
- Use **cold water only** — hot water weakens the fine threads and causes shrinkage
- Dissolve a small amount of **mild, pH-neutral detergent** (Ezee, Genteel, or baby shampoo) in water before adding the saree
- Gently **swish and press** — never scrub, rub, or wring
- Rinse thoroughly with cold water until all soap is removed
- Gently **squeeze** (never twist) to remove excess water, then roll in a clean white towel

**For Tant (cotton handloom) sarees:**
- These are slightly more robust and can be hand-washed or machine-washed on the **delicate/gentle cycle**
- Place inside a **mesh laundry bag** before putting in the machine
- Use cold water and a gentle detergent
- Avoid spin cycles above 400 RPM — excess centrifugal force damages the weave structure

**For Kantha silk and Baluchari sarees:**
- Hand wash only, or opt for **professional dry cleaning**
- If hand washing, use the gentlest touch — these silks are delicate and precious
- Never soak for more than 5 minutes

## Drying

- Always dry **in the shade** — direct sunlight fades natural and vegetable dyes over time and weakens the fibre
- Hang from the shoulder seam or lay flat on a clean dry towel
- **Never hang from a single clip or peg on the hem** — the weight of the wet fabric will stretch the border
- Keep away from the tumble dryer entirely — heat damages handloom fibres and causes permanent shrinkage
- If possible, dry flat for Jamdani and Muslin pieces to preserve their drape

## Ironing & Pressing

- Iron on **medium-low heat** while the fabric is still slightly damp for the smoothest results
- Always iron on the **reverse (wrong) side** to protect the surface and any woven motifs
- For Jamdani: place a thin **cotton muslin cloth** between the iron and the fabric to protect the intricate threadwork
- Never iron directly over any embroidery, sequins, or embellishments
- For silk sarees: use the lowest heat setting and a pressing cloth — silk scorches easily
- Avoid steam irons on very fine Muslin — the steam can cause water marks

## Storing Your Saree

Proper storage is as important as proper washing:

- Store only when the saree is **completely clean and bone dry** — even slight dampness can cause mildew
- Fold neatly and store inside a **soft cotton muslin bag** (the ones we pack our sarees in are perfect for this)
- Avoid plastic bags and airtight containers — synthetic materials trap moisture and can damage natural fibres over time
- Add a **neem leaf sachet, cedar block, or lavender pouch** to deter moths and silverfish naturally — avoid synthetic moth balls as the chemicals can damage natural fibres
- **Refold along slightly different lines** every 3–4 months to prevent permanent crease marks from forming along the same fold
- Heavier silk sarees can be rolled onto acid-free tissue rather than folded flat

## Colour Care

- Natural and vegetable-dyed fabrics — which we use across many of our collections — may release a small amount of dye in the **first 1–2 washes**. This is completely normal.
- Always **wash separately** for the first 3–4 washes
- Avoid prolonged soaking, which can cause colour bleeding
- If washing with other garments later, group by colour family

## Blouse Piece Care

The blouse piece included with your saree follows the same care guidelines as the saree itself. If you have had your blouse stitched, follow the care instructions appropriate to any additional fabric (lining, padding) added by your tailor.

## When to Dry Clean

Professional dry cleaning is only necessary for:
- Structured or heavily embellished pieces (zari, heavy embroidery, sequins)
- Very old or heirloom sarees
- Pieces with complex pleating or construction

If you do dry clean, always inform the professional that the garment is **handwoven natural fibre** so they use appropriate solvents.`,
        },
      },
      {
        section_type: 'image_text',
        sort_order: 2,
        content_json: {
          image_url: '/instagram/2026-02-25_12-56-26_UTC_6.jpg',
          title: 'The Art of Folding a Saree',
          text: 'Fold your saree lengthwise three times so the border lies along the top edge. Then fold in thirds or quarters from end to end, placing the pallu (decorative end) on top. Store with the pallu facing out so you can identify it without unfolding. Avoid pressing the pallu fold hard — let it rest gently. Refolding periodically along slightly different lines prevents permanent crease marks.',
          layout: 'image_right',
        },
      },
      {
        section_type: 'gallery',
        sort_order: 3,
        content_json: {
          images: [
            '/instagram/2026-02-25_12-56-26_UTC_4.jpg',
            '/instagram/2026-02-25_12-56-26_UTC_7.jpg',
            '/instagram/2026-02-23_06-34-00_UTC_2.jpg',
            '/instagram/2026-02-11_10-27-03_UTC_3.jpg',
            '/instagram/2026-02-02_12-37-01_UTC_1.jpg',
            '/instagram/2026-01-30_12-28-39_UTC_2.jpg',
          ],
        },
      },
      {
        section_type: 'quote',
        sort_order: 4,
        content_json: {
          text: 'A handloom saree cared for with intention tells a story that only grows richer with every draping.',
          author: 'Womaniya',
        },
      },
      {
        section_type: 'cta',
        sort_order: 5,
        content_json: {
          title: 'Have a Care Question?',
          text: 'Not sure how to handle a specific fabric or situation? Message us on WhatsApp — we love talking about textiles.',
          button_text: 'Ask Us on WhatsApp',
          button_url: 'https://wa.me/919143161829?text=Hi%20Womaniya!%20I%20have%20a%20question%20about%20caring%20for%20my%20saree.',
        },
      },
    ],
  },

  // ─── Size Guide ─────────────────────────────────────────────────────────
  {
    slug: 'size-guide',
    title_en: 'Size Guide',
    title_bn: 'মাপের গাইড',
    seo_title_en: 'Saree & Blouse Size Guide — Womaniya Handloom',
    seo_description_en: 'Everything you need to know about saree lengths, blouse measurements, and how to find your perfect fit with Womaniya.',
    page_type: 'static',
    sections: [
      {
        section_type: 'hero',
        sort_order: 0,
        content_json: {
          title: 'Finding Your Perfect Fit',
          subtitle: 'Every Womaniya saree is woven to a generous standard length. Here\'s everything you need to know about sizing and blouse measurements.',
          image_url: '/instagram/2026-02-25_12-56-26_UTC_5.jpg',
          cta_text: 'Need Help? WhatsApp Us',
          cta_url: 'https://wa.me/919143161829?text=Hi%20Womaniya!%20I%20need%20help%20with%20sizing%20and%20measurements.',
        },
      },
      {
        section_type: 'richtext',
        sort_order: 1,
        content_json: {
          content_en: `## Saree Length — One Size Fits All

The beauty of a saree is its universality. All Womaniya sarees are woven to the Indian standard length:

- **Total length: 5.5 metres (18 feet)**
- **Blouse piece: 0.8 metres (80 cm)** included with every saree, woven from the same fabric

This is the standard saree length across India and accommodates all body types and draping styles — whether you prefer the Nivi drape, Bengali style, Seedha pallu, or any regional variation.

## The Blouse Piece

Every Womaniya saree comes with a **matching 0.8m blouse piece** cut from the same handloom fabric. This is enough fabric to stitch a standard blouse:

- **Up to size 42" chest** comfortably
- For chest sizes above 42", please message us before ordering — some of our sarees can be made with an extended blouse piece (0.9m–1m) on request

The blouse piece is **unstitched** — you will need to get it stitched by a local tailor to your measurements.

## Blouse Measurement Guide

When giving measurements to your tailor, take the following measurements wearing the undergarments you intend to wear:

| Measurement | How to Take |
|---|---|
| **Chest** | Around the fullest part of the bust, tape parallel to the floor |
| **Waist** | Around the natural waist (narrowest point) |
| **Back length** | From the back of the neck to the waist |
| **Sleeve length** | From shoulder point to desired hem |
| **Shoulder width** | From one shoulder point to the other, across the back |
| **Armhole depth** | From the top of the shoulder to the armpit |

**Tip:** Always give your tailor your actual measurements and let them add ease. A well-fitted blouse should allow you to raise your arms comfortably without pulling.

## Recommended Blouse Styles for Our Sarees

| Fabric | Recommended Blouse Style |
|---|---|
| **Jamdani (fine muslin)** | Simple back-neck or boat neck, princess cut, elbow sleeves |
| **Tant (cotton handloom)** | Short sleeves, puff sleeves, or sleeveless work well |
| **Kantha silk** | Structured princess cut or embellished with matching border trims |
| **Linen blend** | Casual sleeveless or cap-sleeve for a contemporary look |

## Saree Fall & Pico

A **fall** (a narrow strip of fabric stitched to the inner edge of the saree) helps the saree drape better and reduces wear on the border. A **pico** (scalloped edge finishing) is done on the pallu edge. We recommend getting both done before first wearing — most tailors charge ₹80–₹150 for this service.

## Petticoat & Underskirt

A petticoat (inskirt) should match the dominant colour of the saree. Standard petticoat length is 38"–42" floor length. Petticoat fabric should be smooth and lightweight — satin or cotton are ideal under handloom sarees.

## Not Sure? Ask Us.

If you are unsure about any measurement or have a specific question about fit, simply WhatsApp us with your measurements at +91 91431 61829. We have styled hundreds of customers across all body types and are always happy to help.`,
        },
      },
      {
        section_type: 'cta',
        sort_order: 2,
        content_json: {
          title: 'Need Personalised Sizing Advice?',
          text: 'Send us your measurements on WhatsApp and we will guide you to the perfect saree and blouse combination.',
          button_text: 'WhatsApp for Sizing Help',
          button_url: 'https://wa.me/919143161829?text=Hi%20Womaniya!%20I%20need%20help%20with%20my%20blouse%20measurements%20and%20sizing.',
        },
      },
    ],
  },

  // ─── Contact ────────────────────────────────────────────────────────────
  {
    slug: 'contact',
    title_en: 'Contact Us',
    title_bn: 'যোগাযোগ করুন',
    seo_title_en: 'Contact Womaniya — WhatsApp, Email & Instagram',
    seo_description_en: 'Get in touch with Womaniya for orders, returns, styling advice, custom sarees, or wholesale enquiries. We\'re based in Kolkata.',
    page_type: 'static',
    sections: [
      {
        section_type: 'hero',
        sort_order: 0,
        content_json: {
          title: 'We\'d Love to Hear from You',
          subtitle: 'Questions, styling requests, custom orders, or just a conversation about handloom — we are always here.',
          image_url: '/instagram/2026-02-23_06-34-00_UTC_1.jpg',
          cta_text: 'Message Us on WhatsApp',
          cta_url: 'https://wa.me/919143161829?text=Hi%20Womaniya!',
        },
      },
      {
        section_type: 'richtext',
        sort_order: 1,
        content_json: {
          content_en: `## The Fastest Way to Reach Us

### WhatsApp (Preferred)

For the quickest response, reach us on WhatsApp. We typically reply within **2–4 hours** on business days. WhatsApp is also where you will receive your order confirmations and shipping updates.

**+91 91431 61829**

Available: **Monday to Saturday, 10:00 AM – 7:00 PM IST**

For orders placed outside these hours, we will respond the next business morning.

### Email

Prefer email? Write to us at:

**hello@womaniya.in**

We respond to emails within **1 business day**.

### Instagram

Follow us at **@womaniyakolkata** for new arrivals, weaver stories, styling inspiration, and behind-the-scenes from our craft communities. You can also DM us on Instagram — we read every message.

## Visit Us

We are a **digital-first brand based in Kolkata, West Bengal**, and we do not currently have a physical retail store. However, we host **pop-up exhibitions and trunk shows** in Kolkata several times a year — follow us on Instagram to stay updated.

If you are visiting Kolkata and would like to see our collection in person, message us in advance and we will try to arrange a private viewing.

## Wholesale & Retail Partnerships

We work with a select number of boutiques and multi-brand stores that share our values of handloom, sustainability, and fair craft. If you are interested in stocking Womaniya, please reach out via WhatsApp with:
- Your store name and location
- A brief description of your store and customer profile
- Approximate quantity of interest

## Press, Collaborations & Styling

We love collaborating with **photographers, stylists, filmmakers, writers, and content creators** who are passionate about handloom, slow fashion, or Indian heritage textiles. Reach out on WhatsApp or Instagram DM with your portfolio or proposal.

## Custom & Bespoke Orders

Every Womaniya saree is already made with care — but if you have a specific vision for a wedding, occasion, or gifting, we can work with our artisans to create something entirely bespoke for you. Custom orders are accepted on a case-by-case basis with a **minimum 4–6 week lead time**.`,
        },
      },
      {
        section_type: 'image_text',
        sort_order: 2,
        content_json: {
          image_url: '/instagram/2026-02-25_12-56-26_UTC_8.jpg',
          title: 'Rooted in Kolkata, Woven Across Bengal',
          text: 'Womaniya was born in Kolkata — a city that has always held handloom at its cultural heart. Every saree we create carries the spirit of Bengal\'s weaving traditions, from the fine Jamdani muslins of Dhaka-descended weavers to the bold geometrics of Tant weavers in Nadia and Murshidabad. When you write to us, you are speaking to a small team that genuinely loves every piece we create.',
          layout: 'image_left',
        },
      },
      {
        section_type: 'cta',
        sort_order: 3,
        content_json: {
          title: 'Say Hello',
          text: 'Drop us a message — whether it\'s about a saree you loved, one you\'re looking for, or just to talk handloom.',
          button_text: 'WhatsApp Us Now',
          button_url: 'https://wa.me/919143161829?text=Hi%20Womaniya!%20I%27d%20like%20to%20get%20in%20touch.',
        },
      },
    ],
  },

  // ─── FAQ ────────────────────────────────────────────────────────────────
  {
    slug: 'faq',
    title_en: 'Frequently Asked Questions',
    title_bn: 'সাধারণ প্রশ্নাবলি',
    seo_title_en: 'FAQ — Womaniya Handloom & Jamdani Sarees',
    seo_description_en: 'Answers to common questions about Womaniya sarees, Jamdani, orders, shipping, returns, sizing, and handloom care.',
    page_type: 'static',
    sections: [
      {
        section_type: 'hero',
        sort_order: 0,
        content_json: {
          title: 'Frequently Asked Questions',
          subtitle: 'Everything you want to know about Womaniya sarees, orders, and the craft behind every piece.',
          image_url: '/instagram/2026-02-02_12-37-01_UTC_1.jpg',
          cta_text: 'Still Have Questions? WhatsApp Us',
          cta_url: 'https://wa.me/919143161829?text=Hi%20Womaniya!%20I%20have%20a%20question.',
        },
      },
      {
        section_type: 'richtext',
        sort_order: 1,
        content_json: {
          content_en: `## About Womaniya & Our Sarees

## What is Womaniya?

Womaniya is a premium handwoven Bengali fashion brand based in Kolkata, West Bengal. We specialise in Jamdani, Tant, and handloom sarees made by skilled artisans from Bengal's weaving communities. Every piece is authentic, ethically made, and crafted without compromise.

## What makes Womaniya sarees different?

We work directly with master weavers — cutting out middlemen entirely. This means our artisans earn a fair wage, our prices reflect true craft value, and you receive a piece with documented provenance. We do not sell machine-printed imitations or mill-made sarees. Every piece on our platform is genuinely handwoven.

## What is Jamdani?

Jamdani is a fine handwoven muslin fabric with intricate geometric or floral motifs woven directly into the fabric using extra weft threads. It originated in the Dhaka region (present-day Bangladesh) and is recognised by UNESCO as an Intangible Cultural Heritage of Humanity. Bengali weavers have been weaving Jamdani for over 300 years. The finest Jamdani is gossamer-light and extraordinarily labour-intensive — a single saree can take 2–4 weeks to weave.

## Are your sarees handwoven or handblock printed?

All sarees listed under our handloom categories are **handwoven on pit looms or frame looms**. The motifs are woven into the fabric, not printed on. We also carry a small selection of hand-block printed pieces, which are clearly labelled.

---

## Orders & Payment

## How do I place an order?

You can browse our shop and add items to your cart for instant checkout. We also accept **orders directly via WhatsApp** (+91 91431 61829) if you would like to see more photos, ask questions about a specific piece, or arrange a custom order.

## What payment methods do you accept?

We accept all major UPI apps (GPay, PhonePe, Paytm), credit cards, debit cards, net banking, and most digital wallets through our secure payment gateway. For WhatsApp orders, we accept UPI transfers (GPay, BHIM, PhonePe) or bank transfer.

## Can I modify or cancel my order?

Yes — within **2 hours** of placing the order. After that, your saree may already be in the packing process. Please message us on WhatsApp immediately and we will do everything we can to accommodate your request.

## Do you accept COD (Cash on Delivery)?

We currently do not offer COD. All orders must be prepaid.

## Can I order as a gift?

Absolutely! We can include a handwritten gift note with your order. Simply mention this when ordering via WhatsApp, or add a note at checkout. We also offer beautiful gift packaging — please ask us about it.

---

## Shipping & Delivery

## How long does delivery take?

Orders are dispatched within 1–2 business days. Estimated delivery after dispatch:
- Kolkata: 1–2 days
- Rest of West Bengal: 2–3 days
- Major metros: 3–5 days
- Rest of India: 5–7 days

## Do you ship outside India?

Currently we ship within India only. For international orders, please contact us on WhatsApp and we will try to find a solution.

## How do I track my order?

Once dispatched, you will receive a **WhatsApp message with your AWB tracking number** and the courier partner's name. You can use this to track on the courier's website.

## Is my saree insured during transit?

Yes. All Womaniya orders are insured during transit. In the unlikely event of loss or damage during shipping, we will send a replacement or issue a full refund.

---

## Sarees, Sizing & Fabric

## What length are your sarees?

All Womaniya sarees are **5.5 metres** in length, with a **0.8 metre blouse piece** included — the standard size for Indian sarees.

## Do I need to get the saree fall and pico done?

We recommend it. A fall (inner border strip) helps the saree drape better and protects the border edge from wear. A pico (decorative edge finishing) is done on the pallu. Most tailors charge ₹80–₹150 for this service.

## What blouse size does the included blouse piece accommodate?

The standard 0.8m blouse piece comfortably accommodates up to a **42" chest**. For larger sizes, please message us before ordering.

## Will the colours look exactly as in the photos?

We photograph all our sarees in natural daylight to represent colours as accurately as possible. However, slight variations can occur due to screen calibration and natural dyeing processes. Handloom fabrics may also have subtle variations in colour — this is a sign of authenticity, not a defect.

## What fabrics do you use?

We work exclusively with **natural fibres**: fine cotton, silk, linen, and their handwoven blends. Our weaves include Jamdani, Tant, Muslin, Kantha, and Linen-cotton blends. No synthetics. No mill-made fabrics.

## Can I request a custom colour or design?

Yes! Custom orders are one of our favourite things to do. Share your vision via WhatsApp and we will discuss what is possible with our weavers. Custom orders require a **minimum 4–6 week lead time** and full advance payment.

---

## Returns & Care

## What is your return policy?

We accept returns within **7 days of delivery** for unworn, unwashed items with original tags and packaging intact. See our full Returns & Exchanges page for complete details.

## My saree arrived with a small weaving irregularity. Is this a defect?

Handwoven textiles naturally contain subtle irregularities — a slightly uneven weft thread, a small loop, or a minor texture variation. These are not defects; they are evidence of hand-weaving and part of the beauty of the craft. However, if you notice something that significantly affects the appearance or drape, please send us photos and we will assess it.

## How do I wash my Jamdani saree?

Always hand wash in cold water with a mild, pH-neutral detergent. Never wring or twist. Dry in shade. See our full Care Guide for detailed instructions for every fabric type.

---

## About Our Artisans

## Who makes your sarees?

Our sarees are made by master weavers from Bengal's weaving communities — primarily from Murshidabad, Nadia, Hooghly, and the Dhaka-lineage weaving clusters of West Bengal. We also work with Kantha embroiderers from Birbhum district. We pay above-market wages and build long-term relationships with our artisan partners.

## How many people work on a single saree?

A Jamdani saree typically requires a team of **two weavers** working side by side on a single loom. Weaving a fine Jamdani saree can take **2–4 weeks** of full-time work. Additional artisans may be involved in pre-loom processes — thread dyeing, warping, and design preparation.`,
        },
      },
      {
        section_type: 'cta',
        sort_order: 2,
        content_json: {
          title: 'Didn\'t Find Your Answer?',
          text: 'We are just a WhatsApp message away. Ask us anything — from fabric questions to styling advice.',
          button_text: 'Ask Us on WhatsApp',
          button_url: 'https://wa.me/919143161829?text=Hi%20Womaniya!%20I%20have%20a%20question%20that%20wasn\'t%20in%20the%20FAQ.',
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
    seo_description_en: 'How Womaniya collects, uses, and protects your personal information when you shop with us.',
    page_type: 'static',
    sections: [
      {
        section_type: 'richtext',
        sort_order: 0,
        content_json: {
          content_en: `## Privacy Policy

*Last updated: March 2025*

Womaniya ("we", "us", "our") is a handloom fashion brand operated from Kolkata, West Bengal, India. We are committed to protecting your privacy and handling your personal information with transparency and care. This Privacy Policy explains what data we collect, how we use it, and your rights in relation to it.

## Information We Collect

We collect personal information when you:

- **Place an order** — name, phone number, email address, and delivery address
- **Contact us on WhatsApp** — your WhatsApp number and conversation history
- **Browse our website** — basic analytics data (page views, device type, referrer) through privacy-respecting analytics
- **Subscribe to updates** — email address or WhatsApp number (only if you explicitly opt in)

### Payment Information

We do not store your payment card details. All payment processing is handled by our secure, PCI-DSS compliant payment gateway partners. We only see a transaction confirmation and reference number.

### Automatically Collected Information

Our website may collect standard technical information such as browser type, device type, approximate geographic location (country/city level), and pages visited. This information is used in aggregate to improve the website and is not linked to your identity.

## How We Use Your Information

We use your personal information to:

- **Process and fulfil your orders** — including communicating with courier partners and sending you tracking information
- **Provide customer support** — responding to your queries, return requests, or complaints
- **Send order updates** — dispatch confirmation, delivery updates, and any issues with your order, via WhatsApp or email
- **Improve our products and service** — analysing aggregate purchase patterns and customer feedback
- **Send marketing communications** — only if you have explicitly opted in. You can opt out at any time.

We do not use your information for any other purpose without your explicit consent.

## What We Don't Do

- We do **not sell, rent, or trade** your personal information to any third party
- We do **not share your information** with advertisers or marketing networks
- We do **not store card numbers, CVVs, or banking credentials**
- We do **not send unsolicited marketing messages** (no spam)

## Third-Party Services

To run our business, we share limited information with trusted third parties:

| Service | Purpose | Data Shared |
|---|---|---|
| **Courier partners** (Blue Dart, Delhivery) | Order delivery | Name, phone, delivery address |
| **Payment gateways** | Secure payment processing | Transaction reference only |
| **Website hosting** | Serving the website | Server logs (IP, device, page) |
| **WhatsApp** (Meta) | Customer communication | Messages and contact details |

Each third-party partner operates under their own privacy policies and applicable data protection laws.

## Data Retention

We retain your personal information for as long as necessary to:
- Fulfil your order and handle any returns or disputes
- Comply with our legal and tax obligations (typically 7 years for financial records under Indian law)
- Resolve any disputes or legal claims

After this period, your data is securely deleted or anonymised.

## Data Security

We take reasonable technical and organisational measures to protect your personal information:
- Our website uses **HTTPS encryption** for all data in transit
- Access to customer order data is restricted to authorised team members only
- We do not store payment credentials
- WhatsApp communications are end-to-end encrypted by default

No digital system is 100% secure. If you believe your data has been compromised, please contact us immediately.

## Your Rights

Under applicable Indian law (IT Act 2000 and DPDP Act 2023) and general privacy principles, you have the right to:

- **Access** the personal data we hold about you
- **Correct** inaccurate or incomplete information
- **Request deletion** of your data (subject to legal retention obligations)
- **Withdraw consent** for marketing communications at any time
- **Object** to processing of your data for any purpose

To exercise any of these rights, contact us on WhatsApp at **+91 91431 61829** or by email at **hello@womaniya.in**. We will respond within 30 days.

## Cookies

Our website uses minimal, functional cookies:
- **Session cookies** — to maintain your shopping cart and login state
- **Security cookies** — to prevent cross-site request forgery

We do not use advertising cookies, tracking pixels, or third-party marketing cookies.

## Children's Privacy

Our products are intended for adults. We do not knowingly collect personal information from children under 18. If you believe a child has provided us with personal information, please contact us immediately.

## Changes to This Policy

We may update this Privacy Policy periodically. If we make significant changes, we will notify you via our website or, if you have opted in to communications, via WhatsApp or email. Continued use of our website after any update constitutes acceptance of the revised policy.

## Contact

For any privacy-related questions or to exercise your rights, please reach us at:

**WhatsApp:** +91 91431 61829
**Email:** hello@womaniya.in
**Address:** Kolkata, West Bengal, India`,
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
    seo_description_en: 'Terms and conditions governing the purchase of handloom sarees from Womaniya. Applicable Indian law, Kolkata jurisdiction.',
    page_type: 'static',
    sections: [
      {
        section_type: 'richtext',
        sort_order: 0,
        content_json: {
          content_en: `## Terms & Conditions

*Last updated: March 2025*

Welcome to Womaniya. By accessing our website and placing an order with us, you agree to be bound by these Terms & Conditions. Please read them carefully before purchasing.

## About Us

Womaniya is a handloom fashion brand operating from Kolkata, West Bengal, India. We sell authentic handwoven sarees and garments made by artisans across India. Contact: hello@womaniya.in | +91 91431 61829.

## Acceptance of Terms

By using this website or placing an order (whether via the website or WhatsApp), you confirm that:
- You are at least 18 years of age
- The information you provide is accurate and complete
- You agree to these Terms & Conditions in their entirety

## Product Descriptions & Accuracy

- All Womaniya products are **handcrafted by artisans** and inherently unique. Minor variations in colour, texture, border dimensions, motif placement, and finish are characteristic of handloom and are **not defects**
- Product photographs are taken in natural light to represent colours as accurately as possible. Slight variation due to screen calibration or natural dyeing processes is expected and normal
- We make every effort to ensure product descriptions are accurate. In the event of a material error, we reserve the right to cancel the affected order with a full refund
- **Availability** is subject to stock. We cannot guarantee availability after you have added an item to your cart. Orders are confirmed only upon successful payment and our written confirmation

## Pricing & Payment

- All prices are displayed in **Indian Rupees (INR)** and are inclusive of applicable GST
- Prices are subject to change without notice. The price at the time of confirmed order applies to that order
- We accept UPI, credit cards, debit cards, net banking, and digital wallets through our secure payment gateway
- Full payment is required before any order is dispatched. We do not offer Cash on Delivery
- We reserve the right to refuse any order at our sole discretion, including orders that appear to be fraudulent, and to issue a full refund in such cases

## Order Confirmation & Contract

An order is considered confirmed and a binding contract formed when:
1. You complete payment successfully, AND
2. We send you a WhatsApp or email confirmation with your order number

We reserve the right to cancel any order before dispatch due to: stock unavailability, pricing errors, payment issues, or suspicion of fraud. In all such cases, a full refund will be issued within 5–7 business days.

## Shipping & Delivery

- Delivery timelines provided are estimates and not guaranteed. We are not liable for delays caused by courier partners, weather, natural disasters, public holidays, or circumstances beyond our control
- Risk of loss transfers to you once the order is handed to the courier partner and a tracking number is generated
- For lost shipments, we will file a claim with the courier and work to resolve the issue — including replacement or refund — within 14 business days of confirmation of loss
- Any customs duties, import taxes, or surcharges for deliveries outside India (where applicable) are the buyer's responsibility

## Returns, Exchanges & Refunds

Our returns and refunds policy is governed by the separate **Returns & Exchanges** page, which forms part of these Terms. Key points:
- Returns accepted within 7 days of delivery for unworn, unwashed items with original tags
- Refunds processed within 5–7 business days of receiving returned goods
- Sale items, customised pieces, and made-to-order sarees are non-returnable

## Intellectual Property

- All content on the Womaniya website — including but not limited to product photographs, brand imagery, logo, written content, and design — is owned by Womaniya or used with permission
- You may not reproduce, copy, distribute, modify, or use any of our content for commercial purposes without written permission
- You may share our content on social media for personal, non-commercial purposes with appropriate credit

## User Conduct

When interacting with us via our website, WhatsApp, or social media, you agree not to:
- Provide false or misleading information
- Engage in abusive, threatening, or harassing conduct toward our team
- Attempt to defraud us or manipulate the return/refund process
- Infringe on the intellectual property rights of Womaniya or our artisan partners

## Limitation of Liability

To the fullest extent permitted by applicable Indian law:
- Womaniya's total liability for any claim arising from a purchase is limited to the purchase price of the specific product(s) involved
- We are not liable for indirect, consequential, special, or incidental damages (including loss of profit, loss of data, or loss of use) arising from the use of our products or services
- We do not warrant that the website will be available without interruption or error

## Governing Law & Dispute Resolution

- These Terms & Conditions are governed by the laws of the **Republic of India**
- Any dispute arising out of or in connection with these terms shall first be attempted to be resolved through good-faith negotiation via WhatsApp or email
- If unresolved, disputes shall be subject to the exclusive jurisdiction of the courts in **Kolkata, West Bengal**
- Nothing in these terms limits your statutory rights under Indian consumer protection law

## Changes to Terms

We may update these Terms & Conditions from time to time. The version displayed on this page is the current version. Continued use of the website or placing of orders after any update constitutes acceptance of the revised terms. We recommend reviewing this page periodically.

## Contact

For questions about these Terms & Conditions:

**WhatsApp:** +91 91431 61829
**Email:** hello@womaniya.in`,
        },
      },
    ],
  },

  // ─── Sustainability ──────────────────────────────────────────────────────
  {
    slug: 'sustainability',
    title_en: 'Our Sustainability Commitment',
    title_bn: 'আমাদের টেকসই প্রতিশ্রুতি',
    seo_title_en: 'Sustainability & Ethical Fashion — Womaniya Handloom',
    seo_description_en: 'How Womaniya commits to ethical artisan wages, natural fibres, slow fashion, and preserving India\'s living handloom heritage.',
    page_type: 'landing',
    sections: [
      {
        section_type: 'hero',
        sort_order: 0,
        content_json: {
          title: 'Fashion That Doesn\'t Cost the Earth',
          subtitle: 'At Womaniya, sustainability is not a marketing word. It is how we have always worked — slow, intentional, and deeply rooted in respect for the people and processes behind every thread.',
          image_url: '/instagram/2026-02-25_12-56-26_UTC_9.jpg',
          cta_text: 'Explore the Collection',
          cta_url: '/shop',
        },
      },
      {
        section_type: 'richtext',
        sort_order: 1,
        content_json: {
          content_en: `## Our Philosophy

Long before "sustainable fashion" became a trend, handloom was already the answer. Woven by hand, in natural fibres, by skilled artisans who inherit their craft through generations — handloom has always been the antithesis of fast fashion. At Womaniya, we simply refuse to compromise on that.

Every decision we make — from which weaver we partner with, to the dyes we use, to the packaging we ship in — is guided by one question: **does this do more good than harm?**

## Natural Fibres, Always

We work exclusively with **natural fibres**:

- **Cotton** — breathable, biodegradable, and the backbone of Indian handloom
- **Silk** — Mulberry silk from ethical sericulture communities
- **Linen** — minimal water use, strong, and beautifully textural
- **Blended naturals** — cotton-linen and cotton-silk blends that combine the best of each

We do not use polyester, nylon, acrylic, or any synthetic blend — ever. Natural fibres are biodegradable, kind to the skin, and do not shed microplastics into our water systems.

## Fair & Direct Artisan Partnerships

Every Womaniya saree is made by a named artisan or weaving cooperative. We:

- Pay **above-market wages** — significantly higher than the industry floor
- Work **directly with weavers**, eliminating multiple layers of middlemen who have historically taken the largest share of value
- Build **long-term relationships** — our artisan partners know we will come back next season, enabling them to plan, invest, and build their own livelihoods
- Actively prioritise partnerships with **women weavers** and cooperatives led by women

We believe fair wages are not charity — they are the correct price for skilled, labour-intensive handwork.

## Slow Fashion, by Design

We do not follow the fashion calendar. We do not release 52 micro-collections a year. We create **small, considered collections** — each piece is made to order or in very limited quantities — because we believe:

- The most sustainable garment is the one you buy once and wear for decades
- Overproduction is one of fashion's most harmful practices
- Every saree we make should be worth keeping forever

We encourage our customers to buy less, choose well, and care deeply for what they own.

## Preserving a Living Heritage

The handloom traditions we work with — **Jamdani**, **Tant**, **Kantha**, **Baluchari**, **Muslin** — are not just beautiful. They are living cultural heritage. The Jamdani weave is recognised by UNESCO as an Intangible Cultural Heritage of Humanity.

When you buy a Womaniya saree, you are directly funding the continuation of these traditions. Without buyers who value handloom, weavers are forced to abandon their looms for lower-skilled industrial work. Every purchase is an act of cultural preservation.

## Minimal, Thoughtful Packaging

We have redesigned our packaging to eliminate plastic wherever possible:

- All sarees are wrapped in **recycled, unbleached tissue paper**
- Shipped in **kraft paper mailers** made from 80% recycled materials
- Gift packaging uses **cotton muslin bags** that double as saree storage bags
- No bubble wrap, no styrofoam — we use paper cushioning for added protection

We are working toward 100% plastic-free packaging by end of 2025.

## Natural & Low-Impact Dyes

Many of our sarees use **natural dyes** derived from plants, bark, and minerals — indigo, turmeric, henna, madder, and iron mordants. These dyes are biodegradable, non-toxic, and have been used by Indian dyers for thousands of years.

Where chemical dyes are used (for precise colour matching in some collections), we work only with artisans who use **GOTS-certified, low-impact dyes** that meet international standards for safety and environmental impact.

## Our Carbon Footprint

We are in the early stages of formally measuring our carbon footprint. What we already know:
- Handloom production is fundamentally **low-energy** — a loom uses no electricity
- Our courier partners are working toward carbon-neutral logistics
- We offset our direct operations through verified reforestation programs in Bengal

We commit to publishing our first sustainability report by 2026.

## What We Are Still Working On

We believe in honesty over greenwashing. Here is what we are still working toward:

- **Fully natural dye across all collections** — currently 60% of our range, target 85% by 2026
- **Documented artisan profiles** on every product page
- **Third-party fair trade certification**
- **Formal carbon footprint measurement and offsetting**

Progress, not perfection. We will share our journey openly.`,
        },
      },
      {
        section_type: 'quote',
        sort_order: 2,
        content_json: {
          text: 'The most sustainable garment is the one you already love. Buy once, drape for a lifetime.',
          author: 'Womaniya',
        },
      },
      {
        section_type: 'image_text',
        sort_order: 3,
        content_json: {
          image_url: '/instagram/2026-02-25_12-56-26_UTC_11.jpg',
          title: 'The Hands Behind Every Saree',
          text: 'A master Jamdani weaver works at their pit loom for 8–12 hours a day, weaving motifs so fine they appear to float on the fabric. A single saree can take 2–4 weeks to complete. When you wear a Womaniya saree, you carry the dedication of these hands with you. Our direct partnerships ensure they are compensated fairly for that extraordinary skill.',
          layout: 'image_right',
        },
      },
      {
        section_type: 'gallery',
        sort_order: 4,
        content_json: {
          images: [
            '/instagram/2026-02-25_12-56-26_UTC_12.jpg',
            '/instagram/2026-02-23_06-34-00_UTC_4.jpg',
            '/instagram/2026-02-11_10-27-03_UTC_5.jpg',
            '/instagram/2026-02-02_12-37-01_UTC_3.jpg',
            '/instagram/2026-01-30_12-28-39_UTC_3.jpg',
            '/instagram/2026-01-30_12-28-39_UTC_5.jpg',
          ],
        },
      },
      {
        section_type: 'cta',
        sort_order: 5,
        content_json: {
          title: 'Shop with Intention',
          text: 'Every Womaniya purchase supports real artisans, keeps a living craft alive, and puts something truly beautiful in your wardrobe — for life.',
          button_text: 'Explore the Collection',
          button_url: '/shop',
        },
      },
    ],
  },

  // ─── Our Craft ──────────────────────────────────────────────────────────
  {
    slug: 'our-craft',
    title_en: 'Our Craft',
    title_bn: 'আমাদের কারুকাজ',
    seo_title_en: 'The Art of Jamdani & Bengali Handloom — Womaniya',
    seo_description_en: 'Discover the 300-year history of Jamdani and Bengali handloom weaving. How our sarees are made, who makes them, and why it matters.',
    page_type: 'landing',
    sections: [
      {
        section_type: 'hero',
        sort_order: 0,
        content_json: {
          title: 'Woven by Hand. Rooted in Bengal.',
          subtitle: 'Every Womaniya saree carries 300 years of weaving heritage — from the banks of the Padma to the looms of Nadia and Murshidabad.',
          image_url: '/instagram/2026-02-25_12-56-26_UTC_2.jpg',
          cta_text: 'Shop Handwoven Sarees',
          cta_url: '/shop',
        },
      },
      {
        section_type: 'richtext',
        sort_order: 1,
        content_json: {
          content_en: `## The Heritage of Bengali Handloom

Bengal has been the heartland of India's finest textile traditions for over three centuries. Long before industrialisation, Bengali weavers were producing fabrics so exquisite that Mughal emperors hoarded them, European traders sailed oceans for them, and poets wrote odes to them. The finest Dhaka Muslin — woven to a gossamer thinness that earned the name *woven air* — was the most coveted fabric on earth.

Today, that heritage lives on. In pit loom sheds in **Murshidabad**, **Nadia**, **Hooghly**, and the weaving clusters of **Shantipur** and **Fulia**, master weavers continue to work by hand — weaving with the same techniques, the same design vocabulary, and the same extraordinary skill as their ancestors.

Womaniya exists to bring these textiles to people who appreciate them.

## What is Jamdani?

**Jamdani** is the crown jewel of Bengali handloom. The word comes from the Persian *jam* (flower) and *dani* (vessel) — "a vase of flowers." It is a fine muslin fabric with intricate discontinuous weft patterns — geometric or floral motifs — woven directly into the cloth using an additional weft thread. There is no printing, no embroidery, no appliqué. The design exists in the structure of the weave itself.

Jamdani was inscribed on **UNESCO's Representative List of Intangible Cultural Heritage of Humanity** in 2013 — one of only a handful of textile traditions in the world to receive this recognition.

What makes Jamdani extraordinary:
- The finest Jamdani is woven from **hand-spun cotton** so fine it can pass through a ring
- A single saree can take **2–4 weeks** to complete
- Weavers work in **pairs** — one on each side of the loom — to insert the discontinuous weft threads by hand
- Each motif is computed and executed entirely from **memory and muscle knowledge**, passed down through apprenticeship
- No two Jamdani sarees are identical

## Tant — The Everyday Masterpiece

**Tant** is the handloom cotton saree of Bengal — lighter, more casual than Jamdani, and integral to Bengali daily life. Tant sarees are known for their **crisp, cool hand-feel** and their distinctive floral or geometric borders woven in fine cotton. During Durga Puja, it is traditional for Bengali women to wear a new Tant saree each day.

Tant weaving centres in **Shantipur, Fulia, Dhaniakhali**, and **Samudragarh** employ tens of thousands of weavers. Despite their importance culturally, Tant weavers have faced enormous economic pressure from cheap mill imitations. At Womaniya, we pay a premium for genuinely handwoven Tant — ensuring our weavers can sustain their livelihoods.

## Kantha — The Art of Mending

**Kantha** is a centuries-old embroidery tradition from rural Bengal and Bangladesh. Traditionally, women layered old cotton saris and stitched them together using a simple running stitch — creating quilts (*nakshi kantha*) and cloth (*kantha fabric*) that were both functional and deeply decorative. The stitching follows a ripple-like pattern called the *kantha stitch*.

Modern Kantha combines this stitch with fine handwoven fabric — creating sarees, stoles, and garments of extraordinary texture and warmth. Our Kantha pieces are made by **women artisans from Birbhum district**, many of them working through cooperative collectives that have transformed their economic independence.

## How a Jamdani Saree is Made

### 1. Design & Counting

The weaver begins by selecting or designing the motif — typically geometric (jhalar, butidar, tersa) or floral. In traditional practice, no written pattern is used. The weaver counts threads mentally and memorises the sequence. For complex designs, this alone takes days.

### 2. Thread Selection & Dyeing

Fine cotton yarn — often Nm 100–200 count — is selected. Yarn for natural-dyed pieces is mordanted (treated to accept dye), then dyed in clay pots using plant-based dyes: indigo for blue, madder for red, pomegranate for yellow-green. The yarn is then dried, wound, and prepared for the loom.

### 3. Warping

The warp — the lengthwise threads that run the entire length of the saree — is set up on a warping frame. For a 5.5m Jamdani saree, the warp may have 3,000–8,000 individual threads, each carefully spaced and tensioned. Warping a single saree can take a full day.

### 4. Loom Setup

The warp is transferred to the **pit loom** — a loom recessed into a pit in the floor, allowing the weaver to sit at ground level with their legs hanging into the pit below. The heddles, reed, and shuttle are set up, and the warp is tied in precisely.

### 5. Weaving

Two weavers sit side by side at the loom. The shuttle carrying the **weft** (cross-thread) is passed back and forth. For Jamdani motifs, an additional thread is inserted by hand on specific threads using a pointed bamboo stick — one motif at a time, from memory. A highly skilled weaver pair can weave **5–8 centimetres of Jamdani per hour**.

### 6. Finishing

Once woven, the saree is removed from the loom, washed to remove any sizing starch, and pressed. The blouse piece is cut and wrapped with the saree. A final quality check is done before it is ready to leave the weaver's hands.

## Why It Matters

The handloom sector in India employs over **4.3 million weavers** — the largest segment of artisanal employment in the country after agriculture. Yet weaver incomes have fallen in real terms for decades, as cheap mill imitations undercut the market and middlemen capture most of the value chain.

When you buy a genuinely handwoven saree at a fair price, you are:
- Directly sustaining a weaver's livelihood
- Ensuring a skill that takes decades to master remains economically viable
- Preserving a cultural heritage that cannot be recreated by machine
- Owning something irreplaceable — a piece of cloth that is fundamentally, irreducibly human

At Womaniya, we take this responsibility seriously. It is why we exist.`,
        },
      },
      {
        section_type: 'quote',
        sort_order: 2,
        content_json: {
          text: 'A Jamdani saree is not woven — it is counted, thread by thread, from memory. It is the closest thing to poetry that a loom can produce.',
          author: 'Womaniya',
        },
      },
      {
        section_type: 'image_text',
        sort_order: 3,
        content_json: {
          image_url: '/instagram/2026-02-25_12-56-26_UTC_13.jpg',
          title: 'Two Weavers, One Vision',
          text: 'Jamdani weaving is always a collaborative act. Two weavers work in perfect synchrony on either side of the same loom, passing the supplementary weft threads through the warp by hand — one thread at a time. The motif exists nowhere written down. It lives in their hands, their memory, and 300 years of inherited knowledge. A single pair of weavers produces perhaps 15–20 centimetres of fine Jamdani on a good day.',
          layout: 'image_left',
        },
      },
      {
        section_type: 'gallery',
        sort_order: 4,
        content_json: {
          images: [
            '/instagram/2026-02-25_12-56-26_UTC_14.jpg',
            '/instagram/2026-02-23_06-34-00_UTC_5.jpg',
            '/instagram/2026-02-23_06-34-00_UTC_7.jpg',
            '/instagram/2026-02-11_10-27-03_UTC_7.jpg',
            '/instagram/2026-02-11_10-27-03_UTC_9.jpg',
            '/instagram/2026-01-30_12-28-39_UTC_6.jpg',
          ],
        },
      },
      {
        section_type: 'cta',
        sort_order: 5,
        content_json: {
          title: 'Wear a Piece of History',
          text: 'Every Womaniya saree is a living connection to one of the world\'s greatest textile traditions. Browse our current collection.',
          button_text: 'Explore Our Sarees',
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
