import Link from 'next/link';
import { LeadForm } from '@/components/LeadForm';

const sellerSituations = [
  'Inherited houses', 'Vacant homes', 'Rental properties', 'Problem tenants', 'Major repairs',
  'Fire or water damage', 'Out-of-state owners', 'Relocation', 'Code violations', 'Behind on payments',
  'Divorce situations', 'Houses that need cleaning'
];

const faqs = [
  ['Do I have to make repairs first?', 'No. You can request an offer even if the house needs repairs, cleaning, or updates.'],
  ['Is the offer free?', 'Yes. Requesting an offer is free and no-obligation.'],
  ['Do I have to accept the offer?', 'No. You decide whether the offer works for you.'],
  ['Will I get market value?', 'A cash as-is offer is usually different from listing on the open market. The tradeoff is speed, convenience, and avoiding repairs, commissions, and showings.']
];

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="kicker">As-is house buyer • No-obligation process</span>
            <h1>Sell Your House Today — Anywhere in the U.S.</h1>
            <p className="lead">
              Get a fast, no-obligation cash offer for your house. No repairs, no cleaning, no listings,
              and no agent commissions.
            </p>
            <div className="hero-bullets">
              <div className="check">No repairs needed</div>
              <div className="check">No cleaning required</div>
              <div className="check">No agent commissions</div>
              <div className="check">Close on your timeline</div>
              <div className="check">Private sale process</div>
              <div className="check">Many property types reviewed</div>
            </div>
            <Link className="btn btn-light" href="/how-it-works">See How It Works</Link>
          </div>
          <LeadForm compact sourcePage="homepage_hero" />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="center">
            <h2>How It Works</h2>
            <p className="muted">A simple process for homeowners who want to compare a cash offer without listing the property.</p>
          </div>
          <div className="grid-3">
            <div className="card"><div className="step-num">1</div><h3>Tell Us About the Property</h3><p className="muted">Submit the address and basic details about the house.</p></div>
            <div className="card"><div className="step-num">2</div><h3>We Review the Property</h3><p className="muted">We look at condition, location, market data, and your timeline.</p></div>
            <div className="card"><div className="step-num">3</div><h3>Get a Cash Offer</h3><p className="muted">If the property fits what we buy, we explain the offer and your options.</p></div>
          </div>
        </div>
      </section>

      <section className="section light">
        <div className="container grid-2" style={{ alignItems: 'center' }}>
          <div>
            <h2>You Don’t Need to Fix It First</h2>
            <p className="muted">
              Selling the traditional way can mean repairs, cleaning, showings, inspections, appraisals,
              and waiting. We help homeowners who want a simpler option.
            </p>
            <p className="muted">
              You can reach out even if the house needs work, has tenants, is inherited, is vacant,
              or has become too much to manage.
            </p>
            <Link className="btn btn-primary" href="/#offer-form">Start My Offer</Link>
          </div>
          <div className="card">
            <h3>Property situations we review</h3>
            <ul className="situation-list">
              {sellerSituations.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="center">
            <h2>A Simpler Way to Sell</h2>
            <p className="muted">A cash sale may not be the right fit for every seller, but it can help when speed and simplicity matter.</p>
          </div>
          <div className="grid-3">
            {[
              ['Sell As-Is', 'No need to repair, clean, paint, stage, or update the property.'],
              ['Skip Listings and Showings', 'Avoid open houses, repeated walkthroughs, and buyer financing delays.'],
              ['No Agent Commissions', 'You do not need to list the home with an agent to request an offer.'],
              ['Flexible Closing', 'Close quickly when possible, or choose a timeline that works better for your move.'],
              ['Private Sale Process', 'No public listing required.'],
              ['Straightforward Communication', 'We explain the process clearly before you make a decision.']
            ].map(([title, copy]) => <div className="card" key={title}><h3>{title}</h3><p className="muted">{copy}</p></div>)}
          </div>
        </div>
      </section>

      <section className="band">
        <div className="container grid-2" style={{ alignItems: 'center' }}>
          <div>
            <h2>Is This Right for You?</h2>
            <p className="muted">
              If your main goal is the highest possible price and you have time to repair, list, and wait,
              a traditional sale may be worth considering. If speed, privacy, or avoiding repairs matters most,
              requesting a cash offer can help you compare your options.
            </p>
          </div>
          <div className="card">
            <h3>This may be a good fit if...</h3>
            <ul className="situation-list">
              <li>You want to sell quickly</li>
              <li>You do not want to make repairs</li>
              <li>You inherited a property</li>
              <li>You own a vacant or unwanted house</li>
              <li>You are tired of managing a rental</li>
              <li>You live out of state</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section light">
        <div className="container">
          <div className="center">
            <h2>Common Questions</h2>
          </div>
          <div className="card">
            {faqs.map(([q, a]) => <div className="faq-item" key={q}><strong>{q}</strong><p className="muted">{a}</p></div>)}
            <Link className="btn btn-secondary" href="/faq" style={{ marginTop: 18 }}>View All FAQs</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid-2" style={{ alignItems: 'start' }}>
          <div>
            <h2>Ready to See What We Can Offer?</h2>
            <p className="muted">
              Tell us about the property. We’ll review the information and contact you about the next step.
              Requesting an offer does not require you to sell.
            </p>
          </div>
          <LeadForm sourcePage="homepage_bottom" />
        </div>
      </section>
    </main>
  );
}
