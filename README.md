# 🐾 TeddyPups UAE — Premium Boutique Puppy Website (Dubai)

A complete, responsive, full-stack website designed for a luxury puppy boutique nursery located in **Jumeirah 2, Dubai, United Arab Emirates**.

Designed with a warm **storybook, scrapbook editorial aesthetic**: cream backgrounds, terracotta & caramel accents, chocolate typography, scalloped sticky navigation, hand-drawn tape and doodle stickers, real puppy photography galleries, and interactive features.

---

## 🎨 Design Direction & Aesthetic

- **Color Palette**:
  - Cream: `#FFF8EC`
  - Light Peach: `#FFE9C9`
  - Warm Yellow: `#F6D28B`
  - Caramel: `#D99545`
  - Terracotta: `#A94E20`
  - Chocolate: `#35190E`
  - Soft Green / WhatsApp: `#287B52` & `#25D366`
- **Typography**: Fraunces rounded serif headings, DM Sans body text, Caveat handwritten accents.
- **Scrapbook Elements**: Real rotated photo frames, paper textures, dotted backgrounds, scalloped edge dividers, bespoke SVG puppy illustrations, and tape strips.

---

## 🚀 Technology Stack

- **Framework**: Next.js 14+ (App Router, Server Components & Route Handlers)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom theme variables
- **Animations**: Framer Motion & CSS keyframe animations
- **Icons**: Lucide Icons
- **Database & ORM**: PostgreSQL with Prisma ORM
- **Authentication**: Secure JWT Cookie session management with `jose` & `bcryptjs`
- **Validation**: Zod & React Hook Form
- **Celebrations**: Canvas Confetti

---

## 🐶 10 Included Pages & Routes

1. **Home (`/`)**:
   - Oversized editorial hero with mascot puppy illustrations, floating decorations, and trust badges.
   - Featured available puppies with instant detail & WhatsApp links.
   - Interactive breed discovery filter (Maltipoo, Toy Poodle, Bichon, Pomeranian, Cavapoo, Frenchie).
   - "Two Ways Home" interactive pathway: Local Dubai Showroom vs. European Flight Import.
   - 6-step visual adoption journey.
   - Premium Puppy Promise (MOCCAE microchip, vaccinations, 1-year congenital warranty).
   - Scrapbook happy families preview.
   - FAQ preview accordion and final call-to-action.

2. **Available Puppies (`/puppies`)**:
   - Live multi-filter sidebar (Breed, Gender, Availability, Origin, Price range slider).
   - Search input, real-time counter, sort dropdown (Price, Age, Newest), Grid/List toggle.
   - Mobile filter drawer.
   - Video indicators and photo carousel on cards.
   - Empty state with reset actions.

3. **Puppy Details (`/puppies/[slug]`)**:
   - High-resolution photo gallery with thumbnail selector.
   - Video player modal for nursery play videos.
   - Key attributes: Age, gender, estimated weight, color, MOCCAE microchip, vaccination record, and parentage pedigree.
   - Interactive VIP inquiry form (validates name, email, phone, city, preferred method, auto-selects puppy) saving directly to the database.
   - Related puppies recommendations.
   - Sticky mobile inquiry bar.

4. **Happy Families (`/happy-families`)**:
   - Scrapbook masonry gallery of customer testimonials across Dubai, Abu Dhabi, and the GCC.
   - Breed filter pills.
   - Interactive lightbox with previous / next navigation and testimonial quotes.

5. **How It Works (`/how-it-works`)**:
   - Interactive toggle: Dubai Showroom Adoption vs. European / Korean Flight Import.
   - 4-step detailed visual timeline for each route.
   - Illustrated Puppy Passport breakdown (MOCCAE barcode, vaccination passport, 1-year contract).
   - Climate-controlled luxury chauffeur delivery & GCC flight nanny guide.

