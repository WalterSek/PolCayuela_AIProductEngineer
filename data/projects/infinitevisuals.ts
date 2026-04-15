import { Project } from "@/data/types/project";

export const infinitevisuals: Project = {
  slug: "infinitevisuals",
  name: "InfiniteVisuals",
  tagline: "AI Brand Content Engine",
  description: "Multi-agent AI system that automates brand content creation from product analysis to final assets. Orchestrates 5 specialized agents using Google ADK to generate product photography, lifestyle scenes, and campaign creatives. Eliminates photoshoots with intelligent image generation workflows for e-commerce and marketing teams.",
  content: `## Overview

InfiniteVisuals is an AI-powered visual content generation platform for e-commerce and marketing teams. It enables users to create professional product photography, lifestyle scenes, and advertising creatives using AI, eliminating the need for traditional photoshoots.

Built with **Next.js 16** and **Google ADK**, it orchestrates multiple AI agents to automate campaign generation from product analysis to creative concepts.

---

## AI Product Engineering Highlights

- **Multi-Agent AI Orchestration** — Architected 5-agent system using Google ADK with ParallelAgent, LoopAgent, and SequentialAgent patterns for automated campaign generation
- **Native Structured Outputs Pipeline** — Implemented Zod schema validation with type-safe AI responses across all agent workflows, eliminating parsing failures
- **Multi-Model Gemini Orchestration** — Integrated 6 Gemini models (2.5/3.0/3.1 Flash/Pro) for image generation, analysis, and agent reasoning with model-specific optimization
- **Production Agent Patterns** — Built iterative QC with StopIfApproved, automatic state cleanup, and SSE streaming for real-time multi-phase generation status

---

## Architecture Summary

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Frontend** | Next.js 16 + React + TypeScript | Server Components, streaming UI, drag-and-drop gallery |
| **AI Agents** | Google ADK (@google/adk v0.5.0) | CampaignOrchestrator, ProductAnalyzer, TrendsResearcher, CreativeBrief, QCValidator |
| **Image Generation** | Gemini 2.5/3.0/3.1 Flash/Pro Image | Multi-model orchestration for quality/speed tradeoffs |
| **Database** | Supabase (Postgres + RLS) | Brand kits, credits, gallery, subscriptions |
| **State Management** | Zustand + TanStack Query | Credit tracking, brand assets, gallery management |
| **Storage** | Cloudflare R2 + Workers | Scalable image storage with presigned URLs |
| **Payments** | Stripe + Customer Portal | Freemium subscription management |

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

## Project Structure & Database

### Project Structure

\`\`\`
C:\\CODING\\TheVisualEngine\\
├── app/                     # Next.js App Router
│   ├── (studio)/           # Main image editor
│   ├── (gallery)/          # Asset gallery
│   ├── (pricing)/          # Subscription plans
│   └── api/                # API routes
│       ├── agents/         # Google ADK agent workflows
│       ├── generate/       # Image generation
│       └── stripe/         # Payment webhooks
├── components/             # React components
├── services/               # Business logic
│   ├── agents/            # ADK agents
│   ├── gemini/            # Image generation services
│   └── stripe/            # Billing
├── lib/                    # Utilities
├── store/                  # Zustand state
├── types/                  # TypeScript types
└── workers/               # Cloudflare Workers
\`\`\`

### Database Schema

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

---

## Deep Dive: System Architecture

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
│  ├── React 18 Components                                            │  │
│  ├── Tailwind CSS + shadcn/ui                                       │  │
│  ├── Framer Motion (Animations)                                     │  │
│  ├── dnd-kit (Drag & Drop)                                          │  │
│  ├── embla-carousel (Galleries)                                     │  │
│  └── react-compare-slider (Before/After)                            │  │
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

---

## Key Technical Implementation Details

**AI Models Used:**
- gemini-2.5-flash-image: Default image generation (fast, high quality)
- gemini-3-pro-image-preview: High-fidelity generation (up to 4K resolution)
- gemini-3.1-flash-image-preview: Nano Banana 2 - high-volume generation
- gemini-flash-lite-latest: Product analysis, brand detection
- gemini-3.1-pro-preview: Agent workflows (CreativeBrief, QC, Trends)
- gemini-2.5-flash: Prompt enhancement

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

**Development & Testing:**
- Jest unit tests for services and utilities
- Playwright E2E tests for critical user flows
- Comprehensive Stripe webhook testing suite with idempotency
- Type safety via generated Supabase types
`,
  stack: ["TypeScript", "Next.js", "React", "Supabase Auth + DB", "Cloudflare R2", "Vercel", "Gemini API", "Google ADK", "Stripe", "Zustand", "TanStack Query", "Zod", "Jest", "Playwright", "Tailwind CSS", "Framer Motion"],
  highlights: [
    "Google ADK multi-agent orchestration: 5 specialized agents with ParallelAgent, LoopAgent, and SequentialAgent patterns.",
    "Native structured outputs: Zod schema validation for type-safe AI responses across all agent workflows.",
    "Multi-model Gemini orchestration: 6 models (2.5/3.0/3.1 Flash/Pro) optimized for quality/speed tradeoffs.",
    "Production agent patterns: Iterative QC with StopIfApproved, automatic state cleanup, SSE streaming."
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
};
