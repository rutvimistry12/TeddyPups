"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// =====================================================================
// EXACT LIVE SITE RECREATION: InteractiveHeroScallop
// Based on https://puppy.instabizweb.com/ direct HTML/CSS extraction
// 6-seat lineup, exact scallop quilt, peeking Teddy SVG (from live site)
// Hover = duck DOWN, leave = spring UP. Pointer = fingerprint cursor.
// =====================================================================

const QUILT_COLOR = '#fbe3b4'; // --color-honey-soft / quilt bg

// Exact seat data from live site
const SEATS = [
  { x: '9%',   w: '8.6rem',  peek: 0.62, tilt: '-5deg',  i: 0, img: '/images/puppies/hero_seat_0.webp', alt: 'Max, male Maltipoo puppy',              name: 'Max' },
  { x: '22.5%',w: '10.4rem', peek: 0.80, tilt: '3deg',   i: 1, img: '/images/puppies/hero_seat_1.jpg',  alt: 'Female Korean Teacup Maltipoo puppy',   name: 'Korean Maltipoo' },
  { x: '35%',  w: '9.2rem',  peek: 0.70, tilt: '-2deg',  i: 2, img: '/images/puppies/hero_seat_2.jpg',  alt: 'Female Korean Teacup Poodle puppy',     name: 'Korean Poodle' },
  { x: '65%',  w: '9.4rem',  peek: 0.74, tilt: '3deg',   i: 3, img: '/images/puppies/hero_seat_3.jpg',  alt: 'Male Maltipoo & Cavapoo puppy',         name: 'Maltipoo' },
  { x: '77.5%',w: '10.6rem', peek: 0.82, tilt: '-3deg',  i: 4, img: '/images/puppies/hero_seat_4.jpg',  alt: 'Toy Poodle puppy',                      name: 'Toy Poodle' },
  { x: '91%',  w: '8.4rem',  peek: 0.60, tilt: '4deg',   i: 5, img: '/images/puppies/hero_seat_5.jpg',  alt: 'Female Maltipoo puppy',                 name: 'Maltipoo' },
];

