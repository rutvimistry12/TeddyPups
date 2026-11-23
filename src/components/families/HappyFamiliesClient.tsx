"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Testimonial } from '@/lib/types';
import { Star, X, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { TapeStrip, DoodleHeart } from '@/components/illustrations/PuppyDoodles';
import { ExactPoodleSVG } from '@/components/mascot/ExactPoodleSVG';

interface HappyFamiliesClientProps {
  testimonials: Testimonial[];
}

const FAMILY_SNAPSHOTS = [
  { src: '/images/families/family_0.jpg', caption: 'A new best friend' },
  { src: '/images/families/family_1.jpg', caption: 'Puppy cuddles at home' },
  { src: '/images/families/family_2.jpg', caption: 'Little paws, big love' },
  { src: '/images/families/family_3.jpg', caption: 'A day to remember' },
  { src: '/images/families/family_4.jpg', caption: 'Home together' },
  { src: '/images/families/family_5.jpg', caption: 'Our newest family member' },
  { src: '/images/families/family_6.jpg', caption: 'A forever kind of love' },
  { src: '/images/families/family_7.jpg', caption: 'The best hello' },
];

interface FamilyWallPhoto {
  id: string;
  src: string;
  alt: string;
  caption: string;
  city?: string;
  kind: 'snapshot' | 'testimonial';
  testimonialIndex?: number;
}

export function HappyFamiliesClient({ testimonials }: HappyFamiliesClientProps) {
  const [selectedBreedFilter, setSelectedBreedFilter] = useState('ALL');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [selectedSnapshot, setSelectedSnapshot] = useState<FamilyWallPhoto | null>(null);

  const breeds = Array.from(new Set(testimonials.map((t) => t.breedName)));

  const filtered = testimonials.filter((t) => {
    if (selectedBreedFilter !== 'ALL' && t.breedName !== selectedBreedFilter) return false;
    return true;
  });

  const activeTestimonial = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  const wallPhotos: FamilyWallPhoto[] = [
    ...filtered.flatMap((item, testimonialIndex) =>
      (item.images.length > 0
        ? item.images
        : [{ id: `${item.id}-fallback`, url: '', altText: item.puppyName }]
      ).map((image) => ({
        id: `${item.id}-${image.id}`,
        src: image.url || '/images/families/family_0.jpg',
        alt: image.altText || `${item.puppyName} with their family`,
        caption: item.puppyName,
        city: item.city,
        kind: 'testimonial' as const,
        testimonialIndex,
      })),
    ),
    ...(selectedBreedFilter === 'ALL'
      ? FAMILY_SNAPSHOTS.map((photo, index) => ({
          id: `family-snapshot-${index}`,
          src: photo.src,
          alt: photo.caption,
          caption: photo.caption,
          kind: 'snapshot' as const,
        }))
      : []),
  ];

  const nextLightbox = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filtered.length);
  };

  const prevLightbox = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length);
  };

  const openPhoto = (photo: FamilyWallPhoto) => {
    if (photo.kind === 'testimonial' && photo.testimonialIndex !== undefined) {
      setSelectedSnapshot(null);
      setLightboxIndex(photo.testimonialIndex);
      return;
    }

    setLightboxIndex(null);
    setSelectedSnapshot(photo);
  };

  return (
    <div className="tp-family-wall min-h-screen py-10 sm:py-14">
      <div className="mx-auto max-w-[110rem] px-4 sm:px-8 lg:px-12">
        <header className="mb-8 grid gap-6 lg:grid-cols-[1fr_minmax(18rem,25rem)] lg:items-end">
          <div>
            <p className="font-hand text-lg font-bold text-toffee-deep sm:text-xl">
              our small family archive
            </p>
            <h1 className="mb-3 flex flex-wrap items-center gap-3 font-serif text-4xl font-extrabold leading-none text-chocolate sm:text-6xl">
              Happy families
              <DoodleHeart className="h-7 w-7 text-terracotta sm:h-9 sm:w-9" />
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-chocolate/80 sm:text-base">
              Nothing makes us happier than seeing our puppies in loving homes.
              Here are some beautiful moments shared by our amazing clients
              after welcoming their furry friends.
            </p>
          </div>
          <aside className="rounded-2xl border-2 border-chocolate/70 bg-white/70 p-4 text-sm italic leading-relaxed text-chocolate shadow-scrapbook">
            Every photo marks a new beginning. Thank you to all the families
            who welcomed a TeddyPup home.
          </aside>
        </header>

        <div className="mb-7 flex flex-col gap-4 border-b border-chocolate/20 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedBreedFilter('ALL')}
            className={`rounded-full border-2 px-4 py-2 text-xs font-bold transition-all ${
              selectedBreedFilter === 'ALL'
                ? 'bg-warm-yellow border-chocolate text-chocolate shadow-scrapbook'
                : 'bg-white/80 border-chocolate/30 text-chocolate hover:border-chocolate'
            }`}
          >
            All stories ({testimonials.length})
          </button>
          {breeds.map((b) => (
            <button
              key={b}
              onClick={() => setSelectedBreedFilter(b)}
              className={`rounded-full border-2 px-4 py-2 text-xs font-bold transition-all ${
                selectedBreedFilter === b
                  ? 'bg-warm-yellow border-chocolate text-chocolate shadow-scrapbook'
                  : 'bg-white/80 border-chocolate/30 text-chocolate hover:border-chocolate'
              }`}
            >
              {b}
            </button>
          ))}
          </div>
          <p className="shrink-0 text-xs font-bold text-chocolate/70">
            {wallPhotos.length} moments and memories
          </p>
        </div>

        <div className="columns-2 gap-x-5 sm:columns-3 sm:gap-x-6 xl:columns-4">
          {wallPhotos.map((photo, idx) => {
            const rotations = [-1.4, 1.2, -0.8, 1.6, -1.1, 0.9];
            const rot = rotations[idx % rotations.length];
            return (
              <div
                key={photo.id}
                onClick={() => openPhoto(photo)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    openPhoto(photo);
                  }
                }}
                role="button"
                tabIndex={0}
                className="tp-family-polaroid group relative mb-6 inline-block w-full cursor-pointer bg-white p-2 pb-4 shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta"
                style={{ transform: `rotate(${rot}deg)` }}
              >
                <TapeStrip
                  className="-top-2 left-[38%] h-5 w-16 opacity-70"
                  rotate={idx % 2 === 0 ? -4 : 3}
                />
                <div className={`relative mb-2 w-full overflow-hidden bg-light-peach ${
                  idx % 4 === 1 ? 'aspect-[4/5]' : idx % 5 === 3 ? 'aspect-[3/4]' : 'aspect-[4/5]'
                }`}>
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="font-hand text-center text-base font-bold leading-tight text-chocolate sm:text-lg">
                  {photo.caption}
                </p>
                {photo.city && (
                  <p className="mt-1 text-center text-[10px] text-chocolate/65">
                    {photo.city}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center gap-3 text-center">
          <p className="font-hand text-xl font-bold text-chocolate">
            Are you a TeddyPups parent?
          </p>
          <a
            href={`https://wa.me/971501234567?text=${encodeURIComponent("Hello TeddyPups UAE! I would love to share photos and a testimonial for my puppy.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border-2 border-chocolate bg-[#25D366] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-scrapbook hover:opacity-90"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Submit Your Story on WhatsApp</span>
          </a>
        </div>

        <div className="mt-8 flex items-end justify-center gap-3">
          <ExactPoodleSVG pose="sit" width={76} height={61} />
          <p className="pb-2 font-hand text-sm font-bold text-chocolate">
            every one of them is a TeddyPup now!
          </p>
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeTestimonial && lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-dark-brown/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative bg-white border-3 border-chocolate rounded-5xl max-w-3xl w-full p-6 sm:p-8 shadow-scrapbook-xl animate-in zoom-in-95">
            
            {/* Close Button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-light-peach border-2 border-chocolate text-chocolate font-bold hover:bg-warm-yellow z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left & Right Navigation Arrows */}
            <button
              onClick={prevLightbox}
              className="absolute left-2 sm:-left-5 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-cream border-2 border-chocolate text-chocolate font-bold hover:bg-warm-yellow z-10 shadow-scrapbook"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextLightbox}
              className="absolute right-2 sm:-right-5 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-cream border-2 border-chocolate text-chocolate font-bold hover:bg-warm-yellow z-10 shadow-scrapbook"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <div className="relative w-full h-80 rounded-3xl overflow-hidden border-2 border-chocolate bg-light-peach">
                <Image
                  src={activeTestimonial.images[0]?.url || "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80"}
                  alt={activeTestimonial.customerName}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-1 text-caramel">
                  {[...Array(activeTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-caramel text-caramel" />
                  ))}
                </div>

                <h3 className="font-serif text-2xl font-bold text-chocolate leading-tight">
                  {activeTestimonial.puppyName}
                </h3>
                <p className="text-xs font-bold text-terracotta">
                  {activeTestimonial.customerName} &bull; {activeTestimonial.city}
                </p>

                <p className="text-xs sm:text-sm text-chocolate/80 leading-relaxed italic bg-light-peach/40 p-4 rounded-2xl border border-dashed border-caramel/40">
                  &ldquo;{activeTestimonial.story}&rdquo;
                </p>

                <p className="text-[11px] text-chocolate/50 italic">
                  Adoption Date: {activeTestimonial.adoptedDate}
                </p>
              </div>
            </div>

          </div>
        </div>
      )}

      {selectedSnapshot && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-dark-brown/85 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label={selectedSnapshot.caption}
          onClick={() => setSelectedSnapshot(null)}
        >
          <div
            className="relative w-full max-w-xl rotate-1 bg-white p-3 pb-5 shadow-scrapbook-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              onClick={() => setSelectedSnapshot(null)}
              className="absolute -right-3 -top-3 z-10 rounded-full border-2 border-chocolate bg-light-peach p-2 text-chocolate"
              aria-label="Close photo"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="relative aspect-[4/5] overflow-hidden bg-light-peach">
              <Image
                src={selectedSnapshot.src}
                alt={selectedSnapshot.alt}
                fill
                sizes="(max-width: 640px) 90vw, 560px"
                className="object-cover"
              />
            </div>
            <p className="mt-3 text-center font-hand text-xl font-bold text-chocolate">
              {selectedSnapshot.caption}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

