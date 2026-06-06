import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

function clean(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const property_address = clean(body.property_address);
    const seller_name = clean(body.seller_name);
    const seller_phone = clean(body.seller_phone);

    if (!property_address || !seller_name || !seller_phone) {
      return NextResponse.json({ error: 'Property address, name, and phone are required.' }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
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
      consent_to_contact: Boolean(body.consent_to_contact),
      user_agent: request.headers.get('user-agent'),
      ip_address: request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || null
    };

    const { data, error } = await supabase.from('seller_leads').insert(lead).select('id').single();
    if (error) throw error;

    // Optional email provider can be added in Phase 2. Lead is safely stored in Supabase in Phase 1.
    return NextResponse.json({ ok: true, id: data.id });
  } catch (error) {
    console.error('Lead submission error:', error);
    return NextResponse.json({ error: 'Unable to submit your request right now.' }, { status: 500 });
  }
}