// Exact pup-stop Teddy SVG (peek pose) from live site
function TeddySVG({ pupilOffset, isBlinking }: { pupilOffset: { x: number; y: number }; isBlinking: boolean }) {
  return (
    <svg
      aria-label="Teddy, the TeddyPups puppy, peeking over the quilt"
      focusable="false"
      role="img"
      style={{ overflow: 'visible', display: 'block', width: '100%' }}
      viewBox="0 0 300 240"
    >
      <g>
        {/* Shadow */}
        <ellipse cx="150" cy="230" fill="#2a170e" opacity="0" rx="92" ry="7"
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />

        {/* Body (opacity=0 for peek pose - only head+ledge visible) */}
        <g opacity="0">
          <path d="M76.8 175.6Q69.0 167.9 78.2 160.7Q76.6 151.8 90.3 147.3Q95.2 138.9 110.9 137.9Q121.6 131.3 136.7 134.0Q151.1 130.5 162.9 136.4Q178.7 136.4 185.3 144.5Q199.7 148.2 199.7 157.1Q210.3 163.7 203.9 171.9Q208.7 180.4 197.0 186.3Q195.3 195.2 180.3 198.0Q172.3 205.7 156.6 204.8Q143.7 210.0 130.0 205.6Q114.5 207.4 105.1 200.2Q89.7 198.3 86.3 189.6Q73.6 184.3 76.8 175.6Z" fill="#f2be6b" stroke="#2a170e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.4" />
        </g>

        {/* Head */}
        <g transform="translate(0 4) rotate(0 212 100)">
          {/* Collar */}
          <path d="M178 146 Q212 162 246 146 L246 154 Q212 170 178 154 Z" fill="#a24a1a" stroke="#2a170e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
          {/* Heart tag */}
          <path d="M212 160 C212 156 206 155 206 159.4 C206 163 212 166.6 212 168.4 C212 166.6 218 163 218 159.4 C218 155 212 156 212 160 Z" fill="#fbe3b4" stroke="#2a170e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" />
          {/* Left ear */}
          <path d="M177.1 78.7Q186.9 70.8 186.6 87.4Q196.0 89.9 189.9 105.5Q195.2 117.3 185.5 126.0Q184.7 142.8 175.2 141.2Q168.7 156.5 162.9 145.3Q153.1 153.2 153.4 136.6Q144.0 134.1 150.1 118.5Q144.8 106.7 154.5 98.0Q155.3 81.2 164.8 82.8Q171.3 67.5 177.1 78.7Z"
            fill="#e4a352" stroke="#2a170e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.4"
            transform="rotate(-6 174 82)" />
          {/* Right ear */}
          <path d="M246.9 78.7Q252.7 67.5 259.2 82.8Q268.7 81.2 269.5 98.0Q279.2 106.7 273.9 118.5Q280.0 134.1 270.6 136.6Q270.9 153.2 261.1 145.3Q255.3 156.5 248.8 141.2Q239.3 142.8 238.5 126.0Q228.8 117.3 234.1 105.5Q228.0 89.9 237.4 87.4Q237.1 70.8 246.9 78.7Z"
            fill="#e4a352" stroke="#2a170e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.4"
            transform="rotate(6 250 82)" />
          {/* Head fur puff */}
          <path d="M212.0 54.0Q223.4 48.2 231.5 57.5Q244.5 56.1 248.1 67.5Q260.7 70.7 259.1 82.4Q269.4 89.7 263.0 100.0Q269.4 110.3 259.1 117.6Q260.7 129.3 248.1 132.5Q244.5 143.9 231.5 142.5Q223.4 151.8 212.0 146.0Q200.6 151.8 192.5 142.5Q179.5 143.9 175.9 132.5Q163.3 129.3 164.9 117.6Q154.6 110.3 161.0 100.0Q154.6 89.7 164.9 82.4Q163.3 70.7 175.9 67.5Q179.5 56.1 192.5 57.5Q200.6 48.2 212.0 54.0Z"
            fill="#f2be6b" stroke="#2a170e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.4" />
          {/* Top puff */}
          <path d="M195.0 52.0Q190.7 45.8 200.0 43.5Q203.2 36.9 212.0 40.0Q220.8 36.9 224.0 43.5Q233.3 45.8 229.0 52.0Q233.3 58.2 224.0 60.5Q220.8 67.1 212.0 64.0Q203.2 67.1 200.0 60.5Q190.7 58.2 195.0 52.0Z"
            fill="#f2be6b" stroke="#2a170e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
          {/* Face */}
          <path d="M188 120 C188 106 200 100 212 100 C224 100 236 106 236 120 C236 133 225 140 212 140 C199 140 188 133 188 120 Z" fill="#fbe3b4" />
          {/* Blush */}
          <circle cx="181" cy="116" fill="#f9b9a6" opacity="0.85" r="7" />
          <circle cx="243" cy="116" fill="#f9b9a6" opacity="0.85" r="7" />
          {/* Eyes */}
          {isBlinking ? (
            <>
              <path d="M187 98 Q194 92 201 98" stroke="#2a170e" strokeWidth="3.4" strokeLinecap="round" fill="none" />
              <path d="M223 98 Q230 92 237 98" stroke="#2a170e" strokeWidth="3.4" strokeLinecap="round" fill="none" />
            </>
          ) : (
            <>
              <ellipse cx={194 + pupilOffset.x} cy={98 + pupilOffset.y} fill="#2a170e" rx="7.4" ry="8.6" />
              <ellipse cx={230 + pupilOffset.x} cy={98 + pupilOffset.y} fill="#2a170e" rx="7.4" ry="8.6" />
              <circle cx={196.6 + pupilOffset.x} cy={94.6 + pupilOffset.y} fill="#fff" r="2.7" />
              <circle cx={232.6 + pupilOffset.x} cy={94.6 + pupilOffset.y} fill="#fff" r="2.7" />
              <circle cx={192 + pupilOffset.x * 0.6} cy={101.2 + pupilOffset.y * 0.6} fill="#fff" r="1.2" />
              <circle cx={228 + pupilOffset.x * 0.6} cy={101.2 + pupilOffset.y * 0.6} fill="#fff" r="1.2" />
            </>
          )}
          {/* Nose */}
          <path d="M204.5 111.5 Q212 107.2 219.5 111.5 Q218.2 118.4 212 120 Q205.8 118.4 204.5 111.5 Z" fill="#2a170e" />
          {/* Mouth */}
          <path d="M212 120 V124.5 M212 124.5 Q207.2 129.6 202.8 125.2 M212 124.5 Q216.8 129.6 221.2 125.2" fill="none" stroke="#2a170e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
          {/* Tongue */}
          <path d="M207.6 127.4 Q212 136.6 216.4 127.4 Z" fill="#e98c8c" stroke="#2a170e" strokeLinejoin="round" strokeWidth="2.2" />
        </g>

        {/* Ledge / paws peeking over quilt */}
        <g opacity="1">
          <path d="M175 159 C175 148 181 142 190 142 C199 142 205 148 205 159 Z M219 159 C219 148 225 142 234 142 C243 142 249 148 249 159 Z"
            fill="#f2be6b" stroke="#2a170e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.4" />
          <path d="M186 153 v-4.5 M194 153 v-4.5 M230 153 v-4.5 M238 153 v-4.5"
            fill="none" stroke="#2a170e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" />
        </g>
      </g>
    </svg>
  );
}

