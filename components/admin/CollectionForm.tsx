'use client';

import { useState, useTransition, useMemo, useEffect } from 'react';
import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { CameraUpload } from './CameraUpload';
import { BengalButton, BengalInput } from '@/components/bengal';
import { FormTextarea, FormSelect } from './FormField';
import { createCollection, updateCollection } from '@/actions/collections';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, X, GripVertical } from 'lucide-react';
import { Reorder } from 'framer-motion';
import type { Product } from '@/db/schema';
import Image from 'next/image';

const collectionFormSchema = z.object({
  name_en: z.string().min(2, 'Name must be at least 2 characters').max(120),
  name_bn: z.string().max(120).optional().or(z.literal('')),
  description_en: z.string().max(2000).optional().or(z.literal('')),
  description_bn: z.string().max(2000).optional().or(z.literal('')),
  seo_title_en: z.string().max(120).optional().or(z.literal('')),
  seo_description_en: z.string().max(300).optional().or(z.literal('')),
  status: z.enum(['draft', 'scheduled', 'live', 'ended', 'archived']).default('draft'),
  is_featured: z
    .union([z.boolean(), z.literal('on')])
    .optional()
    .transform((v) => v === true || v === 'on')
    .default(false),
  hero_image_url: z.string().url().optional().or(z.literal('')),
});

type CollectionFormValues = z.infer<typeof collectionFormSchema>;

type CollectionFormProps = {
  initialData?: {
    id: number;
    name_en?: string | null;
    name_bn?: string | null;
    description_en?: string | null;
    description_bn?: string | null;
    seo_title_en?: string | null;
    seo_description_en?: string | null;
    status?: string | null;
    is_featured?: boolean | null;
    hero_image_url?: string | null;
    productLinks?: { product: Product }[];
  };
  allProducts: Product[];
};

