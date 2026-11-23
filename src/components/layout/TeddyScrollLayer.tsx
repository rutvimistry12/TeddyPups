"use client";

/**
 * The puppy follows a scroll-synchronized zigzag from the top to the bottom
 * of the page, turning to face the direction of travel.
 */

import React, { useEffect, useRef, useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// Animated dog SVG — identical markup to MeetThePupsDoors.tsx renderDogSVG
// (uses tp-runner-walking / tp-leg-* classes already in globals.css)
// ─────────────────────────────────────────────────────────────────────────────
function PuppySVG({
  walking,
  scaleX,
}: {
  walking: boolean;
  scaleX: 1 | -1;
}) {
  return (
    <svg
      viewBox="0 0 300 240"
      className={walking ? "tp-runner-walking" : ""}
      style={{
        overflow: "visible",
        display: "block",
        width: "100%",
        transform: `scaleX(${scaleX})`,
        transition: "transform 0.15s ease",
      }}
      aria-hidden="true"
    >
      <ellipse cx="150" cy="230" rx="86" ry="7" fill="#2a170e" opacity="0.13" />
      <g className="tp-body-group">
        {/* Back front leg */}
        <g className="tp-leg-bf" style={{ transformOrigin: "94px 192px" }}>
          <g transform="translate(94 192)">
            <path d="M-14-14C-14 4-12 18-12 27C-12 34-7 36 0 36C9 36 13 33 13 27C13 18 14 4 14-14Z" fill="#e4a352" />
            <path d="M-14-14C-14 4-12 18-12 27C-12 34-7 36 0 36C9 36 13 33 13 27C13 18 14 4 14-14" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" fill="none" />
            <path d="M-3.5 29v5M4.5 29v5" stroke="#2a170e" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" fill="none" />
          </g>
        </g>
        {/* Front front leg */}
        <g className="tp-leg-ff" style={{ transformOrigin: "168px 192px" }}>
          <g transform="translate(168 192)">
            <path d="M-11-14C-11 4-12 18-12 27C-12 34-7 36 0 36C9 36 13 33 13 27C13 18 11 4 11-14Z" fill="#e4a352" />
            <path d="M-11-14C-11 4-12 18-12 27C-12 34-7 36 0 36C9 36 13 33 13 27C13 18 11 4 11-14" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" fill="none" />
            <path d="M-3.5 29v5M4.5 29v5" stroke="#2a170e" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" fill="none" />
          </g>
        </g>
        {/* Tail */}
        <g className="tp-tail" style={{ transformOrigin: "84px 150px" }}>
          <path d="M86 152C80 146 76 140 74 136" stroke="#2a170e" strokeWidth="9" strokeLinejoin="round" strokeLinecap="round" fill="none" />
          <path d="M86 152C80 146 76 140 74 136" stroke="#f2be6b" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M70 110Q78.1 105 80.9 113.7Q90.5 114.8 86.7 123.2Q93.4 129.9 84.7 134Q85.2 143.1 75.8 141Q70 148.3 64.2 141Q54.8 143.1 55.3 134Q46.6 129.9 53.3 123.2Q49.5 114.8 59.1 113.7Q61.9 105 70 110Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
        </g>
        {/* Back near leg */}
        <g className="tp-leg-bn" style={{ transformOrigin: "110px 194px" }}>
          <g transform="translate(110 194)">
            <path d="M-15-14C-15 4-12 16-12 25C-12 32-7 34 0 34C9 34 13 31 13 25C13 16 15 4 15-14Z" fill="#f2be6b" />
            <path d="M-15-14C-15 4-12 16-12 25C-12 32-7 34 0 34C9 34 13 31 13 25C13 16 15 4 15-14" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" fill="none" />
            <path d="M-3.5 27v5M4.5 27v5" stroke="#2a170e" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" fill="none" />
          </g>
        </g>
        {/* Body */}
        <path d="M76.8 175.6Q69 167.9 78.2 160.7Q76.6 151.8 90.3 147.3Q95.2 138.9 110.9 137.9Q121.6 131.3 136.7 134Q151.1 130.5 162.9 136.4Q178.7 136.4 185.3 144.5Q199.7 148.2 199.7 157.1Q210.3 163.7 203.9 171.9Q208.7 180.4 197 186.3Q195.3 195.2 180.3 198Q172.3 205.7 156.6 204.8Q143.7 210 130 205.6Q114.5 207.4 105.1 200.2Q89.7 198.3 86.3 189.6Q73.6 184.3 76.8 175.6Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
        {/* Collar */}
        <path d="M182.7 196.4Q169.4 196.9 166.6 183Q156.1 174.1 162.3 161.5Q159.6 147.6 171.9 142.2Q178.2 129.7 191 134Q203.3 128.7 210.5 140.8Q223.1 145.2 221.3 159.3Q228.4 171.5 218.5 181Q216.6 195.1 203.2 195.7Q193.3 205.1 182.7 196.4Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
        {/* Front near leg */}
        <g className="tp-leg-fn" style={{ transformOrigin: "186px 194px" }}>
          <g transform="translate(186 194)">
            <path d="M-12-14C-12 4-12 16-12 25C-12 32-7 34 0 34C9 34 13 31 13 25C13 16 12 4 12-14Z" fill="#f2be6b" />
            <path d="M-12-14C-12 4-12 16-12 25C-12 32-7 34 0 34C9 34 13 31 13 25C13 16 12 4 12-14" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" fill="none" />
            <path d="M-3.5 27v5M4.5 27v5" stroke="#2a170e" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" fill="none" />
          </g>
        </g>
        {/* Head group */}
        <g>
          {/* Collar band */}
          <path d="M178 146Q212 162 246 146L246 154Q212 170 178 154Z" fill="#a24a1a" stroke="#2a170e" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
          {/* Collar tag */}
          <path d="M212 160C212 156 206 155 206 159.4C206 163 212 166.6 212 168.4C212 166.6 218 163 218 159.4C218 155 212 156 212 160Z" fill="#fbe3b4" stroke="#2a170e" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" />
          {/* Left ear */}
          <path className="tp-ear" style={{ transformOrigin: "174px 82px" }} d="M177.1 78.7Q186.9 70.8 186.6 87.4Q196 89.9 189.9 105.5Q195.2 117.3 185.5 126Q184.7 142.8 175.2 141.2Q168.7 156.5 162.9 145.3Q153.1 153.2 153.4 136.6Q144 134.1 150.1 118.5Q144.8 106.7 154.5 98Q155.3 81.2 164.8 82.8Q171.3 67.5 177.1 78.7Z" fill="#e4a352" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
          {/* Right ear */}
          <path className="tp-ear" style={{ transformOrigin: "250px 82px" }} d="M246.9 78.7Q252.7 67.5 259.2 82.8Q268.7 81.2 269.5 98Q279.2 106.7 273.9 118.5Q280 134.1 270.6 136.6Q270.9 153.2 261.1 145.3Q255.3 156.5 248.8 141.2Q239.3 142.8 238.5 126Q228.8 117.3 234.1 105.5Q228 89.9 237.4 87.4Q237.1 70.8 246.9 78.7Z" fill="#e4a352" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
          {/* Head face */}
          <path d="M212 54Q223.4 48.2 231.5 57.5Q244.5 56.1 248.1 67.5Q260.7 70.7 259.1 82.4Q269.4 89.7 263 100Q269.4 110.3 259.1 117.6Q260.7 129.3 248.1 132.5Q244.5 143.9 231.5 142.5Q223.4 151.8 212 146Q200.6 151.8 192.5 142.5Q179.5 143.9 175.9 132.5Q163.3 129.3 164.9 117.6Q154.6 110.3 161 100Q154.6 89.7 164.9 82.4Q163.3 70.7 175.9 67.5Q179.5 56.1 192.5 57.5Q200.6 48.2 212 54Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
          {/* Head top puff */}
          <path d="M195 52Q190.7 45.8 200 43.5Q203.2 36.9 212 40Q220.8 36.9 224 43.5Q233.3 45.8 229 52Q233.3 58.2 224 60.5Q220.8 67.1 212 64Q203.2 67.1 200 60.5Q190.7 58.2 195 52Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
          {/* Muzzle */}
          <path d="M188 120C188 106 200 100 212 100C224 100 236 106 236 120C236 133 225 140 212 140C199 140 188 133 188 120Z" fill="#fbe3b4" />
          {/* Cheeks */}
          <circle cx="181" cy="116" r="7" fill="#f9b9a6" opacity="0.85" />
          <circle cx="243" cy="116" r="7" fill="#f9b9a6" opacity="0.85" />
          {/* Brow marks */}
          <path d="M186.5 101Q194 91.5 201.5 101M222.5 101Q230 91.5 237.5 101" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" fill="none" />
          {/* Nose */}
          <path d="M204.5 111.5Q212 107.2 219.5 111.5Q218.2 118.4 212 120Q205.8 118.4 204.5 111.5Z" fill="#2a170e" />
          {/* Mouth */}
          <path d="M212 120V124.5M212 124.5Q207.2 129.6 202.8 125.2M212 124.5Q216.8 129.6 221.2 125.2" stroke="#2a170e" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" fill="none" />
          {/* Tongue */}
          <path d="M207.6 127.4Q212 136.6 216.4 127.4Z" fill="#e98c8c" stroke="#2a170e" strokeWidth="2.2" strokeLinejoin="round" />
        </g>
      </g>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main TeddyScrollLayer component
// ─────────────────────────────────────────────────────────────────────────────
export function TeddyScrollLayer() {
  const [xPosition, setXPosition] = useState(12);
  const [yPct, setYPct] = useState(18);
  const [scaleX, setScaleX] = useState<1 | -1>(1);
  const [walking, setWalking] = useState(false);
  const [visible, setVisible] = useState(false);

  const rafRef = useRef<number | null>(null);
  const lastScrollY = useRef(0);
  const lastXPosition = useRef(12);
  const walkTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const clamp = (v: number, lo: number, hi: number) =>
      Math.max(lo, Math.min(hi, v));

    const triWave = (t: number, cycles = 3) => {
      const n = t * cycles * 2;
      const rem = n % 2;
      return rem < 1 ? rem : 2 - rem;
    };

    const update = () => {
      const scrollY = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const meetSection = document.getElementById("meet-the-pups");

      if (!meetSection) {
        setVisible(false);
        setWalking(false);
        return;
      }

      const walkStart = meetSection.getBoundingClientRect().bottom + scrollY;
      const horizontalMargin = 12;

      if (scrollY < walkStart) {
        setXPosition(horizontalMargin);
        setYPct(18);
        setScaleX(1);
        setWalking(false);
        setVisible(false);
        lastXPosition.current = horizontalMargin;
        lastScrollY.current = scrollY;
        if (walkTimerRef.current) clearTimeout(walkTimerRef.current);
        return;
      }

      const scrollFraction =
        docH > walkStart
          ? clamp((scrollY - walkStart) / (docH - walkStart), 0, 1)
          : 0;
      const footer = document.querySelector<HTMLElement>(".tp-footer");
      const basket = footer?.querySelector<HTMLElement>(".tp-basket");
      const basketRect = basket?.getBoundingClientRect();

      if (basketRect && basketRect.top <= window.innerHeight * 0.68) {
        setVisible(false);
        setWalking(false);
        return;
      }

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reducedMotion) {
        setXPosition(horizontalMargin);
        setYPct(72);
        setScaleX(1);
        setWalking(false);
        setVisible(true);
        lastXPosition.current = horizontalMargin;
        lastScrollY.current = scrollY;
        return;
      }

      const puppyWidth = clamp(window.innerWidth * 0.075, 70, 110);
      const puppyHeight = puppyWidth * 0.8;
      const horizontalTravel = Math.max(
        0,
        window.innerWidth - puppyWidth - horizontalMargin * 2,
      );
      const wave = triWave(scrollFraction, 4);
      let targetX = horizontalMargin + wave * horizontalTravel;
      let targetY = 18 + scrollFraction * 64;

      if (basketRect) {
        const approachStart = window.innerHeight * 0.95;
        const approachEnd = window.innerHeight * 0.75;
        const approach = clamp(
          (approachStart - basketRect.top) / (approachStart - approachEnd),
          0,
          1,
        );

        if (approach > 0) {
          const basketX = clamp(
            basketRect.left + basketRect.width / 2 - puppyWidth / 2,
            horizontalMargin,
            window.innerWidth - puppyWidth - horizontalMargin,
          );
          const basketY = clamp(
            basketRect.top - puppyHeight * 0.4,
            12,
            window.innerHeight - puppyHeight - 12,
          );

          targetX += (basketX - targetX) * approach;
          targetY += (basketY - targetY) * approach;
        }
      }

      const prevX = lastXPosition.current;
      if (Math.abs(targetX - prevX) > 0.5) {
        const newDir: 1 | -1 = targetX > prevX ? 1 : -1;
        setScaleX(newDir);
      }

      setXPosition(targetX);
      setYPct(targetY);
      lastXPosition.current = targetX;
      setVisible(true);

      const delta = Math.abs(scrollY - lastScrollY.current);
      lastScrollY.current = scrollY;

      if (delta > 0) {
        setWalking(true);
        if (walkTimerRef.current) clearTimeout(walkTimerRef.current);
        walkTimerRef.current = setTimeout(() => setWalking(false), 250);
      }
    };

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    motionPreference.addEventListener("change", update);
    update(); // initial run

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      motionPreference.removeEventListener("change", update);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (walkTimerRef.current) clearTimeout(walkTimerRef.current);
    };
  }, []);

  if (!visible) return null;

  const puppyW = "clamp(70px, 7.5vw, 110px)";

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: `${yPct}%`,
          left: `${xPosition}px`,
          width: puppyW,
          transition: "left 90ms linear, top 90ms linear",
          filter: "drop-shadow(0 4px 6px rgba(42,23,14,0.18))",
          willChange: "left, top",
        }}
      >
        <PuppySVG walking={walking} scaleX={scaleX} />
      </div>
    </div>
  );
}
