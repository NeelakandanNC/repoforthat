# Project Context: REPO FOR THAT (6-repoforthat)

This document serves as a comprehensive guide to the **REPO FOR THAT** project, a curated directory for open-source repositories with a retro/pixel art aesthetic.

---

## 🚀 1. Project Identity & Purpose
- **Project Name:** REPO FOR THAT
- **Tagline:** "Built for the open source obsessed. Long live FOSS."
- **Core Purpose:** A centralized, searchable, and categorized platform to discover high-quality open-source projects.
- **Visual Style:** Pixel art, retro gaming aesthetic, featuring floating sprites, a high-contrast dark theme, and a 'pointer' (hand) cursor for interactive elements.

## 🛠️ 2. Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Frontend:** React 19, TypeScript
- **Styling:** Tailwind CSS v4 + Inline CSS-in-JS for snappy retro interactions.
- **Database:** PostgreSQL (hosted on Neon)
- **ORM:** Drizzle ORM
- **Deployment:** Vercel

## 🏛️ 3. Architecture Overview
- **Server-Side Rendering (SSR):** Initial data for repositories (first 25) and all categories are fetched in `app/page.tsx` for performance and SEO.
- **Client-Side Interactivity:** `app/HomeClient.tsx` manages state for:
  - User authentication session
  - Bookmarks (saved repositories) with **Optimistic UI Updates**.
  - Repository filtering (by category, search, or SAVED toggle)
  - Pagination (Infinite "Load More")
- **API-Driven:** Client-side updates are powered by dedicated API routes in `app/api/`.

## 📊 4. Data Model (Drizzle Schema)
Defined in `db/schema.ts`:
- **`repos`**: ID, name, url (unique), category, stars, description, createdAt.
- **`categories`**: ID, slug (unique), label, icon.
- **`subscribers`**: ID, email (unique), createdAt.
- **`users`**: ID, email (unique), password (hashed), username (unique), createdAt.
- **`bookmarks`**: ID, userId, repoId, createdAt.

## 🌐 5. API Endpoints
### Public
- `GET /api/repos`, `GET /api/categories`, `POST /api/subscribe`.

### Authentication & Bookmarks
- `POST /api/auth/signup`, `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me`.
- `GET /api/bookmarks`, `POST /api/bookmarks` (Toggles bookmark).

## 🎨 6. UI/UX & Components
Located in `components/`:
- **`Hero.tsx`**: Header with retro title, theme toggle, and Auth buttons.
- **`AuthModal.tsx`**: Pixel-art modal for user authentication.
- **`FilterBar.tsx`**: Category selection and search. Uses **CSS-based snappy button states** (`.filter-btn`) for zero-latency feedback.
- **`RepoTable.tsx`**: Directory table. Uses **pure CSS hover effects** (`.repo-row`) to ensure high performance and immediate visual response.

## ⚙️ 7. Key Workflows
1. **Authentication:** JWT-based auth via secure `httpOnly` cookies.
2. **Optimistic UI:** Bookmarking a repo updates the UI state instantly before the API call finishes, with a rollback mechanism on error.
3. **Snappy Interactions:** Visual states (hover, active, focus) are handled via CSS rather than React state where possible to ensure "pixel-snappy" response times.

## 📝 9. Conventions
- **Pixel Aesthetic:** Zero border-radius, `steps()` animations, bicolour palette.
- **Performance First:** Use CSS for visual feedback; use Optimistic UI for data mutations.
- **Security:** Hashed passwords (bcrypt), secure cookies, server-side session validation.

---
*Last Updated: 2026-03-01 by Gemini CLI*
