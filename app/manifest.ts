import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Womaniya — Authentic Handloom Heritage',
    short_name: 'Womaniya',
    description:
      'Discover exquisite handwoven sarees, blouses & more — Jamdani, Tant, Chanderi, Ikkat, Ajrakh — crafted by master artisans in Kolkata.',
    start_url: '/en',
    display: 'standalone',
    background_color: '#F9F6F0',
    theme_color: '#8A1C14',
    icons: [
      { src: '/icon', sizes: '48x48', type: 'image/png' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
    categories: ['shopping', 'fashion', 'lifestyle'],
    lang: 'en',
    dir: 'ltr',
  };
}
