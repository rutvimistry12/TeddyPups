"use client";

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Testimonial } from '@/lib/types';

interface HappyFamiliesPreviewProps {
  testimonials?: Testimonial[];
}

const CAPTIONS = [
  "Lulu 🐶 with her new mummy ❤️",
  "Adorable Maltipoo baby 🧸❤️",
  "My new teddy puppy 🥰🧸",
  "Our new puppies 🧸🐶",
  "Little baby went home 🥰",
  "Puppy cuddles 🐾",
  "Best day ever 💕",
  "Our happy family ❤️",
];

export function HappyFamiliesPreview({ testimonials }: HappyFamiliesPreviewProps) {
  const photos = Array.from({ length: 8 }, (_, i) => ({
    src: `/images/families/family_${i}.jpg`,
    caption: CAPTIONS[i] || `Happy family ${i + 1}`,
    rotate: [-1.5, 1.8, -2, 1.2, -1.8, 2.2, -1, 1.5][i] || 0,
  }));

  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = '1';
            (entry.target as HTMLElement).style.transform = `rotate(${
              (entry.target as HTMLElement).dataset.rotate || '0'
            }deg) translateY(0) scale(1)`;
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="tp-dusk"
      ref={sectionRef}
      data-pup-scene="true"
      data-tone="dark"
      className="tp-scene tp-dusk relative overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #502e1c, #3d2113)',
        padding: 'clamp(4.5rem, 8vh, 7rem) 1.5rem',
      }}
    >
      <div data-pup-stop data-x="34" data-y="18" data-pose="stand" style={{ position: 'absolute', left: '34%', bottom: '2%', width: 1, height: 1, pointerEvents: 'none' }} />
      <div className="mx-auto max-w-[110rem] px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="font-hand font-bold text-[#f2be6b] text-xl mb-1">
              gone home 🐾
            </div>
            <h2
              className="font-serif font-extrabold text-[#fffdf8]"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', lineHeight: 1.1 }}
            >
              Happy families &amp; puppies
            </h2>
            <p className="text-[#fffdf8]/75 text-base max-w-[50ch] mt-2.5">
              We are truly honored to see our puppies become cherished members of loving families across Dubai and the UAE.
            </p>
          </div>

          <Link
            href="/happy-families"
            className="inline-flex items-center gap-2 rounded-full bg-[#A94E20] hover:bg-[#8D3F18] text-white font-bold px-7 py-3 border-2 border-[#2a170e] shadow-scrapbook hover:shadow-scrapbook-lg hover:-translate-y-0.5 transition-all text-sm shrink-0"
          >
            See every happy family
          </Link>
        </div>

        {/* Polaroid Wall Grid — scroll-reveal with zoom-in */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 sm:gap-10 relative">
          {photos.map((p, i) => (
            <div
              key={i}
              ref={(el) => { cardRefs.current[i] = el; }}
              data-rotate={p.rotate}
              className="tp-polaroid-card relative bg-[#fffdf8] border-[2.5px] border-[#2a170e] rounded-xl p-3 pb-8 shadow-xl cursor-pointer"
              style={{
                transform: `rotate(${p.rotate}deg) translateY(32px) scale(0.92)`,
                opacity: 0,
                boxShadow: '4px 6px 0 #2a170e40',
                transition: `opacity 0.55s ease ${i * 0.07}s, transform 0.55s cubic-bezier(0.34,1.4,0.64,1) ${i * 0.07}s`,
              }}
            >
              {/* Masking tape on top */}
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-[#f2be6b]/70 shadow-xs pointer-events-none"
                style={{
                  clipPath: 'polygon(0 8%, 4% 0%, 96% 0%, 100% 12%, 96% 100%, 3% 96%)',
                  transform: `translateX(-50%) rotate(${i % 2 === 0 ? '-2deg' : '3deg'})`,
                }}
              />

              {/* Photo */}
              <div className="aspect-square w-full rounded-lg overflow-hidden border border-[#2a170e22] bg-[#fbe3b4]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.src}
                  alt={p.caption}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-108"
                />
              </div>

              {/* Handwritten caption */}
              <p className="font-hand font-bold text-base text-[#2a170e] text-center mt-3 leading-tight">
                {p.caption}
              </p>
            </div>
          ))}

          {/* Mascot Puppy Standing in front of the Polaroid Wall */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 sm:left-1/3 z-30 w-36 cursor-pointer">
            <svg viewBox="0 0 300 240" className="w-full overflow-visible" aria-hidden="true">
              <ellipse cx="150" cy="230" rx="86" ry="7" fill="#000000" opacity="0.25" />
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
