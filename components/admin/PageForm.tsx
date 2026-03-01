'use client';

import { useRef, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { CameraUpload }  from './CameraUpload';
import { BengalButton, BengalInput }  from '@/components/bengal';
import { createPage, updatePage } from '@/actions/pages';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SectionComposer, SectionData } from './SectionComposer';

export function PageForm({ initialData, locale }: { initialData?: any, locale: string }) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  
  const [heroImage, setHeroImage] = useState(initialData?.hero_image_url || '');
  const [isPending, startTransition] = useTransition();

  const initialSections: SectionData[] = initialData?.sections?.map((s: any) => ({
    id: s.id.toString(),
    type: s.section_type,
    content: s.content_json,
  })) || [];
  
  const [sections, setSections] = useState<SectionData[]>(initialSections);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (heroImage) formData.set('hero_image_url', heroImage);
    
    const sectionsJson = JSON.stringify(sections.map(s => ({ type: s.type, content: s.content })));

    startTransition(async () => {
      try {
        if (initialData) {
          await updatePage(initialData.id, formData, sectionsJson);
          toast.success('Page updated successfully');
        } else {
          await createPage(formData, sectionsJson);
          toast.success('Page created successfully');
        }
        router.push(`/${locale}/admin/pages`);
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Error saving page');
      }
    });
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-8 pb-12">
      
      {/* ─── Basic Info ─── */}
      <div className="bg-bengal-kori/50 p-6 rounded-2xl border border-bengal-kansa/20">
        <Tabs defaultValue="en" className="w-full">
          <TabsList className="mb-4 bg-bengal-mati">
            <TabsTrigger value="en">English</TabsTrigger>
            <TabsTrigger value="bn" className="font-bengali">বাংলা</TabsTrigger>
          </TabsList>

          <TabsContent value="en" className="flex flex-col gap-4">
            <BengalInput label="Page Title (EN)" name="title_en" defaultValue={initialData?.title_en} required />
            <BengalInput label="SEO Title (EN)" name="seo_title_en" defaultValue={initialData?.seo_title_en} />
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] tracking-widest uppercase font-medium text-bengal-kajal/70 font-sans-en">SEO Description (EN)</label>
              <textarea name="seo_description_en" rows={2} defaultValue={initialData?.seo_description_en} className="w-full px-4 py-2 rounded-sm border border-bengal-kansa/30 bg-bengal-cream text-bengal-kajal text-sm font-sans-en focus:outline-none focus:ring-2 focus:ring-bengal-sindoor/30 focus:border-bengal-sindoor transition-colors resize-none" />
            </div>
          </TabsContent>

          <TabsContent value="bn" className="flex flex-col gap-4">
            <BengalInput label="Page Title (BN)" name="title_bn" defaultValue={initialData?.title_bn} isBengali />
          </TabsContent>
        </Tabs>
      </div>

      {/* ─── Layout & Media ─── */}
      <div className="bg-bengal-kori/50 p-6 rounded-2xl border border-bengal-kansa/20 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] tracking-widest uppercase font-medium text-bengal-kajal/70 font-sans-en">Page Type</label>
            <select name="page_type" defaultValue={initialData?.page_type || 'static'} className="w-full h-12 px-4 rounded-sm border border-bengal-kansa/30 bg-bengal-cream text-bengal-kajal text-sm font-sans-en">
              <option value="static">Static Page</option>
              <option value="story">Story / Editorial</option>
              <option value="landing">Landing Page</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] tracking-widest uppercase font-medium text-bengal-kajal/70 font-sans-en">Status</label>
            <select name="status" defaultValue={initialData?.status || 'draft'} className="w-full h-12 px-4 rounded-sm border border-bengal-kansa/30 bg-bengal-cream text-bengal-kajal text-sm font-sans-en">
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>
        
        <div>
          <label className="text-[10px] tracking-widest uppercase font-medium text-bengal-kajal/70 font-sans-en block mb-2">Featured / Hero Image</label>
          <CameraUpload onUpload={setHeroImage} initialUrl={heroImage} />
        </div>
      </div>

      {/* ─── Section Composer ─── */}
      <div className="bg-bengal-kori/50 p-6 rounded-2xl border border-bengal-kansa/20">
        <h3 className="font-editorial text-xl mb-4 text-bengal-kajal">Page Content Blocks</h3>
        <SectionComposer sections={sections} onChange={setSections} />
      </div>

      <div className="sticky bottom-[calc(3.5rem+env(safe-area-inset-bottom)+1rem)] md:bottom-6 z-10">
        <BengalButton type="submit" variant="primary" size="touch" loading={isPending} className="shadow-2xl">
          {isPending ? 'Saving...' : (initialData ? 'Update Page' : 'Create Page')}
        </BengalButton>
      </div>
    </form>
  );
}