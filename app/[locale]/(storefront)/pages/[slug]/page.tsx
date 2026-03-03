import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import Image from 'next/image';
import type { Metadata } from 'next';

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = await db.query.pages.findFirst({
    where: (p, { eq }) => eq(p.slug, slug),
  });
  if (!page || page.status !== 'published') return { title: 'Not Found' };

  const title = (locale === 'bn' && page.seo_title_bn ? page.seo_title_bn : page.seo_title_en) || 
                (locale === 'bn' && page.title_bn ? page.title_bn : page.title_en);
  const description = (locale === 'bn' && page.seo_description_bn ? page.seo_description_bn : page.seo_description_en) || 
                      `${title} — Womaniya`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: page.hero_image_url ? [page.hero_image_url] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: page.hero_image_url ? [page.hero_image_url] : undefined,
    },
    alternates: {
      canonical: `/${locale}/pages/${slug}`,
      languages: { en: `/en/pages/${slug}`, bn: `/bn/pages/${slug}` },
    },
  };
}

export default async function GenericPage({ params }: Props) {
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

  if (!page || page.status !== 'published') notFound();

  return (
    <div className="min-h-screen bg-bengal-cream pt-24 pb-12">
      {page.hero_image_url && (
        <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden mb-12">
          <Image src={page.hero_image_url} alt={page.title_en} fill className="object-cover" />
          <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center p-4">
            <h1 className="text-4xl md:text-6xl font-editorial text-white text-center">
              {locale === 'bn' ? page.title_bn || page.title_en : page.title_en}
            </h1>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4">
        {!page.hero_image_url && (
          <h1 className="text-4xl md:text-5xl font-editorial text-bengal-kajal mb-12 text-center">
            {locale === 'bn' ? page.title_bn || page.title_en : page.title_en}
          </h1>
        )}

        <div className="flex flex-col gap-12">
          {page.sections.map((section) => {
            const content = section.content_json as Record<string, string>;
            if (section.section_type === 'richtext') {
              return (
                <div key={section.id} className="prose prose-stone max-w-none">
                  <p>{locale === 'bn' ? content.content_bn || content.content_en : content.content_en}</p>
                </div>
              );
            }
            if (section.section_type === 'image_text') {
              return (
                <div key={section.id} className={`flex flex-col gap-8 md:flex-row ${content.layout === 'image_right' ? 'md:flex-row-reverse' : ''}`}>
                  <div className="flex-1 relative aspect-square md:aspect-auto md:min-h-[400px] rounded-2xl overflow-hidden bg-bengal-mati">
                    <Image src={content.image_url} alt={content.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h2 className="text-3xl font-editorial text-bengal-kajal mb-4">{content.title}</h2>
                    <p className="text-bengal-kajal/70 leading-relaxed">{content.text}</p>
                  </div>
                </div>
              );
            }
            return null; // fallback for unhandled sections
          })}
        </div>
      </div>
    </div>
  );
}