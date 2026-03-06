import { ImageResponse } from 'next/og';

export const OG_SIZE = { width: 600, height: 315 };

const COLORS = {
  cream: '#F9F6F0',
  kajal: '#2C2C2C',
  sindoor: '#C0392B',
  kansa: '#C5A059',
  mati: '#F5EDE0',
  white: '#FFFFFF',
} as const;

function BrandLogo({ size = 30 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="46" fill="#C0392B" />
      <path
        d="M 19 36 C 16 34, 14 37, 15 40 C 16 42, 19 42, 20 40 L 34 72 C 35 74, 36 74, 37 72 L 47 40 C 48 38, 49 38, 50 40 L 60 72 C 61 74, 62 74, 63 72 L 76 28 C 77 24, 80 22, 82 24 C 84 26, 83 30, 80 31 C 77 32, 75 30, 76 28"
        fill="none"
        stroke="#FBF8F1"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="48" cy="30" r="3" fill="#D4A843" />
    </svg>
  );
}

type OgVariant = 'default' | 'product' | 'collection' | 'story' | 'category';

interface OgImageOptions {
  title: string;
  subtitle?: string;
  badge?: string;
  imageUrl?: string;
  variant?: OgVariant;
  price?: string;
}

const VARIANT_ACCENTS: Record<OgVariant, string> = {
  default: COLORS.sindoor,
  product: COLORS.sindoor,
  collection: COLORS.kansa,
  story: COLORS.kajal,
  category: COLORS.sindoor,
};

const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT || 5001}`;
};

export function generateOgImage({
  title,
  subtitle,
  badge,
  imageUrl,
  variant = 'default',
  price,
}: OgImageOptions): ImageResponse {
  const accentColor = VARIANT_ACCENTS[variant];
  
  let resolvedImageUrl = imageUrl;
  if (resolvedImageUrl && resolvedImageUrl.startsWith('/')) {
    if (resolvedImageUrl.endsWith('.svg')) {
      resolvedImageUrl = undefined;
    } else {
      resolvedImageUrl = new URL(resolvedImageUrl, getBaseUrl()).toString();
    }
  }
  const hasImage = !!resolvedImageUrl;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: COLORS.cream,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle pattern overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.03,
            backgroundImage:
              'radial-gradient(circle at 25% 25%, #2C2C2C 1px, transparent 1px)',
            backgroundSize: '15px 15px',
            display: 'flex',
          }}
        />

        {/* Accent stripe at top */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: accentColor,
            display: 'flex',
          }}
        />

        {hasImage ? (
          // Layout with image: left text, right image
          <div
            style={{
              display: 'flex',
              width: '100%',
              height: '100%',
            }}
          >
            {/* Text side */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                width: '55%',
                padding: '28px 24px 24px',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {badge && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: 8,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 7,
                        fontWeight: 600,
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: accentColor,
                      }}
                    >
                      {badge}
                    </span>
                  </div>
                )}
                <h1
                  style={{
                    fontSize: title.length > 40 ? 20 : 26,
                    fontWeight: 700,
                    color: COLORS.kajal,
                    lineHeight: 1.15,
                    marginBottom: 8,
                    fontFamily: 'serif',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {title}
                </h1>
                {price && (
                  <span
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: COLORS.sindoor,
                      fontFamily: 'serif',
                      marginBottom: 4,
                    }}
                  >
                    {price}
                  </span>
                )}
                {subtitle && (
                  <p
                    style={{
                      fontSize: 10,
                      color: `${COLORS.kajal}99`,
                      lineHeight: 1.5,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {subtitle}
                  </p>
                )}
              </div>

              {/* Brand footer */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 7,
                }}
              >
                <BrandLogo size={20} />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: COLORS.kajal,
                      letterSpacing: '0.06em',
                      fontFamily: 'serif',
                    }}
                  >
                    WOMANIYA
                  </span>
                  <span
                    style={{
                      fontSize: 6,
                      color: COLORS.kansa,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Authentic Handloom Heritage
                  </span>
                </div>
              </div>
            </div>

            {/* Image side */}
            <div
              style={{
                width: '45%',
                height: '100%',
                display: 'flex',
                position: 'relative',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={resolvedImageUrl}
                alt=""
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              {/* Soft blend edge */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  bottom: 0,
                  width: 40,
                  background: `linear-gradient(to right, ${COLORS.cream}, transparent)`,
                  display: 'flex',
                }}
              />
            </div>
          </div>
        ) : (
          // Centered layout without image
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
              padding: '28px 40px 24px',
              textAlign: 'center',
            }}
          >
            <BrandLogo size={36} />

            {badge && (
              <span
                style={{
                  fontSize: 7,
                  fontWeight: 600,
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: accentColor,
                  marginTop: 14,
                  marginBottom: 4,
                }}
              >
                {badge}
              </span>
            )}

            <h1
              style={{
                fontSize: title.length > 30 ? 24 : 32,
                fontWeight: 700,
                color: COLORS.kajal,
                lineHeight: 1.15,
                marginTop: badge ? 4 : 14,
                marginBottom: 8,
                fontFamily: 'serif',
              }}
            >
              {title}
            </h1>

            {subtitle && (
              <p
                style={{
                  fontSize: 12,
                  color: COLORS.kansa,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  marginTop: 2,
                }}
              >
                {subtitle}
              </p>
            )}

            {/* Decorative line */}
            <div
              style={{
                width: 40,
                height: 1,
                background: COLORS.kansa,
                opacity: 0.4,
                marginTop: 16,
                display: 'flex',
              }}
            />
          </div>
        )}
      </div>
    ),
    { ...OG_SIZE }
  );
}
