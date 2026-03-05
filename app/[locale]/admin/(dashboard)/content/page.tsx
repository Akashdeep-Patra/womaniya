import { setRequestLocale } from 'next-intl/server';
import { ContentEditorForm } from '@/components/admin/ContentEditorForm';
import { getContentOverrides } from '@/actions/content';
import { contentPages, contentNamespaces } from '@/lib/content-config';

import enMessages from '@/messages/en.json';
import bnMessages from '@/messages/bn.json';

type Props = { params: Promise<{ locale: string }> };

type MessageMap = Record<string, Record<string, string>>;

function extractDefaults(messages: MessageMap) {
  const out: Record<string, Record<string, string>> = {};
  for (const ns of contentNamespaces) {
    const data = messages[ns.name];
    if (data && typeof data === 'object') {
      out[ns.name] = data;
    }
  }
  return out;
}

export default async function ContentPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const allDefaults = {
    en: extractDefaults(enMessages as MessageMap),
    bn: extractDefaults(bnMessages as MessageMap),
  };

  const dbOverrides = await getContentOverrides(locale);

  return (
    <ContentEditorForm
      pages={contentPages}
      allDefaults={allDefaults}
      initialOverrides={dbOverrides}
      initialLocale={locale}
    />
  );
}
