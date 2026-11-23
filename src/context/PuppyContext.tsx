"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Puppy } from '@/lib/types';

interface PuppyContextType {
  favorites: string[];
  toggleFavorite: (puppyId: string) => void;
  isFavorite: (puppyId: string) => boolean;
  comparedPuppies: Puppy[];
  addToCompare: (puppy: Puppy) => boolean;
  removeFromCompare: (puppyId: string) => void;
  clearCompare: () => void;
  isComparing: (puppyId: string) => boolean;
  recentlyViewed: Puppy[];
  addRecentlyViewed: (puppy: Puppy) => void;
  isQuizOpen: boolean;
  openQuiz: () => void;
  closeQuiz: () => void;
  isCompareOpen: boolean;
  openCompare: () => void;
  closeCompare: () => void;
}

const PuppyContext = createContext<PuppyContextType | undefined>(undefined);

export function PuppyProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [comparedPuppies, setComparedPuppies] = useState<Puppy[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<Puppy[]>([]);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // Initialize from LocalStorage
  useEffect(() => {
    try {
      const storedFavs = localStorage.getItem('teddypups_favorites');
      if (storedFavs) {
        setFavorites(JSON.parse(storedFavs));
      }
      const storedRecent = localStorage.getItem('teddypups_recently_viewed');
      if (storedRecent) {
        setRecentlyViewed(JSON.parse(storedRecent));
      }
    } catch {
      // LocalStorage access guard
    }
  }, []);

  const toggleFavorite = (puppyId: string) => {
    setFavorites(prev => {
      const next = prev.includes(puppyId) ? prev.filter(id => id !== puppyId) : [...prev, puppyId];
      try {
        localStorage.setItem('teddypups_favorites', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const isFavorite = (puppyId: string) => favorites.includes(puppyId);

  const addToCompare = (puppy: Puppy) => {
    if (comparedPuppies.some(p => p.id === puppy.id)) {
      removeFromCompare(puppy.id);
      return false;
    }
    if (comparedPuppies.length >= 3) {
      alert("You can compare up to 3 puppies at once. Please remove one first.");
      return false;
    }
    setComparedPuppies(prev => [...prev, puppy]);
    setIsCompareOpen(true);
    return true;
  };

  const removeFromCompare = (puppyId: string) => {
    setComparedPuppies(prev => prev.filter(p => p.id !== puppyId));
  };

  const clearCompare = () => setComparedPuppies([]);
  const isComparing = (puppyId: string) => comparedPuppies.some(p => p.id === puppyId);

  const addRecentlyViewed = (puppy: Puppy) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(p => p.id !== puppy.id);
      const updated = [puppy, ...filtered].slice(0, 6);
      try {
        localStorage.setItem('teddypups_recently_viewed', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  return (
    <PuppyContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        comparedPuppies,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isComparing,
        recentlyViewed,
        addRecentlyViewed,
        isQuizOpen,
        openQuiz: () => setIsQuizOpen(true),
        closeQuiz: () => setIsQuizOpen(false),
        isCompareOpen,
        openCompare: () => setIsCompareOpen(true),
        closeCompare: () => setIsCompareOpen(false),
      }}
    >
      {children}
    </PuppyContext.Provider>
  );
}

export function usePuppy() {
  const ctx = useContext(PuppyContext);
  if (!ctx) throw new Error("usePuppy must be used within a PuppyProvider");
  return ctx;
}

