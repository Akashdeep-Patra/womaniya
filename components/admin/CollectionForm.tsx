'use client';

import { useRef, useState, useTransition, useMemo } from 'react';
import { toast } from 'sonner';
import { CameraUpload }  from './CameraUpload';
import { BengalButton, BengalInput }  from '@/components/bengal';
import { createCollection, updateCollection } from '@/actions/collections';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, X, GripVertical } from 'lucide-react';
import { Reorder } from 'framer-motion';
import type { Product } from '@/db/schema';
import Image from 'next/image';

type CollectionFormProps = {
  initialData?: any;
  allProducts: Product[];
};

export function CollectionForm({ initialData, allProducts }: CollectionFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  
  const [heroImage, setHeroImage] = useState(initialData?.hero_image_url || '');
  const [isPending, startTransition] = useTransition();

  const initialProducts = initialData?.productLinks?.map((pl: any) => pl.product) || [];
  const [selectedProducts, setSelectedProducts] = useState<Product[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');

  const handleHeroUpload = (url: string) => setHeroImage(url);

  const availableProducts = useMemo(() => {
    return allProducts.filter(
      p => !selectedProducts.find(sp => sp.id === p.id) && 
           p.name_en.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5); // show top 5 results
  }, [allProducts, selectedProducts, searchQuery]);

  const addProduct = (product: Product) => {
    setSelectedProducts(prev => [...prev, product]);
    setSearchQuery('');
  };

  const removeProduct = (productId: number) => {
    setSelectedProducts(prev => prev.filter(p => p.id !== productId));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (heroImage) formData.set('hero_image_url', heroImage);
    
    // Add product IDs
    formData.delete('product_ids');
    selectedProducts.forEach(p => {
      formData.append('product_ids', p.id.toString());
    });

    startTransition(async () => {
      try {
        if (initialData) {
          await updateCollection(initialData.id, formData);
          toast.success('Collection updated successfully');
        } else {
          await createCollection(formData);
          toast.success('Collection created successfully');
          formRef.current?.reset();
          setHeroImage('');
          setSelectedProducts([]);
        }
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Error saving collection');
      }
    });
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-8 pb-12">
      
      {/* ─── Media Section ─── */}
      <div className="bg-bengal-kori/50 p-6 rounded-2xl border border-bengal-kansa/20">
        <h3 className="font-editorial text-xl mb-4 text-bengal-kajal">Hero Image</h3>
        <CameraUpload onUpload={handleHeroUpload} initialUrl={heroImage} />
        <input type="hidden" name="hero_image_url" value={heroImage} />
      </div>

      {/* ─── Basic Info (Bilingual) ─── */}
      <div className="bg-bengal-kori/50 p-6 rounded-2xl border border-bengal-kansa/20">
        <Tabs defaultValue="en" className="w-full">
          <TabsList className="mb-4 bg-bengal-mati">
            <TabsTrigger value="en">English</TabsTrigger>
            <TabsTrigger value="bn" className="font-bengali">বাংলা</TabsTrigger>
          </TabsList>

          <TabsContent value="en" className="flex flex-col gap-4">
            <BengalInput
              label="Collection Name (EN)"
              name="name_en"
              defaultValue={initialData?.name_en}
              placeholder="e.g. Durga Puja 2024"
              required
            />
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] tracking-widest uppercase font-medium text-bengal-kajal/70 font-sans-en">
                Description (EN)
              </label>
              <textarea
                name="description_en"
                rows={4}
                defaultValue={initialData?.description_en}
                className="w-full px-4 py-3 rounded-sm border border-bengal-kansa/30 bg-bengal-cream text-bengal-kajal text-sm font-sans-en focus:outline-none focus:ring-2 focus:ring-bengal-sindoor/30 focus:border-bengal-sindoor transition-colors resize-none"
              />
            </div>
            <BengalInput label="SEO Title (EN)" name="seo_title_en" defaultValue={initialData?.seo_title_en} />
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] tracking-widest uppercase font-medium text-bengal-kajal/70 font-sans-en">SEO Description (EN)</label>
              <textarea name="seo_description_en" rows={2} defaultValue={initialData?.seo_description_en} className="w-full px-4 py-2 rounded-sm border border-bengal-kansa/30 bg-bengal-cream text-bengal-kajal text-sm font-sans-en focus:outline-none focus:ring-2 focus:ring-bengal-sindoor/30 focus:border-bengal-sindoor transition-colors resize-none" />
            </div>
          </TabsContent>

          <TabsContent value="bn" className="flex flex-col gap-4">
            <BengalInput
              label="Collection Name (BN)"
              name="name_bn"
              defaultValue={initialData?.name_bn}
              placeholder="যেমন: দুর্গাপূজা ২০২৪"
              isBengali
            />
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] tracking-widest uppercase font-medium text-bengal-kajal/70 font-sans-en">
                Description (BN)
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

      {/* ─── Product Assignment ─── */}
      <div className="bg-bengal-kori/50 p-6 rounded-2xl border border-bengal-kansa/20 flex flex-col gap-5">
        <h3 className="font-editorial text-xl text-bengal-kajal">Products</h3>
        
        {/* Search & Add */}
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
                <div className="p-4 text-center text-sm text-bengal-kajal/40">No matching products found</div>
              ) : (
                availableProducts.map(p => (
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

        {/* Selected Products List */}
        <div className="mt-4">
          <label className="text-[10px] tracking-widest uppercase font-medium text-bengal-kajal/70 font-sans-en block mb-3">
            Selected Products ({selectedProducts.length})
          </label>
          {selectedProducts.length === 0 ? (
            <p className="text-sm text-bengal-kajal/40 text-center py-6 border border-dashed border-bengal-kansa/30 rounded-lg">No products added yet</p>
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
        
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] tracking-widest uppercase font-medium text-bengal-kajal/70 font-sans-en">
            Status
          </label>
          <select
            name="status"
            defaultValue={initialData?.status || 'draft'}
            className="w-full h-12 px-4 rounded-sm border border-bengal-kansa/30 bg-bengal-cream text-bengal-kajal text-sm font-sans-en focus:outline-none focus:ring-2 focus:ring-bengal-sindoor/30 focus:border-bengal-sindoor transition-colors appearance-none"
          >
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
            <option value="live">Live</option>
            <option value="ended">Ended</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <label className="flex items-center gap-3 cursor-pointer min-h-[44px]">
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
          <span className="text-sm text-bengal-kajal">Featured Collection</span>
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
          {isPending ? 'Saving...' : (initialData ? 'Update Collection' : 'Create Collection')}
        </BengalButton>
      </div>
    </form>
  );
}
