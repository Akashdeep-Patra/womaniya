import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Womaniya — Authentic Handloom Heritage',
    short_name: 'Womaniya',
    description:
      'Discover exquisite handwoven sarees, blouses & more — Jamdani, Tant, Chanderi, Ikkat, Ajrakh — crafted by master artisans in Kolkata.',
    start_url: '/en',
    display: 'standalone',
    background_color: '#FBF8F1',
    theme_color: '#C0392B',
    icons: [
      { src: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { src: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      { src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    categories: ['shopping', 'fashion', 'lifestyle'],
    lang: 'en',
    dir: 'ltr',
  };
}
