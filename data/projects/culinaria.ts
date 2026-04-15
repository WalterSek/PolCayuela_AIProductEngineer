import { Project } from "@/data/types/project";

export const culinaria: Project = {
  slug: "culinaria",
  name: "Culinaria",
  tagline: "AI-Powered Cooking Companion",
  description: "A mobile app that bridges the gap between discovering a recipe and actually cooking it. Built with React Native and Google Gemini's multimodal ecosystem, it extracts recipes from URLs or images, manages your pantry, and offers a hands-free voice assistant.",
  content: `## Overview

Culinaria is an AI-powered cooking companion that bridges the gap between discovering a recipe and actually cooking it. Built with **React Native** and **Google Gemini's multimodal ecosystem**, it extracts recipes from URLs or images, manages your pantry, and offers a hands-free voice assistant.

**Monorepo Architecture:** npm workspaces with shared Zod contracts package for type-safe API communication between mobile and backend.

---

## AI Product Engineering Highlights

- **13 Custom AI Agent Tools** — Built server-side function calling system enabling real-time voice interactions for pantry management, recipe search, image analysis, and nutritional queries via LiveKit + Gemini 2.5 Flash Native Audio
- **Multimodal Recipe Extraction** — Architected Gemini Vision pipeline processing cookbooks, magazines, screenshots, and URLs with structured output validation via Zod schemas
- **Production Voice AI Infrastructure** — Deployed LiveKit Agents worker with WebRTC rooms, handling bidirectional audio streaming and tool orchestration at scale
- **End-to-End AI Product Stack** — Full-stack implementation from mobile UX (Expo Router) to backend AI services (Node.js/Express) to cloud deployment (Cloud Run + Docker)

---

## Architecture Summary

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Mobile** | React Native 0.83.2 + Expo SDK 55 | iOS/Android app with file-based routing via Expo Router |
| **Backend** | Node.js 22+ + Express 5 | REST API for AI operations, storage, user management |
| **AI/Voice** | LiveKit Agents + Gemini API | Real-time voice chef assistant with 13 custom tools |
| **Database** | Supabase (Postgres + RLS) | User data, recipes, pantry, usage tracking |
| **Storage** | Cloudflare R2 | Image storage via Cloudflare Worker |
| **Payments** | RevenueCat | In-app subscription management (Free/Starter/Pro/Ultimate) |
| **Deployment** | Cloud Run + Docker | Auto-scaling container deployment |

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

## Project Structure & Database

### Project Structure

\`\`\`
c:\\CODING\\CookShelf\\
├── mobile/                    # Expo/React Native app
│   ├── app/                   # Expo Router (file-based routing)
│   │   ├── (auth)/           # Auth group routes
│   │   ├── (tabs)/           # Main tabs: scan, recipes, kitchen, chef, profile
│   │   └── _layout.tsx       # Root layout with auth state
│   └── src/
│       ├── components/       # 80+ UI components
│       ├── hooks/            # TanStack Query hooks + custom hooks
│       ├── store/            # Zustand state management (slices pattern)
│       └── services/         # API clients
├── backend/                   # Node.js Express API
│   ├── src/
│   │   ├── routes/           # API endpoints (ai, storage, user, voice, webhooks)
│   │   ├── services/         # Business logic + LiveKit agent actions
│   │   ├── agent-main.ts     # LiveKit AI agent entry point (68KB)
│   │   └── middleware/       # Auth, validation, usage limits
│   └── scripts/              # Deployment scripts
├── packages/contracts/       # Shared Zod schemas & TypeScript types
├── worker/                   # Cloudflare R2 Worker for image handling
├── supabase/migrations/      # 60+ SQL migrations
└── docs/plans/               # Architecture decision records
\`\`\`

### Database Schema (Supabase PostgreSQL with RLS)

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

---

## Deep Dive: System Architecture

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
│  │  • 80+ screens   │                                                       │
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
│  ├── subscription.routes.ts # RevenueCat webhooks                   │
│  └── webhook.routes.ts      # External service callbacks                   │
│                                                                             │
│  SERVICE LAYER (src/services/)                                              │
│  ├── ai.base.service.ts        # Gemini API orchestration                  │
│  ├── recipe.ai.service.ts      # Recipe extraction logic                   │
│  ├── chef-agent-actions.ts     # 13 Chef Tools implementation              │
│ │                             • getRecipes                                │
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

---

## Key Technical Implementation Details

**AI/Voice Services:**
- 13 custom Chef Tools in \`chef-agent-actions.service.ts\` for voice interactions
- LiveKit agent with @livekit/agents-plugin-google for Gemini 2.5 Flash Native Audio
- Separate agent-main.ts worker process for voice conversations
- Webhook handlers for RevenueCat subscription events

**Security & Middleware:**
- Helmet.js for security headers, CORS, Compression middleware
- Express-rate-limit for API protection
- JWT verification via \`jose\` library
- Environment variable separation (mobile: EXPO_PUBLIC_*, backend: standard)

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
- Supabase Auth triggers for automatic profile creation
`,
  stack: ["TypeScript", "React Native", "Expo", "Node.js", "Express", "Supabase Auth + DB", "Cloudflare R2", "Gemini API", "Gemini Live API", "LiveKit", "Cloud Run", "Docker", "RevenueCat", "TanStack Query", "Zustand", "Zod", "Vitest", "Jest"],
  highlights: [
    "Production voice AI: LiveKit Agents with Gemini 2.5 Flash Native Audio and 13 custom server-side tools for real-time cooking assistance.",
    "Multimodal AI pipeline: Gemini Vision extracting recipes from images, URLs, and natural language with Zod-structured outputs.",
    "Mobile subscription billing: RevenueCat integration with Free/Starter/Pro/Ultimate tier management.",
    "Comprehensive testing strategy: Vitest (backend), Jest (mobile), esbuild bundling for production deployment."
  ],
  links: {
    playStore: "https://play.google.com/apps/testing/com.kayuken.culinaria",
    testerGroup: "https://groups.google.com/g/culinaria-testers"
  },
  imageUrl: "/culinaria-cover.jpg",
  status: "Launch Soon",
  featured: true,
  screenshots: [
    { src: "/CulinariaScreenshots/image1.png", alt: "Culinaria screenshot 1" },
    { src: "/CulinariaScreenshots/image2.png", alt: "Culinaria screenshot 2" },
    { src: "/CulinariaScreenshots/image3.png", alt: "Culinaria screenshot 3" },
    { src: "/CulinariaScreenshots/image4.png", alt: "Culinaria screenshot 4" },
    { src: "/CulinariaScreenshots/image5.png", alt: "Culinaria screenshot 5" },
  ],
};
