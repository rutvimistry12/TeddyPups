# 🐾 TeddyPups UAE — Premium Boutique Puppy Website

<p align="center">
  <strong>A premium, interactive puppy boutique experience designed for Dubai, UAE.</strong>
</p>

<p align="center">
  <a href="https://teddy-pups-chi.vercel.app/">🌐 Live Website</a> •
  <a href="#features">✨ Features</a> •
  <a href="#technology-stack">🛠️ Tech Stack</a> •
  <a href="#installation-and-setup">🚀 Installation</a>
</p>

---

## 🌟 Overview

**TeddyPups UAE** is a modern, responsive, full-stack website designed for a premium puppy boutique nursery in Dubai, United Arab Emirates.

The website combines a warm, playful, storybook-inspired visual identity with practical functionality, allowing visitors to discover available puppies, explore breeds, compare puppies, save favorites, submit inquiries, and learn about the adoption process.

The project features an interactive frontend, backend API architecture, PostgreSQL database integration, and a secure administrative dashboard for managing puppies, inquiries, testimonials, and website settings.

🔗 **Live Demo:** [https://teddy-pups-chi.vercel.app/](https://teddy-pups-chi.vercel.app/)

---

## 🎨 Design & User Experience

The website follows a **storybook scrapbook editorial aesthetic**, combining a premium boutique experience with playful puppy-themed illustrations and interactive elements.

### Visual Identity

- Cream-colored backgrounds with warm peach and caramel accents.
- Terracotta and chocolate typography.
- Rounded editorial typography using Fraunces.
- Clean body typography using DM Sans.
- Handwritten accents using Caveat.
- Scrapbook-inspired photo frames, tape, doodles, and paper textures.
- Scalloped navigation and decorative section dividers.
- Bespoke puppy illustrations and playful visual elements.
- Responsive layouts for desktop, tablet, and mobile devices.

### Color Palette

| Color | Hex Code |
|---|---|
| Cream | `#FFF8EC` |
| Light Peach | `#FFE9C9` |
| Warm Yellow | `#F6D28B` |
| Caramel | `#D99545` |
| Terracotta | `#A94E20` |
| Chocolate | `#35190E` |
| Soft Green | `#287B52` |
| WhatsApp Green | `#25D366` |

---

## ✨ Features

### 🏠 Home Page

- Premium editorial hero section.
- Puppy mascot illustrations and floating decorative elements.
- Featured available puppies.
- Breed discovery and interactive filters.
- Local Dubai showroom and international puppy import pathways.
- Visual adoption journey.
- Puppy health and care promise.
- Happy families preview.
- FAQ preview and call-to-action sections.

### 🐶 Available Puppies

- Browse available puppies.
- Filter by breed, gender, availability, origin, and price.
- Search puppies by name or breed.
- Sort by price, age, and newest arrivals.
- Grid and list viewing modes.
- Responsive mobile filter drawer.
- Puppy image galleries and video indicators.
- Dynamic results counter.
- Empty-state handling with filter reset functionality.

### 🐾 Puppy Details

- Individual puppy profile pages.
- High-resolution image gallery.
- Thumbnail navigation.
- Video preview modal.
- Puppy information including age, gender, color, estimated weight, and origin.
- Health information and vaccination details.
- Microchip and pedigree information.
- Puppy-specific inquiry form.
- Related puppy recommendations.
- Mobile sticky inquiry bar.
- Dynamic WhatsApp inquiry links.

### ❤️ Guest Favorites

- Save favorite puppies using heart buttons.
- Persistent favorites using browser local storage.
- Browse puppies based on saved favorites.

### ⚖️ Puppy Comparison

- Compare up to three puppies.
- Side-by-side comparison.
- Compare breed, gender, age, price, origin, weight, and other attributes.
- Responsive comparison drawer.

### 🧩 Puppy Lifestyle Quiz

An interactive quiz that helps visitors discover puppies that may match their lifestyle.

The quiz considers:

- Living space.
- Activity level.
- Family and children.
- Allergy considerations.
- Lifestyle preferences.

Based on the answers, the website recommends matching available puppies.

### 👨‍👩‍👧 Happy Families

- Scrapbook-style customer gallery.
- Customer stories and testimonials.
- Breed filtering.
- Interactive image lightbox.
- Previous and next navigation.
- Testimonial quotes.

### 📖 How It Works

- Interactive adoption pathway selection.
- Dubai showroom adoption process.
- European and Korean puppy import process.
- Visual step-by-step timelines.
- Puppy passport information.
- Vaccination and microchip details.
- Delivery and flight nanny information.

### ❓ Frequently Asked Questions

- Categorized FAQ sections.
- Search functionality.
- Category filtering.
- Expand all and collapse all controls.
- Puppy health, reservations, payments, delivery, imports, breeds, and aftercare information.
- WhatsApp concierge contact for additional questions.

### 📍 Visit & Contact

- Contact and appointment booking form.
- Showroom location information.
- Contact details and social links.
- Google Maps integration.
- Interactive puppy-themed illustrations.

### 🔐 Admin Dashboard

Protected administrative dashboard for managing website content and business inquiries.

**Dashboard Overview**
- Total puppies.
- Available puppies.
- Reserved puppies.
- Sold puppies.
- New customer inquiries.

**Puppy Management**
- Create puppy profiles.
- Edit puppy details.
- Delete puppy records.
- Update puppy availability.
- Mark puppies as featured.
- Manage puppy images and information.

**Inquiry Management**
- View and manage customer inquiries.
- Filter inquiries by status.
- Add internal notes.
- Track follow-ups.
- Open WhatsApp conversations with customers.

**Testimonial Management**
- Review customer testimonials.
- Approve testimonials.
- Hide testimonials from the public website.

**Website Settings**
- Manage contact information.
- Update WhatsApp details.
- Update showroom information.
- Configure website headlines and business details.

---

## 🛠️ Technology Stack

### Frontend

- **Next.js 14+** — React framework and App Router.
- **TypeScript** — Type-safe development.
- **Tailwind CSS** — Responsive styling and custom design system.
- **Framer Motion** — Interactive animations.
- **Lucide Icons** — Modern icon library.
- **React Hook Form** — Form handling.
- **Zod** — Form and data validation.
- **Canvas Confetti** — Interactive celebration effects.

### Backend

- **Next.js Route Handlers** — Backend API endpoints.
- **Server Components** — Server-side rendering and data handling.
- **Prisma ORM** — Database access and management.
- **PostgreSQL** — Relational database.
- **JWT Cookies** — Authentication and session management.
- **jose** — JWT security.
- **bcryptjs** — Password hashing.

### Deployment & Infrastructure

- **Vercel** — Website hosting and deployment.
- **Neon PostgreSQL** — Cloud PostgreSQL database.
- **GitHub** — Version control and source code management.

---

## 🏗️ Architecture

The project follows a full-stack architecture:

```text
                    ┌─────────────────────┐
                    │      Visitors       │
                    │  Desktop / Mobile   │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │    Next.js App      │
                    │   Frontend / UI     │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │  Route Handlers     │
                    │     REST APIs       │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │    Prisma ORM       │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   PostgreSQL DB     │
                    │   Persistent Data   │
                    └─────────────────────┘
```

---

## 📂 Project Structure

```text
TeddyPups/
│
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
│
├── public/
│   ├── images/
│   ├── icons/
│   └── assets/
│
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── puppies/
│   │   ├── happy-families/
│   │   ├── how-it-works/
│   │   ├── faq/
│   │   ├── contact/
│   │   ├── privacy/
│   │   ├── terms/
│   │   ├── admin/
│   │   └── api/
│   │
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   ├── puppies/
│   │   ├── forms/
│   │   └── animations/
│   │
│   ├── lib/
│   │   ├── prisma.ts
│   │   ├── auth.ts
│   │   ├── validation.ts
│   │   └── utils.ts
│   │
│   ├── hooks/
│   ├── types/
│   └── styles/
│
├── .env.example
├── .gitignore
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

> The directory structure above represents the intended architecture. Actual directories and files may differ depending on the current implementation.

---

## 🚀 Installation and Setup

### Prerequisites

- Node.js 18.18+ or Node.js 20+
- npm or pnpm
- PostgreSQL
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
cd TeddyPups
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root.

If `.env.example` exists:

```powershell
if (!(Test-Path .env)) {
    Copy-Item .env.example .env
}
```

Configure the environment variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/teddypups_db?schema=public"
DIRECT_URL="postgresql://username:password@localhost:5432/teddypups_db?schema=public"
DATA_BACKEND="postgres"

# Admin Authentication
ADMIN_EMAIL="your-admin@example.com"
ADMIN_PASSWORD="your-strong-password"
ADMIN_JWT_SECRET="your-random-secret-at-least-32-characters"

# Website Configuration
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_BRAND_NAME="TeddyPups UAE"
NEXT_PUBLIC_WHATSAPP_NUMBER="+971501234567"
NEXT_PUBLIC_PHONE="+971 4 800 PUPS"
NEXT_PUBLIC_EMAIL="concierge@teddypups.ae"
NEXT_PUBLIC_LOCATION="Jumeirah 2, Dubai, UAE"
```

> Never commit your `.env` file, database credentials, JWT secrets, or private API keys to GitHub.

### 4. Configure PostgreSQL

Create a PostgreSQL database:

```sql
CREATE DATABASE teddypups_db;
```

Update the `DATABASE_URL` and `DIRECT_URL` values in your `.env` file according to your database configuration.

### 5. Apply Database Migrations

```bash
npm run db:deploy
```

Generate Prisma Client if necessary:

```bash
npm run prisma:generate
```

### 6. Seed Demonstration Data

For a new and empty database:

```bash
npm run prisma:seed
```

This may create demonstration puppy profiles, testimonials, FAQs, and initial administrative credentials.

**Important:** Do not run the seed command on a production database containing live customer data.

### 7. Start the Development Server

```bash
npm run dev
```

Open:

[http://localhost:3000](http://localhost:3000)

---

## 📦 Available Scripts

| Command | Description |
|---|---|
| `npm install` | Install project dependencies |
| `npm run dev` | Start the development server |
| `npm run build` | Build the production application |
| `npm run start` | Start the production server |
| `npm run db:deploy` | Apply Prisma migrations |
| `npm run prisma:generate` | Generate Prisma Client |
| `npm run prisma:seed` | Seed demonstration data |
| `npm run prisma:push` | Synchronize schema for local prototyping |

Check your `package.json` for the exact scripts configured in the repository.

---

## 🔐 Admin Dashboard

The administrative dashboard is available at:

```text
/admin
```

Authentication uses server-side credentials configured through environment variables.

Admin credentials:

```env
ADMIN_EMAIL="your-admin@example.com"
ADMIN_PASSWORD="your-strong-password"
```

Do not publish real administrator credentials in the repository or README.

---

## ☁️ Deployment

The website is deployed using **Vercel**.

### Deployment Stack

| Service | Purpose |
|---|---|
| GitHub | Source code repository |
| Vercel | Hosting and deployment |
| Neon | Cloud PostgreSQL database |
| Prisma | Database ORM and migrations |

### Deployment Workflow

1. Push the project to GitHub.
2. Connect the GitHub repository to Vercel.
3. Configure production environment variables.
4. Connect the PostgreSQL database.
5. Apply database migrations.
6. Deploy the application.
7. Verify the website and administrative dashboard.

### Production Environment Variables

Configure the required environment variables in Vercel:

- `DATABASE_URL`
- `DIRECT_URL`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `ADMIN_JWT_SECRET`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_BRAND_NAME`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`
- `NEXT_PUBLIC_PHONE`
- `NEXT_PUBLIC_EMAIL`
- `NEXT_PUBLIC_LOCATION`

Additional media storage credentials should only be configured if the project uses an external media upload service.

---

## 📱 Responsive Design

TeddyPups UAE is designed to provide an optimized experience across:

- Desktop computers.
- Laptop screens.
- Tablets.
- Mobile devices.

The responsive interface includes mobile navigation, adaptive puppy galleries, responsive grids, mobile filter drawers, sticky inquiry controls, and touch-friendly interactions.

---

## 🛡️ Security Considerations

- Server-side authentication.
- Secure JWT-based sessions.
- Password hashing with bcrypt.
- Environment-based secret management.
- Zod validation for user input.
- Protected administrative routes.
- Database access through Prisma.
- Customer inquiry data handled through server-side endpoints.

---

## 🖼️ Screenshots

Screenshots of the live website can be added here to showcase the design and functionality.

```text
screenshots/
├── home.png
├── puppies.png
├── puppy-details.png
├── happy-families.png
├── contact.png
└── admin-dashboard.png
```

---

## 🔮 Future Enhancements

- Online puppy reservation and deposit payment integration.
- Email notifications for customer inquiries.
- Advanced admin analytics and reporting.
- Cloud-based puppy image and video management.
- Appointment scheduling integration.
- Automated inquiry follow-up system.
- SEO optimization and structured metadata.
- Enhanced accessibility and performance optimization.

---

## ⚠️ Demonstration Data Disclaimer

Puppy profiles, health records, customer testimonials, and other sample content included in the project may be demonstration data created for development and portfolio presentation purposes.

Such information should not be interpreted as verified real-world business records.

---

## 👩‍💻 Developer

**Rutvi Mistry**

Bachelor's in Information Technology | Full-Stack Development | AI & Automation

- GitHub: [rutvimistry12](https://github.com/rutvimistry12)
- LinkedIn: [Rutvi Mistry](https://www.linkedin.com/in/rutvi-mistry-it/)

---

## 📄 License

This project is developed for portfolio, demonstration, and educational purposes.

---

<p align="center">
  <strong>Made with ❤️ and a little puppy magic 🐾</strong>
</p>

<p align="center">
  <a href="https://teddy-pups-chi.vercel.app/">Visit TeddyPups UAE</a>
</p>
