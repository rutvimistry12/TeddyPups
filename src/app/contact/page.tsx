import React from 'react';
import { Metadata } from 'next';
import { getPuppies } from '@/lib/data-store';
import { ContactClient } from '@/components/contact/ContactClient';

export const metadata: Metadata = {
  title: 'Visit & Contact | TeddyPups UAE Showroom in Jumeirah',
  description: 'Book a private nursery appointment at our boutique showroom on Al Wasl Road, Jumeirah 2, Dubai or chat on WhatsApp.',
};

export const revalidate = 0; // Dynamic server component

export default async function ContactPage() {
  const puppies = await getPuppies();
  return <ContactClient puppies={puppies} />;
}

