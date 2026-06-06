const { json, parseBody, clean, createSessionToken, setAdminCookie } = require('../_utils');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed.' });
  try {
    const body = await parseBody(req);
    const password = clean(body.password);
    if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) return json(res, 401, { error: 'Invalid password.' });
    setAdminCookie(res, createSessionToken());
    return json(res, 200, { ok: true });
  } catch (error) {
    return json(res, 500, { error: 'Unable to log in.' });
  }
};
