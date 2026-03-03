'use client';

type BengalVillageProps = {
  className?: string;
};

export function BengalVillage({ className = '' }: BengalVillageProps) {
  // A modern, elegant, aesthetic floral and abstract architectural motif
  // Representing the Bengal roots but in a very sensual, stylized manner
  return (
    <div className={`relative flex h-full w-full items-center justify-center overflow-visible ${className}`}>
      <svg
        viewBox="0 0 500 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full object-contain drop-shadow-[0_18px_28px_rgba(26,25,24,0.14)]"
        aria-hidden="true"
      >
        <g className="animate-folk-drift-soft origin-[50%_58%]">
          
          {/* Sensual fluid background drop */}
          <path d="M250 100 C 400 100, 450 250, 400 400 C 350 550, 150 550, 100 400 C 50 250, 100 100, 250 100 Z" fill="#F8F3EB" opacity="0.4" />
          
          {/* Abstract floral / lotus blooming, elegant sharp petals */}
          <g className="animate-folk-glow">
            <path d="M 250 450 C 200 400, 150 300, 250 200 C 350 300, 300 400, 250 450 Z" fill="#EAE1D8" stroke="#C5A059" strokeWidth="2" />
            <path d="M 250 450 C 150 420, 100 350, 180 250 C 220 300, 200 400, 250 450 Z" fill="#D4C5B8" />
            <path d="M 250 450 C 350 420, 400 350, 320 250 C 280 300, 300 400, 250 450 Z" fill="#D4C5B8" />
            <path d="M 250 420 C 220 380, 200 320, 250 260 C 300 320, 280 380, 250 420 Z" fill="#C5A059" opacity="0.3" />
          </g>

          {/* Flowing river or drape lines, very elegant and sweeping */}
          <path d="M 80 480 C 150 420, 300 500, 420 400" fill="none" stroke="#2D7A4F" strokeWidth="4" strokeLinecap="round" />
          <path d="M 120 520 C 200 480, 350 540, 450 460" fill="none" stroke="#C5A059" strokeWidth="2" strokeLinecap="round" strokeDasharray="6 8" />

          {/* A sharp, beautiful temple archway or village roofline abstraction */}
          <path d="M 180 250 C 220 180, 250 100, 250 100 C 250 100, 280 180, 320 250" fill="none" stroke="#1A1918" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 220 230 L 250 150 L 280 230" fill="none" stroke="#C5A059" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          
          {/* Central jewel / bindi element */}
          <circle cx="250" cy="350" r="8" fill="#8A1C14" />
          
          {/* Sweeping accent lines (like blowing wind or hair) */}
          <path d="M 320 150 C 380 180, 420 250, 380 320" fill="none" stroke="#1A1918" strokeWidth="3" strokeLinecap="round" />
          <path d="M 180 150 C 120 180, 80 250, 120 320" fill="none" stroke="#1A1918" strokeWidth="3" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}