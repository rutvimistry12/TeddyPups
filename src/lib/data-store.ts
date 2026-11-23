import { Puppy, Breed, Testimonial, FAQItem, WebsiteSettings, Inquiry, InquiryStatus, QuizAnswer } from './types';
import { INITIAL_BREEDS, INITIAL_PUPPIES, INITIAL_TESTIMONIALS, INITIAL_FAQS, INITIAL_SETTINGS } from './demo-data';
import { Prisma } from '@prisma/client';
import { prisma } from './db';

export const isPostgresEnabled = process.env.NODE_ENV === 'production' || process.env.DATA_BACKEND === 'postgres';
const usePostgres = isPostgresEnabled;
const puppyInclude = {
  breed: true,
  images: { orderBy: { order: 'asc' as const } },
  videos: true,
};

type DatabasePuppy = Prisma.PuppyGetPayload<{ include: typeof puppyInclude }>;

function mapPuppy(puppy: DatabasePuppy): Puppy {
  return {
    id: puppy.id,
    slug: puppy.slug,
    name: puppy.name,
    breedId: puppy.breedId,
    breedName: puppy.breed.name,
    gender: puppy.gender,
    ageWeeks: puppy.ageWeeks,
    priceAED: puppy.priceAED,
    origin: puppy.origin,
    location: puppy.location,
    status: puppy.status,
    isFeatured: puppy.isFeatured,
    weightKg: puppy.weightKg ?? undefined,
    color: puppy.color,
    personality: puppy.personality,
    description: puppy.description,
    healthNotes: puppy.healthNotes ?? undefined,
    parentInfo: puppy.parentInfo ?? undefined,
    microchipped: puppy.microchipped,
    vaccinated: puppy.vaccinated,
    passportReady: puppy.passportReady,
    healthTested: puppy.healthTested,
    images: puppy.images.map((image) => ({
      id: image.id,
      url: image.url,
      isPrimary: image.isPrimary,
      altText: image.altText ?? '',
      order: image.order,
    })),
    videos: puppy.videos.map((video) => ({
      id: video.id,
      url: video.url,
      thumbnailUrl: video.thumbnailUrl ?? undefined,
      title: video.title ?? undefined,
    })),
    createdAt: puppy.createdAt.toISOString(),
    updatedAt: puppy.updatedAt.toISOString(),
  };
}