export function InteractiveHeroScallop() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);

  // For each seat: 'idle' | 'duck' | 'pop'
  const [seatStates, setSeatStates] = useState<{ [i: number]: string }>({});
  const [hoveredSeat, setHoveredSeat] = useState<number | null>(null);
  const [activeBubble, setActiveBubble] = useState<{ i: number; name: string } | null>({ i: 4, name: 'Toy Poodle' });
  const [teddyBubble, setTeddyBubble] = useState('hm?');
  const [showTeddyBubble, setShowTeddyBubble] = useState(true);
  const [isScrolledIntoMeet, setIsScrolledIntoMeet] = useState(false);
  const teddyRef = useRef<HTMLDivElement>(null);

  // Detect when page scrolls down into Meet the Pups to pass the baton to the walking dog
  useEffect(() => {
    const handleScroll = () => {
      const meetEl = document.getElementById('meet-the-pups');
      if (meetEl) {
        const rect = meetEl.getBoundingClientRect();
        // Hide peeking teddy when Meet section starts pinning at top
        setIsScrolledIntoMeet(rect.top <= 120);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Rotating bubble over seats
  useEffect(() => {
    const names = SEATS.map(s => ({ i: s.i, name: s.name }));
    let idx = 1;
    const interval = setInterval(() => {
      setActiveBubble(names[idx % names.length]);
      idx++;
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  // Teddy speech bubble cycle
  useEffect(() => {
    const msgs = ['hm?', 'woof! 🐾', 'snuggle?', 'adopt me! ✨', 'hi! 💖'];
    let t = 0;
    const interval = setInterval(() => {
      setShowTeddyBubble(false);
      setTimeout(() => {
        t = (t + 1) % msgs.length;
        setTeddyBubble(msgs[t]);
        setShowTeddyBubble(true);
      }, 400);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Blinking
  useEffect(() => {
    const interval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  // Mouse tracking for pupil & duck/pop
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!teddyRef.current) return;
      const tRect = teddyRef.current.getBoundingClientRect();
      const cx = tRect.left + tRect.width / 2;
      const cy = tRect.top + tRect.height * 0.42;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const angle = Math.atan2(dy, dx);
      const dist = Math.min(Math.hypot(dx, dy) / 80, 1) * 4.5;
      setPupilOffset({ x: Math.cos(angle) * dist, y: Math.sin(angle) * dist });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const handleSeatEnter = (i: number) => {
    setHoveredSeat(i);
    setSeatStates(prev => ({ ...prev, [i]: 'duck' }));
  };

  const handleSeatLeave = (i: number) => {
    setHoveredSeat(null);
    setSeatStates(prev => ({ ...prev, [i]: 'pop' }));
    setTimeout(() => setSeatStates(prev => ({ ...prev, [i]: 'idle' })), 600);
  };

  const getSeatTransform = (i: number) => {
    const state = seatStates[i];
    if (state === 'duck') return 'translateY(108%) scaleX(0.92)';
    if (state === 'pop') return 'translateY(0%) scale(1.04)';
    return 'translateY(0%) scale(1)';
  };

  const getSeatTransition = (i: number) => {
    const state = seatStates[i];
    if (state === 'duck') return 'translate 0.34s cubic-bezier(0.42,0,0.58,1), scale 0.34s cubic-bezier(0.42,0,0.58,1), opacity 0.34s ease-in';
    if (state === 'pop') return 'translate 0.58s cubic-bezier(0.34,1.56,0.64,1), scale 0.58s cubic-bezier(0.34,1.56,0.64,1)';
    return 'translate 0.6s cubic-bezier(0.34,1.56,0.64,1), scale 0.6s cubic-bezier(0.34,1.56,0.64,1)';
  };

  return (
    <div
      ref={containerRef}
      className="tp-hero-stage relative w-full overflow-hidden select-none"
      style={{ cursor: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\' viewBox=\'0 0 64 64\'%3E%3Cpath fill=\'%232a170e\' d=\'M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z\'/%3E%3C/svg%3E") 16 16, pointer' }}
    >
      {/* Stage: relative positioning context, holds lineup + quilt + teddy */}
      <div className="relative w-full" style={{ minHeight: 'clamp(14rem, 38vh, 25rem)' }}>

        {/* ===== PUPPY LINEUP ===== */}
        {SEATS.map((seat, idx) => {
          const h0 = `calc(${seat.w} * 1.25)`;
          const state = seatStates[idx] ?? 'idle';
          const isHovered = hoveredSeat === idx;

          return (
            <div
              key={seat.i}
              className="tp-seat"
              style={{
                '--x': seat.x,
                '--w': seat.w,
                '--peek': seat.peek,
                '--tilt': seat.tilt,
                '--h0': h0,
              } as React.CSSProperties}
            >
              {/* Breed name bubble - shows on hover */}
              {isHovered && (
                <div className="tp-bubble absolute z-40 pointer-events-none"
                  style={{
                    bottom: 'calc(100% + 0.5rem)',
                    left: '50%',
                    translate: '-50% 0',
                    background: '#fffdf8',
                    border: '2px solid #2a170e',
                    borderRadius: '999px',
                    padding: '0.15rem 0.75rem',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                    color: '#2a170e',
                  }}>
                  {seat.name}
                </div>
              )}

              {/* Rotating breed bubble (not on hover) */}
              {activeBubble?.i === seat.i && !isHovered && (
                <div
                  className="tp-bubble absolute z-40 pointer-events-none"
                  style={{
                    bottom: 'calc(100% + 0.5rem)',
                    left: '50%',
                    translate: '-50% 0',
                    background: '#fffdf8',
                    border: '2px solid #2a170e',
                    borderRadius: '999px',
                    padding: '0.15rem 0.75rem',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                    color: '#2a170e',
                  }}>
                  {seat.name}
                </div>
              )}

              <div
                className="tp-seat-wrap"
                style={{ position: 'relative', height: h0 }}
                onPointerEnter={(event) => {
                  if (event.pointerType !== 'touch') handleSeatEnter(idx);
                }}
                onPointerLeave={(event) => {
                  if (event.pointerType !== 'touch') handleSeatLeave(idx);
                }}
                onPointerDown={(event) => {
                  if (event.pointerType === 'touch') handleSeatEnter(idx);
                }}
                onPointerUp={(event) => {
                  if (event.pointerType === 'touch') handleSeatLeave(idx);
                }}
                onFocus={() => handleSeatEnter(idx)}
                onBlur={() => handleSeatLeave(idx)}
                role="button"
                tabIndex={0}
                aria-label={`Meet ${seat.name}`}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    handleSeatEnter(idx);
                    setTimeout(() => handleSeatLeave(idx), 900);
                  }
                }}
              >
                <div
                  className="tp-seat-photo"
                  data-state={state !== 'idle' ? state : undefined}
                  style={{ height: h0 }}
                >
                  <Image src={seat.img} alt={seat.alt} width={640} height={480} sizes="(max-width: 640px) 34vw, 16vw" />
                </div>
              </div>
            </div>
          );
        })}

        {/* ===== TEDDY MASCOT (peeking over quilt in yellow circle) ===== */}
        <div
          ref={teddyRef}
          className="tp-teddy-wrap"
          style={{
            opacity: isScrolledIntoMeet ? 0 : 1,
            pointerEvents: isScrolledIntoMeet ? 'none' : 'auto',
            transition: 'opacity 0.25s ease-out, transform 0.4s cubic-bezier(0.34,1.56,0.64,1)',
          }}
          onClick={() => {
            setShowTeddyBubble(true);
            setTeddyBubble('adopt me! ✨');
            setTimeout(() => {
              setTeddyBubble('hm?');
            }, 2000);
          }}
        >
          {/* Speech bubble */}
          {showTeddyBubble && (
            <div
              className="tp-bubble absolute pointer-events-none"
              style={{
                bottom: 'calc(60% + 0.5rem)',
                left: '110%',
                background: '#fffdf8',
                border: '2px solid #2a170e',
                borderRadius: '1rem',
                padding: '0.25rem 0.75rem',
                fontSize: '0.85rem',
                fontWeight: 700,
                whiteSpace: 'nowrap',
                color: '#2a170e',
                zIndex: 50,
              }}
            >
              {teddyBubble}
              <div style={{
                position: 'absolute',
                bottom: '0.4rem',
                left: '-0.5rem',
                width: '0.6rem',
                height: '0.6rem',
                background: '#fffdf8',
                border: '2px solid #2a170e',
                borderTop: 'none',
                borderRight: 'none',
                transform: 'rotate(45deg)',
              }} />
            </div>
          )}

          <TeddySVG pupilOffset={pupilOffset} isBlinking={isBlinking} />
        </div>

        {/* ===== EXACT SCALLOPED QUILT EDGE + QUILT (from live site) ===== */}
        <div className="tp-quilt" aria-hidden="true">
          {/* Scallop SVG edge sitting on top */}
          <svg
            className="tp-scallop-edge"
            height="40"
            preserveAspectRatio="none"
            width="100%"
            aria-hidden="true"
          >
            <defs>
              <pattern height="40" id="tp-scallop-hero" patternUnits="userSpaceOnUse" width="76">
                {/* Filled scallop shape */}
                <path d={`M0 40V27A38 25 0 0 1 76 27V40Z`} style={{ fill: QUILT_COLOR }} />
                {/* Outer arc stroke */}
                <path d="M0 27A38 25 0 0 1 76 27" fill="none" stroke="#2a170e" strokeWidth="3" />
                {/* Inner stitching dashes */}
                <path d="M11 33A27 19 0 0 1 65 33" fill="none" opacity=".42" stroke="#2a170e" strokeDasharray="3.5 5.5" strokeLinecap="round" strokeWidth="1.6" />
              </pattern>
            </defs>
            <rect fill="url(#tp-scallop-hero)" height="40" width="100%" />
          </svg>
        </div>

      </div>
    </div>
  );
}
