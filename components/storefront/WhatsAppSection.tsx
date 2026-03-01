'use client';

import { motion }          from 'framer-motion';
import { useParams }       from 'next/navigation';
import { generalEnquiryUrl } from '@/lib/whatsapp';
import { AlponaDivider }   from '@/components/illustrations/AlponaDivider';

export function WhatsAppSection() {
  const params = useParams();
  const locale = params.locale as string;
  const isBn   = locale === 'bn';
  const href   = generalEnquiryUrl(locale);

  const heading = isBn
    ? 'পছন্দের শাড়ি খুঁজে পাচ্ছেন না? হোয়াটসঅ্যাপে কথা বলুন'
    : 'Can\'t find what you\'re looking for?';
  const sub = isBn
    ? 'আমাদের সরাসরি হোয়াটসঅ্যাপে মেসেজ করুন — আমরা আপনাকে সঠিক শাড়ি খুঁজে পেতে সাহায্য করব।'
    : 'Message us on WhatsApp and we\'ll personally help you find the perfect handloom piece from our collection.';
  const cta = isBn ? 'হোয়াটসঅ্যাপে মেসেজ করুন' : 'Chat with Us on WhatsApp';

  return (
    <section className="px-4 sm:px-6 py-12 md:py-16 max-w-3xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="bg-bengal-kajal/5 rounded-2xl p-8 md:p-12 border border-bengal-kansa/15"
      >
        <h2 className={`font-editorial text-2xl md:text-3xl text-bengal-kajal mb-3 ${isBn ? 'font-bengali-serif' : ''}`}>
          {heading}
        </h2>

        <AlponaDivider className="my-4" width={180} />

        <p className={`text-bengal-kajal/65 text-sm leading-relaxed mb-6 ${isBn ? 'font-bengali' : ''}`}>
          {sub}
        </p>

        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-bengal-kajal text-bengal-kori font-semibold text-sm tracking-wide hover:bg-bengal-kajal/90 transition-colors duration-200"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          {cta}
        </a>

        <p className="text-bengal-kajal/40 text-[10px] tracking-widest uppercase mt-5 font-sans-en">
          {isBn ? 'সাধারণত ১ ঘণ্টার মধ্যে উত্তর দেওয়া হয়' : 'Usually replies within 1 hour'}
        </p>
      </motion.div>
    </section>
  );
}
