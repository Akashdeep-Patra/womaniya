'use client';

import { useState, useTransition, useMemo } from 'react';
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
    carousel_images?: string[] | null;
    productLinks?: { product: Product }[];
  };
  allProducts: Product[];
};

export function CollectionForm({ initialData, allProducts }: CollectionFormProps) {
  const [images, setImages] = useState<string[]>(
    initialData?.carousel_images ?? []
  );
  const [apiError, setApiError] = useState<string | null>(null);

  const initialProducts = initialData?.productLinks?.map((pl) => pl.product) ?? [];
  const [selectedProducts, setSelectedProducts] = useState<Product[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');

  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit: rhfHandleSubmit,
    formState: { errors },
    reset,
  } = useForm<CollectionFormValues>({
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
    },
  });

  const handleImageUpload = (url: string) => {
    if (url) setImages((prev) => [...prev, url]);
  };

  const handleImageUploadMultiple = (urls: string[]) => {
    setImages((prev) => [...prev, ...urls]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

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
    images.forEach((img) => formData.append('carousel_images', img));

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
          });
          setImages([]);
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
    `flex min-h-[80px] w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none ${
      fieldError ? 'border-destructive ring-2 ring-destructive/20' : 'border-input'
    }`;

  const inputClassNameShort = (fieldError?: string) =>
    `flex min-h-[60px] w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none ${
      fieldError ? 'border-destructive ring-2 ring-destructive/20' : 'border-input'
    }`;

  return (
    <form onSubmit={rhfHandleSubmit(onSubmit)} className="flex flex-col gap-5 md:gap-8 pb-12">
      {apiError && (
        <div
          role="alert"
          className="rounded-xl border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          {apiError}
        </div>
      )}

      {/* ─── Images ─── */}
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
                <span className="absolute top-1 left-1 text-[8px] tracking-wider uppercase bg-primary text-primary-foreground px-1.5 py-0.5 rounded-sm font-sans-en">
                  Cover
                </span>
              )}
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute -top-0.5 -right-0.5 w-8 h-8 bg-foreground/80 text-background rounded-full flex items-center justify-center md:opacity-0 md:group-hover:opacity-100 transition-opacity touch-manipulation"
              >
                <X size={14} />
              </button>
              <div className="absolute bottom-0.5 left-0.5 w-7 h-7 bg-foreground/50 text-background rounded flex items-center justify-center md:opacity-0 md:group-hover:opacity-100 transition-opacity cursor-grab touch-manipulation">
                <GripVertical size={14} />
              </div>
            </Reorder.Item>
          ))}
          <div className="w-28 h-20 shrink-0">
            <CameraUpload
              onUpload={handleImageUpload}
              onUploadMultiple={handleImageUploadMultiple}
              compact
              multiple
            />
          </div>
        </Reorder.Group>
      </div>

      {/* ─── Basic Info (Bilingual) ─── */}
      <div className="bg-card p-4 md:p-6 rounded-2xl border border-border">
        <Tabs defaultValue="en" className="w-full">
          <TabsList className="mb-4 bg-muted">
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
      <div className="bg-card p-4 md:p-6 rounded-2xl border border-border flex flex-col gap-4 md:gap-5">
        <h3 className="font-sans font-semibold tracking-tight text-lg md:text-xl text-foreground">Products</h3>

        <div className="relative">
          <div className="relative flex items-center">
            <Search className="absolute left-3 text-muted-foreground" size={16} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products to add..."
              className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-4 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>

          {searchQuery && (
            <div className="absolute top-full left-0 w-full mt-2 bg-background rounded-lg shadow-xl border border-border z-20 max-h-[300px] overflow-y-auto">
              {availableProducts.length === 0 ? (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  No matching products found
                </div>
              ) : (
                availableProducts.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => addProduct(p)}
                    className="w-full text-left flex items-center gap-3 p-3 hover:bg-muted transition-colors border-b border-border last:border-0"
                  >
                    <div className="relative w-10 h-10 rounded overflow-hidden shrink-0">
                      <Image src={p.image_url} alt={p.name_en} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{p.name_en}</p>
                      <p className="text-[10px] text-muted-foreground">₹{p.price}</p>
                    </div>
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        <div className="mt-4">
          <label className="text-[10px] tracking-widest uppercase font-medium text-muted-foreground font-sans-en block mb-3">
            Selected Products ({selectedProducts.length})
          </label>
          {selectedProducts.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6 border border-dashed border-border rounded-lg">
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
                  className="flex items-center gap-3 p-2 bg-card rounded-lg border border-border group cursor-grab active:cursor-grabbing shadow-sm"
                >
                  <GripVertical size={16} className="text-muted-foreground ml-2" />
                  <div className="relative w-10 h-10 rounded overflow-hidden shrink-0">
                    <Image src={p.image_url} alt={p.name_en} fill className="object-cover" />
                  </div>
                  <p className="text-sm font-medium text-foreground truncate flex-1">{p.name_en}</p>
                  <button
                    type="button"
                    onClick={() => removeProduct(p.id)}
                    className="min-w-[44px] min-h-[44px] flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors touch-manipulation"
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
      <div className="bg-card p-4 md:p-6 rounded-2xl border border-border flex flex-col gap-4 md:gap-5">
        <h3 className="font-sans font-semibold tracking-tight text-lg md:text-xl text-foreground">Settings</h3>

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
            <div className="w-11 h-6 bg-muted rounded-full border border-border peer-checked:bg-primary transition-colors" />
            <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-background rounded-full shadow transition-transform peer-checked:translate-x-5" />
          </div>
          <span className="text-sm text-foreground">Featured Collection</span>
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
