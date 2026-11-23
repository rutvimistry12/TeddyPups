"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Puppy } from '@/lib/types';
import { usePuppy } from '@/context/PuppyContext';
import { Heart, Scale, Video, MessageCircle, ArrowRight, Sparkles, Check } from 'lucide-react';
import { TapeStrip, PawPrint } from '@/components/illustrations/PuppyDoodles';

interface PuppyCardProps {
  puppy: Puppy;
  tape?: boolean;
  rotate?: number;
  catalogPhoto?: boolean;
  photoIndex?: number;
}

const catalogPhotoTones = [
  'bg-[#f3d9a1]',
  'bg-[#d6e8f4]',
  'bg-[#f6d5ca]',
  'bg-[#e9d8bd]',
  'bg-[#dce7ca]',
];

export function PuppyCard({
  puppy,
  tape = false,
  rotate = 0,
  catalogPhoto = false,
  photoIndex = 0,
}: PuppyCardProps) {
  const { isFavorite, toggleFavorite, addToCompare, isComparing } = usePuppy();
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const [photoRevealed, setPhotoRevealed] = useState(false);
  const photoFrameRef = useRef<HTMLDivElement>(null);

  const favorited = isFavorite(puppy.id);
  const comparing = isComparing(puppy.id);
  const hasVideo = puppy.videos && puppy.videos.length > 0;

  useEffect(() => {
    if (!catalogPhoto || !photoFrameRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPhotoRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(photoFrameRef.current);
    return () => observer.disconnect();
  }, [catalogPhoto]);

  const whatsappMessage = encodeURIComponent(
    `Hello TeddyPups UAE! I am interested in ${puppy.name}, the ${puppy.breedName} puppy (${puppy.priceAED.toLocaleString()} AED) listed on your website. Could you please share more details or arrange a private viewing?`
  );

  const statusColors = {
    AVAILABLE: 'bg-soft-green text-white',
    RESERVED: 'bg-warm-yellow text-chocolate',
    PENDING: 'bg-caramel text-white',
    GONE_HOME: 'bg-chocolate/80 text-white',
  };

  const statusLabels = {
    AVAILABLE: 'Available for Adoption',
    RESERVED: 'Reserved for VIP Family',
    PENDING: 'Application Pending',
    GONE_HOME: 'Happily Gone Home',
  };

  return (
    <div
      className="group relative bg-white border-2 border-chocolate rounded-4xl p-4 sm:p-5 shadow-scrapbook hover:shadow-scrapbook-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
      style={{ transform: rotate ? `rotate(${rotate}deg)` : undefined }}
    >
      {/* Tape decoration if enabled */}
      {tape && <TapeStrip className="-top-3 left-1/2 -translate-x-1/2" />}

      <div>
        {/* Image Box */}
        <div
          ref={photoFrameRef}
          className={`relative w-full mb-4 ${
            catalogPhoto
              ? 'mx-auto aspect-square max-w-[15rem] overflow-visible'
              : 'h-64 rounded-3xl overflow-hidden border-2 border-chocolate bg-light-peach'
          }`}
        >
          {catalogPhoto && (
            <div
              className={`absolute inset-[7%] rounded-full ${
                catalogPhotoTones[photoIndex % catalogPhotoTones.length]
              } -rotate-6 shadow-[3px_5px_0_rgba(42,23,14,0.12)]`}
            />
          )}

          <div
            className={`absolute overflow-hidden bg-light-peach ${
              catalogPhoto
                ? 'inset-[6%] rounded-full border border-chocolate/25'
                : 'inset-0 rounded-3xl'
            }`}
          >
            <Image
              src={puppy.images[currentImgIdx]?.url || "https://images.unsplash.com/photo-1546527813-25509cfa3da0?auto=format&fit=crop&w=600&q=80"}
              alt={puppy.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          {catalogPhoto && (
            <svg
              viewBox="0 0 300 300"
              className={`puppy-catalog-doodle absolute inset-0 z-[1] h-full w-full ${
                photoRevealed ? 'is-visible' : ''
              }`}
              aria-hidden="true"
            >
              <path
                pathLength="1"
                d="M151 13C226 12 285 69 288 145C292 222 232 284 156 288C77 292 15 232 12 155C9 78 71 17 151 13Z"
                className="puppy-catalog-doodle__stroke"
                style={{ animationDelay: `${Math.min(photoIndex * 55, 330)}ms` }}
              />
              <path
                pathLength="1"
                d="M147 19C222 16 280 76 282 150C285 222 225 279 151 282C78 285 21 225 18 153C15 80 75 23 147 19Z"
                className="puppy-catalog-doodle__stroke puppy-catalog-doodle__stroke--accent"
                style={{ animationDelay: `${Math.min(photoIndex * 55 + 180, 510)}ms` }}
              />
            </svg>
          )}

          {/* Status Badge */}
          <div
            className={`absolute z-10 ${
              catalogPhoto ? 'top-[5%] right-[-2%]' : 'top-3 left-3'
            }`}
          >
            <span className={`text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border border-chocolate shadow-xs ${statusColors[puppy.status] || 'bg-chocolate text-white'}`}>
              {statusLabels[puppy.status] || puppy.status}
            </span>
          </div>

          {/* Video Indicator */}
          {hasVideo && (
            <div className="absolute bottom-3 left-3 z-10 bg-dark-brown/85 backdrop-blur-xs text-cream text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-cream/30">
              <Video className="w-3.5 h-3.5 text-warm-yellow animate-pulse" />
              <span>Video Available</span>
            </div>
          )}

          {/* Quick Actions (Favorite & Compare) */}
          <div
            className={`absolute top-3 z-10 flex flex-col gap-2 ${
              catalogPhoto ? 'left-3' : 'right-3'
            }`}
          >
            <button
              onClick={() => toggleFavorite(puppy.id)}
              className="w-9 h-9 rounded-full bg-white/95 backdrop-blur-xs border-2 border-chocolate flex items-center justify-center text-chocolate hover:scale-110 active:scale-95 transition-all shadow-xs"
              title={favorited ? "Remove from favorites" : "Save to favorites"}
            >
              <Heart className={`w-4 h-4 ${favorited ? 'fill-terracotta text-terracotta' : 'text-chocolate'}`} />
            </button>

            <button
              onClick={() => addToCompare(puppy)}
              className={`w-9 h-9 rounded-full border-2 border-chocolate flex items-center justify-center transition-all shadow-xs ${
                comparing
                  ? 'bg-warm-yellow text-chocolate scale-105'
                  : 'bg-white/95 backdrop-blur-xs text-chocolate hover:scale-110'
              }`}
              title="Compare with other puppies"
            >
              <Scale className="w-4 h-4" />
            </button>
          </div>

          {/* Multi-image indicator dots if multiple */}
          {puppy.images.length > 1 && (
            <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 bg-chocolate/60 px-2 py-1 rounded-full backdrop-blur-xs">
              {puppy.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentImgIdx(idx);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentImgIdx === idx ? 'bg-warm-yellow w-4' : 'bg-white/70'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Header Information */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <h3 className="font-serif text-2xl font-bold text-chocolate group-hover:text-terracotta transition-colors flex items-center gap-2">
              {puppy.name}
              {puppy.isFeatured && (
                <span title="Featured Puppy">
                  <Sparkles className="w-4 h-4 text-warm-yellow fill-warm-yellow" />
                </span>
              )}
            </h3>
            <p className="text-sm font-bold text-terracotta">{puppy.breedName}</p>
          </div>
          <div className="text-right">
            <span className="font-serif text-xl font-extrabold text-chocolate block">
              {puppy.priceAED.toLocaleString()} AED
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-caramel">
              Health Included
            </span>
          </div>
        </div>

        {/* Quick Badges */}
        <div className="flex flex-wrap gap-1.5 mb-3 text-xs">
          <span className="px-2.5 py-1 rounded-xl bg-light-peach border border-chocolate/30 text-chocolate font-medium">
            {puppy.gender === 'MALE' ? '♂ Boy' : '♀ Girl'} &middot; {puppy.ageWeeks} wks
          </span>
          <span className="px-2.5 py-1 rounded-xl bg-cream border border-chocolate/30 text-chocolate font-medium">
            {puppy.color}
          </span>
          <span className="px-2.5 py-1 rounded-xl bg-cream border border-chocolate/30 text-chocolate font-medium">
            {puppy.origin === 'LOCAL_DUBAI' ? '🇦🇪 Dubai Nursery' : '✈️ Imported'}
          </span>
        </div>

        {/* Personality Story Quote */}
        <p className="text-xs text-chocolate/80 leading-relaxed italic mb-4 line-clamp-2 bg-cream/60 p-2.5 rounded-2xl border border-dashed border-caramel/40">
          &ldquo;{puppy.personality}&rdquo;
        </p>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-dashed border-chocolate/15">
        <Link
          href={`/puppies/${puppy.slug}`}
          className="flex items-center justify-center gap-1 py-2.5 px-3 rounded-2xl bg-warm-yellow hover:bg-caramel hover:text-white border-2 border-chocolate text-chocolate font-bold text-xs tracking-wide transition-all shadow-xs"
        >
          <span>Meet {puppy.name}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        <a
          href={`https://wa.me/971501234567?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white border-2 border-chocolate font-bold text-xs tracking-wide transition-all shadow-xs"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>Ask on WhatsApp</span>
        </a>
      </div>
    </div>
  );
}