export function CollectionForm({ initialData, allProducts }: CollectionFormProps) {
  const [heroImage, setHeroImage] = useState(initialData?.hero_image_url || '');
  const [apiError, setApiError] = useState<string | null>(null);

  const initialProducts = initialData?.productLinks?.map((pl) => pl.product) ?? [];
  const [selectedProducts, setSelectedProducts] = useState<Product[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');

  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit: rhfHandleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<CollectionFormValues>({
    // @ts-expect-error - Zod v4 and @hookform/resolvers have type compatibility issues
    resolver: zodResolver(collectionFormSchema) as Resolver<CollectionFormValues>,
    defaultValues: {
      name_en: initialData?.name_en ?? '',
      name_bn: initialData?.name_bn ?? '',
      description_en: initialData?.description_en ?? '',
      description_bn: initialData?.description_bn ?? '',
      seo_title_en: initialData?.seo_title_en ?? '',
      seo_description_en: initialData?.seo_description_en ?? '',
      status: (initialData?.status as CollectionFormValues['status']) ?? 'draft',
      is_featured: initialData?.is_featured ?? false,
      hero_image_url: initialData?.hero_image_url ?? '',
    },
  });

  useEffect(() => {
    setValue('hero_image_url', heroImage);
  }, [heroImage, setValue]);

  const handleHeroUpload = (url: string) => setHeroImage(url);

  const availableProducts = useMemo(() => {
    return allProducts
      .filter(
        (p) =>
          !selectedProducts.find((sp) => sp.id === p.id) &&
          p.name_en.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .slice(0, 5);
  }, [allProducts, selectedProducts, searchQuery]);

  const addProduct = (product: Product) => {
    setSelectedProducts((prev) => [...prev, product]);
    setSearchQuery('');
  };

  const removeProduct = (productId: number) => {
    setSelectedProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const onSubmit = (data: CollectionFormValues) => {
    setApiError(null);
    const formData = new FormData();
    formData.set('name_en', data.name_en);
    if (data.name_bn) formData.set('name_bn', data.name_bn);
    if (data.description_en) formData.set('description_en', data.description_en);
    if (data.description_bn) formData.set('description_bn', data.description_bn);
    if (data.seo_title_en) formData.set('seo_title_en', data.seo_title_en);
    if (data.seo_description_en) formData.set('seo_description_en', data.seo_description_en);
    formData.set('status', data.status);
    formData.set('is_featured', data.is_featured ? 'on' : '');
    formData.set('hero_image_url', heroImage);

    selectedProducts.forEach((p) => formData.append('product_ids', p.id.toString()));

    startTransition(async () => {
      try {
        if (initialData) {
          await updateCollection(initialData.id, formData);
          toast.success('Collection updated successfully');
        } else {
          await createCollection(formData);
          toast.success('Collection created successfully');
          reset({
            name_en: '',
            name_bn: '',
            description_en: '',
            description_bn: '',
            seo_title_en: '',
            seo_description_en: '',
            status: 'draft',
            is_featured: false,
            hero_image_url: '',
          });
          setHeroImage('');
          setSelectedProducts([]);
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Error saving collection';
        setApiError(message);
        toast.error(message);
      }
    });
  };

  const inputClassName = (fieldError?: string) =>
    `w-full px-4 py-3 rounded-sm border bg-bengal-cream text-bengal-kajal text-sm font-sans-en focus:outline-none focus:ring-2 focus:ring-bengal-sindoor/30 focus:border-bengal-sindoor transition-colors resize-none ${
      fieldError ? 'border-bengal-alta ring-2 ring-bengal-alta/20' : 'border-bengal-kansa/30'
    }`;

  const inputClassNameShort = (fieldError?: string) =>
    `w-full px-4 py-2 rounded-sm border bg-bengal-cream text-bengal-kajal text-sm font-sans-en focus:outline-none focus:ring-2 focus:ring-bengal-sindoor/30 focus:border-bengal-sindoor transition-colors resize-none ${
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
        <h3 className="font-editorial text-xl mb-4 text-bengal-kajal">Hero Image</h3>
        <CameraUpload onUpload={handleHeroUpload} initialUrl={heroImage} />
        {errors.hero_image_url && (
          <p className="text-bengal-alta text-xs font-medium mt-1">
            {errors.hero_image_url.message}
          </p>
        )}
      </div>

      {/* ─── Basic Info (Bilingual) ─── */}
      <div className="bg-bengal-kori/50 p-6 rounded-2xl border border-bengal-kansa/20">
        <Tabs defaultValue="en" className="w-full">
          <TabsList className="mb-4 bg-bengal-mati">
            <TabsTrigger value="en">English</TabsTrigger>
            <TabsTrigger value="bn" className="font-bengali">
              বাংলা
            </TabsTrigger>
          </TabsList>

          <TabsContent value="en" className="flex flex-col gap-4">
            <BengalInput
              label="Collection Name (EN)"
              {...register('name_en')}
              placeholder="e.g. Durga Puja 2024"
              error={errors.name_en?.message}
            />
            <FormTextarea
              label="Description (EN)"
              {...register('description_en')}
              rows={4}
              error={errors.description_en?.message}
              className={inputClassName(errors.description_en?.message)}
            />
            <BengalInput
              label="SEO Title (EN)"
              {...register('seo_title_en')}
              error={errors.seo_title_en?.message}
            />
            <FormTextarea
              label="SEO Description (EN)"
              {...register('seo_description_en')}
              rows={2}
              error={errors.seo_description_en?.message}
              className={inputClassNameShort(errors.seo_description_en?.message)}
            />
          </TabsContent>

          <TabsContent value="bn" className="flex flex-col gap-4">
            <BengalInput
              label="Collection Name (BN)"
              {...register('name_bn')}
              placeholder="যেমন: দুর্গাপূজা ২০২৪"
              isBengali
              error={errors.name_bn?.message}
            />
            <FormTextarea
              label="Description (BN)"
              {...register('description_bn')}
              rows={4}
              error={errors.description_bn?.message}
              isBengali
              className={inputClassName(errors.description_bn?.message)}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* ─── Product Assignment ─── */}
      <div className="bg-bengal-kori/50 p-6 rounded-2xl border border-bengal-kansa/20 flex flex-col gap-5">
        <h3 className="font-editorial text-xl text-bengal-kajal">Products</h3>

        <div className="relative">
          <div className="relative flex items-center">
            <Search className="absolute left-3 text-bengal-kajal/40" size={16} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products to add..."
              className="w-full h-10 pl-10 pr-4 rounded-full border border-bengal-kansa/30 bg-bengal-cream text-bengal-kajal text-sm font-sans-en focus:outline-none focus:ring-2 focus:ring-bengal-sindoor/30 focus:border-bengal-sindoor transition-colors"
            />
          </div>

          {searchQuery && (
            <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-lg shadow-xl border border-bengal-kansa/20 z-20 max-h-[300px] overflow-y-auto">
              {availableProducts.length === 0 ? (
                <div className="p-4 text-center text-sm text-bengal-kajal/40">
                  No matching products found
                </div>
              ) : (
                availableProducts.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => addProduct(p)}
                    className="w-full text-left flex items-center gap-3 p-3 hover:bg-bengal-mati transition-colors border-b border-bengal-kansa/10 last:border-0"
                  >
                    <div className="relative w-10 h-10 rounded overflow-hidden flex-shrink-0">
                      <Image src={p.image_url} alt={p.name_en} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-bengal-kajal truncate">{p.name_en}</p>
                      <p className="text-[10px] text-bengal-kajal/50">₹{p.price}</p>
                    </div>
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        <div className="mt-4">
          <label className="text-[10px] tracking-widest uppercase font-medium text-bengal-kajal/70 font-sans-en block mb-3">
            Selected Products ({selectedProducts.length})
          </label>
          {selectedProducts.length === 0 ? (
            <p className="text-sm text-bengal-kajal/40 text-center py-6 border border-dashed border-bengal-kansa/30 rounded-lg">
              No products added yet
            </p>
          ) : (
            <Reorder.Group
              axis="y"
              values={selectedProducts}
              onReorder={setSelectedProducts}
              className="flex flex-col gap-2"
            >
              {selectedProducts.map((p) => (
                <Reorder.Item
                  key={p.id}
                  value={p}
                  className="flex items-center gap-3 p-2 bg-white rounded-lg border border-bengal-kansa/20 group cursor-grab active:cursor-grabbing shadow-sm"
                >
                  <GripVertical size={16} className="text-bengal-kajal/20 ml-2" />
                  <div className="relative w-10 h-10 rounded overflow-hidden flex-shrink-0">
                    <Image src={p.image_url} alt={p.name_en} fill className="object-cover" />
                  </div>
                  <p className="text-sm font-medium text-bengal-kajal truncate flex-1">{p.name_en}</p>
                  <button
                    type="button"
                    onClick={() => removeProduct(p.id)}
                    className="p-2 text-bengal-kajal/30 hover:text-bengal-alta transition-colors"
                  >
                    <X size={16} />
                  </button>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          )}
        </div>
      </div>

      {/* ─── Organization ─── */}
      <div className="bg-bengal-kori/50 p-6 rounded-2xl border border-bengal-kansa/20 flex flex-col gap-5">
        <h3 className="font-editorial text-xl text-bengal-kajal">Settings</h3>

        <FormSelect label="Status" {...register('status')}>
          <option value="draft">Draft</option>
          <option value="scheduled">Scheduled</option>
          <option value="live">Live</option>
          <option value="ended">Ended</option>
          <option value="archived">Archived</option>
        </FormSelect>

        <label className="flex items-center gap-3 cursor-pointer min-h-[44px]">
          <div className="relative">
            <input type="checkbox" {...register('is_featured')} className="sr-only peer" />
            <div className="w-11 h-6 bg-bengal-mati rounded-full border border-bengal-kansa/30 peer-checked:bg-bengal-sindoor transition-colors" />
            <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5" />
          </div>
          <span className="text-sm text-bengal-kajal">Featured Collection</span>
        </label>
      </div>

      <div className="sticky bottom-[calc(3.5rem+env(safe-area-inset-bottom)+1rem)] md:bottom-6 z-10">
        <BengalButton
          type="submit"
          variant="primary"
          size="touch"
          loading={isPending}
          className="shadow-2xl"
        >
          {isPending ? 'Saving...' : initialData ? 'Update Collection' : 'Create Collection'}
        </BengalButton>
      </div>
    </form>
  );
}
