"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export function FinalCTA() {
  const [isDoorOpen, setIsDoorOpen] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const whatsappUrl = `https://wa.me/971501234567?text=${encodeURIComponent('Hello TeddyPups UAE! I am ready to meet your puppies.')}`;

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      // When the house enters the middle of the viewport, open the door!
      if (rect.top < vh * 0.75) {
        setIsDoorOpen(true);
      } else {
        setIsDoorOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="tp-home"
      ref={containerRef}
      data-pup-scene="true"
      data-tone="dark"
      className="tp-scene tp-home relative overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #2f1a10, #24130b)',
        padding: 'clamp(5rem, 9vh, 8rem) 1.5rem',
      }}
      aria-labelledby="cta-title"
    >
      <div data-pup-stop data-x="24" data-y="32" data-pose="stand" style={{ position: 'absolute', left: '24%', bottom: '8%', width: 1, height: 1, pointerEvents: 'none' }} />
      <div className="mx-auto max-w-[90rem] px-4 text-center">

        {/* Header copy */}
        <div className="tp-home__copy max-w-[65rem] mx-auto mb-6">
          <h2
            id="cta-title"
            className="font-serif font-extrabold text-[#fffdf8]"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1.05 }}
          >
            Ready to meet your<br />new best friend?
          </h2>
          <p className="tp-home__lede text-[#fffdf8]/75 text-base sm:text-lg max-w-[55ch] mx-auto mt-4 leading-relaxed">
            Bring home a healthy, happy teacup or designer puppy with expert guidance every step of the way. We help you find the right match and ensure a smooth, safe delivery across the UAE.
          </p>
        </div>

        {/* ── THE HOUSE WITH OPENING DOOR ── */}
        <div className="tp-house" onClick={() => setIsDoorOpen(p => !p)}>
          {/* Left Plant */}
          <span aria-hidden="true" className="tp-house__plant tp-house__plant--left hidden sm:block" />

          {/* Porch Lamp with Warm Glow */}
          <span aria-hidden="true" className="tp-house__lamp" />

          {/* Arched Doorway */}
          <div className="tp-house__doorway">
            {/* Puppy inside looking out */}
            <span className="tp-house__inside">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/doors/door_0.jpg"
                alt="Max, waiting inside"
                className="w-full h-full object-cover"
                style={{ objectPosition: '53% 44%' }}
              />
            </span>

            {/* The Big Swinging Wooden Door */}
            <span
              aria-hidden="true"
              className="tp-house__door cursor-pointer"
              data-closed={!isDoorOpen}
              style={{
                transform: isDoorOpen ? 'rotateY(-102deg)' : 'rotateY(0deg)',
              }}
            >
              <span className="tp-house__peep" />
              <span className="tp-house__knob" />
            </span>
          </div>

          {/* Right Plant */}
          <span aria-hidden="true" className="tp-house__plant tp-house__plant--right" />

          {/* Welcome Mat */}
          <span aria-hidden="true" className="tp-house__mat font-hand">
            welcome home
          </span>

          {/* Welcoming Mascot Puppy doing cute bow on left of door */}
          <div
            className="absolute z-20 w-36 cursor-pointer"
            style={{
              bottom: '0.4rem',
              left: 'calc(50% - clamp(14rem, 23vw, 18rem))',
            }}
          >
            <svg viewBox="0 0 300 240" className="w-full overflow-visible" aria-hidden="true">
              <ellipse cx="150" cy="230" rx="86" ry="7" fill="#000000" opacity="0.3" />
              {/* Mascot in bow pose */}
              <g transform="translate(0 6)">
                {/* Back legs */}
                <path d="M80 178 L80 220 C80 226 86 228 92 228 C98 228 104 226 104 220 L104 178 Z" fill="#e4a352" stroke="#2a170e" strokeWidth="3" />
                <path d="M154 178 L154 220 C154 226 160 228 166 228 C172 228 178 226 178 220 L178 178 Z" fill="#e4a352" stroke="#2a170e" strokeWidth="3" />
                {/* Tail wagging up */}
                <path d="M86 152C80 146 76 140 74 136" stroke="#2a170e" strokeWidth="9" strokeLinejoin="round" strokeLinecap="round" fill="none" />
                <path d="M86 152C80 146 76 140 74 136" stroke="#f2be6b" strokeWidth="4" fill="none" strokeLinecap="round" />
                <path d="M70 110Q78.1 105 80.9 113.7Q90.5 114.8 86.7 123.2Q93.4 129.9 84.7 134Q85.2 143.1 75.8 141Q70 148.3 64.2 141Q54.8 143.1 55.3 134Q46.6 129.9 53.3 123.2Q49.5 114.8 59.1 113.7Q61.9 105 70 110Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
                {/* Lower body bow stretch */}
                <path d="M76.8 175.6Q69 167.9 78.2 160.7Q76.6 151.8 90.3 147.3Q95.2 138.9 110.9 137.9Q121.6 131.3 136.7 134Q151.1 130.5 162.9 136.4Q178.7 136.4 185.3 144.5Q199.7 148.2 199.7 157.1Q210.3 163.7 203.9 171.9Q208.7 180.4 197 186.3Q195.3 195.2 180.3 198Q172.3 205.7 156.6 204.8Q143.7 210 130 205.6Q114.5 207.4 105.1 200.2Q89.7 198.3 86.3 189.6Q73.6 184.3 76.8 175.6Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
                {/* Front legs forward */}
                <path d="M102 196 L102 228 C102 232 108 234 114 234 C120 234 126 232 126 228 L126 196 Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3" />
                <path d="M176 196 L176 228 C176 232 182 234 188 234 C194 234 200 232 200 228 L200 196 Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3" />
                {/* Head tilted happily */}
                <g transform="translate(4 4) rotate(4 212 100)">
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
              </g>
            </svg>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mt-12">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold px-8 py-4 border-2 border-[#2a170e] shadow-scrapbook hover:shadow-scrapbook-lg hover:-translate-y-0.5 transition-all text-base"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Enquire on WhatsApp
          </a>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-transparent hover:bg-white/10 text-white font-bold px-8 py-4 border-2 border-white/40 hover:border-white transition-all text-base"
          >
            Visit &amp; contact
          </Link>
        </div>
      </div>
    </section>
  );
}
