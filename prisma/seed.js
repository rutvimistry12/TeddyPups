const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const Module = require('module');
const ts = require('typescript');

const prisma = new PrismaClient();

function loadDemoData() {
  const filename = path.resolve(__dirname, '../src/lib/demo-data.ts');
  const source = fs.readFileSync(filename, 'utf8');
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  }).outputText;
  const demoModule = new Module(filename, module);
  demoModule.filename = filename;
  demoModule.paths = Module._nodeModulePaths(path.dirname(filename));
  demoModule._compile(compiled, filename);
  return demoModule.exports;
}

async function main() {
  console.log('--- SEEDING TEDDYPUPS UAE (POSTGRESQL) ---');
  console.log('[NOTICE]: All generated records are clearly marked as DEMO DATA for portfolio demonstration.');
  const { INITIAL_BREEDS, INITIAL_PUPPIES, INITIAL_TESTIMONIALS, INITIAL_FAQS } = loadDemoData();

  // 1. Seed Admin User
  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();
  const rawPassword = process.env.ADMIN_PASSWORD;
  if (!adminEmail || !rawPassword) {
    throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD must be configured before seeding.');
  }
  const hashedPassword = await bcrypt.hash(rawPassword, 10);

  const admin = await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: { passwordHash: hashedPassword },
    create: {
      email: adminEmail,
      name: 'TeddyPups VIP Concierge',
      passwordHash: hashedPassword,
      role: 'SUPER_ADMIN',
    },
  });
  console.log(`✓ Admin User created/updated: ${admin.email}`);

  // 2. Seed Breeds
  for (const b of INITIAL_BREEDS) {
    await prisma.breed.upsert({
      where: { slug: b.slug },
      update: b,
      create: b,
    });
  }
  console.log(`✓ ${INITIAL_BREEDS.length} Breeds seeded`);

  // 3. Seed demo puppies and their media. Re-running the seed replaces the fixture media.
  for (const { images, videos = [], breedName: _breedName, createdAt, updatedAt, ...puppy } of INITIAL_PUPPIES) {
    await prisma.puppy.upsert({
      where: { slug: puppy.slug },
      update: {
        ...puppy,
        updatedAt: new Date(updatedAt),
        images: {
          deleteMany: {},
          create: images.map(({ id: _id, ...image }) => image),
        },
        videos: {
          deleteMany: {},
          create: videos.map(({ id: _id, ...video }) => video),
        },
      },
      create: {
        ...puppy,
        createdAt: new Date(createdAt),
        updatedAt: new Date(updatedAt),
        images: { create: images.map(({ id: _id, ...image }) => image) },
        videos: { create: videos.map(({ id: _id, ...video }) => video) },
      },
    });
  }
  console.log(`✓ ${INITIAL_PUPPIES.length} demo puppies seeded`);

  // 4. Seed testimonials, FAQs, and website settings.
  for (const { images, createdAt, ...testimonial } of INITIAL_TESTIMONIALS) {
    await prisma.testimonial.upsert({
      where: { id: testimonial.id },
      update: {
        ...testimonial,
        images: {
          deleteMany: {},
          create: images.map(({ id: _id, ...image }) => image),
        },
      },
      create: {
        ...testimonial,
        createdAt: new Date(createdAt),
        images: { create: images.map(({ id: _id, ...image }) => image) },
      },
    });
  }
  for (const faq of INITIAL_FAQS) {
    await prisma.fAQ.upsert({
      where: { id: faq.id },
      update: faq,
      create: faq,
    });
  }

  await prisma.websiteSettings.upsert({
    where: { key: 'main' },
    update: {},
    create: {
      key: 'main',
      brandName: "TeddyPups UAE",
      tagline: "Premium Teacup & Toy Puppies in Dubai",
      whatsappNumber: "+971501234567",
      phone: "+971 4 800 PUPS",
      email: "concierge@teddypups.ae",
      address: "Villa 14, Al Wasl Road, Jumeirah 2, Dubai, United Arab Emirates",
      openingHours: "Mon - Sun: 10:00 AM - 8:00 PM (By Private Appointment)",
      heroHeadline: "Premium teacup puppies in Dubai",
      heroSubheadline: "Little paws, big love. Meet your new best friend and bring home a lifetime of happiness.",
    },
  });
  console.log('✓ Website Settings seeded');
  console.log('--- SEEDING COMPLETE ---');
}

main()
  .catch((e) => {
    console.error('Database seeding failed:', e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

