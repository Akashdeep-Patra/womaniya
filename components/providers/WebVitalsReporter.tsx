'use client';

import { useReportWebVitals } from 'next/web-vitals';

const THRESHOLDS: Record<string, { good: number; poor: number }> = {
  LCP:  { good: 2500, poor: 4000 },
  INP:  { good: 200,  poor: 500 },
  CLS:  { good: 0.1,  poor: 0.25 },
  FCP:  { good: 1800, poor: 3000 },
  TTFB: { good: 800,  poor: 1800 },
};

function getRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const t = THRESHOLDS[name];
  if (!t) return 'good';
  if (value <= t.good) return 'good';
  if (value <= t.poor) return 'needs-improvement';
  return 'poor';
}

const RATING_COLORS = {
  good: '#0CCE6B',
  'needs-improvement': '#FFA400',
  poor: '#FF4E42',
} as const;

export function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    const rating = metric.rating ?? getRating(metric.name, metric.value);
    const color = RATING_COLORS[rating] ?? '#888';
    const unit = metric.name === 'CLS' ? '' : 'ms';
    const val = metric.name === 'CLS'
      ? metric.value.toFixed(4)
      : `${Math.round(metric.value)}${unit}`;

    if (process.env.NODE_ENV === 'development') {
      console.log(
        `%c[Web Vital] %c${metric.name} %c${val} %c(${rating})`,
        'color: #888; font-weight: bold',
        'color: inherit; font-weight: bold',
        `color: ${color}; font-weight: bold`,
        `color: ${color}`,
      );
    }

    if (typeof window !== 'undefined' && 'sendBeacon' in navigator) {
      const body = JSON.stringify({
        name: metric.name,
        value: metric.value,
        rating,
        id: metric.id,
        navigationType: metric.navigationType,
        page: window.location.pathname,
      });
      navigator.sendBeacon('/api/web-vitals', body);
    }
  });

  return null;
}
