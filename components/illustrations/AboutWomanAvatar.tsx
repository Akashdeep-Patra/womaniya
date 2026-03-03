'use client';

/**
 * Polished side-profile portrait of a woman in saree.
 * Uses CSS custom properties for theme-awareness —
 * skin/fabric tones adapt via semantic tokens.
 */
export function AboutWomanAvatar({ className = '' }: { className?: string }) {
  return (
    <div className={`relative w-full h-full flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 500 650"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-contain"
        aria-hidden="true"
      >
        <defs>
          {/* Skin — warm, multi-stop for dimension */}
          <linearGradient id="about-skin" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E8CBAF" />
            <stop offset="50%" stopColor="#D4AD8C" />
            <stop offset="100%" stopColor="#C49A78" />
          </linearGradient>
          {/* Hair — deep with subtle warm sheen */}
          <linearGradient id="about-hair" x1="0.2" y1="0" x2="0.8" y2="1">
            <stop offset="0%" stopColor="#2C2420" />
            <stop offset="40%" stopColor="#1A1412" />
            <stop offset="100%" stopColor="#0E0A08" />
          </linearGradient>
          {/* Saree — theme primary (sindoor/gold depending on mode) */}
          <linearGradient id="about-sari" x1="0" y1="0" x2="0.3" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.7" />
          </linearGradient>
          {/* Accent gold for zari */}
          <linearGradient id="about-zari" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.6" />
          </linearGradient>
          {/* Subtle shadow for depth */}
          <radialGradient id="about-shadow" cx="0.5" cy="0.95" r="0.5">
            <stop offset="0%" stopColor="var(--foreground)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="var(--foreground)" stopOpacity="0" />
          </radialGradient>
          {/* Neck shadow */}
          <linearGradient id="about-neck-shadow" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0%" stopColor="#B8977A" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#C49A78" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Ground shadow */}
        <ellipse cx="250" cy="640" rx="120" ry="10" fill="url(#about-shadow)" />

        {/* ── Saree lower body ── */}
        <path
          d="M140 380 C140 380 125 470 120 550 C115 625 113 640 115 650 L375 650 C375 650 373 600 365 530 C357 460 345 400 335 370 C335 370 290 390 255 395 C225 398 170 385 140 380Z"
          fill="url(#about-sari)"
        />
        {/* Fabric fold lines */}
        <path d="M150 410 C165 455 160 530 155 610" fill="none" stroke="var(--primary)" strokeWidth="1" opacity="0.25" />
        <path d="M195 398 C200 465 198 540 195 620" fill="none" stroke="var(--primary)" strokeWidth="0.8" opacity="0.2" />
        <path d="M310 395 C305 460 302 540 300 620" fill="none" stroke="var(--primary)" strokeWidth="0.8" opacity="0.2" />
        <path d="M345 385 C342 445 338 530 335 610" fill="none" stroke="var(--primary)" strokeWidth="1" opacity="0.2" />

        {/* Zari border at hem */}
        <path d="M115 640 L375 640" fill="none" stroke="url(#about-zari)" strokeWidth="3.5" opacity="0.7" />
        <path d="M115 644 L375 644" fill="none" stroke="url(#about-zari)" strokeWidth="1.2" strokeDasharray="4 6" opacity="0.4" />

        {/* Jamdani diamond motifs on sari */}
        <g opacity="0.12" fill="var(--accent)">
          <path d="M190 475 l4-7 4 7-4 7z" />
          <path d="M275 495 l4-7 4 7-4 7z" />
          <path d="M220 555 l4-7 4 7-4 7z" />
          <path d="M310 535 l4-7 4 7-4 7z" />
          <path d="M160 595 l3-5 3 5-3 5z" />
          <path d="M295 610 l3-5 3 5-3 5z" />
        </g>

        {/* ── Midriff ── */}
        <path d="M185 290 C185 290 175 320 170 350 C168 365 165 375 163 380 L195 380 C198 365 203 340 208 320 C212 305 207 295 185 290Z" fill="url(#about-skin)" />
        <path d="M295 290 C295 290 305 320 310 350 C312 365 315 375 317 380 L285 380 C282 365 277 340 272 320 C268 305 273 295 295 290Z" fill="url(#about-skin)" />

        {/* ── Blouse ── */}
        <path
          d="M178 215 C178 215 168 245 170 272 C172 292 182 305 192 312 L288 312 C298 305 308 292 310 272 C312 245 302 215 302 215 C302 215 278 206 243 206 C208 206 178 215 178 215Z"
          fill="var(--primary)"
          opacity="0.85"
        />
        {/* Neckline zari */}
        <path d="M188 218 C205 210 225 206 243 206 C261 206 275 210 292 218" fill="none" stroke="url(#about-zari)" strokeWidth="1.5" opacity="0.6" />

        {/* ── Arms ── */}
        <path d="M178 230 C162 248 138 278 118 308 C105 328 98 348 102 358 C106 365 115 360 124 348 C138 328 155 305 165 290" fill="url(#about-skin)" />
        <path d="M302 230 C318 248 342 278 362 308 C375 328 382 345 380 355 C378 362 370 358 360 345 C345 322 328 300 318 288" fill="url(#about-skin)" />
        {/* Left hand */}
        <path d="M98 352 C94 358 96 365 102 363 C108 361 114 354 120 346 L112 340Z" fill="url(#about-skin)" />

        {/* ── Pallu draped over shoulder ── */}
        <path
          d="M112 330 C132 315 162 320 192 325 C222 330 235 322 255 310 C275 298 290 282 300 265 C310 248 318 225 323 215 L332 222 C328 240 318 268 305 288 C290 312 265 332 240 342 C215 352 185 355 160 353 C135 351 110 345 112 330Z"
          fill="url(#about-zari)"
          opacity="0.85"
        />
        {/* Pallu fold details */}
        <path d="M135 330 C160 324 190 328 215 330 C240 332 262 322 280 306" fill="none" stroke="var(--accent)" strokeWidth="0.8" opacity="0.35" />
        {/* Zari edge on pallu */}
        <path d="M110 335 C132 320 168 326 205 332 C242 338 272 328 298 305" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />

        {/* ── Neck ── */}
        <path d="M220 195 C220 178 228 172 243 168 C258 172 263 178 263 195 L258 206 C254 208 249 209 243 209 C237 209 232 208 228 206Z" fill="url(#about-skin)" />
        <ellipse cx="243" cy="200" rx="15" ry="8" fill="url(#about-neck-shadow)" />

        {/* ── Face ── */}
        <ellipse cx="243" cy="128" rx="48" ry="58" fill="url(#about-skin)" />
        {/* Subtle face dimension */}
        <ellipse cx="256" cy="132" rx="28" ry="42" fill="#C49A78" opacity="0.12" />

        {/* ── Hair ── */}
        <path d="M195 118 C192 82 200 50 225 35 C245 28 268 30 286 44 C304 58 314 80 310 108 C308 122 303 134 297 142 L294 126 C292 105 288 82 274 66 C260 52 242 48 226 55 C212 62 204 78 200 96Z" fill="url(#about-hair)" />
        <path d="M195 118 C190 100 194 72 210 52 C228 34 256 26 282 40 C300 50 312 68 315 90 C317 104 315 118 310 128 C306 114 297 96 282 82 C266 70 248 66 232 73 C218 80 208 94 202 110Z" fill="url(#about-hair)" />
        {/* Side hair strands */}
        <path d="M197 112 C190 132 186 160 184 188 C183 208 185 222 190 232" fill="none" stroke="#1A1412" strokeWidth="7" strokeLinecap="round" />
        <path d="M194 108 C186 128 180 158 178 188 C177 212 178 234 182 248" fill="none" stroke="#0E0A08" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M306 130 C310 142 312 162 310 182 C308 196 305 208 302 218" fill="none" stroke="#1A1412" strokeWidth="5.5" strokeLinecap="round" />
        {/* Hair sheen */}
        <path d="M218 44 C236 37 255 38 270 48" fill="none" stroke="#3D3028" strokeWidth="1.8" opacity="0.35" strokeLinecap="round" />

        {/* ── Eyes ── */}
        {/* Eyebrows */}
        <path d="M212 106 C218 100 230 98 238 101" fill="none" stroke="#2C2420" strokeWidth="2" strokeLinecap="round" />
        <path d="M252 98 C260 95 270 96 276 100" fill="none" stroke="#2C2420" strokeWidth="2" strokeLinecap="round" />
        {/* Eye whites */}
        <ellipse cx="226" cy="118" rx="11" ry="6.5" fill="#FDFAF2" />
        <ellipse cx="264" cy="116" rx="11" ry="6.5" fill="#FDFAF2" />
        {/* Iris */}
        <circle cx="227" cy="118" r="4.5" fill="#2C1810" />
        <circle cx="265" cy="116" r="4.5" fill="#2C1810" />
        {/* Pupils */}
        <circle cx="228" cy="117.5" r="1.8" fill="#0A0806" />
        <circle cx="266" cy="115.5" r="1.8" fill="#0A0806" />
        {/* Eye highlights */}
        <circle cx="229.5" cy="116.5" r="1.1" fill="#FFF" opacity="0.75" />
        <circle cx="267.5" cy="114.5" r="1.1" fill="#FFF" opacity="0.75" />
        {/* Eyeliner */}
        <path d="M214 118 C217 115 222 113 234 113 C237 113 238 115 237 117" fill="none" stroke="#1A1412" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M253 116 C256 113 261 111 272 111 C275 111 276 113 275 116" fill="none" stroke="#1A1412" strokeWidth="1.3" strokeLinecap="round" />
        {/* Lower lash */}
        <path d="M216 121 C222 124 230 125 237 123" fill="none" stroke="#2C2420" strokeWidth="0.7" opacity="0.4" />
        <path d="M255 119 C261 122 269 123 275 121" fill="none" stroke="#2C2420" strokeWidth="0.7" opacity="0.4" />

        {/* ── Nose ── */}
        <path d="M244 122 C243 132 241 142 237 148 C234 152 232 154 235 156 C238 157 242 157 245 157 C248 156 249 153 247 150" fill="none" stroke="#B8977A" strokeWidth="1.3" strokeLinecap="round" />

        {/* ── Lips ── */}
        <path d="M228 166 C232 163 239 161 245 162 C251 161 258 163 262 166 C258 170 252 173 245 173 C238 173 232 170 228 166Z" fill="#B33A30" />
        <path d="M228 166 C234 164 240 163 245 164 C250 163 256 164 262 166" fill="none" stroke="#8A1C14" strokeWidth="0.6" opacity="0.5" />
        {/* Lip highlight */}
        <ellipse cx="245" cy="170" rx="7" ry="2.5" fill="#C44838" opacity="0.25" />

        {/* ── Bindi ── */}
        <circle cx="245" cy="90" r="3.5" fill="var(--primary)" />
        <circle cx="245" cy="90" r="2" fill="var(--primary)" opacity="0.7" />
        <circle cx="245" cy="89.5" r="0.8" fill="var(--primary-foreground)" opacity="0.4" />

        {/* ── Jewelry ── */}
        {/* Necklace */}
        <path d="M218 198 C228 205 238 208 248 208 C258 208 268 205 278 198" fill="none" stroke="url(#about-zari)" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M216 203 C226 211 238 214 248 214 C258 214 270 211 280 203" fill="none" stroke="url(#about-zari)" strokeWidth="1.3" strokeLinecap="round" />
        {/* Pendant */}
        <path d="M244 214 L248 223 L252 214" fill="var(--accent)" />
        <circle cx="248" cy="225" r="2.5" fill="var(--primary)" stroke="var(--accent)" strokeWidth="0.6" />

        {/* Earrings — jhumka */}
        <circle cx="192" cy="145" r="3" fill="var(--accent)" />
        <path d="M188 148 L192 160 L196 148" fill="var(--accent)" />
        <circle cx="192" cy="162" r="3.5" fill="var(--accent)" opacity="0.85" />
        <circle cx="192" cy="162" r="1.8" fill="var(--primary)" />
        <circle cx="305" cy="140" r="3" fill="var(--accent)" />
        <path d="M301 143 L305 155 L309 143" fill="var(--accent)" />
        <circle cx="305" cy="157" r="3.5" fill="var(--accent)" opacity="0.85" />
        <circle cx="305" cy="157" r="1.8" fill="var(--primary)" />

        {/* Bangles */}
        <ellipse cx="106" cy="348" rx="12" ry="5.5" fill="none" stroke="var(--accent)" strokeWidth="1.8" />
        <ellipse cx="106" cy="344" rx="11.5" ry="5" fill="none" stroke="var(--accent)" strokeWidth="1" />
        <ellipse cx="106" cy="352" rx="11.5" ry="5" fill="none" stroke="var(--primary)" strokeWidth="1.3" />
      </svg>
    </div>
  );
}
