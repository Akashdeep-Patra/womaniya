/**
 * Scattered solid Bengali art artifacts as section backdrops.
 * Each shape is a recognizable motif from Bengali textile/floor art:
 * paisley (boteh), lotus petal, jamdani diamond, alpona dot cluster,
 * rice grain (dhaner shish), mango motif, leaf.
 *
 * Design: Clean solid fills at 2-5% opacity — visible, purposeful,
 * never busy. Inspired by shadcn's restraint + Bengali craft heritage.
 * Uses currentColor so they adapt to light/dark themes.
 */

interface BackdropProps {
  className?: string;
}

/**
 * JamdaniBackdrop — "Durga Puja Pandal Skyline"
 * A silhouetted cityscape/skyline of Durga Puja pandals.
 * Rendered in a highly detailed terracotta / Daker Saaj folk art style.
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
      {/* ── Background Layer (2-3% opacity): Night Sky Elements ── */}
      {/* Crescent Moon with detailed filigree inner pattern */}
      <g opacity="0.02" fill="currentColor">
        <path d="M1200 150 C 1170 150 1150 170 1150 200 C 1150 240 1180 270 1220 270 C 1220 270 1190 240 1190 200 C 1190 170 1200 150 1200 150 Z" />
        <circle cx="1185" cy="210" r="2" fill="#000" />
        <circle cx="1195" cy="230" r="2" fill="#000" />
        <circle cx="1175" cy="180" r="2" fill="#000" />
      </g>
      
      {/* Scattered Shiuli Flowers (highly detailed 5-petal clusters) */}
      <g opacity="0.025" fill="currentColor">
        <path d="M200 200 C 190 190 200 180 200 180 C 200 180 210 190 200 200 Z M 200 200 C 210 210 220 200 220 200 C 220 200 210 190 200 200 Z M 200 200 C 190 210 200 220 200 220 C 200 220 210 210 200 200 Z M 200 200 C 180 200 190 210 190 210 C 190 210 190 190 200 200 Z M 200 200 C 220 200 210 190 210 190 C 210 190 210 210 200 200 Z" />
        <path d="M400 120 C 390 110 400 100 400 100 C 400 100 410 110 400 120 Z M 400 120 C 410 130 420 120 420 120 C 420 120 410 110 400 120 Z M 400 120 C 390 130 400 140 400 140 C 400 140 410 130 400 120 Z M 400 120 C 380 120 390 130 390 130 C 390 130 390 110 400 120 Z M 400 120 C 420 120 410 110 410 110 C 410 110 410 130 400 120 Z" />
        <path d="M850 180 C 840 170 850 160 850 160 C 850 160 860 170 850 180 Z M 850 180 C 860 190 870 180 870 180 C 870 180 860 170 850 180 Z M 850 180 C 840 190 850 200 850 200 C 850 200 860 190 850 180 Z M 850 180 C 830 180 840 190 840 190 C 840 190 840 170 850 180 Z M 850 180 C 870 180 860 170 860 170 C 860 170 860 190 850 180 Z" />
        <path d="M1300 350 C 1290 340 1300 330 1300 330 C 1300 330 1310 340 1300 350 Z M 1300 350 C 1310 360 1320 350 1320 350 C 1320 350 1310 340 1300 350 Z M 1300 350 C 1290 360 1300 370 1300 370 C 1300 370 1310 360 1300 350 Z M 1300 350 C 1280 350 1290 360 1290 360 C 1290 360 1290 340 1300 350 Z M 1300 350 C 1320 350 1310 340 1310 340 C 1310 340 1310 360 1300 350 Z" />
      </g>

      {/* ── Mid-Ground Layer (3.5-4% opacity): Detailed Torans & Pandal Spires ── */}
      {/* Hanging Torans with intricate mango/lotus drops */}
      <path d="M0 0 Q 120 100 240 0 Q 360 100 480 0 Q 600 100 720 0 Q 840 100 960 0 Q 1080 100 1200 0 Q 1320 100 1440 0" stroke="currentColor" strokeWidth="3" opacity="0.035" fill="none" />
      <g opacity="0.035" fill="currentColor">
        {/* Intricate Toran drops (mango/kalka shapes) */}
        <path d="M120 50 C 110 70 130 90 120 110 C 110 90 130 70 120 50 Z" />
        <path d="M360 50 C 350 70 370 90 360 110 C 350 90 370 70 360 50 Z" />
        <path d="M600 50 C 590 70 610 90 600 110 C 590 90 610 70 600 50 Z" />
        <path d="M840 50 C 830 70 850 90 840 110 C 830 90 850 70 840 50 Z" />
        <path d="M1080 50 C 1070 70 1090 90 1080 110 C 1070 90 1090 70 1080 50 Z" />
        <path d="M1320 50 C 1310 70 1330 90 1320 110 C 1310 90 1330 70 1320 50 Z" />
        {/* Smaller joining drops */}
        <path d="M240 10 C 235 25 245 35 240 50 C 235 35 245 25 240 10 Z" />
        <path d="M480 10 C 475 25 485 35 480 50 C 475 35 485 25 480 10 Z" />
        <path d="M720 10 C 715 25 725 35 720 50 C 715 35 725 25 720 10 Z" />
        <path d="M960 10 C 955 25 965 35 960 50 C 955 35 965 25 960 10 Z" />
        <path d="M1200 10 C 1195 25 1205 35 1200 50 C 1195 35 1205 25 1200 10 Z" />
      </g>

      {/* Terracotta-style layered pandal spires in the distance */}
      <g opacity="0.03" fill="currentColor">
        <path d="M50 900 L 150 650 L 250 900 Z" />
        <path d="M100 900 L 150 720 L 200 900 Z" fill="#000" opacity="0.2" />
        <circle cx="150" cy="630" r="15" />
        
        <path d="M950 900 L 1100 500 L 1250 900 Z" />
        <path d="M1000 900 L 1100 600 L 1200 900 Z" fill="#000" opacity="0.2" />
        <path d="M1050 900 L 1100 700 L 1150 900 Z" fill="currentColor" />
        <circle cx="1100" cy="480" r="20" />
        <circle cx="1100" cy="450" r="10" />
      </g>
      
      <g opacity="0.035" fill="currentColor">
        <path d="M200 900 L 350 550 L 500 900 Z" />
        <path d="M250 900 L 350 650 L 450 900 Z" fill="#000" opacity="0.2" />
        <circle cx="350" cy="530" r="18" />
        
        <path d="M1200 900 L 1350 600 L 1500 900 Z" />
        <path d="M1250 900 L 1350 700 L 1450 900 Z" fill="#000" opacity="0.2" />
        <circle cx="1350" cy="580" r="18" />
      </g>

      {/* ── Foreground Layer (4.5-5% opacity): Elaborate Daker Saaj Durga ── */}
      {/* Intricate Dhunuchi smoke wisps with swirls */}
      <path d="M250 850 C 230 750 350 700 280 600 C 230 500 350 450 300 350 C 280 300 320 250 350 280" fill="none" stroke="currentColor" strokeWidth="12" opacity="0.03" strokeLinecap="round" />
      <path d="M270 850 C 290 780 240 720 320 620 C 370 540 250 480 340 380 C 360 340 310 300 290 320" fill="none" stroke="currentColor" strokeWidth="6" opacity="0.02" strokeLinecap="round" />
      <path d="M300 850 C 320 800 280 750 300 700 C 320 650 280 600 300 550" fill="none" stroke="currentColor" strokeWidth="4" opacity="0.025" strokeLinecap="round" strokeDasharray="10 15" />
      
      {/* Detailed Dhak drums with intricate lacing */}
      <g opacity="0.045" transform="translate(120, 700) rotate(-15)">
        <ellipse cx="50" cy="20" rx="40" ry="15" fill="currentColor" />
        <path d="M10 20 L 20 140 Q 50 170 80 140 L 90 20 Z" fill="currentColor" />
        <path d="M10 20 L 80 140 M 90 20 L 20 140 M 50 20 L 50 155 M 30 20 L 40 145 M 70 20 L 60 145" stroke="#000" strokeWidth="2" opacity="0.4" />
        <ellipse cx="50" cy="20" rx="35" ry="10" fill="#000" opacity="0.3" />
        {/* Kashor bells */}
        <circle cx="120" cy="60" r="25" fill="currentColor" />
        <circle cx="120" cy="60" r="15" fill="#000" opacity="0.3" />
      </g>

      {/* Main Central Pandal Structure (Terracotta Temple Style) */}
      <path d="M450 900 L 450 600 C 450 400 720 350 720 350 C 720 350 1000 400 1000 600 L 1000 900 Z" fill="currentColor" opacity="0.045" />
      {/* Temple arch layers */}
      <path d="M500 900 L 500 620 C 500 450 720 400 720 400 C 720 400 950 450 950 620 L 950 900 Z" fill="#000" opacity="0.2" />
      <path d="M550 900 L 550 640 C 550 500 720 450 720 450 C 720 450 900 500 900 640 L 900 900 Z" fill="currentColor" opacity="0.05" />
      {/* Top detailed spires/kalash */}
      <path d="M720 350 L 680 250 L 760 250 Z" fill="currentColor" opacity="0.05" />
      <circle cx="720" cy="230" r="20" fill="currentColor" opacity="0.05" />
      <circle cx="720" cy="195" r="15" fill="currentColor" opacity="0.05" />
      <path d="M720 180 L 710 120 L 730 120 Z" fill="currentColor" opacity="0.05" />
      
      {/* Terracotta Pillars */}
      <rect x="450" y="600" width="30" height="300" fill="#000" opacity="0.2" />
      <rect x="970" y="600" width="30" height="300" fill="#000" opacity="0.2" />

      {/* Durga Idol Silhouette (Daker Saaj detailed style) */}
      <g transform="translate(720, 680)" opacity="0.05" fill="currentColor">
        {/* Elaborate Chalchitra (Halo backdrop with scalloped edges) */}
        <path d="M-160 180 C -160 -80 160 -80 160 180 Z" />
        <path d="M-140 180 C -140 -60 140 -60 140 180 Z" fill="#000" opacity="0.4" />
        {/* Scallop decorations on chalchitra */}
        <circle cx="-110" cy="-20" r="15" fill="currentColor" />
        <circle cx="-60" cy="-55" r="15" fill="currentColor" />
        <circle cx="0" cy="-70" r="15" fill="currentColor" />
        <circle cx="60" cy="-55" r="15" fill="currentColor" />
        <circle cx="110" cy="-20" r="15" fill="currentColor" />

        {/* Main Figure (Durga with intricate saree drape details) */}
        <path d="M-25 150 L -15 60 L -30 20 C -10 -20 10 -20 30 20 L 15 60 L 25 150 Z" />
        <path d="M-10 150 L -5 80 L 5 80 L 10 150 Z" fill="#000" opacity="0.4" />
        
        {/* Crown (Mukut) */}
        <path d="M-25 -20 L 0 -80 L 25 -20 Z" />
        <path d="M-15 -20 L -30 -60 L -5 -30 Z" />
        <path d="M15 -20 L 30 -60 L 5 -30 Z" />
        <circle cx="0" cy="-10" r="18" fill="#000" opacity="0.5" /> {/* Face shape */}

        {/* Ten Arms spreading out dynamically */}
        {/* Left Arms */}
        <path d="M-20 30 Q -80 10 -100 -10" stroke="currentColor" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M-20 40 Q -90 30 -110 20" stroke="currentColor" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M-20 50 Q -90 50 -110 60" stroke="currentColor" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M-20 60 Q -80 70 -100 90" stroke="currentColor" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M-20 70 Q -70 90 -80 120" stroke="currentColor" strokeWidth="5" fill="none" strokeLinecap="round" />
        {/* Right Arms */}
        <path d="M20 30 Q 80 10 100 -10" stroke="currentColor" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M20 40 Q 90 30 110 20" stroke="currentColor" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M20 50 Q 90 50 110 60" stroke="currentColor" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M20 60 Q 80 70 100 90" stroke="currentColor" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M20 70 Q 70 90 80 120" stroke="currentColor" strokeWidth="5" fill="none" strokeLinecap="round" />

        {/* Weapons in hands */}
        {/* Detailed Trishul (Trident) piercing downwards */}
        <path d="M60 160 L 40 -30 M 20 -10 Q 40 -5 60 -10 M 20 -10 L 20 -40 M 60 -10 L 60 -40" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="square" />
        <path d="M40 -50 L 32 -30 L 48 -30 Z" />
        <path d="M20 -50 L 15 -40 L 25 -40 Z" />
        <path d="M60 -50 L 55 -40 L 65 -40 Z" />
        
        {/* Sword (Khadga) */}
        <path d="M-100 -10 L -120 -50 C -110 -50 -100 -30 -100 -10 Z" fill="currentColor" />
        {/* Lotus (Padma) */}
        <circle cx="100" cy="-10" r="10" />
        <path d="M100 -20 L 90 -30 L 110 -30 Z" />
        
        {/* Lion (Bahan) at bottom right */}
        <path d="M30 160 C 50 100 100 120 120 160 C 130 180 80 180 30 160 Z" />
        <circle cx="100" cy="110" r="15" /> {/* Lion head */}
        {/* Mahishasura (Demon) at bottom left */}
        <path d="M-30 160 C -60 120 -100 140 -120 180 L -30 180 Z" />
        <circle cx="-80" cy="130" r="12" /> {/* Demon head */}
        {/* Buffalo body */}
        <path d="M-120 180 C -150 140 -80 150 -100 180 Z" />
      </g>
    </svg>
  );
}

