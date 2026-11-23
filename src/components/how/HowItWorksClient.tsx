"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  FileText,
  Heart,
  MapPin,
  Plane,
  Search,
  ShieldCheck,
  Truck,
} from 'lucide-react';
import { ExactPoodleSVG } from '@/components/mascot/ExactPoodleSVG';

export function HowItWorksClient() {
  const [activeTab, setActiveTab] = useState<'dubai' | 'import'>('dubai');

  const localSteps = [
    {
      title: 'Explore our puppies',
      desc: 'Browse real puppy photos, videos, and details to find your match.',
      icon: Search,
    },
    {
      title: 'Choose your puppy',
      desc: 'Ask our team about your favorite pup, then reserve when you are ready.',
      icon: Heart,
    },
    {
      title: 'Meet before you choose',
      desc: 'Spend time with your puppy in person before making your decision.',
      icon: Calendar,
    },
    {
      title: 'Pick-up or delivery',
      desc: 'Pick up your puppy or have them delivered safely to your home.',
      icon: Truck,
    },
  ];

  const importSteps = [
    {
      title: 'Tell us your wishes',
      desc: 'Share your preferred breed, size, colour, and the kind of puppy you hope to meet.',
      icon: Search,
    },
    {
      title: 'Choose your puppy',
      desc: 'Review puppy profiles and meet your shortlisted puppy over a video call.',
      icon: Heart,
    },
    {
      title: 'Safe travel to Dubai',
      desc: 'We coordinate travel, required paperwork, and your puppy’s arrival.',
      icon: Plane,
    },
    {
      title: 'Welcome them home',
      desc: 'We guide you through collection, the first vet check, and settling in.',
      icon: Truck,
    },
  ];

  const currentSteps = activeTab === 'dubai' ? localSteps : importSteps;

  const trustPoints = [
    {
      title: 'Ethically selected breeders',
      desc: 'We work with trusted breeders who put puppy health and care first.',
      icon: Heart,
      color: 'text-toffee-deep border-toffee-deep',
    },
    {
      title: 'Full transparency',
      desc: 'Photos, videos, and health certificates are shared before your puppy travels.',
      icon: FileText,
      color: 'text-soft-green border-soft-green',
    },
    {
      title: 'Safe, stress-free delivery',
      desc: 'We handle the journey with care so your puppy arrives ready for home.',
      icon: ShieldCheck,
      color: 'text-cocoa-soft border-cocoa-soft',
    },
  ];

  const deliveryPoints = [
    {
      title: 'Take your puppy home the same day',
      desc: 'Local puppies are available to visit, fall in love, and take home together.',
    },
    {
      title: 'Delivery within Dubai',
      desc: 'Prefer to stay home? We deliver your puppy safely and comfortably to your door.',
    },
    {
      title: 'Safe international cargo',
      desc: 'We handle the paperwork and ensure comfortable travel to your puppy’s new home.',
    },
    {
      title: 'Worldwide delivery',
      desc: 'We safely deliver puppies to loving homes around the world with trusted partners.',
    },
  ];

  const reasons = [
    {
      title: 'International cargo',
      desc: 'We safely deliver puppies to loving homes around the world with trusted international cargo partners.',
      icon: Plane,
    },
    {
      title: 'Support 24/7',
      desc: 'Our team is available to answer your questions and guide you through every step.',
      icon: Calendar,
    },
    {
      title: 'Health guarantee',
      desc: 'Every puppy comes with a verified health certificate from licensed vets.',
      icon: CheckCircle2,
    },
  ];

  const whatsappUrl = `https://wa.me/971501234567?text=${encodeURIComponent('Hello TeddyPups UAE! I would like to know more about welcoming a puppy home.')}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fffaf1] via-[#fff0d3] to-[#f7d28f] text-chocolate">
      <div className="mx-auto max-w-[110rem] px-5 pb-12 pt-10 sm:px-8 sm:pt-14 lg:px-14">
        <header className="mb-10">
          <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <h1 className="font-serif text-5xl font-extrabold leading-[0.98] tracking-tight sm:text-7xl lg:text-8xl">
              How it works
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-cocoa-soft sm:text-base">
              Whether you choose to visit us locally or order a premium breed
              from overseas, TeddyPups is here to make the experience
              unforgettable.
            </p>
          </div>

          <nav aria-label="On this page" className="mt-5 flex flex-wrap gap-2">
            {[
              ['Two ways home', '#ways'],
              ['Our premium puppy promise', '#promise'],
              ['Delivery & collection', '#delivery'],
              ['Why choose us', '#why-us'],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="rounded-full border border-chocolate/70 bg-white/70 px-3 py-1.5 text-[11px] font-semibold transition-colors hover:bg-warm-yellow"
              >
                {label}
              </a>
            ))}
          </nav>
        </header>

        <section id="ways" className="scroll-mt-24 pb-10">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-hand text-base font-bold text-toffee-deep">choose your way</p>
              <h2 className="font-serif text-3xl font-extrabold leading-tight sm:text-4xl">
                Two ways home
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <div
                role="tablist"
                aria-label="Choose how to meet your puppy"
                className="inline-flex rounded-full border-2 border-chocolate bg-white/80 p-1 shadow-scrapbook"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'dubai'}
                  onClick={() => setActiveTab('dubai')}
                  className={`min-w-24 rounded-full px-4 py-2 text-center text-xs font-bold transition-colors ${
                    activeTab === 'dubai' ? 'bg-toffee-deep text-white' : 'text-chocolate'
                  }`}
                >
                  <span className="block">In Dubai</span>
                  <span className="block text-[9px] font-medium">meet in person</span>
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'import'}
                  onClick={() => setActiveTab('import')}
                  className={`min-w-24 rounded-full px-4 py-2 text-center text-xs font-bold transition-colors ${
                    activeTab === 'import' ? 'bg-toffee-deep text-white' : 'text-chocolate'
                  }`}
                >
                  <span className="block">Imported</span>
                  <span className="block text-[9px] font-medium">order upon request</span>
                </button>
              </div>
              <ExactPoodleSVG pose="sit" width={54} height={44} className="hidden sm:inline-block" />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 md:items-center">
            <div className="max-w-xl">
              <div className="mb-2 flex items-center gap-2 text-toffee-deep">
                {activeTab === 'dubai' ? (
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Plane className="h-4 w-4" aria-hidden="true" />
                )}
                <span className="font-hand text-sm font-bold">
                  {activeTab === 'dubai' ? 'Downtown Dubai' : 'Korea to Dubai'}
                </span>
              </div>
              <h3 className="mb-2 font-serif text-2xl font-extrabold sm:text-3xl">
                {activeTab === 'dubai'
                  ? 'Meet your puppy in person'
                  : 'A special puppy, brought to you'}
              </h3>
              <p className="max-w-[62ch] text-sm leading-relaxed text-cocoa-soft">
                {activeTab === 'dubai'
                  ? 'Step into our Downtown Dubai showroom and experience the joy of choosing your puppy face-to-face. We source healthy, well-socialized puppies from trusted local breeders, ensuring they are raised with care, proper nutrition, and veterinary checks.'
                  : 'Choose a premium puppy from our trusted overseas partners. We coordinate the journey, health documents, and arrival so your new friend can travel safely and settle into your home.'}
              </p>
            </div>

            <div className="relative mx-auto h-44 w-full max-w-[34rem] overflow-hidden rounded-2xl border-2 border-chocolate bg-white/30 shadow-scrapbook sm:h-52">
              <span className="absolute left-4 top-3 z-10 font-hand text-xs font-bold text-toffee-deep">
                {activeTab === 'dubai' ? 'Downtown Dubai' : 'A safe journey home'}
              </span>
              {activeTab === 'dubai' ? (
                <svg viewBox="0 0 640 280" className="absolute inset-0 h-full w-full" aria-hidden="true">
                  <circle cx="470" cy="90" r="42" fill="#f8c861" />
                  <path
                    d="M25 260h590M45 260v-78h34v78m18 0v-112h40v112m20 0v-61h24v61m68 0V139l8-10v-24l8-8 8 8v24l8 10v121m22 0v-80l29-21v101m22 0v-95l25 16v79m25 0v-69h34v69m17 0V94h29v166m19 0v-55h37v55m20 0v-78h44v78"
                    fill="none"
                    stroke="#2a170e"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.72"
                  />
                </svg>
              ) : (
                <svg viewBox="0 0 640 280" className="absolute inset-0 h-full w-full" aria-hidden="true">
                  <path
                    d="M54 230C190 42 430 44 578 190"
                    fill="none"
                    stroke="#a24a1a"
                    strokeWidth="4"
                    strokeDasharray="3 12"
                    strokeLinecap="round"
                  />
                  <circle cx="54" cy="230" r="7" fill="#a24a1a" />
                  <circle cx="578" cy="190" r="7" fill="#a24a1a" />
                  <text x="54" y="260" textAnchor="middle" fill="#5a3a28" fontSize="16">Korea</text>
                  <text x="578" y="220" textAnchor="middle" fill="#5a3a28" fontSize="16">Dubai</text>
                  <g transform="translate(330 75) rotate(12)">
                    <path d="M0 42h180l44 20-44 20H0c-22 0-35-9-35-20s13-20 35-20Z" fill="#fffdf8" stroke="#2a170e" strokeWidth="5" />
                    <path d="M65 42 94 0h36l-16 42m5 40 29 38h34l-14-38" fill="#c2622b" stroke="#2a170e" strokeWidth="5" />
                  </g>
                </svg>
              )}
            </div>
          </div>
        </section>

        <section
          aria-label="Adoption steps"
          className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {currentSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <article
                key={step.title}
                className="rounded-2xl border-2 border-chocolate bg-[#fffdf8] p-4 shadow-scrapbook transition-transform hover:-translate-y-1"
              >
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-light-peach text-toffee-deep">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </div>
                <p className="font-hand text-xs font-bold text-toffee-deep">Step {index + 1}</p>
                <h3 className="mb-1 font-serif text-base font-bold">{step.title}</h3>
                <p className="text-xs leading-relaxed text-cocoa-soft">{step.desc}</p>
              </article>
            );
          })}
        </section>

        <section
          id="promise"
          className="tp-how-promise mb-12 scroll-mt-24 rounded-2xl border-2 border-chocolate p-5 shadow-scrapbook sm:p-8 lg:p-10"
        >
          <p className="font-hand text-sm font-bold text-toffee-deep">puppy passport</p>
          <div className="grid gap-6 md:grid-cols-[0.85fr_1.5fr] md:items-center">
            <h2 className="font-serif text-3xl font-extrabold leading-tight sm:text-5xl">
              Our premium<br className="hidden sm:block" /> puppy promise
            </h2>
            <div className="grid gap-5 sm:grid-cols-3">
              {trustPoints.map((point) => {
                const Icon = point.icon;
                return (
                  <article key={point.title} className="flex flex-col items-center text-center">
                    <div className={`mb-3 flex h-16 w-16 items-center justify-center rounded-full border-2 ${point.color}`}>
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h3 className="mb-1 font-serif text-sm font-bold">{point.title}</h3>
                    <p className="max-w-[25ch] text-[11px] leading-relaxed text-cocoa-soft">
                      {point.desc}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="delivery" className="mb-12 scroll-mt-24 py-2">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="mb-3 font-serif text-3xl font-extrabold leading-tight sm:text-5xl">
                Delivery &amp;<br className="hidden sm:block" /> collection
              </h2>
              <p className="mb-6 max-w-xl text-sm leading-relaxed text-cocoa-soft">
                From a same-day visit in Downtown Dubai to a flight from Korea,
                every puppy travels comfortably and arrives safely.
              </p>
              <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
                {deliveryPoints.map((point) => (
                  <article key={point.title}>
                    <h3 className="mb-1 font-serif text-sm font-bold">{point.title}</h3>
                    <p className="text-xs leading-relaxed text-cocoa-soft">{point.desc}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="relative mx-auto h-48 w-full max-w-[38rem] sm:h-60">
              <svg viewBox="0 0 640 300" className="h-full w-full" aria-hidden="true">
                <path
                  d="M35 264h570M56 264v-78h25v78m17 0v-116h33v116m19 0v-58h21v58m60 0V142l8-9v-25l8-8 8 8v25l8 9v122m24 0v-82l27-19v101m24 0v-94l24 15v79m28 0v-73h32v73m18 0V96h28v168m20 0v-57h36v57m21 0v-82h43v82"
                  fill="none"
                  stroke="#2a170e"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.25"
                />
                <path
                  d="M78 242C180 92 410 80 558 183"
                  fill="none"
                  stroke="#a24a1a"
                  strokeWidth="4"
                  strokeDasharray="3 12"
                  strokeLinecap="round"
                />
                <circle cx="78" cy="242" r="7" fill="#a24a1a" />
                <circle cx="558" cy="183" r="7" fill="#a24a1a" />
                <text x="78" y="274" textAnchor="middle" fill="#5a3a28" fontSize="16">Korea</text>
                <text x="558" y="213" textAnchor="middle" fill="#5a3a28" fontSize="16">Dubai</text>
                <g transform="translate(350 92) rotate(10)">
                  <path d="M0 42h150l46 20-46 20H0c-23 0-36-9-36-20s13-20 36-20Z" fill="#fffdf8" stroke="#2a170e" strokeWidth="5" />
                  <path d="M56 42 85 1h35l-15 41m6 40 28 37h34l-14-37" fill="#c2622b" stroke="#2a170e" strokeWidth="5" />
                </g>
              </svg>
            </div>
          </div>
        </section>

        <section
          id="why-us"
          className="mb-12 grid scroll-mt-24 gap-8 border-t border-chocolate/20 py-8 lg:grid-cols-2 lg:items-start"
        >
          <div>
            <h2 className="mb-3 font-serif text-3xl font-extrabold sm:text-5xl">Why choose us</h2>
            <p className="max-w-xl text-sm leading-relaxed text-cocoa-soft">
              We’re here to help you find a new family member. From the moment
              you visit our site to the joyful day your puppy arrives at your
              door, we’re with you every step of the way.
            </p>
          </div>
          <div className="space-y-5">
            {reasons.map((reason) => {
              const Icon = reason.icon;
              return (
                <article key={reason.title} className="flex gap-3">
                  <Icon className="mt-1 h-5 w-5 shrink-0 text-toffee-deep" aria-hidden="true" />
                  <div>
                    <h3 className="font-serif text-sm font-bold">{reason.title}</h3>
                    <p className="text-xs leading-relaxed text-cocoa-soft">{reason.desc}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mb-2 flex flex-col gap-6 rounded-2xl border-2 border-chocolate bg-[#fffdf8] p-6 shadow-scrapbook sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="max-w-2xl">
            <h2 className="mb-2 font-serif text-2xl font-extrabold sm:text-3xl">
              Unique and high quality puppies
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-cocoa-soft">
              When you choose TeddyPups, you can trust that you’re getting a
              puppy of the highest quality. We’re here to answer your questions
              and help you find your new furry friend.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-chocolate bg-soft-green px-4 py-2 text-xs font-bold text-white shadow-scrapbook transition-transform hover:-translate-y-0.5"
              >
                Ask us on WhatsApp
              </a>
              <Link
                href="/puppies"
                className="inline-flex items-center gap-2 rounded-full border-2 border-chocolate bg-white px-4 py-2 text-xs font-bold text-chocolate transition-colors hover:bg-warm-yellow"
              >
                See available puppies
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="mx-auto sm:mx-0">
            <ExactPoodleSVG pose="walk" width={150} height={120} />
          </div>
        </section>
      </div>
    </div>
  );
}
