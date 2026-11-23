import React from 'react';
import { Metadata } from 'next';
import { getTestimonials } from '@/lib/data-store';
import { HappyFamiliesClient } from '@/components/families/HappyFamiliesClient';

export const metadata: Metadata = {
  title: 'Happy Families & Puppies | TeddyPups UAE',
  description: 'Real customer stories, photos, and adoption testimonials from families who welcomed TeddyPups in Dubai and Abu Dhabi.',
};

export const revalidate = 0; // Dynamic server component

export default async function HappyFamiliesPage() {
  const testimonials = await getTestimonials(true);
  return <HappyFamiliesClient testimonials={testimonials} />;
}

