"use client";

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { FAQItem } from '@/lib/types';
import { ArrowRight, ChevronDown, MessageCircle, PawPrint, Search, X } from 'lucide-react';

interface FAQClientProps {
  initialFaqs: FAQItem[];
}

const CATEGORIES = [
  'ALL',
  'Puppy Health',
  'Reservations',
  'Payments',
  'Delivery',
  'Imported Puppies',
  'Breeds',
  'Aftercare',
];

const PIN_COLORS = ['#c2622b', '#4b83a6', '#e4b83f', '#bd7187'];
const NOTE_LAYOUTS = [
  'ml-[7%] w-[88%] rotate-[-0.4deg]',
  'ml-[16%] w-[78%] rotate-[0.45deg]',
  'ml-[10%] w-[84%] rotate-[-0.3deg]',
  'ml-[21%] w-[73%] rotate-[0.35deg]',
];

export function FAQClient({ initialFaqs }: FAQClientProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [openIds, setOpenIds] = useState<string[]>([]);

  const filteredFaqs = useMemo(
    () =>
      initialFaqs.filter((faq) => {
        if (selectedCategory !== 'ALL' && faq.category !== selectedCategory) return false;
        if (!search.trim()) return true;

        const query = search.toLowerCase().trim();
        return (
          faq.question.toLowerCase().includes(query) ||
          faq.answer.toLowerCase().includes(query)
        );
      }),
    [initialFaqs, selectedCategory, search],
  );

  const toggle = (id: string) => {
    setOpenIds((current) =>
      current.includes(id)
        ? current.filter((openId) => openId !== id)
        : [...current, id],
    );
  };

  const resetFilters = () => {
    setSearch('');
    setSelectedCategory('ALL');
  };

  return (
    <div className="tp-faq-page relative min-h-[calc(100vh-7rem)] overflow-hidden px-4 py-10 text-[#fffdf8] sm:px-8 sm:py-14 lg:px-12">
      <div aria-hidden="true" className="tp-faq-stars">
        <span>✦</span>
        <span>✦</span>
        <span>✦</span>
        <span>✦</span>
        <span>✦</span>
      </div>

      <div className="relative z-10 mx-auto grid max-w-[110rem] gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start lg:gap-12">
        <section className="pt-1 lg:pt-4">
          <h1 className="mb-4 max-w-[8ch] font-serif text-5xl font-extrabold leading-[0.9] tracking-tight text-[#fffdf8] sm:text-6xl lg:text-7xl">
            Questions
            <br />
            &amp; answers
          </h1>
          <p className="mb-6 max-w-md text-sm leading-relaxed text-white/85">
            Can&apos;t find what you&apos;re looking for? Message us on WhatsApp —
            our team is available 24/7.
          </p>

          <div className="mb-4 space-y-3">
            <label className="relative block max-w-sm">
              <Search
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-chocolate/55"
                aria-hidden="true"
              />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search questions"
                className="w-full rounded-xl border-2 border-chocolate/80 bg-[#fffdf8] py-2.5 pl-10 pr-10 text-sm text-chocolate shadow-sm outline-none placeholder:text-chocolate/45 focus:border-toffee"
                aria-label="Search frequently asked questions"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-chocolate/55 hover:text-chocolate"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </label>

            <select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              className="w-full max-w-sm rounded-xl border-2 border-chocolate/80 bg-[#fffdf8] px-3 py-2.5 text-sm text-chocolate shadow-sm outline-none focus:border-toffee"
              aria-label="Filter questions by category"
            >
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category === 'ALL' ? 'All topics' : category}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={`https://wa.me/971501234567?text=${encodeURIComponent("Hello TeddyPups UAE! I was reading your FAQ and had an unanswered question.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-chocolate bg-[#287b52] px-4 py-2.5 text-xs font-bold text-white shadow-scrapbook transition-transform hover:-translate-y-0.5"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Ask on WhatsApp
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/60 px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-white/10"
            >
              Contact us
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </section>

        <section
          aria-label="Frequently asked questions"
          className="tp-faq-board relative mt-2 rounded-xl border-2 border-[#2a170e] p-4 shadow-[8px_10px_0_rgba(36,17,8,0.3)] sm:p-6 lg:mt-36"
        >
          <div className="mb-4 flex items-center justify-between gap-3 text-[11px] font-semibold text-[#4c2b17]">
            <span>{filteredFaqs.length} questions</span>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setOpenIds(filteredFaqs.map((faq) => faq.id))}
                className="underline underline-offset-2 hover:text-toffee-deep"
              >
                Expand all
              </button>
              <button
                type="button"
                onClick={() => setOpenIds([])}
                className="underline underline-offset-2 hover:text-toffee-deep"
              >
                Collapse all
              </button>
            </div>
          </div>

          {filteredFaqs.length > 0 ? (
            <div className="space-y-2.5">
              {filteredFaqs.map((faq, index) => {
                const isOpen = openIds.includes(faq.id);
                const questionId = `faq-question-${faq.id}`;
                const answerId = `faq-answer-${faq.id}`;

                return (
                  <article
                    key={faq.id}
                    className={`tp-faq-note relative overflow-visible bg-[#fffdf8] shadow-[2px_3px_0_rgba(42,23,14,0.34)] ${
                      NOTE_LAYOUTS[index % NOTE_LAYOUTS.length]
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className="tp-faq-pin"
                      style={{ backgroundColor: PIN_COLORS[index % PIN_COLORS.length] }}
                    />
                    <button
                      id={questionId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                      onClick={() => toggle(faq.id)}
                      className="flex w-full items-center justify-between gap-3 px-3 py-2.5 text-left font-serif text-xs font-bold leading-snug text-chocolate sm:px-4 sm:text-sm"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 text-toffee transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                    {isOpen && (
                      <div
                        id={answerId}
                        role="region"
                        aria-labelledby={questionId}
                        className="border-t border-dashed border-caramel/50 px-3 pb-3 pt-2 text-xs leading-relaxed text-cocoa-soft sm:px-4"
                      >
                        {faq.answer}
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-chocolate/50 bg-[#fffdf8]/80 p-6 text-center text-chocolate">
              <PawPrint className="mx-auto mb-2 h-8 w-8 text-toffee" aria-hidden="true" />
              <h2 className="font-serif text-lg font-bold">No questions found</h2>
              <p className="mt-1 text-xs text-cocoa-soft">
                Try another topic or ask our team directly.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-3 rounded-full border border-chocolate px-4 py-1.5 text-xs font-bold hover:bg-warm-yellow"
              >
                Reset filters
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