/**
 * AlponaBackdrop — "Bengali Literary Garden"
 * A poetic, literary garden scene evoking Rabindranath Tagore's Shantiniketan.
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
      {/* ── Background Layer (2-3% opacity): Sky & Distant Birds ── */}
      {/* Birds (pakhir dol) in V-formation */}
      <g opacity="0.025" fill="currentColor">
        <path d="M1200 200 q 10 -5 20 0 q -10 5 -20 0" stroke="currentColor" strokeWidth="2" />
        <path d="M1170 215 q 8 -4 16 0 q -8 4 -16 0" stroke="currentColor" strokeWidth="2" />
        <path d="M1140 230 q 6 -3 12 0 q -6 3 -12 0" stroke="currentColor" strokeWidth="2" />
        <path d="M1230 215 q 8 -4 16 0 q -8 4 -16 0" stroke="currentColor" strokeWidth="2" />
        <path d="M1260 230 q 6 -3 12 0 q -6 3 -12 0" stroke="currentColor" strokeWidth="2" />
      </g>

      {/* Floating calligraphic swirls (evoking Bengali script/poetry) */}
      <g stroke="currentColor" fill="none" opacity="0.02" strokeWidth="3" strokeLinecap="round">
        <path d="M200 150 C 250 120 300 180 350 150 C 370 130 380 100 400 120" />
        <path d="M800 250 C 850 200 900 300 950 250" />
        <path d="M100 300 C 150 280 180 320 220 290" />
      </g>

      {/* ── Mid-Ground Layer (3.5-4% opacity): Banyan Tree & River ── */}
      {/* Flowing River (Ganga/Padma) across the bottom */}
      <path d="M0 650 C 300 620 600 680 900 640 C 1200 600 1350 630 1440 650 L 1440 800 L 0 800 Z" fill="currentColor" opacity="0.025" />
      <path d="M0 680 C 400 650 800 700 1440 670 L 1440 800 L 0 800 Z" fill="currentColor" opacity="0.03" />
      
      {/* Scattered water lilies (shapla) on river */}
      <g fill="currentColor" opacity="0.04">
        <path d="M150 720 l 10 -15 l 10 15 z M 140 720 l 15 -10 l 15 10 z" />
        <path d="M450 750 l 8 -12 l 8 12 z M 442 750 l 12 -8 l 12 8 z" />
        <path d="M850 700 l 12 -18 l 12 18 z M 838 700 l 18 -12 l 18 12 z" />
        <path d="M1250 740 l 10 -15 l 10 15 z M 1240 740 l 15 -10 l 15 10 z" />
      </g>

      {/* Majestic Banyan Tree (bot gachh) silhouette on right */}
      <g fill="currentColor" opacity="0.035">
        {/* Trunk & Branches */}
        <path d="M1300 650 C 1250 500 1280 400 1250 300 C 1200 200 1100 150 1000 150 C 1200 180 1300 100 1400 100 C 1350 200 1380 300 1440 350 L 1440 650 Z" />
        {/* Canopy foliage blobs */}
        <circle cx="1150" cy="180" r="80" />
        <circle cx="1050" cy="220" r="70" />
        <circle cx="1250" cy="120" r="90" />
        <circle cx="1350" cy="150" r="80" />
        <circle cx="1400" cy="250" r="100" />
        {/* Aerial roots hanging down */}
        <path d="M1100 250 L 1100 500 M 1120 230 L 1120 550 M 1180 180 L 1180 600 M 1220 150 L 1220 500" stroke="currentColor" strokeWidth="4" />
      </g>

      {/* ── Foreground Layer (4.5-5% opacity): Literary & Cultural Core ── */}
      {/* Open Book Silhouette (Base left) */}
      <g fill="currentColor" opacity="0.045" transform="translate(150, 500)">
        <path d="M0 50 C -100 20 -150 80 -150 80 C -100 100 -50 80 0 100 C 50 80 100 100 150 80 C 150 80 100 20 0 50 Z" />
        <path d="M0 40 C -80 10 -120 60 -120 60 C -80 70 -40 50 0 70 C 40 50 80 70 120 60 C 120 60 80 10 0 40 Z" opacity="0.5" />
        <path d="M0 30 C -60 0 -90 40 -90 40 C -60 45 -30 30 0 50 C 30 30 60 45 90 40 C 90 40 60 0 0 30 Z" opacity="0.3" />
        {/* Quill Pen rising from book */}
        <path d="M0 50 C 50 -50 80 -150 150 -200 C 100 -120 100 -50 0 50 Z" />
        <path d="M150 -200 L 140 -150 M 130 -160 L 110 -120 M 110 -130 L 90 -90 M 90 -100 L 70 -60" stroke="currentColor" strokeWidth="2" />
      </g>

      {/* Baul Singer Figure (Seated under tree) */}
      <g fill="currentColor" opacity="0.05" transform="translate(1000, 520)">
        {/* Seated Body */}
        <path d="M0 100 C -30 60 -20 20 0 0 C 20 20 30 60 0 100 Z" />
        {/* Head & Turban */}
        <circle cx="0" cy="-20" r="15" />
        <path d="M-15 -30 C -25 -50 0 -60 15 -30 Z" />
        {/* Arm holding Ektara */}
        <path d="M-10 10 C -40 30 -50 60 -30 80" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" />
        {/* Ektara Instrument */}
        <circle cx="-40" cy="90" r="15" />
        <path d="M-40 75 L -60 20 M -25 80 L 10 30" stroke="currentColor" strokeWidth="3" fill="none" />
      </g>

    </svg>
  );
}

