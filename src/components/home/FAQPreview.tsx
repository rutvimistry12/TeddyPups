"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { FAQItem } from '@/lib/types';

interface FAQPreviewProps {
  faqs?: FAQItem[];
}

const STATIC_FAQS = [
  {
    id: 's1',
    question: 'Are your puppies vaccinated and health-checked?',
    answer:
      'Yes. All our puppies come with a verified health certificate from licensed vets. Every puppy is vaccinated, dewormed, and thoroughly checked before joining your family.',
  },
  {
    id: 's2',
    question: 'Can I meet a puppy before I decide?',
    answer:
      'Yes. Come meet our locally available puppies in our Downtown Dubai showroom and spend time bonding before making your decision.',
  },
  {
    id: 's3',
    question: 'Can I take my puppy home the same day?',
    answer:
      'Local puppies are available immediately, so you can take your puppy home the same day. For imported puppies, we coordinate all safe transport and delivery directly to your home.',
  },
  {
    id: 's4',
    question: 'What breeds do you specialize in?',
    answer:
      'We specialize in Korean teacup Maltipoos, Toy Poodles, Cavapoos, Pomeranians, and Shih Tzus from world-class, ethical preservation breeders.',
  },
  {
    id: 's5',
    question: 'Do you offer post-adoption support?',
    answer:
      'Always. Our 24/7 VIP concierge team remains by your side to help with feeding routines, vet consultations, and puppy care guidance.',
  },
];

