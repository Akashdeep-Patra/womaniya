'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const LOOKBOOK_IMAGES = [
  {
    src: '/instagram/2026-02-25_12-56-26_UTC_1.jpg',
    rotation: -3,
    yOffset: 20,
    zIndex: 10,
    title: 'Spring Symphony',
  },
  {
    src: '/instagram/2026-02-23_06-34-00_UTC_1.jpg',
    rotation: 4,
    yOffset: -10,
    zIndex: 20,
    title: 'Woven Poetry',
  },
  {
    src: '/instagram/2026-02-11_10-27-03_UTC_1.jpg',
    rotation: -2,
    yOffset: 30,
    zIndex: 15,
    title: 'Heritage Threads',
  },
  {
    src: '/instagram/2026-02-09_12-41-33_UTC_1.jpg',
    rotation: 5,
    yOffset: -20,
    zIndex: 25,
    title: 'Crimson Love',
  },
  {
    src: '/instagram/2026-02-02_12-37-01_UTC_1.jpg',
    rotation: -4,
    yOffset: 15,
    zIndex: 30,
    title: 'Festive Hues',
  },
];

const VectorFrame = ({ className }: { className?: string }) => (
  <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" className={className}>
    <rect x="2" y="2" width="96" height="96" fill="none" stroke="#C5A059" strokeWidth="0.5" strokeDasharray="4 2" opacity="0.5" />
    <circle cx="2" cy="2" r="1.5" fill="#8A1C14" />
    <circle cx="98" cy="2" r="1.5" fill="#8A1C14" />
    <circle cx="2" cy="98" r="1.5" fill="#8A1C14" />
    <circle cx="98" cy="98" r="1.5" fill="#8A1C14" />
  </svg>
);

export function LookbookSection() {
  const t = useTranslations('hero'); // Reuse hero strings or standard ones if needed

  return (
    <section className="py-24 md:py-32 bg-bengal-kori relative overflow-hidden">
      {/* Background Texture/Wallpaper */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#C5A059 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 relative z-40"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-bengal-sindoor font-semibold mb-4 block">
            The Journal
          </span>
          <h2 className="text-4xl md:text-6xl font-editorial text-bengal-kajal tracking-tight">
            Woven <span className="italic text-bengal-kansa">Stories</span>
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-bengal-kajal/60 text-sm md:text-base leading-relaxed">
            Every fold carries a whisper of heritage. Discover our latest curations, worn slowly and beautifully by you. 
            Real glimpses from the world of Womaniya.
          </p>
        </motion.div>

        {/* Paper / Polaroid Gallery Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4 justify-items-center">
          {LOOKBOOK_IMAGES.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50, rotate: 0 }}
              whileInView={{ opacity: 1, y: img.yOffset, rotate: img.rotation }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ scale: 1.05, rotate: 0, y: 0, zIndex: 50 }}
              transition={{ 
                duration: 0.7, 
                delay: idx * 0.1, 
                type: "spring", 
                stiffness: 200, 
                damping: 20 
              }}
              className="relative group cursor-pointer"
              style={{ zIndex: img.zIndex }}
            >
              {/* Paper Background / Polaroid Frame */}
              <div className="bg-[#FDFAF5] p-3 pb-12 shadow-[0_15px_35px_rgba(0,0,0,0.1)] border border-[#C5A059]/15 rounded-sm relative">
                {/* Decorative Vector Frame */}
                <div className="absolute inset-2 pointer-events-none z-20">
                  <VectorFrame className="w-full h-full" />
                </div>
                
                {/* Image */}
                <div className="relative w-[280px] h-[340px] md:w-[240px] md:h-[300px] lg:w-[220px] lg:h-[280px] overflow-hidden bg-bengal-mati">
                  <Image
                    src={img.src}
                    alt={img.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 30vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110 filter sepia-[0.1] contrast-[1.05]"
                  />
                  {/* Subtle vignette/texture overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-50 mix-blend-multiply pointer-events-none" />
                </div>

                {/* Hand-written style title */}
                <div className="absolute bottom-4 left-0 w-full text-center">
                  <p className="font-editorial italic text-lg text-bengal-kajal/80">
                    {img.title}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
