'use client';

type LoomWeaverProps = {
  className?: string;
};

export function LoomWeaver({ className = '' }: LoomWeaverProps) {
  // A modern, elegant, sensual silhouette of a woman weaving
  return (
    <div className={`relative flex h-full w-full items-center justify-center overflow-visible ${className}`}>
      <svg
        viewBox="0 0 500 620"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full object-contain drop-shadow-[0_24px_34px_rgba(26,25,24,0.18)]"
        aria-hidden="true"
      >
        <g className="animate-folk-drift-soft origin-[55%_62%]">
          
          {/* Abstract, flowing background shape for depth */}
          <path d="M100 250C100 120, 250 50, 380 150C480 230, 480 400, 380 500C250 600, 80 550, 100 400Z" fill="#F8F3EB" opacity="0.5" />
          
          {/* Loom Threads - sleek, modern aesthetic */}
          <g opacity="0.6">
            <path d="M 120 100 L 120 500 M 160 100 L 160 500 M 200 100 L 200 500 M 240 100 L 240 500 M 280 100 L 280 500 M 320 100 L 320 500 M 360 100 L 360 500" stroke="#C5A059" strokeWidth="1.5" strokeDasharray="4 6" />
          </g>

          {/* Sensual female silhouette sitting/leaning into the loom */}
          {/* Flowing hair and back curve */}
          <path d="M 350 150 C 400 200, 450 350, 350 550 C 250 580, 200 550, 150 600 C 300 650, 480 550, 450 300 C 430 150, 380 120, 350 150 Z" fill="#1A1918" />
          
          {/* Slender neck, sharp profile, and shoulder */}
          <path d="M 320 180 C 300 160, 260 170, 240 200 C 220 230, 230 260, 250 280 C 270 300, 300 320, 280 380 C 250 450, 200 480, 150 500 C 120 510, 100 550, 120 600 C 200 550, 300 500, 330 400 C 350 350, 360 250, 320 180 Z" fill="#EAE1D8" />
          
          {/* Delicate hands weaving */}
          <path d="M 280 380 C 250 380, 200 350, 150 350 C 120 350, 100 380, 120 400 C 150 390, 200 380, 250 400 C 230 420, 180 430, 150 450 C 130 460, 120 490, 150 490 C 180 480, 250 430, 280 380 Z" fill="#D4C5B8" />
          <path d="M 120 350 C 100 350, 80 360, 90 380 C 100 370, 120 360, 140 370" fill="none" stroke="#D4C5B8" strokeWidth="4" strokeLinecap="round" />

          {/* Seductive lips and sharp nose silhouette */}
          <path d="M 240 200 C 230 210, 225 220, 235 225 C 230 230, 225 240, 240 235 Z" fill="#8A1C14" />
          
          {/* Flowing sari drape / garment lines */}
          <path d="M 330 400 C 280 450, 220 520, 150 580" fill="none" stroke="#2D7A4F" strokeWidth="8" strokeLinecap="round" />
          <path d="M 350 420 C 300 480, 250 540, 200 600" fill="none" stroke="#C5A059" strokeWidth="3" strokeLinecap="round" />
          
          {/* Abstract loom shuttle / magic glow at the fingertips */}
          <g className="animate-folk-glow">
            <circle cx="150" cy="400" r="15" fill="#FDF8F2" opacity="0.8" />
            <path d="M 130 400 L 170 400 M 150 380 L 150 420" stroke="#C5A059" strokeWidth="2" strokeLinecap="round" />
            <circle cx="150" cy="400" r="4" fill="#8A1C14" />
          </g>

          {/* Delicate Zari thread interlacing */}
          <g className="animate-folk-weave">
            <path d="M 100 380 C 150 360, 200 420, 250 380" fill="none" stroke="#C5A059" strokeWidth="4" strokeLinecap="round" />
            <path d="M 120 420 C 170 400, 220 460, 270 420" fill="none" stroke="#8A1C14" strokeWidth="2" strokeLinecap="round" />
          </g>
          
        </g>
      </svg>
    </div>
  );
}