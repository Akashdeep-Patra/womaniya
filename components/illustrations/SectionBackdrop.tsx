/**
 * Abstract Bengali art-inspired SVG backdrops for homepage sections.
 * Non-repeating, large-scale compositions that feel editorial,
 * not tiled. Uses currentColor so they adapt to any theme.
 */

interface BackdropProps {
  className?: string;
}

/**
 * Jamdani Weave — scattered diamond lattice motifs with flowing curves.
 * Best on: Hero, FeaturedCollections
 */
export function JamdaniBackdrop({ className = '' }: BackdropProps) {
  return (
    <svg
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      viewBox="0 0 1440 900"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {/* Large diamond cluster — top right */}
      <path d="M1100 80L1140 160L1100 240L1060 160Z" stroke="currentColor" strokeWidth="0.8" opacity="0.06" />
      <path d="M1100 110L1120 160L1100 210L1080 160Z" stroke="currentColor" strokeWidth="0.5" opacity="0.04" />
      <circle cx="1100" cy="160" r="3" fill="currentColor" opacity="0.05" />

      {/* Flowing thread lines — top */}
      <path d="M0 120C200 100 400 180 600 140C800 100 1000 160 1200 120C1300 100 1400 130 1440 110" stroke="currentColor" strokeWidth="0.6" opacity="0.04" />
      <path d="M0 150C250 130 450 200 700 170C900 140 1100 190 1350 150" stroke="currentColor" strokeWidth="0.4" opacity="0.03" />

      {/* Small diamond scatter — left */}
      <path d="M120 400L140 440L120 480L100 440Z" stroke="currentColor" strokeWidth="0.6" opacity="0.05" />
      <circle cx="120" cy="440" r="2" fill="currentColor" opacity="0.04" />

      {/* Large concentric circles — center bottom */}
      <circle cx="720" cy="750" r="100" stroke="currentColor" strokeWidth="0.5" opacity="0.03" />
      <circle cx="720" cy="750" r="60" stroke="currentColor" strokeWidth="0.4" opacity="0.04" />
      <circle cx="720" cy="750" r="25" stroke="currentColor" strokeWidth="0.3" opacity="0.05" />

      {/* Diagonal thread — bottom left to mid */}
      <path d="M0 700C100 680 200 720 350 660C500 600 600 640 700 620" stroke="currentColor" strokeWidth="0.5" opacity="0.04" />

      {/* Small motifs — right edge */}
      <path d="M1350 500L1370 530L1350 560L1330 530Z" stroke="currentColor" strokeWidth="0.5" opacity="0.04" />
      <path d="M1380 350L1395 380L1380 410L1365 380Z" stroke="currentColor" strokeWidth="0.4" opacity="0.035" />

      {/* Paisley-like curve — bottom right */}
      <path d="M1200 800C1220 760 1280 740 1320 780C1340 800 1320 840 1280 850C1240 860 1210 840 1200 800Z" stroke="currentColor" strokeWidth="0.6" opacity="0.04" />

      {/* Scattered dots — like traditional alpona floor art dots */}
      <circle cx="300" cy="200" r="2" fill="currentColor" opacity="0.04" />
      <circle cx="500" cy="350" r="1.5" fill="currentColor" opacity="0.035" />
      <circle cx="900" cy="250" r="2" fill="currentColor" opacity="0.04" />
      <circle cx="200" cy="600" r="1.5" fill="currentColor" opacity="0.03" />
      <circle cx="1000" cy="550" r="2" fill="currentColor" opacity="0.035" />
      <circle cx="400" cy="700" r="1.5" fill="currentColor" opacity="0.03" />
    </svg>
  );
}

/**
 * Alpona Art — concentric rosettes, petal curves, and ritual geometry.
 * Best on: Features, About, Manifesto
 */
