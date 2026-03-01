'use client';

import { useRef, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { BengalButton, BengalInput }  from '@/components/bengal';
import { createCampaign, updateCampaign } from '@/actions/campaigns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function CampaignForm({ initialData, locale }: { initialData?: any, locale: string }) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      try {
        if (initialData) {
          await updateCampaign(initialData.id, formData);
          toast.success('Campaign updated successfully');
        } else {
          await createCampaign(formData);
          toast.success('Campaign created successfully');
        }
        router.push(`/${locale}/admin/campaigns`);
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Error saving campaign');
      }
    });
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16); // YYYY-MM-DDTHH:mm
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-8 pb-12">
      <div className="bg-bengal-kori/50 p-6 rounded-2xl border border-bengal-kansa/20">
        <Tabs defaultValue="en" className="w-full">
          <TabsList className="mb-4 bg-bengal-mati">
            <TabsTrigger value="en">English</TabsTrigger>
            <TabsTrigger value="bn" className="font-bengali">বাংলা</TabsTrigger>
          </TabsList>

          <TabsContent value="en" className="flex flex-col gap-4">
            <BengalInput
              label="Campaign Name (EN)"
              name="name_en"
              defaultValue={initialData?.name_en}
              placeholder="e.g. Pujo Grand Sale"
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
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] tracking-widest uppercase font-medium text-bengal-kajal/70 font-sans-en">
                Announcement Strip Text (EN)
              </label>
              <textarea
                name="announcement_text_en"
                rows={2}
                defaultValue={initialData?.announcement_text_en}
                placeholder="Shows in the top ticker banner..."
                className="w-full px-4 py-2 rounded-sm border border-bengal-kansa/30 bg-bengal-cream text-bengal-kajal text-sm font-sans-en focus:outline-none focus:ring-2 focus:ring-bengal-sindoor/30 focus:border-bengal-sindoor transition-colors resize-none"
              />
            </div>
          </TabsContent>

          <TabsContent value="bn" className="flex flex-col gap-4">
            <BengalInput
              label="Campaign Name (BN)"
              name="name_bn"
              defaultValue={initialData?.name_bn}
              placeholder="যেমন: পুজো গ্র্যান্ড সেল"
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
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] tracking-widest uppercase font-medium text-bengal-kajal/70 font-sans-en">
                Announcement Strip Text (BN)
              </label>
              <textarea
                name="announcement_text_bn"
                rows={2}
                defaultValue={initialData?.announcement_text_bn}
                className="w-full px-4 py-2 rounded-sm border border-bengal-kansa/30 bg-bengal-cream text-bengal-kajal text-sm font-bengali focus:outline-none focus:ring-2 focus:ring-bengal-sindoor/30 focus:border-bengal-sindoor transition-colors resize-none"
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="bg-bengal-kori/50 p-6 rounded-2xl border border-bengal-kansa/20 flex flex-col gap-5">
        <h3 className="font-editorial text-xl text-bengal-kajal">Settings & Schedule</h3>
        
        <BengalInput
          label="CTA URL"
          name="cta_url"
          defaultValue={initialData?.cta_url}
          placeholder="/collection/pujo"
        />

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] tracking-widest uppercase font-medium text-bengal-kajal/70 font-sans-en">
              Start Date
            </label>
            <input
              type="datetime-local"
              name="starts_at"
              defaultValue={formatDate(initialData?.starts_at)}
              className="w-full h-12 px-4 rounded-sm border border-bengal-kansa/30 bg-bengal-cream text-bengal-kajal text-sm font-sans-en focus:outline-none focus:ring-2 focus:ring-bengal-sindoor/30 focus:border-bengal-sindoor transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] tracking-widest uppercase font-medium text-bengal-kajal/70 font-sans-en">
              End Date
            </label>
            <input
              type="datetime-local"
              name="ends_at"
              defaultValue={formatDate(initialData?.ends_at)}
              className="w-full h-12 px-4 rounded-sm border border-bengal-kansa/30 bg-bengal-cream text-bengal-kajal text-sm font-sans-en focus:outline-none focus:ring-2 focus:ring-bengal-sindoor/30 focus:border-bengal-sindoor transition-colors"
            />
          </div>
        </div>

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
      </div>

      <div className="sticky bottom-[calc(3.5rem+env(safe-area-inset-bottom)+1rem)] md:bottom-6 z-10">
        <BengalButton
          type="submit"
          variant="primary"
          size="touch"
          loading={isPending}
          className="shadow-2xl"
        >
          {isPending ? 'Saving...' : (initialData ? 'Update Campaign' : 'Create Campaign')}
        </BengalButton>
      </div>
    </form>
  );
}
