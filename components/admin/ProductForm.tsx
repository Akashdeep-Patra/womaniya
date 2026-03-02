'use client';

import { useState, useTransition, useEffect } from 'react';
import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { CameraUpload } from './CameraUpload';
import { BengalButton, BengalInput } from '@/components/bengal';
import { FormTextarea, FormSelect } from './FormField';
import { createProduct, updateProduct } from '@/actions/products';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { X, GripVertical } from 'lucide-react';
import { Reorder } from 'framer-motion';

type CategoryItem = { id: number; name_en: string };
type CollectionItem = { id: number; name_en: string };

const productFormSchema = z.object({
  name_en: z.string().min(2, 'Name must be at least 2 characters').max(120),
  name_bn: z.string().max(120).optional().or(z.literal('')),
  description_en: z.string().max(5000).optional().or(z.literal('')),
  description_bn: z.string().max(5000).optional().or(z.literal('')),
  seo_title_en: z.string().max(120).optional().or(z.literal('')),
  seo_description_en: z.string().max(300).optional().or(z.literal('')),
  price: z.coerce.number().positive('Price must be positive').max(999999),
  category_id: z.coerce.number().refine((n) => n > 0, 'Please select a category'),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  is_featured: z
    .union([z.boolean(), z.literal('on')])
    .optional()
    .transform((v) => v === true || v === 'on')
    .default(false),
  image_uploaded_url: z.string().min(1, 'Primary image is required'),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

type ProductFormProps = {
  initialData?: {
    id: number;
    name_en?: string | null;
    name_bn?: string | null;
    description_en?: string | null;
    description_bn?: string | null;
    seo_title_en?: string | null;
    seo_description_en?: string | null;
    price?: string | null;
    category_id?: number | null;
    status?: string | null;
    is_featured?: boolean | null;
    image_url?: string | null;
    collectionLinks?: { collection_id: number }[];
  };
  initialImages?: { image_url: string }[];
  categories: CategoryItem[];
  collections: CollectionItem[];
};

export function ProductForm({ initialData, initialImages, categories, collections }: ProductFormProps) {
  const t = useTranslations('admin');

  const [primaryImage, setPrimaryImage] = useState(initialData?.image_url || '');
  const [additionalImages, setAdditionalImages] = useState<string[]>(
    initialImages?.map((img) => img.image_url) || []
  );
  const [selectedCollections, setSelectedCollections] = useState<number[]>(
    initialData?.collectionLinks?.map((c) => c.collection_id) || []
  );
  const [apiError, setApiError] = useState<string | null>(null);

  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit: rhfHandleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema) as Resolver<ProductFormValues>,
    defaultValues: {
      name_en: initialData?.name_en ?? '',
      name_bn: initialData?.name_bn ?? '',
      description_en: initialData?.description_en ?? '',
      description_bn: initialData?.description_bn ?? '',
      seo_title_en: initialData?.seo_title_en ?? '',
      seo_description_en: initialData?.seo_description_en ?? '',
      price: initialData?.price ? Number(initialData.price) : undefined,
      category_id: (initialData?.category_id ?? '') as number,
      status: (initialData?.status as ProductFormValues['status']) ?? 'draft',
      is_featured: initialData?.is_featured ?? false,
      image_uploaded_url: initialData?.image_url ?? '',
    },
  });

  useEffect(() => {
    setValue('image_uploaded_url', primaryImage);
  }, [primaryImage, setValue]);

  const handlePrimaryUpload = (url: string) => {
    setPrimaryImage(url);
  };

  const handleAdditionalUpload = (url: string) => {
    setAdditionalImages((prev) => [...prev, url]);
  };

  const removeAdditionalImage = (index: number) => {
    setAdditionalImages((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleCollection = (id: number) => {
    setSelectedCollections((prev) =>
      prev.includes(id) ? prev.filter((colId) => colId !== id) : [...prev, id]
    );
  };

  const onSubmit = (data: ProductFormValues) => {
    setApiError(null);
    const formData = new FormData();

    formData.set('name_en', data.name_en);
    if (data.name_bn) formData.set('name_bn', data.name_bn);
    if (data.description_en) formData.set('description_en', data.description_en);
    if (data.description_bn) formData.set('description_bn', data.description_bn);
    if (data.seo_title_en) formData.set('seo_title_en', data.seo_title_en);
    if (data.seo_description_en) formData.set('seo_description_en', data.seo_description_en);
    formData.set('price', String(data.price));
    formData.set('category_id', String(data.category_id));
    formData.set('category', categories.find((c) => c.id === data.category_id)?.name_en ?? '');
    formData.set('status', data.status);
    formData.set('is_featured', data.is_featured ? 'on' : '');
    formData.set('image_uploaded_url', primaryImage);

    additionalImages.forEach((img) => formData.append('additional_images', img));
    selectedCollections.forEach((id) => formData.append('collection_ids', id.toString()));

    startTransition(async () => {
      try {
        if (initialData) {
          await updateProduct(initialData.id, formData);
          toast.success('Updated successfully');
        } else {
          await createProduct(formData);
          toast.success(t('published'));
          reset({
            name_en: '',
            name_bn: '',
            description_en: '',
            description_bn: '',
            seo_title_en: '',
            seo_description_en: '',
            price: 0,
            category_id: '' as unknown as number,
            status: 'draft',
            is_featured: false,
            image_uploaded_url: '',
          });
          setPrimaryImage('');
          setAdditionalImages([]);
          setSelectedCollections([]);
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Error publishing';
        setApiError(message);
        toast.error(message);
      }
    });
  };

  const inputClassName = (fieldError?: string) =>
    `w-full px-4 py-3 rounded-sm border bg-bengal-cream text-bengal-kajal text-sm font-sans-en focus:outline-none focus:ring-2 focus:ring-bengal-sindoor/30 focus:border-bengal-sindoor transition-colors resize-none ${
      fieldError ? 'border-bengal-alta ring-2 ring-bengal-alta/20' : 'border-bengal-kansa/30'
    }`;

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
      <div className="bg-bengal-kori/50 p-6 rounded-2xl border border-bengal-kansa/20">
        <h3 className="font-editorial text-xl mb-4 text-bengal-kajal">Media</h3>

        <div className="flex flex-col gap-6">
          <div>
            <label className="text-[10px] tracking-widest uppercase font-medium text-bengal-kajal/70 font-sans-en block mb-2">
              Primary Image *
            </label>
            <CameraUpload onUpload={handlePrimaryUpload} initialUrl={primaryImage} />
            {errors.image_uploaded_url && (
              <p className="text-bengal-alta text-xs font-medium mt-1">
                {errors.image_uploaded_url.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-[10px] tracking-widest uppercase font-medium text-bengal-kajal/70 font-sans-en block mb-2">
              Additional Images
            </label>
            <Reorder.Group
              axis="x"
              values={additionalImages}
              onReorder={setAdditionalImages}
              className="flex gap-3 overflow-x-auto pb-4"
            >
              {additionalImages.map((url, i) => (
                <Reorder.Item
                  key={url}
                  value={url}
                  className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-bengal-mati border border-bengal-kansa/30 group"
                >
                  <img src={url} alt="Additional" className="object-cover w-full h-full" />
                  <button
                    type="button"
                    onClick={() => removeAdditionalImage(i)}
                    className="absolute top-1 right-1 w-6 h-6 bg-bengal-kajal/80 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={12} />
                  </button>
                  <div className="absolute bottom-1 left-1 w-6 h-6 bg-bengal-kajal/50 text-white rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-grab">
                    <GripVertical size={12} />
                  </div>
                </Reorder.Item>
              ))}
              <div className="w-24 h-24 flex-shrink-0">
                <CameraUpload onUpload={handleAdditionalUpload} compact />
              </div>
            </Reorder.Group>
          </div>
        </div>
      </div>

      {/* ─── Basic Info (Bilingual) ─── */}
      <div className="bg-bengal-kori/50 p-6 rounded-2xl border border-bengal-kansa/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-editorial text-xl text-bengal-kajal">Information</h3>
        </div>

        <Tabs defaultValue="en" className="w-full">
          <TabsList className="mb-4 bg-bengal-mati">
            <TabsTrigger value="en">English</TabsTrigger>
            <TabsTrigger value="bn" className="font-bengali">
              বাংলা
            </TabsTrigger>
          </TabsList>

          <TabsContent value="en" className="flex flex-col gap-4">
            <BengalInput
              label={t('form_name')}
              {...register('name_en')}
              placeholder="e.g. Crimson Dhakai Jamdani"
              error={errors.name_en?.message}
            />
            <FormTextarea
              label={t('form_description')}
              {...register('description_en')}
              rows={4}
              placeholder="Handwoven on a traditional loom..."
              error={errors.description_en?.message}
              className={inputClassName(errors.description_en?.message)}
            />
            <BengalInput
              label="SEO Title (EN)"
              {...register('seo_title_en')}
              placeholder="Leave empty to auto-generate"
              error={errors.seo_title_en?.message}
            />
            <FormTextarea
              label="SEO Description (EN)"
              {...register('seo_description_en')}
              rows={2}
              placeholder="Meta description for search engines..."
              error={errors.seo_description_en?.message}
              className={inputClassName(errors.seo_description_en?.message)}
            />
          </TabsContent>

          <TabsContent value="bn" className="flex flex-col gap-4">
            <BengalInput
              label={t('form_name_bn')}
              {...register('name_bn')}
              placeholder="যেমন: ক্রিমসন ঢাকাই জামদানি"
              isBengali
              error={errors.name_bn?.message}
            />
            <FormTextarea
              label="Description (Bengali)"
              {...register('description_bn')}
              rows={4}
              error={errors.description_bn?.message}
              isBengali
              className={inputClassName(errors.description_bn?.message)}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* ─── Organization ─── */}
      <div className="bg-bengal-kori/50 p-6 rounded-2xl border border-bengal-kansa/20 flex flex-col gap-5">
        <h3 className="font-editorial text-xl text-bengal-kajal">Organization & Pricing</h3>

        <BengalInput
          label={t('form_price')}
          type="number"
          {...register('price', { valueAsNumber: true })}
          min={0}
          step={0.01}
          placeholder="4500"
          error={errors.price?.message}
        />

        <FormSelect
          label={t('form_category')}
          {...register('category_id', { valueAsNumber: true })}
          error={errors.category_id?.message}
        >
          <option value="" disabled>
            Select category…
          </option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name_en}
            </option>
          ))}
        </FormSelect>

        <div className="flex flex-col gap-2">
          <label className="text-[10px] tracking-widest uppercase font-medium text-bengal-kajal/70 font-sans-en">
            Collections
          </label>
          <div className="flex flex-wrap gap-2">
            {collections.map((col) => (
              <button
                key={col.id}
                type="button"
                onClick={() => toggleCollection(col.id)}
                className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                  selectedCollections.includes(col.id)
                    ? 'bg-bengal-kansa text-bengal-kori border-bengal-kansa'
                    : 'bg-transparent text-bengal-kajal border-bengal-kansa/30 hover:border-bengal-kansa'
                }`}
              >
                {col.name_en}
              </button>
            ))}
          </div>
        </div>

        <FormSelect label="Status" {...register('status')}>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </FormSelect>

        <label className="flex items-center gap-3 cursor-pointer min-h-[44px] mt-2">
          <div className="relative">
            <input
              type="checkbox"
              {...register('is_featured')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-bengal-mati rounded-full border border-bengal-kansa/30 peer-checked:bg-bengal-sindoor transition-colors" />
            <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5" />
          </div>
          <span className="text-sm text-bengal-kajal">{t('form_featured')}</span>
        </label>
      </div>

      {/* ─── Submit ─── */}
      <div className="sticky bottom-[calc(3.5rem+env(safe-area-inset-bottom)+1rem)] md:bottom-6 z-10">
        <BengalButton
          type="submit"
          variant="primary"
          size="touch"
          loading={isPending}
          className="shadow-2xl"
        >
          {isPending ? t('publishing') : initialData ? 'Update Product' : t('publish')}
        </BengalButton>
      </div>
    </form>
  );
}
