'use client';

import { useState, useTransition } from 'react';
import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { CameraUpload } from './CameraUpload';
import { FormSelect } from './FormField';
import { toast } from 'sonner';
import { X, GripVertical } from 'lucide-react';
import { Reorder } from 'framer-motion';
import type { Category } from '@/db/schema';
import { CATEGORY_STATUSES, STATUS_LABELS } from '@/db/enums';

const categoryFormSchema = z.object({
  name_en: z.string().min(2, 'Name must be at least 2 characters').max(120),
  name_bn: z.string().max(120).optional().or(z.literal('')),
  description_en: z.string().max(2000).optional().or(z.literal('')),
  description_bn: z.string().max(2000).optional().or(z.literal('')),
  seo_title_en: z.string().max(120).optional().or(z.literal('')),
  seo_title_bn: z.string().max(120).optional().or(z.literal('')),
  seo_description_en: z.string().max(300).optional().or(z.literal('')),
  seo_description_bn: z.string().max(300).optional().or(z.literal('')),
  status: z.enum([...CATEGORY_STATUSES]).default('draft'),
});

type CategoryFormValues = z.infer<typeof categoryFormSchema>;

type CategoryFormProps = {
  category?: (Category & { carousel_images?: string[] | null }) | null;
  locale: string;
  action: (formData: FormData) => Promise<void>;
};

const inputBaseClasses =
  'flex min-h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';
const inputErrorClasses = 'border-destructive ring-2 ring-destructive/20';
const inputNormalClasses = 'border-input';

