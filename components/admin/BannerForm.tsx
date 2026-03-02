'use client';

import { useState, useTransition, useEffect } from 'react';
import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { CameraUpload } from './CameraUpload';
import { BengalButton, BengalInput } from '@/components/bengal';
import { FormSelect } from './FormField';
import { createBanner, updateBanner } from '@/actions/banners';

type ReferenceData = {
  campaigns: { id: number; name_en: string }[];
  collections: { id: number; name_en: string }[];
  categories: { id: number; name_en: string }[];
};

const bannerFormSchema = z.object({
  title_en: z.string().max(120).optional().or(z.literal('')),
  title_bn: z.string().max(120).optional().or(z.literal('')),
  subtitle_en: z.string().max(200).optional().or(z.literal('')),
  subtitle_bn: z.string().max(200).optional().or(z.literal('')),
  cta_text_en: z.string().max(50).optional().or(z.literal('')),
  cta_text_bn: z.string().max(50).optional().or(z.literal('')),
  cta_url: z.string().optional().or(z.literal('')),
  placement: z.enum(['hero', 'sidebar', 'inline', 'category_hero', 'collection_hero']),
  campaign_id: z.union([z.coerce.number(), z.literal('')]).optional(),
  collection_id: z.union([z.coerce.number(), z.literal('')]).optional(),
  category_id: z.union([z.coerce.number(), z.literal('')]).optional(),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  image_url: z.string().url('Desktop image is required'),
  image_url_mobile: z.string().url().optional().or(z.literal('')),
});

type BannerFormValues = z.infer<typeof bannerFormSchema>;

type BannerFormProps = {
  initialData?: {
    id: number;
    title_en?: string | null;
    title_bn?: string | null;
    subtitle_en?: string | null;
    subtitle_bn?: string | null;
    cta_text_en?: string | null;
    cta_text_bn?: string | null;
    cta_url?: string | null;
    placement?: string | null;
    campaign_id?: number | null;
    collection_id?: number | null;
    category_id?: number | null;
    status?: string | null;
    image_url?: string | null;
    image_url_mobile?: string | null;
  };
  locale: string;
  refs: ReferenceData;
};

