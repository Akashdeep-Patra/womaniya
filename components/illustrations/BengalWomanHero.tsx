'use client';

import { motion } from 'framer-motion';

export function BengalWomanHero({ className = '' }: { className?: string }) {
  return (
    <div className={`relative w-full h-full flex items-center justify-center overflow-visible ${className}`}>
      <motion.svg
        viewBox="0 0 500 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-contain drop-shadow-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        {/* Abstract organic background shape replacing the box */}
        <path 
          d="M 50 300 C 80 450, 350 550, 420 400 C 490 250, 380 50, 250 80 C 120 110, 20 150, 50 300 Z" 
          fill="#EAE1D8" 
          opacity="0.5"
          className="animate-bg-breathe"
        />

        {/* Floating Sun/Aura */}
        <circle cx="350" cy="200" r="120" fill="#C5A059" opacity="0.15" />

        {/* Woman Figure Composition */}
        <g className="animate-float-slow">
          {/* Back Hair (Khopa/Bun) */}
          <path d="M 180 120 C 240 100, 280 130, 290 190 C 300 250, 260 300, 200 290 C 150 280, 130 200, 180 120 Z" fill="#1A1918" />
          
          {/* Elegant Gajra (Jasmine garland in hair) */}
          {[...Array(8)].map((_, i) => (
            <circle key={`gajra-${i}`} cx={250 + Math.cos(i) * 35} cy={160 + Math.sin(i) * 35} r="6" fill="#FDF8F2" />
          ))}

          {/* Neck and Jawline */}
          <path d="M 190 200 C 220 220, 230 250, 220 280 L 160 290 C 150 250, 160 210, 190 200 Z" fill="#A86F45" />
          <path d="M 170 150 C 210 140, 240 160, 240 210 C 240 240, 210 260, 180 250 C 150 240, 140 190, 170 150 Z" fill="#C48B58" />

          {/* Profile Details (Eye, Bindi, Lips) */}
          <circle cx="180" cy="180" r="3.5" fill="#8A1C14" /> {/* Bindi */}
          <path d="M 200 195 Q 215 190, 220 195" stroke="#1A1918" strokeWidth="2" strokeLinecap="round" fill="none" /> {/* Eye */}
          <path d="M 218 195 Q 212 198, 205 198" stroke="#1A1918" strokeWidth="1.5" strokeLinecap="round" fill="none" /> {/* Lower Eye */}
          <circle cx="210" cy="196" r="2" fill="#1A1918" /> {/* Pupil */}
          <path d="M 195 180 Q 210 175, 225 185" stroke="#1A1918" strokeWidth="2" strokeLinecap="round" fill="none" /> {/* Eyebrow */}
          <path d="M 215 225 Q 220 220, 225 225 Q 220 230, 215 225" fill="#8A1C14" /> {/* Lips */}

          {/* Traditional Nath (Nose Ring) */}
          <circle cx="225" cy="210" r="10" stroke="#C5A059" strokeWidth="1.5" fill="none" />
          <circle cx="235" cy="210" r="2" fill="#E63946" />

          {/* Saree Drape - Pallu (Ghomta over head) */}
          <path d="M 150 120 C 200 80, 280 130, 260 220 C 250 280, 200 320, 120 320 C 100 250, 110 160, 150 120 Z" fill="#F9F6F0" opacity="0.95" />
          
          {/* Laal Paar (Red Border) of the Saree Pallu */}
          <path d="M 145 115 C 205 70, 290 125, 265 225 C 255 290, 200 330, 115 330" stroke="#8A1C14" strokeWidth="14" fill="none" strokeLinecap="round" />
          <path d="M 135 105 C 215 50, 310 115, 275 235 C 265 300, 200 345, 110 345" stroke="#C5A059" strokeWidth="4" fill="none" strokeDasharray="6 6" strokeLinecap="round" />

          {/* Torso & Main Saree Body */}
          <path d="M 100 290 C 180 270, 280 290, 300 400 C 320 500, 280 650, 150 650 C 50 650, 60 400, 100 290 Z" fill="#F9F6F0" />
          
          {/* Saree Folds (Kuchi) */}
          <path d="M 150 400 Q 170 500, 160 650 M 180 410 Q 200 500, 190 650 M 210 420 Q 230 500, 220 650 M 240 430 Q 260 500, 250 650" stroke="#EAE1D8" strokeWidth="4" fill="none" />
          
          {/* Red Border on Torso */}
          <path d="M 100 290 C 160 350, 220 400, 280 650" stroke="#8A1C14" strokeWidth="16" fill="none" />
          <path d="M 85 280 C 155 345, 205 390, 265 650" stroke="#C5A059" strokeWidth="4" fill="none" strokeDasharray="8 6" />

          {/* Elegant Hand & Arm */}
          <path d="M 230 280 C 280 320, 310 380, 280 480" stroke="#C48B58" strokeWidth="22" strokeLinecap="round" fill="none" />
          
          {/* Shankha Pola (Traditional Red & White Bangles) */}
          <g transform="translate(290, 420) rotate(-15)">
            <rect x="-15" y="0" width="30" height="6" fill="#F9F6F0" rx="3" />
            <rect x="-16" y="8" width="32" height="6" fill="#8A1C14" rx="3" />
            <rect x="-15" y="16" width="30" height="6" fill="#F9F6F0" rx="3" />
            <rect x="-14" y="24" width="28" height="4" fill="#C5A059" rx="2" />
          </g>

          {/* Hand holding a Lotus */}
          <g 
            transform="translate(265, 480)"
            className="animate-sway-slow"
          >
            <path d="M 0 0 C -20 -30, -5 -50, 15 -50 C 35 -50, 50 -30, 30 0 Z" fill="#8A1C14" opacity="0.9" />
            <path d="M 15 0 C -5 -20, 5 -40, 15 -45 C 25 -40, 35 -20, 15 0 Z" fill="#E63946" />
            <path d="M 15 0 C 10 -15, 12 -25, 15 -30 C 18 -25, 20 -15, 15 0 Z" fill="#C5A059" />
          </g>

          {/* Heavy Gold Necklace (Sita Haar) */}
          <path d="M 150 260 C 180 320, 220 320, 250 260" stroke="#C5A059" strokeWidth="8" fill="none" strokeLinecap="round" />
          <path d="M 160 270 C 190 350, 230 350, 240 270" stroke="#C5A059" strokeWidth="4" fill="none" strokeLinecap="round" />
          <circle cx="202" cy="335" r="8" fill="#8A1C14" />
          <circle cx="202" cy="335" r="10" stroke="#C5A059" strokeWidth="2" fill="none" />
        </g>

        {/* Floating Lotus Petals */}
        <g className="animate-float-medium" style={{ transformOrigin: 'center' }}>
          {[
            { x: 100, y: 150 },
            { x: 400, y: 250 },
            { x: 350, y: 500 },
            { x: 80, y: 450 },
            { x: 450, y: 100 }
          ].map((p, i) => (
            <motion.path
              key={`petal-${i}`}
              d="M 0 0 C -15 -20, 0 -35, 15 -20 C 10 -5, 5 -2, 0 0 Z"
              fill="#8A1C14"
              opacity="0.6"
              initial={{ x: p.x, y: p.y, opacity: 0, scale: 0 }}
              animate={{ x: p.x, y: p.y, opacity: 0.6, scale: 1 }}
              transition={{ duration: 1.5, delay: 0.5 + i * 0.2 }}
            />
          ))}
        </g>
      </motion.svg>
    </div>
  );
}