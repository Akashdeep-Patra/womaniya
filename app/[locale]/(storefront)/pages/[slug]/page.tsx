import { setRequestLocale }  from 'next-intl/server';
import { notFound }          from 'next/navigation';
import { db }                from '@/lib/db';
import Image                 from 'next/image';
import Link                  from 'next/link';
import type { Metadata }     from 'next';
import { BLUR_PLACEHOLDER }  from '@/lib/blur-placeholder';

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = await db.query.pages.findFirst({
    where: (p, { eq }) => eq(p.slug, slug),
  });
  if (!page || page.status !== 'published') return { title: 'Not Found' };

  const title =
    (locale === 'bn' && page.seo_title_bn ? page.seo_title_bn : page.seo_title_en) ||
    (locale === 'bn' && page.title_bn ? page.title_bn : page.title_en);
  const description =
    (locale === 'bn' && page.seo_description_bn
      ? page.seo_description_bn
      : page.seo_description_en) || title + ' — Womaniya';

  return {
    title,
    description,
    openGraph: { title, description },
    twitter: { card: 'summary_large_image', title, description },
    alternates: {
      canonical: 'https://www.womaniyakolkata.in/' + locale + '/pages/' + slug,
      languages: {
        en: 'https://www.womaniyakolkata.in/en/pages/' + slug,
        bn: 'https://www.womaniyakolkata.in/bn/pages/' + slug,
        'x-default': 'https://www.womaniyakolkata.in/en/pages/' + slug,
      },
    },
  };
}

type C = Record<string, unknown>;

function RichText({ c, locale }: { c: C; locale: string }) {
  const raw = (locale === 'bn' && c.content_bn ? String(c.content_bn) : String(c.content_en || '')).trim();
  if (!raw) return null;

  // HTML from Tiptap — render directly with theme-aware prose styles
  if (raw.startsWith('<')) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div
          className="font-sans-en
            [&_h2]:font-editorial [&_h2]:text-3xl [&_h2]:sm:text-4xl [&_h2]:text-foreground [&_h2]:tracking-tight [&_h2]:mt-10 [&_h2]:mb-3
            [&_h3]:font-editorial [&_h3]:text-xl [&_h3]:sm:text-2xl [&_h3]:text-foreground [&_h3]:tracking-tight [&_h3]:mt-6 [&_h3]:mb-2
            [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:text-base [&_p]:sm:text-lg [&_p]:mb-4
            [&_ul]:pl-6 [&_ul]:mb-4 [&_ul_li]:text-muted-foreground [&_ul_li]:leading-relaxed [&_ul_li]:mb-1 [&_ul_li]:list-disc
            [&_ol]:pl-6 [&_ol]:mb-4 [&_ol_li]:text-muted-foreground [&_ol_li]:leading-relaxed [&_ol_li]:mb-1 [&_ol_li]:list-decimal
            [&_blockquote]:border-l-4 [&_blockquote]:border-primary/40 [&_blockquote]:pl-5 [&_blockquote]:italic [&_blockquote]:text-muted-foreground [&_blockquote]:my-4
            [&_hr]:border-border [&_hr]:my-6
            [&_strong]:font-semibold [&_strong]:text-foreground
            [&_em]:italic"
          dangerouslySetInnerHTML={{ __html: raw }}
        />
      </div>
    );
  }

  // Legacy markdown — parse manually for backward compat
  const blocks = raw.split(/\n{2,}/);
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6">
      <div className="space-y-5">
        {blocks.map((block, i) => {
          const t = block.trim();
          if (t.startsWith('## '))
            return <h2 key={i} className="font-editorial text-3xl sm:text-4xl text-foreground tracking-tight mt-10 mb-2">{t.slice(3)}</h2>;
          if (t.startsWith('### '))
            return <h3 key={i} className="font-editorial text-xl sm:text-2xl text-foreground tracking-tight mt-6 mb-1">{t.slice(4)}</h3>;
          if (t.startsWith('- ') || t.startsWith('* ')) {
            const items = t.split('\n').filter(Boolean);
            return (
              <ul key={i} className="space-y-2 pl-4">
                {items.map((li, j) => (
                  <li key={j} className="relative text-muted-foreground font-sans-en leading-relaxed text-base sm:text-lg pl-4 before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:rounded-full before:bg-primary/50">
                    {li.replace(/^[-*]\s/, '')}
                  </li>
                ))}
              </ul>
            );
          }
          return <p key={i} className="text-muted-foreground font-sans-en leading-relaxed text-base sm:text-lg">{t}</p>;
        })}
      </div>
    </div>
  );
}

