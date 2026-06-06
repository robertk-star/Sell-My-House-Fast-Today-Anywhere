import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { createSessionToken, setAdminCookie } from '@/lib/auth';

function safeCompare(a: string, b: string) {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);
  if (aBuffer.length !== bBuffer.length) return false;
  return crypto.timingSafeEqual(aBuffer, bBuffer);
}

export async function POST(request: NextRequest) {
  const { password } = await request.json();
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return NextResponse.json({ error: 'ADMIN_PASSWORD is not configured.' }, { status: 500 });
  }

  if (typeof password !== 'string' || !safeCompare(password, adminPassword)) {
    return NextResponse.json({ error: 'Invalid password.' }, { status: 401 });
  }

  await setAdminCookie(createSessionToken());
  return NextResponse.json({ ok: true });
}