export function FAQPreview({ faqs }: FAQPreviewProps) {
  const displayFaqs = faqs && faqs.length > 0 ? faqs.slice(0, 5) : STATIC_FAQS;
  const [openId, setOpenId] = useState<string | null>(displayFaqs[0]?.id || null);
  const [bubbleText, setBubbleText] = useState<string | null>(null);

  // Twinkling star positions matching live site
  const stars = [
    { left: '8%', top: '12%', size: 16, delay: '0s' },
    { left: '22%', top: '30%', size: 9, delay: '0.4s' },
    { left: '41%', top: '8%', size: 13, delay: '0.8s' },
    { left: '57%', top: '22%', size: 8, delay: '1.2s' },
    { left: '72%', top: '6%', size: 14, delay: '1.6s' },
    { left: '88%', top: '18%', size: 11, delay: '2s' },
    { left: '95%', top: '42%', size: 9, delay: '2.4s' },
    { left: '4%', top: '58%', size: 11, delay: '2.8s' },
    { left: '34%', top: '70%', size: 7, delay: '3.2s' },
    { left: '82%', top: '78%', size: 12, delay: '3.6s' },
  ];

  return (
    <section
      id="tp-night"
      data-pup-scene="true"
      data-tone="dark"
      className="tp-scene tp-night relative overflow-hidden text-[#fffdf8]"
      style={{
        background: 'linear-gradient(to bottom, #4d2b19, #2f1a10)',
        padding: 'clamp(4.5rem, 9vh, 7rem) 1.5rem',
      }}
      aria-labelledby="questions-title"
    >
      {/* Night Sky Twinkling Stars */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {stars.map((s, idx) => (
          <svg
            key={idx}
            className="absolute text-[#f2be6b] animate-pulse"
            style={{
              left: s.left,
              top: s.top,
              width: `${s.size}px`,
              height: `${s.size}px`,
              animationDelay: s.delay,
              animationDuration: '3s',
            }}
            viewBox="0 0 40 40"
          >
            <path
              d="M20 3c1.6 9.4 7.6 15.4 17 17-9.4 1.6-15.4 7.6-17 17-1.6-9.4-7.6-15.4-17-17 9.4-1.6 15.4-7.6 17-17z"
              fill="currentColor"
            />
          </svg>
        ))}
      </div>

      <div className="mx-auto max-w-[110rem] px-4 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left Column: Title, CTA, and Mascot with Inquisitive Head Tilt & Wonder ? */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <h2
              id="questions-title"
              className="font-serif font-extrabold text-[#fffdf8] leading-tight"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 4.4rem)', lineHeight: 1.05 }}
            >
              Questions, answered
            </h2>

            <Link
              href="/faq"
              className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-white/30 hover:border-[#f2be6b] hover:text-[#f2be6b] text-white font-bold px-7 py-3 text-sm transition-all shadow-sm"
            >
              Read all questions
            </Link>

            {/* Inquisitive Mascot Puppy with Floating ? */}
            <div
              className="relative mt-8 sm:mt-12 cursor-pointer w-[clamp(9rem,16vw,12rem)]"
              onClick={() => {
                setBubbleText('Ask us anything! 🐾');
                setTimeout(() => setBubbleText(null), 2000);
              }}
            >
              {/* Floating Wondering Question Mark */}
              <span
                aria-hidden="true"
                className="font-serif font-extrabold text-[#f2be6b] select-none absolute -top-8 left-[58%] text-4xl sm:text-5xl animate-bounce"
                style={{ animationDuration: '2.5s' }}
              >
                ?
              </span>

              {/* Click bubble */}
              {bubbleText && (
                <div className="absolute whitespace-nowrap font-hand font-bold text-[#2a170e] bg-[#fffdf8] border-2 border-[#2a170e] rounded-full px-3 py-1 text-sm shadow-md -top-12 left-10 z-30 animate-fadeIn">
                  {bubbleText}
                </div>
              )}

              {/* Inquisitive Puppy SVG with tilted head (data-act="tilt") */}
              <svg
                viewBox="0 0 300 240"
                className="w-full overflow-visible transition-transform duration-300 hover:scale-105"
                aria-hidden="true"
              >
                <ellipse cx="150" cy="230" rx="86" ry="7" fill="#000000" opacity="0.25" />
                <g transform="translate(0 -2)">
                  {/* Sitting haunches & legs */}
                  <path d="M80 178 L80 220 C80 226 86 228 92 228 C98 228 104 226 104 220 L104 178 Z" fill="#e4a352" stroke="#2a170e" strokeWidth="3" />
                  <path d="M154 178 L154 220 C154 226 160 228 166 228 C172 228 178 226 178 220 L178 178 Z" fill="#e4a352" stroke="#2a170e" strokeWidth="3" />
                  {/* Tail wag */}
                  <path d="M86 152C80 146 76 140 74 136" stroke="#2a170e" strokeWidth="9" strokeLinejoin="round" strokeLinecap="round" fill="none" />
                  <path d="M86 152C80 146 76 140 74 136" stroke="#f2be6b" strokeWidth="4" fill="none" strokeLinecap="round" />
                  <path d="M70 110Q78.1 105 80.9 113.7Q90.5 114.8 86.7 123.2Q93.4 129.9 84.7 134Q85.2 143.1 75.8 141Q70 148.3 64.2 141Q54.8 143.1 55.3 134Q46.6 129.9 53.3 123.2Q49.5 114.8 59.1 113.7Q61.9 105 70 110Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
                  {/* Body */}
                  <path d="M76.8 175.6Q69 167.9 78.2 160.7Q76.6 151.8 90.3 147.3Q95.2 138.9 110.9 137.9Q121.6 131.3 136.7 134Q151.1 130.5 162.9 136.4Q178.7 136.4 185.3 144.5Q199.7 148.2 199.7 157.1Q210.3 163.7 203.9 171.9Q208.7 180.4 197 186.3Q195.3 195.2 180.3 198Q172.3 205.7 156.6 204.8Q143.7 210 130 205.6Q114.5 207.4 105.1 200.2Q89.7 198.3 86.3 189.6Q73.6 184.3 76.8 175.6Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
                  {/* Front paws */}
                  <path d="M102 182 L102 224 C102 230 108 232 114 232 C120 232 126 230 126 224 L126 182 Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3" />
                  <path d="M176 182 L176 224 C176 230 182 232 188 232 C194 232 200 230 200 224 L200 182 Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3" />

                  {/* Collar */}
                  <path d="M178 146Q212 162 246 146L246 154Q212 170 178 154Z" fill="#a24a1a" stroke="#2a170e" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />

                  {/* Head with CUTE INQUISITIVE TILT (rotate 8deg) */}
                  <g transform="translate(6 2) rotate(8 212 100)">
                    {/* Ears */}
                    <path d="M177.1 78.7Q186.9 70.8 186.6 87.4Q196 89.9 189.9 105.5Q195.2 117.3 185.5 126Q184.7 142.8 175.2 141.2Q168.7 156.5 162.9 145.3Q153.1 153.2 153.4 136.6Q144 134.1 150.1 118.5Q144.8 106.7 154.5 98Q155.3 81.2 164.8 82.8Q171.3 67.5 177.1 78.7Z" fill="#e4a352" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
                    <path d="M246.9 78.7Q252.7 67.5 259.2 82.8Q268.7 81.2 269.5 98Q279.2 106.7 273.9 118.5Q280 134.1 270.6 136.6Q270.9 153.2 261.1 145.3Q255.3 156.5 248.8 141.2Q239.3 142.8 238.5 126Q228.8 117.3 234.1 105.5Q228 89.9 237.4 87.4Q237.1 70.8 246.9 78.7Z" fill="#e4a352" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
                    {/* Head puff */}
                    <path d="M212 54Q223.4 48.2 231.5 57.5Q244.5 56.1 248.1 67.5Q260.7 70.7 259.1 82.4Q269.4 89.7 263 100Q269.4 110.3 259.1 117.6Q260.7 129.3 248.1 132.5Q244.5 143.9 231.5 142.5Q223.4 151.8 212 146Q200.6 151.8 192.5 142.5Q179.5 143.9 175.9 132.5Q163.3 129.3 164.9 117.6Q154.6 110.3 161 100Q154.6 89.7 164.9 82.4Q163.3 70.7 175.9 67.5Q179.5 56.1 192.5 57.5Q200.6 48.2 212 54Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
                    {/* Cheeks */}
                    <circle cx="181" cy="116" r="7" fill="#f9b9a6" opacity="0.85" />
                    <circle cx="243" cy="116" r="7" fill="#f9b9a6" opacity="0.85" />
                    {/* Cute big curious eyes */}
                    <circle cx="196" cy="98" r="5.5" fill="#2a170e" />
                    <circle cx="228" cy="98" r="5.5" fill="#2a170e" />
                    <circle cx="194.5" cy="95.5" r="1.8" fill="#ffffff" />
                    <circle cx="226.5" cy="95.5" r="1.8" fill="#ffffff" />
                    {/* Nose and mouth */}
                    <path d="M204.5 111.5Q212 107.2 219.5 111.5Q218.2 118.4 212 120Q205.8 118.4 204.5 111.5Z" fill="#2a170e" />
                    <path d="M212 120V124.5M212 124.5Q207.2 129.6 202.8 125.2M212 124.5Q216.8 129.6 221.2 125.2" stroke="#2a170e" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" fill="none" />
                    <path d="M207.6 127.4Q212 136.6 216.4 127.4Z" fill="#e98c8c" stroke="#2a170e" strokeWidth="2.2" strokeLinejoin="round" />
                  </g>
                </g>
              </svg>
            </div>
          </div>

          {/* Right Column: Interactive FAQ List with Gold Star Bullets */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            {displayFaqs.map((f) => {
              const isOpen = openId === f.id;
              return (
                <div
                  key={f.id}
                  className="rounded-2xl border-2 border-white/20 bg-white/5 hover:bg-white/10 transition-colors overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : f.id)}
                    className="w-full text-left p-6 sm:p-7 flex items-start justify-between gap-4 cursor-pointer"
                  >
                    <div className="flex items-start gap-3.5">
                      {/* Gold Star Bullet */}
                      <svg
                        className="w-5 h-5 text-[#f2be6b] shrink-0 mt-1"
                        viewBox="0 0 40 40"
                        aria-hidden="true"
                      >
                        <path
                          d="M20 3c1.6 9.4 7.6 15.4 17 17-9.4 1.6-15.4 7.6-17 17-1.6-9.4-7.6-15.4-17-17 9.4-1.6 15.4-7.6 17-17z"
                          fill="currentColor"
                        />
                      </svg>
                      <span className="font-serif font-bold text-lg sm:text-xl text-[#fffdf8] leading-snug">
                        {f.question}
                      </span>
                    </div>

                    <span
                      className={`text-[#f2be6b] font-bold text-xl shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-45' : 'rotate-0'
                      }`}
                    >
                      +
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 sm:px-7 sm:pb-7 pt-0 text-[#fffdf8]/80 text-sm sm:text-base leading-relaxed pl-14 sm:pl-16 border-t border-white/10 mt-1 pt-4 animate-fadeIn">
                      {f.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
