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
    content: `## Problem Statement

Cooking content creators and enthusiasts face daily friction: they discover recipes through YouTube, Instagram, and blogs but have no structured way to save, organize, and cook them. When cooking time arrives, they're juggling a phone with flour-covered hands, scrolling back through videos to find specific steps.

**Existing tools don't solve this:**
- Pinterest/bookmarks: Save links but offer no cooking experience
- Generic recipe apps: Can't import from video descriptions or social posts
- Notes apps: Unstructured, not searchable, no hands-free mode

CulinarIA bridges the gap between discovering a recipe and actually cooking it.

---

## Solution Overview

CulinarIA is your AI-powered cooking companion built with **Google Gemini's multimodal ecosystem** and **React Native**.

| Audience Problem | CulinarIA Solution |
|---|---|
| Can't save recipes from creator URLs | Paste any URL — Gemini extracts the recipe instantly |
| Physical cookbooks can't be searched | Scan any page with camera — Gemini Vision structures it |
| Hands are busy while cooking | Voice assistant powered by Gemini 2.5 Flash Native Audio |
| No visual reference for unfamiliar dishes | AI generates step-by-step images with Gemini Imagen |
| Forget ingredients at the store | Smart pantry + auto-generated shopping lists |

---

## Core Features (5 Tabs in Bottom Navigation)

### 1️⃣ Extract Tab (Scanner)
- **Scan Mode**: Take photo or upload from gallery - Gemini Vision extracts recipe from cookbooks, magazines, screenshots
- **Link Mode**: Paste URL from any recipe blog, YouTube video description, TikTok, Instagram
- **Search Mode**: Search billions of recipes by dish name, with local cookbook integration
- **Trending searches**: Quick access to popular recipes (Avocado Toast, Chicken Tikka Masala, etc.)

### 2️⃣ Recipes Tab (Recipe Library)
- **My Cookbook**: Searchable recipe library (51+ recipes in database)
- **Match sorting**: Sort recipes by pantry ingredient match percentage
- **Ingredient matching**: Shows how many ingredients you already have
- **Recipe details**: Full ingredients, step-by-step instructions, nutrition info, AI-generated step images

### 3️⃣ Kitchen Tab (Kitchen Manager)
- **Pantry Mode**: Track ingredients at home organized by aisle (Meat & Seafood, Dairy & Eggs, Produce, etc.)
- **Shop Mode**: Smart grocery list grouped by category
- **Quick Add Essentials**: One-tap staples (eggs, milk, butter, flour, salt, sugar, oil, etc.)
- **AI Ingredient Parsing**: Natural language input ("2 cups flour, 3 eggs") parsed into structured data
- **Smart Merging**: Combines duplicate ingredients from multiple recipes automatically
- **Move to Pantry**: After shopping, check off items and transfer to inventory

### 4️⃣ Chef Tab (Chef Discovery)
- **AI Recipe Suggestions**: Get recipe ideas based on your current pantry inventory
- **Cuisine Filters**: Italian, Mexican, Asian, American, Indian, Mediterranean, etc.
- **Meal Type Filters**: Breakfast, Lunch, Dinner, Snacks, Desserts
- **Pantry Badge**: Shows your current inventory count
- **Smart Matching**: AI suggests recipes you can make with ingredients you already have

### 5️⃣ Profile Tab
- **Subscription Management**: Free, Starter, Pro, Ultimate tiers
- **Usage Tracking**: Searches, scans, voice minutes, AI images, suggestions, nutrition analyses
- **Billing History**: View past purchases
- **Settings**: App preferences
- **Feedback**: Submit feedback to developers

---

## Monetization (RevenueCat)

**Subscription Tiers (configured in RevenueCat):**

| Tier | Key Features |
|------|-------------|
| **Free** | Limited feature access |
| **Starter** | 50 Recipe Storage, Unlimited Scans, Smart Pantry |
| **Pro** | Unlimited Recipes, Nutritional Analysis, Web Search Integration |
| **Ultimate** | All Pro Features, 480 Min Smart Chef (Voice), Priority Support |

- RevenueCat SDK integrated via \`react-native-purchases\` (v9.7.6)
- Full webhook lifecycle handling (200+ events tracked in database)
- Usage tracking per billing period
- Monthly subscription model with trial support

---

## Technical Architecture

\`\`\`
[React Native App (Expo 54)]
       |
       |-- REST API --> [Node.js/Express Backend (Google Cloud Run)]
       |                    |
       |                    |-- AI Services
       |                    |    |-- Gemini 3 Flash (OCR, Text, Recipe Extraction)
       |                    |    |-- Gemini 2.5 Flash/Imagen (Image Generation)
       |                    |    |-- Gemini Live (Real-time Voice with Tool Calling)
       |                    |
       |                    |-- Tool Calling System (13 Chef Tools)
       |                    |    |-- getCurrentContext, listRecipes, checkLibraryForRecipe
       |                    |    |-- getRecipeDetails, searchRecipes, navigate
       |                    |    |-- updateShoppingList, completeShopping, updatePantry
       |                    |    |-- setTimer, setCookingMode, manageCookingStep
       |                    |    |-- generateVisuals
       |                    |
       |                    |-- Tool Registry (Server-side execution)
       |
       |-- WebSocket --> [Gemini Live Audio API]
       |                    |
       |                    |-- Tool Calls executed on backend via Tool Registry
       |                    |-- Results sent back to Gemini -> Audio response
       |
       |-- Direct Upload/Download --> [Cloudflare R2 (via Worker)]
       |
       |-- Auth + Data --> [Supabase PostgreSQL (RLS)]
       |
       |-- Subscriptions --> [RevenueCat]
\`\`\`

**Mobile Layer (React Native + Expo 54)**
- 5-tab bottom navigation: Extract, Recipes, Kitchen, Chef, Profile
- Zustand for state management
- React Query for data fetching
- RevenueCat SDK for subscriptions
- React Native Reanimated for smooth animations
- FlashList for high-performance lists

**Backend Layer (Node.js/Express)**
- REST endpoints for recipe CRUD, scan processing, URL imports, image generation
- WebSocket server for Gemini Live Audio real-time voice
- Deployed on Google Cloud Run

**Database (Supabase PostgreSQL)**
- Tables: recipes, user_items, user_profiles, revenuecat_events, user_usage, subscription_tiers, feedback
- Row Level Security (RLS) enabled on all tables
- 45+ migrations for schema evolution

---

## Gemini Integration

| Feature | Model | Status |
|---------|-------|--------|
| Recipe Extraction (URL) | gemini-3-flash-preview | ✅ Implemented |
| Image Analysis | gemini-3-flash-preview | ✅ Implemented |
| Recipe Generation | gemini-3-flash-preview | ✅ Implemented |
| Image Generation | gemini-2.5-flash-image | ✅ Implemented |
| Voice Assistant | gemini-2.5-flash-native-audio-preview-12-2025 | 🔄 In Development |
| Nutrition Analysis | gemini-3-flash-preview | ✅ Implemented |

---

## What's Implemented

- ✅ Full recipe management (create, read, update, delete)
- ✅ Multi-source recipe import (camera scan, URL, web search)
- ✅ Smart grocery lists with aisle grouping and ingredient merging
- ✅ Pantry management with categories
- ✅ Chef Discovery - AI recipe suggestions based on pantry
- ✅ RevenueCat subscription integration with usage tracking
- ✅ Production-ready UI with animations
- ✅ Supabase backend with RLS security
- 🔄  Voice assistant (Gemini Live Audio) - in development
`,
    stack: ["TypeScript", "React Native", "Expo", "Node.js", "Express", "Supabase", "Cloudflare R2", "Gemini API", "Gemini Live API", "LiveKit", "Cloud Run", "RevenueCat", "Google Play Store"],
    highlights: [
      "Extracts recipes instantly from any URL, cookbook scan, or social media post using Gemini Vision.",
      "Smart pantry and grocery list manager with AI ingredient parsing and automatic merging.",
      "Real-time voice assistant powered by Gemini Live Audio with 13 custom server-side tool calls.",
      "Fully architected backend on Cloud Run with Supabase RLS and RevenueCat subscription tiers."
    ],
    links: {
      playStore: "https://play.google.com/apps/internaltest/4701633744859965772"
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
    stack: ["TypeScript", "Next.js", "React", "Supabase", "Cloudflare R2", "Vercel", "Gemini API", "Stripe"],
    highlights: [
      "AI-driven brand asset generation.",
      "Consistent visual identity management."
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
    tagline: "TA crypto analysis to spot better opportunities",
    description: "Advanced technical analysis platform for cryptocurrency markets to spot better trading opportunities. Full details coming soon.",
    stack: ["TypeScript", "Next.js", "React", "Supabase", "Cloudflare R2", "Vercel", "Gemini API", "CoinGecko API", "TradingView API", "altFINS API", "Binance API"],
    highlights: [
      "Real-time technical analysis indicators.",
      "Secure user authentication and data storage."
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
    description: "A React application for transforming images into more than 50 artistic styles and making direct natural language edits using OpenAI's Image API.",
    content: `## Overview

PxlMorph is an AI-powered image transformation application that allows users to apply over 50 artistic styles to their photos or make direct natural language edits. Built with Next.js and TypeScript, it leverages OpenAI's Image API to seamlessly blend user photos with predefined artistic prompts.

---

## 🎨 Available Styles

PxlMorph supports 50+ artistic styles across multiple categories. Each style includes optimized prompts and example images to ensure high-quality results.

- **Anime & Cartoon**: Studio Ghibli, Pixar 3D, The Simpsons, South Park, Pokémon, Lo-fi Anime, Clay, Tim Burton
- **Artistic Styles**: Oil Painting, Watercolor, Sketch, Comic Book, Pop Art, Art Nouveau, Renaissance, Impressionist
- **Digital Art**: Cyberpunk, Vaporwave, Synthwave, Glitch Art, Pixel Art, Isometric, 3D Render, Digital Painting
- **Photography**: Portrait, Landscape, Street Photography, Documentary, Film Noir, Polaroid, Vintage, Cinematic
- **And More...**: Architecture, Fashion, Nature, Abstract, Typography

---

## 🔄 Two Ways to Transform Images

### 1. Style-Based Transformation (\`/api/generate-image\`)
*Best for: Applying artistic styles to your photos*

- Choose from 50+ predefined styles.
- Upload an inspiration image.
- The OpenAI Image API transforms it while preserving important details.
- Optimized for consistent, high-quality results.
- **Example Use Case**: *"Turn my vacation photo into a Studio Ghibli scene"*

### 2. Direct Editing (\`/api/edit-image\`)
*Best for: Making specific changes to existing images*

- Write natural language prompts.
- Make targeted modifications.
- More flexible but requires clear instructions.
- Great for quick edits and experiments.
- **Example Use Case**: *"Add a golden sunset background and make the colors more vibrant"*
`,
    stack: ["TypeScript", "Next.js", "React", "Supabase", "Cloudflare R2", "Vercel", "OpenAI API"],
    highlights: [
      "Supports over 50 distinct artistic styles with optimized prompting.",
      "Dual-mode functionality: predefined style transfer and direct natural language editing.",
      "Built with a modern stack featuring Next.js, Supabase, and Cloudflare R2."
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
      "OpenAI Image API integration (50+ styles)",
      "Cloudflare R2 image storage",
      "Supabase Auth & image history management"
    ]
  }
];
