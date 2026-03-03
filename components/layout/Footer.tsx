import { getTranslations } from 'next-intl/server';
import { getWaHref } from '@/lib/whatsapp';
import { getSetting } from '@/actions/settings';

export async function Footer() {
  const t = await getTranslations('footer');
  const waNumber = await getSetting('whatsapp_number', '919143161829');
  const instagramUrl = await getSetting('instagram_url', 'https://www.instagram.com/womaniya2019/');
  const waHref = getWaHref(waNumber);

  return (
    <footer className="bg-background text-foreground border-t border-border pb-bottom-nav md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">

        {/* Logo + tagline */}
        <div className="text-center mb-10">
          <h2 className="font-editorial text-3xl md:text-4xl tracking-widest mb-2">
            W O M A N I Y A
          </h2>
          <p className="font-bengali-serif text-primary text-lg">{t('tagline')}</p>
          <p className="text-muted-foreground text-xs tracking-widest mt-1 uppercase">{t('tagline_en')}</p>
        </div>

        {/* Divider */}
        <div className="h-px bg-border max-w-sm mx-auto mb-10" />

        {/* Links grid */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 text-center text-xs tracking-widest uppercase text-muted-foreground mb-10">
          <a href={waHref} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors min-h-[44px] flex items-center justify-center">
            {t('whatsapp')}
          </a>
          <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors min-h-[44px] flex items-center justify-center">
            {t('instagram')}
          </a>
          <a href={waHref} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors min-h-[44px] flex items-center justify-center">
            {t('contact')}
          </a>
        </div>

        {/* Copyright */}
        <p className="text-center text-muted-foreground/50 text-[10px] tracking-widest uppercase">
          © {new Date().getFullYear()} Womaniya. {t('rights')}
        </p>
      </div>
    </footer>
  );
}
