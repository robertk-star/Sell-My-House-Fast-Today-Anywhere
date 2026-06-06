import Link from 'next/link';

export function Header() {
  return (
    <>
      <div className="topbar">
        <div className="container">
          <span>No-obligation cash offer process</span>
          <span>Sell as-is • No repairs • Close on your timeline</span>
        </div>
      </div>
      <header className="header">
        <div className="container nav">
          <Link href="/" className="logo">
            Sell My House Today Anywhere
            <small>Fast. Simple. As-Is.</small>
          </Link>
          <nav className="navlinks" aria-label="Main navigation">
            <Link href="/how-it-works">How It Works</Link>
            <Link href="/we-buy-houses-as-is">What We Buy</Link>
            <Link href="/sell-your-house-fast">Sell Fast</Link>
            <Link href="/locations">Locations</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/contact">Contact</Link>
          </nav>
          <Link className="btn btn-primary" href="/#offer-form">Get Cash Offer</Link>
        </div>
      </header>
    </>
  );
}
