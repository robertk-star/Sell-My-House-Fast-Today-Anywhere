import Link from 'next/link';

export const metadata = {
  title: 'How It Works | Sell My House Today Anywhere',
  description: 'Learn how the no-obligation cash offer process works for selling your house as-is.'
};

export default function HowItWorksPage() {
  return (
    <main>
      <section className="page-hero"><div className="container"><h1>How the Cash Offer Process Works</h1><p>We keep the process simple so you can compare your options without listing, repairing, or cleaning first.</p></div></section>
      <section className="section"><div className="container grid-3">
        <div className="card"><div className="step-num">1</div><h3>Submit Property Info</h3><p className="muted">Send the address, contact information, property condition, and your preferred selling timeline.</p></div>
        <div className="card"><div className="step-num">2</div><h3>Property Review</h3><p className="muted">We review the property details, location, condition, repairs, and market information.</p></div>
        <div className="card"><div className="step-num">3</div><h3>Offer Conversation</h3><p className="muted">If the property fits what we buy, we explain the offer and answer your questions.</p></div>
        <div className="card"><div className="step-num">4</div><h3>You Decide</h3><p className="muted">There is no obligation. You can accept, decline, or keep comparing options.</p></div>
        <div className="card"><div className="step-num">5</div><h3>Choose a Timeline</h3><p className="muted">If you move forward, closing timing depends on title, paperwork, and your needs.</p></div>
        <div className="card"><div className="step-num">6</div><h3>Close As-Is</h3><p className="muted">You do not need to repair, clean, stage, or list the house before requesting an offer.</p></div>
      </div></section>
      <section className="band"><div className="container center"><h2>Ready to Start?</h2><p className="muted">Requesting an offer is free and does not require you to sell.</p><Link className="btn btn-primary" href="/#offer-form">Get My Cash Offer</Link></div></section>
    </main>
  );
}
