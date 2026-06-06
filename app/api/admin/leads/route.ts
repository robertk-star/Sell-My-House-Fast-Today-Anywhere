import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/auth';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

export async function GET(request: NextRequest) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search')?.trim();
  const status = searchParams.get('status')?.trim();

  let query = getSupabaseAdmin()
    .from('seller_leads')
    .select('id, created_at, property_address, property_city, property_state, property_zip, seller_name, seller_phone, seller_email, property_condition, reason_for_selling, desired_timeline, best_time_to_contact, notes, lead_status, admin_notes')
    .order('created_at', { ascending: false })
    .limit(100);

  if (status && status !== 'all') query = query.eq('lead_status', status);
  if (search) {
    const pattern = `%${search.replace(/[%_]/g, '')}%`;
    query = query.or(`seller_name.ilike.${pattern},seller_phone.ilike.${pattern},seller_email.ilike.${pattern},property_address.ilike.${pattern},property_city.ilike.${pattern}`);
  }

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ leads: data });
}

export async function PATCH(request: NextRequest) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  if (!body.id) return NextResponse.json({ error: 'Missing lead ID.' }, { status: 400 });

  const { error } = await getSupabaseAdmin()
    .from('seller_leads')
    .update({
      lead_status: body.lead_status,
      admin_notes: body.admin_notes,
      updated_at: new Date().toISOString()
    })
    .eq('id', body.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
