import Link from 'next/link';

export const metadata = {
  title: 'We Buy Houses As-Is | Sell My House Today Anywhere',
  description: 'Request a cash offer for a house that needs repairs, cleaning, updates, or has become difficult to manage.'
};

export default function AsIsPage() {
  return (
    <main>
      <section className="page-hero"><div className="container"><h1>We Review Houses As-Is</h1><p>You do not need to fix the property before requesting a no-obligation offer.</p></div></section>
      <section className="section"><div className="container grid-3">
        {['Needs repairs', 'Vacant', 'Inherited', 'Rental with tenants', 'Fire or water damage', 'Out-of-state owner', 'Code issues', 'Unwanted property', 'Needs cleaning'].map((item) => <div className="card" key={item}><h3>{item}</h3><p className="muted">Tell us about the situation and we will review whether the property fits what we buy.</p></div>)}
      </div></section>
      <section className="band"><div className="container center"><h2>No repairs required to request an offer</h2><p className="muted">We may not be able to buy every property, but you can start by sending the details.</p><Link className="btn btn-primary" href="/#offer-form">Start My Offer</Link></div></section>
    </main>
  );
}
