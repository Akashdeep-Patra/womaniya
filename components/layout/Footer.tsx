import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="bg-bengal-kajal text-bengal-kori mt-20 mb-bottom-nav md:mb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">

        {/* Logo + tagline */}
        <div className="text-center mb-10">
          <h2 className="font-editorial text-3xl md:text-4xl tracking-widest mb-2">
            W O M A N I A
          </h2>
          <p className="font-bengali-serif text-bengal-kansa text-lg">{t('tagline')}</p>
          <p className="text-bengal-kori/50 text-xs tracking-widest mt-1 uppercase">{t('tagline_en')}</p>
        </div>

        {/* Divider */}
        <div className="h-px bg-bengal-kansa/30 mb-10" />

        {/* Links grid */}
        <div className="grid grid-cols-3 gap-4 text-center text-xs tracking-widest uppercase text-bengal-kori/60 mb-10">
          <a href="#" className="hover:text-bengal-kansa transition-colors min-h-[44px] flex items-center justify-center">
            {t('whatsapp')}
          </a>
          <a href="#" className="hover:text-bengal-kansa transition-colors min-h-[44px] flex items-center justify-center">
            {t('instagram')}
          </a>
          <a href="#" className="hover:text-bengal-kansa transition-colors min-h-[44px] flex items-center justify-center">
            {t('contact')}
          </a>
        </div>

        {/* Copyright */}
        <p className="text-center text-bengal-kori/30 text-[10px] tracking-widest uppercase">
          © {new Date().getFullYear()} Womania. {t('rights')}
        </p>
      </div>
    </footer>
  );
}
