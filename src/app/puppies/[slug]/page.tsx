import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getPuppyBySlug, getPuppies } from '@/lib/data-store';
import { PuppyDetailClient } from '@/components/puppy/PuppyDetailClient';

export const revalidate = 0; // Dynamic server component

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const puppy = await getPuppyBySlug(params.slug);
  if (!puppy) return { title: 'Puppy Not Found | TeddyPups UAE' };

  return {
    title: `${puppy.name} - ${puppy.breedName} | TeddyPups UAE`,
    description: `${puppy.name} is an adorable ${puppy.gender === 'MALE' ? 'boy' : 'girl'} ${puppy.breedName} puppy in Dubai. ${puppy.personality}`,
    openGraph: {
      title: `${puppy.name} - ${puppy.breedName} | TeddyPups UAE`,
      description: puppy.personality,
      images: puppy.images[0] ? [{ url: puppy.images[0].url }] : [],
    },
  };
}

export default async function PuppyPage({
  params,
}: {
  params: { slug: string };
}) {
  const puppy = await getPuppyBySlug(params.slug);
  if (!puppy) {
    notFound();
  }

  const allPuppies = await getPuppies();
  const related = allPuppies.filter((p) => p.id !== puppy.id).slice(0, 3);

  return <PuppyDetailClient puppy={puppy} relatedPuppies={related} />;
}

