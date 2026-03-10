/**
 * Root 404 — shown for invalid locale URLs like /yooooo.
 * Renders a styled static page (no providers available at root level).
 * For locale-valid URLs, the catch-all [locale]/[...rest]/page.tsx
 * triggers the rich animated [locale]/not-found.tsx instead.
 */
import Link from 'next/link';

export default function RootNotFound() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Page Not Found | Womaniya</title>
        <style>{`
          body {
            margin: 0; min-height: 100vh;
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            background: #FBF8F1; color: #1C1917;
            font-family: system-ui, -apple-system, sans-serif; text-align: center; padding: 2rem;
          }
          .num { font-size: 5rem; font-weight: 800; letter-spacing: 0.06em; color: rgba(192,57,43,0.12); line-height: 1; margin: 0 0 0.5rem; }
          h1 { font-weight: 400; font-style: italic; font-size: 1.5rem; margin: 0 0 0.5rem; color: #1C1917; }
          p { color: #8A7E72; font-size: 0.875rem; margin: 0 0 1.5rem; max-width: 28rem; line-height: 1.6; }
          a { display: inline-flex; align-items: center; gap: 0.5rem; color: #FBF8F1; background: #C0392B; text-decoration: none; padding: 0.625rem 1.5rem; border-radius: 9999px; font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase; font-weight: 500; }
          a:hover { background: #A93226; }
          .brand { margin-top: 2rem; font-size: 0.6rem; letter-spacing: 0.35em; text-transform: uppercase; color: rgba(138,126,114,0.35); }
        `}</style>
      </head>
      <body>
        <div className="num">404</div>
        <h1>The thread is lost</h1>
        <p>This page has unraveled from the loom. The threads have come undone, but the weave continues elsewhere.</p>
        <Link href="/en">Return to Womaniya</Link>
        <div className="brand">W O M A N I Y A</div>
      </body>
    </html>
  );
}
