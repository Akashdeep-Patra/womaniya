const DEFAULT_WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '919143161829';

export function whatsappUrl(message: string, waNumber = DEFAULT_WA_NUMBER): string {
  return `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
}

export function productOrderUrl(
  name: string,
  price: string | number,
  locale = 'en',
  sku?: string | null,
  size?: string | null,
  color?: string | null,
  waNumber = DEFAULT_WA_NUMBER,
  pageUrl?: string
): string {
  let msg = '';
  if (locale === 'bn') {
    msg = `নমস্কার! আমি Womaniya থেকে "${name}" (₹${price}) অর্ডার করতে চাই।\n`;
    if (sku) msg += `SKU: ${sku}\n`;
    if (size) msg += `Size: ${size}\n`;
    if (color) msg += `Color: ${color}\n`;
    msg += `আপনি কি সাহায্য করতে পারবেন?`;
  } else {
    msg = `Hi! I'm interested in ordering "${name}" (₹${price}) from Womaniya.\n`;
    if (sku) msg += `SKU: ${sku}\n`;
    if (size) msg += `Size: ${size}\n`;
    if (color) msg += `Color: ${color}\n`;
    msg += `Could you help me place an order?`;
  }
  if (pageUrl) msg += `\n\n${pageUrl}`;
  return whatsappUrl(msg, waNumber);
}

export function generalEnquiryUrl(locale = 'en', waNumber = DEFAULT_WA_NUMBER, pageUrl?: string): string {
  let msg =
    locale === 'bn'
      ? `নমস্কার! আমি Womaniya সম্পর্কে জানতে চাই।`
      : `Hi! I'd love to know more about Womaniya.`;
  if (pageUrl) msg += `\n\n${pageUrl}`;
  return whatsappUrl(msg, waNumber);
}

export function shopBrowsingUrl(locale = 'en', category?: string, waNumber = DEFAULT_WA_NUMBER, pageUrl?: string): string {
  let msg = '';
  if (locale === 'bn') {
    msg = category
      ? `নমস্কার! আমি Womaniya-তে "${category}" দেখছি। এই ক্যাটাগরিতে কিছু সুপারিশ করবেন?`
      : `নমস্কার! আমি Womaniya-র দোকান ব্রাউজ করছি। আমাকে কি কিছু সুপারিশ করবেন?`;
  } else {
    msg = category
      ? `Hi! I'm browsing "${category}" on Womaniya. Could you recommend something from this category?`
      : `Hi! I'm browsing Womaniya's shop. Could you help me find something?`;
  }
  if (pageUrl) msg += `\n\n${pageUrl}`;
  return whatsappUrl(msg, waNumber);
}

export function categoryEnquiryUrl(name: string, locale = 'en', waNumber = DEFAULT_WA_NUMBER, pageUrl?: string): string {
  let msg =
    locale === 'bn'
      ? `নমস্কার! আমি Womaniya-তে "${name}" ক্যাটাগরি দেখছি। এই বিষয়ে আরও জানতে চাই।`
      : `Hi! I'm looking at the "${name}" category on Womaniya. Could you tell me more?`;
  if (pageUrl) msg += `\n\n${pageUrl}`;
  return whatsappUrl(msg, waNumber);
}

export function aboutPageUrl(locale = 'en', waNumber = DEFAULT_WA_NUMBER, pageUrl?: string): string {
  let msg =
    locale === 'bn'
      ? `নমস্কার! আমি Womaniya সম্পর্কে পড়ছিলাম এবং আরও জানতে চাই।`
      : `Hi! I was reading about Womaniya and would love to know more.`;
  if (pageUrl) msg += `\n\n${pageUrl}`;
  return whatsappUrl(msg, waNumber);
}

export function productViewUrl(name: string, price: string | number, locale = 'en', waNumber = DEFAULT_WA_NUMBER, pageUrl?: string): string {
  let msg =
    locale === 'bn'
      ? `নমস্কার! আমি Womaniya-তে "${name}" (₹${price}) দেখছি। এই পণ্য সম্পর্কে আরও জানতে পারি?`
      : `Hi! I'm looking at "${name}" (₹${price}) on Womaniya. Could you tell me more about this piece?`;
  if (pageUrl) msg += `\n\n${pageUrl}`;
  return whatsappUrl(msg, waNumber);
}

export function collectionEnquiryUrl(name: string, locale = 'en', waNumber = DEFAULT_WA_NUMBER, pageUrl?: string): string {
  let msg =
    locale === 'bn'
      ? `নমস্কার! আমি Womaniya-র "${name}" সংগ্রহটি দেখছি। এই কালেকশন সম্পর্কে আরও জানতে চাই।`
      : `Hi! I'm exploring the "${name}" collection on Womaniya. Could you tell me more about it?`;
  if (pageUrl) msg += `\n\n${pageUrl}`;
  return whatsappUrl(msg, waNumber);
}

export function campaignEnquiryUrl(name: string, locale = 'en', waNumber = DEFAULT_WA_NUMBER, pageUrl?: string): string {
  let msg =
    locale === 'bn'
      ? `নমস্কার! আমি Womaniya-র "${name}" ক্যাম্পেইনে আগ্রহী। আরও তথ্য জানাবেন?`
      : `Hi! I'm interested in Womaniya's "${name}" campaign. Could you share more details?`;
  if (pageUrl) msg += `\n\n${pageUrl}`;
  return whatsappUrl(msg, waNumber);
}

export function storyEnquiryUrl(name: string, locale = 'en', waNumber = DEFAULT_WA_NUMBER, pageUrl?: string): string {
  let msg =
    locale === 'bn'
      ? `নমস্কার! আমি Womaniya-তে "${name}" গল্পটি পড়ছিলাম। এই বিষয়ে আরও জানতে চাই।`
      : `Hi! I was reading "${name}" on Womaniya. I'd love to learn more about this.`;
  if (pageUrl) msg += `\n\n${pageUrl}`;
  return whatsappUrl(msg, waNumber);
}

export const getWaHref = (waNumber = DEFAULT_WA_NUMBER) => `https://wa.me/${waNumber}`;
