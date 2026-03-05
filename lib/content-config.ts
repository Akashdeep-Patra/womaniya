export type ContentKeyConfig = {
  key: string;
  label: string;
  multiline?: boolean;
};

export type ContentNamespaceConfig = {
  name: string;
  label: string;
  description: string;
  keys: ContentKeyConfig[];
};

export type ContentPageGroup = {
  page: string;
  route: string;
  description: string;
  sections: ContentNamespaceConfig[];
};

// ─── Route-driven content structure ────────────────────────────────

export const contentPages: ContentPageGroup[] = [
  // ── Homepage ─────────────────────────────────────────────────────
  {
    page: 'Homepage',
    route: '/',
    description: 'Main landing page — hero, features, categories, shop grid, manifesto, voices',
    sections: [
      {
        name: 'hero',
        label: 'Hero Banner',
        description: 'Top hero section with headline, subtitle, and CTAs',
        keys: [
          { key: 'intro', label: 'Intro Tag' },
          { key: 'since', label: 'Since Badge' },
          { key: 'stamp', label: 'Stamp Text' },
          { key: 'headline_1', label: 'Headline Line 1' },
          { key: 'headline_2', label: 'Headline Line 2' },
          { key: 'headline_3', label: 'Headline Line 3' },
          { key: 'subtitle', label: 'Subtitle', multiline: true },
          { key: 'cta_shop', label: 'Shop CTA Button' },
          { key: 'cta_story', label: 'Story CTA Button' },
          { key: 'badge', label: 'Badge Text' },
          { key: 'scroll_hint', label: 'Scroll Hint' },
        ],
      },
      {
        name: 'features',
        label: 'Features — The Womaniya Way',
        description: '4 feature cards below the hero',
        keys: [
          { key: 'title', label: 'Section Title' },
          { key: 'handwoven', label: 'Handwoven Title' },
          { key: 'handwoven_desc', label: 'Handwoven Description', multiline: true },
          { key: 'artisan', label: 'Artisan Title' },
          { key: 'artisan_desc', label: 'Artisan Description', multiline: true },
          { key: 'conscious', label: 'Conscious Title' },
          { key: 'conscious_desc', label: 'Conscious Description', multiline: true },
          { key: 'heritage', label: 'Heritage Title' },
          { key: 'heritage_desc', label: 'Heritage Description', multiline: true },
        ],
      },
      {
        name: 'categories',
        label: 'Category Cards',
        description: 'Horizontal scroll category tiles',
        keys: [
          { key: 'jamdani_title', label: 'Jamdani Title' },
          { key: 'jamdani_desc', label: 'Jamdani Description', multiline: true },
          { key: 'ikkat_title', label: 'Ikkat Title' },
          { key: 'ikkat_desc', label: 'Ikkat Description', multiline: true },
          { key: 'ajrakh_title', label: 'Ajrakh Title' },
          { key: 'ajrakh_desc', label: 'Ajrakh Description', multiline: true },
          { key: 'tant_title', label: 'Tant Title' },
          { key: 'tant_desc', label: 'Tant Description', multiline: true },
          { key: 'blouse_title', label: 'Blouse Title' },
          { key: 'blouse_desc', label: 'Blouse Description', multiline: true },
          { key: 'rtw_title', label: 'Ready to Wear Title' },
          { key: 'rtw_desc', label: 'Ready to Wear Description', multiline: true },
        ],
      },
      {
        name: 'manifesto',
        label: 'Manifesto',
        description: 'Philosophy / belief statement',
        keys: [
          { key: 'title', label: 'Title', multiline: true },
          { key: 'subtitle', label: 'Subtitle', multiline: true },
          { key: 'cta', label: 'CTA Button' },
        ],
      },
      {
        name: 'voices',
        label: 'Artisan Voices',
        description: 'Testimonial quotes from weavers and customers',
        keys: [
          { key: 'title', label: 'Section Title' },
          { key: 'subtitle', label: 'Section Subtitle', multiline: true },
          { key: 'quote_1', label: 'Quote 1', multiline: true },
          { key: 'author_1', label: 'Author 1' },
          { key: 'quote_2', label: 'Quote 2', multiline: true },
          { key: 'author_2', label: 'Author 2' },
          { key: 'quote_3', label: 'Quote 3', multiline: true },
          { key: 'author_3', label: 'Author 3' },
        ],
      },
    ],
  },

  // ── Shop ─────────────────────────────────────────────────────────
  {
    page: 'Shop',
    route: '/shop',
    description: 'Shop listing page and product grid on homepage',
    sections: [
      {
        name: 'shop',
        label: 'Shop Grid',
        description: 'Product listing labels, filters, and badges',
        keys: [
          { key: 'title', label: 'Section Title' },
          { key: 'subtitle', label: 'Section Subtitle', multiline: true },
          { key: 'filter_all', label: 'Filter: All' },
          { key: 'filter_jamdani', label: 'Filter: Jamdani' },
          { key: 'filter_tant', label: 'Filter: Tant' },
          { key: 'filter_ikkat', label: 'Filter: Ikkat' },
          { key: 'filter_ajrakh', label: 'Filter: Ajrakh' },
          { key: 'filter_blouse', label: 'Filter: Blouse' },
          { key: 'filter_rtw', label: 'Filter: Ready to Wear' },
          { key: 'no_products', label: 'Empty State Message' },
          { key: 'view', label: 'View Button' },
          { key: 'from', label: 'Price Prefix' },
          { key: 'new', label: 'New Badge' },
          { key: 'featured', label: 'Featured Badge' },
        ],
      },
    ],
  },

  // ── Product Detail ───────────────────────────────────────────────
  {
    page: 'Product Detail',
    route: '/shop/[slug]',
    description: 'Individual product page',
    sections: [
      {
        name: 'product',
        label: 'Product Page',
        description: 'Labels, buttons, and badges on product detail',
        keys: [
          { key: 'price', label: 'Price Label' },
          { key: 'category', label: 'Category Label' },
          { key: 'description', label: 'Description Label' },
          { key: 'add_to_cart', label: 'Add to Cart Button' },
          { key: 'whatsapp_order', label: 'WhatsApp Order Button' },
          { key: 'back', label: 'Back Button' },
          { key: 'handwoven', label: 'Handwoven Badge' },
          { key: 'authentic', label: 'Authentic Badge' },
          { key: 'share', label: 'Share Button' },
          { key: 'care', label: 'Care Label' },
          { key: 'care_desc', label: 'Care Description', multiline: true },
          { key: 'artisan_made', label: 'Artisan Made Badge' },
        ],
      },
    ],
  },

  // ── About & Story ────────────────────────────────────────────────
  {
    page: 'About & Story',
    route: '/about',
    description: 'About page, our story, process, and glimpses — also shown on homepage',
    sections: [
      {
        name: 'about',
        label: 'About Womaniya',
        description: 'Main about section with stats',
        keys: [
          { key: 'badge', label: 'Section Badge' },
          { key: 'title', label: 'Section Title' },
          { key: 'intro', label: 'Introduction', multiline: true },
          { key: 'body_1', label: 'Body Paragraph 1', multiline: true },
          { key: 'body_2', label: 'Body Paragraph 2', multiline: true },
          { key: 'body_3', label: 'Body Paragraph 3', multiline: true },
          { key: 'closing', label: 'Closing Statement' },
          { key: 'stat_1_num', label: 'Stat 1 Number' },
          { key: 'stat_1_label', label: 'Stat 1 Label' },
          { key: 'stat_2_num', label: 'Stat 2 Number' },
          { key: 'stat_2_label', label: 'Stat 2 Label' },
          { key: 'stat_3_num', label: 'Stat 3 Number' },
          { key: 'stat_3_label', label: 'Stat 3 Label' },
        ],
      },
      {
        name: 'story',
        label: 'Our Story',
        description: 'Short origin story section',
        keys: [
          { key: 'title', label: 'Section Title' },
          { key: 'body', label: 'Story Body', multiline: true },
          { key: 'cta', label: 'CTA Button' },
        ],
      },
      {
        name: 'process',
        label: 'How We Craft',
        description: 'Step-by-step process journey',
        keys: [
          { key: 'badge', label: 'Section Badge' },
          { key: 'title', label: 'Section Title' },
          { key: 'subtitle', label: 'Section Subtitle', multiline: true },
          { key: 'step_1', label: 'Step 1 Title' },
          { key: 'step_1_desc', label: 'Step 1 Description', multiline: true },
          { key: 'step_2', label: 'Step 2 Title' },
          { key: 'step_2_desc', label: 'Step 2 Description', multiline: true },
          { key: 'step_3', label: 'Step 3 Title' },
          { key: 'step_3_desc', label: 'Step 3 Description', multiline: true },
          { key: 'step_4', label: 'Step 4 Title' },
          { key: 'step_4_desc', label: 'Step 4 Description', multiline: true },
        ],
      },
      {
        name: 'glimpses',
        label: 'Glimpses — Loom to Wardrobe',
        description: 'Behind-the-scenes gallery text',
        keys: [
          { key: 'badge', label: 'Section Badge' },
          { key: 'title', label: 'Section Title' },
          { key: 'subtitle', label: 'Section Subtitle', multiline: true },
          { key: 'item_1_title', label: 'Item 1 Title' },
          { key: 'item_1_desc', label: 'Item 1 Description', multiline: true },
          { key: 'item_2_title', label: 'Item 2 Title' },
          { key: 'item_2_desc', label: 'Item 2 Description', multiline: true },
          { key: 'item_3_title', label: 'Item 3 Title' },
          { key: 'item_3_desc', label: 'Item 3 Description', multiline: true },
          { key: 'item_4_title', label: 'Item 4 Title' },
          { key: 'item_4_desc', label: 'Item 4 Description', multiline: true },
        ],
      },
    ],
  },

  // ── Global (all pages) ──────────────────────────────────────────
  {
    page: 'Global',
    route: 'all pages',
    description: 'Navigation, footer, and locale — shared across every page',
    sections: [
      {
        name: 'nav',
        label: 'Navigation',
        description: 'Header and bottom nav links',
        keys: [
          { key: 'home', label: 'Home' },
          { key: 'shop', label: 'Shop' },
          { key: 'collections', label: 'Collections' },
          { key: 'categories', label: 'Categories' },
          { key: 'campaigns', label: 'Campaigns' },
          { key: 'stories', label: 'Stories' },
          { key: 'about', label: 'About' },
          { key: 'story', label: 'Our Story' },
          { key: 'contact', label: 'Contact' },
          { key: 'menu', label: 'Menu' },
          { key: 'close', label: 'Close' },
          { key: 'cart', label: 'Cart' },
          { key: 'search', label: 'Search' },
        ],
      },
      {
        name: 'footer',
        label: 'Footer',
        description: 'Site footer content',
        keys: [
          { key: 'tagline', label: 'Tagline' },
          { key: 'tagline_en', label: 'Tagline (English)' },
          { key: 'about_short', label: 'Short About Text', multiline: true },
          { key: 'rights', label: 'Rights Text' },
          { key: 'contact', label: 'Contact Link' },
          { key: 'whatsapp', label: 'WhatsApp Link' },
          { key: 'instagram', label: 'Instagram Link' },
          { key: 'shop', label: 'Shop Link' },
          { key: 'about', label: 'About Link' },
          { key: 'made_with', label: 'Made With Text' },
        ],
      },
      {
        name: 'locale',
        label: 'Locale Switcher',
        description: 'Language toggle labels',
        keys: [
          { key: 'switch_to', label: 'Switch To Label' },
          { key: 'current', label: 'Current Locale Label' },
        ],
      },
    ],
  },
];

// Flat list of all namespaces (used by i18n merge + seed script)
export const contentNamespaces: ContentNamespaceConfig[] = contentPages.flatMap(
  (p) => p.sections,
);
