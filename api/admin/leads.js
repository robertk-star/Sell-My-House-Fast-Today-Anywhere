const { json, supabaseRequest, parseBody, clean, isAdminAuthenticated } = require('../_utils');

module.exports = async function handler(req, res) {
  if (!isAdminAuthenticated(req)) return json(res, 401, { error: 'Unauthorized.' });
  try {
    if (req.method === 'GET') {
      const url = new URL(req.url, `https://${req.headers.host}`);
      const search = clean(url.searchParams.get('search'));
      const status = clean(url.searchParams.get('status'));
      const columns = ['id','created_at','property_address','property_city','property_state','property_zip','seller_name','seller_phone','seller_email','property_condition','reason_for_selling','desired_timeline','best_time_to_contact','notes','lead_status','admin_notes'].join(',');
      const params = new URLSearchParams({ select: columns, order: 'created_at.desc', limit: '100' });
      if (status && status !== 'all') params.set('lead_status', `eq.${status}`);
      if (search) {
        const pattern = `*${search.replace(/[%_]/g, '')}*`;
        params.set('or', `(seller_name.ilike.${pattern},seller_phone.ilike.${pattern},seller_email.ilike.${pattern},property_address.ilike.${pattern},property_city.ilike.${pattern})`);
      }
      const leads = await supabaseRequest(`seller_leads?${params.toString()}`);
      return json(res, 200, { leads });
    }
    if (req.method === 'PATCH') {
      const body = await parseBody(req);
      const id = clean(body.id);
      if (!id) return json(res, 400, { error: 'Missing lead ID.' });
      await supabaseRequest(`seller_leads?id=eq.${encodeURIComponent(id)}`, {
        method:'PATCH', headers:{ Prefer:'return=minimal' }, body: JSON.stringify({ lead_status: clean(body.lead_status) || 'new', admin_notes: clean(body.admin_notes) || null, updated_at: new Date().toISOString() })
      });
      return json(res, 200, { ok: true });
    }
    return json(res, 405, { error: 'Method not allowed.' });
  } catch (error) {
    console.error('Admin leads error:', error);
    return json(res, 500, { error: error.message || 'Unable to process leads.' });
  }
};
