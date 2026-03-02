'use client';

import { useState, useTransition, useEffect } from 'react';
import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ImageUploader } from './ImageUploader';
import { toast } from 'sonner';
import type { Category } from '@/db/schema';

const categoryFormSchema = z.object({
  name_en: z.string().min(2, 'Name must be at least 2 characters').max(120),
  name_bn: z.string().max(120).optional().or(z.literal('')),
  description_en: z.string().max(2000).optional().or(z.literal('')),
  description_bn: z.string().max(2000).optional().or(z.literal('')),
  seo_title_en: z.string().max(120).optional().or(z.literal('')),
  seo_title_bn: z.string().max(120).optional().or(z.literal('')),
  seo_description_en: z.string().max(300).optional().or(z.literal('')),
  seo_description_bn: z.string().max(300).optional().or(z.literal('')),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  hero_image_url: z.string().url().optional().or(z.literal('')),
});

type CategoryFormValues = z.infer<typeof categoryFormSchema>;

type CategoryFormProps = {
  category?: Category | null;
  locale: string;
  action: (formData: FormData) => Promise<void>;
};

const inputBaseClasses =
  'w-full px-4 py-2.5 bg-white border rounded-md text-sm focus:ring-1 focus:ring-[#C5A059]/30 outline-none';
const inputErrorClasses = 'border-red-500 ring-1 ring-red-500/20';
const inputNormalClasses = 'border-[#C5A059]/15';

