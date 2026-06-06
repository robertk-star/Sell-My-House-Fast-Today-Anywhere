const crypto = require('crypto');
const COOKIE_NAME = 'smhta_admin_session';
const SESSION_DAYS = 7;

function requireEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing ${name} environment variable.`);
  return value;
}

function json(res, status, payload) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(payload));
}

function getSupabaseConfig() {
  return {
    url: requireEnv('NEXT_PUBLIC_SUPABASE_URL').replace(/\/$/, ''),
    key: requireEnv('SUPABASE_SERVICE_ROLE_KEY')
  };
}

async function supabaseRequest(path, options = {}) {
  const { url, key } = getSupabaseConfig();
  const response = await fetch(`${url}/rest/v1/${path}`, {
    ...options,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  });
  if (!response.ok) {
    const details = await response.text();
    throw new Error(details || `Supabase request failed with status ${response.status}.`);
  }
  if (response.status === 204) return null;
  return response.json();
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try { resolve(body ? JSON.parse(body) : {}); } catch (error) { reject(error); }
    });
    req.on('error', reject);
  });
}

function clean(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function sign(value) {
  return crypto.createHmac('sha256', requireEnv('ADMIN_SESSION_SECRET')).update(value).digest('hex');
}

function createSessionToken() {
  const payload = { role: 'admin', exp: Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000 };
  const encoded = Buffer.from(JSON.stringify(payload)).toString('base64url');
  return `${encoded}.${sign(encoded)}`;
}

function verifySessionToken(token) {
  if (!token) return false;
  const [encoded, signature] = token.split('.');
  if (!encoded || !signature) return false;
  const expected = sign(encoded);
  if (signature.length !== expected.length) return false;
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return false;
  try {
    const payload = JSON.parse(Buffer.from(encoded, 'base64url').toString());
    return payload.role === 'admin' && payload.exp > Date.now();
  } catch { return false; }
}

function getCookie(req, name) {
  const cookie = req.headers.cookie || '';
  return cookie.split(';').map(v => v.trim()).find(v => v.startsWith(`${name}=`))?.split('=').slice(1).join('=');
}

function isAdminAuthenticated(req) {
  return verifySessionToken(getCookie(req, COOKIE_NAME));
}

function setAdminCookie(res, token) {
  res.setHeader('Set-Cookie', `${COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=${SESSION_DAYS * 24 * 60 * 60}`);
}

function clearAdminCookie(res) {
  res.setHeader('Set-Cookie', `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=0`);
}

module.exports = { json, supabaseRequest, parseBody, clean, createSessionToken, isAdminAuthenticated, setAdminCookie, clearAdminCookie };
