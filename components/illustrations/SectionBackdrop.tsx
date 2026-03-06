/**
 * Scattered solid Bengali art artifacts as section backdrops.
 * Each shape is a recognizable motif from Bengali textile/floor art:
 * paisley (boteh), lotus petal, jamdani diamond, alpona dot cluster,
 * rice grain (dhaner shish), mango motif, leaf.
 *
 * Design: Clean solid fills at 4-8% opacity — visible, purposeful,
 * never busy. Inspired by shadcn's restraint + Bengali craft heritage.
 * Uses currentColor so they adapt to light/dark themes.
 */

interface BackdropProps {
  className?: string;
}

/**
 * Jamdani — scattered solid diamonds, paisleys, and rice grains.
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
      {/* ── Large jamdani diamond — top right ── */}
      <path
        d="M1120 40L1180 160L1120 280L1060 160Z"
        fill="currentColor" opacity="0.04"
      />

      {/* ── Paisley (boteh) — top left area ── */}
      <path
        d="M180 120C200 60 270 40 310 90C335 125 310 190 260 210C210 230 175 190 180 120Z"
        fill="currentColor" opacity="0.04"
        transform="rotate(-15 245 130)"
      />

      {/* ── Small diamond — left edge ── */}
      <path
        d="M60 420L90 480L60 540L30 480Z"
        fill="currentColor" opacity="0.05"
      />

      {/* ── Rice grain (dhaner shish) — scattered ── */}
      <ellipse cx="480" cy="180" rx="6" ry="20" fill="currentColor" opacity="0.05" transform="rotate(-30 480 180)" />
      <ellipse cx="920" cy="300" rx="5" ry="16" fill="currentColor" opacity="0.04" transform="rotate(20 920 300)" />
      <ellipse cx="350" cy="650" rx="5" ry="18" fill="currentColor" opacity="0.04" transform="rotate(-45 350 650)" />
      <ellipse cx="1300" cy="450" rx="6" ry="20" fill="currentColor" opacity="0.05" transform="rotate(35 1300 450)" />

      {/* ── Lotus petal — center right ── */}
      <path
        d="M1250 200Q1270 240 1250 300Q1230 240 1250 200Z"
        fill="currentColor" opacity="0.05"
        transform="rotate(15 1250 250)"
      />

      {/* ── Medium diamond — bottom center ── */}
      <path
        d="M700 720L740 800L700 880L660 800Z"
        fill="currentColor" opacity="0.035"
      />

      {/* ── Paisley — bottom right, larger ── */}
      <path
        d="M1200 700C1225 630 1310 610 1350 670C1375 710 1345 780 1290 800C1235 820 1195 780 1200 700Z"
        fill="currentColor" opacity="0.04"
        transform="rotate(10 1275 720)"
      />

      {/* ── Small lotus petal pair — mid left ── */}
      <path d="M100 600Q115 630 100 670Q85 630 100 600Z" fill="currentColor" opacity="0.05" />
      <path d="M120 610Q135 640 120 680Q105 640 120 610Z" fill="currentColor" opacity="0.04" transform="rotate(20 120 645)" />

      {/* ── Alpona dot clusters — groups of 3-5 dots ── */}
      <circle cx="600" cy="100" r="4" fill="currentColor" opacity="0.05" />
      <circle cx="614" cy="108" r="3" fill="currentColor" opacity="0.04" />
      <circle cx="605" cy="120" r="3.5" fill="currentColor" opacity="0.045" />

      <circle cx="1050" cy="550" r="3.5" fill="currentColor" opacity="0.05" />
      <circle cx="1065" cy="556" r="2.5" fill="currentColor" opacity="0.04" />
      <circle cx="1055" cy="568" r="3" fill="currentColor" opacity="0.04" />

      <circle cx="400" cy="450" r="3" fill="currentColor" opacity="0.04" />
      <circle cx="412" cy="443" r="2.5" fill="currentColor" opacity="0.035" />
      <circle cx="416" cy="458" r="2" fill="currentColor" opacity="0.04" />

      {/* ── Tiny scattered diamonds ── */}
      <path d="M800 180L810 200L800 220L790 200Z" fill="currentColor" opacity="0.04" />
      <path d="M300 340L308 356L300 372L292 356Z" fill="currentColor" opacity="0.04" />
      <path d="M1380 280L1388 296L1380 312L1372 296Z" fill="currentColor" opacity="0.04" />

      {/* ── Single accent dots ── */}
      <circle cx="550" cy="500" r="4" fill="currentColor" opacity="0.04" />
      <circle cx="850" cy="700" r="3" fill="currentColor" opacity="0.035" />
      <circle cx="200" cy="250" r="3.5" fill="currentColor" opacity="0.04" />
      <circle cx="1100" cy="150" r="3" fill="currentColor" opacity="0.04" />
    </svg>
  );
}

