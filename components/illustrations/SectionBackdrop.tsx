/**
 * Bold, editorial Bengali art-inspired SVG backdrops.
 * Inspired by Jacquemus geometric confidence, Aesop's refined line work,
 * and traditional Bengali alpona/kolam/jamdani textile art.
 *
 * Uses currentColor so they adapt to any theme.
 * Opacity range 8-20% — visible but never competing with content.
 */

interface BackdropProps {
  className?: string;
}

/**
 * Jamdani Weave — bold diamond lattice with sweeping loom threads.
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
      {/* ── Grand diamond — top right corner piece ── */}
      <path d="M1080 20L1160 180L1080 340L1000 180Z" stroke="currentColor" strokeWidth="1.5" opacity="0.08" />
      <path d="M1080 60L1130 180L1080 300L1030 180Z" stroke="currentColor" strokeWidth="1" opacity="0.06" />
      <path d="M1080 100L1110 180L1080 260L1050 180Z" stroke="currentColor" strokeWidth="0.8" opacity="0.12" />
      <circle cx="1080" cy="180" r="6" fill="currentColor" opacity="0.08" />
      <circle cx="1080" cy="180" r="2" fill="currentColor" opacity="0.15" />

      {/* ── Sweeping loom thread lines — full width ── */}
      <path d="M-20 90C200 60 400 150 720 100C1040 50 1200 130 1460 80" stroke="currentColor" strokeWidth="1.2" opacity="0.06" />
      <path d="M-20 110C250 80 500 170 780 120C1060 70 1250 150 1460 100" stroke="currentColor" strokeWidth="0.8" opacity="0.04" />
      <path d="M-20 130C300 110 550 180 820 140C1080 100 1280 160 1460 120" stroke="currentColor" strokeWidth="0.5" opacity="0.035" />

      {/* ── Large arc — bottom left, like draped fabric ── */}
      <path d="M-100 650Q200 500 500 620Q700 700 500 800" stroke="currentColor" strokeWidth="1.8" opacity="0.07" strokeLinecap="round" />
      <path d="M-80 680Q220 540 510 650Q690 720 520 810" stroke="currentColor" strokeWidth="0.8" opacity="0.04" strokeLinecap="round" />

      {/* ── Diamond cluster — left side, stacked vertically ── */}
      <path d="M80 300L110 360L80 420L50 360Z" stroke="currentColor" strokeWidth="1.2" opacity="0.10" />
      <path d="M80 330L95 360L80 390L65 360Z" stroke="currentColor" strokeWidth="0.8" opacity="0.07" />
      <circle cx="80" cy="360" r="3" fill="currentColor" opacity="0.12" />

      <path d="M120 450L145 500L120 550L95 500Z" stroke="currentColor" strokeWidth="1" opacity="0.06" />
      <line x1="80" y1="420" x2="120" y2="450" stroke="currentColor" strokeWidth="0.6" opacity="0.05" />

      {/* ── Giant concentric circles — center bottom, kolam-inspired ── */}
      <circle cx="720" cy="780" r="160" stroke="currentColor" strokeWidth="1.5" opacity="0.06" />
      <circle cx="720" cy="780" r="120" stroke="currentColor" strokeWidth="1" opacity="0.05" />
      <circle cx="720" cy="780" r="80" stroke="currentColor" strokeWidth="1.2" opacity="0.07" />
      <circle cx="720" cy="780" r="40" stroke="currentColor" strokeWidth="0.8" opacity="0.09" />
      <circle cx="720" cy="780" r="8" fill="currentColor" opacity="0.08" />
      {/* Cross petals inside circle */}
      <path d="M720 620Q740 700 720 780Q700 700 720 620Z" stroke="currentColor" strokeWidth="0.8" opacity="0.06" />
      <path d="M560 780Q640 760 720 780Q640 800 560 780Z" stroke="currentColor" strokeWidth="0.8" opacity="0.06" />

      {/* ── Diagonal warp threads — right side ── */}
      <line x1="1300" y1="400" x2="1440" y2="300" stroke="currentColor" strokeWidth="1" opacity="0.06" />
      <line x1="1280" y1="420" x2="1440" y2="310" stroke="currentColor" strokeWidth="0.6" opacity="0.04" />
      <line x1="1320" y1="500" x2="1440" y2="420" stroke="currentColor" strokeWidth="0.8" opacity="0.05" />

      {/* ── Small diamond accent — right edge ── */}
      <path d="M1360 550L1390 610L1360 670L1330 610Z" stroke="currentColor" strokeWidth="1.2" opacity="0.08" />
      <circle cx="1360" cy="610" r="3" fill="currentColor" opacity="0.10" />

      {/* ── Bold paisley — bottom right ── */}
      <path d="M1150 750C1180 680 1280 660 1340 720C1370 760 1340 830 1280 850C1220 870 1160 830 1150 750Z" stroke="currentColor" strokeWidth="1.5" opacity="0.08" />
      <path d="M1190 750C1210 710 1270 700 1310 730C1325 750 1310 790 1270 800C1230 810 1195 790 1190 750Z" stroke="currentColor" strokeWidth="0.8" opacity="0.06" />
      <circle cx="1250" cy="760" r="4" fill="currentColor" opacity="0.10" />

      {/* ── Scattered ritual dots — varying sizes for depth ── */}
      <circle cx="300" cy="180" r="4" fill="currentColor" opacity="0.08" />
      <circle cx="520" cy="320" r="3" fill="currentColor" opacity="0.06" />
      <circle cx="900" cy="200" r="5" fill="currentColor" opacity="0.07" />
      <circle cx="180" cy="550" r="3" fill="currentColor" opacity="0.06" />
      <circle cx="950" cy="500" r="4" fill="currentColor" opacity="0.07" />
      <circle cx="400" cy="700" r="3" fill="currentColor" opacity="0.05" />
      <circle cx="600" cy="150" r="2.5" fill="currentColor" opacity="0.06" />
      <circle cx="1200" cy="300" r="3" fill="currentColor" opacity="0.05" />

      {/* ── Tiny diamond scatter — like woven motifs ── */}
      <path d="M450 500L460 520L450 540L440 520Z" stroke="currentColor" strokeWidth="0.8" opacity="0.08" />
      <path d="M850 350L858 370L850 390L842 370Z" stroke="currentColor" strokeWidth="0.8" opacity="0.07" />
      <path d="M250 700L258 715L250 730L242 715Z" stroke="currentColor" strokeWidth="0.8" opacity="0.06" />
    </svg>
  );
}

