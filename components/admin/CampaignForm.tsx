'use client';

import { useState, useTransition } from 'react';
import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { BengalButton, BengalInput } from '@/components/bengal';
import { FormTextarea, FormSelect } from './FormField';
import { createCampaign, updateCampaign } from '@/actions/campaigns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const campaignFormSchema = z.object({
  name_en: z.string().min(2, 'Name must be at least 2 characters').max(120),
  name_bn: z.string().max(120).optional().or(z.literal('')),
  description_en: z.string().max(2000).optional().or(z.literal('')),
  description_bn: z.string().max(2000).optional().or(z.literal('')),
  announcement_text_en: z.string().max(300).optional().or(z.literal('')),
  announcement_text_bn: z.string().max(300).optional().or(z.literal('')),
  cta_url: z.string().optional().or(z.literal('')),
  starts_at: z.string().optional().or(z.literal('')),
  ends_at: z.string().optional().or(z.literal('')),
  status: z.enum(['draft', 'scheduled', 'live', 'ended', 'archived']).default('draft'),
});

type CampaignFormValues = z.infer<typeof campaignFormSchema>;

type CampaignFormProps = {
  initialData?: {
    id: number;
    name_en?: string | null;
    name_bn?: string | null;
    description_en?: string | null;
    description_bn?: string | null;
    announcement_text_en?: string | null;
    announcement_text_bn?: string | null;
    cta_url?: string | null;
    starts_at?: string | Date | null;
    ends_at?: string | Date | null;
    status?: string | null;
  };
  locale: string;
};

function formatDate(dateInput?: string | Date | null) {
  if (!dateInput) return '';
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
  return date.toISOString().slice(0, 16);
}

export function CampaignForm({ initialData, locale }: CampaignFormProps) {
  const router = useRouter();
  const [apiError, setApiError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit: rhfHandleSubmit,
    formState: { errors },
  } = useForm<CampaignFormValues>({
    resolver: zodResolver(campaignFormSchema) as Resolver<CampaignFormValues>,
    defaultValues: {
      name_en: initialData?.name_en ?? '',
      name_bn: initialData?.name_bn ?? '',
      description_en: initialData?.description_en ?? '',
      description_bn: initialData?.description_bn ?? '',
      announcement_text_en: initialData?.announcement_text_en ?? '',
      announcement_text_bn: initialData?.announcement_text_bn ?? '',
      cta_url: initialData?.cta_url ?? '',
    starts_at: formatDate(initialData?.starts_at ?? null) ?? '',
    ends_at: formatDate(initialData?.ends_at ?? null) ?? '',
      status: (initialData?.status as CampaignFormValues['status']) ?? 'draft',
    },
  });

  const onSubmit = (data: CampaignFormValues) => {
    setApiError(null);
    const formData = new FormData();
    formData.set('name_en', data.name_en);
    if (data.name_bn) formData.set('name_bn', data.name_bn);
    if (data.description_en) formData.set('description_en', data.description_en);
    if (data.description_bn) formData.set('description_bn', data.description_bn);
    if (data.announcement_text_en) formData.set('announcement_text_en', data.announcement_text_en);
    if (data.announcement_text_bn) formData.set('announcement_text_bn', data.announcement_text_bn);
    if (data.cta_url) formData.set('cta_url', data.cta_url);
    if (data.starts_at) formData.set('starts_at', data.starts_at);
    if (data.ends_at) formData.set('ends_at', data.ends_at);
    formData.set('status', data.status);

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
        const message = err instanceof Error ? err.message : 'Error saving campaign';
        setApiError(message);
        toast.error(message);
      }
    });
  };

  const inputClassName = (fieldError?: string) =>
    `flex min-h-[80px] w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none ${
      fieldError ? 'border-destructive ring-2 ring-destructive/20' : 'border-input'
    }`;

  const inputClassNameShort = (fieldError?: string) =>
    `flex h-12 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
      fieldError ? 'border-destructive ring-2 ring-destructive/20' : 'border-input'
    }`;

  return (
    <form onSubmit={rhfHandleSubmit(onSubmit)} className="flex flex-col gap-5 md:gap-8 pb-12">
      {apiError && (
        <div
          role="alert"
          className="rounded-xl border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          {apiError}
        </div>
      )}

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
              label="Campaign Name (EN)"
              {...register('name_en')}
              placeholder="e.g. Pujo Grand Sale"
              error={errors.name_en?.message}
            />
            <FormTextarea
              label="Description (EN)"
              {...register('description_en')}
              rows={4}
              error={errors.description_en?.message}
              className={inputClassName(errors.description_en?.message)}
            />
            <FormTextarea
              label="Announcement Strip Text (EN)"
              {...register('announcement_text_en')}
              rows={2}
              placeholder="Shows in the top ticker banner..."
              error={errors.announcement_text_en?.message}
              className={inputClassName(errors.announcement_text_en?.message)}
            />
          </TabsContent>

          <TabsContent value="bn" className="flex flex-col gap-4">
            <BengalInput
              label="Campaign Name (BN)"
              {...register('name_bn')}
              placeholder="যেমন: পুজো গ্র্যান্ড সেল"
              isBengali
              error={errors.name_bn?.message}
            />
            <FormTextarea
              label="Description (BN)"
              {...register('description_bn')}
              rows={4}
              error={errors.description_bn?.message}
              isBengali
              className={inputClassName(errors.description_bn?.message)}
            />
            <FormTextarea
              label="Announcement Strip Text (BN)"
              {...register('announcement_text_bn')}
              rows={2}
              error={errors.announcement_text_bn?.message}
              isBengali
              className={inputClassName(errors.announcement_text_bn?.message)}
            />
          </TabsContent>
        </Tabs>
      </div>

      <div className="bg-card p-4 md:p-6 rounded-2xl border border-border flex flex-col gap-4 md:gap-5">
        <h3 className="font-sans font-semibold tracking-tight text-lg md:text-xl text-foreground">Settings & Schedule</h3>

        <BengalInput
          label="CTA URL"
          {...register('cta_url')}
          placeholder="/collection/pujo"
          error={errors.cta_url?.message}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] tracking-widest uppercase font-medium text-muted-foreground font-sans-en">
              Start Date
            </label>
            <input
              type="datetime-local"
              {...register('starts_at')}
              className={inputClassNameShort(errors.starts_at?.message)}
            />
            {errors.starts_at && (
              <p className="text-destructive text-xs font-medium mt-1">{errors.starts_at.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] tracking-widest uppercase font-medium text-muted-foreground font-sans-en">
              End Date
            </label>
            <input
              type="datetime-local"
              {...register('ends_at')}
              className={inputClassNameShort(errors.ends_at?.message)}
            />
            {errors.ends_at && (
              <p className="text-destructive text-xs font-medium mt-1">{errors.ends_at.message}</p>
            )}
          </div>
        </div>

        <FormSelect label="Status" {...register('status')}>
          <option value="draft">Draft</option>
          <option value="scheduled">Scheduled</option>
          <option value="live">Live</option>
          <option value="ended">Ended</option>
          <option value="archived">Archived</option>
        </FormSelect>
      </div>

      <div className="sticky bottom-[calc(3.5rem+env(safe-area-inset-bottom)+1rem)] md:bottom-6 z-10">
        <BengalButton
          type="submit"
          variant="primary"
          size="touch"
          loading={isPending}
          className="shadow-2xl"
        >
          {isPending ? 'Saving...' : initialData ? 'Update Campaign' : 'Create Campaign'}
        </BengalButton>
      </div>
    </form>
  );
}
