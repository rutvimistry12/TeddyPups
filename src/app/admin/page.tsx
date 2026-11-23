import React from 'react';
import { Metadata } from 'next';
import {
  getPuppies,
  getBreeds,
  getInquiries,
  getTestimonials,
  getWebsiteSettings,
  getDashboardStats,
} from '@/lib/data-store';
import { verifyAdminSession } from '@/lib/auth';
import { AdminDashboardClient } from '@/components/admin/AdminDashboardClient';

export const metadata: Metadata = {
  title: 'Admin Concierge Dashboard | TeddyPups UAE',
  description: 'Manage puppies, client inquiries, reservations, testimonials, and boutique settings.',
};

export const revalidate = 0; // Dynamic server component

export default async function AdminPage() {
  const session = await verifyAdminSession();
  if (!session) {
    return (
      <AdminDashboardClient
        initialPuppies={[]}
        initialBreeds={[]}
        initialInquiries={[]}
        initialTestimonials={[]}
        initialSettings={{
          brandName: '',
          tagline: '',
          whatsappNumber: '',
          phone: '',
          email: '',
          address: '',
          openingHours: '',
          heroHeadline: '',
          heroSubheadline: '',
          instagramUrl: '',
          tiktokUrl: '',
        }}
        initialStats={{
          totalPuppies: 0,
          availablePuppies: 0,
          reservedPuppies: 0,
          goneHomePuppies: 0,
          totalInquiries: 0,
          newInquiries: 0,
        }}
      />
    );
  }

  const [puppies, breeds, inquiries, testimonials, settings, stats] = await Promise.all([
    getPuppies(),
    getBreeds(),
    getInquiries(),
    getTestimonials(false), // Fetch all testimonials including unapproved
    getWebsiteSettings(),
    getDashboardStats(),
  ]);

  return (
    <AdminDashboardClient
      initialPuppies={puppies}
      initialBreeds={breeds}
      initialInquiries={inquiries}
      initialTestimonials={testimonials}
      initialSettings={settings}
      initialStats={stats}
    />
  );
}

