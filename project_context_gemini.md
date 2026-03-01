# Project Context: REPO FOR THAT (6-repoforthat)

This document serves as a comprehensive guide to the **REPO FOR THAT** project, a curated directory for open-source repositories with a retro/pixel art aesthetic.

---

## 🚀 1. Project Identity & Purpose
- **Project Name:** REPO FOR THAT
- **Tagline:** "Built for the open source obsessed. Long live FOSS."
- **Core Purpose:** A centralized, searchable, and categorized platform to discover high-quality open-source projects.
- **Visual Style:** Pixel art, retro gaming aesthetic, featuring floating sprites and a high-contrast dark theme.

## 🛠️ 2. Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Frontend:** React 19, TypeScript
- **Styling:** Tailwind CSS v4 (using Vanilla CSS variables for theming)
- **Database:** PostgreSQL (hosted on Neon)
- **ORM:** Drizzle ORM
- **Deployment:** Vercel

## 🏛️ 3. Architecture Overview
- **Server-Side Rendering (SSR):** Initial data for repositories (first 25) and all categories are fetched in `app/page.tsx` for performance and SEO.
- **Client-Side Interactivity:** `app/HomeClient.tsx` manages state for:
  - Repository filtering (by category)
  - Real-time search
  - Pagination (Infinite "Load More")
  - UI state (loading, error handling)
- **API-Driven:** Client-side updates are powered by dedicated API routes in `app/api/`.

## 📊 4. Data Model (Drizzle Schema)
Defined in `db/schema.ts`:
- **`repos`**:
  - `id` (serial, PK)
  - `name` (text, extracted from URL)
  - `url` (text, unique)
  - `category` (text, slug)
  - `stars` (integer, default 0)
  - `description` (text)
  - `createdAt` (timestamp)
- **`categories`**:
  - `id` (serial, PK)
  - `slug` (text, unique)
  - `label` (text)
  - `icon` (text, SVG path or component reference)
- **`subscribers`**:
  - `id` (serial, PK)
  - `email` (text, unique)
  - `createdAt` (timestamp)

## 🌐 5. API Endpoints
### Public
- `GET /api/repos`: Fetches paginated repositories with optional `category` and `search` filters.
- `GET /api/categories`: Fetches all available categories.
- `POST /api/subscribe`: Adds a new email to the subscriber list.

### Admin/Internal
- `POST /api/admin/repos`: Adds a new repository to the database. Requires `x-admin-secret` header.

## 🎨 6. UI/UX & Components
Located in `components/`:
- **`Hero.tsx`**: Title and main header with retro styling.
- **`FilterBar.tsx`**: Category selection and search input.
- **`RepoTable.tsx`**: Displays repositories in a responsive layout (cards on mobile, grid/table-like on desktop).
- **`FloatingSprites.tsx`**: Interactive, floating pixel-art icons that drift across the background.
- **`PixelDivider.tsx`**: Custom retro-styled horizontal divider.
- **`SubscribeBar.tsx`**: Email signup component with pixel art accents.
- **`CategoryIcon.tsx`**: Map of category slugs to their respective retro-style SVG icons.

## ⚙️ 7. Key Workflows
1. **Initial Load:** SSR fetches categories and the first page of repos.
2. **Filtering/Search:** Users select a category or type in the search bar. `HomeClient` triggers a `fetch` call to `/api/repos` with query params, resetting the page count.
3. **Pagination:** "Load More" appends the next page of results to the current list.
4. **Email Signup:** Captures user email and stores it in the `subscribers` table via `/api/subscribe`.

## 📁 8. Project Structure
- `app/`: Next.js App Router (pages, API routes, layout).
- `components/`: Modular React components.
- `db/`: Database configuration, Drizzle schema, and seed scripts.
- `lib/`: Utility functions (e.g., `extractRepoName`).
- `public/`: Static assets (icons, SVGs).

## 📝 9. Conventions & Development Notes
- **Tailwind v4:** Uses CSS variables (`--fg`, `--bg`, etc.) defined in `app/globals.css`.
- **Drizzle:** Always use `returning()` for inserts if IDs are needed immediately.
- **Error Handling:** Client-side fetches use `try/catch` and update a loading state. API routes return standard JSON error responses.
- **Dynamic Routes:** `app/page.tsx` is marked `force-dynamic` to ensure fresh data.

---
*Created on: 2026-03-01 by Gemini CLI*
