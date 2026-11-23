"use client";

import React from 'react';
import Link from 'next/link';
import { InteractiveHeroScallop } from './InteractiveHeroScallop';

export function HeroSection() {
  const whatsappUrl = `https://wa.me/971501234567?text=${encodeURIComponent(
    "Hello TeddyPups UAE! I am interested in meeting your teacup puppies in Dubai."
  )}`;

  return (
    <section id="tp-hero" className="relative overflow-hidden pt-12 sm:pt-16 bg-[#FFF9F0]">
      {/* First pup stop — hero center */}
      <div data-pup-stop data-x="50" data-pose="sit" data-facing="right" style={{ position: 'absolute', top: '80%', left: '50%', pointerEvents: 'none' }} />
      
      {/* Top Editorial Headline Content (Matching puppy.instabizweb.com exactly) */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10 space-y-4 sm:space-y-5">
        
        {/* Curated Top Script: "every puppy is family" with cute curved underline */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative inline-block">
            <span className="font-serif italic text-xl sm:text-2xl text-[#8D3F18] font-medium tracking-tight">
              every puppy is family
            </span>
            <svg
              className="w-full h-2.5 text-[#8D3F18] mt-[-2px]"
              viewBox="0 0 160 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 2 8 C 40 2, 80 12, 120 4 C 140 1, 155 7, 158 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Oversized Bold Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-extrabold text-[#35190E] tracking-tight leading-[1.08]">
          Premium teacup<br />puppies in Dubai
        </h1>

        {/* Supporting Subtitle */}
        <p className="text-[#35190E]/80 text-base sm:text-lg md:text-xl font-normal max-w-2xl mx-auto leading-relaxed">
          Meet your new best friend in our Dubai showroom, or order a rare<br className="hidden sm:inline" /> miniature breed from trusted breeders worldwide.
        </p>

        {/* Dual Pill Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 pb-6">
          <Link
            href="/puppies"
            className="w-full sm:w-auto py-3.5 px-8 rounded-full bg-[#A94E20] hover:bg-[#8D3F18] text-white border-2 border-[#35190E] font-bold text-sm tracking-wide shadow-scrapbook hover:shadow-scrapbook-lg hover:-translate-y-0.5 transition-all flex items-center justify-center text-center"
          >
            View available puppies
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto py-3.5 px-8 rounded-full bg-white hover:bg-cream text-[#35190E] border-2 border-[#35190E] font-bold text-sm tracking-wide shadow-scrapbook hover:-translate-y-0.5 transition-all flex items-center justify-center text-center"
          >
            Enquire on WhatsApp
          </a>
        </div>

      </div>

      {/* ============================================================== */}
      {/* EXACT PETS, MOVING ARCHES, PEEK-A-BOO HOVER, EYE-TRACKING TEDDY */}
      {/* ============================================================== */}
      <InteractiveHeroScallop />

    </section>
  );
}
