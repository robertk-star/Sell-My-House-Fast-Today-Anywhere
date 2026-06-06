const statuses = ['new','contacted','appointment_scheduled','offer_made','under_contract','closed','not_a_fit','dead_lead'];

async function loadLeads() {
  const result = document.getElementById('lead-result');
  const tbody = document.getElementById('lead-rows');
  result.innerHTML = 'Loading leads...';
  tbody.innerHTML = '';
  const search = document.getElementById('search').value.trim();
  const status = document.getElementById('status').value;
  const params = new URLSearchParams();
  if (search) params.set('search', search);
  if (status) params.set('status', status);
  const response = await fetch(`/api/admin/leads?${params.toString()}`);
  if (response.status === 401) { window.location.href = '/admin/login'; return; }
  const data = await response.json();
  if (!response.ok) { result.innerHTML = `<div class="error">${data.error || 'Unable to load leads.'}</div>`; return; }
  const leads = data.leads || [];
  result.innerHTML = leads.length ? '' : 'No leads found.';
  for (const lead of leads) {
    const tr = document.createElement('tr');
    const statusOptions = statuses.map(s => `<option value="${s}" ${s === (lead.lead_status || 'new') ? 'selected' : ''}>${s}</option>`).join('');
    tr.innerHTML = `
      <td>${lead.created_at ? new Date(lead.created_at).toLocaleString() : ''}</td>
      <td><strong>${escapeHtml(lead.seller_name || '')}</strong><br>${escapeHtml(lead.seller_phone || '')}<br>${escapeHtml(lead.seller_email || '')}</td>
      <td><strong>${escapeHtml(lead.property_address || '')}</strong><br>${escapeHtml([lead.property_city, lead.property_state, lead.property_zip].filter(Boolean).join(', '))}</td>
      <td>Condition: ${escapeHtml(lead.property_condition || '—')}<br>Reason: ${escapeHtml(lead.reason_for_selling || '—')}<br>Timeline: ${escapeHtml(lead.desired_timeline || '—')}<br>Best time: ${escapeHtml(lead.best_time_to_contact || '—')}<br>Notes: ${escapeHtml(lead.notes || '—')}</td>
      <td><select data-field="lead_status">${statusOptions}</select></td>
      <td><textarea data-field="admin_notes">${escapeHtml(lead.admin_notes || '')}</textarea></td>
      <td><button class="btn btn-secondary" data-save="${lead.id}">Save</button></td>`;
    tbody.appendChild(tr);
  }
  document.querySelectorAll('[data-save]').forEach(btn => btn.addEventListener('click', saveLead));
}

async function saveLead(event) {
  const btn = event.currentTarget;
  const row = btn.closest('tr');
  btn.disabled = true;
  btn.textContent = 'Saving...';
  const payload = {
    id: btn.getAttribute('data-save'),
    lead_status: row.querySelector('[data-field="lead_status"]').value,
    admin_notes: row.querySelector('[data-field="admin_notes"]').value
  };
  const response = await fetch('/api/admin/leads', { method:'PATCH', headers:{'Content-Type':'application/json'}, body:JSON.stringify(payload) });
  const data = await response.json().catch(() => ({}));
  btn.disabled = false;
  btn.textContent = response.ok ? 'Saved' : 'Save';
  if (!response.ok) alert(data.error || 'Unable to save lead.');
  setTimeout(() => btn.textContent = 'Save', 1500);
}

async function logout() {
  await fetch('/api/admin/logout', { method:'POST' });
  window.location.href = '/admin/login';
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('filter-btn')?.addEventListener('click', loadLeads);
  document.getElementById('logout-btn')?.addEventListener('click', logout);
  loadLeads();
});
