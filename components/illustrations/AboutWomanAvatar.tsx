'use client';

import { motion } from 'framer-motion';

export function AboutWomanAvatar({ className = '' }: { className?: string }) {
  // A serene, elegant portrait of a woman looking sideways
  // Highlighting traditional adornments: Alta on hands, heavy gold earrings
  return (
    <div className={`relative w-full h-full flex items-center justify-center overflow-visible ${className}`}>
      <svg
        viewBox="0 0 500 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-contain"
      >
        <g className="animate-float-slow" style={{ transformOrigin: 'center' }}>
          
          {/* Saree Drape Covering Head (Ghomta) */}
          <path d="M 50 450 C 50 200, 150 50, 250 50 C 350 50, 450 200, 450 450 L 450 600 L 50 600 Z" fill="#B3241C" />
          
          {/* Inner shade / Hair under veil */}
          <path d="M 120 400 C 120 200, 180 120, 250 120 C 320 120, 380 200, 380 400 L 380 600 L 120 600 Z" fill="#1A1918" />

          {/* Saree Gold Zari border framing the face */}
          <path d="M 100 450 C 100 200, 180 80, 250 80 C 320 80, 400 200, 400 450 L 400 600" fill="none" stroke="#C5A059" strokeWidth="12" strokeLinecap="round" />
          <path d="M 115 450 C 115 210, 190 95, 250 95 C 310 95, 385 210, 385 450 L 385 600" fill="none" stroke="#F9F6F0" strokeWidth="4" strokeDasharray="6 6" strokeLinecap="round" />

          {/* Face Base (Profile looking left) */}
          <path d="M 280 180 C 280 180, 230 180, 190 220 C 160 250, 150 290, 170 330 C 190 370, 220 380, 240 400 C 250 410, 260 450, 260 450 L 330 450 L 330 180 Z" fill="#C48B58" />

          {/* Profile Details (Forehead, Nose, Lips, Chin) */}
          <path d="M 230 180 C 210 180, 180 200, 180 230 C 180 240, 185 250, 190 260 C 170 280, 140 320, 160 340 C 165 345, 175 340, 180 345 C 180 355, 175 365, 185 375 C 195 385, 220 380, 230 400" fill="none" stroke="#C48B58" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

          {/* Neck and Torso */}
          <path d="M 220 380 C 220 450, 180 500, 150 600 L 350 600 C 350 500, 320 450, 320 380 Z" fill="#A86F45" />

          {/* Closed Eye with Kajal */}
          <path d="M 200 240 C 210 235, 230 235, 240 245" fill="none" stroke="#1A1918" strokeWidth="3" strokeLinecap="round" />
          <path d="M 200 240 C 195 242, 190 245, 185 250" fill="none" stroke="#1A1918" strokeWidth="2" strokeLinecap="round" /> {/* Lash */}

          {/* Eyebrow */}
          <path d="M 195 220 C 210 210, 230 215, 245 225" fill="none" stroke="#1A1918" strokeWidth="4" strokeLinecap="round" />

          {/* Large Bindi seen from side */}
          <ellipse cx="185" cy="225" rx="3" ry="8" fill="#8A1C14" transform="rotate(15 185 225)" />

          {/* Lips (Red) */}
          <path d="M 175 340 C 185 338, 190 340, 195 342 C 190 345, 185 348, 175 345 Z" fill="#8A1C14" />

          {/* Heavy Jhumka (Earring) */}
          <g transform="translate(260, 270)">
            <path d="M 0 0 C 10 0, 20 10, 15 20 L -5 20 C -10 10, -10 0, 0 0 Z" fill="#C5A059" />
            <circle cx="5" cy="25" r="10" fill="#C5A059" />
            <circle cx="5" cy="25" r="5" fill="#8A1C14" />
            <path d="M -5 32 L -5 45 M 5 35 L 5 48 M 15 32 L 15 45" fill="none" stroke="#C5A059" strokeWidth="2.5" strokeLinecap="round" />
          </g>

          {/* Necklace */}
          <path d="M 200 400 C 230 420, 270 420, 300 400" fill="none" stroke="#C5A059" strokeWidth="12" strokeLinecap="round" />
          <path d="M 205 405 C 230 420, 270 420, 295 405" fill="none" stroke="#8A1C14" strokeWidth="3" strokeDasharray="4 4" strokeLinecap="round" />

          {/* Elegant Hand crossing over with Alta */}
          <path d="M 50 600 C 100 500, 200 480, 250 520 C 270 540, 270 570, 250 590 L 250 600 Z" fill="#C48B58" />
          {/* Alta (Red Dye) on fingertips and palm */}
          <path d="M 230 500 C 250 490, 270 510, 260 530 C 240 510, 230 500, 230 500 Z" fill="#B3241C" opacity="0.8" />
          <circle cx="235" cy="545" r="12" fill="#B3241C" opacity="0.8" />
          
          {/* Bangles (Shankha Pola) */}
          <g transform="translate(130, 520) rotate(-40)">
            <rect x="-10" y="0" width="35" height="8" fill="#F9F6F0" rx="3" />
            <rect x="-12" y="10" width="39" height="8" fill="#8A1C14" rx="3" />
            <rect x="-10" y="20" width="35" height="8" fill="#F9F6F0" rx="3" />
            <rect x="-8" y="30" width="31" height="6" fill="#C5A059" rx="2" />
          </g>

        </g>
      </svg>
    </div>
  );
}