'use client';

import { useState, useEffect } from 'react';

type SlugCard = {
  name: string;
  path: string;
  description: string;
};

type CardState =
  | { status: 'loading' }
  | { status: 'ready'; ogUrl: string }
  | { status: 'error'; reason: string };

// ── Extracts og:image content from page HTML ───────────────────────────────
async function discoverOgImageUrl(pagePath: string): Promise<string> {
  const res = await fetch(pagePath, {
    // Fetch the page itself (HTML), not the image
    headers: { Accept: 'text/html' },
    cache:   'no-store',
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status} fetching ${pagePath}`);
  }

  const html = await res.text();

  // Match <meta property="og:image" content="..." />
  // Handle both attribute orders and single/double quotes
  const match =
    html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i) ??
    html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);

  if (!match?.[1]) {
    throw new Error(`No og:image meta found at ${pagePath}`);
  }

  return match[1];
}

// ── Single card ────────────────────────────────────────────────────────────
function OgCard({ card }: { card: SlugCard }) {
  const [state, setState] = useState<CardState>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;

    discoverOgImageUrl(card.path)
      .then((url) => {
        if (!cancelled) setState({ status: 'ready', ogUrl: url });
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setState({
            status: 'error',
            reason: err instanceof Error ? err.message : String(err),
          });
        }
      });

    return () => { cancelled = true; };
  }, [card.path]);

  return (
    <div
      style={{
        background:    '#161616',
        borderRadius:  14,
        overflow:      'hidden',
        border:        '1px solid #242424',
        display:       'flex',
        flexDirection: 'column',
      }}
    >
      {/* ── Image area — fixed 1200:630 aspect ratio ─────────────── */}
      <div
        style={{
          position:        'relative',
          paddingBottom:   '52.5%', // 630/1200
          background:      '#1a1a1a',
          overflow:        'hidden',
        }}
      >
        {state.status === 'loading' && (
          <div
            style={{
              position:       'absolute',
              inset:          0,
              display:        'flex',
              flexDirection:  'column',
              alignItems:     'center',
              justifyContent: 'center',
              gap:            10,
            }}
          >
            {/* Animated skeleton shimmer */}
            <div
              style={{
                width:        48,
                height:       48,
                borderRadius: '50%',
                border:       '3px solid #2a2a2a',
                borderTop:    '3px solid #C5A059',
                animation:    'spin 0.9s linear infinite',
              }}
            />
            <span style={{ color: '#444', fontSize: 12 }}>
              Discovering og:image…
            </span>
          </div>
        )}

        {state.status === 'error' && (
          <div
            style={{
              position:       'absolute',
              inset:          0,
              display:        'flex',
              flexDirection:  'column',
              alignItems:     'center',
              justifyContent: 'center',
              gap:            8,
              padding:        24,
            }}
          >
            <span style={{ fontSize: 28 }}>✗</span>
            <span style={{ color: '#C0392B', fontSize: 13, fontWeight: 600 }}>
              Failed to load
            </span>
            <span
              style={{
                color:     '#555',
                fontSize:  11,
                textAlign: 'center',
                wordBreak: 'break-all',
              }}
            >
              {state.reason}
            </span>
          </div>
        )}

        {state.status === 'ready' && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={state.ogUrl}
            alt={card.name}
            style={{
              position:   'absolute',
              inset:      0,
              width:      '100%',
              height:     '100%',
              objectFit:  'cover',
              display:    'block',
            }}
          />
        )}

        {/* Status badge — top-right corner */}
        <div
          style={{
            position:     'absolute',
            top:          10,
            right:        10,
            padding:      '3px 8px',
            borderRadius: 20,
            fontSize:     11,
            fontWeight:   600,
            background:
              state.status === 'loading' ? '#2a2a2a'
              : state.status === 'error'   ? '#3a1010'
              : '#0f2a14',
            color:
              state.status === 'loading' ? '#888'
              : state.status === 'error'   ? '#C0392B'
              : '#3dba5e',
            border: '1px solid ' + (
              state.status === 'loading' ? '#333'
              : state.status === 'error'   ? '#5a2020'
              : '#1e4a28'
            ),
          }}
        >
          {state.status === 'loading' ? '⧖ loading'
            : state.status === 'error' ? '✗ error'
            : '✓ loaded'}
        </div>
      </div>

      {/* ── Card meta ─────────────────────────────────────────────── */}
      <div style={{ padding: '14px 18px 16px' }}>
        <p
          style={{
            color:      '#E8E0D8',
            fontWeight: 600,
            fontSize:   14,
            margin:     '0 0 4px 0',
          }}
        >
          {card.name}
        </p>
        <p
          style={{
            color:    '#555',
            fontSize: 12,
            margin:   '0 0 8px 0',
          }}
        >
          {card.description}
        </p>
        <p
          style={{
            color:      '#333',
            fontSize:   10,
            fontFamily: 'monospace',
            margin:     0,
          }}
        >
          {card.path}
        </p>

        {/* Show resolved og:image URL when ready */}
        {state.status === 'ready' && (
          <p
            style={{
              color:      '#2d5a3a',
              fontSize:   10,
              fontFamily: 'monospace',
              margin:     '4px 0 0 0',
              wordBreak:  'break-all',
              lineHeight: 1.4,
            }}
          >
            ↳ {state.ogUrl.length > 80 ? state.ogUrl.slice(0, 77) + '…' : state.ogUrl}
          </p>
        )}
      </div>
    </div>
  );
}

// ── Grid ───────────────────────────────────────────────────────────────────
export default function OgGrid({ cards }: { cards: SlugCard[] }) {
  return (
    <>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>

      <div
        style={{
          display:             'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(540px, 1fr))',
          gap:                 28,
        }}
      >
        {cards.map((card) => (
          <OgCard key={card.path} card={card} />
        ))}
      </div>

      {cards.length === 0 && (
        <div
          style={{
            textAlign: 'center',
            color:     '#444',
            fontSize:  16,
            padding:   80,
          }}
        >
          No cards to display. Check that the DB has published content.
        </div>
      )}
    </>
  );
}
