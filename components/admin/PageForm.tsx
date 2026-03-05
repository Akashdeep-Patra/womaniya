'use client';

import { useState, useTransition } from 'react';
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
import { X, GripVertical } from 'lucide-react';
import { Reorder } from 'framer-motion';
import { PAGE_STATUSES, PAGE_TYPES, STATUS_LABELS, PAGE_TYPE_LABELS } from '@/db/enums';

const pageFormSchema = z.object({
  title_en: z.string().min(2, 'Title must be at least 2 characters').max(120),
  title_bn: z.string().max(120).optional().or(z.literal('')),
  seo_title_en: z.string().max(120).optional().or(z.literal('')),
  seo_description_en: z.string().max(300).optional().or(z.literal('')),
  page_type: z.enum([...PAGE_TYPES]).default('static'),
  status: z.enum([...PAGE_STATUSES]).default('draft'),
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
    images?: string[] | null;
    hero_image_url?: string | null;
    sections?: { id: number; section_type: string; content_json: unknown }[];
  };
  locale: string;
  basePath?: string;
  defaultPageType?: 'static' | 'story' | 'landing';
};

function resolveInitialImages(data?: PageFormProps['initialData']): string[] {
  if (!data) return [];
  const fromArray = (data.images as string[] | null) ?? [];
  if (fromArray.length > 0) return fromArray;
  if (data.hero_image_url) return [data.hero_image_url];
  return [];
}

export function PageForm({ initialData, locale, basePath = 'pages', defaultPageType = 'static' }: PageFormProps) {
  const router = useRouter();
  const [images, setImages] = useState<string[]>(resolveInitialImages(initialData));
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
    watch,
    setValue,
  } = useForm<PageFormValues>({
    resolver: zodResolver(pageFormSchema) as Resolver<PageFormValues>,
    defaultValues: {
      title_en: initialData?.title_en ?? '',
      title_bn: initialData?.title_bn ?? '',
      seo_title_en: initialData?.seo_title_en ?? '',
      seo_description_en: initialData?.seo_description_en ?? '',
      page_type: (initialData?.page_type as PageFormValues['page_type']) ?? defaultPageType,
      status: (initialData?.status as PageFormValues['status']) ?? 'draft',
    },
  });

  const onSubmit = (data: PageFormValues) => {
    setApiError(null);
    const formData = new FormData();
    formData.set('title_en', data.title_en);
    if (data.title_bn) formData.set('title_bn', data.title_bn);
    if (data.seo_title_en) formData.set('seo_title_en', data.seo_title_en);
    if (data.seo_description_en) formData.set('seo_description_en', data.seo_description_en);
    formData.set('page_type', data.page_type);
    formData.set('status', data.status);
    images.forEach((img) => formData.append('images', img));

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
        router.push(`/${locale}/admin/${basePath}`);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Error saving page';
        setApiError(message);
        toast.error(message);
      }
    });
  };

  const inputClassName = (fieldError?: string) =>
    `flex min-h-[60px] w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none ${
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

      {/* ─── Basic Info ─── */}
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

      {/* ─── Layout, Media & Settings ─── */}
      <div className="bg-card p-4 md:p-6 rounded-2xl border border-border flex flex-col gap-4 md:gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormSelect 
            label="Page Type" 
            value={watch('page_type')}
            onValueChange={(v) => setValue('page_type', v as any)}
          >
            {PAGE_TYPES.map((v) => (
              <option key={v} value={v}>{PAGE_TYPE_LABELS[v]}</option>
            ))}
          </FormSelect>
          <FormSelect 
            label="Status" 
            value={watch('status')}
            onValueChange={(v) => setValue('status', v as any)}
          >
            {PAGE_STATUSES.map((v) => (
              <option key={v} value={v}>{STATUS_LABELS[v]}</option>
            ))}
          </FormSelect>
        </div>

        <div>
          <h4 className="font-sans font-semibold tracking-tight text-base mb-1 text-foreground">Images</h4>
          <p className="text-muted-foreground text-xs mb-3">
            First image is the hero/cover. Add more for a carousel.
          </p>
          <Reorder.Group
            axis="x"
            values={images}
            onReorder={setImages}
            className="flex gap-3 overflow-x-auto pb-4"
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
                  onClick={() => setImages((prev) => prev.filter((_, idx) => idx !== i))}
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
                onUpload={(url) => { if (url) setImages((prev) => [...prev, url]); }}
                onUploadMultiple={(urls) => setImages((prev) => [...prev, ...urls])}
                compact
                multiple
              />
            </div>
          </Reorder.Group>
        </div>
      </div>

      {/* ─── Section Composer ─── */}
      <div className="bg-card p-4 md:p-6 rounded-2xl border border-border">
        <h3 className="font-sans font-semibold tracking-tight text-lg md:text-xl mb-3 md:mb-4 text-foreground">Page Content Blocks</h3>
        <SectionComposer sections={sections} onChange={setSections} />
      </div>

      <div className="sticky bottom-[calc(3.5rem+env(safe-area-inset-bottom)+1rem)] md:bottom-6 z-40 bg-background/80 backdrop-blur-md p-3 -mx-4 md:mx-0 md:p-0 md:bg-transparent md:backdrop-blur-none border-t border-border/50 md:border-none">
        <BengalButton type="submit" variant="primary" size="touch" loading={isPending} className="shadow-2xl">
          {isPending ? 'Saving...' : initialData ? 'Update Page' : 'Create Page'}
        </BengalButton>
      </div>
    </form>
  );
}
