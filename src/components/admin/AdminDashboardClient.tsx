"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Puppy, Inquiry, Testimonial, WebsiteSettings, Breed } from '@/lib/types';
import {
  Lock,
  LogOut,
  LayoutDashboard,
  Dog,
  Inbox,
  MessageSquare,
  Settings,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  Clock,
  Search,
  Sparkles,
  Phone,
  Mail,
  MessageCircle,
  X,
  ExternalLink,
  Shield,
  Eye,
} from 'lucide-react';
import { TapeStrip, PawPrint } from '@/components/illustrations/PuppyDoodles';

interface AdminDashboardClientProps {
  initialPuppies: Puppy[];
  initialBreeds: Breed[];
  initialInquiries: Inquiry[];
  initialTestimonials: Testimonial[];
  initialSettings: WebsiteSettings;
  initialStats: any;
}

export function AdminDashboardClient({
  initialPuppies,
  initialBreeds,
  initialInquiries,
  initialTestimonials,
  initialSettings,
  initialStats,
}: AdminDashboardClientProps) {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  // Tab State: 'overview' | 'puppies' | 'inquiries' | 'testimonials' | 'settings'
  const [activeTab, setActiveTab] = useState<'overview' | 'puppies' | 'inquiries' | 'testimonials' | 'settings'>('overview');

  // Data Store State
  const [puppies, setPuppies] = useState<Puppy[]>(initialPuppies);
  const [inquiries, setInquiries] = useState<Inquiry[]>(initialInquiries);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [settings, setSettings] = useState<WebsiteSettings>(initialSettings);
  const [stats, setStats] = useState(initialStats);

  // Modals
  const [showAddPuppyModal, setShowAddPuppyModal] = useState(false);
  const [editingPuppy, setEditingPuppy] = useState<Puppy | null>(null);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  // Puppy Form State
  const [pName, setPName] = useState('');
  const [pBreedId, setPBreedId] = useState('b-maltipoo');
  const [pGender, setPGender] = useState<'MALE' | 'FEMALE'>('FEMALE');
  const [pAgeWeeks, setPAgeWeeks] = useState(10);
  const [pPriceAED, setPPriceAED] = useState(14000);
  const [pOrigin, setPOrigin] = useState<'LOCAL_DUBAI' | 'IMPORTED'>('LOCAL_DUBAI');
  const [pStatus, setPStatus] = useState<Puppy['status']>('AVAILABLE');
  const [pIsFeatured, setPIsFeatured] = useState(true);
  const [pWeightKg, setPWeightKg] = useState(0.85);
  const [pColor, setPColor] = useState('Apricot Cream');
  const [pPersonality, setPPersonality] = useState('Sweet lap puppy, loves to be held.');
  const [pDescription, setPDescription] = useState('Raised in our loving nursery with veterinary oversight.');
  const [pImageUrl, setPImageUrl] = useState('https://images.unsplash.com/photo-1546527813-25509cfa3da0?auto=format&fit=crop&w=800&q=80');

  // Inquiries Search & Filter
  const [inquirySearch, setInquirySearch] = useState('');
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState('ALL');

  // Check auth session on mount
  useEffect(() => {
    fetch('/api/admin/me')
      .then((res) => {
        if (res.ok) setIsAuthenticated(true);
      })
      .catch(() => {})
      .finally(() => setAuthChecking(false));
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoggingIn(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      window.location.reload();
    } catch (err: any) {
      setLoginError(err.message);
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    setIsAuthenticated(false);
  };

  // Puppy Actions
  const handleSavePuppy = async (e: React.FormEvent) => {
    e.preventDefault();
    const selectedBreedObj = initialBreeds.find((b) => b.id === pBreedId);

    const payload = {
      slug: `${pName.toLowerCase().replace(/\s+/g, '-')}-${Date.now().toString().slice(-4)}`,
      name: pName,
      breedId: pBreedId,
      breedName: selectedBreedObj?.name || 'Teacup Maltipoo',
      gender: pGender,
      ageWeeks: Number(pAgeWeeks),
      priceAED: Number(pPriceAED),
      origin: pOrigin,
      location: pOrigin === 'LOCAL_DUBAI' ? 'Jumeirah Boutique Showroom, Dubai' : 'VIP Import Service',
      status: pStatus,
      isFeatured: pIsFeatured,
      weightKg: Number(pWeightKg),
      color: pColor,
      personality: pPersonality,
      description: pDescription,
      microchipped: true,
      vaccinated: true,
      passportReady: true,
      healthTested: true,
      images: [
        {
          id: `img-${Date.now()}`,
          url: pImageUrl,
          isPrimary: true,
          altText: `${pName} - ${selectedBreedObj?.name}`,
          order: 1,
        },
      ],
    };

    if (editingPuppy) {
      const res = await fetch(`/api/puppies/${editingPuppy.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setPuppies((prev) => prev.map((p) => (p.id === editingPuppy.id ? data.puppy : p)));
        setEditingPuppy(null);
        setShowAddPuppyModal(false);
      }
    } else {
      const res = await fetch('/api/puppies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setPuppies((prev) => [data.puppy, ...prev]);
        setShowAddPuppyModal(false);
      }
    }
  };

  const handleDeletePuppy = async (id: string) => {
    if (!confirm('Are you sure you want to remove this puppy profile?')) return;
    const res = await fetch(`/api/puppies/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setPuppies((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleQuickStatusChange = async (id: string, newStatus: Puppy['status']) => {
    const res = await fetch(`/api/puppies/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) {
      setPuppies((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
      );
    }
  };

  // Inquiry Actions
  const handleUpdateInquiry = async (id: string, newStatus: Inquiry['status'], notes?: string) => {
    const res = await fetch(`/api/inquiries/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus, internalNotes: notes }),
    });
    const data = await res.json();
    if (data.success) {
      setInquiries((prev) => prev.map((i) => (i.id === id ? data.inquiry : i)));
      if (selectedInquiry?.id === id) {
        setSelectedInquiry(data.inquiry);
      }
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    if (!confirm('Delete this inquiry?')) return;
    const res = await fetch(`/api/inquiries/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setInquiries((prev) => prev.filter((i) => i.id !== id));
      if (selectedInquiry?.id === id) setSelectedInquiry(null);
    }
  };

  // Settings Save
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    });
    if (res.ok) {
      alert('Website settings updated successfully!');
    }
  };

  // Testimonials Toggle Approval
  const handleToggleTestimonial = async (id: string, currentApproved: boolean) => {
    const res = await fetch(`/api/testimonials/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isApproved: !currentApproved }),
    });
    const data = await res.json();
    if (data.success) {
      setTestimonials((prev) => prev.map((t) => (t.id === id ? data.testimonial : t)));
    }
  };

  if (authChecking) {
    return (
      <div className="py-24 text-center">
        <PawPrint className="w-10 h-10 text-caramel mx-auto animate-bounce mb-2" />
        <p className="text-xs font-bold text-chocolate">Authenticating Concierge Session...</p>
      </div>
    );
  }

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="py-20 bg-cream min-h-screen flex items-center justify-center p-4">
        <div className="bg-white border-3 border-chocolate rounded-5xl p-8 sm:p-12 shadow-scrapbook-xl w-full max-w-md relative">
          <TapeStrip className="-top-4 left-1/2 -translate-x-1/2" />
          
          <div className="w-12 h-12 rounded-2xl bg-warm-yellow border-2 border-chocolate flex items-center justify-center text-chocolate mx-auto mb-4 shadow-scrapbook">
            <Lock className="w-6 h-6 text-terracotta" />
          </div>

          <h2 className="font-serif text-3xl font-extrabold text-chocolate text-center mb-1">
            Concierge Portal
          </h2>
          <p className="text-xs text-chocolate/70 text-center mb-6">
            Protected Staff Area for TeddyPups UAE
          </p>

          {loginError && (
            <p className="text-xs text-terracotta bg-red-50 p-2.5 rounded-xl border border-red-200 mb-4">
              {loginError}
            </p>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-chocolate block mb-1">Staff Email</label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full py-2.5 px-3.5 rounded-xl bg-cream border border-chocolate/30 text-xs sm:text-sm text-chocolate focus:outline-none focus:border-chocolate"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-chocolate block mb-1">Access Password</label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full py-2.5 px-3.5 rounded-xl bg-cream border border-chocolate/30 text-xs sm:text-sm text-chocolate focus:outline-none focus:border-chocolate"
              />
            </div>

            <div className="p-3 bg-light-peach/60 rounded-xl border border-chocolate/20 text-[11px] text-chocolate/70">
              <span>Sign in with the admin credentials configured in your server environment.</span>
            </div>

            <button
              type="submit"
              disabled={loggingIn}
              className="w-full py-3 px-6 rounded-2xl bg-terracotta hover:bg-caramel text-white border-2 border-chocolate font-bold text-xs uppercase tracking-wider shadow-scrapbook hover:shadow-scrapbook-lg transition-all"
            >
              {loggingIn ? 'Authenticating...' : 'Enter Admin Dashboard'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Filtered Inquiries
  const filteredInquiries = inquiries.filter((inq) => {
    if (inquiryStatusFilter !== 'ALL' && inq.status !== inquiryStatusFilter) return false;
    if (inquirySearch.trim()) {
      const q = inquirySearch.toLowerCase();
      return (
        inq.customerName.toLowerCase().includes(q) ||
        inq.customerEmail.toLowerCase().includes(q) ||
        inq.customerPhone.includes(q) ||
        (inq.puppyName && inq.puppyName.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="py-8 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header & Navigation */}
        <div className="bg-white border-2 border-chocolate rounded-4xl p-6 shadow-scrapbook mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-warm-yellow border-2 border-chocolate flex items-center justify-center text-chocolate shadow-xs">
              <PawPrint className="w-6 h-6 text-terracotta" />
            </div>
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-chocolate">
                TeddyPups Admin Portal
              </h1>
              <p className="text-xs text-chocolate/60">
                Logged in as <strong>{loginEmail}</strong> &bull; Super Admin
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'overview', label: 'Overview', icon: LayoutDashboard },
              { id: 'puppies', label: `Puppies (${puppies.length})`, icon: Dog },
              { id: 'inquiries', label: `Inquiries (${inquiries.filter((i) => i.status === 'NEW').length} new)`, icon: Inbox },
              { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
              { id: 'settings', label: 'Settings', icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-1.5 py-2 px-3.5 rounded-2xl text-xs font-bold border-2 transition-all ${
                    activeTab === tab.id
                      ? 'bg-warm-yellow border-chocolate text-chocolate shadow-scrapbook'
                      : 'bg-cream border-chocolate/20 text-chocolate/70 hover:border-chocolate'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-terracotta" />
                  <span>{tab.label}</span>
                </button>
              );
            })}

            <button
              onClick={handleLogout}
              className="p-2 rounded-2xl bg-light-peach border-2 border-chocolate text-chocolate hover:bg-terracotta hover:text-white transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-white border-2 border-chocolate rounded-3xl p-5 shadow-scrapbook">
                <span className="text-xs font-bold uppercase tracking-wider text-chocolate/60 block mb-1">Total Puppies</span>
                <span className="font-serif text-3xl font-bold text-chocolate">{puppies.length}</span>
                <span className="text-[11px] text-soft-green block mt-1">✓ In database registry</span>
              </div>
              <div className="bg-white border-2 border-chocolate rounded-3xl p-5 shadow-scrapbook">
                <span className="text-xs font-bold uppercase tracking-wider text-chocolate/60 block mb-1">Available For Adoption</span>
                <span className="font-serif text-3xl font-bold text-soft-green">
                  {puppies.filter((p) => p.status === 'AVAILABLE').length}
                </span>
                <span className="text-[11px] text-chocolate/60 block mt-1">Ready for Dubai viewing</span>
              </div>
              <div className="bg-white border-2 border-chocolate rounded-3xl p-5 shadow-scrapbook">
                <span className="text-xs font-bold uppercase tracking-wider text-chocolate/60 block mb-1">Reserved / Pending</span>
                <span className="font-serif text-3xl font-bold text-caramel">
                  {puppies.filter((p) => p.status === 'RESERVED' || p.status === 'PENDING').length}
                </span>
                <span className="text-[11px] text-chocolate/60 block mt-1">Deposit or review active</span>
              </div>
              <div className="bg-white border-2 border-chocolate rounded-3xl p-5 shadow-scrapbook">
                <span className="text-xs font-bold uppercase tracking-wider text-chocolate/60 block mb-1">New Inquiries</span>
                <span className="font-serif text-3xl font-bold text-terracotta">
                  {inquiries.filter((i) => i.status === 'NEW').length}
                </span>
                <span className="text-[11px] text-chocolate/60 block mt-1">Pending response</span>
              </div>
            </div>

            {/* Recent Inquiries List */}
            <div className="bg-white border-2 border-chocolate rounded-4xl p-6 sm:p-8 shadow-scrapbook">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-chocolate">Recent Customer Inquiries</h3>
                  <p className="text-xs text-chocolate/70">Prospective parents requesting viewing slots or puppy details</p>
                </div>
                <button
                  onClick={() => setActiveTab('inquiries')}
                  className="text-xs font-bold text-terracotta underline"
                >
                  View All ({inquiries.length})
                </button>
              </div>

              <div className="space-y-3">
                {inquiries.slice(0, 4).map((inq) => (
                  <div
                    key={inq.id}
                    className="p-4 rounded-2xl bg-cream/60 border border-chocolate/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-chocolate">{inq.customerName}</span>
                        {inq.puppyName && (
                          <span className="text-xs bg-warm-yellow px-2 py-0.5 rounded-full border border-chocolate font-bold">
                            Interested in {inq.puppyName}
                          </span>
                        )}
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-light-peach border border-chocolate">
                          {inq.status}
                        </span>
                      </div>
                      <p className="text-xs text-chocolate/80 mt-1 line-clamp-1">{inq.message}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        href={`https://wa.me/${inq.customerPhone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-1 px-3 rounded-xl bg-[#25D366] text-white font-bold text-xs flex items-center gap-1"
                      >
                        <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                      </a>
                      <button
                        onClick={() => {
                          setSelectedInquiry(inq);
                          setActiveTab('inquiries');
                        }}
                        className="py-1 px-3 rounded-xl bg-white border border-chocolate text-chocolate font-bold text-xs"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PUPPY MANAGEMENT */}
        {activeTab === 'puppies' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-chocolate">Puppy Registry</h3>
                <p className="text-xs text-chocolate/70">Add new litters, edit prices, photos, and update adoption status.</p>
              </div>
              <button
                onClick={() => {
                  setEditingPuppy(null);
                  setPName('');
                  setPPriceAED(14000);
                  setShowAddPuppyModal(true);
                }}
                className="flex items-center gap-1.5 py-2.5 px-5 rounded-2xl bg-terracotta hover:bg-caramel text-white border-2 border-chocolate font-bold text-xs uppercase tracking-wider shadow-scrapbook"
              >
                <Plus className="w-4 h-4" /> Add New Puppy
              </button>
            </div>

            {/* Puppies Table */}
            <div className="bg-white border-2 border-chocolate rounded-4xl overflow-hidden shadow-scrapbook">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-light-peach/70 border-b-2 border-chocolate text-chocolate font-bold uppercase tracking-wider">
                    <tr>
                      <th className="py-4 px-4">Puppy</th>
                      <th className="py-4 px-4">Breed & Origin</th>
                      <th className="py-4 px-4">Price (AED)</th>
                      <th className="py-4 px-4">Status</th>
                      <th className="py-4 px-4">Featured</th>
                      <th className="py-4 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-chocolate/10 text-chocolate">
                    {puppies.map((p) => (
                      <tr key={p.id} className="hover:bg-cream/40 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-chocolate bg-light-peach shrink-0">
                              <Image src={p.images[0]?.url || ''} alt={p.name} fill className="object-cover" />
                            </div>
                            <div>
                              <span className="font-bold text-sm text-chocolate block">{p.name}</span>
                              <span className="text-[11px] text-chocolate/60">
                                {p.gender === 'MALE' ? '♂ Boy' : '♀ Girl'} &bull; {p.ageWeeks} wks
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="py-3 px-4">
                          <span className="font-bold block">{p.breedName}</span>
                          <span className="text-[10px] text-chocolate/60">
                            {p.origin === 'LOCAL_DUBAI' ? '🇦🇪 Dubai' : '✈️ Import'}
                          </span>
                        </td>

                        <td className="py-3 px-4 font-bold text-terracotta text-sm">
                          {p.priceAED.toLocaleString()} AED
                        </td>

                        <td className="py-3 px-4">
                          <select
                            value={p.status}
                            onChange={(e) => handleQuickStatusChange(p.id, e.target.value as any)}
                            className="py-1 px-2.5 rounded-xl border border-chocolate text-xs font-bold bg-white focus:outline-none"
                          >
                            <option value="AVAILABLE">Available</option>
                            <option value="RESERVED">Reserved</option>
                            <option value="PENDING">Pending</option>
                            <option value="GONE_HOME">Gone Home</option>
                          </select>
                        </td>

                        <td className="py-3 px-4">
                          {p.isFeatured ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-soft-green">
                              <Sparkles className="w-3.5 h-3.5" /> Featured
                            </span>
                          ) : (
                            <span className="text-[11px] text-chocolate/40">Standard</span>
                          )}
                        </td>

                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/puppies/${p.slug}`}
                              target="_blank"
                              className="p-1.5 rounded-lg bg-cream border border-chocolate text-chocolate hover:bg-warm-yellow"
                              title="View on site"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </Link>
                            <button
                              onClick={() => {
                                setEditingPuppy(p);
                                setPName(p.name);
                                setPBreedId(p.breedId);
                                setPGender(p.gender);
                                setPAgeWeeks(p.ageWeeks);
                                setPPriceAED(p.priceAED);
                                setPOrigin(p.origin);
                                setPStatus(p.status);
                                setPIsFeatured(p.isFeatured);
                                setPWeightKg(p.weightKg || 0.85);
                                setPColor(p.color);
                                setPPersonality(p.personality);
                                setPDescription(p.description);
                                setPImageUrl(p.images[0]?.url || '');
                                setShowAddPuppyModal(true);
                              }}
                              className="p-1.5 rounded-lg bg-warm-yellow border border-chocolate text-chocolate hover:bg-caramel hover:text-white"
                              title="Edit"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeletePuppy(p.id)}
                              className="p-1.5 rounded-lg bg-red-100 border border-red-300 text-terracotta hover:bg-terracotta hover:text-white"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: INQUIRIES */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-chocolate">Customer Inquiries</h3>
                <p className="text-xs text-chocolate/70">Manage VIP booking requests, update statuses, and add internal notes.</p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inquirySearch}
                  onChange={(e) => setInquirySearch(e.target.value)}
                  placeholder="Search customer, phone, puppy..."
                  className="py-2 px-3 rounded-xl bg-white border border-chocolate/30 text-xs text-chocolate focus:outline-none"
                />
                <select
                  value={inquiryStatusFilter}
                  onChange={(e) => setInquiryStatusFilter(e.target.value)}
                  className="py-2 px-3 rounded-xl bg-white border border-chocolate/30 text-xs font-bold text-chocolate focus:outline-none"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="NEW">New</option>
                  <option value="CONTACTED">Contacted</option>
                  <option value="FOLLOW_UP">Follow-up</option>
                  <option value="RESERVED">Reserved</option>
                  <option value="CLOSED">Closed</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Inquiries List (7 cols) */}
              <div className="lg:col-span-7 space-y-3">
                {filteredInquiries.map((inq) => (
                  <div
                    key={inq.id}
                    onClick={() => setSelectedInquiry(inq)}
                    className={`p-4 rounded-3xl border-2 transition-all cursor-pointer ${
                      selectedInquiry?.id === inq.id
                        ? 'bg-warm-yellow/30 border-chocolate shadow-scrapbook'
                        : 'bg-white border-chocolate/30 hover:border-chocolate'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <span className="font-bold text-sm text-chocolate block">{inq.customerName}</span>
                        <span className="text-xs text-chocolate/70">
                          {inq.customerPhone} &bull; {inq.customerEmail}
                        </span>
                      </div>
                      <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-light-peach border border-chocolate">
                        {inq.status}
                      </span>
                    </div>

                    {inq.puppyName && (
                      <span className="inline-block text-[11px] font-bold text-terracotta bg-white px-2 py-0.5 rounded-lg border border-chocolate/20 mb-2">
                        🐾 Puppy: {inq.puppyName}
                      </span>
                    )}

                    <p className="text-xs text-chocolate/80 line-clamp-2 italic">
                      &ldquo;{inq.message}&rdquo;
                    </p>
                  </div>
                ))}
              </div>

              {/* Inquiry Detail Panel (5 cols) */}
              <div className="lg:col-span-5">
                {selectedInquiry ? (
                  <div className="bg-white border-2 border-chocolate rounded-4xl p-6 shadow-scrapbook sticky top-28 space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-chocolate/15">
                      <h4 className="font-serif text-xl font-bold text-chocolate">Inquiry Profile</h4>
                      <button
                        onClick={() => handleDeleteInquiry(selectedInquiry.id)}
                        className="text-xs text-terracotta hover:underline font-bold"
                      >
                        Delete
                      </button>
                    </div>

                    <div>
                      <span className="text-xs text-chocolate/60 block">Customer</span>
                      <span className="font-bold text-chocolate text-base block">{selectedInquiry.customerName}</span>
                      <span className="text-xs text-chocolate/80 block">{selectedInquiry.customerPhone}</span>
                      <span className="text-xs text-chocolate/80 block">{selectedInquiry.customerEmail}</span>
                      <span className="text-xs text-chocolate/80 block">City: {selectedInquiry.city}</span>
                    </div>

                    <div className="pt-2">
                      <span className="text-xs text-chocolate/60 block mb-1">Status Workflow:</span>
                      <div className="grid grid-cols-3 gap-1.5">
                        {['NEW', 'CONTACTED', 'FOLLOW_UP', 'RESERVED', 'CLOSED'].map((st) => (
                          <button
                            key={st}
                            onClick={() => handleUpdateInquiry(selectedInquiry.id, st as any)}
                            className={`py-1 text-[10px] font-bold rounded-lg border ${
                              selectedInquiry.status === st
                                ? 'bg-warm-yellow border-chocolate text-chocolate shadow-xs'
                                : 'bg-cream border-chocolate/20 text-chocolate/70'
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="bg-cream/70 p-3 rounded-2xl border border-chocolate/20">
                      <span className="text-[11px] font-bold text-chocolate/70 block mb-1">Customer Message:</span>
                      <p className="text-xs text-chocolate leading-relaxed">{selectedInquiry.message}</p>
                    </div>

                    <div>
                      <span className="text-xs font-bold text-chocolate block mb-1">Internal Notes:</span>
                      <textarea
                        rows={2}
                        defaultValue={selectedInquiry.internalNotes || ''}
                        onBlur={(e) => handleUpdateInquiry(selectedInquiry.id, selectedInquiry.status, e.target.value)}
                        placeholder="Add private staff note (auto-saves on blur)..."
                        className="w-full py-2 px-3 rounded-xl bg-cream border border-chocolate/30 text-xs text-chocolate focus:outline-none"
                      />
                    </div>

                    <div className="flex gap-2 pt-2">
                      <a
                        href={`https://wa.me/${selectedInquiry.customerPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${selectedInquiry.customerName}! This is the TeddyPups UAE concierge team following up on your inquiry.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 px-3 rounded-xl bg-[#25D366] text-white font-bold text-xs flex items-center justify-center gap-1.5"
                      >
                        <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Customer
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white border-2 border-dashed border-chocolate rounded-4xl p-10 text-center text-chocolate/60">
                    <Inbox className="w-10 h-10 mx-auto mb-2 opacity-50" />
                    <p className="text-xs font-bold">Select an inquiry to view details and update workflow</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: TESTIMONIALS */}
        {activeTab === 'testimonials' && (
          <div className="space-y-6 animate-in fade-in">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-chocolate">Customer Stories & Approval</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((t) => (
                <div key={t.id} className="bg-white border-2 border-chocolate rounded-3xl p-5 shadow-scrapbook space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-chocolate">{t.puppyName}</h4>
                      <p className="text-xs text-terracotta">{t.customerName} &bull; {t.city}</p>
                    </div>
                    <button
                      onClick={() => handleToggleTestimonial(t.id, t.isApproved)}
                      className={`py-1 px-3 rounded-full text-xs font-bold border ${
                        t.isApproved ? 'bg-soft-green text-white border-chocolate' : 'bg-warm-yellow text-chocolate border-chocolate'
                      }`}
                    >
                      {t.isApproved ? '✓ Approved' : 'Hidden'}
                    </button>
                  </div>
                  <p className="text-xs text-chocolate/80 italic">&ldquo;{t.story}&rdquo;</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: WEBSITE SETTINGS */}
        {activeTab === 'settings' && (
          <div className="bg-white border-2 border-chocolate rounded-4xl p-6 sm:p-10 shadow-scrapbook max-w-3xl animate-in fade-in">
            <h3 className="font-serif text-2xl font-bold text-chocolate mb-1">Website Boutique Settings</h3>
            <p className="text-xs text-chocolate/70 mb-6">Update contact information, hero headline, and showroom address.</p>

            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-chocolate block mb-1">Brand Name</label>
                  <input
                    type="text"
                    value={settings.brandName}
                    onChange={(e) => setSettings({ ...settings, brandName: e.target.value })}
                    className="w-full py-2 px-3 rounded-xl bg-cream border border-chocolate/30 text-xs font-bold text-chocolate"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-chocolate block mb-1">WhatsApp Number</label>
                  <input
                    type="text"
                    value={settings.whatsappNumber}
                    onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                    className="w-full py-2 px-3 rounded-xl bg-cream border border-chocolate/30 text-xs font-bold text-chocolate"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-chocolate block mb-1">Concierge Phone</label>
                  <input
                    type="text"
                    value={settings.phone}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    className="w-full py-2 px-3 rounded-xl bg-cream border border-chocolate/30 text-xs font-bold text-chocolate"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-chocolate block mb-1">Concierge Email</label>
                  <input
                    type="email"
                    value={settings.email}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    className="w-full py-2 px-3 rounded-xl bg-cream border border-chocolate/30 text-xs font-bold text-chocolate"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-chocolate block mb-1">Showroom Address</label>
                <input
                  type="text"
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  className="w-full py-2 px-3 rounded-xl bg-cream border border-chocolate/30 text-xs font-bold text-chocolate"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-chocolate block mb-1">Hero Headline</label>
                <input
                  type="text"
                  value={settings.heroHeadline}
                  onChange={(e) => setSettings({ ...settings, heroHeadline: e.target.value })}
                  className="w-full py-2 px-3 rounded-xl bg-cream border border-chocolate/30 text-xs font-bold text-chocolate"
                />
              </div>

              <button
                type="submit"
                className="py-3 px-8 rounded-2xl bg-terracotta hover:bg-caramel text-white border-2 border-chocolate font-bold text-xs uppercase tracking-wider shadow-scrapbook"
              >
                Save Settings
              </button>
            </form>
          </div>
        )}

      </div>

      {/* Add / Edit Puppy Modal */}
      {showAddPuppyModal && (
        <div className="fixed inset-0 z-50 bg-dark-brown/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border-3 border-chocolate rounded-5xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-scrapbook-xl relative">
            <button
              onClick={() => setShowAddPuppyModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-light-peach border border-chocolate"
            >
              <X className="w-5 h-5 text-chocolate" />
            </button>

            <h3 className="font-serif text-2xl font-bold text-chocolate mb-4">
              {editingPuppy ? `Edit Profile: ${editingPuppy.name}` : 'Add New Puppy to Nursery'}
            </h3>

            <form onSubmit={handleSavePuppy} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-chocolate block mb-1">Puppy Name *</label>
                  <input
                    type="text"
                    required
                    value={pName}
                    onChange={(e) => setPName(e.target.value)}
                    className="w-full py-2 px-3 rounded-xl bg-cream border border-chocolate/30 text-xs font-bold text-chocolate"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-chocolate block mb-1">Breed *</label>
                  <select
                    value={pBreedId}
                    onChange={(e) => setPBreedId(e.target.value)}
                    className="w-full py-2 px-3 rounded-xl bg-cream border border-chocolate/30 text-xs font-bold text-chocolate"
                  >
                    {initialBreeds.map((b) => (
                      <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-chocolate block mb-1">Gender</label>
                  <select
                    value={pGender}
                    onChange={(e) => setPGender(e.target.value as any)}
                    className="w-full py-2 px-3 rounded-xl bg-cream border border-chocolate/30 text-xs font-bold text-chocolate"
                  >
                    <option value="MALE">♂ Boy</option>
                    <option value="FEMALE">♀ Girl</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-chocolate block mb-1">Age in Weeks</label>
                  <input
                    type="number"
                    value={pAgeWeeks}
                    onChange={(e) => setPAgeWeeks(Number(e.target.value))}
                    className="w-full py-2 px-3 rounded-xl bg-cream border border-chocolate/30 text-xs font-bold text-chocolate"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-chocolate block mb-1">Price in AED *</label>
                  <input
                    type="number"
                    required
                    value={pPriceAED}
                    onChange={(e) => setPPriceAED(Number(e.target.value))}
                    className="w-full py-2 px-3 rounded-xl bg-cream border border-chocolate/30 text-xs font-bold text-chocolate"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-chocolate block mb-1">Status</label>
                  <select
                    value={pStatus}
                    onChange={(e) => setPStatus(e.target.value as any)}
                    className="w-full py-2 px-3 rounded-xl bg-cream border border-chocolate/30 text-xs font-bold text-chocolate"
                  >
                    <option value="AVAILABLE">Available</option>
                    <option value="RESERVED">Reserved</option>
                    <option value="PENDING">Pending</option>
                    <option value="GONE_HOME">Gone Home</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-chocolate block mb-1">Origin</label>
                  <select
                    value={pOrigin}
                    onChange={(e) => setPOrigin(e.target.value as any)}
                    className="w-full py-2 px-3 rounded-xl bg-cream border border-chocolate/30 text-xs font-bold text-chocolate"
                  >
                    <option value="LOCAL_DUBAI">🇦🇪 Local Dubai Nursery</option>
                    <option value="IMPORTED">✈️ Imported European</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-chocolate block mb-1">Color Shade</label>
                  <input
                    type="text"
                    value={pColor}
                    onChange={(e) => setPColor(e.target.value)}
                    className="w-full py-2 px-3 rounded-xl bg-cream border border-chocolate/30 text-xs font-bold text-chocolate"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-chocolate block mb-1">Primary Image URL</label>
                <input
                  type="url"
                  required
                  value={pImageUrl}
                  onChange={(e) => setPImageUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full py-2 px-3 rounded-xl bg-cream border border-chocolate/30 text-xs font-bold text-chocolate"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-chocolate block mb-1">Personality Quote</label>
                <input
                  type="text"
                  value={pPersonality}
                  onChange={(e) => setPPersonality(e.target.value)}
                  className="w-full py-2 px-3 rounded-xl bg-cream border border-chocolate/30 text-xs font-bold text-chocolate"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-chocolate block mb-1">Full Description</label>
                <textarea
                  rows={3}
                  value={pDescription}
                  onChange={(e) => setPDescription(e.target.value)}
                  className="w-full py-2 px-3 rounded-xl bg-cream border border-chocolate/30 text-xs font-medium text-chocolate resize-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featCheck"
                  checked={pIsFeatured}
                  onChange={(e) => setPIsFeatured(e.target.checked)}
                  className="accent-caramel w-4 h-4"
                />
                <label htmlFor="featCheck" className="text-xs font-bold text-chocolate">
                  Feature this puppy on homepage
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddPuppyModal(false)}
                  className="py-2.5 px-5 rounded-xl border border-chocolate text-xs font-bold text-chocolate"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-6 rounded-xl bg-terracotta text-white font-bold text-xs uppercase tracking-wider"
                >
                  Save Puppy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

