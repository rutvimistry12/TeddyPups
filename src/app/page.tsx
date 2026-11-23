import React from 'react';
import { getPuppies, getTestimonials, getFAQs } from '@/lib/data-store';
import { HeroSection } from '@/components/home/HeroSection';
import { MeetThePupsDoors } from '@/components/home/MeetThePupsDoors';
import { TwoWaysHome } from '@/components/home/TwoWaysHome';
import { PuppyJourney } from '@/components/home/PuppyJourney';
import { PuppyPromise } from '@/components/home/PuppyPromise';
import { HappyFamiliesPreview } from '@/components/home/HappyFamiliesPreview';
import { FAQPreview } from '@/components/home/FAQPreview';
import { FinalCTA } from '@/components/home/FinalCTA';

export const revalidate = 0; // Dynamic server rendering for fresh data

export default async function HomePage() {
  const [puppies, testimonials, faqs] = await Promise.all([
    getPuppies(),
    getTestimonials(true),
    getFAQs(),
  ]);

  return (
    <div className="relative">
      {/* 1. Hero with 6-seat puppy lineup, quilt, and peek-a-boo */}
      <HeroSection />

      {/* 2. Meet the pups with running dog, floor, and 6 arched doors */}
      <MeetThePupsDoors puppies={puppies} />

      {/* 3. Two ways to meet your puppy (Dubai showroom vs Imported) */}
      <TwoWaysHome />

      {/* 4. Your puppy journey (3-step concierge process + WhatsApp mockup) */}
      <PuppyJourney />

      {/* 5. Puppy passport: Why families trust TeddyPups (4 certified stamps) */}
      <PuppyPromise />

      {/* 6. Happy families & puppies photo polaroid wall */}
      <HappyFamiliesPreview testimonials={testimonials} />

      {/* 7. Questions, answered (Accordion FAQs) */}
      <FAQPreview faqs={faqs} />

      {/* 8. Ready to meet your new best friend? Final CTA */}
      <FinalCTA />
    </div>
  );
}
