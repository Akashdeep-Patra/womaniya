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
  waNumber = DEFAULT_WA_NUMBER
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
  return whatsappUrl(msg, waNumber);
}

export function generalEnquiryUrl(locale = 'en', waNumber = DEFAULT_WA_NUMBER): string {
  const msg =
    locale === 'bn'
      ? `নমস্কার! আমি Womaniya-র হ্যান্ডলুম সংগ্রহ সম্পর্কে জানতে চাই।`
      : `Hi! I'd love to know more about Womaniya's handloom collection.`;
  return whatsappUrl(msg, waNumber);
}

export function shopBrowsingUrl(locale = 'en', category?: string, waNumber = DEFAULT_WA_NUMBER): string {
  let msg = '';
  if (locale === 'bn') {
    msg = category
      ? `নমস্কার! আমি Womaniya-র "${category}" সংগ্রহ দেখছি। এই ক্যাটাগরিতে কিছু সুপারিশ করবেন?`
      : `নমস্কার! আমি Womaniya-র দোকান ব্রাউজ করছি। আমাকে কি সঠিক হ্যান্ডলুম পণ্য খুঁজে পেতে সাহায্য করবেন?`;
  } else {
    msg = category
      ? `Hi! I'm browsing Womaniya's "${category}" collection. Could you recommend something from this category?`
      : `Hi! I'm browsing Womaniya's shop. Could you help me find the right handloom piece?`;
  }
  return whatsappUrl(msg, waNumber);
}

export function categoryEnquiryUrl(name: string, locale = 'en', waNumber = DEFAULT_WA_NUMBER): string {
  const msg =
    locale === 'bn'
      ? `নমস্কার! আমি Womaniya-র "${name}" সংগ্রহ সম্পর্কে আরও জানতে চাই।`
      : `Hi! I'd love to learn more about Womaniya's "${name}" collection.`;
  return whatsappUrl(msg, waNumber);
}

export function aboutPageUrl(locale = 'en', waNumber = DEFAULT_WA_NUMBER): string {
  const msg =
    locale === 'bn'
      ? `নমস্কার! আমি Womaniya সম্পর্কে পড়ছিলাম এবং আপনাদের হ্যান্ডলুম সংগ্রহ সম্পর্কে আরও জানতে চাই।`
      : `Hi! I was reading about Womaniya and would love to know more about your handloom heritage.`;
  return whatsappUrl(msg, waNumber);
}

export function productViewUrl(name: string, price: string | number, locale = 'en', waNumber = DEFAULT_WA_NUMBER): string {
  const msg =
    locale === 'bn'
      ? `নমস্কার! আমি Womaniya-তে "${name}" (₹${price}) দেখছি। এই পণ্য সম্পর্কে আরও জানতে পারি?`
      : `Hi! I'm looking at "${name}" (₹${price}) on Womaniya. Could you tell me more about this piece?`;
  return whatsappUrl(msg, waNumber);
}

export const getWaHref = (waNumber = DEFAULT_WA_NUMBER) => `https://wa.me/${waNumber}`;
