-- CreateEnum
CREATE TYPE "PuppyStatus" AS ENUM ('AVAILABLE', 'RESERVED', 'PENDING', 'GONE_HOME');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "InquiryStatus" AS ENUM ('NEW', 'CONTACTED', 'FOLLOW_UP', 'RESERVED', 'CLOSED');

-- CreateEnum
CREATE TYPE "ContactMethod" AS ENUM ('WHATSAPP', 'PHONE', 'EMAIL');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'EDITOR');

-- CreateEnum
CREATE TYPE "PuppyOrigin" AS ENUM ('LOCAL_DUBAI', 'IMPORTED');

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'ADMIN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Breed" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "averageSize" TEXT,
    "hypoallergenic" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Breed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Puppy" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "breedId" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "ageWeeks" INTEGER NOT NULL,
    "priceAED" INTEGER NOT NULL,
    "origin" "PuppyOrigin" NOT NULL DEFAULT 'LOCAL_DUBAI',
    "location" TEXT NOT NULL DEFAULT 'Dubai Boutique Showroom, UAE',
    "status" "PuppyStatus" NOT NULL DEFAULT 'AVAILABLE',
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "weightKg" DOUBLE PRECISION,
    "microchipped" BOOLEAN NOT NULL DEFAULT true,
    "vaccinated" BOOLEAN NOT NULL DEFAULT true,
    "passportReady" BOOLEAN NOT NULL DEFAULT true,
    "healthTested" BOOLEAN NOT NULL DEFAULT true,
    "color" TEXT NOT NULL,
    "personality" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "healthNotes" TEXT,
    "parentInfo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Puppy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PuppyImage" (
    "id" TEXT NOT NULL,
    "puppyId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "publicId" TEXT,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "altText" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PuppyImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PuppyVideo" (
    "id" TEXT NOT NULL,
    "puppyId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "thumbnailUrl" TEXT,
    "title" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PuppyVideo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "city" TEXT DEFAULT 'Dubai',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inquiry" (
    "id" TEXT NOT NULL,
    "puppyId" TEXT,
    "customerId" TEXT,
    "customerName" TEXT NOT NULL,
    "customerEmail" TEXT NOT NULL,
    "customerPhone" TEXT NOT NULL,
    "city" TEXT NOT NULL DEFAULT 'Dubai',
    "preferredMethod" "ContactMethod" NOT NULL DEFAULT 'WHATSAPP',
    "message" TEXT NOT NULL,
    "status" "InquiryStatus" NOT NULL DEFAULT 'NEW',
    "internalNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inquiry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PuppyReservation" (
    "id" TEXT NOT NULL,
    "puppyId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "depositPaid" INTEGER NOT NULL DEFAULT 0,
    "totalPrice" INTEGER NOT NULL,
    "notes" TEXT,
    "reservedUntil" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PuppyReservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Testimonial" (
    "id" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "puppyName" TEXT NOT NULL,
    "breedName" TEXT NOT NULL,
    "city" TEXT NOT NULL DEFAULT 'Dubai, UAE',
    "story" TEXT NOT NULL,
    "quote" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 5,
    "isApproved" BOOLEAN NOT NULL DEFAULT true,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "adoptedDate" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestimonialImage" (
    "id" TEXT NOT NULL,
    "testimonialId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "altText" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TestimonialImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FAQ" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FAQ_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favorite" (
    "id" TEXT NOT NULL,
    "guestId" TEXT NOT NULL,
    "puppyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WebsiteSettings" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "brandName" TEXT NOT NULL DEFAULT 'TeddyPups UAE',
    "tagline" TEXT NOT NULL DEFAULT 'Premium Teacup & Toy Puppies in Dubai',
    "whatsappNumber" TEXT NOT NULL DEFAULT '+971501234567',
    "phone" TEXT NOT NULL DEFAULT '+971 4 800 PUPS',
    "email" TEXT NOT NULL DEFAULT 'concierge@teddypups.ae',
    "address" TEXT NOT NULL DEFAULT 'Villa 14, Al Wasl Road, Jumeirah 2, Dubai, United Arab Emirates',
    "openingHours" TEXT NOT NULL DEFAULT 'Mon - Sun: 10:00 AM - 8:00 PM (By Private Appointment)',
    "heroHeadline" TEXT NOT NULL DEFAULT 'Premium teacup puppies in Dubai',
    "heroSubheadline" TEXT NOT NULL DEFAULT 'Little paws, big love. Meet your new best friend and bring home a lifetime of happiness.',
    "instagramUrl" TEXT NOT NULL DEFAULT 'https://instagram.com/teddypupsuae',
    "tiktokUrl" TEXT NOT NULL DEFAULT 'https://tiktok.com/@teddypupsuae',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WebsiteSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityLog" (
    "id" TEXT NOT NULL,
    "adminId" TEXT,
    "action" TEXT NOT NULL,
    "details" TEXT,
    "ipAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ActivityLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");

-- CreateIndex
CREATE INDEX "AdminUser_email_idx" ON "AdminUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Breed_name_key" ON "Breed"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Breed_slug_key" ON "Breed"("slug");

-- CreateIndex
CREATE INDEX "Breed_slug_idx" ON "Breed"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Puppy_slug_key" ON "Puppy"("slug");

-- CreateIndex
CREATE INDEX "Puppy_slug_idx" ON "Puppy"("slug");

-- CreateIndex
CREATE INDEX "Puppy_status_idx" ON "Puppy"("status");

-- CreateIndex
CREATE INDEX "Puppy_breedId_idx" ON "Puppy"("breedId");

-- CreateIndex
CREATE INDEX "Puppy_isFeatured_idx" ON "Puppy"("isFeatured");

-- CreateIndex
CREATE INDEX "PuppyImage_puppyId_idx" ON "PuppyImage"("puppyId");

-- CreateIndex
CREATE INDEX "PuppyVideo_puppyId_idx" ON "PuppyVideo"("puppyId");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- CreateIndex
CREATE INDEX "Customer_email_idx" ON "Customer"("email");

-- CreateIndex
CREATE INDEX "Inquiry_puppyId_idx" ON "Inquiry"("puppyId");

-- CreateIndex
CREATE INDEX "Inquiry_status_idx" ON "Inquiry"("status");

-- CreateIndex
CREATE INDEX "Inquiry_createdAt_idx" ON "Inquiry"("createdAt");

-- CreateIndex
CREATE INDEX "PuppyReservation_puppyId_idx" ON "PuppyReservation"("puppyId");

-- CreateIndex
CREATE INDEX "Testimonial_isApproved_idx" ON "Testimonial"("isApproved");

-- CreateIndex
CREATE INDEX "TestimonialImage_testimonialId_idx" ON "TestimonialImage"("testimonialId");

-- CreateIndex
CREATE INDEX "FAQ_category_idx" ON "FAQ"("category");

-- CreateIndex
CREATE INDEX "Favorite_guestId_idx" ON "Favorite"("guestId");

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_guestId_puppyId_key" ON "Favorite"("guestId", "puppyId");

-- CreateIndex
CREATE UNIQUE INDEX "WebsiteSettings_key_key" ON "WebsiteSettings"("key");

-- CreateIndex
CREATE INDEX "ActivityLog_createdAt_idx" ON "ActivityLog"("createdAt");

-- AddForeignKey
ALTER TABLE "Puppy" ADD CONSTRAINT "Puppy_breedId_fkey" FOREIGN KEY ("breedId") REFERENCES "Breed"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PuppyImage" ADD CONSTRAINT "PuppyImage_puppyId_fkey" FOREIGN KEY ("puppyId") REFERENCES "Puppy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PuppyVideo" ADD CONSTRAINT "PuppyVideo_puppyId_fkey" FOREIGN KEY ("puppyId") REFERENCES "Puppy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inquiry" ADD CONSTRAINT "Inquiry_puppyId_fkey" FOREIGN KEY ("puppyId") REFERENCES "Puppy"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inquiry" ADD CONSTRAINT "Inquiry_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PuppyReservation" ADD CONSTRAINT "PuppyReservation_puppyId_fkey" FOREIGN KEY ("puppyId") REFERENCES "Puppy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PuppyReservation" ADD CONSTRAINT "PuppyReservation_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestimonialImage" ADD CONSTRAINT "TestimonialImage_testimonialId_fkey" FOREIGN KEY ("testimonialId") REFERENCES "Testimonial"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_puppyId_fkey" FOREIGN KEY ("puppyId") REFERENCES "Puppy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityLog" ADD CONSTRAINT "ActivityLog_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "AdminUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;
