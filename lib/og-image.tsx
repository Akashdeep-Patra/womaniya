import { ImageResponse } from 'next/og';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

export const OG_SIZE = { width: 1200, height: 630 };

// ── Brand palette ──────────────────────────────────────────────────────────
const COLORS = {
  cream:   '#F9F6F0',
  kajal:   '#1C1412',
  sindoor: '#C0392B',
  kansa:   '#C5A059',
  mati:    '#F0E8D8',
  gold:    '#D4A843',
} as const;

// ── Fonts (loaded once at module level, cached across requests) ────────────
let _playfair: ArrayBuffer | null = null;
let _interReg: ArrayBuffer | null = null;
let _interBold: ArrayBuffer | null = null;

function getFonts(): {
  playfair: ArrayBuffer;
  interReg: ArrayBuffer;
  interBold: ArrayBuffer;
} {
  if (!_playfair || !_interReg || !_interBold) {
    const dir = path.join(process.cwd(), 'public', 'fonts');
    _playfair  = fs.readFileSync(path.join(dir, 'playfair-bold.ttf')).buffer as ArrayBuffer;
    _interReg  = fs.readFileSync(path.join(dir, 'inter-regular.ttf')).buffer as ArrayBuffer;
    _interBold = fs.readFileSync(path.join(dir, 'inter-bold.ttf')).buffer as ArrayBuffer;
  }
  return { playfair: _playfair, interReg: _interReg, interBold: _interBold };
}

// ── SVG brand logo (W in a circle) ────────────────────────────────────────
function BrandLogo({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="46" fill={COLORS.sindoor} />
      <path
        d="M 19 36 C 16 34, 14 37, 15 40 C 16 42, 19 42, 20 40 L 34 72 C 35 74, 36 74, 37 72 L 47 40 C 48 38, 49 38, 50 40 L 60 72 C 61 74, 62 74, 63 72 L 76 28 C 77 24, 80 22, 82 24 C 84 26, 83 30, 80 31 C 77 32, 75 30, 76 28"
        fill="none"
        stroke="#FBF8F1"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="48" cy="30" r="3" fill={COLORS.gold} />
    </svg>
  );
}

// ── Types ──────────────────────────────────────────────────────────────────
type OgVariant = 'default' | 'product' | 'collection' | 'story' | 'category';

export interface OgImageOptions {
  title: string;
  subtitle?: string;
  badge?: string;
  imageUrl?: string;
  variant?: OgVariant;
  price?: string;
}

const VARIANT_ACCENTS: Record<OgVariant, string> = {
  default:    COLORS.sindoor,
  product:    COLORS.sindoor,
  collection: COLORS.kansa,
  story:      COLORS.kajal,
  category:   COLORS.sindoor,
};

