"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Breed, Puppy } from '@/lib/types';
import { PuppyCard } from '@/components/puppy/PuppyCard';
import { Sparkles, Filter, Check, ArrowRight } from 'lucide-react';
import { TapeStrip, PawPrint } from '@/components/illustrations/PuppyDoodles';

interface BreedDiscoveryProps {
  breeds: Breed[];
  puppies: Puppy[];
}

export function BreedDiscovery({ breeds, puppies }: BreedDiscoveryProps) {
  const [selectedBreed, setSelectedBreed] = useState<string>('ALL');
  const [selectedGender, setSelectedGender] = useState<string>('ALL');
  const [selectedOrigin, setSelectedOrigin] = useState<string>('ALL');
  const [hypoallergenicOnly, setHypoallergenicOnly] = useState<boolean>(false);

  // Filter matching puppies
  const filteredPuppies = puppies.filter((p) => {
    if (selectedBreed !== 'ALL' && p.breedId !== selectedBreed) return false;
    if (selectedGender !== 'ALL' && p.gender !== selectedGender) return false;
    if (selectedOrigin !== 'ALL' && p.origin !== selectedOrigin) return false;
    if (hypoallergenicOnly && p.breedName.includes('Pomeranian') || p.breedName.includes('French')) {
      // Pomeranian / Frenchie are not 100% hair-based hypoallergenic
      if (hypoallergenicOnly && (p.breedId === 'b-pomeranian' || p.breedId === 'b-frenchie')) return false;
    }
    return true;
  });

  return (
    <section className="relative py-20 bg-light-peach/40 border-t-2 border-b-2 border-chocolate/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-warm-yellow border-2 border-chocolate text-chocolate font-bold text-xs uppercase tracking-widest shadow-scrapbook mb-4">
            <Sparkles className="w-3.5 h-3.5 text-terracotta" />
            Interactive Matcher
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-chocolate tracking-tight mb-4">
            Find your perfect little friend
          </h2>
          <p className="text-chocolate/80 text-base sm:text-lg leading-relaxed">
            Choose by personality, hypoallergenic hair, or boutique nursery origin to find the puppy that naturally aligns with your UAE lifestyle.
          </p>
        </div>

        {/* Interactive Filter Pills */}
        <div className="bg-cream border-2 border-chocolate rounded-4xl p-6 sm:p-8 shadow-scrapbook mb-12 relative">
          <TapeStrip className="-top-3 left-10" />
          <TapeStrip className="-top-3 right-10" rotate={3} />

          <div className="space-y-6">
            
            {/* 1. Breed Selector */}
            <div>
              <label className="block text-xs uppercase font-extrabold tracking-wider text-chocolate/70 mb-3 flex items-center gap-1.5">
                <PawPrint className="w-4 h-4 text-caramel" />
                Select Preferred Breed
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedBreed('ALL')}
                  className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold border-2 transition-all ${
                    selectedBreed === 'ALL'
                      ? 'bg-warm-yellow border-chocolate text-chocolate shadow-scrapbook'
                      : 'bg-white border-chocolate/30 text-chocolate hover:border-chocolate'
                  }`}
                >
                  All Breeds ({puppies.length})
                </button>
                {breeds.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setSelectedBreed(b.id)}
                    className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold border-2 transition-all ${
                      selectedBreed === b.id
                        ? 'bg-warm-yellow border-chocolate text-chocolate shadow-scrapbook'
                        : 'bg-white border-chocolate/30 text-chocolate hover:border-chocolate'
                    }`}
                  >
                    {b.name}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Sub-filters (Gender, Origin, Hypoallergenic) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-dashed border-caramel/40">
              
              {/* Gender */}
              <div>
                <label className="block text-xs uppercase font-extrabold tracking-wider text-chocolate/70 mb-2">
                  Gender
                </label>
                <div className="flex gap-2">
                  {['ALL', 'MALE', 'FEMALE'].map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setSelectedGender(g)}
                      className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold border-2 transition-all ${
                        selectedGender === g
                          ? 'bg-caramel text-white border-chocolate shadow-xs'
                          : 'bg-white border-chocolate/30 text-chocolate'
                      }`}
                    >
                      {g === 'ALL' ? 'Any' : g === 'MALE' ? '♂ Boy' : '♀ Girl'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Origin */}
              <div>
                <label className="block text-xs uppercase font-extrabold tracking-wider text-chocolate/70 mb-2">
                  Origin Location
                </label>
                <div className="flex gap-2">
                  {[
                    { key: 'ALL', label: 'All' },
                    { key: 'LOCAL_DUBAI', label: '🇦🇪 Dubai' },
                    { key: 'IMPORTED', label: '✈️ Import' },
                  ].map((o) => (
                    <button
                      key={o.key}
                      type="button"
                      onClick={() => setSelectedOrigin(o.key)}
                      className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold border-2 transition-all ${
                        selectedOrigin === o.key
                          ? 'bg-caramel text-white border-chocolate shadow-xs'
                          : 'bg-white border-chocolate/30 text-chocolate'
                      }`}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Hypoallergenic Toggle */}
              <div>
                <label className="block text-xs uppercase font-extrabold tracking-wider text-chocolate/70 mb-2">
                  Allergy Friendly
                </label>
                <button
                  type="button"
                  onClick={() => setHypoallergenicOnly(!hypoallergenicOnly)}
                  className={`w-full py-1.5 px-3 rounded-xl text-xs font-bold border-2 transition-all flex items-center justify-center gap-1.5 ${
                    hypoallergenicOnly
                      ? 'bg-soft-green text-white border-chocolate shadow-xs'
                      : 'bg-white border-chocolate/30 text-chocolate'
                  }`}
                >
                  <Check className={`w-3.5 h-3.5 ${hypoallergenicOnly ? 'opacity-100' : 'opacity-30'}`} />
                  <span>Hypoallergenic Hair Only</span>
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Filtered Results Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-serif text-2xl font-bold text-chocolate">
              Matching Puppies ({filteredPuppies.length})
            </h3>
            <Link
              href="/puppies"
              className="text-xs sm:text-sm font-bold text-terracotta hover:underline flex items-center gap-1"
            >
              Browse all available puppies &rarr;
            </Link>
          </div>

          {filteredPuppies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPuppies.slice(0, 3).map((pup, index) => (
                <PuppyCard key={pup.id} puppy={pup} rotate={index % 2 === 0 ? -1 : 1} />
              ))}
            </div>
          ) : (
            <div className="bg-cream border-2 border-dashed border-chocolate rounded-4xl p-12 text-center">
              <PawPrint className="w-12 h-12 text-caramel mx-auto mb-3" />
              <h4 className="font-serif text-xl font-bold text-chocolate mb-1">No Puppies Match These Exact Filters</h4>
              <p className="text-sm text-chocolate/70 max-w-md mx-auto mb-6">
                We have custom litters arriving weekly. Speak directly with our nursery team on WhatsApp to request a custom reservation.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedBreed('ALL');
                  setSelectedGender('ALL');
                  setSelectedOrigin('ALL');
                  setHypoallergenicOnly(false);
                }}
                className="py-2.5 px-6 rounded-full bg-warm-yellow border-2 border-chocolate text-chocolate font-bold text-xs"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
