import { z } from 'zod';

const imageSchema = z.object({
  id: z.string().min(1),
  url: z.string().trim().min(1).max(2048),
  isPrimary: z.boolean(),
  altText: z.string().max(250),
  order: z.number().int().min(0),
});

const videoSchema = z.object({
  id: z.string().min(1),
  url: z.string().trim().min(1).max(2048),
  thumbnailUrl: z.string().max(2048).optional(),
  title: z.string().max(150).optional(),
});

export const puppySchema = z.object({
  slug: z.string().trim().min(2).max(120).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  name: z.string().trim().min(1).max(80),
  breedId: z.string().min(1),
  breedName: z.string().trim().min(1).max(100),
  gender: z.enum(['MALE', 'FEMALE']),
  ageWeeks: z.number().int().min(1).max(260),
  priceAED: z.number().int().min(0).max(10000000),
  origin: z.enum(['LOCAL_DUBAI', 'IMPORTED']),
  location: z.string().trim().min(1).max(180),
  status: z.enum(['AVAILABLE', 'RESERVED', 'PENDING', 'GONE_HOME']),
  isFeatured: z.boolean(),
  weightKg: z.number().positive().max(100).optional(),
  color: z.string().trim().min(1).max(80),
  personality: z.string().trim().min(1).max(500),
  description: z.string().trim().min(1).max(5000),
  healthNotes: z.string().max(2000).optional(),
  parentInfo: z.string().max(1000).optional(),
  microchipped: z.boolean(),
  vaccinated: z.boolean(),
  passportReady: z.boolean(),
  healthTested: z.boolean(),
  images: z.array(imageSchema).max(20),
  videos: z.array(videoSchema).max(10).optional(),
});

export const puppyUpdateSchema = puppySchema.partial();

export const inquirySchema = z.object({
  puppyId: z.string().min(1).optional(),
  puppyName: z.string().trim().max(100).optional(),
  customerName: z.string().trim().min(2).max(120),
  customerEmail: z.string().trim().email().max(254),
  customerPhone: z.string().trim().min(6).max(40),
  city: z.string().trim().max(100).optional(),
  preferredMethod: z.enum(['WHATSAPP', 'PHONE', 'EMAIL']).default('WHATSAPP'),
  message: z.string().trim().min(5).max(3000),
});

export const inquiryUpdateSchema = z.object({
  status: z.enum(['NEW', 'CONTACTED', 'FOLLOW_UP', 'RESERVED', 'CLOSED']),
  internalNotes: z.string().max(5000).optional(),
});

const testimonialImageSchema = z.object({
  id: z.string().min(1),
  url: z.string().trim().min(1).max(2048),
  altText: z.string().max(250).optional(),
});

export const testimonialSchema = z.object({
  customerName: z.string().trim().min(1).max(120),
  puppyName: z.string().trim().min(1).max(80),
  breedName: z.string().trim().min(1).max(100),
  city: z.string().trim().min(1).max(100),
  story: z.string().trim().min(1).max(5000),
  quote: z.string().trim().min(1).max(1000),
  rating: z.number().int().min(1).max(5),
  isApproved: z.boolean(),
  isFeatured: z.boolean(),
  adoptedDate: z.string().max(80),
  images: z.array(testimonialImageSchema).max(20),
});

export const testimonialUpdateSchema = testimonialSchema.partial();

export const websiteSettingsSchema = z.object({
  brandName: z.string().trim().min(1).max(100),
  tagline: z.string().trim().max(250),
  whatsappNumber: z.string().trim().min(6).max(40),
  phone: z.string().trim().min(6).max(40),
  email: z.string().trim().email().max(254),
  address: z.string().trim().min(1).max(300),
  openingHours: z.string().trim().max(300),
  heroHeadline: z.string().trim().min(1).max(160),
  heroSubheadline: z.string().trim().max(500),
  instagramUrl: z.string().trim().url().max(2048),
  tiktokUrl: z.string().trim().url().max(2048),
});

export const quizAnswerSchema = z.object({
  livingSpace: z.enum(['apartment', 'villa_with_garden', 'penthouse']),
  activityLevel: z.enum(['calm_lap_cuddles', 'moderate_walks', 'playful_energetic']),
  preferredSize: z.enum(['micro_teacup', 'toy', 'miniature']),
  familyType: z.enum(['single_couple', 'family_with_kids', 'frequent_traveler']),
  hypoallergenicImportant: z.boolean(),
  budgetRange: z.enum(['standard', 'premium', 'ultra_exclusive']),
});
