'use client';

import { motion } from 'framer-motion';

export function BengalWomanHero({ className = '' }: { className?: string }) {
  // A highly aesthetic, refined character-driven avatar of a Bengali woman
  // Focused on elegance, modern aesthetics, and traditional motifs (bindi, saree, jewelry)
  // No random floating objects, just a solid, beautiful character illustration.
  return (
    <div className={`relative w-full h-full flex items-center justify-center overflow-visible ${className}`}>
      <svg
        viewBox="0 0 500 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-contain drop-shadow-2xl"
      >
        <g className="animate-float-slow" style={{ transformOrigin: 'center' }}>
          {/* Main Backdrop - subtle arch highlighting the character */}
          <path d="M 50 600 L 50 250 C 50 100, 450 100, 450 250 L 450 600 Z" fill="#EAE1D8" opacity="0.6" />

          {/* Saree Back Drape / Pallu over shoulder */}
          <path d="M 120 380 C 120 280, 180 250, 250 250 C 320 250, 380 280, 380 380 L 380 600 L 120 600 Z" fill="#B3241C" />
          
          {/* Saree Gold Zari Border on the back drape */}
          <path d="M 130 380 C 130 290, 185 265, 250 265 C 315 265, 370 290, 370 380 L 370 600 L 130 600 Z" fill="none" stroke="#C5A059" strokeWidth="6" strokeDasharray="12 6" />

          {/* Neck and Shoulders */}
          <path d="M 210 250 L 210 320 C 210 350, 290 350, 290 320 L 290 250 Z" fill="#C48B58" />
          <path d="M 170 320 C 170 300, 210 280, 250 280 C 290 280, 330 300, 330 320 C 330 360, 250 380, 170 320 Z" fill="#A86F45" opacity="0.4" />
          
          {/* Collarbone highlights */}
          <path d="M 180 325 Q 210 340, 240 330" fill="none" stroke="#A86F45" strokeWidth="2" strokeLinecap="round" />
          <path d="M 320 325 Q 290 340, 260 330" fill="none" stroke="#A86F45" strokeWidth="2" strokeLinecap="round" />

          {/* Torso / Saree Blouse */}
          <path d="M 150 340 C 200 360, 300 360, 350 340 L 360 600 C 300 650, 200 650, 140 600 Z" fill="#1A1918" />
          <path d="M 150 340 C 200 360, 300 360, 350 340" fill="none" stroke="#C5A059" strokeWidth="4" />

          {/* Front Saree Drape */}
          <path d="M 140 600 L 180 345 C 220 400, 300 450, 360 600 Z" fill="#F9F6F0" opacity="0.95" />
          <path d="M 140 600 L 180 345 C 220 400, 300 450, 360 600 Z" fill="none" stroke="#8A1C14" strokeWidth="12" />
          <path d="M 155 600 L 188 360 C 225 410, 290 450, 345 600" fill="none" stroke="#C5A059" strokeWidth="3" strokeDasharray="8 4" />

          {/* Heavy Gold Necklace (Choker + Rani Haar) */}
          <path d="M 210 320 C 230 340, 270 340, 290 320" fill="none" stroke="#C5A059" strokeWidth="14" strokeLinecap="round" />
          <path d="M 210 320 C 230 340, 270 340, 290 320" fill="none" stroke="#8A1C14" strokeWidth="4" strokeDasharray="4 4" strokeLinecap="round" />
          
          <path d="M 190 330 C 220 420, 280 420, 310 330" fill="none" stroke="#C5A059" strokeWidth="6" strokeLinecap="round" />
          <circle cx="250" cy="400" r="16" fill="#C5A059" />
          <circle cx="250" cy="400" r="8" fill="#8A1C14" />
          <path d="M 250 416 L 250 430 M 240 412 L 235 425 M 260 412 L 265 425" fill="none" stroke="#C5A059" strokeWidth="3" strokeLinecap="round" />

          {/* Hair (Voluminous, elegant dark hair) */}
          <path d="M 160 250 C 140 150, 200 80, 250 80 C 300 80, 360 150, 340 250 C 370 350, 360 450, 340 500 C 320 400, 320 300, 290 250 C 290 200, 210 200, 210 250 C 180 300, 180 400, 160 500 C 140 450, 130 350, 160 250 Z" fill="#1A1918" />

          {/* Face Base */}
          <path d="M 195 160 C 195 100, 305 100, 305 160 C 305 220, 270 270, 250 275 C 230 270, 195 220, 195 160 Z" fill="#C48B58" />
          
          {/* Face Contour Highlights */}
          <path d="M 195 160 C 195 220, 230 270, 250 275 C 270 270, 305 220, 305 160" fill="none" stroke="#A86F45" strokeWidth="4" />

          {/* Eyebrows (Thick, expressive, very Bengali) */}
          <path d="M 210 165 Q 230 155, 245 165" fill="none" stroke="#1A1918" strokeWidth="4" strokeLinecap="round" />
          <path d="M 290 165 Q 270 155, 255 165" fill="none" stroke="#1A1918" strokeWidth="4" strokeLinecap="round" />

          {/* Eyes (Large, almond shaped, kajal-lined) */}
          <path d="M 210 185 Q 225 175, 240 185 Q 225 190, 210 185" fill="#F9F6F0" />
          <path d="M 210 185 Q 225 175, 240 185" fill="none" stroke="#1A1918" strokeWidth="3" strokeLinecap="round" />
          <path d="M 210 185 C 205 185, 200 188, 195 192" fill="none" stroke="#1A1918" strokeWidth="2.5" strokeLinecap="round" /> {/* Winged liner */}
          <circle cx="225" cy="183" r="5" fill="#1A1918" />
          <circle cx="227" cy="181" r="1.5" fill="#F9F6F0" />

          <path d="M 290 185 Q 275 175, 260 185 Q 275 190, 290 185" fill="#F9F6F0" />
          <path d="M 290 185 Q 275 175, 260 185" fill="none" stroke="#1A1918" strokeWidth="3" strokeLinecap="round" />
          <path d="M 290 185 C 295 185, 300 188, 305 192" fill="none" stroke="#1A1918" strokeWidth="2.5" strokeLinecap="round" /> {/* Winged liner */}
          <circle cx="275" cy="183" r="5" fill="#1A1918" />
          <circle cx="273" cy="181" r="1.5" fill="#F9F6F0" />

          {/* The Big Red Bindi */}
          <circle cx="250" cy="165" r="10" fill="#8A1C14" />
          
          {/* Subtle Sandalwood dots above bindi (Chandan) */}
          <circle cx="250" cy="148" r="2" fill="#FDF8F2" />
          <circle cx="240" cy="151" r="1.5" fill="#FDF8F2" />
          <circle cx="260" cy="151" r="1.5" fill="#FDF8F2" />
          <circle cx="230" cy="156" r="1.5" fill="#FDF8F2" />
          <circle cx="270" cy="156" r="1.5" fill="#FDF8F2" />

          {/* Nose Contour */}
          <path d="M 250 165 L 250 215 Q 250 220, 245 220 M 255 218 Q 250 222, 245 220" fill="none" stroke="#A86F45" strokeWidth="2" strokeLinecap="round" />
          
          {/* Traditional Nath (Nose Ring) */}
          <circle cx="258" cy="215" r="12" fill="none" stroke="#C5A059" strokeWidth="1.5" />
          <circle cx="268" cy="222" r="2" fill="#E63946" />
          <path d="M 268 222 Q 285 200, 300 205" fill="none" stroke="#C5A059" strokeWidth="1" strokeDasharray="3 2" />

          {/* Lips (Full, deep red) */}
          <path d="M 235 240 Q 250 230, 265 240 Q 250 248, 235 240 Z" fill="#8A1C14" />
          <path d="M 235 240 Q 250 235, 265 240" fill="none" stroke="#5C100A" strokeWidth="1.5" strokeLinecap="round" />

          {/* Ears & Heavy Jhumka (Earrings) */}
          <path d="M 195 180 C 185 180, 185 210, 195 210" fill="#C48B58" />
          <path d="M 305 180 C 315 180, 315 210, 305 210" fill="#C48B58" />
          
          <g transform="translate(190, 210)">
            <path d="M 0 0 L -10 20 L 10 20 Z" fill="#C5A059" />
            <circle cx="0" cy="25" r="8" fill="#C5A059" />
            <circle cx="0" cy="25" r="4" fill="#8A1C14" />
            <path d="M -8 30 L -8 40 M 0 33 L 0 45 M 8 30 L 8 40" fill="none" stroke="#C5A059" strokeWidth="2" strokeLinecap="round" />
          </g>

          <g transform="translate(310, 210)">
            <path d="M 0 0 L -10 20 L 10 20 Z" fill="#C5A059" />
            <circle cx="0" cy="25" r="8" fill="#C5A059" />
            <circle cx="0" cy="25" r="4" fill="#8A1C14" />
            <path d="M -8 30 L -8 40 M 0 33 L 0 45 M 8 30 L 8 40" fill="none" stroke="#C5A059" strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* Hair adornment (Gajra/Flowers on the side) */}
          <g transform="translate(150, 180) rotate(-20)">
            {[...Array(6)].map((_, i) => (
              <circle key={i} cx={0} cy={i * 12} r="8" fill="#FDF8F2" />
            ))}
            {[...Array(6)].map((_, i) => (
              <circle key={i} cx={0} cy={i * 12} r="4" fill="#EAE1D8" />
            ))}
          </g>

        </g>
      </svg>
    </div>
  );
}