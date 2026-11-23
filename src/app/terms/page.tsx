import React from 'react';
import { Metadata } from 'next';
import { FileText } from 'lucide-react';
import { TapeStrip, PawPrint } from '@/components/illustrations/PuppyDoodles';

export const metadata: Metadata = {
  title: 'Terms and Conditions | TeddyPups UAE',
  description: 'Terms of adoption, reservation deposit policies, and health warranties for TeddyPups UAE.',
};

export default function TermsPage() {
  return (
    <div className="py-16 bg-cream min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white border-3 border-chocolate rounded-5xl p-8 sm:p-14 shadow-scrapbook-xl relative">
          <TapeStrip className="-top-4 right-16" rotate={3} />

          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-5 h-5 text-terracotta" />
            <span className="text-xs font-bold uppercase tracking-widest text-caramel">Adoption Agreement</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-chocolate tracking-tight mb-4">
            Terms & Conditions
          </h1>
          <p className="text-xs text-chocolate/50 mb-8">
            Governed by the Federal Laws of the United Arab Emirates
          </p>

          <div className="space-y-6 text-sm text-chocolate/85 leading-relaxed border-t border-dashed border-caramel/40 pt-6">
            <section>
              <h2 className="font-serif text-xl font-bold text-chocolate mb-2">1. Reservation & Deposits</h2>
              <p>
                To reserve a puppy exclusively for your family, a standard non-refundable reservation deposit is required. This deposit covers quarantine clearance, veterinary clinical preparation, and administrative pet passport processing.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-chocolate mb-2">2. Veterinary Health Passport & 1-Year Guarantee</h2>
              <p>
                Every puppy is released with a valid health record signed by a licensed UAE veterinarian, confirming age-appropriate core vaccinations and microchip implementation. We provide a 1-year written congenital health guarantee covering verified life-threatening hereditary disorders.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-chocolate mb-2">3. Showroom & In-Person Visits</h2>
              <p>
                To maintain the highest health standards and prevent communicable pathogen exposure to vulnerable young pups, nursery appointments are strictly limited to confirmed bookings. Sanitization protocols must be observed upon entering the suites.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-chocolate mb-2">4. Ethical Rehoming Commitment</h2>
              <p>
                If, due to unforeseen life events, an adopter cannot continue caring for a TeddyPups puppy, our concierge team will facilitate ethical rehoming. Puppies must never be surrendered to kill shelters or commercial resellers.
              </p>
            </section>
          </div>
        </div>

      </div>
    </div>
  );
}

