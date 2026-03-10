import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import Image from 'next/image';
import { WhatsAppContextSetter } from '@/lib/whatsapp-context';
import type { Metadata } from 'next';

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = await db.query.pages.findFirst({
    where: (p, { eq }) => eq(p.slug, slug),
  });
  if (!page || page.page_type !== 'story' || page.status !== 'published') return { title: 'Not Found' };

  const title = (locale === 'bn' && page.seo_title_bn ? page.seo_title_bn : page.seo_title_en) || 
                (locale === 'bn' && page.title_bn ? page.title_bn : page.title_en);
  const description = (locale === 'bn' && page.seo_description_bn ? page.seo_description_bn : page.seo_description_en) || 
                      `${title} — Womaniya Stories`;

  const coverImage = ((page.images as string[] | null) ?? [])[0] || page.hero_image_url;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `/${locale}/stories/${slug}`,
      languages: { en: `/en/stories/${slug}`, bn: `/bn/stories/${slug}` },
    },
  };
}

export default async function StoryPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const page = await db.query.pages.findFirst({
    where: (p, { eq }) => eq(p.slug, slug),
    with: {
      sections: {
        orderBy: (s, { asc }) => [asc(s.sort_order)],
      }
    }
  });

  if (!page || page.page_type !== 'story' || page.status !== 'published') notFound();

  const heroImage = ((page.images as string[] | null) ?? [])[0] || page.hero_image_url;

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: page.title_en,
    description: page.seo_description_en ?? `${page.title_en} — Womaniya Stories`,
    url: `https://womaniyakolkata.in/${locale}/stories/${slug}`,
    ...(heroImage ? { image: heroImage } : {}),
    publisher: {
      '@type': 'Organization',
      name: 'Womaniya',
      logo: { '@type': 'ImageObject', url: 'https://womaniyakolkata.in/logo.svg' },
    },
    datePublished: page.created_at?.toISOString(),
    dateModified: page.updated_at?.toISOString(),
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `https://womaniyakolkata.in/${locale}` },
      { '@type': 'ListItem', position: 2, name: 'Stories', item: `https://womaniyakolkata.in/${locale}/stories` },
      { '@type': 'ListItem', position: 3, name: page.title_en, item: `https://womaniyakolkata.in/${locale}/stories/${slug}` },
    ],
  };

  return (
    <>
      <WhatsAppContextSetter context={{ type: 'story', name: page.title_en }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd).replace(/</g, '\\u003c') }} />
    <div className="min-h-screen bg-bengal-cream pb-12">
      {heroImage && (
        <div className="relative w-full h-[70vh] overflow-hidden mb-16">
          <Image src={heroImage} alt={page.title_en} fill className="object-cover" />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-8 md:p-16">
            <h1 className="text-5xl md:text-7xl font-editorial text-white max-w-4xl">
              {locale === 'bn' ? page.title_bn || page.title_en : page.title_en}
            </h1>
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4">
        {!heroImage && (
          <h1 className="text-4xl md:text-6xl font-editorial text-bengal-kajal mb-16 text-center mt-24">
            {locale === 'bn' ? page.title_bn || page.title_en : page.title_en}
          </h1>
        )}

        <div className="flex flex-col gap-12 font-editorial text-lg text-bengal-kajal/80 leading-relaxed">
          {page.sections.map((section) => {
            const content = section.content_json as Record<string, string>;
            if (section.section_type === 'richtext') {
              return (
                <div key={section.id} className="prose prose-stone prose-lg max-w-none font-editorial">
                  <p>{locale === 'bn' ? content.content_bn || content.content_en : content.content_en}</p>
                </div>
              );
            }
            if (section.section_type === 'image_text') {
              return (
                <div key={section.id} className="my-8">
                  <div className="relative w-full aspect-video md:aspect-21/9 rounded-2xl overflow-hidden bg-bengal-mati mb-6">
                    <Image src={content.image_url} alt={content.title || ''} fill className="object-cover" />
                  </div>
                  {content.title && <h2 className="text-3xl font-editorial text-bengal-kajal mb-4">{content.title}</h2>}
                  {content.text && <p>{content.text}</p>}
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
    </>
  );
}