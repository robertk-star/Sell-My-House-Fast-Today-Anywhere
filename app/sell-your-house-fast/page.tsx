import Link from 'next/link';

export const metadata = {
  title: 'Sell Your House Fast | Sell My House Today Anywhere',
  description: 'Need to sell your house fast? Request a no-obligation cash offer and avoid repairs, cleaning, listings, and showings.'
};

export default function SellFastPage() {
  return (
    <main>
      <section className="page-hero"><div className="container"><h1>Sell Your House Fast Without Listing It</h1><p>A traditional sale can take time. A cash offer may help when you want speed, privacy, and fewer steps.</p></div></section>
      <section className="section"><div className="container grid-2">
        <div><h2>When speed matters</h2><p className="muted">Some homeowners do not want months of repairs, showings, inspections, and waiting for buyer financing. If you need a simpler path, we can review your property and explain whether a cash offer may be available.</p><p className="muted">This can be helpful for inherited homes, vacant homes, rental properties, relocation, or situations where repairs have become too much.</p><Link className="btn btn-primary" href="/#offer-form">Request an Offer</Link></div>
        <div className="card"><h3>What you can avoid</h3><ul className="situation-list"><li>Major repairs</li><li>Deep cleaning</li><li>Open houses</li><li>Repeated showings</li><li>Agent commissions</li><li>Buyer financing delays</li></ul></div>
      </div></section>
    </main>
  );
}