export function BannerForm({ initialData, locale, refs }: BannerFormProps) {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState(initialData?.image_url || '');
  const [imageUrlMobile, setImageUrlMobile] = useState(initialData?.image_url_mobile || '');
  const [apiError, setApiError] = useState<string | null>(null);

  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit: rhfHandleSubmit,
    formState: { errors },
    setValue,
  } = useForm<BannerFormValues>({
    // @ts-expect-error - Zod v4 and @hookform/resolvers have type compatibility issues
    resolver: zodResolver(bannerFormSchema) as Resolver<BannerFormValues>,
    defaultValues: {
      title_en: initialData?.title_en ?? '',
      title_bn: initialData?.title_bn ?? '',
      subtitle_en: initialData?.subtitle_en ?? '',
      subtitle_bn: initialData?.subtitle_bn ?? '',
      cta_text_en: initialData?.cta_text_en ?? '',
      cta_text_bn: initialData?.cta_text_bn ?? '',
      cta_url: initialData?.cta_url ?? '',
      placement: (initialData?.placement as BannerFormValues['placement']) ?? 'hero',
      campaign_id: initialData?.campaign_id ?? '',
      collection_id: initialData?.collection_id ?? '',
      category_id: initialData?.category_id ?? '',
      status: (initialData?.status as BannerFormValues['status']) ?? 'draft',
      image_url: initialData?.image_url ?? '',
      image_url_mobile: initialData?.image_url_mobile ?? '',
    },
  });

  useEffect(() => {
    setValue('image_url', imageUrl);
  }, [imageUrl, setValue]);

  useEffect(() => {
    setValue('image_url_mobile', imageUrlMobile);
  }, [imageUrlMobile, setValue]);

  const handleUpload = (url: string) => setImageUrl(url);
  const handleUploadMobile = (url: string) => setImageUrlMobile(url);

  const onSubmit = (data: BannerFormValues) => {
    setApiError(null);
    const formData = new FormData();
    formData.set('image_url', imageUrl);
    formData.set('image_url_mobile', imageUrlMobile);
    formData.set('placement', data.placement);
    formData.set('status', data.status);
    if (data.title_en) formData.set('title_en', data.title_en);
    if (data.title_bn) formData.set('title_bn', data.title_bn);
    if (data.subtitle_en) formData.set('subtitle_en', data.subtitle_en);
    if (data.subtitle_bn) formData.set('subtitle_bn', data.subtitle_bn);
    if (data.cta_text_en) formData.set('cta_text_en', data.cta_text_en);
    if (data.cta_text_bn) formData.set('cta_text_bn', data.cta_text_bn);
    if (data.cta_url) formData.set('cta_url', data.cta_url);
    if (typeof data.campaign_id === 'number') formData.set('campaign_id', String(data.campaign_id));
    if (typeof data.collection_id === 'number') formData.set('collection_id', String(data.collection_id));
    if (typeof data.category_id === 'number') formData.set('category_id', String(data.category_id));

    startTransition(async () => {
      try {
        if (initialData) {
          await updateBanner(initialData.id, formData);
          toast.success('Banner updated successfully');
        } else {
          await createBanner(formData);
          toast.success('Banner created successfully');
        }
        router.push(`/${locale}/admin/banners`);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Error saving banner';
        setApiError(message);
        toast.error(message);
      }
    });
  };

  return (
    <form onSubmit={rhfHandleSubmit(onSubmit)} className="flex flex-col gap-8 pb-12">
      {apiError && (
        <div
          role="alert"
          className="rounded-xl border border-bengal-alta/50 bg-bengal-alta/10 px-4 py-3 text-sm text-bengal-alta"
        >
          {apiError}
        </div>
      )}

      {/* ─── Media Section ─── */}
      <div className="bg-bengal-kori/50 p-6 rounded-2xl border border-bengal-kansa/20 flex flex-col gap-6">
        <h3 className="font-editorial text-xl text-bengal-kajal">Media (Desktop & Mobile)</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-[10px] tracking-widest uppercase font-medium text-bengal-kajal/70 font-sans-en block mb-2">
              Desktop Image * (16:9 or similar)
            </label>
            <CameraUpload onUpload={handleUpload} initialUrl={imageUrl} />
            {errors.image_url && (
              <p className="text-bengal-alta text-xs font-medium mt-1">{errors.image_url.message}</p>
            )}
          </div>
          <div>
            <label className="text-[10px] tracking-widest uppercase font-medium text-bengal-kajal/70 font-sans-en block mb-2">
              Mobile Image (Optional, 4:5)
            </label>
            <CameraUpload onUpload={handleUploadMobile} initialUrl={imageUrlMobile} />
            {errors.image_url_mobile && (
              <p className="text-bengal-alta text-xs font-medium mt-1">
                {errors.image_url_mobile.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ─── Content ─── */}
      <div className="bg-bengal-kori/50 p-6 rounded-2xl border border-bengal-kansa/20 flex flex-col gap-4">
        <h3 className="font-editorial text-xl text-bengal-kajal">Content</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BengalInput label="Title (EN)" {...register('title_en')} error={errors.title_en?.message} />
          <BengalInput
            label="Title (BN)"
            {...register('title_bn')}
            isBengali
            error={errors.title_bn?.message}
          />
          <BengalInput
            label="Subtitle (EN)"
            {...register('subtitle_en')}
            error={errors.subtitle_en?.message}
          />
          <BengalInput
            label="Subtitle (BN)"
            {...register('subtitle_bn')}
            isBengali
            error={errors.subtitle_bn?.message}
          />
          <BengalInput
            label="CTA Text (EN)"
            {...register('cta_text_en')}
            error={errors.cta_text_en?.message}
          />
          <BengalInput
            label="CTA Text (BN)"
            {...register('cta_text_bn')}
            isBengali
            error={errors.cta_text_bn?.message}
          />
        </div>

        <BengalInput
          label="CTA URL"
          {...register('cta_url')}
          placeholder="/shop"
          error={errors.cta_url?.message}
        />
      </div>

      {/* ─── Placement & Linking ─── */}
      <div className="bg-bengal-kori/50 p-6 rounded-2xl border border-bengal-kansa/20 flex flex-col gap-4">
        <h3 className="font-editorial text-xl text-bengal-kajal">Placement & Settings</h3>

        <FormSelect label="Placement *" {...register('placement')} error={errors.placement?.message}>
          <option value="hero">Hero (Storefront Top)</option>
          <option value="inline">Inline (Middle of page)</option>
          <option value="sidebar">Sidebar</option>
          <option value="category_hero">Category Hero</option>
          <option value="collection_hero">Collection Hero</option>
        </FormSelect>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormSelect label="Link to Campaign" {...register('campaign_id')}>
            <option value="">None</option>
            {refs.campaigns.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name_en}
              </option>
            ))}
          </FormSelect>
          <FormSelect label="Link to Collection" {...register('collection_id')}>
            <option value="">None</option>
            {refs.collections.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name_en}
              </option>
            ))}
          </FormSelect>
          <FormSelect label="Link to Category" {...register('category_id')}>
            <option value="">None</option>
            {refs.categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name_en}
              </option>
            ))}
          </FormSelect>
        </div>

        <FormSelect label="Status" {...register('status')}>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </FormSelect>
      </div>

      <div className="sticky bottom-[calc(3.5rem+env(safe-area-inset-bottom)+1rem)] md:bottom-6 z-10">
        <BengalButton
          type="submit"
          variant="primary"
          size="touch"
          loading={isPending}
          className="shadow-2xl"
        >
          {isPending ? 'Saving...' : initialData ? 'Update Banner' : 'Create Banner'}
        </BengalButton>
      </div>
    </form>
  );
}
