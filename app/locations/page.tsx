import Link from 'next/link';

export const metadata = {
  title: 'Locations | Sell My House Today Anywhere',
  description: 'Request a cash offer for your house from anywhere in the U.S.'
};

export default function LocationsPage() {
  return (
    <main>
      <section className="page-hero"><div className="container"><h1>Sell Your House Anywhere in the U.S.</h1><p>We review property submissions from homeowners across the country.</p></div></section>
      <section className="section"><div className="container grid-2">
        <div><h2>National property review</h2><p className="muted">Whether the house is local, inherited, vacant, or out of state, submit the property details and we will review the situation.</p><p className="muted">As this business grows, this page can expand into stronger state and city pages for the areas where you are actively buying.</p><Link className="btn btn-primary" href="/#offer-form">Get My Cash Offer</Link></div>
        <div className="card"><h3>Common seller locations</h3><ul className="situation-list"><li>Local homeowners</li><li>Out-of-state owners</li><li>Inherited property owners</li><li>Landlords with rentals</li><li>Vacant property owners</li><li>Owners relocating</li></ul></div>
      </div></section>
    </main>
  );
}
