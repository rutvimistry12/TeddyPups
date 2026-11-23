import React from 'react';
import { Metadata } from 'next';
import { getFAQs } from '@/lib/data-store';
import { FAQClient } from '@/components/faq/FAQClient';

export const metadata: Metadata = {
  title: 'FAQ | TeddyPups UAE Adoption & Care Questions',
  description: 'Frequently asked questions regarding puppy health guarantees, MOCCAE microchips, reservations, and UAE nursery visits.',
};

export const revalidate = 0; // Dynamic server component

export default async function FAQPage() {
  const faqs = await getFAQs();
  return <FAQClient initialFaqs={faqs} />;
}

