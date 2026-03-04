'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
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
    },
  });

  const onSubmit = (data: Record<string, string>) => {
    startTransition(async () => {
      try {
        await updateSettings(data);
        toast.success('Settings updated successfully');
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Error updating settings';
        toast.error(message);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="bg-card p-4 md:p-6 rounded-2xl border border-border flex flex-col gap-5">
        <h3 className="font-sans font-semibold tracking-tight text-lg md:text-xl text-foreground">Contact & Social</h3>
        
        <BengalInput
          label="WhatsApp Number (with country code)"
          {...register('whatsapp_number')}
          placeholder="e.g. 919143161829"
        />

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

      <div className="bg-card p-4 md:p-6 rounded-2xl border border-border flex flex-col gap-5">
        <h3 className="font-sans font-semibold tracking-tight text-lg md:text-xl text-foreground">Store Details</h3>
        
        <BengalInput
          label="Store Name"
          {...register('store_name')}
          placeholder="e.g. Womaniya"
        />

        <BengalInput
          label="Announcement Bar Text (EN)"
          {...register('announcement_text_en')}
        />

        <BengalInput
          label="Announcement Bar Text (BN)"
          {...register('announcement_text_bn')}
          isBengali
        />
      </div>

      <div className="sticky bottom-[calc(3.5rem+env(safe-area-inset-bottom)+1rem)] md:bottom-6 z-10">
        <BengalButton
          type="submit"
          variant="primary"
          size="touch"
          loading={isPending}
          className="shadow-2xl"
        >
          {isPending ? 'Saving...' : 'Save Settings'}
        </BengalButton>
      </div>
    </form>
  );
}