// Server-side in-memory store that persists across requests in the Node process
let breedsStore: Breed[] = [...INITIAL_BREEDS];
let puppiesStore: Puppy[] = [...INITIAL_PUPPIES];
let testimonialsStore: Testimonial[] = [...INITIAL_TESTIMONIALS];
let faqsStore: FAQItem[] = [...INITIAL_FAQS];
let settingsStore: WebsiteSettings = { ...INITIAL_SETTINGS };
let inquiriesStore: Inquiry[] = [
  {
    id: "inq-101",
    puppyId: "pup-01",
    puppyName: "Milo",
    customerName: "Amina Al Mansoori",
    customerEmail: "amina.m@example.com",
    customerPhone: "+971509988776",
    city: "Dubai",
    preferredMethod: "WHATSAPP",
    message: "Hello! We would love to book a VIP showroom viewing for Milo this Saturday afternoon.",
    status: "NEW",
    internalNotes: "Requested appointment for Saturday 3:00 PM.",
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: "inq-102",
    puppyId: "pup-02",
    puppyName: "Coco",
    customerName: "Faris Jamil",
    customerEmail: "faris.j@example.com",
    customerPhone: "+971523456789",
    city: "Abu Dhabi",
    preferredMethod: "PHONE",
    message: "Inquiring about delivery to Saadiyat Island and pedigree paperwork for Coco.",
    status: "CONTACTED",
    internalNotes: "Sent passport copy and video over WhatsApp.",
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
];

export async function getBreeds(): Promise<Breed[]> {
  if (usePostgres) {
    const breeds = await prisma.breed.findMany({ orderBy: { name: 'asc' } });
    return breeds.map((breed) => ({
      id: breed.id,
      name: breed.name,
      slug: breed.slug,
      description: breed.description ?? '',
      averageSize: breed.averageSize ?? '',
      hypoallergenic: breed.hypoallergenic,
    }));
  }
  return breedsStore;
}

export interface PuppyFilterOptions {
  breed?: string;
  gender?: string;
  status?: string;
  origin?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  featuredOnly?: boolean;
  sortBy?: 'price_asc' | 'price_desc' | 'age_asc' | 'newest';
}

export async function getPuppies(filters?: PuppyFilterOptions): Promise<Puppy[]> {
  if (usePostgres) {
    const where: Prisma.PuppyWhereInput = {};
    const conditions: Prisma.PuppyWhereInput[] = [];
    if (filters?.search?.trim()) {
      const search = filters.search.trim();
      conditions.push({
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { color: { contains: search, mode: 'insensitive' } },
          { personality: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
          { breed: { name: { contains: search, mode: 'insensitive' } } },
        ],
      });
    }
    if (filters?.breed && filters.breed !== 'ALL') {
      conditions.push({
        OR: [
          { breedId: filters.breed },
          { breed: { name: { contains: filters.breed, mode: 'insensitive' } } },
        ],
      });
    }
    if (filters?.gender && filters.gender !== 'ALL') {
      where.gender = filters.gender as Prisma.PuppyWhereInput['gender'];
    }
    if (filters?.status && filters.status !== 'ALL') {
      where.status = filters.status as Prisma.PuppyWhereInput['status'];
    }
    if (filters?.origin && filters.origin !== 'ALL') {
      where.origin = filters.origin as Prisma.PuppyWhereInput['origin'];
    }
    if (filters?.featuredOnly) where.isFeatured = true;
    if (filters?.minPrice !== undefined || filters?.maxPrice !== undefined) {
      where.priceAED = {
        ...(filters.minPrice !== undefined ? { gte: filters.minPrice } : {}),
        ...(filters.maxPrice !== undefined ? { lte: filters.maxPrice } : {}),
      };
    }
    if (conditions.length > 0) where.AND = conditions;

    const orderBy: Prisma.PuppyOrderByWithRelationInput =
      filters?.sortBy === 'price_asc' ? { priceAED: 'asc' }
        : filters?.sortBy === 'price_desc' ? { priceAED: 'desc' }
          : filters?.sortBy === 'age_asc' ? { ageWeeks: 'asc' }
            : filters?.sortBy === 'newest' ? { createdAt: 'desc' }
              : { createdAt: 'desc' };

    const puppies = await prisma.puppy.findMany({ where, orderBy, include: puppyInclude });
    return puppies.map(mapPuppy);
  }

  let list = [...puppiesStore];

  if (filters?.search) {
    const q = filters.search.toLowerCase().trim();
    list = list.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.breedName.toLowerCase().includes(q) ||
        p.color.toLowerCase().includes(q) ||
        p.personality.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  if (filters?.breed && filters.breed !== 'ALL') {
    const breedQuery = filters.breed.toLowerCase();
    const breedExact = filters.breed;
    list = list.filter(p => p.breedId === breedExact || p.breedName.toLowerCase().includes(breedQuery));
  }

  if (filters?.gender && filters.gender !== 'ALL') {
    const g = filters.gender;
    list = list.filter(p => p.gender === g);
  }

  if (filters?.status && filters.status !== 'ALL') {
    const st = filters.status;
    list = list.filter(p => p.status === st);
  }

  if (filters?.origin && filters.origin !== 'ALL') {
    const org = filters.origin;
    list = list.filter(p => p.origin === org);
  }

  if (filters?.minPrice !== undefined) {
    const minP = filters.minPrice;
    list = list.filter(p => p.priceAED >= minP);
  }

  if (filters?.maxPrice !== undefined) {
    const maxP = filters.maxPrice;
    list = list.filter(p => p.priceAED <= maxP);
  }

  if (filters?.featuredOnly) {
    list = list.filter(p => p.isFeatured);
  }

  if (filters?.sortBy) {
    switch (filters.sortBy) {
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
        list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }
  }

  return list;
}

export async function getPuppyBySlug(slug: string): Promise<Puppy | null> {
  if (usePostgres) {
    const puppy = await prisma.puppy.findFirst({
      where: { OR: [{ slug }, { id: slug }] },
      include: puppyInclude,
    });
    return puppy ? mapPuppy(puppy) : null;
  }
  const pup = puppiesStore.find(p => p.slug === slug || p.id === slug);
  return pup || null;
}

export async function createPuppy(data: Omit<Puppy, 'id' | 'createdAt' | 'updatedAt'>): Promise<Puppy> {
  if (usePostgres) {
    const { images, videos = [], breedName: _breedName, ...puppyData } = data;
    const puppy = await prisma.puppy.create({
      data: {
        ...puppyData,
        images: { create: images.map(({ id: _id, ...image }) => image) },
        videos: { create: videos.map(({ id: _id, ...video }) => video) },
      },
      include: puppyInclude,
    });
    return mapPuppy(puppy);
  }
  const newPuppy: Puppy = {
    ...data,
    id: `pup-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  puppiesStore.unshift(newPuppy);
  return newPuppy;
}

export async function updatePuppy(id: string, updates: Partial<Puppy>): Promise<Puppy | null> {
  if (usePostgres) {
    const data: Prisma.PuppyUpdateInput = {};
    if (updates.slug !== undefined) data.slug = updates.slug;
    if (updates.name !== undefined) data.name = updates.name;
    if (updates.breedId !== undefined) data.breed = { connect: { id: updates.breedId } };
    if (updates.gender !== undefined) data.gender = updates.gender;
    if (updates.ageWeeks !== undefined) data.ageWeeks = updates.ageWeeks;
    if (updates.priceAED !== undefined) data.priceAED = updates.priceAED;
    if (updates.origin !== undefined) data.origin = updates.origin;
    if (updates.location !== undefined) data.location = updates.location;
    if (updates.status !== undefined) data.status = updates.status;
    if (updates.isFeatured !== undefined) data.isFeatured = updates.isFeatured;
    if (updates.weightKg !== undefined) data.weightKg = updates.weightKg;
    if (updates.color !== undefined) data.color = updates.color;
    if (updates.personality !== undefined) data.personality = updates.personality;
    if (updates.description !== undefined) data.description = updates.description;
    if (updates.healthNotes !== undefined) data.healthNotes = updates.healthNotes;
    if (updates.parentInfo !== undefined) data.parentInfo = updates.parentInfo;
    if (updates.microchipped !== undefined) data.microchipped = updates.microchipped;
    if (updates.vaccinated !== undefined) data.vaccinated = updates.vaccinated;
    if (updates.passportReady !== undefined) data.passportReady = updates.passportReady;
    if (updates.healthTested !== undefined) data.healthTested = updates.healthTested;
    if (updates.images !== undefined) {
      data.images = {
        deleteMany: {},
        create: updates.images.map(({ id: _id, ...image }) => image),
      };
    }
    if (updates.videos !== undefined) {
      data.videos = {
        deleteMany: {},
        create: updates.videos.map(({ id: _id, ...video }) => video),
      };
    }
    const existing = await prisma.puppy.findUnique({ where: { id }, select: { id: true } });
    if (!existing) return null;
    const puppy = await prisma.puppy.update({ where: { id }, data, include: puppyInclude });
    return mapPuppy(puppy);
  }

  const idx = puppiesStore.findIndex(p => p.id === id);
  if (idx === -1) return null;
  const updated: Puppy = {
    ...puppiesStore[idx],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  puppiesStore[idx] = updated;
  return updated;
}

export async function deletePuppy(id: string): Promise<boolean> {
  if (usePostgres) {
    const result = await prisma.puppy.deleteMany({ where: { id } });
    return result.count > 0;
  }
  const initialLength = puppiesStore.length;
  puppiesStore = puppiesStore.filter(p => p.id !== id);
  return puppiesStore.length < initialLength;
}

export async function getInquiries(): Promise<Inquiry[]> {
  if (usePostgres) {
    const inquiries = await prisma.inquiry.findMany({
      include: { puppy: { select: { name: true } } },
      orderBy: { createdAt: 'desc' },
    });
    return inquiries.map((inquiry) => ({
      id: inquiry.id,
      puppyId: inquiry.puppyId ?? undefined,
      puppyName: inquiry.puppy?.name,
      customerName: inquiry.customerName,
      customerEmail: inquiry.customerEmail,
      customerPhone: inquiry.customerPhone,
      city: inquiry.city,
      preferredMethod: inquiry.preferredMethod,
      message: inquiry.message,
      status: inquiry.status,
      internalNotes: inquiry.internalNotes ?? undefined,
      createdAt: inquiry.createdAt.toISOString(),
      updatedAt: inquiry.updatedAt.toISOString(),
    }));
  }
  return [...inquiriesStore].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function createInquiry(data: {
  puppyId?: string;
  puppyName?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  city?: string;
  preferredMethod: Inquiry['preferredMethod'];
  message: string;
}): Promise<Inquiry> {
  if (usePostgres) {
    const inquiry = await prisma.inquiry.create({
      data: {
        puppyId: data.puppyId,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        city: data.city || 'Dubai',
        preferredMethod: data.preferredMethod || 'WHATSAPP',
        message: data.message,
      },
      include: { puppy: { select: { name: true } } },
    });
    return {
      id: inquiry.id,
      puppyId: inquiry.puppyId ?? undefined,
      puppyName: inquiry.puppy?.name,
      customerName: inquiry.customerName,
      customerEmail: inquiry.customerEmail,
      customerPhone: inquiry.customerPhone,
      city: inquiry.city,
      preferredMethod: inquiry.preferredMethod,
      message: inquiry.message,
      status: inquiry.status,
      internalNotes: inquiry.internalNotes ?? undefined,
      createdAt: inquiry.createdAt.toISOString(),
      updatedAt: inquiry.updatedAt.toISOString(),
    };
  }
  const newInq: Inquiry = {
    id: `inq-${Date.now()}`,
    puppyId: data.puppyId,
    puppyName: data.puppyName,
    customerName: data.customerName,
    customerEmail: data.customerEmail,
    customerPhone: data.customerPhone,
    city: data.city || 'Dubai',
    preferredMethod: data.preferredMethod || 'WHATSAPP',
    message: data.message,
    status: 'NEW',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  inquiriesStore.unshift(newInq);
  return newInq;
}

export async function updateInquiryStatus(id: string, status: InquiryStatus, internalNotes?: string): Promise<Inquiry | null> {
  if (usePostgres) {
    const result = await prisma.inquiry.updateMany({
      where: { id },
      data: {
        status,
        ...(internalNotes !== undefined ? { internalNotes } : {}),
      },
    });
    if (result.count === 0) return null;
    return (await getInquiries()).find((inquiry) => inquiry.id === id) ?? null;
  }
  const inq = inquiriesStore.find(i => i.id === id);
  if (!inq) return null;
  inq.status = status;
  if (internalNotes !== undefined) {
    inq.internalNotes = internalNotes;
  }
  inq.updatedAt = new Date().toISOString();
  return inq;
}

export async function deleteInquiry(id: string): Promise<boolean> {
  if (usePostgres) {
    const result = await prisma.inquiry.deleteMany({ where: { id } });
    return result.count > 0;
  }
  const initialLen = inquiriesStore.length;
  inquiriesStore = inquiriesStore.filter(i => i.id !== id);
  return inquiriesStore.length < initialLen;
}

export async function getTestimonials(onlyApproved: boolean = true): Promise<Testimonial[]> {
  if (usePostgres) {
    const testimonials = await prisma.testimonial.findMany({
      where: onlyApproved ? { isApproved: true } : undefined,
      include: { images: true },
      orderBy: { createdAt: 'desc' },
    });
    return testimonials.map((testimonial) => ({
      id: testimonial.id,
      customerName: testimonial.customerName,
      puppyName: testimonial.puppyName,
      breedName: testimonial.breedName,
      city: testimonial.city,
      story: testimonial.story,
      quote: testimonial.quote,
      rating: testimonial.rating,
      isApproved: testimonial.isApproved,
      isFeatured: testimonial.isFeatured,
      adoptedDate: testimonial.adoptedDate ?? '',
      images: testimonial.images.map((image) => ({
        id: image.id,
        url: image.url,
        altText: image.altText ?? undefined,
      })),
      createdAt: testimonial.createdAt.toISOString(),
    }));
  }
  if (onlyApproved) {
    return testimonialsStore.filter(t => t.isApproved);
  }
  return testimonialsStore;
}

export async function createTestimonial(data: Omit<Testimonial, 'id' | 'createdAt'>): Promise<Testimonial> {
  if (usePostgres) {
    const { images, ...fields } = data;
    const testimonial = await prisma.testimonial.create({
      data: {
        ...fields,
        images: { create: images.map(({ id: _id, ...image }) => image) },
      },
      include: { images: true },
    });
    return {
      ...data,
      id: testimonial.id,
      adoptedDate: testimonial.adoptedDate ?? '',
      images: testimonial.images.map((image) => ({
        id: image.id,
        url: image.url,
        altText: image.altText ?? undefined,
      })),
      createdAt: testimonial.createdAt.toISOString(),
    };
  }
  const item: Testimonial = {
    ...data,
    id: `test-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  testimonialsStore.unshift(item);
  return item;
}

export async function updateTestimonial(id: string, updates: Partial<Testimonial>): Promise<Testimonial | null> {
  if (usePostgres) {
    const { images, id: _id, createdAt: _createdAt, ...fields } = updates;
    const result = await prisma.testimonial.updateMany({
      where: { id },
      data: fields,
    });
    if (result.count === 0) return null;
    if (images !== undefined) {
      await prisma.testimonialImage.deleteMany({ where: { testimonialId: id } });
      await prisma.testimonialImage.createMany({
        data: images.map(({ id: _imageId, ...image }) => ({ ...image, testimonialId: id })),
      });
    }
    return (await getTestimonials(false)).find((testimonial) => testimonial.id === id) ?? null;
  }
  const idx = testimonialsStore.findIndex(t => t.id === id);
  if (idx === -1) return null;
  testimonialsStore[idx] = { ...testimonialsStore[idx], ...updates };
  return testimonialsStore[idx];
}

export async function deleteTestimonial(id: string): Promise<boolean> {
  if (usePostgres) {
    const result = await prisma.testimonial.deleteMany({ where: { id } });
    return result.count > 0;
  }
  const initialLen = testimonialsStore.length;
  testimonialsStore = testimonialsStore.filter(t => t.id !== id);
  return testimonialsStore.length < initialLen;
}

export async function getFAQs(category?: string): Promise<FAQItem[]> {
  if (usePostgres) {
    const faqs = await prisma.fAQ.findMany({
      where: {
        isPublished: true,
        ...(category && category !== 'ALL' ? { category } : {}),
      },
      orderBy: { order: 'asc' },
    });
    return faqs.map((faq) => ({
      id: faq.id,
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      order: faq.order,
      isPublished: faq.isPublished,
    }));
  }
  let list = faqsStore.filter(f => f.isPublished);
  if (category && category !== 'ALL') {
    list = list.filter(f => f.category === category);
  }
  return list.sort((a, b) => a.order - b.order);
}

export async function getWebsiteSettings(): Promise<WebsiteSettings> {
  if (usePostgres) {
    const settings = await prisma.websiteSettings.findUnique({ where: { key: 'main' } });
    if (!settings) return INITIAL_SETTINGS;
    return {
      brandName: settings.brandName,
      tagline: settings.tagline,
      whatsappNumber: settings.whatsappNumber,
      phone: settings.phone,
      email: settings.email,
      address: settings.address,
      openingHours: settings.openingHours,
      heroHeadline: settings.heroHeadline,
      heroSubheadline: settings.heroSubheadline,
      instagramUrl: settings.instagramUrl,
      tiktokUrl: settings.tiktokUrl,
    };
  }
  return settingsStore;
}

export async function updateWebsiteSettings(updates: Partial<WebsiteSettings>): Promise<WebsiteSettings> {
  if (usePostgres) {
    const current = await getWebsiteSettings();
    const settings = await prisma.websiteSettings.upsert({
      where: { key: 'main' },
      update: updates,
      create: { key: 'main', ...current, ...updates },
    });
    return {
      brandName: settings.brandName,
      tagline: settings.tagline,
      whatsappNumber: settings.whatsappNumber,
      phone: settings.phone,
      email: settings.email,
      address: settings.address,
      openingHours: settings.openingHours,
      heroHeadline: settings.heroHeadline,
      heroSubheadline: settings.heroSubheadline,
      instagramUrl: settings.instagramUrl,
      tiktokUrl: settings.tiktokUrl,
    };
  }
  settingsStore = { ...settingsStore, ...updates };
  return settingsStore;
}

export async function getDashboardStats() {
  if (usePostgres) {
    const [totalPuppies, availablePuppies, reservedPuppies, goneHomePuppies, totalInquiries, newInquiries] =
      await Promise.all([
        prisma.puppy.count(),
        prisma.puppy.count({ where: { status: 'AVAILABLE' } }),
        prisma.puppy.count({ where: { status: 'RESERVED' } }),
        prisma.puppy.count({ where: { status: 'GONE_HOME' } }),
        prisma.inquiry.count(),
        prisma.inquiry.count({ where: { status: 'NEW' } }),
      ]);
    return { totalPuppies, availablePuppies, reservedPuppies, goneHomePuppies, totalInquiries, newInquiries };
  }
  const total = puppiesStore.length;
  const available = puppiesStore.filter(p => p.status === 'AVAILABLE').length;
  const reserved = puppiesStore.filter(p => p.status === 'RESERVED').length;
  const goneHome = puppiesStore.filter(p => p.status === 'GONE_HOME').length;
  const totalInquiries = inquiriesStore.length;
  const newInquiries = inquiriesStore.filter(i => i.status === 'NEW').length;

  return {
    totalPuppies: total,
    availablePuppies: available,
    reservedPuppies: reserved,
    goneHomePuppies: goneHome,
    totalInquiries,
    newInquiries,
  };
}

export async function recommendPuppiesForQuiz(answers: QuizAnswer): Promise<Puppy[]> {
  const candidates = usePostgres
    ? await getPuppies({ status: 'AVAILABLE' })
    : puppiesStore.filter((p) => p.status === 'AVAILABLE');

  // Filter or score based on preferences
  const scored = candidates.map(pup => {
    let score = 0;
    
    // Living space
    if (answers.livingSpace === 'apartment') {
      if (pup.breedName.includes('Maltipoo') || pup.breedName.includes('Poodle') || pup.breedName.includes('Bichon')) {
        score += 3;
      }
    } else if (answers.livingSpace === 'villa_with_garden') {
      score += 2;
    }

    // Hypoallergenic
    if (answers.hypoallergenicImportant) {
      if (pup.breedName.includes('Maltipoo') || pup.breedName.includes('Poodle') || pup.breedName.includes('Bichon') || pup.breedName.includes('Cavapoo')) {
        score += 4;
      } else {
        score -= 2;
      }
    }

    // Activity level
    if (answers.activityLevel === 'calm_lap_cuddles') {
      if (pup.personality.toLowerCase().includes('snuggly') || pup.personality.toLowerCase().includes('calm') || pup.personality.toLowerCase().includes('lap')) {
        score += 3;
      }
    } else if (answers.activityLevel === 'playful_energetic') {
      if (pup.personality.toLowerCase().includes('playful') || pup.personality.toLowerCase().includes('adventurous')) {
        score += 3;
      }
    }

    // Size
    if (answers.preferredSize === 'micro_teacup') {
      if (pup.breedName.toLowerCase().includes('teacup') || (pup.weightKg && pup.weightKg < 1.0)) {
        score += 3;
      }
    }

    return { pup, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 3).map(s => s.pup);
}

