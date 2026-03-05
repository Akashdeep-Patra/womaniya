'use client';

import { useState, useTransition, useEffect } from 'react';
import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { CameraUpload } from './CameraUpload';
import { TagInput } from './TagInput';
import { BengalButton, BengalInput } from '@/components/bengal';
import { FormTextarea, FormSelect } from './FormField';
import { createProduct, updateProduct } from '@/actions/products';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { X, GripVertical } from 'lucide-react';
import { Reorder } from 'framer-motion';
import { PRODUCT_STATUSES, STOCK_STATUSES, STATUS_LABELS, STOCK_STATUS_LABELS } from '@/db/enums';

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
  status: z.enum([...PRODUCT_STATUSES]).default('draft'),
  is_featured: z
    .union([z.boolean(), z.literal('on')])
    .optional()
    .transform((v) => v === true || v === 'on')
    .default(false),
  image_uploaded_url: z.string().min(1, 'Primary image is required'),
  fabric: z.string().optional().or(z.literal('')),
  weight: z.string().optional().or(z.literal('')),
  care_instructions: z.string().optional().or(z.literal('')),
  origin: z.string().optional().or(z.literal('')),
  sku: z.string().optional().or(z.literal('')),
  stock_status: z.enum([...STOCK_STATUSES]).default('in_stock'),
  delivery_info: z.string().optional().or(z.literal('')),
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
    sizes?: string[] | null;
    colors?: string[] | null;
    fabric?: string | null;
    weight?: string | null;
    care_instructions?: string | null;
    origin?: string | null;
    sku?: string | null;
    stock_status?: string | null;
    delivery_info?: string | null;
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
  const [sizes, setSizes] = useState<string[]>(initialData?.sizes || []);
  const [colors, setColors] = useState<string[]>(initialData?.colors || []);
  const [apiError, setApiError] = useState<string | null>(null);

  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit: rhfHandleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
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
      fabric: initialData?.fabric ?? '',
      weight: initialData?.weight ?? '',
      care_instructions: initialData?.care_instructions ?? '',
      origin: initialData?.origin ?? '',
      sku: initialData?.sku ?? '',
      stock_status: (initialData?.stock_status as ProductFormValues['stock_status']) ?? 'in_stock',
      delivery_info: initialData?.delivery_info ?? '',
    },
  });

  useEffect(() => {
    setValue('image_uploaded_url', primaryImage);
  }, [primaryImage, setValue]);

  const handlePrimaryUpload = (url: string) => {
    setPrimaryImage(url);
  };

  const handleAdditionalUpload = (url: string) => {
    if (url) setAdditionalImages((prev) => [...prev, url]);
  };

  const handleAdditionalUploadMultiple = (urls: string[]) => {
    setAdditionalImages((prev) => [...prev, ...urls]);
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

    if (data.fabric) formData.set('fabric', data.fabric);
    if (data.weight) formData.set('weight', data.weight);
    if (data.care_instructions) formData.set('care_instructions', data.care_instructions);
    if (data.origin) formData.set('origin', data.origin);
    if (data.sku) formData.set('sku', data.sku);
    formData.set('stock_status', data.stock_status);
    if (data.delivery_info) formData.set('delivery_info', data.delivery_info);

    sizes.forEach((s) => formData.append('sizes', s));
    colors.forEach((c) => formData.append('colors', c));

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
            fabric: '',
            weight: '',
            care_instructions: '',
            origin: '',
            sku: '',
            stock_status: 'in_stock',
            delivery_info: '',
          });
          setPrimaryImage('');
          setAdditionalImages([]);
          setSelectedCollections([]);
          setSizes([]);
          setColors([]);
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Error publishing';
        setApiError(message);
        toast.error(message);
      }
    });
  };

  const inputClassName = (fieldError?: string) =>
    `flex min-h-[80px] w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none ${
      fieldError ? 'border-destructive ring-2 ring-destructive/20' : 'border-input'
    }`;

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

      {/* ─── Media Section ─── */}
      <div className="bg-card p-4 md:p-6 rounded-2xl border border-border">
        <h3 className="font-sans font-semibold tracking-tight text-lg md:text-xl mb-3 md:mb-4 text-foreground">Media</h3>

        <div className="flex flex-col gap-6">
          <div>
            <label className="text-[10px] tracking-widest uppercase font-medium text-muted-foreground font-sans-en block mb-2">
              Primary Image *
            </label>
            <CameraUpload onUpload={handlePrimaryUpload} initialUrl={primaryImage} />
            {errors.image_uploaded_url && (
              <p className="text-destructive text-xs font-medium mt-1">
                {errors.image_uploaded_url.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-[10px] tracking-widest uppercase font-medium text-muted-foreground font-sans-en block mb-2">
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
                  className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-muted border border-border group"
                >
                  <img src={url} alt="Additional" className="object-cover w-full h-full" />
                  <button
                    type="button"
                    onClick={() => removeAdditionalImage(i)}
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
                  onUpload={handleAdditionalUpload}
                  onUploadMultiple={handleAdditionalUploadMultiple}
                  compact
                  multiple
                />
              </div>
            </Reorder.Group>
          </div>
        </div>
      </div>

      {/* ─── Basic Info (Bilingual) ─── */}
      <div className="bg-card p-4 md:p-6 rounded-2xl border border-border">
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <h3 className="font-sans font-semibold tracking-tight text-lg md:text-xl text-foreground">Information</h3>
        </div>

        <Tabs defaultValue="en" className="w-full">
          <TabsList className="mb-4 bg-muted">
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
      <div className="bg-card p-4 md:p-6 rounded-2xl border border-border flex flex-col gap-4 md:gap-5">
        <h3 className="font-sans font-semibold tracking-tight text-lg md:text-xl text-foreground">Organization & Pricing</h3>

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
          value={String(watch('category_id') || '')}
          onValueChange={(v) => setValue('category_id', Number(v))}
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
          <label className="text-[10px] tracking-widest uppercase font-medium text-muted-foreground font-sans-en">
            Collections
          </label>
          <div className="flex flex-wrap gap-2">
            {collections.map((col) => (
              <button
                key={col.id}
                type="button"
                onClick={() => toggleCollection(col.id)}
                className={`px-4 py-2.5 text-xs rounded-full border transition-colors min-h-[44px] touch-manipulation ${
                  selectedCollections.includes(col.id)
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-transparent text-foreground border-border hover:border-primary'
                }`}
              >
                {col.name_en}
              </button>
            ))}
          </div>
        </div>

        <FormSelect 
          label="Status" 
          value={watch('status')}
          onValueChange={(v) => setValue('status', v as any)}
        >
          {PRODUCT_STATUSES.map((v) => (
            <option key={v} value={v}>{STATUS_LABELS[v]}</option>
          ))}
        </FormSelect>

        <label className="flex items-center gap-3 cursor-pointer min-h-[44px] mt-2">
          <div className="relative">
            <input
              type="checkbox"
              {...register('is_featured')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-muted rounded-full border border-border peer-checked:bg-primary transition-colors" />
            <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-background rounded-full shadow transition-transform peer-checked:translate-x-5" />
          </div>
          <span className="text-sm text-foreground">{t('form_featured')}</span>
        </label>
      </div>

      {/* ─── Properties ─── */}
      <div className="bg-card p-4 md:p-6 rounded-2xl border border-border flex flex-col gap-4 md:gap-5">
        <h3 className="font-sans font-semibold tracking-tight text-lg md:text-xl text-foreground">Properties</h3>

        <TagInput
          label="Sizes"
          tags={sizes}
          onChange={setSizes}
          placeholder="Type size and press Enter (e.g. S, M, L)"
        />

        <TagInput
          label="Colors"
          tags={colors}
          onChange={setColors}
          placeholder="Type color and press Enter (e.g. Red, Gold)"
        />

        <BengalInput
          label="Fabric"
          {...register('fabric')}
          placeholder="e.g. Pure Silk"
          error={errors.fabric?.message}
        />

        <BengalInput
          label="Weight"
          {...register('weight')}
          placeholder="e.g. 450g"
          error={errors.weight?.message}
        />

        <BengalInput
          label="Care Instructions"
          {...register('care_instructions')}
          placeholder="e.g. Dry clean only"
          error={errors.care_instructions?.message}
        />

        <BengalInput
          label="Origin"
          {...register('origin')}
          placeholder="e.g. Murshidabad, West Bengal"
          error={errors.origin?.message}
        />

        <BengalInput
          label="SKU"
          {...register('sku')}
          placeholder="e.g. WMN-DJ-001"
          error={errors.sku?.message}
        />

        <FormSelect 
          label="Stock Status" 
          value={watch('stock_status')}
          onValueChange={(v) => setValue('stock_status', v as any)}
          error={errors.stock_status?.message}
        >
          {STOCK_STATUSES.map((v) => (
            <option key={v} value={v}>{STOCK_STATUS_LABELS[v]}</option>
          ))}
        </FormSelect>

        <BengalInput
          label="Delivery Info"
          {...register('delivery_info')}
          placeholder="e.g. Ships in 3-5 business days"
          error={errors.delivery_info?.message}
        />
      </div>

      {/* ─── Submit ─── */}
      <div className="sticky bottom-[calc(3.5rem+env(safe-area-inset-bottom)+1rem)] md:bottom-6 z-40 bg-background/80 backdrop-blur-md p-3 -mx-4 md:mx-0 md:p-0 md:bg-transparent md:backdrop-blur-none border-t border-border/50 md:border-none">
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
