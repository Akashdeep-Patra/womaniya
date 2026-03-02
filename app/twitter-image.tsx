import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Womaniya - Authentic Bengali Handlooms';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#F9F6F0', // bengal-kori
        }}
      >
        <svg
          width="240"
          height="240"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 20 35 C 20 70, 45 90, 50 90 C 55 90, 80 70, 80 35 C 80 15, 65 10, 50 25 C 35 10, 20 15, 20 35 Z"
            stroke="#2C2C2C" // bengal-kajal
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 38 32 L 50 48 L 62 32"
            stroke="#C5A059" // bengal-kansa
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 32 48 L 50 72 L 68 48"
            stroke="#C5A059"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="50" cy="55" r="5.5" fill="#8A1C14" />
        </svg>

        <h1
          style={{
            fontSize: 72,
            fontFamily: 'serif',
            color: '#2C2C2C', // bengal-kajal
            marginTop: 40,
            letterSpacing: '0.1em',
            fontWeight: 'bold',
          }}
        >
          WOMANIYA
        </h1>
        <p
          style={{
            fontSize: 32,
            color: '#C5A059', // bengal-kansa
            marginTop: 10,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            fontWeight: 500,
          }}
        >
          Authentic Bengali Handlooms
        </p>
      </div>
    ),
    { ...size }
  );
}