function HeroSection({ c, title }: { c: C; title: string }) {
  const heroTitle = String(c.title || title);
  const subtitle  = String(c.subtitle || '');
  const imgUrl    = String(c.image_url || '');
  const ctaText   = String(c.cta_text || '');
  const ctaUrl    = String(c.cta_url  || '');
  return (
    <div className="relative w-full min-h-[40vh] flex items-end overflow-hidden">
      {imgUrl ? (
        <>
          <Image src={imgUrl} alt={heroTitle} fill priority fetchPriority="high" className="object-cover" placeholder="blur" blurDataURL={BLUR_PLACEHOLDER} />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
        </>
      ) : (
        <div className="absolute inset-0 bg-bengal-kajal" />
      )}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 pb-14 pt-32 sm:pt-40">
        <h1 className="font-editorial text-4xl sm:text-6xl text-white leading-[0.9] tracking-tight mb-4">{heroTitle}</h1>
        {subtitle && <p className="text-white/80 text-lg font-sans-en font-light max-w-xl">{subtitle}</p>}
        {ctaText && ctaUrl && (
          <Link href={ctaUrl} className="mt-6 inline-flex items-center gap-2 bg-white text-bengal-kajal text-xs tracking-widest uppercase font-semibold px-7 py-3 rounded-full hover:bg-bengal-sindoor hover:text-white transition-colors">
            {ctaText}
          </Link>
        )}
      </div>
    </div>
  );
}

function ImageText({ c }: { c: C }) {
  const isRight = c.layout === 'image_right';
  const imgUrl  = String(c.image_url || '');
  const title   = String(c.title || '');
  const text    = String(c.text  || '');
  if (!imgUrl && !title && !text) return null;
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6">
      <div className={'flex flex-col ' + (isRight ? 'md:flex-row-reverse' : 'md:flex-row') + ' gap-8 md:gap-14 items-center'}>
        {imgUrl && (
          <div className="w-full md:w-1/2 relative aspect-4/5 rounded-3xl overflow-hidden bg-muted shrink-0">
            <Image src={imgUrl} alt={title || 'Section image'} fill loading="lazy" className="object-cover" placeholder="blur" blurDataURL={BLUR_PLACEHOLDER} />
          </div>
        )}
        <div className="flex-1 flex flex-col justify-center gap-4">
          {title && <h2 className="font-editorial text-3xl sm:text-4xl text-foreground leading-tight tracking-tight">{title}</h2>}
          {text  && <p className="text-muted-foreground font-sans-en leading-relaxed text-base sm:text-lg">{text}</p>}
        </div>
      </div>
    </div>
  );
}

function QuoteSection({ c }: { c: C }) {
  const text   = String(c.text   || '');
  const author = String(c.author || '');
  if (!text) return null;
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
      <div className="relative py-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-px bg-bengal-sindoor/40" />
        <p className="font-editorial text-2xl sm:text-3xl md:text-4xl text-foreground leading-snug italic mb-6">&ldquo;{text}&rdquo;</p>
        {author && <p className="text-[11px] tracking-[0.25em] uppercase text-bengal-sindoor font-sans-en font-semibold">&mdash; {author}</p>}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-px bg-bengal-sindoor/40" />
      </div>
    </div>
  );
}

function CtaSection({ c }: { c: C }) {
  const title   = String(c.title       || '');
  const text    = String(c.text        || '');
  const btnText = String(c.button_text || '');
  const btnUrl  = String(c.button_url  || '');
  if (!title && !text) return null;
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6">
      <div className="bg-bengal-kajal rounded-3xl px-8 sm:px-14 py-12 sm:py-16 text-center">
        {title && <h2 className="font-editorial text-3xl sm:text-5xl text-white leading-tight tracking-tight mb-4">{title}</h2>}
        {text  && <p className="text-white/70 font-sans-en text-base sm:text-lg max-w-xl mx-auto mb-8">{text}</p>}
        {btnText && btnUrl && (
          <Link href={btnUrl} className="inline-flex items-center gap-2 bg-bengal-sindoor text-white text-xs tracking-widest uppercase font-semibold px-8 py-3.5 rounded-full hover:bg-bengal-alta transition-colors">
            {btnText}
          </Link>
        )}
      </div>
    </div>
  );
}