/**
 * Alpona Art — bold rosettes, petal mandalas, and ritual geometry.
 * Inspired by Bengali kolam floor art and Aesop's confident compositions.
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
      {/* ── Grand rosette — top left ── */}
      <circle cx="120" cy="120" r="120" stroke="currentColor" strokeWidth="1.5" opacity="0.07" />
      <circle cx="120" cy="120" r="80" stroke="currentColor" strokeWidth="1.2" opacity="0.08" />
      <circle cx="120" cy="120" r="45" stroke="currentColor" strokeWidth="1" opacity="0.10" />
      <circle cx="120" cy="120" r="15" stroke="currentColor" strokeWidth="0.8" opacity="0.12" />
      <circle cx="120" cy="120" r="4" fill="currentColor" opacity="0.15" />
      {/* 8-petal cross */}
      <path d="M120 0Q135 60 120 120Q105 60 120 0Z" stroke="currentColor" strokeWidth="0.8" opacity="0.08" />
      <path d="M0 120Q60 105 120 120Q60 135 0 120Z" stroke="currentColor" strokeWidth="0.8" opacity="0.08" />
      <path d="M120 240Q135 180 120 120Q105 180 120 240Z" stroke="currentColor" strokeWidth="0.8" opacity="0.06" />
      <path d="M240 120Q180 105 120 120Q180 135 240 120Z" stroke="currentColor" strokeWidth="0.8" opacity="0.06" />
      {/* Diagonal petals */}
      <path d="M35 35Q80 75 120 120Q75 80 35 35Z" stroke="currentColor" strokeWidth="0.6" opacity="0.05" />
      <path d="M205 35Q160 75 120 120Q165 80 205 35Z" stroke="currentColor" strokeWidth="0.6" opacity="0.05" />

      {/* ── Sweeping wave — full width, like a rangoli border ── */}
      <path d="M0 380C180 330 360 420 540 370C720 320 900 400 1080 350C1260 300 1440 380 1440 380" stroke="currentColor" strokeWidth="1.5" opacity="0.06" />
      <path d="M0 400C180 350 360 440 540 390C720 340 900 420 1080 370C1260 320 1440 400 1440 400" stroke="currentColor" strokeWidth="0.8" opacity="0.04" />

      {/* ── Diamond chain — right side, vertical ── */}
      <path d="M1280 140L1320 210L1280 280L1240 210Z" stroke="currentColor" strokeWidth="1.5" opacity="0.09" />
      <path d="M1280 170L1300 210L1280 250L1260 210Z" stroke="currentColor" strokeWidth="0.8" opacity="0.06" />
      <circle cx="1280" cy="210" r="4" fill="currentColor" opacity="0.10" />

      <path d="M1280 300L1310 355L1280 410L1250 355Z" stroke="currentColor" strokeWidth="1.2" opacity="0.07" />
      <circle cx="1280" cy="355" r="3" fill="currentColor" opacity="0.08" />
      <line x1="1280" y1="280" x2="1280" y2="300" stroke="currentColor" strokeWidth="0.8" opacity="0.06" />

      {/* ── Medium rosette — bottom right ── */}
      <circle cx="1320" cy="650" r="80" stroke="currentColor" strokeWidth="1.2" opacity="0.06" />
      <circle cx="1320" cy="650" r="50" stroke="currentColor" strokeWidth="1" opacity="0.08" />
      <circle cx="1320" cy="650" r="20" stroke="currentColor" strokeWidth="0.8" opacity="0.10" />
      <circle cx="1320" cy="650" r="5" fill="currentColor" opacity="0.12" />
      {/* Petals */}
      <path d="M1320 570Q1330 610 1320 650Q1310 610 1320 570Z" stroke="currentColor" strokeWidth="0.6" opacity="0.07" />
      <path d="M1240 650Q1280 640 1320 650Q1280 660 1240 650Z" stroke="currentColor" strokeWidth="0.6" opacity="0.07" />

      {/* ── Stepped temple motif — bottom left ── */}
      <path d="M50 680L100 680L100 650L150 650L150 620L200 620L200 590L250 590" stroke="currentColor" strokeWidth="1.5" opacity="0.08" />
      <path d="M50 710L100 710L100 740L150 740L150 770L200 770" stroke="currentColor" strokeWidth="1.5" opacity="0.08" />
      {/* Mirror symmetry accent */}
      <path d="M250 590L250 620" stroke="currentColor" strokeWidth="1" opacity="0.06" />
      <circle cx="250" cy="590" r="3" fill="currentColor" opacity="0.10" />

      {/* ── Large paisley — center area ── */}
      <path d="M680 200C720 140 810 120 860 180C890 220 860 300 800 320C740 340 690 300 680 200Z" stroke="currentColor" strokeWidth="1.5" opacity="0.07" />
      <path d="M710 210C730 170 790 160 820 200C835 220 820 270 780 280C740 290 715 265 710 210Z" stroke="currentColor" strokeWidth="0.8" opacity="0.05" />
      <circle cx="760" cy="230" r="5" fill="currentColor" opacity="0.08" />
      {/* Paisley inner curl */}
      <path d="M750 250C755 235 770 230 780 240" stroke="currentColor" strokeWidth="0.6" opacity="0.06" />

      {/* ── Scattered ritual dots — confident sizes ── */}
      <circle cx="480" cy="100" r="5" fill="currentColor" opacity="0.07" />
      <circle cx="380" cy="280" r="3" fill="currentColor" opacity="0.06" />
      <circle cx="900" cy="180" r="4" fill="currentColor" opacity="0.06" />
      <circle cx="600" cy="550" r="5" fill="currentColor" opacity="0.07" />
      <circle cx="1050" cy="500" r="4" fill="currentColor" opacity="0.06" />
      <circle cx="300" cy="480" r="3" fill="currentColor" opacity="0.05" />
      <circle cx="800" cy="700" r="3.5" fill="currentColor" opacity="0.06" />
      <circle cx="550" cy="700" r="4" fill="currentColor" opacity="0.05" />

      {/* ── Tiny diamond accents ── */}
      <path d="M420 600L430 620L420 640L410 620Z" stroke="currentColor" strokeWidth="0.8" opacity="0.08" />
      <path d="M1100 150L1110 170L1100 190L1090 170Z" stroke="currentColor" strokeWidth="0.8" opacity="0.07" />
      <path d="M950 650L958 668L950 686L942 668Z" stroke="currentColor" strokeWidth="0.8" opacity="0.06" />
    </svg>
  );
}