6. **Frequently Asked Questions (`/faq`)**:
   - Categorized accordions (Puppy Health, Reservations, Payments, Delivery, Imported Puppies, Breeds, Aftercare).
   - Live search filter and category pills.
   - Expand All / Collapse All controls.
   - WhatsApp direct concierge prompt for unlisted inquiries.

7. **Visit & Contact (`/contact`)**:
   - Interactive contact and showroom appointment booking form.
   - Jumeirah 2 showroom address, visiting hours, phone, email, and social channels.
   - Google Maps iframe embed with Jumeirah location marker.
   - Peeking puppy doodle mascot illustration.

8. **Admin Dashboard (`/admin`)**:
   - Protected with credentials configured in server environment variables.
   - Overview metrics: Total puppies, Available, Reserved, Sold, New inquiries.
   - Full Puppy Management CRUD: Add, edit, delete, toggle Featured, change status (Available, Reserved, Pending, Gone Home).
   - Inquiry Management: Filter by status (New, Contacted, Follow-up, Reserved, Closed), add private internal notes, instant WhatsApp customer links.
   - Testimonial Management: Approve / hide client stories.
   - Website Settings: Update phone, WhatsApp number, showroom address, hero headlines.

9. **Privacy Policy (`/privacy`)**:
   - Detailed client data protection, UAE MOCCAE pet registry rules, and contact terms.

10. **Terms & Conditions (`/terms`)**:
    - Reservation deposit policy, 1-year congenital health guarantee terms, and ethical rehoming pledge.

---

## ⚡ Interactive Features

- **Guest Favorites**: Click the heart on any puppy to save it to your local storage wishlist. Filter available puppies by favorites anytime.
- **Puppy Comparison**: Compare up to 3 puppies side-by-side in a responsive comparison drawer (gender, age, price, origin, weight, hypoallergenic rating).
- **Interactive Lifestyle Quiz**: 6-question quiz ("What kind of puppy fits your family?") that analyzes living space, activity level, allergies, and children to recommend matching available pups.
- **Dynamic WhatsApp Links**: Prefills inquiry message with puppy name, breed, and price in AED for instant response.

---

## 🛠️ Setup & Installation Instructions

### 1. Prerequisites
- Node.js (v18.18+ or v20+ / v22+)
- npm or pnpm
- PostgreSQL database (Neon, Supabase, Railway, AWS RDS, or local Postgres)

### 2. Clone & Install Dependencies
```bash
cd d:\Pups
npm install
```

### 3. Environment Variables Configuration
Create `.env` from the template only if you do not already have one. If it exists, edit it without overwriting your current local settings:
```powershell
if (!(Test-Path .env)) { Copy-Item .env.example .env }
```

Set the database URLs from your PostgreSQL provider. `DATABASE_URL` is used by the app; `DIRECT_URL` is the non-pooled connection Prisma uses for migrations. For local PostgreSQL, both can use the same URL.
```env
# PostgreSQL connections
DATABASE_URL="postgresql://username:password@localhost:5432/teddypups_db?schema=public"
DIRECT_URL="postgresql://username:password@localhost:5432/teddypups_db?schema=public"
DATA_BACKEND="postgres"

# Admin Authentication
ADMIN_EMAIL="your-admin@example.com"
ADMIN_PASSWORD="replace-with-a-unique-strong-password"
ADMIN_JWT_SECRET="replace-with-a-random-secret-at-least-32-characters"

# Public Brand Details
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_BRAND_NAME="TeddyPups UAE"
NEXT_PUBLIC_WHATSAPP_NUMBER="+971501234567"
NEXT_PUBLIC_PHONE="+971 4 800 PUPS"
NEXT_PUBLIC_EMAIL="concierge@teddypups.ae"
NEXT_PUBLIC_LOCATION="Villa 14, Al Wasl Road, Jumeirah 2, Dubai, UAE"
```

### 4. Database Setup & Seeding
Apply the checked-in Prisma migrations to the database:
```bash
npm run db:deploy
```

The Prisma Client is generated when dependencies are installed. Run `npm run prisma:generate` manually after changing the Prisma schema.

