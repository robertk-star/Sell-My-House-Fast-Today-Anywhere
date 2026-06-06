import Link from 'next/link';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <h3 style={{ color: 'white' }}>Sell My House Today Anywhere</h3>
          <p>
            A simple way to request a no-obligation cash offer for your house. We review many property types,
            including houses that need repairs, vacant homes, inherited homes, and rental properties.
          </p>
        </div>
        <div>
          <h3 style={{ color: 'white' }}>Company</h3>
          <p><Link href="/how-it-works">How It Works</Link></p>
          <p><Link href="/we-buy-houses-as-is">What We Buy</Link></p>
          <p><Link href="/faq">FAQ</Link></p>
          <p><Link href="/contact">Contact</Link></p>
        </div>
        <div>
          <h3 style={{ color: 'white' }}>Legal</h3>
          <p><Link href="/privacy-policy">Privacy Policy</Link></p>
          <p><Link href="/terms">Terms of Use</Link></p>
          <p><Link href="/admin/login">Admin Login</Link></p>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>
          © {new Date().getFullYear()} Sell My House Today Anywhere. Requesting an offer does not require you to sell.
          A cash as-is offer may be lower than a traditional listing price because it may account for repairs, risk,
          holding costs, convenience, and speed.
        </p>
      </div>
      <Link className="btn btn-primary mobile-cta" href="/#offer-form">Get My Cash Offer</Link>
    </footer>
  );
}