/**
 * KanthaBackdrop — "Village Bengal / Gram Bangla"
 * A rural Bengal pastoral landscape featuring huts, handloom, and river.
 * Inspired by actual kantha quilt embroidery themes.
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
      {/* ── Background Layer (2-3% opacity): Sky, Temple, Fireflies ── */}
      {/* Temple Spire (mandir chura) in distance */}
      <g opacity="0.02" fill="currentColor">
        <path d="M1100 300 L 1150 150 L 1200 300 Z" />
        <path d="M1080 300 L 1220 300 L 1220 350 L 1080 350 Z" />
        <path d="M1140 150 C 1140 130 1160 130 1160 150" stroke="currentColor" strokeWidth="2" fill="none" />
        <circle cx="1150" cy="120" r="5" />
      </g>

      {/* Scattered Fireflies (jonaki) */}
      <g opacity="0.025" fill="currentColor">
        <circle cx="150" cy="200" r="2" /><circle cx="180" cy="180" r="1.5" /><circle cx="160" cy="220" r="2" />
        <circle cx="450" cy="300" r="2.5" /><circle cx="480" cy="280" r="1.5" /><circle cx="420" cy="320" r="2" />
        <circle cx="850" cy="150" r="2" /><circle cx="890" cy="130" r="1.5" /><circle cx="820" cy="180" r="2.5" />
        <circle cx="1300" cy="250" r="2" /><circle cx="1340" cy="230" r="1.5" /><circle cx="1280" cy="270" r="2.5" />
      </g>

      {/* ── Mid-Ground Layer (3.5-4% opacity): Trees, Huts & Boat ── */}
      {/* Palm Trees (taal gachh) & Coconut Trees */}
      <g opacity="0.035" fill="currentColor" stroke="currentColor" strokeWidth="2">
        {/* Left Tree */}
        <path d="M250 400 Q 260 250 240 100" fill="none" strokeWidth="6" />
        <path d="M240 100 Q 180 120 200 150 M 240 100 Q 150 80 180 100 M 240 100 Q 200 30 220 50 M 240 100 Q 280 40 270 70 M 240 100 Q 320 80 290 100 M 240 100 Q 300 130 270 140" fill="none" />
        {/* Center-Right Tree */}
        <path d="M950 420 Q 940 280 960 150" fill="none" strokeWidth="5" />
        <path d="M960 150 Q 900 170 920 200 M 960 150 Q 870 130 900 150 M 960 150 Q 920 80 940 100 M 960 150 Q 1000 90 990 120 M 960 150 Q 1040 130 1010 150 M 960 150 Q 1020 180 990 190" fill="none" />
      </g>

      {/* Thatched Huts (kutir) */}
      <g opacity="0.04" fill="currentColor">
        {/* Hut 1 */}
        <path d="M350 350 C 350 300 450 300 450 350 Z" />
        <path d="M360 350 L 440 350 L 440 400 L 360 400 Z" />
        <path d="M390 370 L 410 370 L 410 400 L 390 400 Z" fill="#000" /> {/* Door */}
        {/* Hut 2 (smaller, behind) */}
        <path d="M430 340 C 430 300 500 300 500 340 Z" opacity="0.8" />
        <path d="M440 340 L 490 340 L 490 380 L 440 380 Z" opacity="0.8" />
      </g>

      {/* Nouka (country boat) on water */}
      <g opacity="0.035" transform="translate(750, 480)">
        <path d="M0 0 Q 50 30 100 0 C 80 20 20 20 0 0 Z" fill="currentColor" />
        <path d="M30 0 L 30 -60 L 70 -10 Z" fill="currentColor" />
        <path d="M50 0 L 50 -70" stroke="currentColor" strokeWidth="2" fill="none" />
      </g>
      
      {/* River / Water ripples */}
      <path d="M600 500 Q 700 480 800 500 T 1000 500" stroke="currentColor" strokeWidth="2" opacity="0.02" fill="none" />
      <path d="M650 520 Q 750 500 850 520 T 1050 520" stroke="currentColor" strokeWidth="1.5" opacity="0.02" fill="none" />

      {/* ── Foreground Layer (4.5-5% opacity): Handloom & Paddy Fields ── */}
      {/* Rice Paddy Fields (curved lines at base) */}
      <path d="M0 550 C 200 520 400 580 700 550 C 1000 520 1200 580 1440 550 L 1440 600 L 0 600 Z" fill="currentColor" opacity="0.03" />
      <path d="M0 580 C 300 550 500 620 900 580 C 1100 550 1300 600 1440 590 L 1440 600 L 0 600 Z" fill="currentColor" opacity="0.04" />
      
      {/* Tiny rice plants emerging from fields */}
      <g opacity="0.04" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M100 540 l -5 -10 M 100 540 l 0 -12 M 100 540 l 5 -10" />
        <path d="M120 545 l -5 -10 M 120 545 l 0 -12 M 120 545 l 5 -10" />
        <path d="M300 560 l -5 -10 M 300 560 l 0 -12 M 300 560 l 5 -10" />
        <path d="M320 565 l -5 -10 M 320 565 l 0 -12 M 320 565 l 5 -10" />
        <path d="M1200 560 l -5 -10 M 1200 560 l 0 -12 M 1200 560 l 5 -10" />
        <path d="M1220 555 l -5 -10 M 1220 555 l 0 -12 M 1220 555 l 5 -10" />
      </g>

      {/* Woman at Handloom (Tant) — Left Foreground */}
      <g opacity="0.05" fill="currentColor" transform="translate(150, 420)">
        {/* Loom structure (abstract geometric shapes) */}
        <path d="M-60 0 L -60 -100 L -40 -100 L -40 0 Z" />
        <path d="M20 0 L 20 -100 L 40 -100 L 40 0 Z" />
        <path d="M-60 -80 L 40 -80 L 40 -70 L -60 -70 Z" />
        <path d="M-60 -40 L 40 -40 L 40 -30 L -60 -30 Z" />
        {/* Diagonal threads */}
        <path d="M-40 -30 L 20 0 M -40 -40 L 20 -10" stroke="currentColor" strokeWidth="2" />
        
        {/* Weaver figure */}
        <circle cx="70" cy="-60" r="12" />
        <path d="M55 -45 C 45 -20 50 0 70 0 C 90 0 95 -20 85 -45 Z" />
        {/* Saree drape/pallu over head/shoulder */}
        <path d="M80 -65 C 90 -40 90 -20 85 0 C 100 -20 100 -50 80 -65 Z" />
        {/* Arm reaching to loom */}
        <path d="M60 -30 L 20 -20" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      </g>
    </svg>
  );
}