export function CategoryForm({ category, locale, action }: CategoryFormProps) {
  const router = useRouter();
  const [heroImage, setHeroImage] = useState(category?.hero_image_url ?? '');
  const [apiError, setApiError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'en' | 'bn'>('en');

  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit: rhfHandleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CategoryFormValues>({
    // @ts-expect-error - Zod v4 and @hookform/resolvers have type compatibility issues
    resolver: zodResolver(categoryFormSchema) as Resolver<CategoryFormValues>,
    defaultValues: {
      name_en: category?.name_en ?? '',
      name_bn: category?.name_bn ?? '',
      description_en: category?.description_en ?? '',
      description_bn: category?.description_bn ?? '',
      seo_title_en: category?.seo_title_en ?? '',
      seo_title_bn: category?.seo_title_bn ?? '',
      seo_description_en: category?.seo_description_en ?? '',
      seo_description_bn: category?.seo_description_bn ?? '',
      status: (category?.status as CategoryFormValues['status']) ?? 'draft',
      hero_image_url: category?.hero_image_url ?? '',
    },
  });

  useEffect(() => {
    setValue('hero_image_url', heroImage);
  }, [heroImage, setValue]);

  const onSubmit = (data: CategoryFormValues) => {
    setApiError(null);
    const formData = new FormData();
    formData.set('name_en', data.name_en);
    if (data.name_bn) formData.set('name_bn', data.name_bn);
    if (data.description_en) formData.set('description_en', data.description_en);
    if (data.description_bn) formData.set('description_bn', data.description_bn);
    if (data.seo_title_en) formData.set('seo_title_en', data.seo_title_en);
    if (data.seo_title_bn) formData.set('seo_title_bn', data.seo_title_bn);
    if (data.seo_description_en) formData.set('seo_description_en', data.seo_description_en);
    if (data.seo_description_bn) formData.set('seo_description_bn', data.seo_description_bn);
    formData.set('status', data.status);
    formData.set('hero_image_url', heroImage);

    startTransition(async () => {
      try {
        await action(formData);
        toast.success(category ? 'Category updated' : 'Category created');
        router.push(`/${locale}/admin/categories`);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Something went wrong';
        setApiError(message);
        toast.error(message);
      }
    });
  };

  return (
    <form onSubmit={rhfHandleSubmit(onSubmit)} className="max-w-2xl space-y-8">
      {apiError && (
        <div
          role="alert"
          className="rounded-lg border border-red-500/50 bg-red-500/10 px-4 py-3 text-sm text-red-600"
        >
          {apiError}
        </div>
      )}

      {/* Hero Image */}
      <div>
        <label className="block text-[10px] tracking-[0.15em] uppercase text-[#1A1918]/50 font-medium mb-2">
          Hero Image
        </label>
        <ImageUploader
          value={heroImage}
          onChange={setHeroImage}
          onRemove={() => setHeroImage('')}
          aspect="landscape"
          className="max-w-md"
        />
      </div>

      {/* Language Tabs */}
      <div>
        <div className="flex gap-1 mb-4">
          {(['en', 'bn'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={cn(
                'px-4 py-2 text-xs tracking-wider uppercase rounded-md transition-colors min-h-[44px]',
                activeTab === tab
                  ? 'bg-[#1A1918] text-[#F9F6F0]'
                  : 'text-[#1A1918]/50 hover:bg-[#1A1918]/5'
              )}
            >
              {tab === 'en' ? 'English' : 'বাংলা'}
            </button>
          ))}
        </div>

        {activeTab === 'en' ? (
          <div className="space-y-4">
            <div>
              <label
                htmlFor="name_en"
                className="block text-[10px] tracking-[0.15em] uppercase text-[#1A1918]/50 font-medium mb-1.5"
              >
                Name (English) *
              </label>
              <input
                id="name_en"
                {...register('name_en')}
                type="text"
                className={cn(
                  inputBaseClasses,
                  errors.name_en ? inputErrorClasses : inputNormalClasses
                )}
              />
              {errors.name_en && (
                <p className="text-red-500 text-xs font-medium mt-1">{errors.name_en.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="description_en"
                className="block text-[10px] tracking-[0.15em] uppercase text-[#1A1918]/50 font-medium mb-1.5"
              >
                Description (English)
              </label>
              <textarea
                id="description_en"
                {...register('description_en')}
                rows={4}
                className={cn(
                  inputBaseClasses,
                  'resize-none',
                  errors.description_en ? inputErrorClasses : inputNormalClasses
                )}
              />
              {errors.description_en && (
                <p className="text-red-500 text-xs font-medium mt-1">
                  {errors.description_en.message}
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label
                htmlFor="name_bn"
                className="block text-[10px] tracking-[0.15em] uppercase text-[#1A1918]/50 font-medium mb-1.5 font-bengali"
              >
                নাম (বাংলা)
              </label>
              <input
                id="name_bn"
                {...register('name_bn')}
                type="text"
                className={cn(
                  inputBaseClasses,
                  'font-bengali',
                  errors.name_bn ? inputErrorClasses : inputNormalClasses
                )}
              />
              {errors.name_bn && (
                <p className="text-red-500 text-xs font-medium mt-1">{errors.name_bn.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="description_bn"
                className="block text-[10px] tracking-[0.15em] uppercase text-[#1A1918]/50 font-medium mb-1.5 font-bengali"
              >
                বিবরণ (বাংলা)
              </label>
              <textarea
                id="description_bn"
                {...register('description_bn')}
                rows={4}
                className={cn(
                  inputBaseClasses,
                  'font-bengali resize-none',
                  errors.description_bn ? inputErrorClasses : inputNormalClasses
                )}
              />
              {errors.description_bn && (
                <p className="text-red-500 text-xs font-medium mt-1">
                  {errors.description_bn.message}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* SEO */}
      <div className="border border-[#C5A059]/10 rounded-lg p-5 space-y-4">
        <h3 className="text-[10px] tracking-[0.15em] uppercase text-[#1A1918]/50 font-medium">
          SEO
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="seo_title_en"
              className="block text-[10px] tracking-[0.15em] uppercase text-[#1A1918]/40 mb-1"
            >
              SEO Title (EN)
            </label>
            <input
              id="seo_title_en"
              {...register('seo_title_en')}
              type="text"
              className={cn(
                inputBaseClasses,
                'px-3 py-2',
                errors.seo_title_en ? inputErrorClasses : 'border-[#C5A059]/10'
              )}
            />
            {errors.seo_title_en && (
              <p className="text-red-500 text-xs font-medium mt-1">
                {errors.seo_title_en.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="seo_title_bn"
              className="block text-[10px] tracking-[0.15em] uppercase text-[#1A1918]/40 mb-1"
            >
              SEO Title (BN)
            </label>
            <input
              id="seo_title_bn"
              {...register('seo_title_bn')}
              type="text"
              className={cn(
                inputBaseClasses,
                'px-3 py-2 font-bengali',
                errors.seo_title_bn ? inputErrorClasses : 'border-[#C5A059]/10'
              )}
            />
            {errors.seo_title_bn && (
              <p className="text-red-500 text-xs font-medium mt-1">
                {errors.seo_title_bn.message}
              </p>
            )}
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="seo_description_en"
              className="block text-[10px] tracking-[0.15em] uppercase text-[#1A1918]/40 mb-1"
            >
              SEO Description (EN)
            </label>
            <textarea
              id="seo_description_en"
              {...register('seo_description_en')}
              rows={2}
              className={cn(
                inputBaseClasses,
                'px-3 py-2 resize-none',
                errors.seo_description_en ? inputErrorClasses : 'border-[#C5A059]/10'
              )}
            />
            {errors.seo_description_en && (
              <p className="text-red-500 text-xs font-medium mt-1">
                {errors.seo_description_en.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="seo_description_bn"
              className="block text-[10px] tracking-[0.15em] uppercase text-[#1A1918]/40 mb-1"
            >
              SEO Description (BN)
            </label>
            <textarea
              id="seo_description_bn"
              {...register('seo_description_bn')}
              rows={2}
              className={cn(
                inputBaseClasses,
                'px-3 py-2 font-bengali resize-none',
                errors.seo_description_bn ? inputErrorClasses : 'border-[#C5A059]/10'
              )}
            />
            {errors.seo_description_bn && (
              <p className="text-red-500 text-xs font-medium mt-1">
                {errors.seo_description_bn.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Status */}
      <div>
        <label
          htmlFor="status"
          className="block text-[10px] tracking-[0.15em] uppercase text-[#1A1918]/50 font-medium mb-1.5"
        >
          Status
        </label>
        <select
          id="status"
          {...register('status')}
          className={cn(
            inputBaseClasses,
            'max-w-xs',
            errors.status ? inputErrorClasses : 'border-[#C5A059]/15'
          )}
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>
        {errors.status && (
          <p className="text-red-500 text-xs font-medium mt-1">{errors.status.message}</p>
        )}
      </div>

      {/* Submit */}
      <div className="flex flex-wrap items-center gap-3 pt-4">
        <button
          type="submit"
          disabled={isPending}
          className={cn(
            'px-6 py-2.5 min-h-[44px] bg-[#8A1C14] text-white text-sm tracking-wider uppercase rounded-md transition-colors',
            isPending ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#B3241C]'
          )}
        >
          {isPending ? 'Saving...' : category ? 'Update Category' : 'Create Category'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2.5 min-h-[44px] text-sm text-[#1A1918]/50 hover:text-[#1A1918] transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
