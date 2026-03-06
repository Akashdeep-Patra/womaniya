'use client';

import { useState, useTransition } from 'react';
import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { notify } from '@/lib/notify';
import { CameraUpload } from './CameraUpload';
import { BengalButton, BengalInput } from '@/components/bengal';
import { FormSelect, FormTextarea } from './FormField';
import { createTestimonial, updateTestimonial } from '@/actions/testimonials';
import { TESTIMONIAL_SOURCES, TESTIMONIAL_SOURCE_LABELS, TESTIMONIAL_STATUSES, STATUS_LABELS } from '@/db/enums';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

const testimonialFormSchema = z.object({
  quote_en:         z.string().min(1, 'Quote (EN) is required').max(1000),
  quote_bn:         z.string().max(1000).default(''),
  author_name:      z.string().min(1, 'Author name is required').max(120),
  author_title:     z.string().max(200).default(''),
  source:           z.enum([...TESTIMONIAL_SOURCES]).default('anecdotal'),
  source_url:       z.string().default(''),
  rating:           z.coerce.number().min(0).max(5).default(0),
  sort_order:       z.coerce.number().default(0),
  status:           z.enum([...TESTIMONIAL_STATUSES]).default('published'),
});

type TestimonialFormValues = z.infer<typeof testimonialFormSchema>;

type TestimonialFormProps = {
  initialData?: {
    id: number;
    quote_en: string;
    quote_bn?: string | null;
    author_name: string;
    author_title?: string | null;
    author_image_url?: string | null;
    source: string;
    source_url?: string | null;
    rating?: number | null;
    sort_order?: number | null;
    status: string;
  };
  locale: string;
};

