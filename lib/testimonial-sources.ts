export const TESTIMONIAL_SOURCES = [
  'anecdotal',
  'google',
  'instagram',
  'facebook',
  'whatsapp',
  'email',
  'youtube',
  'trustpilot',
] as const;

export type TestimonialSource = (typeof TESTIMONIAL_SOURCES)[number];
