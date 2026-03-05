import { setRequestLocale } from 'next-intl/server';
import { getTranslations }  from 'next-intl/server';
import { getAllTestimonials } from '@/actions/testimonials';
import { TestimonialTableClient } from '@/components/admin/TestimonialTableClient';
import Link from 'next/link';
import { Plus } from 'lucide-react';

type Props = { params: Promise<{ locale: string }> };

export default async function TestimonialsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'admin' });

  let allTestimonials: Awaited<ReturnType<typeof getAllTestimonials>> = [];
  try { allTestimonials = await getAllTestimonials(); } catch { /* dev */ }

  return (
    <div className="px-4 md:px-8 py-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-sans font-bold tracking-tight text-3xl text-foreground mb-1">Testimonials</h1>
          <p className="text-sm text-foreground/60">
            {allTestimonials.length} testimonials
          </p>
        </div>
        <Link prefetch={true}
          href={`/${locale}/admin/testimonials/new`}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full text-xs font-semibold tracking-wide hover:bg-primary/90 transition-colors"
        >
          <Plus size={16} />
          <span className="hidden sm:inline">Add Testimonial</span>
        </Link>
      </div>

      <TestimonialTableClient initialTestimonials={allTestimonials} locale={locale} />
    </div>
  );
}