export function TestimonialForm({ initialData, locale }: TestimonialFormProps) {
  const router = useRouter();
  const [authorImage, setAuthorImage] = useState<string>(initialData?.author_image_url ?? '');
  const [apiError, setApiError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit: rhfHandleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialFormSchema) as Resolver<TestimonialFormValues>,
    defaultValues: {
      quote_en:     initialData?.quote_en ?? '',
      quote_bn:     initialData?.quote_bn ?? '',
      author_name:  initialData?.author_name ?? '',
      author_title: initialData?.author_title ?? '',
      source:       (initialData?.source as TestimonialFormValues['source']) ?? 'anecdotal',
      source_url:   initialData?.source_url ?? '',
      rating:       initialData?.rating ?? 0,
      sort_order:   initialData?.sort_order ?? 0,
      status:       (initialData?.status as TestimonialFormValues['status']) ?? 'published',
    },
  });

  const currentRating = watch('rating');

  const onSubmit = (data: TestimonialFormValues) => {
    setApiError(null);
    const formData = new FormData();
    formData.set('quote_en', data.quote_en);
    if (data.quote_bn) formData.set('quote_bn', data.quote_bn);
    formData.set('author_name', data.author_name);
    if (data.author_title) formData.set('author_title', data.author_title);
    if (authorImage) formData.set('author_image_url', authorImage);
    formData.set('source', data.source);
    if (data.source_url) formData.set('source_url', data.source_url);
    if (data.rating > 0) formData.set('rating', String(data.rating));
    formData.set('sort_order', String(data.sort_order));
    formData.set('status', data.status);

    startTransition(async () => {
      try {
        if (initialData) {
          await updateTestimonial(initialData.id, formData);
          notify.success('testimonial', 'updated', data.author_name);
        } else {
          await createTestimonial(formData);
          notify.success('testimonial', 'created', data.author_name);
        }
        router.push(`/${locale}/admin/testimonials`);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Error saving testimonial';
        setApiError(message);
        notify.error('testimonial', initialData ? 'updated' : 'created', message);
      }
    });
  };

  return (
    <form onSubmit={rhfHandleSubmit(onSubmit)} className="flex flex-col gap-5 md:gap-8 pb-24 md:pb-12">
      {apiError && (
        <div
          role="alert"
          className="rounded-xl border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          {apiError}
        </div>
      )}

      {/* Quote */}
      <div className="bg-card p-4 md:p-6 rounded-2xl border border-border flex flex-col gap-4">
        <h3 className="font-sans font-semibold tracking-tight text-lg md:text-xl text-foreground">Quote</h3>

        <FormTextarea
          label="Quote (EN) *"
          {...register('quote_en')}
          rows={4}
          placeholder="Each thread I weave carries a prayer..."
          error={errors.quote_en?.message}
        />
        <FormTextarea
          label="Quote (BN)"
          {...register('quote_bn')}
          rows={4}
          isBengali
          placeholder="প্রতিটি সুতোয় একটি প্রার্থনা বোনা..."
          error={errors.quote_bn?.message}
        />
      </div>

      {/* Author */}
      <div className="bg-card p-4 md:p-6 rounded-2xl border border-border flex flex-col gap-4">
        <h3 className="font-sans font-semibold tracking-tight text-lg md:text-xl text-foreground">Author</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BengalInput
            label="Author Name *"
            {...register('author_name')}
            placeholder="Arundhati M."
            error={errors.author_name?.message}
          />
          <BengalInput
            label="Author Title / Location"
            {...register('author_title')}
            placeholder="Master Weaver, Phulia"
            error={errors.author_title?.message}
          />
        </div>

        <div>
          <p className="text-[10px] tracking-widest uppercase font-medium text-foreground/70 font-sans-en mb-2">
            Author Photo (optional)
          </p>
          <div className="flex items-center gap-4">
            {authorImage && (
              <div className="relative w-14 h-14 rounded-full overflow-hidden bg-muted border border-border">
                <img src={authorImage} alt="Author" className="object-cover w-full h-full" />
              </div>
            )}
            <CameraUpload
              onUpload={(url) => { if (url) setAuthorImage(url); }}
              compact
            />
            {authorImage && (
              <button
                type="button"
                onClick={() => setAuthorImage('')}
                className="text-xs text-muted-foreground hover:text-destructive transition-colors"
              >
                Remove
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Source & Rating */}
      <div className="bg-card p-4 md:p-6 rounded-2xl border border-border flex flex-col gap-4">
        <h3 className="font-sans font-semibold tracking-tight text-lg md:text-xl text-foreground">Source & Rating</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormSelect
            label="Source Platform *"
            value={watch('source')}
            onValueChange={(v) => setValue('source', v as TestimonialFormValues['source'])}
            error={errors.source?.message}
          >
            {TESTIMONIAL_SOURCES.map((src) => (
              <option key={src} value={src}>{TESTIMONIAL_SOURCE_LABELS[src]}</option>
            ))}
          </FormSelect>

          <BengalInput
            label="Source URL (optional)"
            {...register('source_url')}
            placeholder="https://g.co/review/..."
            error={errors.source_url?.message}
          />
        </div>

        <div>
          <p className="text-[10px] tracking-widest uppercase font-medium text-foreground/70 font-sans-en mb-2">
            Rating (optional)
          </p>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setValue('rating', currentRating === star ? 0 : star)}
                className="p-0.5 transition-colors"
              >
                <Star
                  size={24}
                  className={cn(
                    'transition-colors',
                    star <= currentRating
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-muted-foreground/30',
                  )}
                />
              </button>
            ))}
            {currentRating > 0 && (
              <span className="text-xs text-muted-foreground ml-2">{currentRating}/5</span>
            )}
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="bg-card p-4 md:p-6 rounded-2xl border border-border flex flex-col gap-4">
        <h3 className="font-sans font-semibold tracking-tight text-lg md:text-xl text-foreground">Settings</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BengalInput
            label="Sort Order"
            type="number"
            {...register('sort_order')}
            error={errors.sort_order?.message}
          />
          <FormSelect
            label="Status"
            value={watch('status')}
            onValueChange={(v) => setValue('status', v as TestimonialFormValues['status'])}
          >
            {TESTIMONIAL_STATUSES.map((v) => (
              <option key={v} value={v}>{STATUS_LABELS[v]}</option>
            ))}
          </FormSelect>
        </div>
      </div>

      <div className="sticky bottom-[calc(3.5rem+env(safe-area-inset-bottom)+1rem)] md:bottom-6 z-40 bg-background/80 backdrop-blur-md p-3 -mx-4 md:mx-0 md:p-0 md:bg-transparent md:backdrop-blur-none border-t border-border/50 md:border-none">
        <BengalButton
          type="submit"
          variant="primary"
          size="touch"
          loading={isPending}
          className="shadow-2xl"
        >
          {isPending ? 'Saving...' : initialData ? 'Update Testimonial' : 'Create Testimonial'}
        </BengalButton>
      </div>
    </form>
  );
}
