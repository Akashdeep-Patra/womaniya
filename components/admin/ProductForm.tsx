'use client';

import { useRef, useState, useTransition } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { CameraUpload }  from './CameraUpload';
import { BengalButton }  from '@/components/bengal';
import { BengalInput }   from '@/components/bengal';
import { createProduct, updateProduct } from '@/actions/products';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { X, GripVertical } from 'lucide-react';
import { Reorder } from 'framer-motion';

type Category = { id: number; name_en: string };
type Collection = { id: number; name_en: string };

type ProductFormProps = {
  initialData?: any;
  initialImages?: any[];
  categories: Category[];
  collections: Collection[];
};

export function ProductForm({ initialData, initialImages, categories, collections }: ProductFormProps) {
  const t           = useTranslations('admin');
  const formRef     = useRef<HTMLFormElement>(null);
  
  // State for images
  const [primaryImage, setPrimaryImage] = useState(initialData?.image_url || '');
  const [additionalImages, setAdditionalImages] = useState<string[]>(
    initialImages?.map((img) => img.image_url) || []
  );
  
  // State for collections
  const [selectedCollections, setSelectedCollections] = useState<number[]>(
    initialData?.collectionLinks?.map((c: any) => c.collection_id) || []
  );

  const [isPending, startTransition] = useTransition();

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (primaryImage) formData.set('image_uploaded_url', primaryImage);
    
    // Add additional images array
    formData.delete('additional_images');
    additionalImages.forEach(img => {
      formData.append('additional_images', img);
    });

    // Add collections
    formData.delete('collection_ids');
    selectedCollections.forEach(id => {
      formData.append('collection_ids', id.toString());
    });

    startTransition(async () => {
      try {
        if (initialData) {
          await updateProduct(initialData.id, formData);
          toast.success('Updated successfully');
        } else {
          await createProduct(formData);
          toast.success(t('published'));
          formRef.current?.reset();
          setPrimaryImage('');
          setAdditionalImages([]);
          setSelectedCollections([]);
        }
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Error publishing');
      }
    });
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-8 pb-12">
      
      {/* ─── Media Section ─── */}
      <div className="bg-bengal-kori/50 p-6 rounded-2xl border border-bengal-kansa/20">
        <h3 className="font-editorial text-xl mb-4 text-bengal-kajal">Media</h3>
        
        <div className="flex flex-col gap-6">
          <div>
            <label className="text-[10px] tracking-widest uppercase font-medium text-bengal-kajal/70 font-sans-en block mb-2">
              Primary Image *
            </label>
            <CameraUpload onUpload={handlePrimaryUpload} initialUrl={primaryImage} />
            <input type="hidden" name="image_uploaded_url" value={primaryImage} />
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
                <Reorder.Item key={url} value={url} className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-bengal-mati border border-bengal-kansa/30 group">
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
            <TabsTrigger value="bn" className="font-bengali">বাংলা</TabsTrigger>
          </TabsList>

          <TabsContent value="en" className="flex flex-col gap-4">
            <BengalInput
              label={t('form_name')}
              name="name_en"
              defaultValue={initialData?.name_en}
              placeholder="e.g. Crimson Dhakai Jamdani"
              required
            />
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] tracking-widest uppercase font-medium text-bengal-kajal/70 font-sans-en">
                {t('form_description')}
              </label>
              <textarea
                name="description_en"
                rows={4}
                defaultValue={initialData?.description_en}
                placeholder="Handwoven on a traditional loom..."
                className="w-full px-4 py-3 rounded-sm border border-bengal-kansa/30 bg-bengal-cream text-bengal-kajal text-sm font-sans-en focus:outline-none focus:ring-2 focus:ring-bengal-sindoor/30 focus:border-bengal-sindoor transition-colors resize-none"
              />
            </div>
            <BengalInput
              label="SEO Title (EN)"
              name="seo_title_en"
              defaultValue={initialData?.seo_title_en}
              placeholder="Leave empty to auto-generate"
            />
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] tracking-widest uppercase font-medium text-bengal-kajal/70 font-sans-en">
                SEO Description (EN)
              </label>
              <textarea
                name="seo_description_en"
                rows={2}
                defaultValue={initialData?.seo_description_en}
                placeholder="Meta description for search engines..."
                className="w-full px-4 py-2 rounded-sm border border-bengal-kansa/30 bg-bengal-cream text-bengal-kajal text-sm font-sans-en focus:outline-none focus:ring-2 focus:ring-bengal-sindoor/30 focus:border-bengal-sindoor transition-colors resize-none"
              />
            </div>
          </TabsContent>

          <TabsContent value="bn" className="flex flex-col gap-4">
            <BengalInput
              label={t('form_name_bn')}
              name="name_bn"
              defaultValue={initialData?.name_bn}
              placeholder="যেমন: ক্রিমসন ঢাকাই জামদানি"
              isBengali
            />
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] tracking-widest uppercase font-medium text-bengal-kajal/70 font-sans-en">
                Description (Bengali)
              </label>
              <textarea
                name="description_bn"
                rows={4}
                defaultValue={initialData?.description_bn}
                className="w-full px-4 py-3 rounded-sm border border-bengal-kansa/30 bg-bengal-cream text-bengal-kajal text-sm font-bengali focus:outline-none focus:ring-2 focus:ring-bengal-sindoor/30 focus:border-bengal-sindoor transition-colors resize-none"
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* ─── Organization ─── */}
      <div className="bg-bengal-kori/50 p-6 rounded-2xl border border-bengal-kansa/20 flex flex-col gap-5">
        <h3 className="font-editorial text-xl text-bengal-kajal">Organization & Pricing</h3>
        
        <BengalInput
          label={t('form_price')}
          name="price"
          type="number"
          min="0"
          step="0.01"
          defaultValue={initialData?.price}
          placeholder="4500"
          required
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] tracking-widest uppercase font-medium text-bengal-kajal/70 font-sans-en">
            {t('form_category')}
          </label>
          <select
            name="category_id"
            required
            defaultValue={initialData?.category_id || ''}
            className="w-full h-12 px-4 rounded-sm border border-bengal-kansa/30 bg-bengal-cream text-bengal-kajal text-sm font-sans-en focus:outline-none focus:ring-2 focus:ring-bengal-sindoor/30 focus:border-bengal-sindoor transition-colors appearance-none"
          >
            <option value="" disabled>Select category…</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name_en}</option>
            ))}
          </select>
          <input type="hidden" name="category" value={categories.find(c => c.id === initialData?.category_id)?.name_en || categories[0]?.name_en || 'Uncategorized'} />
        </div>

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

        <div className="flex flex-col gap-1.5 mt-2">
          <label className="text-[10px] tracking-widest uppercase font-medium text-bengal-kajal/70 font-sans-en">
            Status
          </label>
          <select
            name="status"
            defaultValue={initialData?.status || 'draft'}
            className="w-full h-12 px-4 rounded-sm border border-bengal-kansa/30 bg-bengal-cream text-bengal-kajal text-sm font-sans-en focus:outline-none focus:ring-2 focus:ring-bengal-sindoor/30 focus:border-bengal-sindoor transition-colors appearance-none"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <label className="flex items-center gap-3 cursor-pointer min-h-[44px] mt-2">
          <div className="relative">
            <input 
              type="checkbox" 
              name="is_featured" 
              className="sr-only peer" 
              defaultChecked={initialData?.is_featured}
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
          {isPending ? t('publishing') : (initialData ? 'Update Product' : t('publish'))}
        </BengalButton>
      </div>
    </form>
  );
}
