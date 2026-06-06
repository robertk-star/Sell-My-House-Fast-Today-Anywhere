export type SellerLead = {
  id: string;
  created_at: string;
  property_address: string;
  property_city: string | null;
  property_state: string | null;
  property_zip: string | null;
  seller_name: string;
  seller_phone: string;
  seller_email: string | null;
  property_condition: string | null;
  reason_for_selling: string | null;
  desired_timeline: string | null;
  best_time_to_contact: string | null;
  notes: string | null;
  lead_status: string | null;
  admin_notes: string | null;
};
