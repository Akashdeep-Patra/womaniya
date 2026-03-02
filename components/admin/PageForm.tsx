'use client';

import { useState, useTransition, useEffect } from 'react';
import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { CameraUpload } from './CameraUpload';
import { BengalButton, BengalInput } from '@/components/bengal';
import { FormTextarea, FormSelect } from './FormField';
import { createPage, updatePage } from '@/actions/pages';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SectionComposer, SectionData } from './SectionComposer';

const pageFormSchema = z.object({
  title_en: z.string().min(2, 'Title must be at least 2 characters').max(120),
  title_bn: z.string().max(120).optional().or(z.literal('')),
  seo_title_en: z.string().max(120).optional().or(z.literal('')),
  seo_description_en: z.string().max(300).optional().or(z.literal('')),
  page_type: z.enum(['static', 'story', 'landing']).default('static'),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  hero_image_url: z.string().optional().or(z.literal('')),
});

type PageFormValues = z.infer<typeof pageFormSchema>;

type PageFormProps = {
  initialData?: {
    id: number;
    title_en?: string | null;
    title_bn?: string | null;
    seo_title_en?: string | null;
    seo_description_en?: string | null;
    page_type?: string | null;
    status?: string | null;
    hero_image_url?: string | null;
    sections?: { id: number; section_type: string; content_json: unknown }[];
  };
  locale: string;
};

export function PageForm({ initialData, locale }: PageFormProps) {
  const router = useRouter();
  const [heroImage, setHeroImage] = useState(initialData?.hero_image_url || '');
  const [apiError, setApiError] = useState<string | null>(null);

  const initialSections: SectionData[] =
    initialData?.sections?.map((s) => ({
      id: s.id.toString(),
      type: s.section_type as SectionData['type'],
      content: s.content_json,
    })) ?? [];
  const [sections, setSections] = useState<SectionData[]>(initialSections);

  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit: rhfHandleSubmit,
    formState: { errors },
    setValue,
  } = useForm<PageFormValues>({
    resolver: zodResolver(pageFormSchema) as Resolver<PageFormValues>,
    defaultValues: {
      title_en: initialData?.title_en ?? '',
      title_bn: initialData?.title_bn ?? '',
      seo_title_en: initialData?.seo_title_en ?? '',
      seo_description_en: initialData?.seo_description_en ?? '',
      page_type: (initialData?.page_type as PageFormValues['page_type']) ?? 'static',
      status: (initialData?.status as PageFormValues['status']) ?? 'draft',
      hero_image_url: initialData?.hero_image_url ?? '',
    },
  });

  useEffect(() => {
    setValue('hero_image_url', heroImage);
  }, [heroImage, setValue]);

  const onSubmit = (data: PageFormValues) => {
    setApiError(null);
    const formData = new FormData();
    formData.set('title_en', data.title_en);
    if (data.title_bn) formData.set('title_bn', data.title_bn);
    if (data.seo_title_en) formData.set('seo_title_en', data.seo_title_en);
    if (data.seo_description_en) formData.set('seo_description_en', data.seo_description_en);
    formData.set('page_type', data.page_type);
    formData.set('status', data.status);
    formData.set('hero_image_url', heroImage);

    const sectionsJson = JSON.stringify(
      sections.map((s) => ({ type: s.type, content: s.content }))
    );

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
        const message = err instanceof Error ? err.message : 'Error saving page';
        setApiError(message);
        toast.error(message);
      }
    });
  };

  const inputClassName = (fieldError?: string) =>
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

      {/* ─── Basic Info ─── */}
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
              label="Page Title (EN)"
              {...register('title_en')}
              error={errors.title_en?.message}
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
              className={inputClassName(errors.seo_description_en?.message)}
            />
          </TabsContent>

          <TabsContent value="bn" className="flex flex-col gap-4">
            <BengalInput
              label="Page Title (BN)"
              {...register('title_bn')}
              isBengali
              error={errors.title_bn?.message}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* ─── Layout & Media ─── */}
      <div className="bg-bengal-kori/50 p-6 rounded-2xl border border-bengal-kansa/20 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-4">
          <FormSelect label="Page Type" {...register('page_type')}>
            <option value="static">Static Page</option>
            <option value="story">Story / Editorial</option>
            <option value="landing">Landing Page</option>
          </FormSelect>
          <FormSelect label="Status" {...register('status')}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </FormSelect>
        </div>

        <div>
          <label className="text-[10px] tracking-widest uppercase font-medium text-bengal-kajal/70 font-sans-en block mb-2">
            Featured / Hero Image
          </label>
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
          {isPending ? 'Saving...' : initialData ? 'Update Page' : 'Create Page'}
        </BengalButton>
      </div>
    </form>
  );
}
