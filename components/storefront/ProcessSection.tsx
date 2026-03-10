'use client';

import { motion }          from 'framer-motion';
import { useParams }       from 'next/navigation';
import { generalEnquiryUrl } from '@/lib/whatsapp';
import { AlponaDivider }   from '@/components/illustrations/AlponaDivider';
import { PaisleyCluster }  from '@/components/illustrations/PaisleyCluster';
import { LoomWeaver }      from '@/components/illustrations/LoomWeaver';

// Puja campaign section — doubles as seasonal marketing banner
export function ProcessSection({ waNumber }: { waNumber?: string }) {
  const params = useParams();
  const locale = params.locale as string;
  const isBn   = locale === 'bn';
  const waHref = generalEnquiryUrl(locale, waNumber);

  return (
    <section id="process" className="bg-bengal-mati/50 py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Artisan quote block — the brand's human face */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

          {/* Left: image */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative aspect-3/4 rounded-3xl overflow-hidden bg-bengal-mati border border-bengal-kansa/20">
              <LoomWeaver />
              {/* Overlay label */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-bengal-kajal/85 backdrop-blur-sm rounded-3xl px-4 py-3">
                  <p className="text-bengal-kansa text-[10px] tracking-widest uppercase font-sans-en mb-0.5">
                    {isBn ? 'আমাদের তাঁতি' : 'Our Weaver'}
                  </p>
                  <p className={`text-bengal-kori font-medium text-sm ${isBn ? 'font-bengali' : 'font-sans-en'}`}>
                    {isBn ? 'মুর্শিদাবাদ, পশ্চিমবঙ্গ' : 'Murshidabad, West Bengal'}
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative paisley */}
            <PaisleyCluster
              className="absolute -bottom-8 -right-8 opacity-20"
              size={100}
              color="#C5A059"
            />
          </motion.div>

          {/* Right: pull quote + stats */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-7"
          >
            <p className="text-bengal-kansa text-[10px] tracking-[0.3em] uppercase font-sans-en">
              {isBn ? 'কারিগরের কথা' : 'The Artisan'}
            </p>

            {/* Pull quote — the most powerful marketing element on the page */}
            <blockquote className={`font-editorial text-2xl md:text-3xl xl:text-4xl text-bengal-kajal leading-snug ${isBn ? 'font-bengali-serif' : ''}`}>
              {isBn
                ? '"আমার বাবা বুনতেন। আমি বুনি। আমার ছেলেও বুনবে — যদি মানুষ কেনে।"'
                : '"My father wove. I weave. My son will weave — if people buy."'}
            </blockquote>

            <AlponaDivider width={180} className="opacity-50" />

            {/* Why this matters */}
            <p className={`text-bengal-kajal/65 text-sm md:text-base leading-relaxed ${isBn ? 'font-bengali' : ''}`}>
              {isBn
                ? 'প্রতিটা Womaniya কেনা একটা পরিবারের জীবিকা বাঁচায়। এটা শুধু কাপড় কেনা নয় — এটা একটা সিদ্ধান্ত।'
                : 'Every Womaniya purchase sustains a weaving family. This isn\'t just a transaction — it\'s a choice about what survives.'}
            </p>

            {/* Micro stats — specific, not generic */}
            <div className="grid grid-cols-3 gap-4 pt-2">
              {[
                { num: '30+', label: isBn ? 'বছরের অভিজ্ঞতা' : 'Years of craft' },
                { num: '3',   label: isBn ? 'প্রজন্ম' : 'Generations' },
                { num: '1',   label: isBn ? 'পরিবার' : 'Family' },
              ].map((s) => (
                <div key={s.num} className="text-center">
                  <p className="font-editorial text-2xl md:text-3xl text-bengal-sindoor">{s.num}</p>
                  <p className={`text-bengal-kajal/50 text-[10px] tracking-wide mt-0.5 ${isBn ? 'font-bengali text-xs' : 'font-sans-en'}`}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Pujo season CTA */}
            <div className="bg-bengal-sindoor/8 border border-bengal-sindoor/20 rounded-3xl p-5">
              <p className={`text-bengal-kajal font-medium text-sm mb-1 ${isBn ? 'font-bengali' : 'font-sans-en'}`}>
                {isBn ? '🪔 পুজো আসছে — আগে বলো' : '🪔 Puja is coming — order early'}
              </p>
              <p className={`text-bengal-kajal/55 text-xs leading-relaxed mb-4 ${isBn ? 'font-bengali' : ''}`}>
                {isBn
                  ? 'Delivery নিশ্চিত করতে সপ্তমীর ২ সপ্তাহ আগে জানাও।'
                  : 'To guarantee delivery before Navami, enquire 2 weeks ahead.'}
              </p>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 text-xs font-semibold text-bengal-sindoor hover:text-bengal-alta transition-colors ${isBn ? 'font-bengali' : 'font-sans-en tracking-widest uppercase'}`}
              >
                {isBn ? 'WhatsApp-এ জানাও →' : 'WhatsApp us →'}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
