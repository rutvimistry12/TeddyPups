"use client";

import React, { useState, useMemo } from 'react';
import { Puppy, Breed } from '@/lib/types';
import { PuppyCard } from '@/components/puppy/PuppyCard';
import { usePuppy } from '@/context/PuppyContext';
import {
  Search,
  Filter,
  SlidersHorizontal,
  X,
  LayoutGrid,
  List,
  Sparkles,
  Heart,
  RefreshCw,
} from 'lucide-react';
import { TapeStrip, PawPrint } from '@/components/illustrations/PuppyDoodles';

interface PuppyCatalogClientProps {
  initialPuppies: Puppy[];
  breeds: Breed[];
  initialFilter?: string;
}

export function PuppyCatalogClient({
  initialPuppies,
  breeds,
  initialFilter,
}: PuppyCatalogClientProps) {
  const { favorites } = usePuppy();

  // Search & Filter State
  const [search, setSearch] = useState('');
  const [selectedBreed, setSelectedBreed] = useState('ALL');
  const [selectedGender, setSelectedGender] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedOrigin, setSelectedOrigin] = useState('ALL');
  const [maxPrice, setMaxPrice] = useState<number>(20000);
  const [sortBy, setSortBy] = useState<'newest' | 'price_asc' | 'price_desc' | 'age_asc'>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [onlyFavorites, setOnlyFavorites] = useState(initialFilter === 'favorites');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Clear filters
  const resetFilters = () => {
    setSearch('');
    setSelectedBreed('ALL');
    setSelectedGender('ALL');
    setSelectedStatus('ALL');
    setSelectedOrigin('ALL');
    setMaxPrice(20000);
    setSortBy('newest');
    setOnlyFavorites(false);
  };

  // Filtered & Sorted list
  const filteredPuppies = useMemo(() => {
    let list = [...initialPuppies];

    if (onlyFavorites) {
      list = list.filter((p) => favorites.includes(p.id));
    }

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.breedName.toLowerCase().includes(q) ||
          p.color.toLowerCase().includes(q) ||
          p.personality.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (selectedBreed !== 'ALL') {
      list = list.filter((p) => p.breedId === selectedBreed);
    }

    if (selectedGender !== 'ALL') {
      list = list.filter((p) => p.gender === selectedGender);
    }

    if (selectedStatus !== 'ALL') {
      list = list.filter((p) => p.status === selectedStatus);
    }

    if (selectedOrigin !== 'ALL') {
      list = list.filter((p) => p.origin === selectedOrigin);
    }

    if (maxPrice < 20000) {
      list = list.filter((p) => p.priceAED <= maxPrice);
    }

    switch (sortBy) {
      case 'price_asc':
        list.sort((a, b) => a.priceAED - b.priceAED);
        break;
      case 'price_desc':
        list.sort((a, b) => b.priceAED - a.priceAED);
        break;
      case 'age_asc':
        list.sort((a, b) => a.ageWeeks - b.ageWeeks);
        break;
      case 'newest':
      default:
        list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    return list;
  }, [
    initialPuppies,
    onlyFavorites,
    favorites,
    search,
    selectedBreed,
    selectedGender,
    selectedStatus,
    selectedOrigin,
    maxPrice,
    sortBy,
  ]);

  return (
    <div className="py-12 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title & Scrapbook Subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-light-peach border-2 border-chocolate text-chocolate font-bold text-xs uppercase tracking-widest shadow-scrapbook mb-4">
            <PawPrint className="w-3.5 h-3.5 text-caramel" />
            Curated UAE Nursery
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-extrabold text-chocolate tracking-tight mb-3">
            Meet the pups
          </h1>
          <p className="text-chocolate/80 text-base sm:text-xl font-medium">
            Real puppies, real photos, looking for their families right now.
          </p>
        </div>

        {/* Top Control Bar: Search, View Mode, Filter Drawer Trigger */}
        <div className="bg-white border-2 border-chocolate rounded-3xl p-4 sm:p-5 shadow-scrapbook mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-chocolate/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, breed, color (e.g. Milo, Apricot)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-cream/70 border border-chocolate/30 text-xs sm:text-sm text-chocolate placeholder:text-chocolate/40 focus:outline-none focus:border-chocolate font-medium"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-chocolate/40 hover:text-chocolate"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Filter Badges (Desktop) */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
            
            {/* Favorites Toggle */}
            <button
              onClick={() => setOnlyFavorites(!onlyFavorites)}
              className={`flex items-center gap-1.5 py-2 px-3 rounded-2xl border-2 text-xs font-bold transition-all ${
                onlyFavorites
                  ? 'bg-terracotta text-white border-chocolate shadow-xs'
                  : 'bg-cream text-chocolate border-chocolate/40 hover:border-chocolate'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${onlyFavorites ? 'fill-white text-white' : 'text-terracotta'}`} />
              <span>Favorites ({favorites.length})</span>
            </button>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-1.5 py-2 px-3 rounded-2xl bg-warm-yellow border-2 border-chocolate text-chocolate text-xs font-bold shadow-xs"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>

            {/* Sorting Dropdown */}
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-xs font-bold text-chocolate/60">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="py-2 px-3 rounded-2xl bg-cream border border-chocolate/30 text-xs font-bold text-chocolate focus:outline-none focus:border-chocolate cursor-pointer"
              >
                <option value="newest">Newest Arrivals</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="age_asc">Age: Youngest</option>
              </select>
            </div>

            {/* Grid / List View Toggle */}
            <div className="hidden sm:flex items-center gap-1 bg-cream p-1 rounded-2xl border border-chocolate/20">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-xl transition-colors ${viewMode === 'grid' ? 'bg-warm-yellow border border-chocolate text-chocolate shadow-xs' : 'text-chocolate/60'}`}
                title="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-xl transition-colors ${viewMode === 'list' ? 'bg-warm-yellow border border-chocolate text-chocolate shadow-xs' : 'text-chocolate/60'}`}
                title="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* Catalog Main Layout: Desktop Sidebar Filters + Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-1 space-y-6">
            <div className="bg-white border-2 border-chocolate rounded-4xl p-6 shadow-scrapbook sticky top-28">
              <div className="flex items-center justify-between pb-4 border-b border-dashed border-caramel/40 mb-5">
                <div className="flex items-center gap-2 font-serif text-lg font-bold text-chocolate">
                  <Filter className="w-4 h-4 text-terracotta" />
                  <span>Filter Puppies</span>
                </div>
                <button
                  onClick={resetFilters}
                  className="text-[11px] uppercase tracking-wider text-terracotta font-bold hover:underline flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" /> Reset
                </button>
              </div>

              {/* Breed Filter */}
              <div className="space-y-2 mb-6">
                <label className="text-xs font-extrabold uppercase tracking-wider text-chocolate/70 block">
                  Breed
                </label>
                <select
                  value={selectedBreed}
                  onChange={(e) => setSelectedBreed(e.target.value)}
                  className="w-full py-2 px-3 rounded-xl bg-cream border border-chocolate/30 text-xs font-bold text-chocolate focus:outline-none"
                >
                  <option value="ALL">All Breeds ({initialPuppies.length})</option>
                  {breeds.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Gender Filter */}
              <div className="space-y-2 mb-6">
                <label className="text-xs font-extrabold uppercase tracking-wider text-chocolate/70 block">
                  Gender
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { key: 'ALL', label: 'All' },
                    { key: 'MALE', label: '♂ Boy' },
                    { key: 'FEMALE', label: '♀ Girl' },
                  ].map((g) => (
                    <button
                      key={g.key}
                      onClick={() => setSelectedGender(g.key)}
                      className={`py-1.5 text-xs font-bold rounded-xl border transition-all ${
                        selectedGender === g.key
                          ? 'bg-warm-yellow border-chocolate text-chocolate shadow-xs'
                          : 'bg-cream border-chocolate/20 text-chocolate/70'
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status Filter */}
              <div className="space-y-2 mb-6">
                <label className="text-xs font-extrabold uppercase tracking-wider text-chocolate/70 block">
                  Availability
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full py-2 px-3 rounded-xl bg-cream border border-chocolate/30 text-xs font-bold text-chocolate focus:outline-none"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="AVAILABLE">Available</option>
                  <option value="RESERVED">Reserved</option>
                  <option value="GONE_HOME">Gone Home</option>
                </select>
              </div>

              {/* Origin Filter */}
              <div className="space-y-2 mb-6">
                <label className="text-xs font-extrabold uppercase tracking-wider text-chocolate/70 block">
                  Origin
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { key: 'ALL', label: 'All' },
                    { key: 'LOCAL_DUBAI', label: '🇦🇪 Dubai' },
                    { key: 'IMPORTED', label: '✈️ Import' },
                  ].map((o) => (
                    <button
                      key={o.key}
                      onClick={() => setSelectedOrigin(o.key)}
                      className={`py-1.5 text-[11px] font-bold rounded-xl border transition-all ${
                        selectedOrigin === o.key
                          ? 'bg-warm-yellow border-chocolate text-chocolate shadow-xs'
                          : 'bg-cream border-chocolate/20 text-chocolate/70'
                      }`}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Max Price Range Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-chocolate">
                  <span>Max Budget:</span>
                  <span className="text-terracotta">{maxPrice.toLocaleString()} AED</span>
                </div>
                <input
                  type="range"
                  min={10000}
                  max={20000}
                  step={500}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-caramel cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-chocolate/50 font-bold">
                  <span>10,000 AED</span>
                  <span>20,000 AED</span>
                </div>
              </div>

            </div>
          </aside>

          {/* Right Main Grid */}
          <main className="lg:col-span-3">
            
            {/* Result Count and Active Filters Summary */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm font-bold text-chocolate/80">
                Showing <span className="text-terracotta">{filteredPuppies.length}</span> puppies
              </p>
              {(selectedBreed !== 'ALL' || selectedGender !== 'ALL' || selectedStatus !== 'ALL' || selectedOrigin !== 'ALL' || onlyFavorites || maxPrice < 20000) && (
                <button
                  onClick={resetFilters}
                  className="text-xs font-bold text-terracotta underline"
                >
                  Clear Active Filters
                </button>
              )}
            </div>

            {/* Puppies Rendering */}
            {filteredPuppies.length > 0 ? (
              <div
                className={`grid gap-6 ${
                  viewMode === 'grid'
                    ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-2'
                    : 'grid-cols-1'
                }`}
              >
                {filteredPuppies.map((puppy, idx) => (
                  <PuppyCard
                    key={puppy.id}
                    puppy={puppy}
                    rotate={idx % 2 === 0 ? -0.5 : 0.5}
                    catalogPhoto
                    photoIndex={idx}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white border-2 border-dashed border-chocolate rounded-4xl p-12 text-center shadow-scrapbook">
                <PawPrint className="w-12 h-12 text-caramel mx-auto mb-3" />
                <h3 className="font-serif text-2xl font-bold text-chocolate mb-2">
                  No Puppies Found Matching Your Criteria
                </h3>
                <p className="text-sm text-chocolate/70 max-w-md mx-auto mb-6">
                  Try adjusting your filters or search keywords, or message our nursery concierge directly to inquire about incoming upcoming litters.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <button
                    onClick={resetFilters}
                    className="py-2.5 px-6 rounded-full bg-warm-yellow border-2 border-chocolate text-chocolate font-bold text-xs uppercase tracking-wider"
                  >
                    Reset Filters
                  </button>
                  <a
                    href={`https://wa.me/971501234567?text=${encodeURIComponent("Hello TeddyPups UAE! I am looking for a specific puppy not currently listed on your website.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-6 rounded-full bg-[#25D366] text-white border-2 border-chocolate font-bold text-xs uppercase tracking-wider"
                  >
                    Ask Nursery on WhatsApp
                  </a>
                </div>
              </div>
            )}

          </main>
        </div>

      </div>

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-dark-brown/60 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-xs bg-cream h-full p-6 overflow-y-auto space-y-6 shadow-scrapbook-xl border-l-2 border-chocolate animate-in slide-in-from-right">
            <div className="flex items-center justify-between pb-4 border-b border-chocolate/20">
              <h3 className="font-serif text-xl font-bold text-chocolate">Filters</h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 rounded-full bg-light-peach border border-chocolate"
              >
                <X className="w-5 h-5 text-chocolate" />
              </button>
            </div>

            {/* Mobile Filters Form */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-chocolate block mb-1">Breed</label>
                <select
                  value={selectedBreed}
                  onChange={(e) => setSelectedBreed(e.target.value)}
                  className="w-full py-2 px-3 rounded-xl bg-white border border-chocolate/30 text-xs font-bold text-chocolate"
                >
                  <option value="ALL">All Breeds</option>
                  {breeds.map((b) => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-chocolate block mb-1">Gender</label>
                <div className="grid grid-cols-3 gap-1">
                  {['ALL', 'MALE', 'FEMALE'].map((g) => (
                    <button
                      key={g}
                      onClick={() => setSelectedGender(g)}
                      className={`py-1 text-xs font-bold rounded-lg border ${selectedGender === g ? 'bg-warm-yellow border-chocolate' : 'bg-white'}`}
                    >
                      {g === 'ALL' ? 'Any' : g === 'MALE' ? 'Boy' : 'Girl'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-chocolate block mb-1">Status</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full py-2 px-3 rounded-xl bg-white border border-chocolate/30 text-xs font-bold text-chocolate"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="AVAILABLE">Available</option>
                  <option value="RESERVED">Reserved</option>
                  <option value="GONE_HOME">Gone Home</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-chocolate block mb-1">Origin</label>
                <div className="grid grid-cols-3 gap-1">
                  {['ALL', 'LOCAL_DUBAI', 'IMPORTED'].map((o) => (
                    <button
                      key={o}
                      onClick={() => setSelectedOrigin(o)}
                      className={`py-1 text-[11px] font-bold rounded-lg border ${selectedOrigin === o ? 'bg-warm-yellow border-chocolate' : 'bg-white'}`}
                    >
                      {o === 'ALL' ? 'All' : o === 'LOCAL_DUBAI' ? 'Dubai' : 'Import'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-chocolate block mb-1">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full py-2 px-3 rounded-xl bg-white border border-chocolate/30 text-xs font-bold text-chocolate"
                >
                  <option value="newest">Newest</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="age_asc">Age: Youngest</option>
                </select>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-full py-3 rounded-2xl bg-terracotta text-white font-bold text-xs uppercase border-2 border-chocolate shadow-scrapbook"
                >
                  Show ({filteredPuppies.length}) Puppies
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

