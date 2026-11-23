import React from 'react';
import { getPuppies, getBreeds } from '@/lib/data-store';
import { PuppyCatalogClient } from '@/components/puppy/PuppyCatalogClient';

export const revalidate = 0; // Keep dynamic

export default async function PuppiesPage({
  searchParams,
}: {
  searchParams: { filter?: string };
}) {
  const [puppies, breeds] = await Promise.all([
    getPuppies(),
    getBreeds(),
  ]);

  return (
    <PuppyCatalogClient
      initialPuppies={puppies}
      breeds={breeds}
      initialFilter={searchParams.filter}
    />
  );
}

