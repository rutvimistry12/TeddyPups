"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Puppy } from '@/lib/types';
import { usePuppy } from '@/context/PuppyContext';
import {
  Heart,
  Scale,
  Video,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  MapPin,
  Sparkles,
  MessageCircle,
  Phone,
  Mail,
  ArrowRight,
  Info,
  Check,
  Share2,
} from 'lucide-react';
import { TapeStrip, PawPrint, DoodleHeart } from '@/components/illustrations/PuppyDoodles';
import { PuppyCard } from '@/components/puppy/PuppyCard';
import confetti from 'canvas-confetti';

interface PuppyDetailClientProps {
  puppy: Puppy;
  relatedPuppies: Puppy[];
}

export function PuppyDetailClient({ puppy, relatedPuppies }: PuppyDetailClientProps) {
  const { isFavorite, toggleFavorite, addToCompare, isComparing, addRecentlyViewed } = usePuppy();
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [showVideoModal, setShowVideoModal] = useState(false);

  // Inquiry Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Dubai');
  const [method, setMethod] = useState<'WHATSAPP' | 'PHONE' | 'EMAIL'>('WHATSAPP');
  const [message, setMessage] = useState(
    `Hello! I am very interested in meeting ${puppy.name} (${puppy.breedName}) and would love to arrange a viewing.`
  );
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Add to recently viewed on mount
  useEffect(() => {
    addRecentlyViewed(puppy);
  }, [puppy, addRecentlyViewed]);

  const favorited = isFavorite(puppy.id);
  const comparing = isComparing(puppy.id);
  const currentImage = puppy.images[selectedImgIndex] || puppy.images[0];

  const whatsappMessage = encodeURIComponent(
    `Hello TeddyPups UAE! I am on your website viewing ${puppy.name}, the ${puppy.breedName} puppy (${puppy.priceAED.toLocaleString()} AED). Could you please share more details or book a private nursery viewing?`
  );

  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          puppyId: puppy.id,
          puppyName: puppy.name,
          customerName: name,
          customerEmail: email,
          customerPhone: phone,
          city,
          preferredMethod: method,
          message,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit inquiry');
      }

      setSubmitted(true);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-10 bg-cream pb-24 sm:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-bold text-chocolate/60 mb-6">
          <Link href="/" className="hover:text-chocolate">Home</Link>
          <span>&rsaquo;</span>
          <Link href="/puppies" className="hover:text-chocolate">Available Puppies</Link>
          <span>&rsaquo;</span>
          <span className="text-terracotta">{puppy.name}</span>
        </nav>

        {/* Top Product Hero: Gallery + Details & Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          
          {/* Left Column: Photo & Video Gallery (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Main Image Box */}
            <div className="relative w-full h-[380px] sm:h-[500px] rounded-5xl overflow-hidden border-3 border-chocolate bg-white shadow-scrapbook-lg">
              <TapeStrip className="-top-3 left-12" rotate={-4} />

              <Image
                src={currentImage?.url || "https://images.unsplash.com/photo-1546527813-25509cfa3da0?auto=format&fit=crop&w=1000&q=80"}
                alt={currentImage?.altText || puppy.name}
                fill
                priority
                className="object-cover"
              />

              {/* Status Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3.5 py-1.5 rounded-full bg-soft-green text-white text-xs font-extrabold uppercase tracking-wider border-2 border-chocolate shadow-xs">
                  {puppy.status}
                </span>
              </div>

              {/* Action Buttons (Favorite / Compare / Video) */}
              <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                <button
                  onClick={() => toggleFavorite(puppy.id)}
                  className="w-10 h-10 rounded-full bg-white/95 border-2 border-chocolate flex items-center justify-center text-chocolate hover:scale-110 transition-transform shadow-xs"
                  title="Favorite"
                >
                  <Heart className={`w-5 h-5 ${favorited ? 'fill-terracotta text-terracotta' : ''}`} />
                </button>
                <button
                  onClick={() => addToCompare(puppy)}
                  className={`w-10 h-10 rounded-full border-2 border-chocolate flex items-center justify-center transition-transform shadow-xs ${
                    comparing ? 'bg-warm-yellow text-chocolate scale-105' : 'bg-white/95 text-chocolate hover:scale-110'
                  }`}
                  title="Compare"
                >
                  <Scale className="w-5 h-5" />
                </button>
              </div>

              {/* Video Play Overlay Button */}
              {puppy.videos && puppy.videos.length > 0 && (
                <button
                  onClick={() => setShowVideoModal(true)}
                  className="absolute bottom-4 left-4 bg-dark-brown/90 hover:bg-chocolate text-cream text-xs font-bold px-4 py-2 rounded-2xl flex items-center gap-2 border-2 border-cream/40 shadow-xs transition-colors"
                >
                  <Video className="w-4 h-4 text-warm-yellow animate-pulse" />
                  <span>Watch Nursery Play Video</span>
                </button>
              )}
            </div>

            {/* Thumbnail Strip */}
            {puppy.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {puppy.images.map((img, idx) => (
                  <button
                    key={img.id || idx}
                    onClick={() => setSelectedImgIndex(idx)}
                    className={`relative w-24 h-24 rounded-2xl overflow-hidden border-2 shrink-0 transition-all ${
                      selectedImgIndex === idx
                        ? 'border-terracotta ring-2 ring-terracotta/40 scale-105'
                        : 'border-chocolate/40 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image src={img.url} alt={img.altText || puppy.name} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Health & Verification Badges Bar */}
            <div className="bg-light-peach/60 border-2 border-chocolate rounded-3xl p-5 shadow-scrapbook grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div>
                <CheckCircle2 className="w-5 h-5 text-soft-green mx-auto mb-1" />
                <p className="text-[11px] font-bold text-chocolate">MOCCAE Microchip</p>
                <span className="text-[10px] text-chocolate/70">Verified Registered</span>
              </div>
              <div>
                <ShieldCheck className="w-5 h-5 text-caramel mx-auto mb-1" />
                <p className="text-[11px] font-bold text-chocolate">DHPPi Vaccinated</p>
                <span className="text-[10px] text-chocolate/70">Up to Date</span>
              </div>
              <div>
                <Sparkles className="w-5 h-5 text-terracotta mx-auto mb-1" />
                <p className="text-[11px] font-bold text-chocolate">Hypoallergenic</p>
                <span className="text-[10px] text-chocolate/70">Non-Shedding Hair</span>
              </div>
              <div>
                <Calendar className="w-5 h-5 text-chocolate mx-auto mb-1" />
                <p className="text-[11px] font-bold text-chocolate">1-Year Warranty</p>
                <span className="text-[10px] text-chocolate/70">Congenital Peace</span>
              </div>
            </div>

          </div>

          {/* Right Column: Pricing, Overview & VIP Reservation Inquiry (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Title & Price Header Card */}
            <div className="bg-white border-2 border-chocolate rounded-4xl p-6 sm:p-8 shadow-scrapbook relative">
              <TapeStrip className="-top-3 right-12" rotate={3} />
              
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-chocolate">
                    {puppy.name}
                  </h1>
                  <p className="text-base font-bold text-terracotta mt-1">{puppy.breedName}</p>
                </div>
                <div className="text-right">
                  <span className="font-serif text-2xl sm:text-3xl font-extrabold text-chocolate block">
                    {puppy.priceAED.toLocaleString()} AED
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-caramel">
                    All-Inclusive UAE Price
                  </span>
                </div>
              </div>

              {/* Quick Specs Pills */}
              <div className="flex flex-wrap gap-2 py-4 border-t border-b border-dashed border-caramel/40 my-4 text-xs font-semibold text-chocolate">
                <span className="px-3 py-1 rounded-xl bg-light-peach border border-chocolate/20">
                  {puppy.gender === 'MALE' ? '♂ Boy' : '♀ Girl'}
                </span>
                <span className="px-3 py-1 rounded-xl bg-light-peach border border-chocolate/20">
                  {puppy.ageWeeks} weeks old
                </span>
                <span className="px-3 py-1 rounded-xl bg-cream border border-chocolate/20">
                  Color: {puppy.color}
                </span>
                <span className="px-3 py-1 rounded-xl bg-cream border border-chocolate/20">
                  Est. Weight: {puppy.weightKg ? `${puppy.weightKg} kg` : '< 2 kg'}
                </span>
                <span className="px-3 py-1 rounded-xl bg-warm-yellow border border-chocolate/20">
                  {puppy.origin === 'LOCAL_DUBAI' ? '🇦🇪 Dubai Boutique Nursery' : '✈️ Certified EU Import'}
                </span>
              </div>

              {/* Personality Highlight */}
              <div className="bg-cream p-4 rounded-2xl border border-chocolate/30 mb-6">
                <p className="text-xs uppercase font-extrabold tracking-wider text-caramel mb-1 flex items-center gap-1">
                  <PawPrint className="w-3.5 h-3.5" /> Personality & Temperament
                </p>
                <p className="text-xs sm:text-sm text-chocolate/85 italic leading-relaxed">
                  &ldquo;{puppy.personality}&rdquo;
                </p>
              </div>

              {/* Fast WhatsApp Button */}
              <a
                href={`https://wa.me/971501234567?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white border-2 border-chocolate font-bold text-xs sm:text-sm tracking-wider uppercase shadow-scrapbook hover:shadow-scrapbook-lg transition-all flex items-center justify-center gap-2 mb-4"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Reserve or Ask on WhatsApp</span>
              </a>

              {/* Inquiry Form */}
              <div className="pt-2">
                <h2 className="font-serif text-lg font-bold text-chocolate mb-1">
                  Book Nursery Viewing or Inquire
                </h2>
                <p className="text-xs text-chocolate/70 mb-4">
                  Fill below and our Dubai concierge will confirm your private slot within 30 minutes.
                </p>

                {submitted ? (
                  <div className="bg-soft-green/15 border-2 border-soft-green rounded-3xl p-6 text-center space-y-3">
                    <span className="w-12 h-12 rounded-full bg-soft-green text-white flex items-center justify-center mx-auto text-xl font-bold">
                      ✓
                    </span>
                    <h4 className="font-serif text-xl font-bold text-chocolate">Inquiry Received!</h4>
                    <p className="text-xs text-chocolate/80 leading-relaxed">
                      Thank you, {name}! Our concierge has reserved a callback for you regarding <strong>{puppy.name}</strong>.
                    </p>
                    <a
                      href={`https://wa.me/971501234567?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-soft-green underline"
                    >
                      Want an instant reply? Open WhatsApp &rarr;
                    </a>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitInquiry} className="space-y-3">
                    {errorMsg && (
                      <p className="text-xs text-terracotta bg-red-50 p-2 rounded-xl border border-red-200">
                        {errorMsg}
                      </p>
                    )}

                    <div>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your Full Name *"
                        className="w-full py-2.5 px-3.5 rounded-xl bg-cream border border-chocolate/30 text-xs text-chocolate placeholder:text-chocolate/40 focus:outline-none focus:border-chocolate"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address *"
                        className="w-full py-2.5 px-3.5 rounded-xl bg-cream border border-chocolate/30 text-xs text-chocolate placeholder:text-chocolate/40 focus:outline-none focus:border-chocolate"
                      />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Phone / WhatsApp *"
                        className="w-full py-2.5 px-3.5 rounded-xl bg-cream border border-chocolate/30 text-xs text-chocolate placeholder:text-chocolate/40 focus:outline-none focus:border-chocolate"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="py-2.5 px-3.5 rounded-xl bg-cream border border-chocolate/30 text-xs text-chocolate focus:outline-none"
                      >
                        <option value="Dubai">Dubai, UAE</option>
                        <option value="Abu Dhabi">Abu Dhabi, UAE</option>
                        <option value="Sharjah">Sharjah, UAE</option>
                        <option value="Ajman">Ajman, UAE</option>
                        <option value="Ras Al Khaimah">Ras Al Khaimah, UAE</option>
                        <option value="GCC / International">GCC / International</option>
                      </select>

                      <select
                        value={method}
                        onChange={(e) => setMethod(e.target.value as any)}
                        className="py-2.5 px-3.5 rounded-xl bg-cream border border-chocolate/30 text-xs text-chocolate focus:outline-none font-bold"
                      >
                        <option value="WHATSAPP">Contact on WhatsApp</option>
                        <option value="PHONE">Contact via Phone</option>
                        <option value="EMAIL">Contact via Email</option>
                      </select>
                    </div>

                    <div>
                      <textarea
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full py-2.5 px-3.5 rounded-xl bg-cream border border-chocolate/30 text-xs text-chocolate placeholder:text-chocolate/40 focus:outline-none focus:border-chocolate resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3 px-6 rounded-2xl bg-terracotta hover:bg-caramel text-white border-2 border-chocolate font-bold text-xs uppercase tracking-wider shadow-scrapbook hover:shadow-scrapbook-lg transition-all"
                    >
                      {submitting ? 'Submitting Reservation...' : 'Submit Inquiry & Reserve Viewing'}
                    </button>
                  </form>
                )}
              </div>

            </div>

          </div>

        </div>

        {/* Detailed Story, Health Notes & Pedigree Tabbed Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          {/* Story & Description */}
          <div className="bg-white border-2 border-chocolate rounded-4xl p-6 sm:p-8 shadow-scrapbook relative">
            <TapeStrip className="-top-3 left-10" />
            <h3 className="font-serif text-2xl font-bold text-chocolate mb-4 flex items-center gap-2">
              <PawPrint className="w-5 h-5 text-caramel" />
              About {puppy.name}
            </h3>
            <p className="text-sm text-chocolate/80 leading-relaxed whitespace-pre-line mb-6">
              {puppy.description}
            </p>
            {puppy.parentInfo && (
              <div className="bg-light-peach/40 p-4 rounded-2xl border border-dashed border-caramel/40 text-xs text-chocolate">
                <span className="font-bold block mb-1">Parentage Pedigree:</span>
                <span>{puppy.parentInfo}</span>
              </div>
            )}
          </div>

          {/* Health & Veterinary Documentation */}
          <div className="bg-white border-2 border-chocolate rounded-4xl p-6 sm:p-8 shadow-scrapbook relative">
            <TapeStrip className="-top-3 right-10" rotate={-3} />
            <h3 className="font-serif text-2xl font-bold text-chocolate mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-soft-green" />
              Veterinary & Care Details
            </h3>
            <p className="text-sm text-chocolate/80 leading-relaxed mb-6">
              {puppy.healthNotes || "Every puppy undergoes thorough clinical cardiovascular, musculoskeletal, and dental examinations prior to adoption."}
            </p>

            <div className="space-y-2.5 text-xs text-chocolate">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-soft-green" />
                <span>Ministry of Climate Change & Environment (MOCCAE) microchipped</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-soft-green" />
                <span>Official UAE Veterinary passport & signed health clearance</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-soft-green" />
                <span>Deworming protocol administered every 2 weeks since birth</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-soft-green" />
                <span>Starter kit: mother-scented blanket, puppy kibble, luxury carrier</span>
              </div>
            </div>
          </div>

        </div>

        {/* Related Puppies Carousel */}
        {relatedPuppies.length > 0 && (
          <div className="pt-8 border-t-2 border-chocolate/10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-caramel block">More Little Friends</span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-chocolate">
                  You Might Also Love
                </h3>
              </div>
              <Link href="/puppies" className="text-xs font-bold text-terracotta hover:underline">
                View All &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPuppies.map((rel) => (
                <PuppyCard key={rel.id} puppy={rel} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Sticky Mobile Inquiry Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-cream/95 backdrop-blur-md border-t-2 border-chocolate p-3 flex items-center justify-between gap-3 shadow-lg">
        <div>
          <span className="font-serif font-bold text-chocolate text-base block">{puppy.name}</span>
          <span className="font-bold text-terracotta text-xs">{puppy.priceAED.toLocaleString()} AED</span>
        </div>
        <a
          href={`https://wa.me/971501234567?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="py-2.5 px-5 rounded-2xl bg-[#25D366] text-white border-2 border-chocolate font-bold text-xs tracking-wide flex items-center gap-1.5 shadow-xs"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Ask on WhatsApp</span>
        </a>
      </div>

      {/* Video Modal */}
      {showVideoModal && puppy.videos && puppy.videos.length > 0 && (
        <div className="fixed inset-0 z-50 bg-dark-brown/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border-3 border-chocolate rounded-4xl p-6 max-w-2xl w-full relative shadow-scrapbook-xl animate-in zoom-in-95">
            <button
              onClick={() => setShowVideoModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-light-peach border-2 border-chocolate text-chocolate font-bold hover:bg-warm-yellow"
            >
              ✕
            </button>
            <h3 className="font-serif text-2xl font-bold text-chocolate mb-4">
              {puppy.name} playing in Dubai VIP Playroom
            </h3>
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border-2 border-chocolate bg-black">
              <video
                src={puppy.videos[0].url}
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

