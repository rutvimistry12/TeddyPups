"use client";

import React, { useState, useEffect, useRef } from 'react';

export function PuppyPromise() {
  const stamps = [
    {
      title: 'Vet-checked & healthy',
      desc: 'Every puppy comes vaccinated, dewormed, and with a verified health certificate.',
      icon: (
        <svg viewBox="0 0 40 40" className="w-8 h-8 fill-none stroke-[#a24a1a]" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 32 C10 24 4 18 4 12 A8 8 0 0 1 20 8 A8 8 0 0 1 36 12 C36 18 30 24 20 32 Z" />
        </svg>
      ),
      borderShape: 'rounded-full border-2 border-[#a24a1a] aspect-square flex flex-col items-center justify-center p-3 text-center',
      tagColor: 'text-[#a24a1a]',
    },
    {
      title: 'Korea to Dubai, safely',
      desc: 'Trusted breeders, safe travel, and premium care from start to finish.',
      icon: (
        <svg viewBox="0 0 40 40" className="w-8 h-8 fill-none stroke-[#287b52]" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 24 L20 8 L24 10 L14 22 L28 22 L32 26 L8 26 Z" />
        </svg>
      ),
      borderShape: 'rounded-2xl border-2 border-[#287b52] aspect-square flex flex-col items-center justify-center p-3 text-center',
      tagColor: 'text-[#287b52]',
    },
    {
      title: 'Support 24/7',
      desc: 'Always here to help, from choosing your puppy to post-delivery support.',
      icon: (
        <svg viewBox="0 0 40 40" className="w-8 h-8 fill-none stroke-[#5a3a28]" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="6" y="8" width="28" height="20" rx="8" />
          <line x1="12" y1="18" x2="16" y2="18" strokeWidth="3" />
          <line x1="20" y1="18" x2="24" y2="18" strokeWidth="3" />
          <line x1="28" y1="18" x2="28" y2="18" strokeWidth="3" />
        </svg>
      ),
      borderShape: 'rounded-[999px] border-2 border-[#5a3a28] aspect-[1.3/1] flex flex-col items-center justify-center p-3 text-center',
      tagColor: 'text-[#5a3a28]',
    },
    {
      title: 'Trusted by families worldwide',
      desc: 'Puppies delivered to loving homes all around the world.',
      icon: (
        <svg viewBox="0 0 40 40" className="w-8 h-8 fill-none stroke-[#c2622b]" strokeWidth="2" strokeLinecap="round">
          <circle cx="20" cy="20" r="14" strokeDasharray="3 3" />
          <ellipse cx="20" cy="20" rx="7" ry="14" />
          <line x1="6" y1="20" x2="34" y2="20" />
        </svg>
      ),
      borderShape: 'rounded-full border-2 border-dashed border-[#c2622b] aspect-square flex flex-col items-center justify-center p-3 text-center',
      tagColor: 'text-[#c2622b]',
    },
  ];

  return (
    <section
      id="tp-passport"
      data-pup-scene="true"
      data-tone="light"
      className="tp-scene tp-passport relative overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #f0b866, #a65a30)',
        padding: 'clamp(4rem, 8vh, 7rem) 1.5rem',
      }}
      aria-labelledby="trust-title"
    >
      <div data-pup-stop data-x="42" data-y="18" data-pose="stand" style={{ position: 'absolute', left: '42%', bottom: '2%', width: 1, height: 1, pointerEvents: 'none' }} />
      <div className="mx-auto max-w-[96rem] px-4 sm:px-8">

        {/* Passport Book Open Spread */}
        <div
          className="relative bg-[#fffdf8] border-[3.5px] border-[#2a170e] rounded-[36px] overflow-hidden shadow-2xl"
          style={{
            boxShadow: '10px 14px 0 #2a170e30',
          }}
        >
          {/* Book Spine Center Crease */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-8 -translate-x-1/2 pointer-events-none z-10 bg-gradient-to-r from-transparent via-[#2a170e15] to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-2 p-8 sm:p-14 lg:p-20 gap-10 md:gap-16 items-center">

            {/* Left Page: Title & Story */}
            <div className="flex flex-col justify-center">
              <p className="font-hand font-bold text-[#c2622b] text-xl mb-2">
                puppy passport
              </p>
              <h2
                id="trust-title"
                className="font-serif font-extrabold text-[#2a170e] leading-tight"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4.4rem)', lineHeight: 1.05 }}
              >
                Why families trust TeddyPups
              </h2>
            </div>

            {/* Right Page: 4 Passport Stamps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
              {stamps.map((s, idx) => (
                <div
                  key={idx}
                  className="tp-stamp-hover cursor-pointer group flex flex-col items-center text-center"
                >
                  <div className={`${s.borderShape} w-36 mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-2`}>
                    <div className="mb-1">{s.icon}</div>
                    <span className={`font-serif font-bold text-xs ${s.tagColor} leading-tight`}>
                      {s.title}
                    </span>
                  </div>
                  <p className="text-[#5a3a28] text-xs leading-relaxed max-w-[24ch]">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>

          {/* Mascot Puppy Standing at the Bottom of Book */}
          <div className="absolute -bottom-2 left-1/3 md:left-[42%] z-20 w-32 cursor-pointer pointer-events-auto">
            <svg viewBox="0 0 300 240" className="w-full overflow-visible" aria-hidden="true">
              <ellipse cx="150" cy="230" rx="86" ry="7" fill="#2a170e" opacity="0.13" />
              <g transform="translate(0 -2)">
                <path d="M80 178 L80 220 C80 226 86 228 92 228 C98 228 104 226 104 220 L104 178 Z" fill="#e4a352" stroke="#2a170e" strokeWidth="3" />
                <path d="M154 178 L154 220 C154 226 160 228 166 228 C172 228 178 226 178 220 L178 178 Z" fill="#e4a352" stroke="#2a170e" strokeWidth="3" />
                <path d="M86 152C80 146 76 140 74 136" stroke="#2a170e" strokeWidth="9" strokeLinejoin="round" strokeLinecap="round" fill="none" />
                <path d="M86 152C80 146 76 140 74 136" stroke="#f2be6b" strokeWidth="4" fill="none" strokeLinecap="round" />
                <path d="M70 110Q78.1 105 80.9 113.7Q90.5 114.8 86.7 123.2Q93.4 129.9 84.7 134Q85.2 143.1 75.8 141Q70 148.3 64.2 141Q54.8 143.1 55.3 134Q46.6 129.9 53.3 123.2Q49.5 114.8 59.1 113.7Q61.9 105 70 110Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
                <path d="M76.8 175.6Q69 167.9 78.2 160.7Q76.6 151.8 90.3 147.3Q95.2 138.9 110.9 137.9Q121.6 131.3 136.7 134Q151.1 130.5 162.9 136.4Q178.7 136.4 185.3 144.5Q199.7 148.2 199.7 157.1Q210.3 163.7 203.9 171.9Q208.7 180.4 197 186.3Q195.3 195.2 180.3 198Q172.3 205.7 156.6 204.8Q143.7 210 130 205.6Q114.5 207.4 105.1 200.2Q89.7 198.3 86.3 189.6Q73.6 184.3 76.8 175.6Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
                <path d="M102 182 L102 224 C102 230 108 232 114 232 C120 232 126 230 126 224 L126 182 Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3" />
                <path d="M176 182 L176 224 C176 230 182 232 188 232 C194 232 200 230 200 224 L200 182 Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3" />
                <path d="M178 146Q212 162 246 146L246 154Q212 170 178 154Z" fill="#a24a1a" stroke="#2a170e" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
                <path d="M177.1 78.7Q186.9 70.8 186.6 87.4Q196 89.9 189.9 105.5Q195.2 117.3 185.5 126Q184.7 142.8 175.2 141.2Q168.7 156.5 162.9 145.3Q153.1 153.2 153.4 136.6Q144 134.1 150.1 118.5Q144.8 106.7 154.5 98Q155.3 81.2 164.8 82.8Q171.3 67.5 177.1 78.7Z" fill="#e4a352" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
                <path d="M246.9 78.7Q252.7 67.5 259.2 82.8Q268.7 81.2 269.5 98Q279.2 106.7 273.9 118.5Q280 134.1 270.6 136.6Q270.9 153.2 261.1 145.3Q255.3 156.5 248.8 141.2Q239.3 142.8 238.5 126Q228.8 117.3 234.1 105.5Q228 89.9 237.4 87.4Q237.1 70.8 246.9 78.7Z" fill="#e4a352" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
                <path d="M212 54Q223.4 48.2 231.5 57.5Q244.5 56.1 248.1 67.5Q260.7 70.7 259.1 82.4Q269.4 89.7 263 100Q269.4 110.3 259.1 117.6Q260.7 129.3 248.1 132.5Q244.5 143.9 231.5 142.5Q223.4 151.8 212 146Q200.6 151.8 192.5 142.5Q179.5 143.9 175.9 132.5Q163.3 129.3 164.9 117.6Q154.6 110.3 161 100Q154.6 89.7 164.9 82.4Q163.3 70.7 175.9 67.5Q179.5 56.1 192.5 57.5Q200.6 48.2 212 54Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
                <circle cx="181" cy="116" r="7" fill="#f9b9a6" opacity="0.85" />
                <circle cx="243" cy="116" r="7" fill="#f9b9a6" opacity="0.85" />
                <circle cx="196" cy="98" r="5" fill="#2a170e" />
                <circle cx="228" cy="98" r="5" fill="#2a170e" />
                <path d="M204.5 111.5Q212 107.2 219.5 111.5Q218.2 118.4 212 120Q205.8 118.4 204.5 111.5Z" fill="#2a170e" />
                <path d="M207.6 127.4Q212 136.6 216.4 127.4Z" fill="#e98c8c" stroke="#2a170e" strokeWidth="2.2" strokeLinejoin="round" />
              </g>
            </svg>
          </div>
        </div>

      </div>
    </section>
  );
}
