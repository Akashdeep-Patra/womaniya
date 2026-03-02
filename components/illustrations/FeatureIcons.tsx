'use client';

/**
 * Feature icons — Bengali-aesthetic illustrations for the "Womaniya Way" section.
 * Animated and refined to have a premium editorial feel.
 */
import { motion } from 'framer-motion';

const S = '#C5A059'; // kansa gold stroke
const A = '#8A1C14'; // sindoor accent

export function HandwovenIcon({ size = 52 }: { size?: number }) {
  return (
    <motion.svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52" width={size} height={size} fill="none" whileHover="hover">
      {/* Loom frame */}
      <rect x="8" y="8" width="36" height="36" rx="1" stroke={S} strokeWidth="1.2" opacity="0.5" />
      {/* Vertical warp threads */}
      {[14, 19, 24, 29, 34, 39].map((x) => (
        <line key={x} x1={x} y1="8" x2={x} y2="44" stroke={S} strokeWidth="0.6" opacity="0.4" />
      ))}
      {/* Horizontal weft — alternating weave pattern */}
      {[14, 18, 22, 26, 30, 34, 38].map((y, i) => (
        <line key={y} x1="8" y1={y} x2="44" y2={y} stroke={S} strokeWidth="1" opacity={i % 2 === 0 ? 0.7 : 0.35} />
      ))}
      {/* Shuttle */}
      <motion.g
        animate={{ x: [-2, 2, -2] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M10 28 Q26 24 42 28" stroke={A} strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
        <circle cx="42" cy="28" r="2.5" fill={A} opacity="0.7" />
      </motion.g>
    </motion.svg>
  );
}

export function ArtisanIcon({ size = 52 }: { size?: number }) {
  return (
    <motion.svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52" width={size} height={size} fill="none" whileHover="hover">
      {/* Left hand */}
      <motion.g animate={{ rotate: [0, -2, 0], originX: 0, originY: 1 }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
        <path d="M6 38 C6 34, 10 26, 14 24 L18 22 L20 28 C16 29, 14 32, 14 38 Z" stroke={S} strokeWidth="1" fill={S} fillOpacity="0.06" opacity="0.8" />
        <path d="M18 22 L20 14 M20 22 L22 13 M22 22 L24 14" stroke={S} strokeWidth="1" strokeLinecap="round" opacity="0.7" />
      </motion.g>
      {/* Right hand */}
      <motion.g animate={{ rotate: [0, 2, 0], originX: 1, originY: 1 }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}>
        <path d="M46 38 C46 34, 42 26, 38 24 L34 22 L32 28 C36 29, 38 32, 38 38 Z" stroke={S} strokeWidth="1" fill={S} fillOpacity="0.06" opacity="0.8" />
        <path d="M34 22 L32 14 M32 22 L30 13 M30 22 L28 14" stroke={S} strokeWidth="1" strokeLinecap="round" opacity="0.7" />
      </motion.g>
      
      <motion.g animate={{ y: [0, -2, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
        {/* Paisley / thread between hands */}
        <path d="M22 24 Q26 16 30 24" stroke={A} strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
        <circle cx="26" cy="18" r="2.5" fill={A} opacity="0.6" />
        {/* Small lotus at centre */}
        {[0, 60, 120, 180, 240, 300].map((deg, i) => {
          const r = (deg * Math.PI) / 180;
          const x = Number((26 + Math.cos(r) * 6).toFixed(4));
          const y = Number((34 + Math.sin(r) * 6).toFixed(4));
          return <circle key={i} cx={x} cy={y} r="1.2" fill={S} opacity="0.4" />;
        })}
        <circle cx="26" cy="34" r="2" fill={S} opacity="0.6" />
      </motion.g>
    </motion.svg>
  );
}

export function ConsciousIcon({ size = 52 }: { size?: number }) {
  return (
    <motion.svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52" width={size} height={size} fill="none" whileHover="hover">
      {/* Leaf / plant form — conscious/sustainable */}
      <path d="M26 44 C26 44, 26 24, 26 20" stroke={S} strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
      
      {/* Left leaf */}
      <motion.g animate={{ rotate: [0, -5, 0], originX: 0.5, originY: 1 }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
        <path d="M26 30 C26 30, 14 24, 12 14 C18 14, 26 20, 26 30 Z" fill={S} fillOpacity="0.12" stroke={S} strokeWidth="1" opacity="0.8" />
        <path d="M26 30 C22 25, 17 19, 14 14" stroke={S} strokeWidth="0.6" strokeLinecap="round" opacity="0.5" />
      </motion.g>

      {/* Right leaf */}
      <motion.g animate={{ rotate: [0, 5, 0], originX: 0.5, originY: 1 }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
        <path d="M26 24 C26 24, 38 18, 40 8 C34 8, 26 14, 26 24 Z" fill={S} fillOpacity="0.12" stroke={S} strokeWidth="1" opacity="0.8" />
        <path d="M26 24 C30 19, 35 13, 38 9" stroke={S} strokeWidth="0.6" strokeLinecap="round" opacity="0.5" />
      </motion.g>

      {/* Root dots */}
      <circle cx="22" cy="46" r="1.5" fill={S} opacity="0.4" />
      <circle cx="26" cy="47" r="1.5" fill={A} opacity="0.5" />
      <circle cx="30" cy="46" r="1.5" fill={S} opacity="0.4" />
    </motion.svg>
  );
}

export function HeritageIcon({ size = 52 }: { size?: number }) {
  return (
    <motion.svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52" width={size} height={size} fill="none" whileHover="hover">
      {/* Temple / mandap silhouette — heritage architecture */}
      <path d="M26 6 L36 18 L38 38 L14 38 L16 18 Z" fill={S} fillOpacity="0.07" stroke={S} strokeWidth="1" opacity="0.7" />
      {/* Tiered spire */}
      <path d="M26 6 L30 12 H22 Z" fill={S} opacity="0.5" />
      <path d="M22 12 H30 L32 18 H20 Z" fill={S} opacity="0.35" />
      {/* Columns */}
      <line x1="20" y1="24" x2="20" y2="38" stroke={S} strokeWidth="1.5" opacity="0.6" />
      <line x1="32" y1="24" x2="32" y2="38" stroke={S} strokeWidth="1.5" opacity="0.6" />
      
      {/* Central motif — lotus */}
      <motion.g animate={{ rotate: 360, originX: 0.5, originY: 0.5 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: '26px 30px' }}>
        {[0, 72, 144, 216, 288].map((deg, i) => {
          const r = (deg * Math.PI) / 180;
          const x = Number((26 + Math.cos(r) * 5).toFixed(4));
          const y = Number((30 + Math.sin(r) * 5).toFixed(4));
          return <ellipse key={i} cx={x} cy={y} rx="1.5" ry="3" transform={`rotate(${deg},${x},${y})`} fill={S} opacity="0.5" />;
        })}
        <circle cx="26" cy="30" r="2" fill={A} opacity="0.6" />
      </motion.g>

      {/* Base line */}
      <line x1="10" y1="38" x2="42" y2="38" stroke={S} strokeWidth="1" opacity="0.5" />
      {/* Ground dots — alpona style */}
      {[14, 20, 26, 32, 38].map((x, i) => (
        <motion.circle key={x} cx={x} cy="41" r="1" fill={S} opacity="0.3" animate={{ y: [0, -1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }} />
      ))}
    </motion.svg>
  );
}
