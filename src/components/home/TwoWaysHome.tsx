"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export function TwoWaysHome() {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  // Scroll-driven position and angle of the airplane along the flight curve
  // Default to Korea start (x:40, y:250) for SSR — exact start of flight path
  const [planePos, setPlanePos] = useState({ x: 40, y: 250, angle: -74 });
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;

      // progress = 0 when section bottom enters screen, = 1 when user has scrolled 60% past section height
      // Plane starts at Korea (t=0) and arrives at Dubai (t=1)
      const progress = Math.max(0, Math.min(1, (vh - rect.top) / (vh + rect.height * 0.6)));

      setIsScrolling(true);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => setIsScrolling(false), 120);

      // 1. Try standard SVG getPointAtLength for exact path adherence
      if (pathRef.current) {
        try {
          const path = pathRef.current;
          const totalLen = path.getTotalLength();
          if (totalLen > 0) {
            const curLen = progress * totalLen;
            const pt = path.getPointAtLength(curLen);
            const nextPt = path.getPointAtLength(Math.min(totalLen, curLen + 3));
            const angle = Math.atan2(nextPt.y - pt.y, nextPt.x - pt.x) * (180 / Math.PI);
            setPlanePos({ x: Math.round(pt.x * 10) / 10, y: Math.round(pt.y * 10) / 10, angle: Math.round(angle * 10) / 10 });
            return;
          }
        } catch (e) {
          // Fall through to formula
        }
      }

      // 2. Analytical Cubic Bezier Formula Fallback:
      // Path: M40 250 C 170 40, 470 20, 620 168
      const t = progress;
      const p0 = [40, 250], p1 = [170, 40], p2 = [470, 20], p3 = [620, 168];
      const x = (1 - t) ** 3 * p0[0] + 3 * (1 - t) ** 2 * t * p1[0] + 3 * (1 - t) * t ** 2 * p2[0] + t ** 3 * p3[0];
      const y = (1 - t) ** 3 * p0[1] + 3 * (1 - t) ** 2 * t * p1[1] + 3 * (1 - t) * t ** 2 * p2[1] + t ** 3 * p3[1];
      const dx = 3 * (1 - t) ** 2 * (p1[0] - p0[0]) + 6 * (1 - t) * t * (p2[0] - p1[0]) + 3 * t ** 2 * (p3[0] - p2[0]);
      const dy = 3 * (1 - t) ** 2 * (p1[1] - p0[1]) + 6 * (1 - t) * t * (p2[1] - p1[1]) + 3 * t ** 2 * (p3[1] - p2[1]);
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      setPlanePos({ x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10, angle: Math.round(angle * 10) / 10 });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  return (
    <section
      id="tp-paths"
      ref={sectionRef}
      data-pup-scene="true"
      data-tone="light"
      className="tp-scene tp-paths relative overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #fbe3b4, #f7d18d)',
        padding: 'clamp(3.5rem, 8vh, 6rem) 1.5rem',
      }}
      aria-labelledby="paths-title"
    >
      <div data-pup-stop data-x="50" data-y="92" data-pose="climb" style={{ position: 'absolute', left: '50%', bottom: '7%', width: 1, height: 1, pointerEvents: 'none' }} />
      <div className="mx-auto max-w-[110rem] px-4 sm:px-8 lg:px-12">
        <h2
          id="paths-title"
          className="font-serif font-extrabold text-[#2a170e] text-center"
          style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.8rem)', lineHeight: 1.1, marginBottom: '2.5rem' }}
        >
          Two ways to meet your puppy
        </h2>

        <div className="tp-fork">
          {/* Center wooden signpost */}
          <div aria-hidden="true" className="tp-fork__post" />

          {/* Left Path: In Showroom */}
          <article className="tp-way tp-way--left" aria-labelledby="way-local">
            <h3 id="way-local" className="tp-sign tp-sign--left font-serif font-bold">
              Puppies in Dubai
            </h3>

            <div className="tp-way__scene w-full relative">
              {/* Dubai Skyline SVG */}
              <svg viewBox="0 0 300 120" className="tp-way__skyline" aria-hidden="true">
                <path
                  d="M4 116h292M20 116V78h16v38M44 116V60h18v56M70 116V84h12v32M150 116V36l4-6v-14l3-4 3 4v14l4 6v80M118 116V70l12-8v54M174 116V64l14 8v44M200 116V82h18v34M226 116V56h14v60M248 116V88h22v28"
                  fill="none"
                  stroke="#2a170e"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.25"
                />
              </svg>

              {/* Showroom Window with Puppy & Awning */}
              <figure className="tp-window">
                <span className="tp-window__glass">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/doors/door_0.jpg"
                    alt="Puppy in Dubai showroom"
                    className="w-full h-full object-cover"
                  />
                </span>
                <figcaption className="font-hand font-bold text-[#c2622b] mt-1.5 text-base">
                  In our showroom
                </figcaption>
              </figure>
            </div>

            <p className="tp-way__text text-[#5a3a28] text-base leading-relaxed mt-4 max-w-[40ch]">
              See them, love them, take them home. Come meet our locally available puppies before you decide.
            </p>

            <Link
              href="/puppies?origin=local"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#A94E20] hover:bg-[#8D3F18] text-white font-bold px-7 py-3 border-2 border-[#2a170e] shadow-scrapbook hover:shadow-scrapbook-lg hover:-translate-y-0.5 transition-all text-sm"
            >
              Meet local puppies
            </Link>
          </article>

          {/* Right Path: Imported for you */}
          <article className="tp-way tp-way--right" aria-labelledby="way-imported">
            <h3 id="way-imported" className="tp-sign tp-sign--right font-serif font-bold">
              Imported for you
            </h3>

            <div className="tp-way__scene w-full relative">
              {/* Flight Arc & SCROLL-DRIVEN Moving Airplane */}
              <div className="tp-flight">
                <svg viewBox="0 0 660 300" role="img" aria-label="Plane bringing puppy from Korea to Dubai" className="w-full h-full overflow-visible">
                  <defs>
                    <clipPath id="plane-porthole-clip">
                      <circle cx="0" cy="0" r="22" />
                    </clipPath>
                  </defs>

                  {/* Dotted Flight Route */}
                  <path
                    ref={pathRef}
                    d="M40 250 C 170 40, 470 20, 620 168"
                    className="tp-flight__route"
                  />
                  <circle cx="40" cy="250" r="7" className="tp-flight__dot" />
                  <circle cx="620" cy="168" r="7" className="tp-flight__dot" />
                  <text x="40" y="284" textAnchor="middle" className="tp-flight__label">Korea</text>
                  <text x="620" y="202" textAnchor="middle" className="tp-flight__label">Dubai</text>

                  {/* ── Scroll-driven Airplane Moving Along Curve ── */}
                  <g
                    className="tp-flight-plane"
                    transform={`translate(${planePos.x} ${planePos.y}) rotate(${planePos.angle})`}
                    style={{
                      transition: isScrolling ? 'none' : 'transform 0.12s ease-out',
                    }}
                  >
                    {/* Wings and Body */}
                    <g transform="translate(-126 -78)">
                      <path d="M28 60 L8 26 L34 26 L60 54 Z" className="tp-flight__wing" />
                      <path d="M108 112 L142 156 L172 156 L158 112 Z" className="tp-flight__wing tp-flight__wing--far" />
                      <path d="M20 80 C20 52 52 44 80 44 L168 44 C200 44 224 60 232 80 C224 100 200 112 168 112 L80 112 C52 112 20 104 20 80 Z" className="tp-flight__body" />
                      <path d="M104 44 L138 2 L168 2 L154 44 Z" className="tp-flight__wing" />
                      <path d="M206 64 C215 67 221 73 224 80" className="tp-flight__line" />
                    </g>

                    {/* Porthole window with puppy photo */}
                    <g transform="translate(10 2)">
                      <image
                        href="/images/doors/door_1.jpg"
                        x="-22"
                        y="-22"
                        width="44"
                        height="44"
                        clipPath="url(#plane-porthole-clip)"
                        preserveAspectRatio="xMidYMid slice"
                      />
                      <circle r="22" className="tp-flight__porthole" />
                    </g>
                  </g>
                </svg>
              </div>
            </div>

            <p className="tp-way__text text-[#5a3a28] text-base leading-relaxed mt-4 max-w-[40ch]">
              Exclusive Korean teacup puppies, delivered. Order from the world&apos;s most reputable breeders and let us handle the import.
            </p>

            <Link
              href="/puppies?origin=import"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#A94E20] hover:bg-[#8D3F18] text-white font-bold px-7 py-3 border-2 border-[#2a170e] shadow-scrapbook hover:shadow-scrapbook-lg hover:-translate-y-0.5 transition-all text-sm"
            >
              See imported puppies
            </Link>
          </article>

          {/* Center Mascot Puppy sitting by signpost */}
          <div className="tp-fork__teddy">
            <svg viewBox="0 0 300 240" className="w-full overflow-visible" aria-hidden="true">
              <ellipse cx="150" cy="230" rx="86" ry="7" fill="#2a170e" opacity="0.13" />
              {/* Standing Mascot Puppy SVG */}
              <g transform="translate(0 -2)">
                {/* Back legs */}
                <path d="M80 178 L80 220 C80 226 86 228 92 228 C98 228 104 226 104 220 L104 178 Z" fill="#e4a352" stroke="#2a170e" strokeWidth="3" />
                <path d="M154 178 L154 220 C154 226 160 228 166 228 C172 228 178 226 178 220 L178 178 Z" fill="#e4a352" stroke="#2a170e" strokeWidth="3" />
                {/* Tail */}
                <path d="M86 152C80 146 76 140 74 136" stroke="#2a170e" strokeWidth="9" strokeLinejoin="round" strokeLinecap="round" fill="none" />
                <path d="M86 152C80 146 76 140 74 136" stroke="#f2be6b" strokeWidth="4" fill="none" strokeLinecap="round" />
                <path d="M70 110Q78.1 105 80.9 113.7Q90.5 114.8 86.7 123.2Q93.4 129.9 84.7 134Q85.2 143.1 75.8 141Q70 148.3 64.2 141Q54.8 143.1 55.3 134Q46.6 129.9 53.3 123.2Q49.5 114.8 59.1 113.7Q61.9 105 70 110Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
                {/* Body */}
                <path d="M76.8 175.6Q69 167.9 78.2 160.7Q76.6 151.8 90.3 147.3Q95.2 138.9 110.9 137.9Q121.6 131.3 136.7 134Q151.1 130.5 162.9 136.4Q178.7 136.4 185.3 144.5Q199.7 148.2 199.7 157.1Q210.3 163.7 203.9 171.9Q208.7 180.4 197 186.3Q195.3 195.2 180.3 198Q172.3 205.7 156.6 204.8Q143.7 210 130 205.6Q114.5 207.4 105.1 200.2Q89.7 198.3 86.3 189.6Q73.6 184.3 76.8 175.6Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
                {/* Front near legs */}
                <path d="M102 182 L102 224 C102 230 108 232 114 232 C120 232 126 230 126 224 L126 182 Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3" />
                <path d="M176 182 L176 224 C176 230 182 232 188 232 C194 232 200 230 200 224 L200 182 Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3" />
                {/* Collar */}
                <path d="M178 146Q212 162 246 146L246 154Q212 170 178 154Z" fill="#a24a1a" stroke="#2a170e" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
                {/* Head */}
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
