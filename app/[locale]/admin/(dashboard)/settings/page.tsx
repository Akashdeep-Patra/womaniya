import { setRequestLocale } from 'next-intl/server';
import { getTranslations }  from 'next-intl/server';
import { getSettings } from '@/actions/settings';
import { SettingsForm } from '@/components/admin/SettingsForm';

type Props = { params: Promise<{ locale: string }> };

export default async function SettingsIndex({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'admin' });

  const settings = await getSettings();

  return (
    <div className="px-4 md:px-8 py-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="font-editorial text-3xl text-bengal-kajal mb-1">Settings</h1>
        <p className="text-sm text-bengal-kajal/60">
          Manage global store settings and configuration.
        </p>
      </div>

      <SettingsForm initialData={settings} locale={locale} />
    </div>
  );
}