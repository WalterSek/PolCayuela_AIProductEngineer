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

## Architecture

\`\`\`
[React Native App (Expo 55)]
        |
        |-- REST API --> [Node.js/Express Backend (Google Cloud Run)]
        |                    |
        |                    |-- Gemini 3 Flash (OCR, Recipe Extraction)
        |                    |-- Gemini 3.1 Flash/Imagen (Image Generation)
        |                    |-- 13 Chef Tools (Server-side execution)
        |
        |-- WebRTC --> [LiveKit Cloud (Voice Agent)]
        |                    |
        |                    |-- Gemini 2.5 Flash Native Audio (Real-time Voice)
        |
        |-- Storage --> [Cloudflare R2 Worker]
        |
        |-- Auth + Data --> [Supabase PostgreSQL (RLS)]
        |
        |-- Subscriptions --> [RevenueCat]
\`\`\`

**Key Integrations:**
- Gemini 3 Flash for recipe extraction from any URL or image
- Gemini 3.1 Imagen for AI-generated step-by-step images
- LiveKit Agents + Gemini 2.5 Flash Native Audio for real-time voice assistant
- RevenueCat for subscription management (Free, Starter, Pro, Ultimate tiers)
- Supabase with Row Level Security for all user data`,
    stack: ["TypeScript", "React Native", "Expo", "Node.js", "Express", "Supabase", "Cloudflare R2", "Gemini API", "Gemini Live API", "LiveKit", "Cloud Run", "RevenueCat", "Google Play Store"],
    highlights: [
      "Extracts recipes instantly from any URL, cookbook scan, or social media post using Gemini Vision.",
      "Smart pantry and grocery list manager with AI ingredient parsing and automatic merging.",
      "Real-time voice assistant powered by Gemini Live Audio with 13 custom server-side tool calls.",
      "Fully architected backend on Cloud Run with Supabase RLS and RevenueCat subscription tiers."
    ],
    links: {
      playStore: "https://play.google.com/apps/testing/com.kayuken.culinaria",
      testerGroup: "https://groups.google.com/g/culinaria-testers"
    },
    imageUrl: "/culinaria-cover.jpg",
    status: "Launch Soon",
    featured: true,
    productionFeatures: [
      "Live Gemini multimodal voice integration",
      "Google Play Billing & RevenueCat subscriptions",
      "Supabase Auth & real-time database syncing",
      "Google Cloud Run backend"
    ]
  },
  {
    slug: "infinitevisuals",
    name: "InfiniteVisuals",
    tagline: "AI Brand Content Engine",
    description: "An AI-powered brand content engine designed to generate consistent, high-quality visual assets for brands. Full details coming soon.",
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

## Architecture

\`\`\`
[Next.js 16 App (Vercel)]
        |
        |-- AI Generation
        |    |-- gemini-2.5-flash-image (Default/Fast)
        |    |-- gemini-3-pro-image-preview (High Fidelity, up to 4K)
        |    |-- gemini-3.1-flash-image-preview (Nano Banana 2)
        |    |-- gemini-flash-lite-latest (Analysis)
        |    |-- gemini-3.1-flash (Agent workflows)
        |    |-- gemini-2.5-flash (Prompt enhancement)
        |
        |-- Image Processing --> [Cloudflare R2]
        |
        |-- Auth + Database --> [Supabase PostgreSQL (RLS)]
        |
        |-- Payments --> [Stripe]
        |
        |-- State Management --> [Zustand]
\`\`\`

**AI Models Used:**
- gemini-2.5-flash-image: Default image generation (fast, high quality)
- gemini-3-pro-image-preview: High-fidelity generation (up to 4K resolution)
- gemini-3.1-flash-image-preview: Nano Banana 2 - high-volume generation
- gemini-flash-lite-latest: Product analysis, brand detection
- gemini-3.1-flash-preview: Agent workflows (CreativeBrief, QC, Trends)
- gemini-2.5-flash: Prompt enhancement

**Key Services:**
- CreditService: Hybrid local + remote credit management
- GeminiService: AI image generation and analysis
- GalleryService: Asset database operations
- BrandKitService: Brand configuration management
- StripeService: Payment processing and webhooks
- AuthSingleton: Simplified auth service (single source of truth)`,
    stack: ["TypeScript", "Next.js 16", "React 18", "Supabase", "Cloudflare R2", "Vercel", "Gemini API", "Stripe", "Zustand"],
    highlights: [
      "AI-powered image generation with 6 Gemini models (2.5/3.0/3.1 Flash/Pro)",
      "Smart Suite: Edit, Reframe, Variations, Batch via Gemini AI agents",
      "Brand consistency engine with Brand Kit management",
      "Auto-Catalog: Batch process up to 25 products with AI",
      "Agentic workflows: ProductAnalyzer, TrendsResearcher, CreativeBrief, QCValidator"
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
      "Fully functional Stripe payment integration",
      "Cloudflare R2 scalable image storage",
      "Secure user authentication and asset management"
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

## Architecture

\`\`\`
[Next.js 16 App (Vercel)]
        |
        |-- Data Sources
        |    |-- Binance WebSocket (Real-time prices)
        |    |-- CoinGecko API (Price data)
        |    |-- altFINS API (Pattern signals)
        |    |-- Binance REST API (Market data)
        |
        |-- State Management --> [Zustand]
        |    |-- cryptoData: AltFins patterns
        |    |-- marketsData: Price data
        |    |-- priceStore: Live prices
        |
        |-- Database --> [Supabase PostgreSQL]
        |
        |-- AI Analysis --> [Gemini 3.1 Flash]
\`\`\`

**AI Models Used:**
- gemini-3.1-flash: Market analysis, insights, pattern detection
- gemini-3.1-flash-lite-preview: Cost-efficient parsing

**Technical Details:**
- Zustand for lightweight state management
- TanStack Query for API polling (60s interval)
- Next.js 16 'use cache' directive for caching
- WebSocket with reconnection logic and exponential backoff
- Fallback to polling if WebSocket disconnects`,
    stack: ["TypeScript", "Next.js 16", "React 19", "Supabase", "Vercel", "Gemini API", "CoinGecko API", "TradingView", "altFINS API", "Binance API", "Zustand", "Heroui"],
    highlights: [
      "Real-time Binance WebSocket price updates with visual indicators",
      "AI-powered market analysis with Gemini 3.1 Flash",
      "Multi-source data: CoinGecko, Binance, altFINS APIs",
      "TradingView advanced charting integration"
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
      "Real-time market data APIs (CoinGecko, Binance, altFINS)",
      "TradingView advanced charting integration",
      "Secure user authentication and portfolio tracking"
    ]
  },
  {
    slug: "pxlmorph",
    name: "PxlMorph",
    tagline: "AI Image Style Transfer & Editor",
    description: "A React application for transforming images into more than 50 artistic styles using OpenAI's GPT-4o Image 1.5 API.",
    content: `## Overview

PxlMorph is an AI-powered image transformation application that allows users to apply over 50 artistic styles to their photos. Built with Next.js and TypeScript, it leverages OpenAI's GPT-4o Image 1.5 API to seamlessly blend user photos with predefined artistic prompts.

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

## Architecture

\`\`\`
[Next.js 16 App (Vercel)]
        |
        |-- Image Processing
        |    |-- /api/generate-image (GPT-4o Image 1.5)
        |
        |-- Storage --> [Cloudflare R2]
        |
        |-- Auth + Database --> [Supabase PostgreSQL]
\`\`\`

**AI Models Used:**
- gpt-image-1.5: Style transfer & image transformation

**Tech Stack:** Next.js 16, TypeScript, Supabase, Cloudflare R2, OpenAI GPT-4o Image (Image 1.5)
`,
    stack: ["TypeScript", "Next.js 16", "React 19", "Supabase", "Cloudflare R2", "Vercel", "OpenAI API", "Tailwind CSS 3", "Zustand"],
    highlights: [
      "50+ curated artistic styles with optimized prompts",
      "GPT-4o Image 1.5 for high-fidelity style transfer",
      "Cloudflare R2 storage with worker-based image processing"
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
      "GPT-4o Image 1.5 style transfer (50+ styles)",
      "Cloudflare R2 image storage with worker processing",
      "Supabase Auth & image history management"
    ]
  }
];
