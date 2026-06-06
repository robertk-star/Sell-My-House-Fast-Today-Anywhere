'use client';

import { useEffect, useState } from 'react';
import type { SellerLead } from '@/lib/leadTypes';

const statuses = ['new', 'contacted', 'appointment_scheduled', 'offer_made', 'under_contract', 'closed', 'not_a_fit', 'dead_lead'];

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<SellerLead[]>([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadLeads() {
    setLoading(true);
    setError('');
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (status) params.set('status', status);

    const response = await fetch(`/api/admin/leads?${params.toString()}`);
    if (response.status === 401) {
      window.location.href = '/admin/login';
      return;
    }
    const data = await response.json();
    if (!response.ok) setError(data.error || 'Unable to load leads.');
    else setLeads(data.leads || []);
    setLoading(false);
  }

  async function saveLead(lead: SellerLead) {
    const response = await fetch('/api/admin/leads', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: lead.id, lead_status: lead.lead_status, admin_notes: lead.admin_notes })
    });
    if (!response.ok) {
      const data = await response.json();
      alert(data.error || 'Unable to save lead.');
    } else {
      alert('Lead updated.');
    }
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    window.location.href = '/admin/login';
  }

  useEffect(() => { loadLeads(); }, []);

  return (
    <main className="admin-wrap">
      <div className="container">
        <div className="admin-card" style={{ marginBottom: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
            <div>
              <h1 style={{ color: 'var(--navy)', fontSize: 38 }}>Seller Leads</h1>
              <p className="muted">View, search, and update incoming property leads.</p>
            </div>
            <button className="btn btn-light" onClick={logout}>Log Out</button>
          </div>
          <div className="form-grid" style={{ marginTop: 18 }}>
            <div className="field">
              <label htmlFor="search">Search</label>
              <input id="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Name, phone, email, address, city" />
            </div>
            <div className="field">
              <label htmlFor="status">Status</label>
              <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="all">All</option>
                {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <button className="btn btn-primary" onClick={loadLeads} style={{ marginTop: 16 }}>Apply Filters</button>
        </div>

        <div className="admin-card table-wrap">
          {loading && <p>Loading leads...</p>}
          {error && <p className="error">{error}</p>}
          {!loading && leads.length === 0 && <p>No leads found.</p>}
          {!loading && leads.length > 0 && (
            <table>
              <thead><tr><th>Date</th><th>Seller</th><th>Property</th><th>Details</th><th>Status</th><th>Admin Notes</th><th>Action</th></tr></thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id}>
                    <td>{new Date(lead.created_at).toLocaleString()}</td>
                    <td><strong>{lead.seller_name}</strong><br />{lead.seller_phone}<br />{lead.seller_email}</td>
                    <td><strong>{lead.property_address}</strong><br />{[lead.property_city, lead.property_state, lead.property_zip].filter(Boolean).join(', ')}</td>
                    <td>Condition: {lead.property_condition || '—'}<br />Reason: {lead.reason_for_selling || '—'}<br />Timeline: {lead.desired_timeline || '—'}<br />Best time: {lead.best_time_to_contact || '—'}<br />Notes: {lead.notes || '—'}</td>
                    <td><select value={lead.lead_status || 'new'} onChange={(e) => setLeads((prev) => prev.map((item) => item.id === lead.id ? { ...item, lead_status: e.target.value } : item))}>{statuses.map((s) => <option key={s} value={s}>{s}</option>)}</select></td>
                    <td><textarea value={lead.admin_notes || ''} onChange={(e) => setLeads((prev) => prev.map((item) => item.id === lead.id ? { ...item, admin_notes: e.target.value } : item))} /></td>
                    <td><button className="btn btn-secondary" onClick={() => saveLead(lead)}>Save</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  );
}