/**
 * Kantha Stitch — bold running-stitch rows with sweeping drape curves.
 * Inspired by actual kantha embroidery patterns from Bengal.
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
      {/* ── Running stitch rows — top left, visible dashes ── */}
      <path
        d="M0 80 L30 80 M45 80 L75 80 M90 80 L120 80 M135 80 L165 80 M180 80 L210 80 M225 80 L255 80 M270 80 L300 80 M315 80 L345 80"
        stroke="currentColor" strokeWidth="1.5" opacity="0.10"
        transform="rotate(-3 170 80)"
      />
      <path
        d="M20 100 L50 100 M65 100 L95 100 M110 100 L140 100 M155 100 L185 100 M200 100 L230 100 M245 100 L275 100 M290 100 L320 100"
        stroke="currentColor" strokeWidth="1.2" opacity="0.07"
        transform="rotate(-3 170 100)"
      />
      <path
        d="M10 120 L35 120 M50 120 L75 120 M90 120 L115 120 M130 120 L155 120 M170 120 L195 120 M210 120 L235 120"
        stroke="currentColor" strokeWidth="0.8" opacity="0.05"
        transform="rotate(-3 120 120)"
      />

      {/* ── Running stitch rows — top right ── */}
      <path
        d="M1100 60 L1130 60 M1145 60 L1175 60 M1190 60 L1220 60 M1235 60 L1265 60 M1280 60 L1310 60 M1325 60 L1355 60 M1370 60 L1400 60"
        stroke="currentColor" strokeWidth="1.5" opacity="0.09"
        transform="rotate(2 1250 60)"
      />
      <path
        d="M1120 80 L1148 80 M1163 80 L1191 80 M1206 80 L1234 80 M1249 80 L1277 80 M1292 80 L1320 80 M1335 80 L1363 80"
        stroke="currentColor" strokeWidth="1" opacity="0.06"
        transform="rotate(2 1240 80)"
      />

      {/* ── Bold sweeping drape curves — center ── */}
      <path d="M-20 280C200 220 450 340 720 260C990 180 1200 300 1460 240" stroke="currentColor" strokeWidth="2" opacity="0.07" strokeLinecap="round" />
      <path d="M-20 300C200 240 450 360 720 280C990 200 1200 320 1460 260" stroke="currentColor" strokeWidth="1.2" opacity="0.05" strokeLinecap="round" />
      <path d="M-20 320C200 270 450 370 720 300C990 230 1200 340 1460 280" stroke="currentColor" strokeWidth="0.6" opacity="0.035" strokeLinecap="round" />

      {/* ── Stitch cluster — left side, like embroidery fill ── */}
      <path d="M60 420 L90 420 M105 420 L135 420 M150 420 L180 420 M195 420 L225 420" stroke="currentColor" strokeWidth="1.5" opacity="0.10" transform="rotate(-1 140 420)" />
      <path d="M70 440 L98 440 M113 440 L141 440 M156 440 L184 440 M199 440 L227 440" stroke="currentColor" strokeWidth="1.2" opacity="0.07" transform="rotate(-1 148 440)" />
      <path d="M80 460 L105 460 M120 460 L145 460 M160 460 L185 460" stroke="currentColor" strokeWidth="0.8" opacity="0.05" transform="rotate(-1 130 460)" />

      {/* ── Stitch cluster — right side ── */}
      <path d="M1200 480 L1228 480 M1243 480 L1271 480 M1286 480 L1314 480 M1329 480 L1357 480" stroke="currentColor" strokeWidth="1.2" opacity="0.08" transform="rotate(1.5 1280 480)" />
      <path d="M1210 500 L1236 500 M1251 500 L1277 500 M1292 500 L1318 500" stroke="currentColor" strokeWidth="0.8" opacity="0.06" transform="rotate(1.5 1264 500)" />

      {/* ── Diamond accent — right area ── */}
      <path d="M1080 360L1120 430L1080 500L1040 430Z" stroke="currentColor" strokeWidth="1.5" opacity="0.08" />
      <path d="M1080 385L1100 430L1080 475L1060 430Z" stroke="currentColor" strokeWidth="0.8" opacity="0.06" />
      <circle cx="1080" cy="430" r="4" fill="currentColor" opacity="0.10" />

      {/* ── Small paisley — bottom center ── */}
      <path d="M650 480C670 440 730 430 760 460C775 480 760 520 730 530C700 540 655 520 650 480Z" stroke="currentColor" strokeWidth="1.2" opacity="0.07" />
      <circle cx="710" cy="490" r="3" fill="currentColor" opacity="0.08" />

      {/* ── Concentric arcs — top center, like a half-mandala ── */}
      <path d="M620 0A100 100 0 0 1 820 0" stroke="currentColor" strokeWidth="1.2" opacity="0.06" />
      <path d="M650 0A70 70 0 0 1 790 0" stroke="currentColor" strokeWidth="1" opacity="0.08" />
      <path d="M680 0A40 40 0 0 1 760 0" stroke="currentColor" strokeWidth="0.8" opacity="0.10" />
      <circle cx="720" cy="0" r="3" fill="currentColor" opacity="0.12" />

      {/* ── Bold dot scatter — like kantha filling dots ── */}
      <circle cx="400" cy="150" r="5" fill="currentColor" opacity="0.08" />
      <circle cx="550" cy="200" r="3" fill="currentColor" opacity="0.06" />
      <circle cx="850" cy="130" r="4" fill="currentColor" opacity="0.07" />
      <circle cx="300" cy="380" r="4" fill="currentColor" opacity="0.06" />
      <circle cx="500" cy="500" r="3.5" fill="currentColor" opacity="0.07" />
      <circle cx="920" cy="350" r="5" fill="currentColor" opacity="0.06" />
      <circle cx="1350" cy="200" r="4" fill="currentColor" opacity="0.07" />
      <circle cx="180" cy="250" r="3" fill="currentColor" opacity="0.05" />
      <circle cx="750" cy="550" r="3" fill="currentColor" opacity="0.06" />

      {/* ── Tiny diamond scatter ── */}
      <path d="M450 350L458 370L450 390L442 370Z" stroke="currentColor" strokeWidth="0.8" opacity="0.08" />
      <path d="M350 530L358 545L350 560L342 545Z" stroke="currentColor" strokeWidth="0.8" opacity="0.07" />
    </svg>
  );
}
