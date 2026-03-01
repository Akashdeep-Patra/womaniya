'use client';

import { useRef, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { CameraUpload }  from './CameraUpload';
import { BengalButton, BengalInput }  from '@/components/bengal';
import { createBanner, updateBanner } from '@/actions/banners';

type ReferenceData = {
  campaigns: { id: number; name_en: string }[];
  collections: { id: number; name_en: string }[];
  categories: { id: number; name_en: string }[];
};

export function BannerForm({ initialData, locale, refs }: { initialData?: any, locale: string, refs: ReferenceData }) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  
  const [imageUrl, setImageUrl] = useState(initialData?.image_url || '');
  const [imageUrlMobile, setImageUrlMobile] = useState(initialData?.image_url_mobile || '');
  const [isPending, startTransition] = useTransition();

  const handleUpload = (url: string) => setImageUrl(url);
  const handleUploadMobile = (url: string) => setImageUrlMobile(url);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (imageUrl) formData.set('image_url', imageUrl);
    if (imageUrlMobile) formData.set('image_url_mobile', imageUrlMobile);

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
        toast.error(err instanceof Error ? err.message : 'Error saving banner');
      }
    });
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-8 pb-12">
      
      {/* ─── Media Section ─── */}
      <div className="bg-bengal-kori/50 p-6 rounded-2xl border border-bengal-kansa/20 flex flex-col gap-6">
        <h3 className="font-editorial text-xl text-bengal-kajal">Media (Desktop & Mobile)</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-[10px] tracking-widest uppercase font-medium text-bengal-kajal/70 font-sans-en block mb-2">
              Desktop Image * (16:9 or similar)
            </label>
            <CameraUpload onUpload={handleUpload} initialUrl={imageUrl} />
            <input type="hidden" name="image_url" value={imageUrl} />
          </div>
          <div>
            <label className="text-[10px] tracking-widest uppercase font-medium text-bengal-kajal/70 font-sans-en block mb-2">
              Mobile Image (Optional, 4:5)
            </label>
            <CameraUpload onUpload={handleUploadMobile} initialUrl={imageUrlMobile} />
            <input type="hidden" name="image_url_mobile" value={imageUrlMobile} />
          </div>
        </div>
      </div>

      {/* ─── Content ─── */}
      <div className="bg-bengal-kori/50 p-6 rounded-2xl border border-bengal-kansa/20 flex flex-col gap-4">
        <h3 className="font-editorial text-xl text-bengal-kajal">Content</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BengalInput label="Title (EN)" name="title_en" defaultValue={initialData?.title_en} />
          <BengalInput label="Title (BN)" name="title_bn" defaultValue={initialData?.title_bn} isBengali />
          
          <BengalInput label="Subtitle (EN)" name="subtitle_en" defaultValue={initialData?.subtitle_en} />
          <BengalInput label="Subtitle (BN)" name="subtitle_bn" defaultValue={initialData?.subtitle_bn} isBengali />
          
          <BengalInput label="CTA Text (EN)" name="cta_text_en" defaultValue={initialData?.cta_text_en} />
          <BengalInput label="CTA Text (BN)" name="cta_text_bn" defaultValue={initialData?.cta_text_bn} isBengali />
        </div>
        
        <BengalInput label="CTA URL" name="cta_url" defaultValue={initialData?.cta_url} placeholder="/shop" />
      </div>

      {/* ─── Placement & Linking ─── */}
      <div className="bg-bengal-kori/50 p-6 rounded-2xl border border-bengal-kansa/20 flex flex-col gap-4">
        <h3 className="font-editorial text-xl text-bengal-kajal">Placement & Settings</h3>
        
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] tracking-widest uppercase font-medium text-bengal-kajal/70 font-sans-en">
            Placement *
          </label>
          <select
            name="placement"
            defaultValue={initialData?.placement || 'hero'}
            required
            className="w-full h-12 px-4 rounded-sm border border-bengal-kansa/30 bg-bengal-cream text-bengal-kajal text-sm font-sans-en focus:outline-none focus:ring-2 focus:ring-bengal-sindoor/30 focus:border-bengal-sindoor transition-colors appearance-none"
          >
            <option value="hero">Hero (Storefront Top)</option>
            <option value="inline">Inline (Middle of page)</option>
            <option value="sidebar">Sidebar</option>
            <option value="category_hero">Category Hero</option>
            <option value="collection_hero">Collection Hero</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] tracking-widest uppercase font-medium text-bengal-kajal/70 font-sans-en">Link to Campaign</label>
            <select name="campaign_id" defaultValue={initialData?.campaign_id || ''} className="w-full h-12 px-4 rounded-sm border border-bengal-kansa/30 bg-bengal-cream text-bengal-kajal text-sm font-sans-en">
              <option value="">None</option>
              {refs.campaigns.map(c => <option key={c.id} value={c.id}>{c.name_en}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] tracking-widest uppercase font-medium text-bengal-kajal/70 font-sans-en">Link to Collection</label>
            <select name="collection_id" defaultValue={initialData?.collection_id || ''} className="w-full h-12 px-4 rounded-sm border border-bengal-kansa/30 bg-bengal-cream text-bengal-kajal text-sm font-sans-en">
              <option value="">None</option>
              {refs.collections.map(c => <option key={c.id} value={c.id}>{c.name_en}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] tracking-widest uppercase font-medium text-bengal-kajal/70 font-sans-en">Link to Category</label>
            <select name="category_id" defaultValue={initialData?.category_id || ''} className="w-full h-12 px-4 rounded-sm border border-bengal-kansa/30 bg-bengal-cream text-bengal-kajal text-sm font-sans-en">
              <option value="">None</option>
              {refs.categories.map(c => <option key={c.id} value={c.id}>{c.name_en}</option>)}
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 mt-2">
          <label className="text-[10px] tracking-widest uppercase font-medium text-bengal-kajal/70 font-sans-en">Status</label>
          <select name="status" defaultValue={initialData?.status || 'draft'} className="w-full h-12 px-4 rounded-sm border border-bengal-kansa/30 bg-bengal-cream text-bengal-kajal text-sm font-sans-en">
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      <div className="sticky bottom-[calc(3.5rem+env(safe-area-inset-bottom)+1rem)] md:bottom-6 z-10">
        <BengalButton
          type="submit"
          variant="primary"
          size="touch"
          loading={isPending}
          className="shadow-2xl"
        >
          {isPending ? 'Saving...' : (initialData ? 'Update Banner' : 'Create Banner')}
        </BengalButton>
      </div>
    </form>
  );
}