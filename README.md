# TradePro 360 – AI-Powered Smart Booking & Dispatch Platform for UK Tradesmen

![TradePro 360](https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1200&auto=format&fit=crop)

**TradePro 360** is a modern, enterprise-grade, multi-tenant SaaS application tailored specifically for UK trade businesses (plumbers, electricians, HVAC technicians, locksmiths, cleaners, painters, and handymen).

The system automates the entire service lifecycle:
1. **Google Business Profile Integration**: Direct "Book a Free Quote" entry point with pre-filled UK postcode location.
2. **Interactive Customer Booking Portal**: Dynamic service catalog, photo/video uploads, schedule selection, and instant AI quotation.
3. **AI-Powered Smart Dispatch Engine**: Automated skill matching (Gas Safe, Part P, NVQ), proximity calculation (Haversine GPS formula), workload balancing, and route ETA optimization.
4. **Live GPS Satellite Tracking Map**: Real-time engineer location movement and ETA countdown.
5. **Field Engineer Mobile Portal**: Accept/Reject jobs, Google Maps GPS navigation, status updates, material recorder, and digital customer sign-off signature capture.
6. **Business Owner Analytics Dashboard**: Recharts financial analytics, KPI cards, custom service pricing management, and white-label branding suite.
7. **Invoicing & Payments**: Automatic PDF invoice generation (`jsPDF`) and integrated Stripe payment gateway (Card, Apple Pay, Pay Later).
8. **Real-time Communication Hub**: Customer ↔ Engineer ↔ Dispatcher live chat and automated notification feed.
9. **Super Admin Control Panel**: SaaS tenant provisioning and platform-wide monitoring.

---

## 🛠️ Technology Stack

- **Frontend**: Next.js 14+ (App Router), React, TypeScript
- **Styling**: Tailwind CSS, Glassmorphism UI elements, Lucide Icons
- **Interactive Maps**: Interactive GPS Satellite Tracking with Leaflet
- **Charts & Data Viz**: Recharts (Revenue Growth, Trade Sector Breakdown)
- **PDF Generation**: Client & Server friendly `jsPDF` Tax Invoice Builder
- **Database & Auth**: PostgreSQL / Supabase (`schema.sql` migration script included) + Zero-Config Client State Engine
- **Payments**: Stripe Gateway Integration (Card, Apple Pay, Pay Later)

---

## 📁 Project Structure

```
├── src/
│   ├── app/
│   │   ├── globals.css          # Tailwind CSS & glassmorphism theme rules
│   │   ├── layout.tsx           # SEO Metadata & Root layout
│   │   └── page.tsx             # Main SaaS application orchestrator
│   ├── components/
│   │   ├── booking/             # Multi-step customer booking wizard
│   │   ├── chat/                # Realtime Chat component
│   │   ├── dashboard/           # Owner, Dispatcher, Engineer, Customer, SuperAdmin Dashboards
│   │   ├── google/              # Google Business Profile Widget
│   │   ├── invoicing/           # Tax Invoice PDF Modal
│   │   ├── layout/              # Role Switcher Toolbar & Navbar
│   │   ├── maps/                # Live Satellite GPS Tracking Map
│   │   ├── payments/            # Stripe Checkout Modal
│   │   └── whitelabel/          # White-Label Branding Modal
│   ├── lib/
│   │   ├── dispatchEngine.ts    # AI Skill & Proximity Dispatch Algorithm
│   │   ├── mockData.ts          # UK Tradesmen Seed Data
│   │   ├── pdfGenerator.ts      # jsPDF Invoice Engine
│   │   ├── pricingEngine.ts     # UK Dynamic Pricing & VAT Engine
│   │   └── supabase/            # Client setup & PostgreSQL schema.sql
│   └── types/
│       └── index.ts             # TypeScript Data Models
├── package.json
└── README.md
```

---

## 🚀 Quick Start Guide

### 1. Installation
```bash
npm install
```

### 2. Launch Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Demo Role Switcher
Use the top interactive **Role Switcher** bar to experience the platform from all 5 user perspectives:
- **Business Owner**: View revenue KPIs, Recharts analytics, service pricing, and white-label settings.
- **AI Dispatcher**: Select pending jobs and view AI engineer match scoring, GPS distances, and route ETAs.
- **Field Engineer**: Test turn-by-turn navigation, status updates (En Route -> Completed), material recording, and digital signature capture.
- **Customer Portal**: Track live engineer on map, chat in real-time, view/download PDF invoices, and pay via Stripe.
- **Google Business Profile Widget**: Test the "Book a Free Quote" customer acquisition flow.
- **Super Admin**: View platform-wide SaaS tenant metrics and revenue.

---

## 🗄️ Database Setup (Supabase / PostgreSQL)

A complete PostgreSQL migration script is provided in `src/lib/supabase/schema.sql`.

To deploy to your own Supabase instance:
1. Open Supabase Dashboard -> SQL Editor.
2. Paste the contents of `src/lib/supabase/schema.sql`.
3. Run script to create `businesses`, `users`, `engineers`, `services`, `bookings`, `invoices`, `chat_messages`, `reviews`, and `live_locations` tables with RLS policies.
4. Set environment variables in `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```