// ── URL helpers ───────────────────────────────────────────────────────────
const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 5001}`;
};

/**
 * Satori (used by next/og ImageResponse) only supports PNG and JPEG images.
 * WebP images cause "Unsupported image type: unknown" and crash the OG route.
 *
 * This helper fetches any image URL, converts it to PNG via sharp if needed,
 * and returns a data URL safe for use in Satori JSX.
 * Returns undefined on any error so the caller can fall back gracefully.
 */
async function toSatoriSafeDataUrl(url: string): Promise<string | undefined> {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) return undefined;

    const buffer = Buffer.from(await res.arrayBuffer());
    const contentType = res.headers.get('content-type') ?? '';

    if (contentType.includes('image/jpeg') || contentType.includes('image/jpg')) {
      return `data:image/jpeg;base64,${buffer.toString('base64')}`;
    }
    if (contentType.includes('image/png')) {
      return `data:image/png;base64,${buffer.toString('base64')}`;
    }

    // WebP, AVIF, GIF, or unknown — convert to PNG via sharp
    const png = await sharp(buffer).png().toBuffer();
    return `data:image/png;base64,${png.toString('base64')}`;
  } catch {
    return undefined;
  }
}

// ── Main generator ────────────────────────────────────────────────────────
export async function generateOgImage({
  title,
  subtitle,
  badge,
  imageUrl,
  variant = 'default',
  price,
}: OgImageOptions): Promise<ImageResponse> {
  const fonts = getFonts();
  const accentColor = VARIANT_ACCENTS[variant];

  // ── Resolve & normalise the image URL ──────────────────────────────────
  let resolvedImageUrl: string | undefined = imageUrl;

  if (resolvedImageUrl?.startsWith('/')) {
    if (resolvedImageUrl.endsWith('.svg')) {
      resolvedImageUrl = undefined; // SVGs not supported by Satori
    } else {
      resolvedImageUrl = new URL(resolvedImageUrl, getBaseUrl()).toString();
    }
  }

  // Convert non-JPEG/PNG images (e.g. WebP, AVIF) to a PNG data URL
  if (resolvedImageUrl) {
    const needsConversion =
      /\.webp([?#]|$)/i.test(resolvedImageUrl) ||
      /\.avif([?#]|$)/i.test(resolvedImageUrl) ||
      /\.gif([?#]|$)/i.test(resolvedImageUrl);

    if (needsConversion) {
      resolvedImageUrl = (await toSatoriSafeDataUrl(resolvedImageUrl)) ?? undefined;
    }
  }

  const hasImage = !!resolvedImageUrl;

  // Truncate long strings
  const displayTitle    = title.length > 80    ? title.slice(0, 77) + '…'    : title;
  const displaySubtitle = subtitle && subtitle.length > 130
    ? subtitle.slice(0, 127) + '…'
    : subtitle;

  return new ImageResponse(
    (
      <div
        style={{
          width:    '100%',
          height:   '100%',
          display:  'flex',
          background: COLORS.cream,
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'Inter',
        }}
      >
        {/* ── Sindoor top accent bar ─────────────────────────────────────── */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 5,
            background: COLORS.sindoor,
            display: 'flex',
          }}
        />

        {hasImage ? (
          // ─────────────────────────────────────────────────────────────────
          // LAYOUT A: Split — text left 58%, image right 42%
          // ─────────────────────────────────────────────────────────────────
          <div style={{ display: 'flex', width: '100%', height: '100%' }}>

            {/* Text panel */}
            <div
              style={{
                display:        'flex',
                flexDirection:  'column',
                justifyContent: 'space-between',
                width:          '58%',
                padding:        '52px 44px 44px',
                position:       'relative',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

                {/* Eyebrow badge */}
                {(badge ?? 'WOMANIYA') && (
                  <div
                    style={{
                      display:       'flex',
                      alignItems:    'center',
                      marginBottom:  18,
                    }}
                  >
                    <span
                      style={{
                        fontSize:      12,
                        fontWeight:    700,
                        fontFamily:    'Inter',
                        letterSpacing: '0.22em',
                        textTransform: 'uppercase',
                        color:         COLORS.kansa,
                      }}
                    >
                      {badge ?? 'WOMANIYA'}
                    </span>
                  </div>
                )}

                {/* Title */}
                <h1
                  style={{
                    fontSize:     displayTitle.length > 40 ? 38 : 52,
                    fontWeight:   700,
                    fontFamily:   'Playfair',
                    color:        COLORS.kajal,
                    lineHeight:   1.15,
                    marginBottom: 14,
                    margin:       0,
                    padding:      0,
                  }}
                >
                  {displayTitle}
                </h1>

                {/* Price */}
                {price && (
                  <span
                    style={{
                      display:      'flex',
                      fontSize:     34,
                      fontWeight:   700,
                      fontFamily:   'Playfair',
                      color:        COLORS.sindoor,
                      marginTop:    14,
                      marginBottom: 10,
                    }}
                  >
                    {price}
                  </span>
                )}

                {/* Subtitle */}
                {displaySubtitle && (
                  <p
                    style={{
                      fontSize:     17,
                      fontFamily:   'Inter',
                      color:        `${COLORS.kajal}B3`,
                      lineHeight:   1.55,
                      marginTop:    price ? 0 : 14,
                      margin:       price ? '0' : '14px 0 0 0',
                      padding:      0,
                    }}
                  >
                    {displaySubtitle}
                  </p>
                )}
              </div>

              {/* Brand footer */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <BrandLogo size={40} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span
                    style={{
                      fontSize:      16,
                      fontWeight:    700,
                      fontFamily:    'Playfair',
                      color:         COLORS.kajal,
                      letterSpacing: '0.07em',
                    }}
                  >
                    WOMANIYA
                  </span>
                  <span
                    style={{
                      fontSize:      11,
                      fontFamily:    'Inter',
                      color:         COLORS.kansa,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                    }}
                  >
                    est. 2019
                  </span>
                </div>
              </div>
            </div>

            {/* Vertical divider */}
            <div
              style={{
                position:   'absolute',
                top:        40,
                bottom:     40,
                left:       '58%',
                width:      1,
                background: `${COLORS.kansa}4D`,
                display:    'flex',
              }}
            />

            {/* Image panel */}
            <div
              style={{
                width:    '42%',
                height:   '100%',
                display:  'flex',
                position: 'relative',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={resolvedImageUrl}
                alt=""
                style={{
                  width:      '100%',
                  height:     '100%',
                  objectFit:  'cover',
                }}
              />
              {/* Left-edge cream fade */}
              <div
                style={{
                  position:   'absolute',
                  top:        0,
                  left:       0,
                  bottom:     0,
                  width:      90,
                  background: `linear-gradient(to right, ${COLORS.cream}, transparent)`,
                  display:    'flex',
                }}
              />
            </div>
          </div>
        ) : (
          // ─────────────────────────────────────────────────────────────────
          // LAYOUT B: Centred — no image
          // ─────────────────────────────────────────────────────────────────
          <div
            style={{
              display:        'flex',
              flexDirection:  'column',
              alignItems:     'center',
              justifyContent: 'center',
              width:          '100%',
              height:         '100%',
              padding:        '56px 100px 52px',
              textAlign:      'center',
            }}
          >
            {/* Decorative "W" monogram */}
            <div
              style={{
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                width:          80,
                height:         80,
                borderRadius:   '50%',
                background:     COLORS.kajal,
                marginBottom:   28,
              }}
            >
              <span
                style={{
                  fontSize:   42,
                  fontWeight: 700,
                  fontFamily: 'Playfair',
                  color:      COLORS.kansa,
                  lineHeight: 1,
                }}
              >
                W
              </span>
            </div>

            {/* Kansa rule + eyebrow */}
            <div
              style={{
                display:     'flex',
                alignItems:  'center',
                gap:         16,
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  width:      60,
                  height:     1,
                  background: COLORS.kansa,
                  opacity:    0.5,
                  display:    'flex',
                }}
              />
              <span
                style={{
                  fontSize:      12,
                  fontWeight:    700,
                  fontFamily:    'Inter',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color:         accentColor,
                }}
              >
                {badge ?? 'WOMANIYA'}
              </span>
              <div
                style={{
                  width:      60,
                  height:     1,
                  background: COLORS.kansa,
                  opacity:    0.5,
                  display:    'flex',
                }}
              />
            </div>

            {/* Title */}
            <h1
              style={{
                fontSize:     displayTitle.length > 30 ? 44 : 56,
                fontWeight:   700,
                fontFamily:   'Playfair',
                color:        COLORS.kajal,
                lineHeight:   1.15,
                marginBottom: 20,
                margin:       '0 0 20px 0',
                padding:      0,
              }}
            >
              {displayTitle}
            </h1>

            {/* Subtitle */}
            {displaySubtitle && (
              <p
                style={{
                  fontSize:   20,
                  fontFamily: 'Inter',
                  color:      `${COLORS.kajal}99`,
                  lineHeight: 1.55,
                  margin:     '0 0 28px 0',
                  padding:    0,
                }}
              >
                {displaySubtitle}
              </p>
            )}

            {/* Domain */}
            <span
              style={{
                fontSize:      13,
                fontFamily:    'Inter',
                color:         COLORS.kansa,
                letterSpacing: '0.12em',
                marginTop:     displaySubtitle ? 0 : 28,
              }}
            >
              womaniyakolkata.in
            </span>
          </div>
        )}
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: 'Playfair', data: fonts.playfair,  weight: 700, style: 'normal' },
        { name: 'Inter',    data: fonts.interReg,  weight: 400, style: 'normal' },
        { name: 'Inter',    data: fonts.interBold,  weight: 700, style: 'normal' },
      ],
    }
  );
}
