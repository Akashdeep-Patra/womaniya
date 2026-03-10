import { NextResponse } from 'next/server';
import { logger } from '@/lib/logger';

type WebVitalPayload = {
  name: string;
  value: number;
  rating: string;
  id: string;
  navigationType: string;
  page: string;
};

const POOR_THRESHOLDS: Record<string, number> = {
  LCP: 4000,
  INP: 500,
  CLS: 0.25,
  FCP: 3000,
  TTFB: 1800,
};

const VALID_METRIC_NAMES = new Set(['LCP', 'INP', 'CLS', 'FCP', 'TTFB', 'FID']);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (
      !body ||
      typeof body.name !== 'string' ||
      typeof body.value !== 'number' ||
      !VALID_METRIC_NAMES.has(body.name)
    ) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const metric = body as WebVitalPayload;

    const threshold = POOR_THRESHOLDS[metric.name];
    if (threshold && metric.value > threshold) {
      logger.warn('Poor web vital detected', {
        metric: metric.name,
        value: metric.value,
        page: String(metric.page || '').slice(0, 200),
        navigationType: String(metric.navigationType || '').slice(0, 50),
      });
    }

    return NextResponse.json({ ok: true }, { status: 202 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
