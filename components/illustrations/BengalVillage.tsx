'use client';

import { motion } from 'framer-motion';

export function BengalVillage({ className = '' }: { className?: string }) {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <motion.svg
        viewBox="0 0 300 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        initial="hidden"
        animate="visible"
      >
        <circle cx="150" cy="150" r="140" className="fill-bengal-kori stroke-bengal-kansa/20" strokeWidth="2" />
        
        {/* Sun/Moon */}
        <motion.circle
          cx="200"
          cy="100"
          r="30"
          className="fill-bengal-sindoor/80"
          variants={{
            hidden: { y: 50, opacity: 0 },
            visible: { y: 0, opacity: 1, transition: { duration: 1.5, ease: "easeOut" } }
          }}
        />

        {/* Trees / Palm / Banana Tree Silhouette */}
        <motion.path
          d="M 50 220 L 70 120 C 60 100, 40 90, 20 100 C 40 80, 70 70, 90 90 C 110 70, 130 80, 120 100 C 100 90, 80 100, 70 120 Z"
          className="fill-bengal-kajal/80"
          variants={{
            hidden: { scaleY: 0, originY: 1 },
            visible: { scaleY: 1, transition: { duration: 1, delay: 0.5 } }
          }}
        />

        {/* Traditional Hut (Chaala) */}
        <motion.path
          d="M 120 180 C 160 140, 220 140, 260 180 L 240 220 L 140 220 Z"
          className="fill-bengal-kansa/80"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.8 } }
          }}
        />
        <motion.rect
          x="150"
          y="180"
          width="80"
          height="50"
          className="fill-bengal-mati"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 1, delay: 1 } }
          }}
        />
        <rect x="180" y="195" width="20" height="35" className="fill-bengal-kajal/80" />

        {/* River/Pond Flow */}
        <motion.path
          d="M 20 250 Q 80 230, 150 250 T 280 250"
          className="stroke-bengal-kansa fill-none"
          strokeWidth="4"
          strokeLinecap="round"
          animate={{
            d: [
              "M 20 250 Q 80 230, 150 250 T 280 250",
              "M 20 250 Q 80 270, 150 250 T 280 250",
              "M 20 250 Q 80 230, 150 250 T 280 250"
            ]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M 40 270 Q 100 250, 170 270 T 260 270"
          className="stroke-bengal-kansa/40 fill-none"
          strokeWidth="2"
          strokeLinecap="round"
          animate={{
            d: [
              "M 40 270 Q 100 250, 170 270 T 260 270",
              "M 40 270 Q 100 290, 170 270 T 260 270",
              "M 40 270 Q 100 250, 170 270 T 260 270"
            ]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        {/* Small Boat (Nouka) */}
        <motion.g
          animate={{ x: [0, 20, 0], y: [0, 2, 0], rotate: [0, 2, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M 80 245 L 120 245 L 110 255 L 90 255 Z" className="fill-bengal-kajal" />
          <path d="M 100 245 L 100 225 L 115 240 Z" className="fill-bengal-sindoor/80" />
        </motion.g>

      </motion.svg>
    </div>
  );
}
