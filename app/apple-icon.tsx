import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#F9F6F0', // bengal-kori
        }}
      >
        <svg
          width="120"
          height="120"
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
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 32 48 L 50 72 L 68 48"
            stroke="#C5A059"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="50" cy="55" r="6" fill="#8A1C14" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
