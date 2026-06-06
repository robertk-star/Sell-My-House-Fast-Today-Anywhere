function leadFormHtml(sourcePage = 'unknown') {
  return `
  <form class="lead-form" data-source-page="${sourcePage}">
    <div class="form-grid">
      <div class="field full"><label>Property Address *</label><input name="property_address" required placeholder="123 Main St" /></div>
      <div class="field"><label>City</label><input name="property_city" /></div>
      <div class="field"><label>State</label><input name="property_state" maxlength="2" /></div>
      <div class="field"><label>ZIP Code</label><input name="property_zip" /></div>
      <div class="field"><label>Your Name *</label><input name="seller_name" required /></div>
      <div class="field"><label>Phone Number *</label><input name="seller_phone" required /></div>
      <div class="field"><label>Email Address</label><input name="seller_email" type="email" /></div>
      <div class="field"><label>Property Condition</label><select name="property_condition"><option value="">Select one</option><option>Excellent</option><option>Good</option><option>Needs minor repairs</option><option>Needs major repairs</option><option>Vacant or damaged</option><option>Not sure</option></select></div>
      <div class="field"><label>Reason for Selling</label><select name="reason_for_selling"><option value="">Select one</option><option>Need to sell fast</option><option>Inherited property</option><option>Repairs are too much</option><option>Rental or tenant issue</option><option>Relocating</option><option>Behind on payments</option><option>Just comparing options</option><option>Other</option></select></div>
      <div class="field"><label>How Soon?</label><select name="desired_timeline"><option value="">Select one</option><option>ASAP</option><option>7-14 days</option><option>30 days</option><option>60+ days</option><option>Just researching</option></select></div>
      <div class="field"><label>Best Time to Contact</label><input name="best_time_to_contact" placeholder="Morning, afternoon, evening" /></div>
      <div class="field full"><label>Notes</label><textarea name="notes" placeholder="Tell us anything helpful about the house."></textarea></div>
      <label class="full small"><input type="checkbox" name="consent_to_contact" required style="width:auto;margin-right:8px" /> I agree to be contacted about my property request. *</label>
    </div>
    <div class="form-result"></div>
    <button class="btn btn-primary" type="submit" style="width:100%;margin-top:10px">Get My Cash Offer</button>
    <p class="small">No obligation. No repairs required. Your information is kept private.</p>
  </form>`;
}

function mountLeadForms() {
  document.querySelectorAll('[data-lead-form]').forEach((el) => {
    el.innerHTML = leadFormHtml(el.getAttribute('data-source-page') || window.location.pathname);
  });

  document.querySelectorAll('.lead-form').forEach((form) => {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const result = form.querySelector('.form-result');
      result.innerHTML = '';
      const submit = form.querySelector('button[type="submit"]');
      submit.disabled = true;
      submit.textContent = 'Submitting...';
      const data = Object.fromEntries(new FormData(form).entries());
      data.consent_to_contact = form.querySelector('[name="consent_to_contact"]').checked;
      data.source_page = form.getAttribute('data-source-page') || window.location.pathname;
      const params = new URLSearchParams(window.location.search);
      data.utm_source = params.get('utm_source') || '';
      data.utm_medium = params.get('utm_medium') || '';
      data.utm_campaign = params.get('utm_campaign') || '';

      try {
        const response = await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
        const payload = await response.json();
        if (!response.ok) throw new Error(payload.error || 'Unable to submit your request right now.');
        form.reset();
        result.innerHTML = '<div class="success">Thanks. Your request was submitted. We will review the property and contact you about the next step.</div>';
      } catch (error) {
        result.innerHTML = `<div class="error">${error.message}</div>`;
      } finally {
        submit.disabled = false;
        submit.textContent = 'Get My Cash Offer';
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', mountLeadForms);
