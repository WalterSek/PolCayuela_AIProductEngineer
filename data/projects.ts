export interface Project {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  content?: string;
  stack: string[];
  highlights: string[];
  links: {
    demo?: string;
    repo?: string;
    caseStudy?: string;
    video?: string;
    playStore?: string;
    testerGroup?: string;
  };
  status?: "Production" | "Prototype" | "Beta" | "Launch Soon" | "Google Play Internal Testing" | "Live Web App";
  featured?: boolean;
  imageUrl?: string;
  demoCredentials?: {
    email: string;
    password: string;
  };
  productionFeatures?: string[];
}

export const projects: Project[] = [
  {
    slug: "culinaria",
    name: "CulinarIA",
    tagline: "AI-Powered Cooking Companion",
    description: "A mobile app that bridges the gap between discovering a recipe and actually cooking it. Built with React Native and Google Gemini's multimodal ecosystem, it extracts recipes from URLs or images, manages your pantry, and offers a hands-free voice assistant.",
    content: `## Overview

CulinarIA is an AI-powered cooking companion that bridges the gap between discovering a recipe and actually cooking it. Built with **React Native** and **Google Gemini's multimodal ecosystem**, it extracts recipes from URLs or images, manages your pantry, and offers a hands-free voice assistant.

**Monorepo Architecture:** npm workspaces with shared Zod contracts package for type-safe API communication between mobile and backend.

---

## Core Features

### 📱 Extract Tab (Recipe Scanner)
- **Scan Mode**: Take photo or upload from gallery — Gemini Vision extracts recipes from cookbooks, magazines, screenshots
- **Link Mode**: Paste URL from any recipe blog, YouTube video description, TikTok, Instagram
- **Search Mode**: Search billions of recipes by dish name

### 📖 Recipes Tab (Recipe Library)
- Searchable recipe library with ingredient matching
- Shows how many ingredients you already have
- AI-generated step-by-step images with Gemini Imagen
- Full ingredients, step-by-step instructions, nutrition info

### 🧺 Kitchen Tab (Pantry & Shopping)
- **Pantry Mode**: Track ingredients at home organized by aisle
- **Shop Mode**: Smart grocery list grouped by category
- AI Ingredient Parsing: Natural language input ("2 cups flour, 3 eggs")
- Smart Merging: Combines duplicate ingredients automatically

### 👨‍🍳 Chef Tab (AI Recipe Suggestions)
- Get recipe ideas based on your current pantry inventory
- Cuisine and meal type filters
- Smart Matching: AI suggests recipes you can make with ingredients you already have

---

## Full System Architecture

### High-Level Architecture

\`\`\`
┌─────────────────────────────────────────────────────────────────────────────┐
│                           CULINARIA PLATFORM                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────────┐      ┌──────────────────┐      ┌──────────────────┐  │
│  │   MOBILE APP     │      │   BACKEND API    │      │   AI SERVICES    │  │
│  │  (Expo SDK 55)   │◄────►│  (Node.js 22)    │◄────►│  (Gemini API)    │  │
│  └────────┬─────────┘      └────────┬─────────┘      └──────────────────┘  │
│           │                         │                                       │
│  ┌────────▼─────────┐      ┌────────▼─────────┐      ┌──────────────────┐  │
│  │  State Management│      │  Service Layer   │      │  LiveKit Voice   │  │
│  │  • TanStack Query│      │  • AI Routes     │      │  (agent-main.ts) │  │
│  │  • Zustand       │      │  • Voice Routes  │      │                  │  │
│  │  • Supabase Auth │      │  • User Routes   │      │  • 13 Chef Tools │  │
│  └──────────────────┘      │  • Storage Routes│      │  • WebRTC Rooms  │  │
│                            │  • Webhook Routes│      │  • Gemini 2.5    │  │
│  ┌──────────────────┐      └──────────────────┘      └──────────────────┘  │
│  │  UI Components   │                                                       │
│  │  • Expo Router   │                                                       │
│  │  • React Native  │                                                       │
│  │  • ChefDiscovery │                                                       │
│  └──────────────────┘                                                       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
              ┌───────────────────────┼───────────────────────┐
              │                       │                       │
     ┌────────▼─────────┐   ┌────────▼─────────┐   ┌────────▼─────────┐
     │   SUPABASE       │   │  CLOUDFLARE R2   │   │  CLOUD RUN       │
     │  PostgreSQL      │   │  (Image Storage) │   │  (Docker Deploy) │
     │  • RLS Policies  │   │  • Signed URLs   │   │  • Auto-scaling  │
     │  • Auth Triggers │   │  • Worker        │   │  • Cloud Build   │
     └──────────────────┘   └──────────────────┘   └──────────────────┘
              │
     ┌────────▼─────────┐
     │  BILLING         │
     │  • RevenueCat    │
     │  • Paddle        │
     └──────────────────┘
\`\`\`

### Backend Service Layer Detail

\`\`\`
┌─────────────────────────────────────────────────────────────────────────────┐
│                         BACKEND SERVICE ARCHITECTURE                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  EXPRESS 5 MIDDLEWARE LAYER                                                 │
│  ├── Helmet.js (Security Headers)                                         │
│  ├── CORS (Cross-Origin)                                                   │
│  ├── Compression (Gzip)                                                      │
│  ├── express-rate-limit (API Protection)                                   │
│  └── JWT Verification (jose library)                                         │
│                                                                             │
│  API ROUTES (src/routes/)                                                    │
│  ├── ai.routes.ts           # Recipe extraction, generation, chat          │
│  ├── voice.routes.ts        # LiveKit tokens, Gemini Live API              │
│  ├── user.routes.ts         # Profile, usage tracking                       │
│  ├── storage.routes.ts      # R2 presigned URLs                            │
│  ├── subscription.routes.ts # RevenueCat/Paddle webhooks                   │
│  └── webhook.routes.ts      # External service callbacks                   │
│                                                                             │
│  SERVICE LAYER (src/services/)                                              │
│  ├── ai.base.service.ts        # Gemini API orchestration                  │
│  ├── recipe.ai.service.ts      # Recipe extraction logic                   │
│  ├── chef-agent-actions.ts     # 13 Chef Tools implementation              │
│  │                             • getRecipes                                │
│ │                             • addToPantry                               │
│ │                             • searchRecipes                               │
│ │                             • generateRecipe                              │
│ │                             • analyzeImage                                │
│ │                             • getNutritionInfo                            │
│ │                             • (7 more tools...)                           │
│  ├── user.service.ts           # User profile & subscriptions              │
│  ├── storage.service.ts        # R2 signed URL generation                │
│  ├── revenuecat.service.ts     # Mobile subscription management          │
│  ├── email.service.ts          # Notification emails                     │
│  └── nutrition.service.ts      # Nutritional analysis                    │
│                                                                             │
│  AI/VOICE AGENT (agent-main.ts)                                             │
│  ├── LiveKit Agent Worker                                                   │
│  ├── @livekit/agents-plugin-google                                          │
│  ├── Gemini 2.5 Flash Native Audio                                          │
│  └── Real-time voice conversations                                        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
\`\`\`

### Monorepo Structure

\`\`\`
cookshelf/
├── package.json              # npm workspaces root
├── mobile/                   # React Native + Expo
│   ├── src/
│   │   ├── hooks/           # TanStack Query hooks
│   │   ├── services/        # API clients
│   │   ├── store/           # Zustand stores
│   │   └── app/             # Expo Router pages
│   └── package.json
├── backend/                  # Node.js 22 + Express 5
│   ├── src/
│   │   ├── routes/          # API endpoints
│   │   ├── services/        # Business logic
│   │   ├── middleware/      # Auth, validation
│   │   ├── __tests__/       # Vitest tests
│   │   └── agent-main.ts    # LiveKit AI agent
│   ├── Dockerfile           # Cloud Run container
│   ├── cloudbuild.yaml      # CI/CD pipeline
│   └── package.json
└── packages/
    └── contracts/            # Shared Zod schemas
        └── src/
            └── index.ts     # Type-safe API contracts
\`\`\`

**Database Schema (Supabase PostgreSQL with RLS):**
\`\`\`
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│     recipes     │  │ user_ingredients│  │  user_profiles  │
├─────────────────┤  ├─────────────────┤  ├─────────────────┤
│ id (uuid)       │  │ id (uuid)       │  │ id (uuid)       │
│ user_id (fk)    │  │ user_id (fk)    │  │ email           │
│ title           │  │ name            │  │ tier            │
│ instructions    │  │ type            │  │ subscription_id │
│ ingredients     │  │ quantity        │  │ created_at      │
│ image_url       │  │ category        │  │ updated_at      │
│ ai_metadata     │  │ ─────────────  │  │ ─────────────  │
│ ─────────────  │  │ RLS: user owns  │  │ RLS: user owns  │
│ RLS: user owns  │  │                 │  │                 │
└─────────────────┘  └─────────────────┘  └─────────────────┘
\`\`\`

**Key Integrations:**
- Gemini 3 Flash for recipe extraction from any URL or image
- Gemini 3.1 Imagen for AI-generated step-by-step images
- LiveKit Agents + Gemini 2.5 Flash Native Audio for real-time voice assistant
- RevenueCat (mobile) + Paddle (web) for dual-platform subscription management (Free, Starter, Pro, Ultimate tiers)
- Supabase with Row Level Security for all user data
- Cloudflare R2 for scalable image storage with signed URL security

**Security & Middleware:**
- Helmet.js for security headers, CORS, Compression middleware
- Express-rate-limit for API protection
- JWT verification via \`jose\` library
- Environment variable separation (mobile: EXPO_PUBLIC_*, backend: standard)

**AI/Voice Services:**
- 13 custom Chef Tools in \`chef-agent-actions.service.ts\` (getRecipes, addToPantry, searchRecipes, etc.)
- LiveKit agent with @livekit/agents-plugin-google for Gemini 2.5 Flash Native Audio
- Separate agent-main.ts worker process for voice conversations
- Webhook handlers for RevenueCat subscription events

**Development Infrastructure:**
- **Testing**: Vitest (backend), Jest (mobile) with comprehensive test coverage
- **Build**: esbuild with externals configuration (@livekit/agents, @google/genai, sharp)
- **CI/CD**: Docker + Google Cloud Build (cloudbuild.yaml) for automated deployment
- **Code Quality**: ESLint + Prettier with strict TypeScript configuration
- **API Contracts**: Shared Zod schemas in npm workspace package for type safety

**Security Model:**
- JWT-based authentication via Supabase
- Row Level Security (RLS) on all database tables
- Backend JWT verification middleware for protected routes
- Environment variable separation (mobile: EXPO_PUBLIC_*, backend: standard)
`,
    stack: ["TypeScript", "React Native", "Expo", "Node.js", "Express", "Supabase", "Cloudflare R2", "Gemini API", "Gemini Live API", "LiveKit", "Cloud Run", "Docker", "RevenueCat", "Paddle", "Vitest", "Jest"],
    highlights: [
      "Monorepo architecture with npm workspaces and shared Zod API contracts for type-safe cross-platform communication.",
      "LiveKit AI agent with Gemini 2.5 Flash Native Audio for real-time voice cooking assistant with 13 custom server tools.",
      "Dual-platform billing: RevenueCat (mobile) + Paddle (web) with tiered subscription management.",
      "Dockerized Node.js 22 backend on Google Cloud Run with automated CI/CD via Cloud Build.",
      "Comprehensive testing: Vitest (backend), Jest (mobile) with esbuild bundling for production.",
      "Row Level Security (RLS) on Supabase PostgreSQL with JWT authentication middleware."
    ],
    links: {
      playStore: "https://play.google.com/apps/testing/com.kayuken.culinaria",
      testerGroup: "https://groups.google.com/g/culinaria-testers"
    },
    imageUrl: "/culinaria-cover.jpg",
    status: "Launch Soon",
    featured: true,
    productionFeatures: [
      "Live Gemini multimodal voice integration via LiveKit Agents",
      "Dual-platform billing: RevenueCat (mobile) + Paddle (web)",
      "Google Cloud Run backend with Docker containerization",
      "Supabase Auth & real-time database syncing with RLS",
      "Comprehensive test suite: Vitest + Jest",
      "Cloudflare R2 signed URL security for image storage"
    ]
  },
  {
    slug: "infinitevisuals",
    name: "InfiniteVisuals",
    tagline: "AI Brand Content Engine",
    description: "An AI-powered brand content engine that generates consistent, high-quality visual assets for e-commerce and marketing teams. Create professional product photography, lifestyle scenes, and advertising creatives using multiple Gemini models without traditional photoshoots.",
    content: `## Overview

InfiniteVisuals is an AI-powered visual content generation platform for e-commerce and marketing teams. It enables users to create professional product photography, lifestyle scenes, and advertising creatives using AI, eliminating the need for traditional photoshoots.

Replace expensive, time-consuming traditional photoshoots with instant AI-generated professional visuals. Generate unlimited variations, test creative concepts rapidly, and maintain brand consistency across all marketing channels.

---

## Core Features

### 🎨 Generation Modes
- **Studio Mode**: Clean product shots with various aspect ratios optimized for e-commerce (Amazon, Shopify)
- **Lifestyle Mode**: Authentic lifestyle scenes with products in real-world contexts
- **Creative Mode**: High-concept advertising visuals for campaigns (Pro/Agency plans)

### 🛠️ Smart Suite
- **Smart Edit**: Natural language image editing
- **Smart Reframe**: One-click aspect ratio adaptation
- **Smart Variations**: Generate multiple options from one concept
- **Smart Batch**: Generate 2-4 outputs from single prompt
- **AI Product Analysis**: Automatic product categorization and attribute detection

### 📦 Additional Features
- **Auto-Catalog**: Batch process entire product catalogs (up to 25 products)
- **Brand Kit Management**: Logo upload, brand colors, tone of voice
- **Gallery System**: Centralized asset management with folder organization

### 💳 Plans
- **Free Trial**: 10 credits, 14-day asset expiration, watermarked outputs
- **Studio** ($29/mo): 50 credits/month, 1 brand kit, Studio Mode
- **Pro** ($79/mo): 200 credits/month, unlimited brand kits, all modes
- **Agency** ($199/mo): 600 credits/month, Auto-Catalog (25 products), priority support

---

## Full System Architecture

### High-Level Architecture

\`\`\`
┌─────────────────────────────────────────────────────────────────────────────┐
│                        INFINITE VISUALS PLATFORM                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │                     NEXT.JS 16 APPLICATION (Vercel)                 │  │
│  ├─────────────────────────────────────────────────────────────────────┤  │
│  │                                                                     │  │
│  │  PRESENTATION LAYER                                                 │  │
│  │  ├── React 18 Components                                            │  │
│  │  ├── Tailwind CSS + shadcn/ui                                       │  │
│  │  ├── Framer Motion (Animations)                                     │  │
│  │  ├── dnd-kit (Drag & Drop)                                          │  │
│  │  ├── embla-carousel (Galleries)                                     │  │
│  │  └── react-compare-slider (Before/After)                            │  │
│  │                                                                     │  │
│  │  STATE MANAGEMENT LAYER                                             │  │
│  │  ├── Zustand (Global State)                                         │  │
│  │  │   ├── creditStore.ts        # Credit tracking                    │  │
│  │  │   ├── brandKitStore.ts     # Brand assets                       │  │
│  │  │   └── galleryStore.ts      # Asset management                   │  │
│  │  ├── TanStack Query (Server State)                                │  │
│  │  └── immer (Immutable Updates)                                    │  │
│  │                                                                     │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                    │                                       │
│                                    ▼                                       │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │                      SERVICE LAYER (services/)                      │  │
│  ├─────────────────────────────────────────────────────────────────────┤  │
│  │                                                                     │  │
│  │  AI GENERATION SERVICES (services/gemini/)                        │  │
│  │  ├── image-generation.ts      # Multi-model image gen             │  │
│  │  ├── batch-generation.ts      # Batch processing                    │  │
│  │  ├── image-editing.ts         # Smart Edit feature                │  │
│  │  ├── image-manipulation.ts    # Smart Reframe                     │  │
│  │  ├── product-analysis.ts      # AI product categorization          │  │
│  │  ├── prompt-enhancement.ts    # Prompt optimization                │  │
│  │  ├── copy-generation.ts       # Marketing copy                     │  │
│  │  ├── campaign-generation.ts   # Campaign workflows                  │  │
│  │  ├── execution.ts             # Gemini API wrapper                 │  │
│  │  ├── errors.ts                # Error handling                    │  │
│  │  └── prompts.ts               # 66KB prompt library               │  │
│  │                                                                     │  │
│  │  AGENT SYSTEM (services/agents/ - Google ADK)                    │  │
│  │  ├── campaign-orchestrator.ts # ParallelAgent orchestration       │  │
│  │  ├── product-analyzer.ts      # Vision-based extraction           │  │
│  │  ├── trends-researcher.ts     # Market research                   │  │
│  │  ├── creative-brief.ts        # Structured output agent            │  │
│  │  ├── quality-control.ts       # QC LoopAgent                       │  │
│  │  ├── stop-if-approved.ts      # Approval gate                    │  │
│  │  ├── state-cleanup.ts         # Memory optimization               │  │
│  │  └── runner.ts                # Agent execution                    │  │
│  │                                                                     │  │
│  │  SUPPORTING SERVICES                                               │  │
│  │  ├── brandKitService.ts       # Brand asset management            │  │
│  │  ├── brandKitAnalysis.ts      # AI brand analysis                 │  │
│  │  ├── galleryService.ts        # Asset gallery                    │  │
│  │  ├── credit/                  # Credit management                  │  │
│  │  ├── storage/                 # R2 integration                     │  │
│  │  ├── stripe/                  # Payment processing                 │  │
│  │  └── auth/                    # Auth helpers                      │  │
│  │                                                                     │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                    │                                       │
│                                    ▼                                       │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │                        AI MODEL LAYER                               │  │
│  ├─────────────────────────────────────────────────────────────────────┤  │
│  │                                                                     │  │
│  │  GEMINI MODEL ORCHESTRATION                                         │  │
│  │  ├── gemini-2.5-flash-image     # Default/fast generation          │  │
│  │  ├── gemini-3-pro-image-preview # High-fidelity (up to 4K)         │  │
│  │  ├── gemini-3.1-flash-image-preview # Nano Banana 2 (batch)        │  │
│  │  ├── gemini-flash-lite-latest   # Product analysis               │  │
│  │  ├── gemini-3.1-pro-preview     # CreativeBrief agent            │  │
│  │  └── gemini-2.5-flash           # Prompt enhancement             │  │
│  │                                                                     │  │
│  │  GOOGLE ADK FRAMEWORK (@google/adk v0.5.0)                        │  │
│  │  ├── BaseAgent, SequentialAgent, ParallelAgent, LoopAgent        │  │
│  │  ├── Native Structured Outputs (Zod schemas)                      │  │
│  │  ├── Session State Management                                      │  │
│  │  └── SSE Streaming (Server-Sent Events)                            │  │
│  │                                                                     │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
        ┌───────────────────────────┼───────────────────────────┐
        │                           │                           │
        ▼                           ▼                           ▼
┌───────────────┐   ┌───────────────────────┐   ┌───────────────────────┐
│   SUPABASE    │   │   CLOUDFLARE R2        │   │      STRIPE           │
│  PostgreSQL   │   │   + Workers            │   │   + Customer Portal   │
├───────────────┤   ├───────────────────────┤   ├───────────────────────┤
│ • RLS enabled │   │ • Image storage        │   │ • Checkout Sessions    │
│ • Auth        │   │ • Presigned URLs       │   │ • Webhook handling    │
│ • Credits     │   │ • Edge processing      │   │ • Idempotency         │
│ • Gallery     │   │ • Batch operations     │   │ • Subscription mgmt   │
│ • Brand Kits  │   │                         │   │                         │
└───────────────┘   └───────────────────────┘   └───────────────────────┘
\`\`\`

### Agent Workflow Architecture

\`\`\`
┌─────────────────────────────────────────────────────────────────────────────┐
│                    GOOGLE ADK AGENT WORKFLOW (Campaign Generation)           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   INPUT: Product Image + Brand Kit + Preferences                            │
│                              │                                              │
│                              ▼                                              │
│   ┌─────────────────────────────────────────────────────────────┐          │
│   │         CAMPAIGN ORCHESTRATOR (ParallelAgent)               │          │
│   │              gemini-3.1-pro-preview                         │          │
│   └──────────┬──────────────────────────────────┬───────────────┘          │
│              │                                  │                           │
│              ▼                                  ▼                           │
│   ┌──────────────────────┐        ┌──────────────────────┐                 │
│   │   PRODUCT ANALYZER   │        │  TRENDS RESEARCHER   │                 │
│   │ gemini-3.1-flash-    │        │ gemini-3.1-flash     │                 │
│   │ lite-preview         │        │                      │                 │
│   │                      │        │ • Google Search      │                 │
│   │ • Category detection │        │ • Market trends      │                 │
│   │ • Attribute extract  │        │ • Sentiment analysis │                 │
│   │ • Visual analysis    │        │ • Competitor intel   │                 │
│   │                      │        │                      │                 │
│   │ Output: product_     │        │ Output: trend_       │                 │
│   │ analysis             │        │ research             │                 │
│   └──────────┬───────────┘        └──────────┬───────────┘                 │
│              │                                  │                           │
│              └────────────────┬─────────────────┘                           │
│                               ▼                                             │
│   ┌─────────────────────────────────────────────────────────────┐          │
│   │           CREATIVE BRIEF WRITER (Structured Output)         │          │
│   │                gemini-3.1-pro-preview                       │          │
│   │                                                             │          │
│   │  • Zod schema validation                                    │          │
│   │  • Response MIME: application/json                          │          │
│   │  • Output: campaign_concepts_json                           │          │
│   │                                                             │          │
│   │  Concepts:                                                  │          │
│   │  • 3 campaign directions                                    │          │
│   │  • Color palettes                                           │          │
│   │  • Messaging frameworks                                     │          │
│   └──────────┬────────────────────────────────────────────────┘          │
│              │                                                              │
│              ▼                                                              │
│   ┌─────────────────────────────────────────────────────────────┐          │
│   │              QC VALIDATOR (LoopAgent)                        │          │
│   │                gemini-3.1-pro-preview                       │          │
│   │                                                             │          │
│   │  Iterative validation loop:                                 │          │
│   │  • Brand compliance check                                   │          │
│   │  • Technical requirements                                   │          │
│   │  • StopIfApproved pattern                                   │          │
│   │                                                             │          │
│   │  Output: qc_status (approved/rejected + feedback)          │          │
│   └─────────────────────────────────────────────────────────────┘          │
│                              │                                              │
│                              ▼                                              │
│   ┌─────────────────────────────────────────────────────────────┐          │
│   │            STATE CLEANUP AGENT                               │          │
│   │                                                             │          │
│   │  • Prunes base64 data from session state                    │          │
│   │  • Optimizes memory usage                                    │          │
│   │  • temp:product_image_b64 → null                            │          │
│   └─────────────────────────────────────────────────────────────┘          │
│                                                                             │
│   OUTPUT: Approved Campaign Brief → Image Generation Queue                 │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
\`\`\`

### Data Model

\`\`\`
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  brand_kits     │     │    credits      │     │    gallery      │
├─────────────────┤     ├─────────────────┤     ├─────────────────┤
│ id (uuid)       │     │ id (uuid)       │     │ id (uuid)       │
│ user_id (fk)    │────►│ user_id (fk)    │◄────│ user_id (fk)    │
│ name            │     │ balance         │     │ title           │
│ logo_url        │     │ last_reset      │     │ image_url       │
│ colors (json)   │     │ subscription_id │     │ style           │
│ tone_of_voice   │     │ ─────────────  │     │ metadata        │
│ ─────────────  │     │ RLS: user owns  │     │ ─────────────  │
│ RLS: user owns  │     └─────────────────┘     │ RLS: user owns  │
└─────────────────┘                             └─────────────────┘
        │
        │
        ▼
┌─────────────────┐     ┌─────────────────┐
│  subscriptions  │     │ stripe_events   │
├─────────────────┤     ├─────────────────┤
│ id (uuid)       │     │ id (uuid)       │
│ user_id (fk)    │     │ stripe_event_id │
│ stripe_sub_id   │     │ event_type      │
│ status          │     │ processed_at    │
│ current_period  │     │ ─────────────  │
│ cancel_at_period│     │ Unique constraint│
│ ─────────────  │     │ (idempotency)   │
│ RLS: user owns  │     └─────────────────┘
└─────────────────┘
\`\`\`

**AI Models Used:**
- gemini-2.5-flash-image: Default image generation (fast, high quality)
- gemini-3-pro-image-preview: High-fidelity generation (up to 4K resolution)
- gemini-3.1-flash-image-preview: Nano Banana 2 - high-volume generation
- gemini-flash-lite-latest: Product analysis, brand detection
- gemini-3.1-flash-preview: Agent workflows (CreativeBrief, QC, Trends)
- gemini-2.5-flash: Prompt enhancement

**Smart Suite Implementation:**
- **Smart Edit**: Natural language image editing via \`image-editing.ts\`
- **Smart Reframe**: Aspect ratio adaptation via \`image-manipulation.ts\`
- **Smart Variations**: Multiple concept options via batch generation
- **Smart Batch**: 2-4 outputs from single prompt
- **AI Product Analysis**: \`product-analysis.ts\` with automatic categorization

**Agent System (Google ADK):**

| Agent | Role | Model | State Input/Output |
|-------|------|-------|-------------------|
| **CampaignOrchestrator** | Parallel workflow orchestration | gemini-3.1-pro-preview | Fans out to specialists |
| **ProductAnalyzer** | Vision-based attribute extraction | gemini-3.1-flash-lite-preview | product_image -> product_analysis |
| **TrendsResearcher** | Market/Niche grounding | gemini-3.1-flash | product_category -> trend_research |
| **CreativeBrief** | Strategic concept generation | gemini-3.1-pro-preview | Structured JSON via Zod |
| **QCValidator** | Technical & Brand check | gemini-3.1-pro-preview | concepts -> qc_status |

**Key Technical Features:**
- **Structured Outputs**: Native Zod schema validation for type-safe AI responses
- **State Management**: Session state with automatic cleanup via \`StateCleanupAgent\`
- **Parallel Execution**: ProductAnalyzer + TrendsResearcher via ParallelAgent
- **Iterative QC**: LoopAgent with StopIfApproved pattern for quality validation
- **SSE Streaming**: Real-time status updates during multi-phase generation

**Testing & Quality:**
- Jest unit tests for services and utilities
- Playwright E2E tests for critical user flows
- Comprehensive Stripe webhook testing suite
- Type safety via generated Supabase types
`,
    stack: ["TypeScript", "Next.js", "React", "Supabase", "Cloudflare R2", "Vercel", "Gemini API", "Google ADK", "Stripe", "Zustand", "Jest", "Playwright"],
    highlights: [
      "Google ADK multi-agent orchestration with CampaignOrchestrator, ProductAnalyzer, TrendsResearcher, CreativeBrief, and QCValidator agents.",
      "Native structured outputs with Zod schemas for type-safe AI responses and automatic state cleanup.",
      "Parallel agent execution (ProductAnalyzer + TrendsResearcher) via ParallelAgent with SSE streaming.",
      "Iterative quality control via LoopAgent with StopIfApproved pattern.",
      "6 Gemini models (2.5/3.0/3.1 Flash/Pro) for image generation, analysis, and agent workflows.",
      "Hybrid local + remote credit management system with conflict resolution.",
      "Full Stripe integration with Customer Portal, webhooks, and comprehensive Jest testing."
    ],
    links: {
      demo: "https://infinitevisuals.vercel.app/"
    },
    imageUrl: "/infinitevisuals-cover.jpg",
    status: "Beta",
    featured: true,
    demoCredentials: {
      email: "demo@test.com",
      password: "password123"
    },
    productionFeatures: [
      "Google ADK agentic workflow system with multi-agent orchestration",
      "Native structured outputs with Zod schema validation",
      "6 Gemini AI models for generation, analysis, and agent workflows",
      "Full Stripe billing with Customer Portal and webhook handling",
      "Hybrid credit management system (local + remote sync)",
      "Cloudflare R2 scalable image storage",
      "Jest + Playwright comprehensive testing suite",
      "Supabase RLS with generated TypeScript types"
    ]
  },
  {
    slug: "kryptodash",
    name: "Kryptodash",
    tagline: "AI-Powered Crypto Trading Insights",
    description: "Advanced technical analysis platform for cryptocurrency markets combining real-time data with Gemini 3.1 AI to spot better trading opportunities.",
    content: `## Overview

Kryptodash is an advanced cryptocurrency trading insights platform that combines real-time market data with AI-powered technical analysis. Built with Next.js, it integrates multiple data sources to help traders spot better opportunities.

---

## Core Features

### 📊 Market Data Integration
- **Real-time Prices**: WebSocket connection to Binance for live price updates
- **Multiple APIs**: CoinGecko, Binance, and altFINS for comprehensive market data
- **Pattern Recognition**: altFINS trading signals and technical patterns

### 📈 Technical Analysis
- TradingView integration for advanced charting
- Real-time price ticker updates with visual indicators
- Price change animations (green/red flash on updates)

### 🧠 AI Features
- Gemini 3.1 Flash for market analysis and insights
- Gemini 3.1 Flash Lite for cost-efficient parsing
- Trading pattern detection
- Opportunity scanning

### 👤 User Features
- User authentication with Supabase
- Portfolio tracking
- Personalized watchlists

---

## Full System Architecture

### High-Level Architecture

\`\`\`
┌─────────────────────────────────────────────────────────────────────────────┐
│                         KRYPTODASH PLATFORM                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │                     NEXT.JS 16 APPLICATION (Vercel)                 │  │
│  ├─────────────────────────────────────────────────────────────────────┤  │
│  │                                                                     │  │
│  │  PRESENTATION LAYER                                                 │  │
│  │  ├── HeroUI Components (NextUI-based)                             │  │
│  │  ├── TradingView Charting                                          │  │
│  │  ├── Tailwind CSS                                                  │  │
│  │  └── React Server Components                                       │  │
│  │                                                                     │  │
│  │  CUSTOM HOOKS LAYER (hooks/)                                        │  │
│  │  ├── useLivePrices.ts        # WebSocket price streaming           │  │
│  │  ├── useAnimatedPrice.ts      # Price change animations            │  │
│  │  ├── useAltFinsData.ts        # Pattern signals                    │  │
│  │  ├── useDashboardData.ts      # Market overview                  │  │
│  │  ├── useWatchlist.ts          # User watchlists                    │  │
│  │  ├── useCoinNews.ts           # News aggregation                 │  │
│  │  ├── useNetworkStatus.ts      # Offline detection                │  │
│  │  └── usePerformance.ts        # Performance monitoring           │  │
│  │                                                                     │  │
│  │  STATE MANAGEMENT (stores/)                                         │  │
│  │  ├── priceStore.ts            # Live price data                    │  │
│  │  ├── marketDataStore.ts       # Market aggregations                │  │
│  │  ├── cryptoDataStore.ts       # AltFINS patterns                 │  │
│  │  ├── coinNewsStore.ts         # News articles                    │  │
│  │  ├── notificationStore.ts     # Toast system                     │  │
│  │  ├── settingsStore.ts         # User preferences                 │  │
│  │  └── chartPreferencesStore.ts # Chart settings                   │  │
│  │                                                                     │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                    │                                       │
│                                    ▼                                       │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │                    DATA LAYER (lib/)                                │  │
│  ├─────────────────────────────────────────────────────────────────────┤  │
│  │                                                                     │  │
│  │  API INTEGRATION SERVICES                                           │  │
│  │  ├── binance-service.ts       # WebSocket + REST                   │  │
│  │  ├── coingecko-service.ts     # Price + Market cap                 │  │
│  │  ├── altfins-service.ts       # Trading patterns                   │  │
│  │  ├── mobula-service.ts        # Additional market data             │  │
│  │  ├── cryptocompare-service.ts # Historical data                    │  │
│  │  └── proxy.ts                 # Rate-limited fetcher               │  │
│  │                                                                     │  │
│  │  AI ANALYSIS (Pro-gated)                                            │  │
│  │  ├── manual-ai-analysis.ts    # Gemini market analysis             │  │
│  │  ├── manual-analysis-derivations.ts # Data processing              │  │
│  │  └── gemini-3.1-flash/flash-lite                                   │  │
│  │                                                                     │  │
│  │  RESILIENCE PATTERNS                                                │  │
│  │  ├── circuit-breaker.ts       # Fault tolerance                    │  │
│  │  ├── rate-limiter.ts          # Token bucket algorithm           │  │
│  │  ├── server-fetch.ts          # SSR data fetching                │  │
│  │  └── cache-config.ts          # SWR + React Query cache          │  │
│  │                                                                     │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
        ┌───────────────────────────┼───────────────────────────┐
        │                           │                           │
        ▼                           ▼                           ▼
┌───────────────┐   ┌───────────────────────┐   ┌───────────────────────┐
│   SUPABASE    │   │   BINANCE WEBSOCKET   │   │   EXTERNAL APIS       │
│  PostgreSQL   │   │   + REST API          │   │                       │
├───────────────┤   ├───────────────────────┤   ├───────────────────────┤
│ • RLS enabled │   │ • Real-time prices    │   │ • CoinGecko API      │
│ • profiles    │   │ • Auto-reconnect      │   │ • altFINS API        │
│ • watchlists  │   │ • Exponential backoff │   │ • Mobula API         │
│ • is_pro flag │   │ • Fallback polling    │   │ • CryptoCompare      │
│ • Triggers    │   │ • Connection state    │   │                       │
└───────────────┘   └───────────────────────┘   └───────────────────────┘
\`\`\`

### Real-Time Data Flow Architecture

\`\`\`
┌─────────────────────────────────────────────────────────────────────────────┐
│                     REAL-TIME PRICE STREAMING ARCHITECTURE                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   ┌─────────────────┐                                                        │
│   │  BINANCE API    │                                                        │
│   │  WebSocket      │────┐                                                   │
│   │  wss://stream.  │    │                                                   │
│   │  binance.com    │    │                                                   │
│   └─────────────────┘    │                                                   │
│                          │                                                   │
│                          ▼                                                   │
│   ┌─────────────────────────────────────────┐                               │
│   │      useLivePrices.ts (Custom Hook)     │                               │
│   ├─────────────────────────────────────────┤                               │
│   │                                         │                               │
│   │  WebSocket Manager                      │                               │
│   │  ├── Connection establishment           │                               │
│   │  ├── subscribeToTicker(symbol)        │                               │
│   │  ├── onMessage: price update            │                               │
│   │  ├── onError: trigger reconnect       │                               │
│   │  └── onClose: exponential backoff     │                               │
│   │                                         │                               │
│   │  Reconnection Strategy:                 │                               │
│   │  • Retry 1: 1s delay                    │                               │
│   │  • Retry 2: 2s delay                    │                               │
│   │  • Retry 3: 4s delay                    │                               │
│   │  • Retry 4+: 8s max delay               │                               │
│   │                                         │                               │
│   │  Fallback: REST polling on failure      │                               │
│   │                                         │                               │
│   └──────────────────┬──────────────────────┘                               │
│                      │                                                       │
│                      ▼                                                       │
│   ┌─────────────────────────────────────────┐                               │
│   │      useAnimatedPrice.ts (Custom Hook)  │                               │
│   ├─────────────────────────────────────────┤                               │
│   │                                         │                               │
│   │  Price Change Detection                 │                               │
│   │  ├── prevPrice vs currentPrice          │                               │
│   │  ├── calculate percentage change        │                               │
│   │  ├── trigger animation state            │                               │
│   │  └── CSS transition (green/red flash)  │                               │
│   │                                         │                               │
│   │  Visual Feedback:                       │                               │
│   │  • +2.5% → Green flash animation        │                               │
│   │  • -1.8% → Red flash animation          │                               │
│   │  • Duration: 300ms ease-out             │                               │
│   │                                         │                               │
│   └──────────────────┬──────────────────────┘                               │
│                      │                                                       │
│                      ▼                                                       │
│   ┌─────────────────────────────────────────┐                               │
│   │           priceStore (Zustand)          │                               │
│   ├─────────────────────────────────────────┤                               │
│   │                                         │                               │
│   │  State: {                               │                               │
│   │    prices: Map<symbol, PriceData>,    │                               │
│   │    lastUpdate: timestamp,               │                               │
│   │    connectionStatus: 'connected'        │                               │
│   │  }                                      │                               │
│   │                                         │                               │
│   │  Persist: localStorage                  │                               │
│   │                                         │                               │
│   └─────────────────────────────────────────┘                               │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
\`\`\`

### Multi-Source Data Aggregation

\`\`\`
┌─────────────────────────────────────────────────────────────────────────────┐
│                    DATA SOURCE INTEGRATION LAYER                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   SOURCE              │   DATA TYPE          │   UPDATE FREQ   │   FALLBACK  │
│   ────────────────────┼──────────────────────┼─────────────────┼────────────│
│   Binance WebSocket   │   Live prices        │   Real-time     │   REST API  │
│   CoinGecko API       │   Market cap         │   60s polling   │   Cache     │
│   altFINS API         │   Trading patterns   │   5min polling  │   N/A       │
│   Binance REST        │   Order book         │   On demand     │   N/A       │
│   Mobula API          │   Aggregated data    │   60s polling   │   CoinGecko │
│   CryptoCompare       │   Historical         │   On demand     │   N/A       │
│                                                                             │
│   CACHE STRATEGY (SWR + TanStack Query)                                     │
│   ├── Stale-while-revalidate pattern                                        │
│   ├── 60s cache TTL for market data                                         │
│   ├── Background refetch on focus                                           │
│   └── Optimistic updates for user actions                                   │
│                                                                             │
│   RESILIENCE PATTERNS                                                       │
│   ├── Circuit Breaker: Open after 5 failures                               │
│   ├── Rate Limiting: Token bucket (10 req/s)                              │
│   ├── Retry Logic: 3 attempts with exponential backoff                     │
│   └── Fallback: Degrade gracefully to cached data                          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
\`\`\`

### Authentication & Access Control

\`\`\`
┌─────────────────────────────────────────────────────────────────────────────┐
│                    FREEMIUM ACCESS CONTROL ARCHITECTURE                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   SIGNUP FLOW                                                               │
│   User creates account ──► Supabase Auth ──► DB Trigger ──► Auto-profile   │
│                                                                             │
│   PROFILES TABLE (RLS)                                                      │
│   ┌─────────────────────────────────────────────────────────────────────┐    │
│   │  id (uuid, PK)    │  email  │  is_pro  │  pro_since  │  plan     │    │
│   ├─────────────────────────────────────────────────────────────────────┤    │
│   │  user_123         │  a@b.c  │  false   │  null       │  free     │    │
│   │  user_456         │  x@y.z  │  true    │  2024-01    │  yearly   │    │
│   └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│   PRO ACCESS CHECK (lib/pro-access.ts)                                      │
│   ┌─────────────────┐                                                       │
│   │  useProAccess() │◄────── Called by AI Analysis Panel                    │
│   ├─────────────────┤                                                       │
│   │                 │                                                       │
│   │  1. Check local │                                                       │
│   │     cache first │                                                       │
│   │                 │                                                       │
│   │  2. Fetch from  │                                                       │
│   │     Supabase    │                                                       │
│   │                 │                                                       │
│   │  3. Real-time   │                                                       │
│   │     subscription│                                                       │
│   │                 │                                                       │
│   │  Return: {      │                                                       │
│   │    isPro,       │                                                       │
│   │    canAccessAI, │                                                       │
│   │    showUpgrade  │                                                       │
│   │  }              │                                                       │
│   └─────────────────┘                                                       │
│                                                                             │
│   GATED FEATURE: AI Analysis                                              │
│   ┌─────────────────────────────────────────────────────────────────────┐  │
│   │  User clicks "Analyze"                                               │  │
│   │       │                                                            │  │
│   │       ▼                                                            │  │
│   │  ┌──────────────┐     No      ┌──────────────┐                      │  │
│   │  │ isPro = true?│────────────►│ Upgrade CTA  │                      │  │
│   │  └──────────────┘             │ Component    │                      │  │
│   │       │ Yes                     └──────────────┘                      │  │
│   │       ▼                                                            │  │
│   │  ┌──────────────┐                                                  │  │
│   │  │ Call Gemini │                                                  │  │
│   │  │ 3.1 Flash   │                                                  │  │
│   │  └──────────────┘                                                  │  │
│   │       │                                                            │  │
│   │       ▼                                                            │  │
│   │  Display AI Insights                                                 │  │
│   └─────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
\`\`\`

**AI Models Used:**
- gemini-3.1-flash: Market analysis, insights, pattern detection
- gemini-3.1-flash-lite-preview: Cost-efficient parsing

**Freemium Business Model:**
- **Free Tier**: Dashboard access, real-time prices, charts, limited watchlist (5 coins)
- **Pro Tier** ($9.99/mo or $79.99/yr): AI Analysis panel, unlimited watchlist, advanced patterns
- **Pro Gate**: AI Analysis locked behind subscription with upgrade prompts

**Authentication & Access Control:**
- Supabase Auth with profiles table and RLS policies
- Auto-profile creation via database trigger on signup
- Client-side Pro access hook with real-time subscription status
`,
    stack: ["TypeScript", "Next.js", "React", "Supabase", "Vercel", "Gemini API", "CoinGecko API", "TradingView", "altFINS API", "Binance API", "Zustand", "TanStack Query", "Heroui"],
    highlights: [
      "Real-time Binance WebSocket with exponential backoff, auto-reconnect, and visual price change indicators.",
      "Freemium model with Pro tier gating: Free (dashboard + limited watchlist) vs Pro ($9.99/mo - AI Analysis + unlimited).",
      "Multi-source data aggregation: CoinGecko, Binance (WebSocket + REST), altFINS APIs with TanStack Query polling.",
      "Supabase Auth with profiles table, RLS policies, and auto-profile creation via database triggers.",
      "AI-powered market analysis with Gemini 3.1 Flash (Pro-gated feature).",
      "TradingView advanced charting integration with custom overlays."
    ],
    links: {
      demo: "https://kryptodash.vercel.app/"
    },
    imageUrl: "/cryptoedge-cover.jpg",
    status: "Beta",
    featured: false,
    demoCredentials: {
      email: "demo@test.com",
      password: "password123"
    },
    productionFeatures: [
      "Real-time Binance WebSocket with auto-reconnect and fallback polling",
      "Multi-source market data APIs (CoinGecko, Binance, altFINS)",
      "Freemium model with Pro tier access control",
      "Supabase Auth & RLS with profiles/watchlists tables",
      "AI Analysis gated behind subscription",
      "TradingView advanced charting integration"
    ]
  },
  {
    slug: "pxlmorph",
    name: "PxlMorph",
    tagline: "AI Image Style Transfer & Editor",
    description: "A React application for transforming images into more than 50 artistic styles using OpenAI's GPT-4o Image 1.5 API.",
    content: `## Overview

PxlMorph is an AI-powered image transformation application that allows users to apply over 50 artistic styles to their photos. Built with Next.js and TypeScript, it leverages OpenAI's GPT-4o Image 1.5 API to seamlessly blend user photos with predefined artistic prompts.

**Freemium Business Model:**
- **Free Tier**: 2 welcome credits + 1 credit/month (no accumulation)
- **Starter** ($5.99/mo): 50 edits/month for everyday creativity
- **Pro** ($9.99/mo): 100 edits/month for power users

**Stripe Billing Architecture:**
- Checkout Session creation from backend (never client-side)
- Customer Portal for subscription management
- Idempotent webhook handler with event deduplication
- Credits ledger separate from billing for clean separation

---

## Available Styles

PxlMorph supports 50+ artistic styles across multiple categories. Each style includes optimized prompts and example images to ensure high-quality results.

- **Anime & Cartoon**: Studio Ghibli, Pixar 3D, The Simpsons, South Park, Pokémon, Lo-fi Anime, Clay, Tim Burton
- **Artistic Styles**: Oil Painting, Watercolor, Sketch, Comic Book, Pop Art, Art Nouveau, Renaissance, Impressionist
- **Digital Art**: Cyberpunk, Vaporwave, Synthwave, Glitch Art, Pixel Art, Isometric, 3D Render, Digital Painting
- **Photography**: Portrait, Landscape, Street Photography, Documentary, Film Noir, Polaroid, Vintage, Cinematic
- **And More...**: Architecture, Fashion, Nature, Abstract, Typography

---

## Style-Based Transformation

- Choose from 50+ predefined styles.
- Upload an inspiration image.
- The OpenAI GPT-4o Image 1.5 API transforms it while preserving important details.
- Optimized for consistent, high-quality results.
- **Example Use Case**: *"Turn my vacation photo into a Studio Ghibli scene"*

---

## Full System Architecture

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
│  │  ├── React 19 + TypeScript                                          │  │
│  │  ├── Tailwind CSS + shadcn/ui                                       │  │
│  │  ├── Framer Motion (Animations)                                     │  │
│  │  ├── react-easy-crop (Image cropping)                               │  │
│  │  └── lucide-react (Icons)                                           │  │
│  │                                                                     │  │
│  │  PAGES (App Router)                                                 │  │
│  │  ├── /studio            # Main image editor                         │  │
│  │  ├── /gallery         # User image history                        │  │
│  │  ├── /pricing         # Subscription plans                        │  │
│  │  ├── /profile         # User settings                             │  │
│  │  └── /community       # Public gallery                            │  │
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

**AI Models Used:**
- gpt-image-1.5: Style transfer & image transformation

**Credit System Implementation:**
- Separate credits_ledger table from billing data
- Stripe event idempotency with stripe_events table
- Real-time credit sync with optimistic UI updates
- Soft paywall: gentle warning at 1 credit, hard paywall at 0

**Image Processing Pipeline:**
- **Sharp**: Server-side image optimization and format conversion
- **react-easy-crop**: Client-side image cropping UI
- **Presigned URLs**: Cloudflare R2 secure direct uploads via \`r2-tokens.ts\`
- **File Validation**: Security checks via \`file-validation.ts\` (size, type, dimensions)
- **Gallery Service**: Image history and metadata management

**Rate Limiting & Security:**
- **API Rate Limiting**: Token bucket via \`rate-limit.ts\`
- **Quota Management**: Credit tracking via \`quota.ts\`
- **Logger**: Structured logging via \`logger.ts\`
`,
    stack: ["TypeScript", "Next.js", "React", "Supabase", "Cloudflare R2", "Cloudflare Workers", "Vercel", "OpenAI API", "Stripe", "Tailwind CSS", "Zustand"],
    highlights: [
      "50+ curated artistic styles with optimized prompts and example images.",
      "Stripe subscription billing with Checkout Sessions, Customer Portal, and idempotent webhooks.",
      "Credit ledger system separate from billing with stripe_events table for idempotency.",
      "GPT-4o Image 1.5 for high-fidelity style transfer with detail preservation.",
      "Cloudflare Workers for edge-based image processing and presigned URL generation.",
      "Soft paywall UX: gentle warning at 1 credit, hard paywall at 0 with upgrade CTA."
    ],
    links: {
      demo: "https://pxlmorph.vercel.app"
    },
    imageUrl: "/pxlmorph-cover.jpg",
    status: "Beta",
    featured: true,
    demoCredentials: {
      email: "demo@test.com",
      password: "password123"
    },
    productionFeatures: [
      "GPT-4o Image 1.5 style transfer (50+ curated styles)",
      "Stripe billing with Checkout Sessions and Customer Portal",
      "Credits ledger system with idempotent webhook handling",
      "Cloudflare R2 + Workers for edge image processing",
      "Supabase Auth & RLS with image history management",
      "Freemium model: Free (2+1), Starter ($5.99/mo), Pro ($9.99/mo)"
    ]
  }
];
