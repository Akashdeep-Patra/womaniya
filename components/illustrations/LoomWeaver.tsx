'use client';

import { motion } from 'framer-motion';

export function LoomWeaver({ className = '' }: { className?: string }) {
  // A serene, elegant character portrait of a Bengali female weaver.
  return (
    <div className={`relative w-full h-full flex items-center justify-center overflow-visible ${className}`}>
      <svg
        viewBox="0 0 500 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-contain drop-shadow-xl"
      >
        <g className="animate-float-medium" style={{ transformOrigin: 'center' }}>
          {/* Subtle warm backdrop */}
          <circle cx="250" cy="250" r="200" fill="#EAE1D8" opacity="0.8" />

          {/* Loom Threads (Abstract background element) */}
          <g opacity="0.3">
            {[...Array(20)].map((_, i) => (
              <path key={`thread-${i}`} d={`M ${100 + i * 15} 50 L ${100 + i * 15} 450`} stroke="#A86F45" strokeWidth="2" />
            ))}
          </g>

          {/* Saree Drape - Green (Handloom tone) */}
          <path d="M 80 400 C 80 280, 150 250, 200 250 C 300 250, 350 300, 380 450 L 380 600 L 80 600 Z" fill="#2D7A4F" />
          
          {/* Saree Gold Border */}
          <path d="M 90 400 C 90 290, 155 265, 200 265 C 290 265, 340 310, 365 450 L 365 600" fill="none" stroke="#C5A059" strokeWidth="8" />

          {/* Neck and Torso Blouse (Red) */}
          <path d="M 180 320 C 180 350, 250 350, 280 320 L 280 260 L 180 260 Z" fill="#8A1C14" />
          <path d="M 190 260 L 190 320 C 190 340, 240 340, 270 320 L 270 260 Z" fill="#C48B58" />

          {/* Hair (Tied up in a neat bun with a wooden hairpin) */}
          <path d="M 160 250 C 140 150, 200 80, 250 80 C 300 80, 360 150, 340 250 C 350 300, 330 350, 290 300 C 290 200, 210 200, 210 250 C 180 280, 170 300, 160 250 Z" fill="#1A1918" />
          {/* Hairpin */}
          <path d="M 330 220 L 370 190" stroke="#8A1C14" strokeWidth="4" strokeLinecap="round" />
          <circle cx="370" cy="190" r="4" fill="#C5A059" />

          {/* Face Base */}
          <path d="M 195 160 C 195 100, 305 100, 305 160 C 305 220, 270 270, 250 275 C 230 270, 195 220, 195 160 Z" fill="#C48B58" />
          
          {/* Eyebrows focused down on the loom */}
          <path d="M 210 170 Q 230 165, 245 175" fill="none" stroke="#1A1918" strokeWidth="4" strokeLinecap="round" />
          <path d="M 290 170 Q 270 165, 255 175" fill="none" stroke="#1A1918" strokeWidth="4" strokeLinecap="round" />

          {/* Eyes (Looking down, peaceful) */}
          <path d="M 210 190 Q 225 195, 240 190" fill="none" stroke="#1A1918" strokeWidth="3" strokeLinecap="round" />
          <path d="M 215 192 L 215 196 M 225 193 L 225 197 M 235 192 L 235 196" fill="none" stroke="#1A1918" strokeWidth="1.5" strokeLinecap="round" /> {/* Lashes */}

          <path d="M 290 190 Q 275 195, 260 190" fill="none" stroke="#1A1918" strokeWidth="3" strokeLinecap="round" />
          <path d="M 285 192 L 285 196 M 275 193 L 275 197 M 265 192 L 265 196" fill="none" stroke="#1A1918" strokeWidth="1.5" strokeLinecap="round" /> {/* Lashes */}

          {/* Bindi (Small, black) */}
          <circle cx="250" cy="165" r="4" fill="#1A1918" />

          {/* Nose Contour */}
          <path d="M 250 170 L 250 215 Q 250 220, 245 220" fill="none" stroke="#A86F45" strokeWidth="2" strokeLinecap="round" />
          
          {/* Lips (Subtle, focused) */}
          <path d="M 240 240 Q 250 238, 260 240" fill="none" stroke="#8A1C14" strokeWidth="3" strokeLinecap="round" />

          {/* Hands holding the shuttle (Front overlay) */}
          <path d="M 220 600 C 220 500, 180 450, 240 450 C 260 450, 260 480, 240 480 C 220 480, 240 600, 240 600 Z" fill="#C48B58" />
          <path d="M 280 600 C 280 500, 320 450, 260 450 C 240 450, 240 480, 260 480 C 280 480, 260 600, 260 600 Z" fill="#C48B58" />
          
          {/* The Shuttle (Maku) in hands */}
          <g className="animate-shuttle-fly">
            <path d="M 180 460 Q 250 440, 320 460 Q 250 480, 180 460 Z" fill="#8A1C14" />
            <circle cx="250" cy="460" r="5" fill="#C5A059" />
          </g>

        </g>
      </svg>
    </div>
  );
}