function GallerySection({ c }: { c: C }) {
  const images = Array.isArray(c.images) ? (c.images as string[]) : [];
  if (images.length === 0) return null;
  const cols = images.length === 1 ? 'grid-cols-1 max-w-xl mx-auto' : images.length === 2 ? 'grid-cols-2' : images.length === 3 ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-2 sm:grid-cols-4';
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className={'grid gap-3 sm:gap-4 ' + cols}>
        {images.map((src, i) => (
          <div key={i} className={'relative rounded-2xl overflow-hidden bg-bengal-mati ' + (images.length === 3 && i === 0 ? 'row-span-2 aspect-3/4' : 'aspect-square')}>
            <Image src={src} alt={'Gallery ' + (i + 1)} fill loading="lazy" className="object-cover hover:scale-105 transition-transform duration-700" placeholder="blur" blurDataURL={BLUR_PLACEHOLDER} />
          </div>
        ))}
      </div>
    </div>
  );
}

function TestimonialSection({ c }: { c: C }) {
  const quote  = String(c.quote     || '');
  const author = String(c.author    || '');
  const role   = String(c.role      || '');
  const imgUrl = String(c.image_url || '');
  if (!quote) return null;
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
      <div className="bg-card border border-border rounded-3xl px-8 py-10">
        {imgUrl && (
          <div className="w-16 h-16 rounded-full overflow-hidden bg-muted mx-auto mb-5 relative">
            <Image src={imgUrl} alt={author} fill className="object-cover" />
          </div>
        )}
        <p className="font-editorial text-xl sm:text-2xl text-foreground italic mb-5 leading-snug">&ldquo;{quote}&rdquo;</p>
        <p className="font-semibold text-sm text-foreground">{author}</p>
        {role && <p className="text-xs text-muted-foreground mt-0.5">{role}</p>}
      </div>
    </div>
  );
}

export default async function GenericPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const page = await db.query.pages.findFirst({
    where: (p, { eq }) => eq(p.slug, slug),
    with: { sections: { orderBy: (s, { asc }) => [asc(s.sort_order)] } },
  });

  if (!page || page.status !== 'published') notFound();

  const title         = (locale === 'bn' ? page.title_bn || page.title_en : page.title_en) ?? '';
  const heroImg       = ((page.images as string[] | null) ?? [])[0] || page.hero_image_url;
  const hasSectionHero = page.sections.some((s) => s.section_type === 'hero');

  return (
    <div className="min-h-screen bg-background">
      {heroImg && !hasSectionHero && (
        <div className="relative w-full h-[45vh] sm:h-[55vh] overflow-hidden">
          <Image src={heroImg} alt={title} fill priority fetchPriority="high" className="object-cover" placeholder="blur" blurDataURL={BLUR_PLACEHOLDER} />
          <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 px-6 text-center">
            <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl text-white leading-[0.9] tracking-tight">{title}</h1>
          </div>
        </div>
      )}

      {!heroImg && !hasSectionHero && (
        <div className="pt-28 sm:pt-36 pb-10 px-6 text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-bengal-sindoor/40" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-bengal-sindoor font-sans-en font-semibold">Womaniya</span>
            <div className="h-px w-12 bg-bengal-sindoor/40" />
          </div>
          <h1 className="font-editorial text-5xl sm:text-6xl md:text-7xl text-foreground leading-[0.9] tracking-tight">{title}</h1>
        </div>
      )}

      <div className={'flex flex-col gap-14 sm:gap-20 pb-20 ' + (heroImg && !hasSectionHero ? 'pt-14' : hasSectionHero ? '' : 'pt-4')}>
        {page.sections.map((section) => {
          const c = (section.content_json ?? {}) as C;
          switch (section.section_type) {
            case 'hero':        return <HeroSection        key={section.id} c={c} title={title} />;
            case 'richtext':    return <RichText            key={section.id} c={c} locale={locale} />;
            case 'image_text':  return <ImageText           key={section.id} c={c} />;
            case 'quote':       return <QuoteSection        key={section.id} c={c} />;
            case 'cta':         return <CtaSection          key={section.id} c={c} />;
            case 'gallery':     return <GallerySection      key={section.id} c={c} />;
            case 'testimonial': return <TestimonialSection  key={section.id} c={c} />;
            default:            return null;
          }
        })}
      </div>
    </div>
  );
}
