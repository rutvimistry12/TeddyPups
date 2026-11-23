"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Play } from 'lucide-react';

export function PuppyJourney() {
  const [activeStep, setActiveStep] = useState(1);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = (-rect.top + vh * 0.3) / (rect.height || 1);

      if (progress < 0.33) {
        setActiveStep(1);
      } else if (progress < 0.66) {
        setActiveStep(2);
      } else {
        setActiveStep(3);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const steps = [
    {
      num: 1,
      title: 'Choose your breed',
      desc: 'Select your preferred breed or tell us what you\'re looking for. We\'ll guide you based on availability and your lifestyle.',
    },
    {
      num: 2,
      title: 'Get photos & details',
      desc: 'Our team will share real photos, health details, and all necessary information directly on WhatsApp.',
    },
    {
      num: 3,
      title: 'Secure & safe delivery',
      desc: 'Once confirmed, we handle everything professionally and ensure your puppy reaches you safely and stress-free.',
    },
  ];

  return (
    <section
      id="tp-chat"
      ref={containerRef}
      data-pup-scene="true"
      data-tone="light"
      className="tp-scene tp-chat relative overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #f7d18d, #f0b866)',
        padding: 'clamp(4rem, 8vh, 7rem) 1.5rem',
      }}
      aria-labelledby="journey-title"
    >
      <div data-pup-stop data-x="74" data-y="84" data-pose="walk" style={{ position: 'absolute', right: '22%', bottom: '4%', width: 1, height: 1, pointerEvents: 'none' }} />
      <div className="mx-auto max-w-[110rem] px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Story & 3 Steps */}
          <div className="lg:col-span-6">
            <h2
              id="journey-title"
              className="font-serif font-extrabold text-[#2a170e]"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 4.4rem)', lineHeight: 1.1, marginBottom: '1.25rem' }}
            >
              Your puppy journey
            </h2>
            <p className="text-[#5a3a28] text-lg max-w-[42ch] mb-10 leading-relaxed font-medium">
              A premium, step-by-step concierge experience. We make adoption simple, secure, and purely joyful.
            </p>

            <ol className="flex flex-col gap-6">
              {steps.map((s) => {
                const isActive = activeStep === s.num;
                return (
                  <li
                    key={s.num}
                    onClick={() => setActiveStep(s.num)}
                    className="flex gap-5 items-start cursor-pointer group transition-all"
                    style={{ opacity: isActive ? 1 : 0.65 }}
                  >
                    <span
                      className={`font-serif font-extrabold w-11 h-11 rounded-full flex items-center justify-center text-lg shrink-0 border-2 border-[#2a170e] transition-all ${
                        isActive
                          ? 'bg-[#c2622b] text-white scale-110 shadow-scrapbook'
                          : 'bg-[#fffdf8] text-[#2a170e]'
                      }`}
                    >
                      {s.num}
                    </span>
                    <div>
                      <h3 className="font-serif font-bold text-xl text-[#2a170e] mb-1 group-hover:text-[#c2622b] transition-colors">
                        {s.title}
                      </h3>
                      <p className="text-[#5a3a28] text-sm leading-relaxed max-w-[44ch]">
                        {s.desc}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>

            <div className="mt-10">
              <Link
                href="/how-it-works"
                className="inline-flex items-center gap-2 rounded-full bg-[#fffdf8] hover:bg-white text-[#2a170e] font-bold px-7 py-3 border-2 border-[#2a170e] shadow-scrapbook hover:shadow-scrapbook-lg hover:-translate-y-0.5 transition-all text-sm"
              >
                How it works
              </Link>
            </div>
          </div>

          {/* Right Column: WhatsApp Interactive Phone Screen + Mascot Puppy */}
          <div className="lg:col-span-6 relative flex justify-center items-end">
            <div
              className="relative w-full max-w-[340px] bg-[#fffdf8] border-[3px] border-[#2a170e] rounded-[38px] overflow-hidden shadow-2xl"
              style={{
                boxShadow: '8px 12px 0 #2a170e30',
              }}
            >
              {/* WhatsApp Header Bar */}
              <div className="bg-[#fffdf8] border-b-2 border-[#2a170e] px-4 py-3 flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brand/logo.png"
                  alt="TeddyPups"
                  className="w-9 h-9 rounded-full border border-[#2a170e] object-cover"
                />
                <div>
                  <div className="font-bold text-sm text-[#2a170e] leading-tight">TeddyPups U.A.E.</div>
                  <div className="text-[11px] text-[#287B52] font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#287B52]" /> online
                  </div>
                </div>
              </div>

              {/* Phone Chat Screen */}
              <div
                className="p-4 flex flex-col gap-3 min-h-[360px]"
                style={{
                  background: 'repeating-radial-gradient(circle at 50% 50%, #fbe3b418 0, #fbe3b418 8px, transparent 8px, transparent 16px), #faf6ed',
                }}
              >
                {/* User Inbound Message */}
                <div className="self-end bg-[#ffd27f] border-2 border-[#2a170e] rounded-2xl rounded-tr-xs p-3 text-xs font-semibold text-[#2a170e] max-w-[85%] shadow-xs">
                  Hi TeddyPups! I&apos;d love to know more about your puppies.
                </div>

                {/* Step 1: Breed Selection Chips */}
                {activeStep === 1 && (
                  <div className="self-start bg-[#fffdf8] border-2 border-[#2a170e] rounded-2xl rounded-tl-xs p-3.5 text-xs text-[#2a170e] max-w-[92%] shadow-xs transition-all animate-fadeIn">
                    <div className="font-medium mb-2.5">
                      Select your preferred breed or tell us what you&apos;re looking for. We&apos;ll guide you based on availability and your lifestyle.
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {['Maltipoo', 'Pomeranian', 'Poodle', 'Cavapoo', 'Shih Tzu'].map((breed) => (
                        <button
                          key={breed}
                          type="button"
                          onClick={() => setActiveStep(2)}
                          className="bg-[#fff8ec] hover:bg-[#ffd27f] border border-[#2a170e] rounded-full px-2.5 py-1 text-[11px] font-bold text-[#2a170e] transition-colors"
                        >
                          {breed}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2: Photo Cards & Video Thumbnail */}
                {activeStep === 2 && (
                  <div className="self-start flex flex-col gap-2 max-w-[92%] transition-all animate-fadeIn">
                    <div className="flex gap-2">
                      <div className="w-1/2 aspect-square rounded-xl border-2 border-[#2a170e] overflow-hidden bg-[#fffdf8] shadow-xs">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/images/doors/door_1.jpg" alt="Puppy preview 1" className="w-full h-full object-cover" />
                      </div>
                      <div className="w-1/2 aspect-square rounded-xl border-2 border-[#2a170e] overflow-hidden bg-[#fffdf8] shadow-xs">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/images/doors/door_2.jpg" alt="Puppy preview 2" className="w-full h-full object-cover" />
                      </div>
                    </div>

                    <div className="relative aspect-video rounded-xl border-2 border-[#2a170e] overflow-hidden bg-[#2a170e] shadow-xs flex items-center justify-center group cursor-pointer">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/images/doors/door_0.jpg" alt="Video preview" className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform" />
                      <div className="absolute w-10 h-10 rounded-full bg-white/90 border-2 border-[#2a170e] flex items-center justify-center shadow-md">
                        <Play className="w-4 h-4 fill-[#2a170e] text-[#2a170e] ml-0.5" />
                      </div>
                    </div>

                    <div className="bg-[#fffdf8] border-2 border-[#2a170e] rounded-2xl p-2.5 text-xs text-[#2a170e] shadow-xs">
                      Our team will share real photos, health details, and all necessary information directly on WhatsApp.
                    </div>
                  </div>
                )}

                {/* Step 3: Confirmation & Safe Delivery Path */}
                {activeStep === 3 && (
                  <div className="self-start flex flex-col gap-2 max-w-[92%] transition-all animate-fadeIn">
                    <div className="bg-[#fffdf8] border-2 border-[#2a170e] rounded-2xl p-3 text-xs text-[#2a170e] shadow-xs">
                      Once confirmed, we handle everything professionally and ensure your puppy reaches you safely and stress-free.
                    </div>

                    <div className="bg-[#fff8ec] border-2 border-[#2a170e] rounded-2xl p-3 shadow-xs">
                      <svg viewBox="0 0 240 60" className="w-full">
                        <path d="M20 35 Q120 10 210 35" fill="none" stroke="#c2622b" strokeWidth="2.5" strokeDasharray="4 6" strokeLinecap="round" />
                        <circle cx="20" cy="35" r="5" fill="#c2622b" />
                        <g transform="translate(200, 22)">
                          <polygon points="12,2 22,12 2,12" fill="#c2622b" stroke="#2a170e" strokeWidth="1.5" />
                          <rect x="5" y="12" width="14" height="12" fill="#fffdf8" stroke="#2a170e" strokeWidth="1.5" />
                          <rect x="9" y="16" width="6" height="8" fill="#2a170e" />
                        </g>
                        <circle cx="95" cy="22" r="2.5" fill="#c2622b" opacity="0.6" />
                        <circle cx="140" cy="22" r="2.5" fill="#c2622b" opacity="0.6" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>

              {/* Compose Bar */}
              <div className="border-t-2 border-[#2a170e] p-3 bg-[#fffdf8] flex items-center justify-between">
                <span className="text-xs text-[#5a3a28]/60 font-medium">Say hello on WhatsApp</span>
                <div className="w-8 h-8 rounded-full bg-[#25D366] border border-[#2a170e] flex items-center justify-center text-white">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M3 20l18-8L3 4v6l12 2-12 2z" /></svg>
                </div>
              </div>
            </div>

            {/* Mascot Puppy beside WhatsApp Phone */}
            <div
              className="absolute -bottom-2 -left-4 sm:left-4 z-20 w-32 cursor-pointer"
              onClick={() => setActiveStep((p) => (p % 3) + 1)}
            >
              {/* "ooh, photos!" Speech Bubble on Step 2 */}
              {activeStep === 2 && (
                <div
                  className="absolute whitespace-nowrap font-hand font-bold text-[#2a170e] bg-[#fffdf8] border-2 border-[#2a170e] rounded-full px-3 py-0.5 text-sm shadow-xs -top-7 left-12 animate-bounce"
                >
                  ooh, photos! 🐾
                </div>
              )}

              {/* Dog SVG */}
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
      </div>
    </section>
  );
}
