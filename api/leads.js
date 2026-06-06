const { json, supabaseRequest, parseBody, clean } = require('./_utils');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed.' });
  try {
    const body = await parseBody(req);
    const property_address = clean(body.property_address);
    const seller_name = clean(body.seller_name);
    const seller_phone = clean(body.seller_phone);
    if (!property_address || !seller_name || !seller_phone) return json(res, 400, { error: 'Property address, name, and phone are required.' });
    if (!body.consent_to_contact) return json(res, 400, { error: 'Please agree to be contacted before submitting.' });
    const lead = {
      property_address,
      property_city: clean(body.property_city) || null,
      property_state: clean(body.property_state) || null,
      property_zip: clean(body.property_zip) || null,
      seller_name,
      seller_phone,
      seller_email: clean(body.seller_email) || null,
      property_condition: clean(body.property_condition) || null,
      reason_for_selling: clean(body.reason_for_selling) || null,
      desired_timeline: clean(body.desired_timeline) || null,
      best_time_to_contact: clean(body.best_time_to_contact) || null,
      notes: clean(body.notes) || null,
      source_page: clean(body.source_page) || null,
      utm_source: clean(body.utm_source) || null,
      utm_medium: clean(body.utm_medium) || null,
      utm_campaign: clean(body.utm_campaign) || null,
      consent_to_contact: true,
      user_agent: req.headers['user-agent'] || null,
      ip_address: (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.headers['x-real-ip'] || null
    };
    const rows = await supabaseRequest('seller_leads?select=id', { method:'POST', headers:{ Prefer:'return=representation' }, body: JSON.stringify(lead) });
    return json(res, 200, { ok: true, id: rows?.[0]?.id });
  } catch (error) {
    console.error('Lead submission error:', error);
    return json(res, 500, { error: 'Unable to submit your request right now.' });
  }
};
