"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Puppy } from '@/lib/types';
import { ArrowRight, CheckCircle2, Clock, Mail, MapPin, MessageCircle, PawPrint, Phone } from 'lucide-react';
import { ExactPoodleSVG } from '@/components/mascot/ExactPoodleSVG';
import confetti from 'canvas-confetti';

interface ContactClientProps {
  puppies: Puppy[];
}

export function ContactClient({ puppies }: ContactClientProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Dubai');
  const [selectedPuppyId, setSelectedPuppyId] = useState('');
  const [subject, setSubject] = useState('Private Nursery Appointment');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const whatsappUrl = `https://wa.me/971501234567?text=${encodeURIComponent("Hello TeddyPups UAE! I would like to schedule a private boutique appointment in Jumeirah 2, Dubai.")}`;
  const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=Villa+14%2C+Al+Wasl+Road%2C+Jumeirah+2%2C+Dubai';

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMsg('');
    setSubmitting(true);

    const selectedPup = puppies.find((puppy) => puppy.id === selectedPuppyId);

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          puppyId: selectedPup?.id,
          puppyName: selectedPup?.name,
          customerName: name,
          customerEmail: email,
          customerPhone: phone,
          city,
          preferredMethod: 'WHATSAPP',
          message: `[Subject: ${subject}] ${message}`,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to send message');

      setSubmitted(true);
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } catch (error) {
      setErrorMsg(
        error instanceof Error
          ? error.message
          : 'Error submitting message. Please contact us on WhatsApp.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="tp-contact-page relative min-h-[calc(100vh-7rem)] overflow-hidden px-4 pb-8 pt-10 text-chocolate sm:px-8 sm:pt-14 lg:px-12">
      <div className="relative z-10 mx-auto max-w-[110rem]">
        <div className="mb-6 grid gap-5 lg:grid-cols-[0.86fr_1.14fr] lg:items-end lg:gap-10">
          <h1 className="max-w-[8ch] font-serif text-5xl font-extrabold leading-[0.9] tracking-tight sm:text-6xl lg:text-7xl">
            Get in touch
            <br />
            with us
          </h1>
          <p className="max-w-2xl pb-1 text-sm leading-relaxed text-cocoa-soft sm:text-base">
            Have questions about our puppies or adoption process? Fill out the
            form, and our team will get back to you promptly. Whether you&apos;re
            ready to adopt or just seeking info, we&apos;d love to hear from you!
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.86fr_1.14fr] lg:gap-10">
          <aside className="flex flex-col items-start">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-4 inline-flex items-center gap-2 rounded-full border-2 border-chocolate bg-soft-green px-4 py-2 text-xs font-bold text-white shadow-scrapbook transition-transform hover:-translate-y-0.5"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Direct WhatsApp Chat
            </a>

            <div className="mb-5 space-y-3 text-xs">
              <p className="flex items-start gap-2">
                <Phone className="mt-0.5 h-3.5 w-3.5 shrink-0 text-toffee-deep" aria-hidden="true" />
                <span>
                  <span className="block font-hand text-sm font-bold text-toffee-deep">call us</span>
                  <a className="text-toffee-deep underline underline-offset-2" href="tel:+97148007877">
                    +971 4 800 PUPS
                  </a>
                </span>
              </p>
              <p className="flex items-start gap-2">
                <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-toffee-deep" aria-hidden="true" />
                <span>
                  <span className="block font-hand text-sm font-bold text-toffee-deep">email</span>
                  <a className="text-toffee-deep underline underline-offset-2" href="mailto:concierge@teddypups.ae">
                    concierge@teddypups.ae
                  </a>
                </span>
              </p>
            </div>

            <article className="tp-contact-location w-full max-w-[34rem] overflow-hidden rounded-xl border-2 border-chocolate bg-[#fff4dd] shadow-scrapbook">
              <div className="tp-contact-location__stripe" aria-hidden="true" />
              <div className="grid grid-cols-[1fr_6.5rem] gap-3 p-3 sm:grid-cols-[1fr_7.5rem] sm:p-4">
                <div>
                  <h2 className="mb-1 font-serif text-base font-bold sm:text-lg">
                    Visit our Jumeirah 2 showroom
                  </h2>
                  <p className="mb-2 text-[11px] leading-relaxed text-cocoa-soft">
                    Meet our puppies in person at our boutique showroom.
                  </p>
                  <p className="mb-3 flex items-start gap-1 text-[10px] font-semibold text-cocoa-soft">
                    <MapPin className="mt-0.5 h-3 w-3 shrink-0 text-toffee-deep" aria-hidden="true" />
                    Villa 14, Al Wasl Road, Jumeirah 2, Dubai, UAE
                  </p>
                  <p className="mb-3 flex items-start gap-1 text-[10px] leading-relaxed text-cocoa-soft">
                    <Clock className="mt-0.5 h-3 w-3 shrink-0 text-toffee-deep" aria-hidden="true" />
                    Mon–Sun, 10 AM–8 PM
                    <span className="font-semibold">(by appointment)</span>
                  </p>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-full border border-chocolate bg-white px-3 py-1.5 text-[10px] font-bold text-chocolate transition-colors hover:bg-warm-yellow"
                  >
                    Open in Google Maps
                    <ArrowRight className="h-3 w-3" aria-hidden="true" />
                  </a>
                </div>
                <div className="relative min-h-32 overflow-hidden rounded-md border border-chocolate/40 bg-light-peach sm:min-h-36">
                  <Image
                    src="/images/doors/door_0.jpg"
                    alt="A puppy waiting to meet its new family"
                    fill
                    sizes="(max-width: 640px) 104px, 120px"
                    className="object-cover"
                  />
                </div>
              </div>
            </article>
          </aside>

          <section aria-label="Send us a message">
            <div className="mb-4 lg:pl-2">
              <h2 className="font-hand text-xl font-bold text-toffee-deep">Dear TeddyPups,</h2>
              <p className="text-xs leading-relaxed text-cocoa-soft">
                Write us a little note and our team will get back to you as soon as possible.
              </p>
            </div>

            <div className="tp-contact-letter relative rounded-xl border-2 border-chocolate bg-[#fffdf8] p-5 shadow-[5px_7px_0_rgba(42,23,14,0.2)] sm:p-7 lg:p-8">
              <div className="tp-contact-letter__stamp" aria-hidden="true">
                <PawPrint className="h-4 w-4" />
              </div>

              {submitted ? (
                <div
                  className="flex min-h-64 flex-col items-center justify-center gap-4 py-8 text-center"
                  role="status"
                  aria-live="polite"
                >
                  <CheckCircle2 className="h-12 w-12 text-soft-green" aria-hidden="true" />
                  <h3 className="font-serif text-2xl font-bold">Your letter is on its way!</h3>
                  <p className="max-w-md text-sm leading-relaxed text-cocoa-soft">
                    Thank you, <strong>{name}</strong>. Our team will be in touch soon.
                  </p>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border-2 border-chocolate bg-soft-green px-5 py-2.5 text-xs font-bold text-white"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    Continue on WhatsApp
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMsg && (
                    <p
                      className="rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-xs text-red-800"
                      role="alert"
                    >
                      {errorMsg}
                    </p>
                  )}

                  <p className="flex flex-wrap items-baseline gap-x-2 gap-y-2 text-xs leading-loose text-cocoa-soft sm:text-sm">
                    <span>my name is</span>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="your name"
                      aria-label="Your full name"
                      className="tp-letter-field min-w-32 flex-1"
                    />
                    <span>and you can reach me on</span>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      placeholder="+971 50 123 4567"
                      aria-label="Phone or WhatsApp number"
                      className="tp-letter-field min-w-40 flex-1"
                    />
                    <span>or by email at</span>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="your email"
                      aria-label="Email address"
                      className="tp-letter-field min-w-40 flex-1"
                    />
                  </p>

                  <p className="flex flex-wrap items-baseline gap-x-2 gap-y-2 text-xs leading-loose text-cocoa-soft sm:text-sm">
                    <span>I live in</span>
                    <select
                      value={city}
                      onChange={(event) => setCity(event.target.value)}
                      aria-label="City or emirate"
                      className="tp-letter-field min-w-36"
                    >
                      <option value="Dubai">Dubai Marina</option>
                      <option value="Abu Dhabi">Abu Dhabi</option>
                      <option value="Sharjah">Sharjah</option>
                      <option value="Ajman">Ajman</option>
                      <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                      <option value="Other UAE / GCC">Other UAE / GCC</option>
                    </select>
                    <span>and I am curious about</span>
                    <select
                      value={selectedPuppyId}
                      onChange={(event) => setSelectedPuppyId(event.target.value)}
                      aria-label="Puppy of interest"
                      className="tp-letter-field min-w-40 flex-1"
                    >
                      <option value="">any puppy (not sure yet)</option>
                      {puppies.map((puppy) => (
                        <option key={puppy.id} value={puppy.id}>
                          {puppy.name} ({puppy.breedName} - {puppy.priceAED.toLocaleString()} AED)
                        </option>
                      ))}
                    </select>
                  </p>

                  <p className="flex flex-wrap items-baseline gap-x-2 gap-y-2 text-xs leading-loose text-cocoa-soft sm:text-sm">
                    <span>I would love to talk about</span>
                    <select
                      value={subject}
                      onChange={(event) => setSubject(event.target.value)}
                      aria-label="Inquiry subject"
                      className="tp-letter-field min-w-44 flex-1"
                    >
                      <option value="Private Nursery Appointment">a nursery appointment</option>
                      <option value="Inquiry About a Specific Puppy">a specific puppy</option>
                      <option value="Custom European Import Request">an imported puppy</option>
                      <option value="Aftercare & Health Question">puppy care and health</option>
                    </select>
                  </p>

                  <div className="pt-1">
                    <label
                      htmlFor="contact-message"
                      className="font-hand text-base font-bold text-toffee-deep"
                    >
                      Anything else you&apos;d like to tell us...
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={3}
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      placeholder="Tell us what you have in mind..."
                      className="tp-letter-message mt-1 w-full resize-y"
                    />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-caramel/30 pt-4">
                    <span className="font-hand text-sm text-cocoa-soft">
                      with love, a future puppy parent
                    </span>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="rounded-full border-2 border-chocolate bg-toffee-deep px-5 py-2 text-xs font-bold text-white shadow-scrapbook transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60"
                    >
                      {submitting ? 'Sending your letter...' : 'Post my letter'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </section>
        </div>

        <div className="mt-2 flex justify-end pr-[10%] sm:pr-[18%]">
          <ExactPoodleSVG pose="walk" width={76} height={61} />
        </div>
      </div>
    </div>
  );
}
