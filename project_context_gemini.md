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
- **Styling:** Tailwind CSS v4 (using Vanilla CSS variables for theming)
- **Database:** PostgreSQL (hosted on Neon)
- **ORM:** Drizzle ORM
- **Deployment:** Vercel

## 🏛️ 3. Architecture Overview
- **Server-Side Rendering (SSR):** Initial data for repositories (first 25) and all categories are fetched in `app/page.tsx` for performance and SEO.
- **Client-Side Interactivity:** `app/HomeClient.tsx` manages state for:
  - User authentication session
  - Bookmarks (saved repositories)
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
- `GET /api/repos`: Fetches paginated repositories with filters.
- `GET /api/categories`: Fetches all categories.
- `POST /api/subscribe`: Email newsletter signup.

### Authentication
- `POST /api/auth/signup`: Registers a new user.
- `POST /api/auth/login`: Authenticates user.
- `POST /api/auth/logout`: Clears session.
- `GET /api/auth/me`: Checks current session.

### Bookmarks
- `GET /api/bookmarks`: Fetches user's saved repos.
- `POST /api/bookmarks`: Toggles bookmark for a repo.

## 🎨 6. UI/UX & Components
Located in `components/`:
- **`Hero.tsx`**: Header with retro title, theme toggle, and Auth buttons (Login/Signup/Logout).
- **`AuthModal.tsx`**: Pixel-art modal for user authentication.
- **`FilterBar.tsx`**: Category badges, search bar, and **[SAVED]** toggle button.
- **`RepoTable.tsx`**: Directory table with **SAVED** star column for logged-in users.
- **`FloatingSprites.tsx`**: Animated CSS pixel-art decorations.
- **`PixelDivider.tsx`**: Custom retro zigzag dividers.

## ⚙️ 7. Key Workflows
1. **Initial Load:** SSR fetches initial data. `HomeClient` checks session and bookmarks via API.
2. **Authentication:** JWT-based auth using secure cookies (`auth_token`).
3. **Filtering:** Client-side filtering for "SAVED" items; server-side for categories/search.
4. **Bookmarking:** Instant UI updates when toggling stars.

## 📝 9. Conventions
- **Pixel Aesthetic:** Zero border-radius, `steps()` animations, bicolour palette.
- **Security:** Hashed passwords (bcrypt), secure cookies, server-side session validation.

---
*Last Updated: 2026-03-01 by Gemini CLI*
