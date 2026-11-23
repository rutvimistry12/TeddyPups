"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePuppy } from '@/context/PuppyContext';
import { Puppy, QuizAnswer } from '@/lib/types';
import { X, Sparkles, Heart, ArrowRight, RotateCcw } from 'lucide-react';

export function PuppyQuizModal() {
  const { isQuizOpen, closeQuiz } = usePuppy();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [matches, setMatches] = useState<Puppy[]>([]);

  const [answers, setAnswers] = useState<QuizAnswer>({
    livingSpace: 'apartment',
    activityLevel: 'calm_lap_cuddles',
    preferredSize: 'micro_teacup',
    familyType: 'family_with_kids',
    hypoallergenicImportant: true,
    budgetRange: 'premium',
  });

  if (!isQuizOpen) return null;

  const handleNext = async () => {
    if (step < 6) {
      setStep(step + 1);
    } else {
      // Calculate matches via API
      setLoading(true);
      try {
        const res = await fetch('/api/quiz-recommend', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(answers),
        });
        const data = await res.json();
        setMatches(data.puppies || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
        setStep(7); // Results step
      }
    }
  };

  const resetQuiz = () => {
    setStep(1);
    setMatches([]);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-dark-brown/60 backdrop-blur-sm flex justify-center items-center p-3 sm:p-6 animate-in fade-in">
      <div className="bg-cream border-3 border-chocolate rounded-4xl shadow-scrapbook-xl w-full max-w-2xl relative p-6 sm:p-10">
        
        {/* Close Button */}
        <button
          onClick={closeQuiz}
          className="absolute top-5 right-5 p-2 rounded-full bg-light-peach border-2 border-chocolate hover:bg-warm-yellow transition-colors"
        >
          <X className="w-5 h-5 text-chocolate" />
        </button>

        {/* Step Counter */}
        {step <= 6 && (
          <div className="mb-6 flex items-center justify-between">
            <span className="text-xs uppercase tracking-widest font-bold text-terracotta bg-light-peach px-3 py-1 rounded-full border border-chocolate">
              Question {step} of 6
            </span>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className={`h-2.5 rounded-full transition-all ${
                    i <= step ? 'w-6 bg-caramel border border-chocolate' : 'w-2.5 bg-chocolate/20'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Content By Step */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="font-serif text-3xl font-bold text-chocolate mb-2">What is your living environment?</h3>
              <p className="text-sm text-chocolate/70">Different puppy temperaments thrive in different living spaces in the UAE.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { key: 'apartment', label: '🏙️ Luxury Apartment', desc: 'Downtown, Marina, DIFC, etc.' },
                { key: 'villa_with_garden', label: '🏡 Villa with Garden', desc: 'Jumeirah, Dubai Hills, Palm, etc.' },
                { key: 'penthouse', label: '✨ Penthouse / Terrace', desc: 'Spacious high-rise with balcony' },
              ].map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setAnswers({ ...answers, livingSpace: opt.key as any })}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${
                    answers.livingSpace === opt.key
                      ? 'bg-warm-yellow border-chocolate shadow-scrapbook scale-102'
                      : 'bg-white border-chocolate/40 hover:border-chocolate'
                  }`}
                >
                  <p className="font-bold text-chocolate text-sm mb-1">{opt.label}</p>
                  <p className="text-xs text-chocolate/70">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="font-serif text-3xl font-bold text-chocolate mb-2">Desired activity level?</h3>
              <p className="text-sm text-chocolate/70">From peaceful couch snugglers to cheerful garden runners.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { key: 'calm_lap_cuddles', label: '🧸 Calm Lap Puppy', desc: 'Content sleeping, mellow cuddles' },
                { key: 'moderate_walks', label: '🐾 Balanced & Playful', desc: 'Loves short strolls and toy time' },
                { key: 'playful_energetic', label: '⚡ Active & Spirited', desc: 'High enthusiasm and tricks' },
              ].map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setAnswers({ ...answers, activityLevel: opt.key as any })}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${
                    answers.activityLevel === opt.key
                      ? 'bg-warm-yellow border-chocolate shadow-scrapbook scale-102'
                      : 'bg-white border-chocolate/40 hover:border-chocolate'
                  }`}
                >
                  <p className="font-bold text-chocolate text-sm mb-1">{opt.label}</p>
                  <p className="text-xs text-chocolate/70">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="font-serif text-3xl font-bold text-chocolate mb-2">Preferred puppy size?</h3>
              <p className="text-sm text-chocolate/70">All our breeds stay compact and easily travel-friendly.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { key: 'micro_teacup', label: '👜 Micro Teacup', desc: '1.2 - 2.0 kg adult weight' },
                { key: 'toy', label: '🧸 Classic Toy', desc: '2.0 - 3.5 kg adult weight' },
                { key: 'miniature', label: '🐕 Compact Mini', desc: '3.5 - 6.5 kg adult weight' },
              ].map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setAnswers({ ...answers, preferredSize: opt.key as any })}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${
                    answers.preferredSize === opt.key
                      ? 'bg-warm-yellow border-chocolate shadow-scrapbook scale-102'
                      : 'bg-white border-chocolate/40 hover:border-chocolate'
                  }`}
                >
                  <p className="font-bold text-chocolate text-sm mb-1">{opt.label}</p>
                  <p className="text-xs text-chocolate/70">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <div>
              <h3 className="font-serif text-3xl font-bold text-chocolate mb-2">Who lives in your home?</h3>
              <p className="text-sm text-chocolate/70">Helps us recommend puppies socialized for your household dynamic.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { key: 'single_couple', label: '🥂 Single or Couple', desc: 'Dedicated intimate companion' },
                { key: 'family_with_kids', label: '👨‍👩‍👧‍👦 Family with Children', desc: 'Gentle, tolerant, loving buddy' },
                { key: 'frequent_traveler', label: '✈️ Frequent Traveler', desc: 'Fits comfortably in cabin tote' },
              ].map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setAnswers({ ...answers, familyType: opt.key as any })}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${
                    answers.familyType === opt.key
                      ? 'bg-warm-yellow border-chocolate shadow-scrapbook scale-102'
                      : 'bg-white border-chocolate/40 hover:border-chocolate'
                  }`}
                >
                  <p className="font-bold text-chocolate text-sm mb-1">{opt.label}</p>
                  <p className="text-xs text-chocolate/70">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-6">
            <div>
              <h3 className="font-serif text-3xl font-bold text-chocolate mb-2">Is hypoallergenic hair essential?</h3>
              <p className="text-sm text-chocolate/70">Non-shedding coat for allergy sufferers.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setAnswers({ ...answers, hypoallergenicImportant: true })}
                className={`p-5 rounded-2xl border-2 text-left transition-all ${
                  answers.hypoallergenicImportant === true
                    ? 'bg-warm-yellow border-chocolate shadow-scrapbook'
                    : 'bg-white border-chocolate/40'
                }`}
              >
                <p className="font-bold text-chocolate text-base mb-1">🌿 Yes, 100% Hypoallergenic Non-Shedding</p>
                <p className="text-xs text-chocolate/70">We prioritize Poodles, Maltipoos, Bichons with zero dander shed.</p>
              </button>
              <button
                type="button"
                onClick={() => setAnswers({ ...answers, hypoallergenicImportant: false })}
                className={`p-5 rounded-2xl border-2 text-left transition-all ${
                  answers.hypoallergenicImportant === false
                    ? 'bg-warm-yellow border-chocolate shadow-scrapbook'
                    : 'bg-white border-chocolate/40'
                }`}
              >
                <p className="font-bold text-chocolate text-base mb-1">☁️ No Allergies (Any breed welcome!)</p>
                <p className="text-xs text-chocolate/70">Happy to consider fluffy Boo Pomeranians or French Bulldogs.</p>
              </button>
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="space-y-6">
            <div>
              <h3 className="font-serif text-3xl font-bold text-chocolate mb-2">Preferred investment range?</h3>
              <p className="text-sm text-chocolate/70">All prices include UAE health passport, vaccines, and microchip.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { key: 'standard', label: '11,000 - 13,000 AED', desc: 'Classic pedigreed companions' },
                { key: 'premium', label: '13,500 - 15,500 AED', desc: 'Coveted colors & micro sizes' },
                { key: 'ultra_exclusive', label: '16,000+ AED', desc: 'Rare champion European imports' },
              ].map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setAnswers({ ...answers, budgetRange: opt.key as any })}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${
                    answers.budgetRange === opt.key
                      ? 'bg-warm-yellow border-chocolate shadow-scrapbook scale-102'
                      : 'bg-white border-chocolate/40 hover:border-chocolate'
                  }`}
                >
                  <p className="font-bold text-chocolate text-sm mb-1">{opt.label}</p>
                  <p className="text-xs text-chocolate/70">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 7: Results */}
        {step === 7 && (
          <div className="space-y-6 animate-in fade-in">
            <div className="text-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-soft-green/20 text-soft-green font-bold text-xs uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" /> Perfect Match Found!
              </span>
              <h3 className="font-serif text-3xl font-bold text-chocolate">Meet Your Recommended Puppies</h3>
              <p className="text-xs text-chocolate/60 max-w-md mx-auto mt-1">
                Based on your lifestyle and preferences. Note: This recommendation is for personal lifestyle alignment and not a veterinary assessment.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {matches.map((pup) => (
                <div key={pup.id} className="bg-white border-2 border-chocolate rounded-2xl p-3 shadow-scrapbook flex flex-col justify-between">
                  <div className="relative w-full h-36 rounded-xl overflow-hidden border border-chocolate mb-2 bg-light-peach">
                    <Image
                      src={pup.images[0]?.url || "https://images.unsplash.com/photo-1546527813-25509cfa3da0?auto=format&fit=crop&w=400&q=80"}
                      alt={pup.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-chocolate text-lg">{pup.name}</h4>
                    <p className="text-xs text-terracotta font-semibold">{pup.breedName}</p>
                    <p className="text-xs font-bold text-chocolate mt-1">{pup.priceAED.toLocaleString()} AED</p>
                  </div>
                  <Link
                    href={`/puppies/${pup.slug}`}
                    onClick={closeQuiz}
                    className="mt-3 w-full py-1.5 px-3 rounded-lg bg-warm-yellow border border-chocolate text-chocolate font-bold text-xs flex items-center justify-center gap-1 hover:bg-caramel hover:text-white transition-colors"
                  >
                    View Puppy <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-dashed border-caramel/40">
              <button
                onClick={resetQuiz}
                className="flex items-center gap-1 text-xs font-bold text-terracotta hover:underline"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Retake Quiz
              </button>
              <Link
                href="/puppies"
                onClick={closeQuiz}
                className="py-2 px-5 rounded-full bg-soft-green text-white border-2 border-chocolate font-bold text-xs hover:opacity-90"
              >
                Browse All Available Pups &rarr;
              </Link>
            </div>
          </div>
        )}

        {/* Bottom Next Button for Steps 1-6 */}
        {step <= 6 && (
          <div className="mt-8 flex justify-between items-center pt-4 border-t border-dashed border-caramel/40">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="text-xs font-bold text-chocolate/70 hover:text-chocolate hover:underline"
              >
                &larr; Back
              </button>
            ) : <div />}
            <button
              type="button"
              disabled={loading}
              onClick={handleNext}
              className="py-3 px-8 rounded-full bg-terracotta text-white border-2 border-chocolate font-bold text-sm shadow-scrapbook hover:bg-caramel transition-colors flex items-center gap-2"
            >
              {loading ? 'Finding Best Matches...' : step === 6 ? 'See My Matches ✨' : 'Continue'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

