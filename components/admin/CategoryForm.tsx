'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ImageUploader } from './ImageUploader';
import { toast } from 'sonner';
import type { Category } from '@/db/schema';

type CategoryFormProps = {
  category?: Category | null;
  locale: string;
  action: (formData: FormData) => Promise<void>;
};

export function CategoryForm({ category, locale, action }: CategoryFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [heroImage, setHeroImage] = useState(category?.hero_image_url ?? '');
  const [activeTab, setActiveTab] = useState<'en' | 'bn'>('en');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set('hero_image_url', heroImage);

    startTransition(async () => {
      try {
        await action(formData);
        toast.success(category ? 'Category updated' : 'Category created');
        router.push(`/${locale}/admin/categories`);
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Something went wrong');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-8">
      {/* Hero Image */}
      <div>
        <label className="block text-[10px] tracking-[0.15em] uppercase text-[#1A1918]/50 font-medium mb-2">
          Hero Image
        </label>
        <ImageUploader
          value={heroImage}
          onChange={setHeroImage}
          onRemove={() => setHeroImage('')}
          aspect="landscape"
          className="max-w-md"
        />
      </div>

      {/* Language Tabs */}
      <div>
        <div className="flex gap-1 mb-4">
          {(['en', 'bn'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={cn(
                'px-4 py-2 text-xs tracking-wider uppercase rounded-md transition-colors',
                activeTab === tab
                  ? 'bg-[#1A1918] text-[#F9F6F0]'
                  : 'text-[#1A1918]/50 hover:bg-[#1A1918]/5',
              )}
            >
              {tab === 'en' ? 'English' : 'বাংলা'}
            </button>
          ))}
        </div>

        {activeTab === 'en' ? (
          <div className="space-y-4">
            <div>
              <label htmlFor="name_en" className="block text-[10px] tracking-[0.15em] uppercase text-[#1A1918]/50 font-medium mb-1.5">
                Name (English) *
              </label>
              <input
                id="name_en"
                name="name_en"
                type="text"
                required
                defaultValue={category?.name_en ?? ''}
                className="w-full px-4 py-2.5 bg-white border border-[#C5A059]/15 rounded-md text-sm focus:ring-1 focus:ring-[#C5A059]/30 outline-none"
              />
            </div>
            <div>
              <label htmlFor="description_en" className="block text-[10px] tracking-[0.15em] uppercase text-[#1A1918]/50 font-medium mb-1.5">
                Description (English)
              </label>
              <textarea
                id="description_en"
                name="description_en"
                rows={4}
                defaultValue={category?.description_en ?? ''}
                className="w-full px-4 py-2.5 bg-white border border-[#C5A059]/15 rounded-md text-sm focus:ring-1 focus:ring-[#C5A059]/30 outline-none resize-none"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label htmlFor="name_bn" className="block text-[10px] tracking-[0.15em] uppercase text-[#1A1918]/50 font-medium mb-1.5 font-bengali">
                নাম (বাংলা)
              </label>
              <input
                id="name_bn"
                name="name_bn"
                type="text"
                defaultValue={category?.name_bn ?? ''}
                className="w-full px-4 py-2.5 bg-white border border-[#C5A059]/15 rounded-md text-sm font-bengali focus:ring-1 focus:ring-[#C5A059]/30 outline-none"
              />
            </div>
            <div>
              <label htmlFor="description_bn" className="block text-[10px] tracking-[0.15em] uppercase text-[#1A1918]/50 font-medium mb-1.5 font-bengali">
                বিবরণ (বাংলা)
              </label>
              <textarea
                id="description_bn"
                name="description_bn"
                rows={4}
                defaultValue={category?.description_bn ?? ''}
                className="w-full px-4 py-2.5 bg-white border border-[#C5A059]/15 rounded-md text-sm font-bengali focus:ring-1 focus:ring-[#C5A059]/30 outline-none resize-none"
              />
            </div>
          </div>
        )}
      </div>

      {/* SEO */}
      <div className="border border-[#C5A059]/10 rounded-lg p-5 space-y-4">
        <h3 className="text-[10px] tracking-[0.15em] uppercase text-[#1A1918]/50 font-medium">SEO</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="seo_title_en" className="block text-[10px] tracking-[0.15em] uppercase text-[#1A1918]/40 mb-1">
              SEO Title (EN)
            </label>
            <input
              id="seo_title_en"
              name="seo_title_en"
              type="text"
              defaultValue={category?.seo_title_en ?? ''}
              className="w-full px-3 py-2 bg-white border border-[#C5A059]/10 rounded-md text-sm focus:ring-1 focus:ring-[#C5A059]/30 outline-none"
            />
          </div>
          <div>
            <label htmlFor="seo_title_bn" className="block text-[10px] tracking-[0.15em] uppercase text-[#1A1918]/40 mb-1">
              SEO Title (BN)
            </label>
            <input
              id="seo_title_bn"
              name="seo_title_bn"
              type="text"
              defaultValue={category?.seo_title_bn ?? ''}
              className="w-full px-3 py-2 bg-white border border-[#C5A059]/10 rounded-md text-sm font-bengali focus:ring-1 focus:ring-[#C5A059]/30 outline-none"
            />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="seo_description_en" className="block text-[10px] tracking-[0.15em] uppercase text-[#1A1918]/40 mb-1">
              SEO Description (EN)
            </label>
            <textarea
              id="seo_description_en"
              name="seo_description_en"
              rows={2}
              defaultValue={category?.seo_description_en ?? ''}
              className="w-full px-3 py-2 bg-white border border-[#C5A059]/10 rounded-md text-sm focus:ring-1 focus:ring-[#C5A059]/30 outline-none resize-none"
            />
          </div>
          <div>
            <label htmlFor="seo_description_bn" className="block text-[10px] tracking-[0.15em] uppercase text-[#1A1918]/40 mb-1">
              SEO Description (BN)
            </label>
            <textarea
              id="seo_description_bn"
              name="seo_description_bn"
              rows={2}
              defaultValue={category?.seo_description_bn ?? ''}
              className="w-full px-3 py-2 bg-white border border-[#C5A059]/10 rounded-md text-sm font-bengali focus:ring-1 focus:ring-[#C5A059]/30 outline-none resize-none"
            />
          </div>
        </div>
      </div>

      {/* Status */}
      <div>
        <label htmlFor="status" className="block text-[10px] tracking-[0.15em] uppercase text-[#1A1918]/50 font-medium mb-1.5">
          Status
        </label>
        <select
          id="status"
          name="status"
          defaultValue={category?.status ?? 'draft'}
          className="w-full max-w-xs px-4 py-2.5 bg-white border border-[#C5A059]/15 rounded-md text-sm focus:ring-1 focus:ring-[#C5A059]/30 outline-none"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      {/* Submit */}
      <div className="flex items-center gap-3 pt-4">
        <button
          type="submit"
          disabled={isPending}
          className={cn(
            'px-6 py-2.5 bg-[#8A1C14] text-white text-sm tracking-wider uppercase rounded-md transition-colors',
            isPending ? 'opacity-50' : 'hover:bg-[#B3241C]',
          )}
        >
          {isPending ? 'Saving...' : category ? 'Update Category' : 'Create Category'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2.5 text-sm text-[#1A1918]/50 hover:text-[#1A1918] transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
