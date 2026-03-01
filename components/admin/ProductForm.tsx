'use client';

import { useRef, useState, useTransition } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { CameraUpload }  from './CameraUpload';
import { BengalButton }  from '@/components/bengal';
import { BengalInput }   from '@/components/bengal';
import { createProduct } from '@/actions/products';

const CATEGORIES = ['Jamdani', 'Silk', 'Tant', 'Ready to Wear'];

export function ProductForm() {
  const t           = useTranslations('admin');
  const formRef     = useRef<HTMLFormElement>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Inject uploaded image URL
    if (imageUrl) formData.set('image_url_uploaded', imageUrl);

    startTransition(async () => {
      try {
        await createProduct(formData);
        toast.success(t('published'));
        formRef.current?.reset();
        setImageUrl('');
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Error publishing');
      }
    });
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">

      {/* Camera upload */}
      <CameraUpload onUpload={setImageUrl} />

      {/* Hidden uploaded URL */}
      <input type="hidden" name="image_uploaded_url" value={imageUrl} />

      {/* Name EN */}
      <BengalInput
        label={t('form_name')}
        name="name_en"
        placeholder="e.g. Crimson Dhakai Jamdani"
        required
      />

      {/* Name BN */}
      <BengalInput
        label={t('form_name_bn')}
        name="name_bn"
        placeholder="যেমন: ক্রিমসন ঢাকাই জামদানি"
        isBengali
      />

      {/* Price */}
      <BengalInput
        label={t('form_price')}
        name="price"
        type="number"
        min="0"
        step="0.01"
        placeholder="4500"
        required
      />

      {/* Category */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] tracking-widest uppercase font-medium text-bengal-kajal/70 font-sans-en">
          {t('form_category')}
        </label>
        <select
          name="category"
          required
          defaultValue=""
          className="w-full h-12 px-4 rounded-sm border border-bengal-kansa/30 bg-bengal-cream text-bengal-kajal text-sm font-sans-en focus:outline-none focus:ring-2 focus:ring-bengal-sindoor/30 focus:border-bengal-sindoor transition-colors appearance-none"
        >
          <option value="" disabled>Select category…</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] tracking-widest uppercase font-medium text-bengal-kajal/70 font-sans-en">
          {t('form_description')}
        </label>
        <textarea
          name="description_en"
          rows={3}
          placeholder="Handwoven on a traditional loom by master weavers in Murshidabad…"
          className="w-full px-4 py-3 rounded-sm border border-bengal-kansa/30 bg-bengal-cream text-bengal-kajal text-sm font-sans-en focus:outline-none focus:ring-2 focus:ring-bengal-sindoor/30 focus:border-bengal-sindoor transition-colors resize-none"
        />
      </div>

      {/* Featured toggle */}
      <label className="flex items-center gap-3 cursor-pointer min-h-[44px]">
        <div className="relative">
          <input type="checkbox" name="is_featured" className="sr-only peer" />
          <div className="w-11 h-6 bg-bengal-mati rounded-full border border-bengal-kansa/30 peer-checked:bg-bengal-sindoor transition-colors" />
          <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5" />
        </div>
        <span className="text-sm text-bengal-kajal">{t('form_featured')}</span>
      </label>

      {/* Submit */}
      <BengalButton
        type="submit"
        variant="primary"
        size="touch"
        loading={isPending}
        className="mt-2"
      >
        {isPending ? t('publishing') : t('publish')}
      </BengalButton>
    </form>
  );
}
