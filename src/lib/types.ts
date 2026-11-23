export type PuppyStatus = 'AVAILABLE' | 'RESERVED' | 'PENDING' | 'GONE_HOME';
export type Gender = 'MALE' | 'FEMALE';
export type InquiryStatus = 'NEW' | 'CONTACTED' | 'FOLLOW_UP' | 'RESERVED' | 'CLOSED';
export type ContactMethod = 'WHATSAPP' | 'PHONE' | 'EMAIL';
export type PuppyOrigin = 'LOCAL_DUBAI' | 'IMPORTED';
export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR';

export interface Breed {
  id: string;
  name: string;
  slug: string;
  description: string;
  averageSize: string;
  hypoallergenic: boolean;
}

export interface PuppyImage {
  id: string;
  url: string;
  isPrimary: boolean;
  altText: string;
  order: number;
}

export interface PuppyVideo {
  id: string;
  url: string;
  thumbnailUrl?: string;
  title?: string;
}

export interface Puppy {
  id: string;
  slug: string;
  name: string;
  breedId: string;
  breedName: string;
  gender: Gender;
  ageWeeks: number;
  priceAED: number;
  origin: PuppyOrigin;
  location: string;
  status: PuppyStatus;
  isFeatured: boolean;
  weightKg?: number;
  color: string;
  personality: string;
  description: string;
  healthNotes?: string;
  parentInfo?: string;
  microchipped: boolean;
  vaccinated: boolean;
  passportReady: boolean;
  healthTested: boolean;
  images: PuppyImage[];
  videos?: PuppyVideo[];
  createdAt: string;
  updatedAt: string;
}

export interface Testimonial {
  id: string;
  customerName: string;
  puppyName: string;
  breedName: string;
  city: string;
  story: string;
  quote: string;
  rating: number;
  isApproved: boolean;
  isFeatured: boolean;
  adoptedDate: string;
  images: { id: string; url: string; altText?: string }[];
  createdAt: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  isPublished: boolean;
}

export interface Inquiry {
  id: string;
  puppyId?: string;
  puppyName?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  city: string;
  preferredMethod: ContactMethod;
  message: string;
  status: InquiryStatus;
  internalNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface WebsiteSettings {
  brandName: string;
  tagline: string;
  whatsappNumber: string;
  phone: string;
  email: string;
  address: string;
  openingHours: string;
  heroHeadline: string;
  heroSubheadline: string;
  instagramUrl: string;
  tiktokUrl: string;
}

export interface QuizAnswer {
  livingSpace: 'apartment' | 'villa_with_garden' | 'penthouse';
  activityLevel: 'calm_lap_cuddles' | 'moderate_walks' | 'playful_energetic';
  preferredSize: 'micro_teacup' | 'toy' | 'miniature';
  familyType: 'single_couple' | 'family_with_kids' | 'frequent_traveler';
  hypoallergenicImportant: boolean;
  budgetRange: 'standard' | 'premium' | 'ultra_exclusive';
}

