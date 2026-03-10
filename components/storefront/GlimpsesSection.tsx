'use client';

import { motion }       from 'framer-motion';
import { useParams }    from 'next/navigation';
import { KanthaStitch } from '@/components/illustrations/KanthaStitch';
import { ZariThread }   from '@/components/illustrations/ZariThread';

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
    <section id="glimpses" className="bg-background text-foreground py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24 flex flex-col items-center text-center"
        >
          <p className="text-primary text-[10px] tracking-[0.3em] uppercase mb-4 font-sans-en">
            {isBn ? 'এভাবেই তৈরি হয়' : 'How it gets made'}
          </p>
          <h2 className={`font-editorial text-4xl md:text-5xl lg:text-6xl leading-tight max-w-2xl ${isBn ? 'font-bengali-serif' : 'italic'}`}>
            {isBn ? 'লুম থেকে তোমার কাছে।' : 'From their hands to yours.'}
          </h2>
        </motion.div>

        {/* Timeline weaving down */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central Thread for desktop */}
          <div className="absolute left-[27px] md:left-1/2 top-4 bottom-4 w-px bg-border -translate-x-1/2 hidden md:block" />
          
          <div className="space-y-12 md:space-y-24">
            {steps.map(({ n, title, body }, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={n}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, delay: i * 0.15 }}
                  className={`relative flex flex-col md:flex-row gap-8 md:gap-16 items-start md:items-center ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Decorative Node */}
                  <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-card border border-border items-center justify-center z-10 shadow-sm">
                    <span className="font-editorial text-xl text-primary">{n}</span>
                  </div>

                  {/* Mobile Node */}
                  <div className="flex md:hidden w-12 h-12 rounded-full border border-border items-center justify-center shrink-0 bg-card">
                    <span className="font-editorial text-lg text-primary">{n}</span>
                  </div>

                  <div className={`flex-1 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                    <h3 className={`font-editorial text-2xl md:text-3xl text-foreground mb-4 ${isBn ? 'font-bengali-serif' : ''}`}>
                      {title}
                    </h3>
                    <p className={`text-muted-foreground text-base md:text-lg leading-relaxed max-w-sm ${isEven ? 'md:ml-auto' : ''} ${isBn ? 'font-bengali' : 'font-sans-en font-light'}`}>
                      {body}
                    </p>
                  </div>
                  
                  {/* Empty div for balancing grid on desktop */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <KanthaStitch color="var(--primary)" width={220} rows={2} className="opacity-40" />
        </div>
      </div>
    </section>
  );
}
