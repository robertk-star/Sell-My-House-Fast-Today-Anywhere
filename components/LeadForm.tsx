'use client';

import { useState } from 'react';

type LeadFormProps = {
  compact?: boolean;
  sourcePage: string;
};

const initialState = {
  property_address: '',
  property_city: '',
  property_state: '',
  property_zip: '',
  seller_name: '',
  seller_phone: '',
  seller_email: '',
  property_condition: '',
  reason_for_selling: '',
  desired_timeline: '',
  best_time_to_contact: '',
  notes: '',
  consent_to_contact: false
};

export function LeadForm({ compact = false, sourcePage }: LeadFormProps) {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  function updateField(name: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function submitLead(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source_page: sourcePage })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Unable to submit your request.');

      setForm(initialState);
      setMessage('Thank you. Your information was submitted. We will review the property details and follow up soon.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submitLead} className="form-card" id="offer-form">
      <h2>{compact ? 'Request Your Offer' : 'Get a No-Obligation Cash Offer'}</h2>
      <p className="muted">Tell us about the property. No repairs, cleaning, listing, or obligation required.</p>

      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}

      <div className="form-grid">
        <div className="field full">
          <label htmlFor="property_address">Property Address *</label>
          <input id="property_address" required value={form.property_address} onChange={(e) => updateField('property_address', e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="property_city">City</label>
          <input id="property_city" value={form.property_city} onChange={(e) => updateField('property_city', e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="property_state">State</label>
          <input id="property_state" value={form.property_state} onChange={(e) => updateField('property_state', e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="property_zip">ZIP Code</label>
          <input id="property_zip" value={form.property_zip} onChange={(e) => updateField('property_zip', e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="seller_name">Your Name *</label>
          <input id="seller_name" required value={form.seller_name} onChange={(e) => updateField('seller_name', e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="seller_phone">Phone *</label>
          <input id="seller_phone" required value={form.seller_phone} onChange={(e) => updateField('seller_phone', e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="seller_email">Email</label>
          <input id="seller_email" type="email" value={form.seller_email} onChange={(e) => updateField('seller_email', e.target.value)} />
        </div>
        {!compact && (
          <>
            <div className="field">
              <label htmlFor="property_condition">Property Condition</label>
              <select id="property_condition" value={form.property_condition} onChange={(e) => updateField('property_condition', e.target.value)}>
                <option value="">Select one</option>
                <option>Move-in ready</option>
                <option>Needs minor repairs</option>
                <option>Needs major repairs</option>
                <option>Vacant</option>
                <option>Fire or water damage</option>
                <option>Not sure</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="reason_for_selling">Reason for Selling</label>
              <select id="reason_for_selling" value={form.reason_for_selling} onChange={(e) => updateField('reason_for_selling', e.target.value)}>
                <option value="">Select one</option>
                <option>Need to sell quickly</option>
                <option>Inherited property</option>
                <option>Rental property</option>
                <option>Moving or relocating</option>
                <option>Repairs are too much</option>
                <option>Behind on payments</option>
                <option>Other</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="desired_timeline">How Soon Do You Want to Sell?</label>
              <select id="desired_timeline" value={form.desired_timeline} onChange={(e) => updateField('desired_timeline', e.target.value)}>
                <option value="">Select one</option>
                <option>As soon as possible</option>
                <option>Within 2 weeks</option>
                <option>Within 30 days</option>
                <option>1 to 3 months</option>
                <option>Just comparing options</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="best_time_to_contact">Best Time to Contact</label>
              <input id="best_time_to_contact" value={form.best_time_to_contact} onChange={(e) => updateField('best_time_to_contact', e.target.value)} />
            </div>
            <div className="field full">
              <label htmlFor="notes">Anything Else We Should Know?</label>
              <textarea id="notes" value={form.notes} onChange={(e) => updateField('notes', e.target.value)} />
            </div>
          </>
        )}
        <div className="field full">
          <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <input
              type="checkbox"
              checked={form.consent_to_contact}
              onChange={(e) => updateField('consent_to_contact', e.target.checked)}
              style={{ width: 'auto', marginTop: 4 }}
            />
            I agree that Sell My House Today Anywhere may contact me about my property using the information I provided.
          </label>
        </div>
      </div>

      <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: '100%', marginTop: 16 }}>
        {loading ? 'Submitting...' : 'Get My Cash Offer'}
      </button>
      <p className="help">No obligation. We may not be able to buy every property, but we will review your situation.</p>
    </form>
  );
}
