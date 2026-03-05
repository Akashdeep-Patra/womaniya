import { setRequestLocale } from 'next-intl/server';
import { getTranslations }  from 'next-intl/server';
import { TestimonialForm } from '@/components/admin/TestimonialForm';
import { ArrowLeft }        from 'lucide-react';
import Link                 from 'next/link';
import { notFound }         from 'next/navigation';
import { getTestimonialById } from '@/actions/testimonials';

type Props = { params: Promise<{ locale: string; id: string }> };

export default async function EditTestimonialPage({ params }: Props) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'admin' });

  const testimonialId = Number(id);
  if (isNaN(testimonialId)) notFound();

  const testimonial = await getTestimonialById(testimonialId);
  if (!testimonial) notFound();

  return (
    <div className="px-4 pt-6 pb-6 max-w-2xl mx-auto">
      <Link prefetch={true}
        href={`/${locale}/admin/testimonials`}
        className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-foreground/50 hover:text-bengal-sindoor mb-6 transition-colors"
      >
        <ArrowLeft size={14} />
        Back
      </Link>

      <h1 className="font-sans font-semibold tracking-tight text-2xl text-foreground mb-6">
        Edit Testimonial
      </h1>

      <TestimonialForm initialData={testimonial} locale={locale} />
    </div>
  );
}
