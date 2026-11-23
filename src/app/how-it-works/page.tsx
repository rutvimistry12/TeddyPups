import React from 'react';
import { Metadata } from 'next';
import { HowItWorksClient } from '@/components/how/HowItWorksClient';

export const metadata: Metadata = {
  title: 'How It Works | TeddyPups UAE Adoption Process',
  description: 'Learn how to adopt a teacup puppy in Dubai or commission an ethical European import. Step-by-step guidance, health passports, and delivery.',
};

export default function HowItWorksPage() {
  return <HowItWorksClient />;
}

