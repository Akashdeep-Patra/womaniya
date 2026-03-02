'use client';

import { motion } from 'framer-motion';

export function BengalVillage({ className = '' }: { className?: string }) {
  // A beautiful avatar of a village woman carrying a Kalash (water pot), side profile
  return (
    <div className={`relative w-full h-full flex items-center justify-center overflow-visible ${className}`}>
      <svg
        viewBox="0 0 500 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-contain drop-shadow-lg"
      >
        <g className="animate-float-slow" style={{ transformOrigin: 'center' }}>
          
          {/* Sun setting backdrop */}
          <circle cx="250" cy="300" r="180" fill="#E63946" opacity="0.1" />

          {/* Body/Saree Drape (White Tant saree with red border) */}
          <path d="M 150 600 C 150 400, 200 300, 250 300 C 300 300, 350 400, 350 600 Z" fill="#F9F6F0" />
          <path d="M 150 600 C 150 400, 200 300, 250 300 C 300 300, 350 400, 350 600" fill="none" stroke="#B3241C" strokeWidth="15" strokeLinecap="round" />

          {/* Profile Face (Right facing) */}
          <path d="M 230 200 C 230 150, 270 150, 270 200 C 270 230, 290 260, 280 280 C 260 300, 240 300, 240 280 C 220 260, 230 230, 230 200 Z" fill="#A86F45" />

          {/* Bindi (Profile) */}
          <ellipse cx="275" cy="195" rx="2" ry="5" fill="#8A1C14" />

          {/* Eye (Closed/Looking down) */}
          <path d="M 260 210 Q 265 208, 270 215" fill="none" stroke="#1A1918" strokeWidth="2.5" strokeLinecap="round" />

          {/* Hair Bun */}
          <circle cx="210" cy="200" r="35" fill="#1A1918" />
          <path d="M 230 150 C 210 150, 200 180, 230 200" fill="#1A1918" />

          {/* Kalash (Brass Pot) balanced on hip/waist */}
          <g transform="translate(140, 350)">
            <path d="M 30 0 C 80 0, 90 80, 50 100 C 10 80, 20 0, 30 0 Z" fill="#C5A059" />
            <path d="M 20 0 L 80 0 L 70 15 L 30 15 Z" fill="#8A1C14" />
            {/* Hand supporting pot */}
            <path d="M 80 80 C 90 60, 110 50, 140 80" fill="none" stroke="#A86F45" strokeWidth="14" strokeLinecap="round" />
            {/* Bangles */}
            <path d="M 125 65 L 115 80 M 120 60 L 110 75" fill="none" stroke="#F9F6F0" strokeWidth="4" />
          </g>

        </g>
      </svg>
    </div>
  );
}