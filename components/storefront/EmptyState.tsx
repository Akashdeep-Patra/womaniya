'use client';

import { LoomWeaver } from '@/components/illustrations/LoomWeaver';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

interface Props {
  message?: string;
}

export function EmptyState({ message }: Props) {
  const t = useTranslations('shop');
  const params = useParams();
  const isBn = params.locale === 'bn';

  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 max-w-lg mx-auto text-center">
      <div className="w-48 h-48 md:w-64 md:h-64 mb-8 opacity-60 mix-blend-multiply">
        <LoomWeaver />
      </div>
      <h3 className={`font-editorial text-2xl md:text-3xl text-bengal-kajal mb-4 ${isBn ? 'font-bengali-serif' : ''}`}>
        {isBn ? 'এই তাঁতে এখন কিছু বোনা হচ্ছে না' : 'The Loom is Empty'}
      </h3>
      <p className={`text-bengal-kajal/60 text-sm md:text-base leading-relaxed ${isBn ? 'font-bengali' : 'font-sans-en'}`}>
        {message || t('no_products')}
      </p>
    </div>
  );
}
