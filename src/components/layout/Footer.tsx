"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export function Footer() {
  const [inBasket, setInBasket] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  const whatsappUrl = `https://wa.me/971501234567?text=${encodeURIComponent('Hello TeddyPups UAE! I would like to enquire about your puppies.')}`;

  useEffect(() => {
    const handleScroll = () => {
      if (!footerRef.current) return;
      const rect = footerRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      // When footer is visible in the lower half of the screen, puppy settles into basket!
      if (rect.top < vh * 0.85) {
        setInBasket(true);
      } else {
        setInBasket(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer
      ref={footerRef}
      className="tp-footer relative text-[#fffdf8] overflow-hidden"
      style={{
        background: '#24130b',
        paddingTop: 'clamp(4rem, 8vh, 6rem)',
        paddingBottom: '3.5rem',
      }}
    >
      <div data-pup-stop data-x="16" data-y="38" data-pose="stand" style={{ position: 'absolute', left: '16%', bottom: '16%', width: 1, height: 1, pointerEvents: 'none' }} />
      {/* Night Sky Twinkle Stars & Moon */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 overflow-hidden">
        {/* Crescent Moon */}
        <div
          className="absolute top-10 right-16 w-14 h-14 rounded-full opacity-80"
          style={{
            boxShadow: 'inset -6px 6px 0 0 #f2be6b',
            transform: 'rotate(-20deg)',
          }}
        />

        {/* Twinkling stars */}
        {[
          { x: '12%', y: '24px', size: 14, delay: '0s' },
          { x: '28%', y: '60px', size: 10, delay: '1s' },
          { x: '45%', y: '30px', size: 12, delay: '0.5s' },
          { x: '68%', y: '80px', size: 8, delay: '1.5s' },
          { x: '82%', y: '40px', size: 14, delay: '0.8s' },
        ].map((s, idx) => (
          <div
            key={idx}
            className="absolute text-[#f2be6b] font-bold animate-pulse"
            style={{
              left: s.x,
              top: s.y,
              fontSize: `${s.size}px`,
              animationDelay: s.delay,
              animationDuration: '2.5s',
            }}
          >
            ✦
          </div>
        ))}
      </div>

      <div className="mx-auto max-w-[110rem] px-4 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-start mb-16">

          {/* Left Column: Title, Intro & Woven Basket with Snug Puppy */}
          <div className="md:col-span-5 flex flex-col items-start">
            <h2
              className="font-serif font-extrabold text-[#fffdf8] leading-none mb-4"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
            >
              Home, at last.
            </h2>
            <p className="text-[#fffdf8]/75 text-sm sm:text-base leading-relaxed max-w-[42ch] mb-8">
              TeddyPups U.A.E. is a Dubai-based brand specializing in miniature puppies, offering premium services and worldwide shipping.
            </p>

            {/* ── WOVEN BASKET WITH SNUG PUPPY ── */}
            <div
              className="tp-basket cursor-pointer"
              onClick={() => setInBasket(p => !p)}
            >
              {/* Basket Back Opening */}
              <svg viewBox="0 0 300 240" className="tp-basket__back overflow-visible">
                <ellipse cx="150" cy="145" rx="86" ry="12" className="tp-basket__hollow" />
                <path d="M64 145 A86 12 0 0 1 236 145" className="tp-basket__rim-line" />
                <path d="M64 145 A86 12 0 0 1 236 145" className="tp-basket__rim" />
              </svg>

              {/* Puppy Mascot settling into the basket smoothly */}
              <div
                className="tp-basket__pup will-change-transform"
                style={{
                  transform: inBasket ? 'translateY(18px) scale(0.95)' : 'translateY(-24px) scale(0.9)',
                  transition: 'transform 0.85s cubic-bezier(0.34, 1.4, 0.64, 1)',
                }}
              >
                <svg viewBox="0 0 300 240" className="w-full overflow-visible" aria-hidden="true">
                  <g transform="translate(0 -10)">
                    {/* Head & Paws on Rim */}
                    {/* Ears */}
                    <path d="M177.1 78.7Q186.9 70.8 186.6 87.4Q196 89.9 189.9 105.5Q195.2 117.3 185.5 126Q184.7 142.8 175.2 141.2Q168.7 156.5 162.9 145.3Q153.1 153.2 153.4 136.6Q144 134.1 150.1 118.5Q144.8 106.7 154.5 98Q155.3 81.2 164.8 82.8Q171.3 67.5 177.1 78.7Z" fill="#e4a352" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
                    <path d="M246.9 78.7Q252.7 67.5 259.2 82.8Q268.7 81.2 269.5 98Q279.2 106.7 273.9 118.5Q280 134.1 270.6 136.6Q270.9 153.2 261.1 145.3Q255.3 156.5 248.8 141.2Q239.3 142.8 238.5 126Q228.8 117.3 234.1 105.5Q228 89.9 237.4 87.4Q237.1 70.8 246.9 78.7Z" fill="#e4a352" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
                    {/* Face puff */}
                    <path d="M212 54Q223.4 48.2 231.5 57.5Q244.5 56.1 248.1 67.5Q260.7 70.7 259.1 82.4Q269.4 89.7 263 100Q269.4 110.3 259.1 117.6Q260.7 129.3 248.1 132.5Q244.5 143.9 231.5 142.5Q223.4 151.8 212 146Q200.6 151.8 192.5 142.5Q179.5 143.9 175.9 132.5Q163.3 129.3 164.9 117.6Q154.6 110.3 161 100Q154.6 89.7 164.9 82.4Q163.3 70.7 175.9 67.5Q179.5 56.1 192.5 57.5Q200.6 48.2 212 54Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
                    {/* Cheeks */}
                    <circle cx="181" cy="116" r="7" fill="#f9b9a6" opacity="0.85" />
                    <circle cx="243" cy="116" r="7" fill="#f9b9a6" opacity="0.85" />
                    {/* Big adorable eyes */}
                    <circle cx="196" cy="98" r="5.5" fill="#2a170e" />
                    <circle cx="228" cy="98" r="5.5" fill="#2a170e" />
                    <circle cx="194.5" cy="96" r="1.8" fill="#ffffff" />
                    <circle cx="226.5" cy="96" r="1.8" fill="#ffffff" />
                    {/* Nose & Mouth */}
                    <path d="M204.5 111.5Q212 107.2 219.5 111.5Q218.2 118.4 212 120Q205.8 118.4 204.5 111.5Z" fill="#2a170e" />
                    <path d="M212 120V124.5M212 124.5Q207.2 129.6 202.8 125.2M212 124.5Q216.8 129.6 221.2 125.2" stroke="#2a170e" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" fill="none" />
                    <path d="M207.6 127.4Q212 136.6 216.4 127.4Z" fill="#e98c8c" stroke="#2a170e" strokeWidth="2.2" strokeLinejoin="round" />

                    {/* Cute Front Paws resting over the basket rim */}
                    <g transform="translate(142, 142)">
                      <ellipse cx="44" cy="4" rx="10" ry="7" fill="#f2be6b" stroke="#2a170e" strokeWidth="2.8" />
                      <line x1="41" y1="2" x2="41" y2="8" stroke="#2a170e" strokeWidth="1.8" />
                      <line x1="47" y1="2" x2="47" y2="8" stroke="#2a170e" strokeWidth="1.8" />

                      <ellipse cx="78" cy="4" rx="10" ry="7" fill="#f2be6b" stroke="#2a170e" strokeWidth="2.8" />
                      <line x1="75" y1="2" x2="75" y2="8" stroke="#2a170e" strokeWidth="1.8" />
                      <line x1="81" y1="2" x2="81" y2="8" stroke="#2a170e" strokeWidth="1.8" />
                    </g>
                  </g>
                </svg>
              </div>

              {/* Basket Woven Front Body */}
              <svg viewBox="0 0 300 240" className="tp-basket__front overflow-visible pointer-events-none" style={{ zIndex: 25 }}>
                <path
                  d="M64 145 C64 195 86 218 150 218 C214 218 236 195 236 145 Z"
                  className="tp-basket__body"
                />
                {/* Woven criss-cross texture */}
                <path
                  d="M80 152 Q150 180 220 152 M90 170 Q150 196 210 170 M105 188 Q150 208 195 188"
                  className="tp-basket__weave"
                />
                <path
                  d="M100 148 L114 214 M125 148 L132 217 M150 148 L150 218 M175 148 L168 217 M200 148 L186 214"
                  className="tp-basket__weave tp-basket__weave--stakes"
                />
                {/* Front Rim */}
                <path d="M64 145 A86 12 0 0 0 236 145" className="tp-basket__rim-line" />
                <path d="M64 145 A86 12 0 0 0 236 145" className="tp-basket__rim" />
              </svg>
            </div>
          </div>

          {/* Right Columns: Explore Links & Say Hello */}
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-10">
            {/* Explore Links */}
            <div>
              <h3 className="font-serif font-bold text-[#f2be6b] text-lg mb-4">
                Explore
              </h3>
              <ul className="flex flex-col gap-2.5 text-sm text-[#fffdf8]/75">
                {[
                  ['Available puppies', '/puppies'],
                  ['Gone home', '/happy-families'],
                  ['Happy families', '/happy-families'],
                  ['How it works', '/how-it-works'],
                  ['Delivery & collection', '/how-it-works'],
                  ['FAQ', '/faq'],
                  ['Visit & contact', '/contact'],
                ].map(([label, href]) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="hover:text-white transition-colors block py-0.5"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Say Hello */}
            <div>
              <h3 className="font-serif font-bold text-[#f2be6b] text-lg mb-4">
                Say hello
              </h3>
              <div className="flex flex-col gap-3 text-sm text-[#fffdf8]/75 mb-6">
                <div>WhatsApp +971 50 000 0000</div>
                <div>info@instabizweb.com</div>
                <div>Downtown Dubai, United Arab Emirates</div>
              </div>

              {/* Social buttons */}
              <div className="flex flex-wrap gap-2.5">
                {['Instagram', 'TikTok', 'Facebook'].map((plat) => (
                  <span
                    key={plat}
                    className="border border-white/20 rounded-full px-4 py-1.5 text-xs text-white/80 hover:border-white transition-colors cursor-pointer"
                  >
                    {plat}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Line */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logo.png" alt="TeddyPups" className="w-5 h-5 rounded-full" />
            <span>© 2026 TeddyPups U.A.E.</span>
          </div>
          <span className="font-hand text-base text-[#f2be6b]/80">
            every puppy is family
          </span>
        </div>
      </div>
    </footer>
  );
}
