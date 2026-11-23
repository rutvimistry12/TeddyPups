import React from 'react';
import Link from 'next/link';
import { Puppy } from '@/lib/types';
import { PuppyCard } from '@/components/puppy/PuppyCard';
import { Sparkles, ArrowRight } from 'lucide-react';
import { PawPrint } from '@/components/illustrations/PuppyDoodles';

interface FeaturedPuppiesProps {
  puppies: Puppy[];
}

export function FeaturedPuppies({ puppies }: FeaturedPuppiesProps) {
  const featured = puppies.filter((p) => p.isFeatured).slice(0, 3);
  const displayList = featured.length > 0 ? featured : puppies.slice(0, 3);

  return (
    <section className="py-20 bg-cream relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-light-peach border-2 border-chocolate text-chocolate font-bold text-xs uppercase tracking-widest shadow-scrapbook mb-4">
              <Sparkles className="w-3.5 h-3.5 text-caramel fill-caramel" />
              Hand-Selected Litters
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-chocolate tracking-tight">
              Featured Little Pups
            </h2>
            <p className="text-chocolate/80 text-base sm:text-lg mt-2">
              Ready for private viewing today in our Dubai nursery or direct home delivery.
            </p>
          </div>

          <Link
            href="/puppies"
            className="self-start sm:self-auto py-3 px-6 rounded-full bg-warm-yellow border-2 border-chocolate text-chocolate font-bold text-xs uppercase tracking-wider shadow-scrapbook hover:bg-caramel hover:text-white transition-all flex items-center gap-2"
          >
            <span>View All Available Pups</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayList.map((pup, idx) => (
            <PuppyCard key={pup.id} puppy={pup} tape={idx === 1} rotate={idx === 0 ? -1 : idx === 2 ? 1 : 0} />
          ))}
        </div>

      </div>
    </section>
  );
}