For a new, empty database only, seed the demonstration puppies, testimonials, FAQs, and initial admin account:
```bash
npm run prisma:seed
```

Seeding requires `ADMIN_EMAIL` and `ADMIN_PASSWORD`. It creates demonstration content; review or replace that content before using the site for real customers. Do not run the seed command on a database containing live data. `npm run prisma:push` is available for local prototyping, but use migrations for deployed databases.

Development uses the in-memory demo store unless `DATA_BACKEND="postgres"` is set. In-memory changes are not durable and do not work across multiple instances. Production always uses PostgreSQL/Prisma.
Set `DATA_BACKEND="postgres"` in your local `.env` when you want local development to use the configured database. The production deployment does not need this flag.

### 5. Running Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the website.

### 6. Production Build
```bash
npm run build
npm run start
```

---

## 🔐 Staff Concierge Login

- **URL**: [http://localhost:3000/admin](http://localhost:3000/admin)
- Use the `ADMIN_EMAIL` and `ADMIN_PASSWORD` values configured in the server environment.

---

## ☁️ Deploy with GitHub, Neon, and Vercel

Recommended setup for this Next.js + Prisma project:

- **Git hosting:** [GitHub](https://github.com/)
- **PostgreSQL:** [Neon](https://neon.tech/)
- **Website hosting:** [Vercel](https://vercel.com/)

### A. Publish the project to GitHub
1. Create a **private, empty** GitHub repository (do not add another README or `.gitignore`).
2. Before pushing, make sure no credentials are in the files or Git history. `.gitignore` prevents future `.env` additions, but it does not erase a file from earlier commits. If a secret was ever committed, rotate it; for a public repository, also remove it from Git history.
3. Check `git status` and review the files before staging. Then stage and commit the website source, assets, Prisma schema/migrations, and package files:
   ```powershell
   git add -A
   git status
   git commit -m "Add TeddyPups website"
   ```
4. Add the new repository as `origin`, then push the `main` branch:
   ```powershell
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
   git branch -M main
   git push -u origin main
   ```
   If `origin` already exists, update it with `git remote set-url origin ...` instead.

### B. Create and initialize the database
1. Create a Neon project and database.
2. Copy its **pooled** connection string into `DATABASE_URL`, and its **direct/unpooled** connection string into `DIRECT_URL`. Keep both private.
3. Put these values in your local `.env`, along with a unique admin email/password and a randomly generated `ADMIN_JWT_SECRET`.
4. From the project folder run:
   ```powershell
   npm install
   npm run db:deploy
   npm run prisma:seed
   ```
   Run the seed command only once on a new, empty database. It creates demo records and the admin account.

### C. Deploy the website on Vercel
1. Sign in to Vercel, choose **Add New Project**, and import the GitHub repository.
2. Add environment variables in **Project Settings → Environment Variables**. Configure them for Production:
   - `DATABASE_URL` — Neon pooled connection string
   - `DIRECT_URL` — Neon direct connection string
   - `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_JWT_SECRET` — your private admin credentials
   - `NEXT_PUBLIC_SITE_URL` — the deployed `https://...vercel.app` URL (update it after the first deployment if needed)
   - `NEXT_PUBLIC_BRAND_NAME`, `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_PHONE`, `NEXT_PUBLIC_EMAIL`, `NEXT_PUBLIC_LOCATION`
   - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` only if you configure Cloudinary media uploads
3. Leave the build command as `npm run build` and deploy. Vercel will build the Next.js app; future pushes to the connected branch trigger deployments.
4. Open `/admin` on your deployed site and sign in with `ADMIN_EMAIL` and `ADMIN_PASSWORD`.

Never put production credentials in GitHub files or client-side `NEXT_PUBLIC_` variables. Add the Vercel environment variables separately for Preview if you use preview deployments, preferably pointing previews at a separate database.

---

## 📜 Demonstration Data Notice

*All puppy records, mock health passports, customer stories, and testimonials included in the seed data are created for portfolio demonstration and system presentation purposes.*

