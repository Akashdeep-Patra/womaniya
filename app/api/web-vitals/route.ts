import { NextResponse } from 'next/server';

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

export async function POST(request: Request) {
  try {
    const metric = (await request.json()) as WebVitalPayload;

    const threshold = POOR_THRESHOLDS[metric.name];
    if (threshold && metric.value > threshold) {
      console.warn(
        `[Web Vital POOR] ${metric.name}=${metric.value} on ${metric.page} (${metric.navigationType})`,
      );
    }

    return NextResponse.json({ ok: true }, { status: 202 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
