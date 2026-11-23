import React from 'react';

export function PawPrint({ className = "w-6 h-6 text-caramel/40", rotate = 0 }: { className?: string; rotate?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={{ transform: `rotate(${rotate}deg)` }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 10.5c-1.8 0-3.5 1.4-3.5 3.5 0 2 1.6 3.5 3.5 3.5s3.5-1.5 3.5-3.5c0-2.1-1.7-3.5-3.5-3.5zm-5-3.5C6 7 5 7.9 5 9s1 2 2 2 2-.9 2-2-1-2-2-2zm10 0c-1 0-2 .9-2 2s1 2 2 2 2-.9 2-2-1-2-2-2zM8.5 4.5C7.7 4.5 7 5.2 7 6s.7 1.5 1.5 1.5S10 6.8 10 6s-.7-1.5-1.5-1.5zm7 0C14.7 4.5 14 5.2 14 6s.7 1.5 1.5 1.5S17 6.8 17 6s-.7-1.5-1.5-1.5z" />
    </svg>
  );
}

export function DoodleHeart({ className = "w-6 h-6 text-terracotta" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

export function DoodleStar({ className = "w-5 h-5 text-warm-yellow" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 1.5l3.09 6.26L22 8.77l-5 4.87 1.18 6.88L12 17.27l-6.18 3.25L7 13.64 2 8.77l6.91-1.01L12 1.5z" />
    </svg>
  );
}

export function TapeStrip({ className = "w-24 h-6 bg-warm-yellow/60", rotate = -3 }: { className?: string; rotate?: number }) {
  return (
    <div
      className={`absolute z-10 pointer-events-none backdrop-blur-xs shadow-sm border border-chocolate/10 ${className}`}
      style={{
        transform: `rotate(${rotate}deg)`,
        clipPath: "polygon(0% 10%, 4% 0%, 96% 0%, 100% 15%, 97% 100%, 3% 98%)",
      }}
    />
  );
}

export function ScallopBorder({ color = "#FFFFFF", className = "w-full h-4" }: { color?: string; className?: string }) {
  // Downward scallops hanging down from the element above
  return (
    <div className={`overflow-hidden pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 1200 16"
        preserveAspectRatio="none"
        className="w-full h-full fill-current filter drop-shadow-[0_2px_2px_rgba(53,25,14,0.06)]"
        style={{ color }}
      >
        <path d="
          M 0,0 
          C 7.5,14 22.5,14 30,0 
          C 37.5,14 52.5,14 60,0 
          C 67.5,14 82.5,14 90,0 
          C 97.5,14 112.5,14 120,0 
          C 127.5,14 142.5,14 150,0 
          C 157.5,14 172.5,14 180,0 
          C 187.5,14 202.5,14 210,0 
          C 217.5,14 232.5,14 240,0 
          C 247.5,14 262.5,14 270,0 
          C 277.5,14 292.5,14 300,0 
          C 307.5,14 322.5,14 330,0 
          C 337.5,14 352.5,14 360,0 
          C 367.5,14 382.5,14 390,0 
          C 397.5,14 412.5,14 420,0 
          C 427.5,14 442.5,14 450,0 
          C 457.5,14 472.5,14 480,0 
          C 487.5,14 502.5,14 510,0 
          C 517.5,14 532.5,14 540,0 
          C 547.5,14 562.5,14 570,0 
          C 577.5,14 592.5,14 600,0 
          C 607.5,14 622.5,14 630,0 
          C 637.5,14 652.5,14 660,0 
          C 667.5,14 682.5,14 690,0 
          C 697.5,14 712.5,14 720,0 
          C 727.5,14 742.5,14 750,0 
          C 757.5,14 772.5,14 780,0 
          C 787.5,14 802.5,14 810,0 
          C 817.5,14 832.5,14 840,0 
          C 847.5,14 862.5,14 870,0 
          C 877.5,14 892.5,14 900,0 
          C 907.5,14 922.5,14 930,0 
          C 937.5,14 952.5,14 960,0 
          C 967.5,14 982.5,14 990,0 
          C 997.5,14 1012.5,14 1020,0 
          C 1027.5,14 1042.5,14 1050,0 
          C 1057.5,14 1072.5,14 1080,0 
          C 1087.5,14 1102.5,14 1110,0 
          C 1117.5,14 1132.5,14 1140,0 
          C 1147.5,14 1162.5,14 1170,0 
          C 1177.5,14 1192.5,14 1200,0 
          L 1200,0 L 0,0 Z" 
        />
      </svg>
    </div>
  );
}

export function IllustratedTeddyPeeking({ className = "w-36 h-28" }: { className?: string }) {
  return (
    <div className={`relative inline-block ${className}`}>
      <svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
        {/* Left Ear */}
        <ellipse cx="40" cy="45" rx="20" ry="24" fill="#D99545" transform="rotate(-15 40 45)" stroke="#35190E" strokeWidth="3" />
        <ellipse cx="40" cy="45" rx="12" ry="15" fill="#FFE9C9" transform="rotate(-15 40 45)" />

        {/* Right Ear */}
        <ellipse cx="120" cy="45" rx="20" ry="24" fill="#D99545" transform="rotate(15 120 45)" stroke="#35190E" strokeWidth="3" />
        <ellipse cx="120" cy="45" rx="12" ry="15" fill="#FFE9C9" transform="rotate(15 120 45)" />

        {/* Head */}
        <circle cx="80" cy="65" r="45" fill="#F6D28B" stroke="#35190E" strokeWidth="3" />

        {/* Cheeks */}
        <ellipse cx="55" cy="78" rx="8" ry="5" fill="#FFB6B6" opacity="0.8" />
        <ellipse cx="105" cy="78" rx="8" ry="5" fill="#FFB6B6" opacity="0.8" />

        {/* Eyes */}
        <circle cx="62" cy="62" r="5" fill="#35190E" />
        <circle cx="64" cy="60" r="1.5" fill="#FFFFFF" />
        <circle cx="98" cy="62" r="5" fill="#35190E" />
        <circle cx="100" cy="60" r="1.5" fill="#FFFFFF" />

        {/* Snout Muzzle */}
        <ellipse cx="80" cy="75" rx="16" ry="12" fill="#FFF8EC" stroke="#35190E" strokeWidth="2.5" />
        {/* Heart Nose */}
        <path d="M76 71 C76 68 80 67 80 70 C80 67 84 68 84 71 C84 74 80 76 80 76 C80 76 76 74 76 71 Z" fill="#35190E" />
        {/* Mouth */}
        <path d="M77 75 Q80 78 83 75" stroke="#35190E" strokeWidth="2" strokeLinecap="round" />

        {/* Paws Resting on Edge */}
        <rect x="36" y="98" width="26" height="20" rx="10" fill="#F6D28B" stroke="#35190E" strokeWidth="3" />
        <rect x="98" y="98" width="26" height="20" rx="10" fill="#F6D28B" stroke="#35190E" strokeWidth="3" />
      </svg>
    </div>
  );
}

export function IllustratedPuppyHero({ className = "w-64 h-64" }: { className?: string }) {
  return (
    <div className={`relative inline-block ${className}`}>
      <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Soft Shadow */}
        <ellipse cx="120" cy="220" rx="75" ry="14" fill="#35190E" opacity="0.12" />

        {/* Tail */}
        <path d="M185 160 C210 145 220 120 205 110 C195 105 185 125 180 145" stroke="#35190E" strokeWidth="4" fill="#D99545" strokeLinecap="round" />

        {/* Left Ear */}
        <ellipse cx="65" cy="80" rx="28" ry="38" fill="#D99545" transform="rotate(-20 65 80)" stroke="#35190E" strokeWidth="4" />
        <ellipse cx="65" cy="80" rx="18" ry="24" fill="#FFE9C9" transform="rotate(-20 65 80)" />

        {/* Right Ear */}
        <ellipse cx="175" cy="80" rx="28" ry="38" fill="#D99545" transform="rotate(20 175 80)" stroke="#35190E" strokeWidth="4" />
        <ellipse cx="175" cy="80" rx="18" ry="24" fill="#FFE9C9" transform="rotate(20 175 80)" />

        {/* Fluffy Body */}
        <ellipse cx="120" cy="170" rx="60" ry="52" fill="#F6D28B" stroke="#35190E" strokeWidth="4" />
        {/* Chest Fluff */}
        <ellipse cx="120" cy="170" rx="36" ry="32" fill="#FFF8EC" />

        {/* Fluffy Head */}
        <circle cx="120" cy="105" r="58" fill="#F6D28B" stroke="#35190E" strokeWidth="4" />

        {/* Cheeks */}
        <ellipse cx="85" cy="122" rx="12" ry="7" fill="#FFA5A5" opacity="0.8" />
        <ellipse cx="155" cy="122" rx="12" ry="7" fill="#FFA5A5" opacity="0.8" />

        {/* Cute Sparkly Eyes */}
        <circle cx="95" cy="100" r="8" fill="#35190E" />
        <circle cx="98" cy="97" r="2.5" fill="#FFFFFF" />
        <circle cx="93" cy="103" r="1.2" fill="#FFFFFF" />

        <circle cx="145" cy="100" r="8" fill="#35190E" />
        <circle cx="148" cy="97" r="2.5" fill="#FFFFFF" />
        <circle cx="143" cy="103" r="1.2" fill="#FFFFFF" />

        {/* Snout */}
        <ellipse cx="120" cy="118" rx="22" ry="16" fill="#FFF8EC" stroke="#35190E" strokeWidth="3" />
        {/* Heart Nose */}
        <path d="M115 112 C115 108 120 107 120 110 C120 107 125 108 125 112 C125 116 120 119 120 119 C120 119 115 116 115 112 Z" fill="#35190E" />
        {/* Smile */}
        <path d="M115 120 Q120 126 125 120" stroke="#35190E" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M120 118 L120 121" stroke="#35190E" strokeWidth="2.5" strokeLinecap="round" />

        {/* Front Paws */}
        <rect x="90" y="195" width="26" height="24" rx="12" fill="#F6D28B" stroke="#35190E" strokeWidth="3.5" />
        <line x1="98" y1="208" x2="98" y2="216" stroke="#35190E" strokeWidth="2" strokeLinecap="round" />
        <line x1="108" y1="208" x2="108" y2="216" stroke="#35190E" strokeWidth="2" strokeLinecap="round" />

        <rect x="124" y="195" width="26" height="24" rx="12" fill="#F6D28B" stroke="#35190E" strokeWidth="3.5" />
        <line x1="132" y1="208" x2="132" y2="216" stroke="#35190E" strokeWidth="2" strokeLinecap="round" />
        <line x1="142" y1="208" x2="142" y2="216" stroke="#35190E" strokeWidth="2" strokeLinecap="round" />

        {/* Cute Bowtie in Terracotta */}
        <path d="M108 142 L132 154 L132 142 L108 154 Z" fill="#A94E20" stroke="#35190E" strokeWidth="2" />
        <circle cx="120" cy="148" r="4.5" fill="#D99545" stroke="#35190E" strokeWidth="2" />
      </svg>
    </div>
  );
}