export function AlponaBackdrop({ className = '' }: BackdropProps) {
  return (
    <svg
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      viewBox="0 0 1440 800"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {/* Large rosette — top left */}
      <circle cx="150" cy="150" r="80" stroke="currentColor" strokeWidth="0.5" opacity="0.04" />
      <circle cx="150" cy="150" r="50" stroke="currentColor" strokeWidth="0.4" opacity="0.05" />
      <circle cx="150" cy="150" r="20" stroke="currentColor" strokeWidth="0.3" opacity="0.06" />
      {/* Petal cross */}
      <path d="M150 70C160 110 160 110 150 150C140 110 140 110 150 70Z" stroke="currentColor" strokeWidth="0.4" opacity="0.04" />
      <path d="M70 150C110 140 110 140 150 150C110 160 110 160 70 150Z" stroke="currentColor" strokeWidth="0.4" opacity="0.04" />

      {/* Wave line across */}
      <path d="M0 400C120 370 240 430 480 390C720 350 960 420 1200 380C1320 360 1440 400 1440 400" stroke="currentColor" strokeWidth="0.5" opacity="0.035" />

      {/* Diamond chain — right side */}
      <path d="M1250 200L1270 240L1250 280L1230 240Z" stroke="currentColor" strokeWidth="0.5" opacity="0.045" />
      <path d="M1250 300L1270 340L1250 380L1230 340Z" stroke="currentColor" strokeWidth="0.5" opacity="0.04" />
      <line x1="1250" y1="280" x2="1250" y2="300" stroke="currentColor" strokeWidth="0.3" opacity="0.035" />

      {/* Small rosette — bottom right */}
      <circle cx="1300" cy="650" r="40" stroke="currentColor" strokeWidth="0.4" opacity="0.035" />
      <circle cx="1300" cy="650" r="15" stroke="currentColor" strokeWidth="0.3" opacity="0.045" />

      {/* Stepped pyramid motif — bottom left */}
      <path d="M80 700L120 700L120 680L160 680L160 660L200 660" stroke="currentColor" strokeWidth="0.5" opacity="0.04" />
      <path d="M80 720L120 720L120 740L160 740L160 760L200 760" stroke="currentColor" strokeWidth="0.5" opacity="0.04" />

      {/* Scattered ritual dots */}
      <circle cx="500" cy="120" r="2" fill="currentColor" opacity="0.04" />
      <circle cx="800" cy="200" r="1.5" fill="currentColor" opacity="0.035" />
      <circle cx="600" cy="600" r="2" fill="currentColor" opacity="0.03" />
      <circle cx="1000" cy="450" r="1.5" fill="currentColor" opacity="0.04" />
      <circle cx="350" cy="500" r="2" fill="currentColor" opacity="0.035" />

      {/* Floating paisley — center */}
      <path d="M700 250C720 220 770 210 790 240C800 260 780 290 750 295C720 300 700 280 700 250Z" stroke="currentColor" strokeWidth="0.5" opacity="0.04" />
      <circle cx="740" cy="260" r="3" fill="currentColor" opacity="0.03" />
    </svg>
  );
}

/**
 * Kantha Stitch — flowing running-stitch lines with organic curves.
 * Best on: Manifesto, WhatsApp section, Testimonials
 */
export function KanthaBackdrop({ className = '' }: BackdropProps) {
  return (
    <svg
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      viewBox="0 0 1440 600"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {/* Running stitch lines — organic curves like hand-sewn thread */}
      <path
        d="M0 100 L20 100 M30 100 L50 100 M60 100 L80 100 M90 100 L110 100 M120 100 L140 100 M150 100 L170 100 M180 100 L200 100"
        stroke="currentColor" strokeWidth="0.8" opacity="0.05"
        transform="rotate(-2 100 100)"
      />
      <path
        d="M1240 80 L1260 80 M1270 80 L1290 80 M1300 80 L1320 80 M1330 80 L1350 80 M1360 80 L1380 80 M1390 80 L1410 80"
        stroke="currentColor" strokeWidth="0.8" opacity="0.04"
        transform="rotate(1 1300 80)"
      />

      {/* Sweeping curve — like a draped fabric edge */}
      <path d="M0 300C200 260 400 340 720 280C1040 220 1200 310 1440 270" stroke="currentColor" strokeWidth="0.6" opacity="0.04" />
      <path d="M0 320C200 280 400 360 720 300C1040 240 1200 330 1440 290" stroke="currentColor" strokeWidth="0.4" opacity="0.03" />

      {/* Stitch cluster — left side */}
      <path d="M100 450 L115 450 M125 450 L140 450 M150 450 L165 450" stroke="currentColor" strokeWidth="0.7" opacity="0.045" />
      <path d="M90 465 L105 465 M115 465 L130 465 M140 465 L155 465" stroke="currentColor" strokeWidth="0.7" opacity="0.04" />

      {/* Diamond accent */}
      <path d="M1100 400L1120 440L1100 480L1080 440Z" stroke="currentColor" strokeWidth="0.5" opacity="0.04" />

      {/* Dot scatter */}
      <circle cx="400" cy="150" r="2" fill="currentColor" opacity="0.04" />
      <circle cx="700" cy="450" r="1.5" fill="currentColor" opacity="0.035" />
      <circle cx="900" cy="180" r="2" fill="currentColor" opacity="0.03" />
      <circle cx="300" cy="400" r="1.5" fill="currentColor" opacity="0.04" />
      <circle cx="1200" cy="200" r="2" fill="currentColor" opacity="0.035" />
    </svg>
  );
}
