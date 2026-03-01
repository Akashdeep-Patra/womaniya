'use client';

import { motion } from 'framer-motion';

const ITEMS = [
  'Dhakai Jamdani', 'হাতে বোনা', 'Ikkat Pochampally', 'Ajrakh Block Print',
  'Bengal Tant', 'খাঁটি বাংলা', 'Handwoven Heritage', 'জামদানি',
  'Conscious Fashion', 'আজরখ', 'Artisan Made', 'তাঁত',
];

export function HeritageTicker() {
  const items = [...ITEMS, ...ITEMS]; // duplicate for seamless loop

  return (
    <div className="bg-bengal-kajal py-3 overflow-hidden border-y border-bengal-kansa/20">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 24, ease: 'linear', repeat: Infinity }}
      >
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-8 flex-shrink-0">
            <span className={`text-[11px] tracking-[0.25em] uppercase font-medium text-bengal-kori/70 ${
              /[\u0980-\u09FF]/.test(item) ? 'font-bengali tracking-normal text-xs' : 'font-sans-en'
            }`}>
              {item}
            </span>
            <span className="w-1 h-1 rounded-full bg-bengal-kansa opacity-60 flex-shrink-0" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
