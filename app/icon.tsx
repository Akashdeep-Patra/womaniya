import { ImageResponse } from 'next/og';

// App Router uses icon.tsx to generate favicons dynamically
export const size = { width: 48, height: 48 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
        }}
      >
        <svg
          width="48"
          height="48"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Transparent or solid background behind the icon */}
          <circle cx="50" cy="50" r="48" fill="#F9F6F0" />
          
          <path
            d="M 20 35 C 20 70, 45 90, 50 90 C 55 90, 80 70, 80 35 C 80 15, 65 10, 50 25 C 35 10, 20 15, 20 35 Z"
            stroke="#2C2C2C"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 38 32 L 50 48 L 62 32"
            stroke="#C5A059"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 32 48 L 50 72 L 68 48"
            stroke="#C5A059"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="50" cy="55" r="7" fill="#8A1C14" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
