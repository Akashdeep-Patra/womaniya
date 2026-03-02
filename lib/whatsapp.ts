const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '919143161829';

export function whatsappUrl(message: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function productOrderUrl(name: string, price: string | number, locale = 'en'): string {
  const msg =
    locale === 'bn'
      ? `নমস্কার! আমি Womaniya থেকে "${name}" (₹${price}) অর্ডার করতে চাই। আপনি কি সাহায্য করতে পারবেন?`
      : `Hi! I'm interested in ordering "${name}" priced at ₹${price} from Womaniya. Could you help me place an order?`;
  return whatsappUrl(msg);
}

export function generalEnquiryUrl(locale = 'en'): string {
  const msg =
    locale === 'bn'
      ? `নমস্কার! আমি Womaniya-র হ্যান্ডলুম সংগ্রহ সম্পর্কে জানতে চাই।`
      : `Hi! I'd love to know more about Womaniya's handloom collection.`;
  return whatsappUrl(msg);
}

export const WA_HREF = `https://wa.me/${WA_NUMBER}`;
