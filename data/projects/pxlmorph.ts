import { Project } from "@/data/types/project";

export const pxlmorph: Project = {
  slug: "pxlmorph",
  name: "PxlMorph",
  tagline: "AI Image Style Transfer & Editor",
  description: "AI-powered style transfer app that transforms your photos into 50+ curated artistic styles. Upload any image and apply styles ranging from Studio Ghibli and oil painting to cyberpunk and cinematic looks. Built-in cropping, gallery management, and a freemium credit system for creators.",
  content: `## Overview

PxlMorph is an AI-powered image transformation application that allows users to apply over 50 artistic styles to their photos. Built with **Next.js 16** and **TypeScript**, it leverages OpenAI's GPT-4o Image 1.5 API for high-fidelity style transfer with detail preservation.

---

## AI Product Engineering Highlights

- **50+ Curated Style Transfer Pipeline** — Designed and optimized 50+ artistic style prompts with example images, categorization, and automated prompt engineering for GPT-4o Image 1.5
- **Edge-Based Image Processing Architecture** — Architected Cloudflare Workers pipeline for presigned URL generation, secure direct uploads, and edge-optimized transformations
- **Freemium Credit Ledger System** — Implemented double-entry credits_ledger with stripe_events idempotency, optimistic UI updates, and soft/hard paywall patterns
- **Production Billing Infrastructure** — Built complete Stripe integration: Checkout Sessions (backend-only), Customer Portal, idempotent webhooks with event deduplication

---

## Architecture Summary

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Frontend** | Next.js 16 + React + TypeScript | Studio editor, gallery, cropping UI |
| **AI Model** | OpenAI GPT-4o Image 1.5 | Style transfer with detail preservation |
| **Image Processing** | Cloudflare R2 + Workers | Edge storage, presigned URLs, optimization |
| **Database** | Supabase (Postgres + RLS) | Auth, profiles, images, credits_ledger |
| **State Management** | Zustand + TanStack Query | Credit tracking, optimistic updates |
| **Billing** | Stripe + Customer Portal | Freemium subscription management |
| **Image Editing** | Sharp + react-easy-crop | Server/client-side image manipulation |

---

## Core Features

### 🎨 Style Categories (50+ Styles)
- **Anime & Cartoon**: Studio Ghibli, Pixar 3D, The Simpsons, Pokémon, Lo-fi Anime, Tim Burton
- **Artistic**: Oil Painting, Watercolor, Sketch, Comic Book, Pop Art, Renaissance, Impressionist
- **Digital**: Cyberpunk, Vaporwave, Synthwave, Glitch Art, Pixel Art, 3D Render
- **Photography**: Portrait, Landscape, Film Noir, Polaroid, Vintage, Cinematic

### 🛠️ Generation Features
- **Style Transfer**: Upload photo + select style → AI transforms with detail preservation
- **Image Cropping**: react-easy-crop for client-side composition control
- **Gallery Management**: Centralized asset history with metadata
- **Community Gallery**: Public showcase of transformed images

### 💳 Freemium Model
- **Free Tier**: 2 welcome credits + 1 credit/month (no accumulation)
- **Starter** ($5.99/mo): 50 edits/month
- **Pro** ($9.99/mo): 100 edits/month for power users

---

## Project Structure & Database

### Project Structure

\`\`\`
src/
├── app/                      # Next.js App Router
│   ├── (studio)/            # Main image editor
│   ├── (gallery)/           # User image history
│   ├── (pricing)/           # Subscription plans
│   ├── (profile)/           # User settings
│   ├── (community)/         # Public gallery
│   └── api/                 # Route handlers
│       ├── generate-image/  # OpenAI GPT-4o Image 1.5
│       ├── stripe/          # Payment webhooks
│       └── auth/            # Supabase helpers
├── components/              # 60+ React components
│   ├── studio/              # Image editor UI
│   ├── gallery/             # Asset grid components
│   ├── pricing/             # Plan cards, checkout
│   └── ui/                  # shadcn/ui components
├── lib/                     # Service layer
│   ├── image-gen.ts         # Generation logic
│   ├── image-api.ts         # OpenAI API wrapper
│   ├── file-validation.ts   # Security checks
│   ├── storage/             # R2 integration
│   │   ├── r2-tokens.ts     # Presigned URLs
│   │   └── upload.ts        # Direct upload logic
│   ├── billing/             # Stripe integration
│   │   ├── stripe.ts        # SDK config
│   │   ├── actions/         # Server actions
│   │   └── hooks/           # Credit management
│   ├── rate-limit.ts        # Token bucket algorithm
│   ├── quota.ts             # Credit tracking
│   └── logger.ts            # Structured logging
├── hooks/                   # Custom React hooks
│   ├── useGeneration.ts     # Image generation flow
│   ├── useCredits.ts        # Credit balance/sync
│   └── useGallery.ts        # Image history
├── stores/                  # Zustand state
│   └── creditStore.ts       # Credit tracking
└── styles/                  # 50+ curated style definitions
    ├── anime-cartoon.ts
    ├── artistic.ts
    ├── digital.ts
    ├── photography.ts
    └── index.ts             # Style registry
\`\`\`

### Database Schema (Supabase PostgreSQL with RLS)

\`\`\`
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│    profiles     │     │    images       │     │ credits_ledger  │
├─────────────────┤     ├─────────────────┤     ├─────────────────┤
│ id (uuid)       │     │ id (uuid)       │     │ id (uuid)       │
│ email           │     │ user_id (fk)    │────►│ user_id (fk)    │
│ created_at      │     │ style_id        │     │ amount (int)    │
│ ─────────────  │     │ original_url    │     │ type (cr/db)    │
│ RLS: user owns  │     │ transformed_url │     │ description     │
└─────────────────┘     │ metadata (json) │     │ created_at      │
                        │ ─────────────  │     │ ─────────────  │
                        │ RLS: user owns  │     │ RLS: user owns  │
                        └─────────────────┘     └─────────────────┘

┌─────────────────┐     ┌─────────────────┐
│  stripe_events  │     │  subscriptions  │
├─────────────────┤     ├─────────────────┤
│ id (uuid)       │     │ id (uuid)       │
│ stripe_event_id │     │ user_id (fk)    │
│ event_type      │     │ stripe_sub_id │
│ processed_at    │     │ status          │
│ ─────────────  │     │ current_period  │
│ Unique:         │     │ ─────────────  │
│ idempotency key │     │ RLS: user owns  │
└─────────────────┘     └─────────────────┘
\`\`\`

---

## Deep Dive: System Architecture

For those interested in the complete technical implementation, here are the detailed ASCII diagrams showing component relationships and data flows.

### High-Level Architecture

\`\`\`
┌─────────────────────────────────────────────────────────────────────────────┐
│                           PXL MORPH PLATFORM                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │                     NEXT.JS 16 APPLICATION (Vercel)                 │  │
│  ├─────────────────────────────────────────────────────────────────────┤  │
│  │                                                                     │  │
│  │  PRESENTATION LAYER                                                 │  │
│  ├── React 19 + TypeScript                                          │  │
│  ├── Tailwind CSS + shadcn/ui                                       │  │
│  ├── Framer Motion (Animations)                                     │  │
│  ├── react-easy-crop (Image cropping)                               │  │
│  └── lucide-react (Icons)                                           │  │
│  │                                                                     │  │
│  │  PAGES (App Router)                                                 │  │
│  ├── /studio            # Main image editor                         │  │
│  ├── /gallery         # User image history                        │  │
│  ├── /pricing         # Subscription plans                        │  │
│  ├── /profile         # User settings                             │  │
│  └── /community       # Public gallery                            │  │
│  │                                                                     │  │
│  │  STATE MANAGEMENT                                                   │  │
│  │  ├── Zustand (creditStore.ts)       # Credit tracking              │  │
│  │  ├── TanStack Query                 # Server state                 │  │
│  │  └── React Context (Auth)         # Supabase auth                │  │
│  │                                                                     │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                    │                                       │
│                                    ▼                                       │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │                    SERVICE LAYER (lib/)                           │  │
│  ├─────────────────────────────────────────────────────────────────────┤  │
│  │                                                                     │  │
│  │  API ROUTES (app/api/)                                              │  │
│  │  ├── /generate-image        # OpenAI GPT-4o Image 1.5              │  │
│  │  ├── /stripe/             # Payment webhooks                     │  │
│  │  └── /auth/               # Supabase auth helpers                │  │
│  │                                                                     │  │
│  │  IMAGE PROCESSING (lib/)                                            │  │
│  │  ├── image-gen.ts         # Generation logic                     │  │
│  │  ├── image-api.ts         # OpenAI API wrapper                   │  │
│  │  ├── file-validation.ts   # Security checks (size/type/dims)      │  │
│  │  └── storage/             # R2 integration                       │  │
│  │                                                                     │  │
│  │  BILLING (lib/)                                                     │  │
│  │  ├── stripe.ts            # Stripe SDK configuration             │  │
│  │  ├── actions/             # Server actions                       │  │
│  │  │   ├── create-checkout-session.ts                              │  │
│  │  │   └── create-portal-session.ts                                │  │
│  │  └── hooks/               # Credit management hooks             │  │
│  │                                                                     │  │
│  │  SECURITY & UTILITIES                                               │  │
│  │  ├── rate-limit.ts        # Token bucket algorithm               │  │
│  │  ├── quota.ts             # Credit tracking logic                │  │
│  │  ├── logger.ts            # Structured logging                   │  │
│  │  └── r2-tokens.ts         # Presigned URL generation             │  │
│  │                                                                     │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
        ┌───────────────────────────┼───────────────────────────┐
        │                           │                           │
        ▼                           ▼                           ▼
┌───────────────┐   ┌───────────────────────┐   ┌───────────────────────┐
│   SUPABASE    │   │  CLOUDFLARE R2       │   │      OPENAI           │
│  PostgreSQL   │   │  + Workers            │   │   GPT-4o Image 1.5    │
├───────────────┤   ├───────────────────────┤   ├───────────────────────┤
│ • Auth        │   │ • Image storage        │   │ • Style transfer      │
│ • profiles    │   │ • Presigned URLs       │   │ • Detail preservation │
│ • images      │   │ • Edge processing      │   │ • 50+ styles support  │
│ • credits_    │   │ • Worker (wrangler)    │   │ • API key management  │
│   ledger      │   │                         │   │                       │
└───────────────┘   └───────────────────────┘   └───────────────────────┘
        │
        │
        ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         STRIPE BILLING SYSTEM                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐         │
│   │  Checkout       │    │  Customer       │    │  Webhook        │         │
│   │  Session        │    │  Portal         │    │  Handler        │         │
│   │  (backend-only) │    │  (self-service) │    │  (idempotent)   │         │
│   └────────┬────────┘    └─────────────────┘    └────────┬────────┘         │
│            │                                            │                   │
│            │         ┌─────────────────┐                   │                   │
│            └────────►│  STRIPE DASH  │◄──────────────────┘                   │
│                      └───────┬───────┘                                       │
│                              │                                               │
│                              ▼                                               │
│                      ┌─────────────────┐                                     │
│                      │  stripe_events  │                                     │
│                      │  table          │                                     │
│                      │  (idempotency)  │                                     │
│                      └─────────────────┘                                     │
│                                                                             │
│   WEBHOOK EVENT FLOW                                                        │
│   Stripe Event ──► Verify Signature ──► Check ID ──► Process ──► Update DB  │
│                              (new?)                                           │
└─────────────────────────────────────────────────────────────────────────────┘
\`\`\`

### Image Processing Pipeline

\`\`\`
┌─────────────────────────────────────────────────────────────────────────────┐
│                    IMAGE PROCESSING PIPELINE                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   UPLOAD FLOW                                                               │
│   ┌─────────┐   ┌─────────────┐   ┌─────────────┐   ┌─────────────┐        │
│   │ User    │──►│ File        │──►│ r2-tokens.ts│──►│ Presigned   │        │
│   │ selects │   │ validation  │   │             │   │ URL         │        │
│   │ image   │   │ (size/type) │   │             │   │ generation  │        │
│   └─────────┘   └─────────────┘   └─────────────┘   └──────┬──────┘        │
│                                                             │               │
│                                                             ▼               │
│   ┌─────────┐   ┌─────────────┐   ┌─────────────┐   ┌─────────────┐        │
│   │ Direct  │◄──│ Cloudflare  │◄──│ Upload to   │◄──│ Return URL  │        │
│   │ upload  │   │ R2          │   │ R2          │   │ to client   │        │
│   │ to R2   │   │             │   │             │   │             │        │
│   └────┬────┘   └─────────────┘   └─────────────┘   └─────────────┘        │
│        │                                                                    │
│        ▼                                                                    │
│   GENERATION FLOW                                                           │
│   ┌─────────────┐   ┌─────────────┐   ┌─────────────┐   ┌─────────────┐    │
│   │ /api/       │──►│ image-gen.ts│──►│ OpenAI API  │──►│ GPT-4o      │    │
│   │ generate-   │   │             │   │ request     │   │ Image 1.5   │    │
│   │ image       │   │ Build prompt│   │             │   │ processing  │    │
│   └─────────────┘   │ + style     │   └─────────────┘   └──────┬──────┘    │
│                     └─────────────┘                            │            │
│                                                                ▼            │
│   ┌─────────────┐   ┌─────────────┐   ┌─────────────┐   ┌─────────────┐    │
│   │ User        │◄──│ Gallery     │◄──│ Save to     │◄──│ Return      │    │
│   │ sees result │   │ Service     │   │ Supabase    │   │ image URL   │    │
│   │             │   │             │   │             │   │             │    │
│   └─────────────┘   └─────────────┘   └─────────────┘   └─────────────┘    │
│                                                                             │
│   SECURITY CHECKS (file-validation.ts)                                      │
│   ├── Max file size: 5MB                                                   │
│   ├── Allowed types: image/jpeg, image/png, image/webp                    │
│   ├── Min dimensions: 256x256                                               │
│   ├── Max dimensions: 4096x4096                                             │
│   └── Virus scan: (future)                                                │
│                                                                             │
│   RATE LIMITING (rate-limit.ts)                                            │
│   ├── Token bucket: 10 tokens per user                                      │
│   ├── Refill rate: 1 token per second                                     │
│   ├── Max burst: 10 requests                                               │
│   └── IP-based fallback: 100 req/min                                       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
\`\`\`

### Credit System Architecture

\`\`\`
┌─────────────────────────────────────────────────────────────────────────────┐
│                    CREDIT MANAGEMENT SYSTEM                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   DATABASE TABLES                                                           │
│   ┌─────────────────────────┐   ┌─────────────────────────┐                  │
│   │    credits_ledger       │   │    stripe_events        │                  │
│   ├─────────────────────────┤   ├─────────────────────────┤                  │
│   │ id (uuid, PK)           │   │ id (uuid, PK)           │                  │
│   │ user_id (uuid, FK)      │   │ stripe_event_id (text)  │                  │
│   │ amount (int)            │   │ event_type (text)       │                  │
│   │ type (credit/debit)     │   │ processed_at (timestamp)│                  │
│   │ description (text)      │   │ ─────────────────────  │                  │
│   │ created_at (timestamp)  │   │ Unique constraint       │                  │
│   │ ─────────────────────  │   │ (idempotency key)       │                  │
│   │ RLS: user owns          │   │                         │                  │
│   └─────────────────────────┘   └─────────────────────────┘                  │
│                                                                             │
│   CREDIT FLOW                                                               │
│                                                                             │
│   FREE TIER (2 + 1/month)                                                   │
│   ┌─────────────┐     ┌─────────────┐     ┌─────────────┐                 │
│   │ User signs  │────►│ +2 credits  │────►│ DB trigger  │                 │
│   │ up          │     │ (welcome)   │     │ monthly: +1 │                 │
│   └─────────────┘     └─────────────┘     └─────────────┘                 │
│                                                                             │
│   PAID TIER (Stripe webhook)                                                │
│   Stripe Event ──► Webhook Handler ──► Idempotency Check ──► Credit Update│
│   • checkout.completed                                                      │
│   • invoice.paid                                                            │
│   • customer.subscription.updated                                             │
│                                                                             │
│   PAYWALL LOGIC                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐  │
│   │  User clicks "Generate"                                            │  │
│   │       │                                                            │  │
│   │       ▼                                                            │  │
│   │  ┌──────────────┐                                                  │  │
│   │  │ Check credit │──── credits = 1? ───► "1 credit left" warning   │  │
│   │  │ balance      │                                  (soft paywall) │  │
│   │  └──────────────┘                                                  │  │
│   │       │                                                            │  │
│   │       ▼                                                            │  │
│   │  credits = 0? ──► Show hard paywall ──► Upgrade CTA                │  │
│   │                                                                            │  │
│   │       │ Yes, has credits                                             │  │
│   │       ▼                                                            │  │
│   │  Deduct 1 credit ──► Call OpenAI ──► Save result ──► Show image    │  │
│   └─────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│   OPTIMISTIC UI UPDATES                                                     │
│   1. Deduct credit locally (Zustand)                                        │
│   2. Fire generation request                                                │
│   3. On success: persist to Supabase                                        │
│   4. On failure: rollback local state                                       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
\`\`\`

---

## Key Technical Implementation Details

**AI Models Used:**
- gpt-image-1.5: Style transfer & image transformation with detail preservation (50+ curated styles)

**Image Processing Pipeline:**
- **Sharp**: Server-side image optimization and format conversion
- **react-easy-crop**: Client-side image cropping UI with aspect ratio control
- **Presigned URLs**: Cloudflare R2 secure direct uploads via \`r2-tokens.ts\`
- **File Validation**: Security checks via \`file-validation.ts\` (5MB max, jpeg/png/webp, 256x256 to 4096x4096)

**Credit System Implementation:**
- Separate credits_ledger table from billing data (clean separation)
- Stripe event idempotency with stripe_events table (unique constraint)
- Real-time credit sync with optimistic UI updates (Zustand)
- Soft paywall UX: gentle warning at 1 credit, hard paywall at 0

**Rate Limiting & Security:**
- **API Rate Limiting**: Token bucket via \`rate-limit.ts\` (10 tokens/user, 1/sec refill)
- **Quota Management**: Credit tracking via \`quota.ts\` with balance validation
- **Logger**: Structured logging via \`logger.ts\` for observability

**Key Integrations:**
- OpenAI GPT-4o Image 1.5: Style transfer with detail preservation
- Cloudflare R2: Scalable image storage with presigned URL security
- Cloudflare Workers: Edge-based image processing and URL generation
- Stripe: Checkout Sessions (backend-only), Customer Portal, webhook handling
- Supabase: Auth with RLS, profiles, images, credits_ledger with triggers
`,
  stack: ["TypeScript", "Next.js", "React", "Supabase Auth + DB", "Cloudflare R2", "Cloudflare Workers", "Vercel", "OpenAI API", "Stripe", "Zustand", "TanStack Query", "Zod", "Sharp", "react-easy-crop", "Tailwind CSS"],
  highlights: [
    "50+ curated style pipeline: Optimized prompts with categorization for GPT-4o Image 1.5.",
    "Edge-based image architecture: Cloudflare Workers for presigned URLs and edge processing.",
    "Freemium credit ledger: Double-entry system with stripe_events idempotency, optimistic UI.",
    "Production billing: Stripe Checkout Sessions (backend-only), Customer Portal, idempotent webhooks."
  ],
  links: {
    demo: "https://pxlmorph.vercel.app"
  },
  imageUrl: "/pxlmorph-cover.jpg",
  status: "Beta",
  featured: false,
  demoCredentials: {
    email: "demo@test.com",
    password: "password123"
  },
};
