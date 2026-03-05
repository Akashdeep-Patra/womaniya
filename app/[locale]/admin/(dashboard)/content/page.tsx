import { setRequestLocale } from 'next-intl/server';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { ContentEditorForm } from '@/components/admin/ContentEditorForm';
import { getContentOverrides } from '@/actions/content';
import { contentNamespaces } from '@/lib/content-config';

import enMessages from '@/messages/en.json';
import bnMessages from '@/messages/bn.json';

type Props = { params: Promise<{ locale: string }> };

export default async function ContentPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const jsonDefaults = locale === 'bn' ? bnMessages : enMessages;

  // Build a flat namespace→key→value map from JSON defaults (excluding admin namespace)
  const defaults: Record<string, Record<string, string>> = {};
  for (const ns of contentNamespaces) {
    const nsData = jsonDefaults[ns.name as keyof typeof jsonDefaults];
    if (nsData && typeof nsData === 'object') {
      defaults[ns.name] = nsData as Record<string, string>;
    }
  }

  const dbOverrides = await getContentOverrides(locale);

  return (
    <div className="px-4 md:px-8 py-8 max-w-[1600px] mx-auto">
      <AdminPageHeader
        title="Site Copy"
        description="Edit all website text. Changes apply immediately after saving."
      />
      <ContentEditorForm
        namespaces={contentNamespaces}
        jsonDefaults={defaults}
        dbOverrides={dbOverrides}
        locale={locale}
      />
    </div>
  );
}
