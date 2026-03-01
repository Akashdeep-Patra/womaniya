'use client';

import { motion }       from 'framer-motion';
import { useParams }    from 'next/navigation';
import { KanthaStitch } from '@/components/illustrations/KanthaStitch';

const STEPS_EN = [
  { n: '01', title: 'We go to them.',       body: 'Every piece starts at the loom — Murshidabad, Pochampally, Kutch. We visit the weaver, not the middleman.' },
  { n: '02', title: 'They weave. By hand.', body: 'A single Jamdani takes 15–30 days. No shortcuts. The time is inside the cloth.' },
  { n: '03', title: 'Checked. Carefully.',  body: "Every saree is inspected before it moves. If it isn't right, it goes back." },
  { n: '04', title: 'Packed. Shipped. Yours.', body: "Wrapped in muslin. Shipped with a card. The weaver's name is on it." },
];

const STEPS_BN = [
  { n: '০১', title: 'আমরা ওদের কাছে যাই।',     body: 'প্রতিটা কাপড়ের শুরু লুমে — মুর্শিদাবাদ, পোচামপল্লি, কচ্ছে। আমরা সরাসরি তাঁতির কাছে।' },
  { n: '০২', title: 'ওরা বোনে। হাতে।',         body: 'একটা জামদানি তৈরি হতে ১৫–৩০ দিন লাগে। কোনো shortcut নেই। সময়টা কাপড়ে থেকে যায়।' },
  { n: '০৩', title: 'পরীক্ষা হয়। হাতে।',      body: 'প্রতিটা শাড়ি পাঠানোর আগে দেখা হয়। ঠিক না হলে ফেরত।' },
  { n: '০৪', title: 'প্যাক। পাঠানো। তোমার।',  body: 'মসলিনে মোড়া। একটা চিরকুটসহ। কার হাতে তৈরি — সেটা লেখা থাকে।' },
];

export function GlimpsesSection() {
  const params = useParams();
  const locale = params.locale as string;
  const isBn   = locale === 'bn';
  const steps  = isBn ? STEPS_BN : STEPS_EN;

  return (
    <section className="bg-bengal-kajal text-bengal-kori py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <p className="text-bengal-kansa text-[10px] tracking-[0.3em] uppercase mb-3 font-sans-en">
            {isBn ? 'এভাবেই তৈরি হয়' : 'How it gets made'}
          </p>
          <h2 className={`font-editorial text-3xl md:text-5xl leading-tight max-w-lg ${isBn ? 'font-bengali-serif' : ''}`}>
            {isBn ? 'লুম থেকে তোমার কাছে।' : 'From their hands to yours.'}
          </h2>
        </motion.div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 border-t border-bengal-kansa/20">
          {steps.map(({ n, title, body }, i) => (
            <motion.div
              key={n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="border-b md:border-b-0 md:border-r border-bengal-kansa/20 last:border-0 py-8 md:py-10 md:px-8 first:md:pl-0 last:md:pr-0 flex md:flex-col gap-5 md:gap-5"
            >
              <span className="font-editorial text-3xl text-bengal-kansa/35 flex-shrink-0 w-12 md:w-auto">
                {n}
              </span>
              <div>
                <h3 className={`font-editorial text-lg text-bengal-kori mb-2 ${isBn ? 'font-bengali-serif' : ''}`}>
                  {title}
                </h3>
                <p className={`text-bengal-kori/50 text-sm leading-relaxed ${isBn ? 'font-bengali' : ''}`}>
                  {body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <KanthaStitch color="#C5A059" width={220} rows={2} className="opacity-25" />
        </div>
      </div>
    </section>
  );
}