/**
 * Alpona — solid lotus rosettes, mango motifs, and ritual dot grids.
 * Best on: Features, About
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
      {/* ── Lotus rosette — top left, 6-petal flower ── */}
      <g opacity="0.05" transform="translate(120 120)">
        <path d="M0 -40Q12 -20 0 0Q-12 -20 0 -40Z" fill="currentColor" />
        <path d="M0 -40Q12 -20 0 0Q-12 -20 0 -40Z" fill="currentColor" transform="rotate(60)" />
        <path d="M0 -40Q12 -20 0 0Q-12 -20 0 -40Z" fill="currentColor" transform="rotate(120)" />
        <path d="M0 -40Q12 -20 0 0Q-12 -20 0 -40Z" fill="currentColor" transform="rotate(180)" />
        <path d="M0 -40Q12 -20 0 0Q-12 -20 0 -40Z" fill="currentColor" transform="rotate(240)" />
        <path d="M0 -40Q12 -20 0 0Q-12 -20 0 -40Z" fill="currentColor" transform="rotate(300)" />
        <circle cx="0" cy="0" r="6" fill="currentColor" />
      </g>

      {/* ── Mango motif (aam) — right side ── */}
      <path
        d="M1300 180C1315 130 1370 120 1395 160C1410 190 1390 240 1350 255C1310 270 1290 240 1300 180Z"
        fill="currentColor" opacity="0.04"
      />

      {/* ── Small lotus rosette — bottom right ── */}
      <g opacity="0.04" transform="translate(1320 650) scale(0.7)">
        <path d="M0 -40Q12 -20 0 0Q-12 -20 0 -40Z" fill="currentColor" />
        <path d="M0 -40Q12 -20 0 0Q-12 -20 0 -40Z" fill="currentColor" transform="rotate(60)" />
        <path d="M0 -40Q12 -20 0 0Q-12 -20 0 -40Z" fill="currentColor" transform="rotate(120)" />
        <path d="M0 -40Q12 -20 0 0Q-12 -20 0 -40Z" fill="currentColor" transform="rotate(180)" />
        <path d="M0 -40Q12 -20 0 0Q-12 -20 0 -40Z" fill="currentColor" transform="rotate(240)" />
        <path d="M0 -40Q12 -20 0 0Q-12 -20 0 -40Z" fill="currentColor" transform="rotate(300)" />
        <circle cx="0" cy="0" r="5" fill="currentColor" />
      </g>

      {/* ── Leaf — mid left ── */}
      <path
        d="M80 480C100 440 140 430 150 470C155 500 130 530 100 535C70 540 75 510 80 480Z"
        fill="currentColor" opacity="0.04"
        transform="rotate(-20 115 490)"
      />

      {/* ── Paisley — center area ── */}
      <path
        d="M720 220C745 160 820 140 855 195C875 230 850 300 800 318C750 336 715 296 720 220Z"
        fill="currentColor" opacity="0.035"
        transform="rotate(5 790 240)"
      />

      {/* ── Jamdani diamond — right edge ── */}
      <path
        d="M1280 380L1320 450L1280 520L1240 450Z"
        fill="currentColor" opacity="0.04"
      />

      {/* ── Scattered lotus petals — individual ── */}
      <path d="M500 80Q515 115 500 160Q485 115 500 80Z" fill="currentColor" opacity="0.05" transform="rotate(-10 500 120)" />
      <path d="M950 600Q962 630 950 670Q938 630 950 600Z" fill="currentColor" opacity="0.04" transform="rotate(15 950 635)" />
      <path d="M300 680Q310 700 300 730Q290 700 300 680Z" fill="currentColor" opacity="0.04" />

      {/* ── Rice grains ── */}
      <ellipse cx="600" cy="500" rx="5" ry="18" fill="currentColor" opacity="0.04" transform="rotate(-25 600 500)" />
      <ellipse cx="1100" cy="120" rx="5" ry="16" fill="currentColor" opacity="0.04" transform="rotate(40 1100 120)" />

      {/* ── Alpona dot grid — bottom left, ritual pattern ── */}
      <g opacity="0.05">
        <circle cx="80" cy="700" r="3" fill="currentColor" />
        <circle cx="100" cy="700" r="3" fill="currentColor" />
        <circle cx="120" cy="700" r="3" fill="currentColor" />
        <circle cx="80" cy="720" r="3" fill="currentColor" />
        <circle cx="100" cy="720" r="3" fill="currentColor" />
        <circle cx="120" cy="720" r="3" fill="currentColor" />
        <circle cx="80" cy="740" r="3" fill="currentColor" />
        <circle cx="100" cy="740" r="3" fill="currentColor" />
        <circle cx="120" cy="740" r="3" fill="currentColor" />
      </g>

      {/* ── Dot clusters ── */}
      <circle cx="420" cy="350" r="4" fill="currentColor" opacity="0.045" />
      <circle cx="434" cy="344" r="3" fill="currentColor" opacity="0.04" />
      <circle cx="428" cy="364" r="2.5" fill="currentColor" opacity="0.035" />

      <circle cx="850" cy="400" r="3.5" fill="currentColor" opacity="0.04" />
      <circle cx="862" cy="408" r="2.5" fill="currentColor" opacity="0.035" />

      {/* ── Single dots ── */}
      <circle cx="650" cy="650" r="3" fill="currentColor" opacity="0.04" />
      <circle cx="1150" cy="500" r="3.5" fill="currentColor" opacity="0.04" />
      <circle cx="380" cy="150" r="3" fill="currentColor" opacity="0.035" />
    </svg>
  );
}

