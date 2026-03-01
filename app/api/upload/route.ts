import { NextRequest, NextResponse } from 'next/server';
import { put }                       from '@vercel/blob';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file     = formData.get('file') as File | null;

  if (!file) {
    return NextResponse.json({ error: 'No file' }, { status: 400 });
  }

  const filename = `products/${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
  const { url }  = await put(filename, file, { access: 'public' });

  return NextResponse.json({ url });
}
