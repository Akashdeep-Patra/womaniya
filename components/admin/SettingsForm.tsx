'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { notify } from '@/lib/notify';
import { BengalButton, BengalInput } from '@/components/bengal';
import { updateSettings } from '@/actions/settings';

type SettingsFormProps = {
  initialData: Record<string, string>;
  locale: string;
};

export function SettingsForm({ initialData, locale }: SettingsFormProps) {
  const [isPending, startTransition] = useTransition();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      whatsapp_number: initialData['whatsapp_number'] || '919143161829',
      store_name: initialData['store_name'] || 'Womaniya',
      announcement_text_en: initialData['announcement_text_en'] || 'Welcome to Womaniya!',
      announcement_text_bn: initialData['announcement_text_bn'] || 'Womaniya তে আপনাকে স্বাগতম!',
      instagram_url: initialData['instagram_url'] || '',
      facebook_url: initialData['facebook_url'] || '',
      seo_home_title: initialData['seo_home_title'] || '',
      seo_home_description: initialData['seo_home_description'] || '',
      seo_shop_title: initialData['seo_shop_title'] || '',
      seo_shop_description: initialData['seo_shop_description'] || '',
      seo_og_subtitle: initialData['seo_og_subtitle'] || '',
    },
  });

  const onSubmit = (data: Record<string, string>) => {
    startTransition(async () => {
      try {
        await updateSettings(data);
        notify.success('settings', 'updated');
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Error updating settings';
        notify.error('settings', 'updated', message);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="bg-card p-3 md:p-6 rounded-xl border border-border">
        <h3 className="font-sans font-semibold tracking-tight text-base md:text-lg text-foreground mb-3 md:mb-4">
          Contact & Social
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
          <BengalInput
            label="WhatsApp Number"
            {...register('whatsapp_number')}
            placeholder="e.g. 919143161829"
          />
          <div className="hidden md:block" /> {/* spacer for grid */}
          <BengalInput
            label="Instagram URL"
            {...register('instagram_url')}
            placeholder="e.g. https://instagram.com/..."
          />
          <BengalInput
            label="Facebook URL"
            {...register('facebook_url')}
            placeholder="e.g. https://facebook.com/..."
          />
        </div>
      </div>

      <div className="bg-card p-3 md:p-6 rounded-xl border border-border">
        <h3 className="font-sans font-semibold tracking-tight text-base md:text-lg text-foreground mb-3 md:mb-4">
          Store Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
          <div className="md:col-span-2">
            <BengalInput
              label="Store Name"
              {...register('store_name')}
              placeholder="e.g. Womaniya"
            />
          </div>
          <BengalInput
            label="Announcement Bar (EN)"
            {...register('announcement_text_en')}
          />
          <BengalInput
            label="Announcement Bar (BN)"
            {...register('announcement_text_bn')}
            isBengali
          />
        </div>
      </div>

      <div className="bg-card p-3 md:p-6 rounded-xl border border-border">
        <h3 className="font-sans font-semibold tracking-tight text-base md:text-lg text-foreground mb-3 md:mb-4">
          SEO &amp; Metadata
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
          <BengalInput
            label="Homepage SEO Title"
            {...register('seo_home_title')}
            placeholder="e.g. Authentic Handloom Sarees from Kolkata | Womaniya"
          />
          <div>
            <BengalInput
              label="OG Image Subtitle"
              {...register('seo_og_subtitle')}
              placeholder="e.g. Handwoven Heritage from Bengal"
            />
            <p className="mt-1 text-xs text-muted-foreground">Shown on social media share cards</p>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-foreground mb-1">
              Homepage Meta Description
            </label>
            <textarea
              {...register('seo_home_description')}
              rows={3}
              placeholder="155-char description for Google..."
              className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>
          <BengalInput
            label="Shop Page SEO Title"
            {...register('seo_shop_title')}
            placeholder="e.g. Shop Handloom Sarees | Womaniya"
          />
          <div className="hidden md:block" />
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-foreground mb-1">
              Shop Page Meta Description
            </label>
            <textarea
              {...register('seo_shop_description')}
              rows={3}
              placeholder="Description for the shop page..."
              className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>
        </div>
      </div>

      <div className="sticky bottom-[calc(4rem+env(safe-area-inset-bottom))] md:bottom-6 z-10 mt-2">
        <BengalButton
          type="submit"
          variant="primary"
          size="touch"
          loading={isPending}
          className="shadow-xl w-full md:w-auto md:min-w-[200px] font-semibold"
        >
          {isPending ? 'Saving...' : 'Save Settings'}
        </BengalButton>
      </div>
    </form>
  );
}