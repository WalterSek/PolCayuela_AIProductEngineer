import { Project } from "@/data/types/project";

export const kryptodash: Project = {
  slug: "kryptodash",
  name: "Kryptodash",
  tagline: "AI-Powered Crypto Trading Insights",
  description: "Advanced technical analysis platform for cryptocurrency markets combining real-time data with Gemini 3.1 AI to spot better trading opportunities.",
  content: `## Overview

Kryptodash is an advanced cryptocurrency trading insights platform that combines real-time market data with AI-powered technical analysis. Built with **Next.js 16**, it integrates multiple data sources and WebSocket streams to help traders spot better opportunities.

---

## AI Product Engineering Highlights

- **Real-Time Data Pipeline Architecture** — Designed WebSocket + REST hybrid system with exponential backoff, auto-reconnect, and circuit breaker patterns for 99.9% uptime on Binance price feeds
- **Multi-Source AI Data Fusion** — Aggregated 5+ APIs (CoinGecko, Binance, altFINS, Mobula, CryptoCompare) with TanStack Query caching and intelligent fallback strategies
- **Freemium AI Feature Gating** — Implemented tiered access control with Supabase RLS, real-time subscription status, and Gemini 3.1 Flash analysis for Pro users
- **Production Resilience Patterns** — Built circuit breakers, rate limiting (token bucket), and graceful degradation for financial data reliability

---

## Architecture Summary

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Frontend** | Next.js 16 + React 19 + TypeScript | Server Components, streaming SSR, real-time UI |
| **Real-Time Data** | Binance WebSocket + REST | Live price feeds with auto-reconnect |
| **AI Analysis** | Gemini 3.1 Flash / Flash Lite | Market analysis, pattern detection (Pro-gated) |
| **Database** | Supabase (Postgres + RLS) | User profiles, watchlists, auth, Pro status |
| **State Management** | Zustand + TanStack Query | Server state, client cache, price store |
| **Charts** | TradingView Lightweight Charts | Technical analysis visualization |
| **Payments** | Stripe | Freemium subscription management |

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

## Deep Dive: System Architecture

For those interested in the complete technical implementation, here are the detailed ASCII diagrams showing component relationships and data flows.

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
│  ├── HeroUI Components (NextUI-based)                             │  │
│  ├── TradingView Charting                                          │  │
│  ├── Tailwind CSS                                                  │  │
│  └── React Server Components                                       │  │
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
`,
  stack: ["TypeScript", "Next.js", "React", "Supabase Auth + DB", "Vercel", "Gemini API", "CoinGecko API", "TradingView", "altFINS API", "Binance API", "Zustand", "TanStack Query", "HeroUI", "Zod", "Stripe", "Jest", "Chart.js"],
  highlights: [
    "Real-time WebSocket architecture: Binance feeds with exponential backoff, circuit breakers, and visual price indicators.",
    "Multi-source AI data fusion: 5+ APIs aggregated with TanStack Query caching and intelligent fallback strategies.",
    "Freemium AI gating: Supabase RLS + Stripe with real-time subscription status and Gemini 3.1 Flash analysis.",
    "Production resilience: Circuit breakers, token bucket rate limiting, and graceful degradation patterns."
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
  }
};
