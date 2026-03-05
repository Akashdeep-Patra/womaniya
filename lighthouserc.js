/** @type {import('@lhci/cli').Config} */
module.exports = {
  ci: {
    collect: {
      startServerCommand: 'pnpm start',
      startServerReadyPattern: 'Ready in',
      url: [
        'http://localhost:3000/en',
        'http://localhost:3000/en/shop',
        'http://localhost:3000/en/about',
      ],
      numberOfRuns: 3,
      settings: {
        preset: 'desktop',
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      },
    },
    assert: {
      assertions: {
        'categories:performance':  ['error', { minScore: 0.8 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo':          ['warn', { minScore: 0.9 }],

        'first-contentful-paint':   ['warn', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 3500 }],
        'cumulative-layout-shift':  ['error', { maxNumericValue: 0.15 }],
        'total-blocking-time':      ['warn', { maxNumericValue: 300 }],
        'speed-index':              ['warn', { maxNumericValue: 4000 }],
        'interactive':              ['warn', { maxNumericValue: 5000 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
