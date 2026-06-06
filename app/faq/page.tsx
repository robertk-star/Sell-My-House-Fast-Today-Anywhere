const faqs = [
  ['Do I have to make repairs first?', 'No. You can request an offer even if the house needs repairs, cleaning, or updates.'],
  ['Is the offer free?', 'Yes. Requesting an offer is free and no-obligation.'],
  ['Do I have to accept the offer?', 'No. You decide whether the offer works for you.'],
  ['Do you buy houses with tenants?', 'We review tenant-occupied properties. Tell us about the lease and tenant situation.'],
  ['Do you buy inherited houses?', 'Yes, inherited houses are one of the common property situations we review.'],
  ['How fast can I close?', 'Timing depends on the property, title, paperwork, and your situation. A cash sale can often move faster than a traditional financed sale when everything is ready.'],
  ['Will I get market value?', 'A cash as-is offer is usually different from listing on the open market. The tradeoff is convenience, speed, and avoiding repairs, commissions, and showings.'],
  ['Can I sell if I live out of state?', 'Yes. Out-of-state owners can submit the property information for review.'],
  ['What types of houses do you review?', 'We review many types, including vacant homes, inherited homes, rentals, houses needing repairs, and houses that need cleaning.']
];

export const metadata = {
  title: 'FAQ | Sell My House Today Anywhere',
  description: 'Common questions about selling your house as-is for a cash offer.'
};

export default function FaqPage() {
  const schema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="page-hero"><div className="container"><h1>Frequently Asked Questions</h1><p>Plain-English answers about the cash offer process.</p></div></section>
      <section className="section"><div className="container"><div className="card">{faqs.map(([q, a]) => <div className="faq-item" key={q}><strong>{q}</strong><p className="muted">{a}</p></div>)}</div></div></section>
    </main>
  );
}
