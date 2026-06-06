import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Sell My House Today Anywhere | Get a Fast Cash Offer',
  description: 'Sell your house fast for cash anywhere in the U.S. Request a no-obligation offer. No repairs, no cleaning, no listings, and no agent commissions.',
  metadataBase: new URL('https://sellmyhousetodayanywhere.com'),
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Sell My House Today Anywhere',
    description: 'Request a no-obligation cash offer for your house. Sell as-is with no repairs or cleaning required.',
    url: 'https://sellmyhousetodayanywhere.com',
    siteName: 'Sell My House Today Anywhere',
    type: 'website'
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
