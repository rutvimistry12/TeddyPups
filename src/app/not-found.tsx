import React from 'react';
import Link from 'next/link';
import { IllustratedTeddyPeeking, TapeStrip, PawPrint } from '@/components/illustrations/PuppyDoodles';
import { ArrowRight, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="py-24 bg-cream min-h-[70vh] flex items-center justify-center p-4">
      <div className="bg-white border-3 border-chocolate rounded-5xl p-8 sm:p-14 max-w-lg w-full text-center shadow-scrapbook-xl relative">
        <TapeStrip className="-top-4 left-1/2 -translate-x-1/2" />
        
        <div className="mb-4">
          <IllustratedTeddyPeeking className="w-36 h-28 mx-auto" />
        </div>

        <span className="font-hand text-3xl font-bold text-terracotta block mb-1">
          Ruff! Page Not Found (404)
        </span>
        <h1 className="font-serif text-3xl font-extrabold text-chocolate mb-3">
          This puppy must have wandered off...
        </h1>
        <p className="text-xs sm:text-sm text-chocolate/75 max-w-sm mx-auto mb-8 leading-relaxed">
          The page or puppy profile you are looking for doesn&apos;t seem to be here. Let&apos;s guide you back to our main boutique!
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Link
            href="/"
            className="py-3 px-6 rounded-full bg-warm-yellow border-2 border-chocolate text-chocolate font-bold text-xs uppercase tracking-wider shadow-scrapbook hover:bg-caramel hover:text-white flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
          <Link
            href="/puppies"
            className="py-3 px-6 rounded-full bg-terracotta text-white border-2 border-chocolate font-bold text-xs uppercase tracking-wider shadow-scrapbook hover:bg-caramel flex items-center justify-center gap-2"
          >
            <span>Browse Puppies</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