/**
 * Kantha — solid leaf shapes, rice grains, and fish motifs.
 * Inspired by actual kantha quilt embroidery from rural Bengal.
 * Best on: Manifesto, WhatsApp, Testimonials
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
      {/* ── Twin fish (joy-mach) — top right, classic Bengali symbol ── */}
      <g opacity="0.045" transform="translate(1200 100) rotate(15)">
        <path d="M0 0C15 -20 45 -20 60 0C45 5 15 5 0 0Z" fill="currentColor" />

        <path d="M0 12C15 32 45 32 60 12C45 7 15 7 0 12Z" fill="currentColor" />
      </g>

      {/* ── Large paisley — top left ── */}
      <path
        d="M140 80C165 20 240 5 280 55C300 85 275 150 225 168C175 186 135 148 140 80Z"
        fill="currentColor" opacity="0.04"
        transform="rotate(-10 210 95)"
      />

      {/* ── Leaf cluster — left side ── */}
      <path
        d="M60 350C80 310 120 300 130 340C135 370 110 400 80 405C50 410 55 380 60 350Z"
        fill="currentColor" opacity="0.045"
        transform="rotate(-25 95 360)"
      />
      <path
        d="M100 380C115 350 145 345 150 375C153 395 135 415 112 418C90 420 95 400 100 380Z"
        fill="currentColor" opacity="0.035"
        transform="rotate(-15 125 385)"
      />

      {/* ── Lotus rosette — bottom right ── */}
      <g opacity="0.04" transform="translate(1300 480) scale(0.6)">
        <path d="M0 -40Q12 -20 0 0Q-12 -20 0 -40Z" fill="currentColor" />
        <path d="M0 -40Q12 -20 0 0Q-12 -20 0 -40Z" fill="currentColor" transform="rotate(72)" />
        <path d="M0 -40Q12 -20 0 0Q-12 -20 0 -40Z" fill="currentColor" transform="rotate(144)" />
        <path d="M0 -40Q12 -20 0 0Q-12 -20 0 -40Z" fill="currentColor" transform="rotate(216)" />
        <path d="M0 -40Q12 -20 0 0Q-12 -20 0 -40Z" fill="currentColor" transform="rotate(288)" />
        <circle cx="0" cy="0" r="5" fill="currentColor" />
      </g>

      {/* ── Diamond — center right ── */}
      <path
        d="M1050 250L1090 320L1050 390L1010 320Z"
        fill="currentColor" opacity="0.04"
      />

      {/* ── Mango motif — bottom left ── */}
      <path
        d="M250 450C268 400 330 388 355 425C370 450 350 500 310 515C270 530 245 500 250 450Z"
        fill="currentColor" opacity="0.04"
        transform="rotate(10 300 465)"
      />

      {/* ── Rice grains — scattered across ── */}
      <ellipse cx="500" cy="100" rx="5" ry="18" fill="currentColor" opacity="0.05" transform="rotate(-35 500 100)" />
      <ellipse cx="780" cy="450" rx="5" ry="16" fill="currentColor" opacity="0.04" transform="rotate(25 780 450)" />
      <ellipse cx="1380" cy="300" rx="5" ry="18" fill="currentColor" opacity="0.04" transform="rotate(-20 1380 300)" />
      <ellipse cx="650" cy="550" rx="4" ry="14" fill="currentColor" opacity="0.04" transform="rotate(40 650 550)" />

      {/* ── Individual lotus petals ── */}
      <path d="M900 80Q912 110 900 150Q888 110 900 80Z" fill="currentColor" opacity="0.045" transform="rotate(10 900 115)" />
      <path d="M450 480Q460 505 450 540Q440 505 450 480Z" fill="currentColor" opacity="0.04" transform="rotate(-15 450 510)" />

      {/* ── Dot clusters ── */}
      <circle cx="700" cy="150" r="4" fill="currentColor" opacity="0.05" />
      <circle cx="715" cy="155" r="3" fill="currentColor" opacity="0.04" />
      <circle cx="707" cy="168" r="3" fill="currentColor" opacity="0.04" />

      <circle cx="350" cy="200" r="3" fill="currentColor" opacity="0.04" />
      <circle cx="362" cy="195" r="2.5" fill="currentColor" opacity="0.035" />
      <circle cx="358" cy="212" r="2.5" fill="currentColor" opacity="0.04" />

      {/* ── Small diamond accents ── */}
      <path d="M580 280L590 300L580 320L570 300Z" fill="currentColor" opacity="0.04" />
      <path d="M1150 150L1160 170L1150 190L1140 170Z" fill="currentColor" opacity="0.04" />

      {/* ── Single dots ── */}
      <circle cx="850" cy="350" r="3.5" fill="currentColor" opacity="0.04" />
      <circle cx="200" cy="500" r="3" fill="currentColor" opacity="0.04" />
      <circle cx="1100" cy="500" r="3" fill="currentColor" opacity="0.035" />
      <circle cx="550" cy="300" r="4" fill="currentColor" opacity="0.04" />
    </svg>
  );
}
