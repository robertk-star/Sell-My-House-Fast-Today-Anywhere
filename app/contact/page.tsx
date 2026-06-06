import { LeadForm } from '@/components/LeadForm';

export const metadata = {
  title: 'Contact | Sell My House Today Anywhere',
  description: 'Contact Sell My House Today Anywhere to request a no-obligation cash offer.'
};

export default function ContactPage() {
  return (
    <main>
      <section className="page-hero"><div className="container"><h1>Contact Us</h1><p>Send us the property details and we will review your situation.</p></div></section>
      <section className="section"><div className="container grid-2" style={{ alignItems: 'start' }}>
        <div>
          <h2>Request a property review</h2>
          <p className="muted">Use this form to request a no-obligation offer. You are not required to accept an offer or sell your property.</p>
          <div className="card"><h3>What happens next?</h3><p className="muted">We review the property details, then follow up with questions or next steps. If it fits what we buy, we explain the offer clearly.</p></div>
        </div>
        <LeadForm sourcePage="contact" />
      </div></section>
    </main>
  );
}
