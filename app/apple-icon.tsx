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
          background: '#FBF8F1',
        }}
      >
        <svg
          width="140"
          height="140"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Sindoor red circle */}
          <circle cx="50" cy="50" r="46" fill="#C0392B" />

          {/* Calligraphic W */}
          {/* Left curl */}
          <path
            d="M 18 38 C 15 38, 14 42, 17 44 C 19 45, 21 43, 21 41"
            stroke="#FBF8F1"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Left descender */}
          <path
            d="M 21 41 L 36 74"
            stroke="#FBF8F1"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Center-left ascender */}
          <path
            d="M 36 74 L 46 38"
            stroke="#FBF8F1"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Center-right descender */}
          <path
            d="M 46 38 L 58 74"
            stroke="#FBF8F1"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Right ascender */}
          <path
            d="M 58 74 L 68 22"
            stroke="#FBF8F1"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Top curl */}
          <path
            d="M 68 22 C 68 16, 73 13, 77 15 C 80 17, 79 22, 75 24 C 72 25, 69 23, 68 22"
            stroke="#FBF8F1"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Gold bindi accent */}
          <circle cx="50" cy="28" r="2.5" fill="#D4A843" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
