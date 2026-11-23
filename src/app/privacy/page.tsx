import React from 'react';
import { Metadata } from 'next';
import { ShieldCheck } from 'lucide-react';
import { TapeStrip, PawPrint } from '@/components/illustrations/PuppyDoodles';

export const metadata: Metadata = {
  title: 'Privacy Policy | TeddyPups UAE',
  description: 'Privacy policy and data protection principles for TeddyPups UAE boutique clients.',
};

export default function PrivacyPage() {
  return (
    <div className="py-16 bg-cream min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white border-3 border-chocolate rounded-5xl p-8 sm:p-14 shadow-scrapbook-xl relative">
          <TapeStrip className="-top-4 left-16" rotate={-3} />

          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck className="w-5 h-5 text-soft-green" />
            <span className="text-xs font-bold uppercase tracking-widest text-caramel">Client Confidentiality</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-chocolate tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-xs text-chocolate/50 mb-8">
            Last Updated: January 2025 &bull; In accordance with UAE Data Protection Regulations
          </p>

          <div className="space-y-6 text-sm text-chocolate/85 leading-relaxed border-t border-dashed border-caramel/40 pt-6">
            <section>
              <h2 className="font-serif text-xl font-bold text-chocolate mb-2">1. Introduction</h2>
              <p>
                TeddyPups UAE (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;) operates a private boutique nursery showroom in Jumeirah 2, Dubai. We are committed to protecting the privacy and personal records of our prospective and adopting families.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-chocolate mb-2">2. Information We Collect</h2>
              <p>
                When inquiring about or reserving a puppy, we collect customer identification data including your full name, telephone and WhatsApp number, email address, Emirate of residence, and communication history. For puppy microchip registration under UAE MOCCAE standards, identification documentation is required.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-chocolate mb-2">3. How Your Information is Used</h2>
              <p>
                Your details are used strictly to:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-xs sm:text-sm">
                <li>Coordinate private nursery viewing appointments in Jumeirah.</li>
                <li>Process official pet ownership transfer and microchip registry in the UAE.</li>
                <li>Provide ongoing veterinary aftercare support and vaccination milestone reminders.</li>
                <li>Fulfill climate-controlled chauffeur delivery to your residence.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-chocolate mb-2">4. Third-Party Disclosures & Security</h2>
              <p>
                We do not sell, rent, or monetize client data. Information is only disclosed to licensed veterinary clinics and the UAE Ministry for official pet licensing purposes.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-chocolate mb-2">5. Contact Information</h2>
              <p>
                For questions regarding data records or deletion requests, contact our concierge officer at <strong>concierge@teddypups.ae</strong>.
              </p>
            </section>
          </div>
        </div>

      </div>
    </div>
  );
}

