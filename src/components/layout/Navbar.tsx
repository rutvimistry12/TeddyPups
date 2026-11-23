"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PawPrint } from '@/components/illustrations/PuppyDoodles';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/puppies', label: 'Puppies' },
    { href: '/happy-families', label: 'Happy families' },
    { href: '/how-it-works', label: 'How it works' },
    { href: '/faq', label: 'FAQ' },
    { href: '/contact', label: 'Visit & contact' },
  ];

  const whatsappUrl = `https://wa.me/971501234567?text=${encodeURIComponent("Hello TeddyPups UAE! I am exploring your boutique website and would love to speak with a puppy concierge.")}`;

  return (
    <header className="sticky top-0 z-40 w-full bg-white transition-all shadow-xs">
      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo - real TeddyPups logo from live site */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-full border-2 border-chocolate/80 flex items-center justify-center bg-[#FFF8EC] shadow-xs group-hover:scale-105 transition-transform overflow-hidden">
              <Image
                src="/brand/logo.png"
                alt="TeddyPups UAE"
                className="w-full h-full object-contain"
                width={44}
                height={44}
              />
            </div>
            <span className="font-serif text-2xl sm:text-3xl font-extrabold tracking-tight text-chocolate block">
              TeddyPups
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7 xl:space-x-9">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm tracking-wide transition-all relative flex flex-col items-center py-1 ${
                    isActive
                      ? 'text-[#A94E20] font-bold'
                      : 'text-[#35190E] hover:text-[#A94E20] font-medium'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="text-[#A94E20] mt-0.5">
                      <PawPrint className="w-2.5 h-2.5 fill-current" />
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: WhatsApp us button matching reference screenshot */}
          <div className="hidden sm:flex items-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center bg-[#287B52] hover:bg-[#206342] text-white px-6 py-2.5 rounded-full border-2 border-chocolate font-bold text-sm tracking-wide shadow-xs hover:-translate-y-0.5 transition-all"
            >
              WhatsApp us
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-full bg-[#287B52] text-white text-xs font-bold border-2 border-chocolate"
            >
              WhatsApp
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-light-peach border-2 border-chocolate text-chocolate"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Exact header hem SVG from live site (tp-header__hem pattern) */}
      <div className="relative w-full" style={{ height: '14px' }}>
        <svg
          aria-hidden="true"
          height="14"
          preserveAspectRatio="none"
          width="100%"
          style={{ display: 'block', position: 'absolute', top: 0, left: 0 }}
        >
          <defs>
            <pattern height="14" id="tp-hem" patternUnits="userSpaceOnUse" width="44">
              <path d="M0 0H44V2A22 11 0 0 1 0 2Z" fill="white" />
              <path d="M0 2A22 11 0 0 0 44 2" fill="none" stroke="#2a170e" strokeWidth="1.5" opacity="0.25" />
            </pattern>
          </defs>
          <rect fill="url(#tp-hem)" height="14" width="100%" />
        </svg>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white border-b-2 border-chocolate px-6 py-6 space-y-3 animate-in slide-in-from-top">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-xl font-bold text-sm border-2 ${
                pathname === link.href
                  ? 'bg-warm-yellow border-chocolate text-chocolate shadow-scrapbook'
                  : 'bg-white border-chocolate/30 text-chocolate'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