export function CategoryForm({ category, locale, action }: CategoryFormProps) {
  const router = useRouter();
  const [images, setImages] = useState<string[]>(
    category?.carousel_images ?? []
  );
  const [apiError, setApiError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'en' | 'bn'>('en');

  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit: rhfHandleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<CategoryFormValues>({
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
    },
  });

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
    images.forEach((img) => formData.append('carousel_images', img));

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
    <form onSubmit={rhfHandleSubmit(onSubmit)} className="max-w-2xl space-y-5 md:space-y-8 pb-24 md:pb-12">
      {apiError && (
        <div
          role="alert"
          className="rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          {apiError}
        </div>
      )}

      {/* Images */}
      <div className="bg-card p-4 md:p-6 rounded-2xl border border-border">
        <h3 className="font-sans font-semibold tracking-tight text-lg md:text-xl mb-1 text-foreground">Images</h3>
        <p className="text-muted-foreground text-xs mb-3 md:mb-4">
          First image is the cover. Multiple images create an auto-sliding carousel.
        </p>
        <Reorder.Group
          axis="x"
          values={images}
          onReorder={setImages}
          className="flex gap-3 overflow-x-auto pb-4 pt-1 px-1 -mx-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {images.map((url, i) => (
            <Reorder.Item
              key={url}
              value={url}
              className="relative w-28 h-20 shrink-0 rounded-lg overflow-hidden bg-muted border border-border group"
            >
              <img src={url} alt={`Image ${i + 1}`} className="object-cover w-full h-full" />
              {i === 0 && (
                <span className="absolute top-1 left-1 text-[8px] tracking-wider uppercase bg-primary text-primary-foreground px-1.5 py-0.5 rounded-sm">
                  Cover
                </span>
              )}
              <button
                type="button"
                onClick={() => setImages((prev) => prev.filter((_, idx) => idx !== i))}
                className="absolute -top-0.5 -right-0.5 w-8 h-8 bg-foreground/80 text-background rounded-full flex items-center justify-center md:opacity-0 md:group-hover:opacity-100 transition-opacity touch-manipulation"
              >
                <X size={14} />
              </button>
              <div className="absolute bottom-0.5 left-0.5 w-7 h-7 bg-foreground/50 text-background rounded flex items-center justify-center md:opacity-0 md:group-hover:opacity-100 transition-opacity cursor-grab touch-manipulation">
                <GripVertical size={14} />
              </div>
            </Reorder.Item>
          ))}
          <div className="flex shrink-0">
            <CameraUpload
              onUpload={(url) => { if (url) setImages((prev) => [...prev, url]); }}
              onUploadMultiple={(urls) => setImages((prev) => [...prev, ...urls])}
              compact
              multiple
            />
          </div>
        </Reorder.Group>
      </div>

      {/* Language Tabs */}
      <div className="bg-card p-4 md:p-6 rounded-2xl border border-border">
        <div className="flex gap-1 mb-4">
          {(['en', 'bn'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={cn(
                'px-4 py-2 text-xs tracking-wider uppercase rounded-md transition-colors min-h-[44px]',
                activeTab === tab
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted'
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
                className="block text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-medium mb-1.5"
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
                <p className="text-destructive text-xs font-medium mt-1">{errors.name_en.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="description_en"
                className="block text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-medium mb-1.5"
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
                <p className="text-destructive text-xs font-medium mt-1">
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
                className="block text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-medium mb-1.5 font-bengali"
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
                <p className="text-destructive text-xs font-medium mt-1">{errors.name_bn.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="description_bn"
                className="block text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-medium mb-1.5 font-bengali"
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
                <p className="text-destructive text-xs font-medium mt-1">
                  {errors.description_bn.message}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* SEO */}
      <div className="bg-card p-4 md:p-6 rounded-2xl border border-border flex flex-col gap-4">
        <h3 className="font-sans font-semibold tracking-tight text-lg md:text-xl text-foreground">SEO</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="seo_title_en"
              className="block text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1"
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
                errors.seo_title_en ? inputErrorClasses : inputNormalClasses
              )}
            />
            {errors.seo_title_en && (
              <p className="text-destructive text-xs font-medium mt-1">
                {errors.seo_title_en.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="seo_title_bn"
              className="block text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1"
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
                errors.seo_title_bn ? inputErrorClasses : inputNormalClasses
              )}
            />
            {errors.seo_title_bn && (
              <p className="text-destructive text-xs font-medium mt-1">
                {errors.seo_title_bn.message}
              </p>
            )}
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="seo_description_en"
              className="block text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1"
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
                errors.seo_description_en ? inputErrorClasses : inputNormalClasses
              )}
            />
            {errors.seo_description_en && (
              <p className="text-destructive text-xs font-medium mt-1">
                {errors.seo_description_en.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="seo_description_bn"
              className="block text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1"
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
                errors.seo_description_bn ? inputErrorClasses : inputNormalClasses
              )}
            />
            {errors.seo_description_bn && (
              <p className="text-destructive text-xs font-medium mt-1">
                {errors.seo_description_bn.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="bg-card p-4 md:p-6 rounded-2xl border border-border flex flex-col gap-4">
        <h3 className="font-sans font-semibold tracking-tight text-lg md:text-xl text-foreground">Settings</h3>
        <FormSelect 
          label="Status" 
          value={watch('status')}
          onValueChange={(v) => setValue('status', v as any)}
          error={errors.status?.message}
        >
          {CATEGORY_STATUSES.map((v) => (
            <option key={v} value={v}>{STATUS_LABELS[v]}</option>
          ))}
        </FormSelect>
      </div>

      {/* Submit */}
      <div className="sticky bottom-[calc(3.5rem+env(safe-area-inset-bottom)+1rem)] md:bottom-6 z-40 bg-background/80 backdrop-blur-md p-3 -mx-4 md:mx-0 md:p-0 md:bg-transparent md:backdrop-blur-none border-t border-border/50 md:border-none">
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isPending}
            className={cn(
              'flex-1 py-3.5 min-h-[44px] bg-primary text-primary-foreground font-sans font-semibold tracking-wide rounded-xl transition-colors shadow-2xl touch-manipulation',
              isPending ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary/90 active:scale-[0.98]'
            )}
          >
            {isPending ? 'Saving...' : category ? 'Update Category' : 'Create Category'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-5 py-3.5 min-h-[44px] font-sans font-semibold text-muted-foreground hover:text-foreground bg-card backdrop-blur-sm rounded-xl border border-border shadow-lg transition-colors touch-manipulation"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}
