"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePuppy } from '@/context/PuppyContext';
import { X, ArrowRight, Check, MessageCircle, Scale } from 'lucide-react';

export function ComparisonDrawer() {
  const { comparedPuppies, removeFromCompare, clearCompare, isCompareOpen, closeCompare } = usePuppy();

  if (!isCompareOpen || comparedPuppies.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-dark-brown/60 backdrop-blur-sm flex justify-center items-end sm:items-center p-2 sm:p-4 animate-in fade-in">
      <div className="bg-cream border-2 border-chocolate rounded-4xl shadow-scrapbook-xl w-full max-w-5xl max-h-[92vh] overflow-y-auto relative p-6 sm:p-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-dashed border-caramel/40 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-warm-yellow border-2 border-chocolate flex items-center justify-center text-chocolate shadow-scrapbook">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-2xl font-bold text-chocolate">Compare Little Puppies</h3>
              <p className="text-sm text-chocolate/70">Comparing {comparedPuppies.length} of 3 maximum pups</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={clearCompare}
              className="text-xs uppercase tracking-wider text-terracotta hover:underline font-bold"
            >
              Clear All
            </button>
            <button
              onClick={closeCompare}
              className="p-2 rounded-full bg-light-peach border border-chocolate hover:bg-warm-yellow transition-colors"
            >
              <X className="w-5 h-5 text-chocolate" />
            </button>
          </div>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {comparedPuppies.map((pup) => (
            <div key={pup.id} className="relative bg-white border-2 border-chocolate rounded-3xl p-5 shadow-scrapbook flex flex-col justify-between">
              <button
                onClick={() => removeFromCompare(pup.id)}
                className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-terracotta text-white border-2 border-chocolate flex items-center justify-center hover:scale-110 transition-transform shadow-sm"
                title="Remove puppy"
              >
                <X className="w-4 h-4" />
              </button>

              <div>
                {/* Image */}
                <div className="relative w-full h-48 rounded-2xl overflow-hidden border-2 border-chocolate mb-4 bg-light-peach">
                  <Image
                    src={pup.images[0]?.url || "https://images.unsplash.com/photo-1546527813-25509cfa3da0?auto=format&fit=crop&w=600&q=80"}
                    alt={pup.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-cream/90 backdrop-blur-xs text-chocolate text-xs font-bold px-2.5 py-1 rounded-full border border-chocolate">
                    {pup.status}
                  </div>
                </div>

                <h4 className="font-serif text-xl font-bold text-chocolate mb-1">{pup.name}</h4>
                <p className="text-sm font-semibold text-terracotta mb-4">{pup.breedName}</p>

                {/* Attributes Table */}
                <div className="space-y-2.5 text-xs text-chocolate border-t border-b border-dashed border-caramel/40 py-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-chocolate/60">Gender:</span>
                    <span className="font-bold">{pup.gender === 'MALE' ? 'Boy ♂' : 'Girl ♀'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-chocolate/60">Age:</span>
                    <span className="font-bold">{pup.ageWeeks} weeks</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-chocolate/60">Price:</span>
                    <span className="font-bold text-terracotta text-sm">{pup.priceAED.toLocaleString()} AED</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-chocolate/60">Origin:</span>
                    <span className="font-semibold">{pup.origin === 'LOCAL_DUBAI' ? '🇦🇪 Dubai Nursery' : '✈️ European Import'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-chocolate/60">Weight:</span>
                    <span className="font-semibold">{pup.weightKg ? `${pup.weightKg} kg` : 'Expected < 2 kg'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-chocolate/60">Hypoallergenic:</span>
                    <span className="font-bold text-soft-green flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> 100% Yes
                    </span>
                  </div>
                </div>

                <p className="text-xs text-chocolate/80 italic mb-4 line-clamp-2">
                  &ldquo;{pup.personality}&rdquo;
                </p>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-2">
                <Link
                  href={`/puppies/${pup.slug}`}
                  onClick={closeCompare}
                  className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-warm-yellow border-2 border-chocolate text-chocolate font-bold text-xs hover:bg-caramel hover:text-white transition-colors"
                >
                  View Full Profile <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <a
                  href={`https://wa.me/971501234567?text=${encodeURIComponent(`Hello TeddyPups UAE! I am comparing puppies on your website and would love more details about ${pup.name} (${pup.breedName}).`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl bg-[#25D366] text-white border-2 border-chocolate font-bold text-xs hover:opacity-95 transition-opacity"
                >
                  <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Inquiry
                </a>
              </div>
            </div>
          ))}

          {/* Empty slot placeholder if < 3 */}
          {comparedPuppies.length < 3 && (
            <div className="border-2 border-dashed border-chocolate/40 rounded-3xl p-6 flex flex-col items-center justify-center text-center bg-cream/50 min-h-[350px]">
              <div className="w-12 h-12 rounded-full bg-light-peach border-2 border-dashed border-chocolate flex items-center justify-center text-chocolate mb-3">
                +
              </div>
              <h5 className="font-serif font-bold text-chocolate mb-1">Add Another Puppy</h5>
              <p className="text-xs text-chocolate/60 max-w-[200px] mb-4">
                Browse our puppy directory and click &quot;Compare&quot; to inspect them side-by-side.
              </p>
              <Link
                href="/puppies"
                onClick={closeCompare}
                className="text-xs font-bold text-terracotta hover:underline"
              >
                Browse Puppies &rarr;
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

