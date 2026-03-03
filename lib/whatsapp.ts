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

export const getWaHref = (waNumber = DEFAULT_WA_NUMBER) => `https://wa.me/${waNumber}`;
