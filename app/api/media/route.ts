import { NextResponse } from 'next/server';
import { auth }        from '@/auth';
import { getAllMedia }  from '@/actions/media';

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const assets = await getAllMedia();
  return NextResponse.json(assets);
}
