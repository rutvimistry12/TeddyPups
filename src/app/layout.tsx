import type { Metadata } from 'next';
import './globals.css';
import { PuppyProvider } from '@/context/PuppyContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ComparisonDrawer } from '@/components/comparison/ComparisonDrawer';
import { PuppyQuizModal } from '@/components/quiz/PuppyQuizModal';
import { TeddyScrollLayer } from '@/components/layout/TeddyScrollLayer';

export const metadata: Metadata = {
  title: 'TeddyPups UAE | Premium Teacup Puppies in Dubai',
  description: 'Dubai premier boutique nursery for ethical teacup Maltipoos, Toy Poodles, Boos, and Cavapoos. Complete veterinary health passports, MOCCAE microchipped, and white-glove UAE delivery.',
  keywords: ['teacup puppies dubai', 'maltipoo uae', 'toy poodle dubai', 'puppy boutique jumeirah', 'ethical puppies uae'],
  openGraph: {
    title: 'TeddyPups UAE | Premium Teacup Puppies in Dubai',
    description: 'Little paws, big love. Meet your new best friend with certified health guarantees in Dubai, UAE.',
    url: 'https://teddypups.ae',
    siteName: 'TeddyPups UAE',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1546527813-25509cfa3da0?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'TeddyPups UAE - Teacup Puppies in Dubai',
      },
    ],
    locale: 'en_AE',
    type: 'website',
  },
};

const TICKER_TEXT = '🐾 Dubai VIP Boutique Nursery · 100% Ethical Preservation Lineage · UAE Delivery   ·   Take the Puppy Quiz →   ·   🐾 Dubai VIP Boutique Nursery · 100% Ethical Preservation Lineage · UAE Delivery   ·   Take the Puppy Quiz →   ·';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col" style={{ background: 'var(--color-honey-soft)' }}>
        <PuppyProvider>
          {/* Announcement ticker bar */}
          <div className="tp-ticker" role="marquee" aria-label="Announcements">
            <span className="tp-ticker__inner">
              {TICKER_TEXT}&nbsp;&nbsp;&nbsp;&nbsp;{TICKER_TEXT}
            </span>
          </div>

          <Navbar />

          {/* Zig-zag Teddy mascot — fixed overlay, scroll-driven */}
          <TeddyScrollLayer />

          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <ComparisonDrawer />
          <PuppyQuizModal />
        </PuppyProvider>
      </body>
    </html>
  );
}
