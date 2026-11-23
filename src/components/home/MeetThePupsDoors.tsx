"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { Video, ArrowRight } from 'lucide-react';

interface DoorPup {
  id: string;
  name: string;
  breedDisplay: string;
  details: string;
  imageUrl: string;
  videoBadge: boolean;
  slug: string;
  doorColor: string;
  doorShadow: string;
}

export function MeetThePupsDoors({ puppies = [] }: { puppies?: any[] }) {
  // All 15 authentic puppies + photos extracted directly from puppy.instabizweb.com
  const doorsData = useMemo<DoorPup[]>(() => [
    { id: 'door-1',  name: 'Max',                      breedDisplay: 'Max',                      details: 'Maltipoo, boy, 3 months, with video',                   imageUrl: '/images/doors/door_0.jpg',   videoBadge: true,  slug: 'maltipoo-max-male',           doorColor: '#a24a1a', doorShadow: '#6b2a0b' },
    { id: 'door-2',  name: 'Korean Teacup Maltipoo',   breedDisplay: 'Korean Teacup Maltipoo',   details: 'girl, 2 months, with video',                           imageUrl: '/images/doors/door_1.jpg',  videoBadge: true,  slug: 'korean-teacup-maltipoo-female', doorColor: '#5a3a28', doorShadow: '#382216' },
    { id: 'door-3',  name: 'Korean Teacup Poodle',     breedDisplay: 'Korean Teacup Poodle',     details: 'girl, 2 months',                                       imageUrl: '/images/doors/door_2.jpg',  videoBadge: false, slug: 'korean-teacup-poodle-female', doorColor: '#d4893f', doorShadow: '#9e581f' },
    { id: 'door-4',  name: 'Maltipoo & Cavapoo',       breedDisplay: 'Maltipoo & Cavapoo',       details: 'boy, 3 months Maltipoo & 2 months Cavapoo, with video', imageUrl: '/images/doors/door_3.jpg',  videoBadge: true,  slug: 'maltipoo-cavapoo-male',       doorColor: '#b8644a', doorShadow: '#7a3622' },
    { id: 'door-5',  name: 'Toy Poodle',               breedDisplay: 'Toy Poodle',               details: 'boy & girl, 2 months',                                 imageUrl: '/images/doors/door_4.jpg',  videoBadge: false, slug: 'toy-poodle-male-female',      doorColor: '#7a4a2e', doorShadow: '#4a2514' },
    { id: 'door-6',  name: 'Maltipoo',                 breedDisplay: 'Maltipoo',                 details: 'girl, 3 months, with video',                           imageUrl: '/images/doors/door_5.jpg',  videoBadge: true,  slug: 'maltipoo-female-2',           doorColor: '#a24a1a', doorShadow: '#6b2a0b' },
    { id: 'door-7',  name: 'Pomeranian',               breedDisplay: 'Pomeranian',               details: 'girl, 3 months',                                       imageUrl: '/images/doors/door_6.jpg',  videoBadge: false, slug: 'pomeranian-female',           doorColor: '#5a3a28', doorShadow: '#382216' },
    { id: 'door-8',  name: 'Copper',                   breedDisplay: 'Copper',                   details: 'Cavapoo, boy, 2 months',                               imageUrl: '/images/doors/door_7.jpg',  videoBadge: false, slug: 'copper-male',                 doorColor: '#d4893f', doorShadow: '#9e581f' },
    { id: 'door-9',  name: 'Shih Tzu',                 breedDisplay: 'Shih Tzu',                 details: 'girl, 2 months',                                       imageUrl: '/images/doors/door_8.jpg',  videoBadge: false, slug: 'shitzu-female',               doorColor: '#b8644a', doorShadow: '#7a3622' },
    { id: 'door-10', name: 'Shih Tzu',                 breedDisplay: 'Shih Tzu',                 details: 'boy, 2 months',                                        imageUrl: '/images/doors/door_9.jpg', videoBadge: false, slug: 'shitzu-male',                 doorColor: '#7a4a2e', doorShadow: '#4a2514' },
    { id: 'door-11', name: 'Maltipoo',                 breedDisplay: 'Maltipoo',                 details: 'girl, 2.5 months',                                     imageUrl: '/images/doors/door_10.jpg', videoBadge: false, slug: 'maltipoo-female-1',           doorColor: '#a24a1a', doorShadow: '#6b2a0b' },
    { id: 'door-12', name: 'Maltipoo',                 breedDisplay: 'Maltipoo',                 details: 'girl, 2 months',                                       imageUrl: '/images/doors/door_11.jpg', videoBadge: false, slug: 'maltipoo-female',             doorColor: '#5a3a28', doorShadow: '#382216' },
    { id: 'door-13', name: 'Korean Teacup Pomeranian', breedDisplay: 'Korean Teacup Pomeranian', details: 'girl, 2 months',                                       imageUrl: '/images/doors/door_12.jpg', videoBadge: false, slug: 'korean-teacup-pomeranian-1',  doorColor: '#d4893f', doorShadow: '#9e581f' },
    { id: 'door-14', name: 'Korean Teacup Pomeranian', breedDisplay: 'Korean Teacup Pomeranian', details: 'girl, 2 months',                                       imageUrl: '/images/doors/door_13.jpg', videoBadge: false, slug: 'korean-teacup-pomeranian',    doorColor: '#b8644a', doorShadow: '#7a3622' },
    { id: 'door-15', name: 'Korean Teacup Pomeranian', breedDisplay: 'Korean Teacup Pomeranian', details: 'boy, 2 months',                                        imageUrl: '/images/doors/door_14.jpg', videoBadge: false, slug: 'korean-teacup-pomeranian-male', doorColor: '#7a4a2e', doorShadow: '#4a2514' },
  ], []);

  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Track offset for horizontal scroll-driven treadmill
  const [scrollProgress, setScrollProgress] = useState(0);
  const [trackOffset, setTrackOffset] = useState(0);
  const [isWalking, setIsWalking] = useState(false);
  const [direction, setDirection] = useState<'right' | 'left'>('right');
  const [bubbleText, setBubbleText] = useState<string | null>(null);
  const [paws, setPaws] = useState<{ id: number; x: number; rot: number }[]>([]);

  // Door open states — driven by scroll position
  const [openDoors, setOpenDoors] = useState<{ [k: string]: boolean }>({ 'door-1': true });

  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pawCounter = useRef(0);
  const manualOverrides = useRef<{ [k: string]: boolean }>({});

  useEffect(() => {
        const handleScroll = () => {
      try {
        if (!sectionRef.current || !trackRef.current) return;

        const rect = sectionRef.current.getBoundingClientRect();
        const vh = window.innerHeight;
        const totalScrollable = sectionRef.current.offsetHeight - vh;
        if (totalScrollable <= 0) return;

        const rawProgress = -rect.top / totalScrollable;
        const progress = Math.max(0, Math.min(1, rawProgress));
        setScrollProgress(progress);

        // Direction detection
        const currentY = window.scrollY;
        const isDown = currentY >= lastScrollY.current;
        setDirection(isDown ? 'right' : 'left');
        lastScrollY.current = currentY;

        // Active walking trot while user scrolls
        setIsWalking(true);
        if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        scrollTimeout.current = setTimeout(() => setIsWalking(false), 180);

        // Treadmill track moves horizontally once dog steps onto runner (progress >= 0.06)
        const trackEl = trackRef.current;
        const totalTrackWidth = trackEl.scrollWidth;
        const viewportW = window.innerWidth;
        const maxTranslate = Math.max(0, totalTrackWidth - viewportW * 0.72);
        
        const treadmillProgress = Math.max(0, (progress - 0.05) / 0.95);
        const newOffset = treadmillProgress * maxTranslate;
        setTrackOffset(newOffset);

        // Door opening: exactly like live site, each door opens when puppy is near it,
        // and closes as the puppy walks away!
        const dogX = Math.max(100, viewportW * 0.14);
        setOpenDoors((prev) => {
          const next = { ...prev };
          let changed = false;
          const doorItems = trackEl.querySelectorAll<HTMLElement>('.tp-door-item');
          doorItems.forEach((el, i) => {
            const door = doorsData[i];
            if (!door) return;
            if (manualOverrides.current[door.id] !== undefined) {
              if (next[door.id] !== manualOverrides.current[door.id]) {
                next[door.id] = manualOverrides.current[door.id];
                changed = true;
              }
              return;
            }
            const doorRect = el.getBoundingClientRect();
            const doorCenter = doorRect.left + doorRect.width / 2;
            
            // Only open if puppy is in front of this door!
            // When progress < 0.06, Door 1 is open by default
            let shouldOpen = false;
            if (progress < 0.06) {
              shouldOpen = (i === 0);
            } else {
              const dist = Math.abs(doorCenter - dogX);
              shouldOpen = dist < doorRect.width * 0.65;
            }

            if (next[door.id] !== shouldOpen) {
              next[door.id] = shouldOpen;
              changed = true;
            }
          });
          return changed ? next : prev;
        });

        // Occasional paw print near dog position on floor
        if (progress >= 0.06 && Math.random() < 0.25) {
          const id = pawCounter.current++;
          const rot = isDown ? Math.random() * 20 - 10 : 180 + Math.random() * 20 - 10;
          const dogViewX = Math.max(100, window.innerWidth * 0.14);
          setPaws((prev) => [...prev.slice(-10), { id, x: dogViewX + (Math.random() * 30 - 15), rot }]);
        }
      } catch (e) {
        // Safe failover
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, [doorsData]);

  const toggleDoor = (id: string) => {
    setOpenDoors((prev) => {
      const next = !prev[id];
      manualOverrides.current[id] = next;
      return { ...prev, [id]: next };
    });
  };

  const scaleX = direction === 'left' ? -1 : 1;
  const isAtHeader = scrollProgress < 0.05;

  // Exact Pristine Dog SVG Component
  const renderDogSVG = (walking: boolean, customScaleX: number = 1) => (
    <svg
      viewBox="0 0 300 240"
      className={walking ? 'tp-runner-walking' : ''}
      style={{ overflow: 'visible', display: 'block', width: '100%', transform: `scaleX(${customScaleX})` }}
      aria-hidden="true"
    >
      <ellipse cx="150" cy="230" rx="86" ry="7" fill="#2a170e" opacity="0.13" />
      <g className="tp-body-group">
        {/* Back front leg */}
        <g className="tp-leg-bf" style={{ transformOrigin: '94px 192px' }}>
          <g transform="translate(94 192)">
            <path d="M-14-14C-14 4-12 18-12 27C-12 34-7 36 0 36C9 36 13 33 13 27C13 18 14 4 14-14Z" fill="#e4a352"/>
            <path d="M-14-14C-14 4-12 18-12 27C-12 34-7 36 0 36C9 36 13 33 13 27C13 18 14 4 14-14" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" fill="none"/>
            <path d="M-3.5 29v5M4.5 29v5" stroke="#2a170e" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" fill="none"/>
          </g>
        </g>
        {/* Front front leg */}
        <g className="tp-leg-ff" style={{ transformOrigin: '168px 192px' }}>
          <g transform="translate(168 192)">
            <path d="M-11-14C-11 4-12 18-12 27C-12 34-7 36 0 36C9 36 13 33 13 27C13 18 11 4 11-14Z" fill="#e4a352"/>
            <path d="M-11-14C-11 4-12 18-12 27C-12 34-7 36 0 36C9 36 13 33 13 27C13 18 11 4 11-14" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" fill="none"/>
            <path d="M-3.5 29v5M4.5 29v5" stroke="#2a170e" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" fill="none"/>
          </g>
        </g>
        {/* Tail */}
        <g className="tp-tail" style={{ transformOrigin: '84px 150px' }}>
          <path d="M86 152C80 146 76 140 74 136" stroke="#2a170e" strokeWidth="9" strokeLinejoin="round" strokeLinecap="round" fill="none"/>
          <path d="M86 152C80 146 76 140 74 136" stroke="#f2be6b" strokeWidth="4" fill="none" strokeLinecap="round"/>
          <path d="M70 110Q78.1 105 80.9 113.7Q90.5 114.8 86.7 123.2Q93.4 129.9 84.7 134Q85.2 143.1 75.8 141Q70 148.3 64.2 141Q54.8 143.1 55.3 134Q46.6 129.9 53.3 123.2Q49.5 114.8 59.1 113.7Q61.9 105 70 110Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round"/>
        </g>
        {/* Back near leg */}
        <g className="tp-leg-bn" style={{ transformOrigin: '110px 194px' }}>
          <g transform="translate(110 194)">
            <path d="M-15-14C-15 4-12 16-12 25C-12 32-7 34 0 34C9 34 13 31 13 25C13 16 15 4 15-14Z" fill="#f2be6b"/>
            <path d="M-15-14C-15 4-12 16-12 25C-12 32-7 34 0 34C9 34 13 31 13 25C13 16 15 4 15-14" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" fill="none"/>
            <path d="M-3.5 27v5M4.5 27v5" stroke="#2a170e" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" fill="none"/>
          </g>
        </g>
        {/* Body */}
        <path d="M76.8 175.6Q69 167.9 78.2 160.7Q76.6 151.8 90.3 147.3Q95.2 138.9 110.9 137.9Q121.6 131.3 136.7 134Q151.1 130.5 162.9 136.4Q178.7 136.4 185.3 144.5Q199.7 148.2 199.7 157.1Q210.3 163.7 203.9 171.9Q208.7 180.4 197 186.3Q195.3 195.2 180.3 198Q172.3 205.7 156.6 204.8Q143.7 210 130 205.6Q114.5 207.4 105.1 200.2Q89.7 198.3 86.3 189.6Q73.6 184.3 76.8 175.6Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round"/>
        {/* Head puff */}
        <path d="M182.7 196.4Q169.4 196.9 166.6 183Q156.1 174.1 162.3 161.5Q159.6 147.6 171.9 142.2Q178.2 129.7 191 134Q203.3 128.7 210.5 140.8Q223.1 145.2 221.3 159.3Q228.4 171.5 218.5 181Q216.6 195.1 203.2 195.7Q193.3 205.1 182.7 196.4Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round"/>
        {/* Front near leg */}
        <g className="tp-leg-fn" style={{ transformOrigin: '186px 194px' }}>
          <g transform="translate(186 194)">
            <path d="M-12-14C-12 4-12 16-12 25C-12 32-7 34 0 34C9 34 13 31 13 25C13 16 12 4 12-14Z" fill="#f2be6b"/>
            <path d="M-12-14C-12 4-12 16-12 25C-12 32-7 34 0 34C9 34 13 31 13 25C13 16 12 4 12-14" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" fill="none"/>
            <path d="M-3.5 27v5M4.5 27v5" stroke="#2a170e" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" fill="none"/>
          </g>
        </g>
        {/* Head group */}
        <g>
          <path d="M178 146Q212 162 246 146L246 154Q212 170 178 154Z" fill="#a24a1a" stroke="#2a170e" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round"/>
          <path d="M212 160C212 156 206 155 206 159.4C206 163 212 166.6 212 168.4C212 166.6 218 163 218 159.4C218 155 212 156 212 160Z" fill="#fbe3b4" stroke="#2a170e" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round"/>
          <path className="tp-ear" style={{ transformOrigin: '174px 82px' }} d="M177.1 78.7Q186.9 70.8 186.6 87.4Q196 89.9 189.9 105.5Q195.2 117.3 185.5 126Q184.7 142.8 175.2 141.2Q168.7 156.5 162.9 145.3Q153.1 153.2 153.4 136.6Q144 134.1 150.1 118.5Q144.8 106.7 154.5 98Q155.3 81.2 164.8 82.8Q171.3 67.5 177.1 78.7Z" fill="#e4a352" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round"/>
          <path className="tp-ear" style={{ transformOrigin: '250px 82px' }} d="M246.9 78.7Q252.7 67.5 259.2 82.8Q268.7 81.2 269.5 98Q279.2 106.7 273.9 118.5Q280 134.1 270.6 136.6Q270.9 153.2 261.1 145.3Q255.3 156.5 248.8 141.2Q239.3 142.8 238.5 126Q228.8 117.3 234.1 105.5Q228 89.9 237.4 87.4Q237.1 70.8 246.9 78.7Z" fill="#e4a352" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round"/>
          <path d="M212 54Q223.4 48.2 231.5 57.5Q244.5 56.1 248.1 67.5Q260.7 70.7 259.1 82.4Q269.4 89.7 263 100Q269.4 110.3 259.1 117.6Q260.7 129.3 248.1 132.5Q244.5 143.9 231.5 142.5Q223.4 151.8 212 146Q200.6 151.8 192.5 142.5Q179.5 143.9 175.9 132.5Q163.3 129.3 164.9 117.6Q154.6 110.3 161 100Q154.6 89.7 164.9 82.4Q163.3 70.7 175.9 67.5Q179.5 56.1 192.5 57.5Q200.6 48.2 212 54Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round"/>
          <path d="M195 52Q190.7 45.8 200 43.5Q203.2 36.9 212 40Q220.8 36.9 224 43.5Q233.3 45.8 229 52Q233.3 58.2 224 60.5Q220.8 67.1 212 64Q203.2 67.1 200 60.5Q190.7 58.2 195 52Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round"/>
          <path d="M188 120C188 106 200 100 212 100C224 100 236 106 236 120C236 133 225 140 212 140C199 140 188 133 188 120Z" fill="#fbe3b4"/>
          <circle cx="181" cy="116" r="7" fill="#f9b9a6" opacity="0.85"/>
          <circle cx="243" cy="116" r="7" fill="#f9b9a6" opacity="0.85"/>
          <path d="M186.5 101Q194 91.5 201.5 101M222.5 101Q230 91.5 237.5 101" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" fill="none"/>
          <path d="M204.5 111.5Q212 107.2 219.5 111.5Q218.2 118.4 212 120Q205.8 118.4 204.5 111.5Z" fill="#2a170e"/>
          <path d="M212 120V124.5M212 124.5Q207.2 129.6 202.8 125.2M212 124.5Q216.8 129.6 221.2 125.2" stroke="#2a170e" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" fill="none"/>
          <path d="M207.6 127.4Q212 136.6 216.4 127.4Z" fill="#e98c8c" stroke="#2a170e" strokeWidth="2.2" strokeLinejoin="round"/>
        </g>
      </g>
    </svg>
  );

  return (
    <section
      id="meet-the-pups"
      ref={sectionRef}
      className="relative bg-[#FFF9F0] select-none"
      style={{ height: '400vh' }}
    >
      {/* Exact trot keyframes from live site CSS (10jf32vdx50lp.css) */}
      {/* ═══════════════════════════════════════════════════════════
          STICKY PINNED STAGE — matches live site .tp-meet[data-pinned] .tp-meet__stage
      ═══════════════════════════════════════════════════════════ */}
      <div
        className="sticky top-0 w-full flex flex-col"
        style={{ height: '100vh' }}
      >
        {/* ── Section Header ── */}
        <div
          className="shrink-0 flex flex-col sm:flex-row sm:items-end justify-between gap-4 w-full max-w-[110rem] mx-auto px-4 sm:px-8 lg:px-12 z-30"
          style={{ paddingTop: 'clamp(3rem, 7vh, 5.5rem)' }}
        >
          <div>
            

            <h2
              className="font-serif font-extrabold text-[#35190E] leading-none tracking-tight"
              style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)' }}
            >
              Meet the pups
            </h2>
            <p
              className="text-[#35190E]/75 font-medium mt-2.5"
              style={{ fontSize: 'clamp(1rem, 1.5vw, 1.25rem)' }}
            >
              Real puppies, real photos, looking for their families right now.
            </p>
          </div>

          <Link
            href="/puppies"
            className="self-start sm:self-auto inline-flex items-center gap-2 rounded-full bg-[#A94E20] hover:bg-[#8D3F18] text-white font-bold border-2 border-[#35190E] shadow-scrapbook hover:shadow-scrapbook-lg hover:-translate-y-0.5 transition-all shrink-0"
            style={{ padding: '0.65rem 1.5rem', fontSize: '0.9rem' }}
          >
            <span>See all available puppies</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* ── Hall + Treadmill Track ── */}
        <div className="relative flex-1 w-full overflow-hidden">

          {/* Horizontally-scrolling treadmill track of doors */}
          <div
            ref={trackRef}
            className="absolute bottom-0 left-0 flex items-end will-change-transform"
            style={{
              bottom: 'clamp(5rem, 13vh, 8rem)',
              paddingLeft: 'clamp(8rem, 38vw, 45rem)',
              paddingRight: 'clamp(5rem, 12vw, 14rem)',
              gap: 'clamp(4.5rem, 6vw, 7rem)',
              transform: `translate3d(-${trackOffset}px, 0, 0)`,
              transition: 'transform 60ms linear',
            }}
          >
            {doorsData.map((door) => {
              const isOpen = !!openDoors[door.id];
              return (
                <div
                  key={door.id}
                  className="tp-door-item flex flex-col items-center shrink-0 cursor-pointer group"
                  style={{ width: 'clamp(8rem, min(15vw, 24vh), 16rem)' }}
                  onClick={() => toggleDoor(door.id)}
                  onMouseEnter={() => {
                    manualOverrides.current[door.id] = true;
                    setOpenDoors((p) => ({ ...p, [door.id]: true }));
                  }}
                  onMouseLeave={() => {
                    delete manualOverrides.current[door.id];
                  }}
                >
                  {/* Name Plate */}
                  <div className="text-center pb-2 px-1 w-full" style={{ marginBottom: '0.5rem' }}>
                    <span
                      className="font-serif font-extrabold text-[#35190E] leading-tight line-clamp-2 block"
                      style={{ fontSize: 'clamp(1.1rem, 1.6vw, 1.5rem)' }}
                    >
                      {door.breedDisplay}
                    </span>
                    <span
                      className="text-[#35190E]/65 font-semibold leading-snug line-clamp-2 block mt-1"
                      style={{ fontSize: '0.78rem' }}
                    >
                      {door.details}
                    </span>
                  </div>

                  {/* Door Frame */}
                  <div
                    className="relative w-full overflow-hidden border-b-0"
                    style={{
                      aspectRatio: '4/5.2',
                      borderRadius: '999px 999px 0 0',
                      border: '3px solid #2a170e',
                      borderBottom: 0,
                      background: '#3b2215',
                      perspective: '700px',
                      perspectiveOrigin: '0',
                    }}
                  >
                    {/* Room — puppy photo */}
                    <div className="absolute inset-0 overflow-hidden" style={{ borderRadius: 'inherit' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={door.imageUrl}
                        alt={door.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 block"
                        style={{ objectPosition: 'center center' }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2A170E]/40 via-transparent to-transparent pointer-events-none" />
                      {door.videoBadge && (
                        <div className="absolute bottom-2 left-2 bg-black/60 text-white p-1 rounded-full backdrop-blur-sm">
                          <Video className="w-3 h-3" />
                        </div>
                      )}
                      <Link
                        href={`/puppies/${door.slug}`}
                        onClick={(e) => e.stopPropagation()}
                        className="absolute bottom-2 right-2 bg-white/90 hover:bg-white text-[#35190E] p-1.5 rounded-full border border-[#35190E] hover:scale-110 transition-transform"
                        title="View profile"
                      >
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>

                    {/* Wooden Door Leaf — swings open on scroll */}
                    <div
                      className="absolute inset-0 z-10 transition-transform duration-700"
                      style={{
                        borderRadius: '999px 999px 0 0',
                        backgroundColor: door.doorColor,
                        transformOrigin: '0 center',
                        transform: isOpen ? 'rotateY(-78deg)' : 'rotateY(0deg)',
                        transitionTimingFunction: 'cubic-bezier(0.3, 1.32, 0.48, 1)',
                        transitionDelay: '50ms',
                        border: '3px solid #2a170e',
                        borderBottom: 0,
                        boxShadow: isOpen ? 'none' : `inset -6px 0 12px ${door.doorShadow}60`,
                      }}
                    >
                      {/* Wood grain lines */}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          backgroundImage: 'repeating-linear-gradient(90deg, transparent 0 calc(25% - 1.5px), #2a170e2e calc(25% - 1.5px) 25%)',
                          borderRadius: 'inherit',
                        }}
                      />
                      {/* Inner arch panel */}
                      <div
                        className="absolute pointer-events-none"
                        style={{
                          inset: '12% 14% 9%',
                          borderRadius: '999px 999px 0.5rem 0.5rem',
                          border: '2.5px solid #fffdf847',
                        }}
                      />
                      {/* Peephole */}
                      <div
                        className="absolute"
                        style={{
                          width: '22%',
                          top: '19%',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          color: '#fffdf873',
                        }}
                      >
                        <svg viewBox="0 0 64 64" fill="currentColor" aria-hidden="true">
                          <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
                        </svg>
                      </div>
                      {/* Brass knob */}
                      <div
                        className="absolute"
                        style={{
                          width: '0.85rem',
                          aspectRatio: '1',
                          borderRadius: '50%',
                          background: '#e5b558',
                          border: '2.5px solid #2a170e',
                          top: '56%',
                          right: '11%',
                        }}
                      />
                      {/* Available badge on closed door */}
                      {!isOpen && (
                        <div
                          className="absolute font-bold whitespace-nowrap"
                          style={{
                            top: '16%',
                            right: '-0.7rem',
                            rotate: '7deg',
                            background: '#fffdf8',
                            border: '2px solid #2a170e',
                            borderRadius: '999px',
                            padding: '0.05rem 0.65rem 0.15rem',
                            fontSize: '0.9rem',
                            color: '#2a170e',
                            zIndex: 2,
                            boxShadow: '2px 3px #2a170e33',
                          }}
                        >
                          Available
                        </div>
                      )}
                    </div>

                    {/* Threshold step lip */}
                    <div
                      className="absolute left-0 right-0 bottom-0"
                      style={{
                        height: '0.6rem',
                        background: '#dc9a52',
                        borderRadius: '0.35rem',
                        border: '3px solid #2a170e',
                        bottom: '-0.6rem',
                        left: '-0.55rem',
                        right: '-0.55rem',
                      }}
                    />
                  </div>
                </div>
              );
            })}

            {/* "Meet them all" last card */}
            <Link
              href="/puppies"
              className="tp-door-item flex flex-col items-end shrink-0 group self-stretch"
              style={{ width: 'clamp(8rem, min(15vw, 24vh), 16rem)' }}
            >
              <div
                className="w-full h-full flex-1 flex items-center justify-center rounded-t-full bg-transparent hover:bg-[#FBE3B4]/30 transition-colors p-6 text-center"
                style={{ border: '3px dashed #A94E20', borderBottom: 0, borderRadius: '999px 999px 0 0' }}
              >
                <span
                  className="font-serif font-extrabold text-[#A94E20] group-hover:text-[#35190E] underline underline-offset-4 transition-colors"
                  style={{ fontSize: 'clamp(1.4rem, 2vw, 2rem)', lineHeight: 1 }}
                >
                  Meet them all
                </span>
              </div>
            </Link>
          </div>

          {/* ── Wooden Floor Plank ── */}
          <div
            className="absolute left-0 right-0 bottom-0 z-20 overflow-hidden"
            style={{
              height: 'clamp(5rem, 13vh, 8rem)',
              borderTop: '3px solid #2a170e',
              background: 'linear-gradient(to bottom, #2a170e29, transparent 22%), repeating-linear-gradient(90deg, transparent 0 calc(11rem - 2px), #2a170e1f calc(11rem - 2px) 11rem) var(--floor-x,0) 0 / auto, linear-gradient(#e8b06a, #dc9a52)',
              boxShadow: '0 -12px 0 -6px #f5d9a8',
            }}
          >
            {/* Paw prints on floor */}
            {paws.map((p) => (
              <div
                key={p.id}
                className="tp-paw-mark absolute pointer-events-none"
                style={{
                  left: p.x,
                  top: '50%',
                  transform: `translate(-50%, -50%) rotate(${p.rot}deg)`,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 64 64" fill="#8D3F18" opacity="0.55">
                  <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
                </svg>
              </div>
            ))}
          </div>

                    {/* ── UNIFIED WALKING MASCOT — emerges directly from the yellow-circled quilt center, trots down to runner and walks past doors ── */}
          {(() => {
            const stepDown = Math.min(1, Math.max(0, scrollProgress / 0.08));
            const onRunner = stepDown >= 1;

            return (
              <div
                className="absolute z-30 cursor-pointer will-change-transform"
                style={{
                  width: 'clamp(9rem, min(14vw, 22vh), 13rem)',
                  opacity: scrollProgress <= 0 ? 0 : 1,
                  ...(onRunner
                    ? {
                        left: 'clamp(100px, 14vw, 200px)',
                        bottom: 'calc(clamp(5rem, 13vh, 8rem) * 0.42)',
                      }
                    : {
                        // Starting EXACTLY at the center yellow circle: calc(50% - 6.5rem)
                        left: `calc((50% - 6.5rem) * ${1 - stepDown} + clamp(100px, 14vw, 200px) * ${stepDown})`,
                        // Starting EXACTLY at the quilt scallop notch: -4.2rem
                        top: `calc(-4.2rem * ${1 - stepDown} + (100vh - clamp(5rem, 13vh, 8rem) * 0.42 - clamp(8rem, min(14vw, 22vh), 12rem)) * ${stepDown})`,
                      }),
                  transition: isWalking ? 'none' : 'all 0.25s ease-out',
                }}
                onClick={() => {
                  setBubbleText('Woof! 🐾');
                  setTimeout(() => setBubbleText(null), 1800);
                }}
              >
                {/* Speech bubble on click */}
                {bubbleText && (
                  <div
                    className="absolute whitespace-nowrap font-bold text-[#2A170E] pointer-events-none"
                    style={{
                      bottom: '100%',
                      left: '50%',
                      transform: `translateX(-50%) scaleX(${scaleX})`,
                      background: '#fffdf8',
                      border: '2px solid #2a170e',
                      borderRadius: '999px',
                      padding: '0.15rem 0.75rem',
                      fontSize: '0.78rem',
                      marginBottom: '6px',
                      zIndex: 50,
                      boxShadow: '1px 2px #2a170e22',
                    }}
                  >
                    {bubbleText}
                  </div>
                )}

                {/* Animated Dog SVG */}
                {renderDogSVG(isWalking, scaleX)}
              </div>
            );
          })()}

        </div>{/* end hall */}
      </div>{/* end sticky */}
    </section>
  );
}
