import crypto from 'crypto';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'smhta_admin_session';
const SESSION_DAYS = 7;

type AdminSession = {
  role: 'admin';
  exp: number;
};

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error('Missing ADMIN_SESSION_SECRET environment variable.');
  return secret;
}

function sign(value: string) {
  return crypto.createHmac('sha256', getSecret()).update(value).digest('hex');
}

export function createSessionToken() {
  const payload: AdminSession = {
    role: 'admin',
    exp: Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000
  };
  const encoded = Buffer.from(JSON.stringify(payload)).toString('base64url');
  return `${encoded}.${sign(encoded)}`;
}

export function verifySessionToken(token?: string) {
  if (!token) return false;
  const [encoded, signature] = token.split('.');
  if (!encoded || !signature) return false;
  const expected = sign(encoded);
  if (signature.length !== expected.length) return false;
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return false;

  try {
    const payload = JSON.parse(Buffer.from(encoded, 'base64url').toString()) as AdminSession;
    return payload.role === 'admin' && payload.exp > Date.now();
  } catch {
    return false;
  }
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get(COOKIE_NAME)?.value);
}

export async function setAdminCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_DAYS * 24 * 60 * 60
  });
}

export async function clearAdminCookie() {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0
  });
}
