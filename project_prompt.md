# Repo For That — Full Build Specification

## Project Overview

Build a single-page web application called **"Repo For That"** — a publicly accessible directory of curated open-source GitHub repositories, organized by category. No authentication. No dashboards. The entire website must feel like a **living pixel-art world** — not just a table with a pixel font, but a fully immersive retro-game experience where every element, animation, decoration, and interaction reinforces the pixel aesthetic.

---

## Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router) |
| Styling | Tailwind CSS + custom CSS |
| Database | Neon (PostgreSQL via `@neondatabase/serverless`) |
| ORM | Drizzle ORM |
| Deployment | Vercel |
| Font | Jersey 10 (Google Fonts) — **used everywhere, no exceptions** |
| Pixel Sprites | Inline SVG or CSS-drawn pixel art (no external image dependencies) |

---

## Design System

### Theme: Full Pixel-Art Immersion

This is not a website that uses a pixel font. This is a website that **lives inside a pixel world**. Every surface, element, and interaction must feel like it belongs in a retro 8-bit or 16-bit video game.

#### Font
```css
@import url('https://fonts.googleapis.com/css2?family=Jersey+10&display=swap');

* {
  font-family: "Jersey 10", sans-serif;
  font-weight: 400;
  font-style: normal;
}
```

#### Color Palette — Bichromatic
- **Electric Blue:** `#0000FF`
- **Light Mode:** `#FFFFFF` background · `#0000FF` for all foreground elements
- **Dark Mode:** `#000000` background · `#0000FF` for all foreground elements
- These are the **only two colors** used in the UI. No grays, no muted tones, no opacity tricks that introduce third colors. Hover states invert bg/fg.

```css
:root[data-theme="light"] { --bg: #FFFFFF; --fg: #0000FF; }
:root[data-theme="dark"]  { --bg: #000000; --fg: #0000FF; }
```

#### Core Pixel Rules
- **Zero border-radius anywhere.** Not on buttons, inputs, cards, badges, or containers. `border-radius: 0` globally.
- All borders: `2px solid var(--fg)` — pixel-sharp
- Buttons use **pixel shadow**: `box-shadow: 4px 4px 0px var(--fg)`. On hover/active: `transform: translate(4px, 4px); box-shadow: none` to simulate a physical press
- `image-rendering: pixelated` on all images and canvas elements
- Scrollbar: thin, electric blue thumb, background matches `--bg`
- Cursor: `crosshair` on interactive elements
- No transitions that use `ease` or `cubic-bezier` — use `steps()` timing function for all CSS animations to keep them pixel-snappy

---

## Pixel Art Atmosphere — The Most Important Section

The website must feel **alive** with pixel art. Floating sprites, scanline overlays, pixel grid textures, and retro decorations must be present throughout the page — not just in the header, but everywhere.

### 1. Global Background Treatment

The page background is not a flat color. It has:

- **Pixel dot grid overlay:** A repeating `4px × 4px` CSS background pattern of tiny electric-blue dots on the page background. Opacity `0.07` in light mode, `0.12` in dark mode. This creates a subtle graph-paper/CRT feel without adding a third color.
  ```css
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: radial-gradient(circle, var(--fg) 1px, transparent 1px);
    background-size: 16px 16px;
    opacity: 0.07;
    pointer-events: none;
    z-index: 0;
  }
  ```

- **Scanline overlay:** Horizontal lines at 4px intervals, opacity `0.03`, overlaid on the entire viewport using a `::after` pseudo-element on `body`. Creates a CRT monitor illusion.

### 2. Floating Pixel Art Sprites

Scatter **CSS-only pixel art sprites** across the page as absolutely positioned decorative elements. They must be **purely CSS + HTML** (no images or external assets). Draw them using `box-shadow` on a `1px × 1px` `<div>` — this is the classic technique for CSS pixel art.

Create and float the following sprites around the page — all themed around **coding, open source, and developer culture**:

| Sprite | Description | Placement |
|---|---|---|
| Pixel `</>` code tag | Classic HTML bracket pair drawn in pixels | Top-right of hero section |
| Pixel Git branch fork | A branching path (one line splitting into two) drawn in block pixels | Near the subscribe bar |
| Pixel terminal `$_` cursor | A tiny terminal prompt block, blinking | Near the filter bar |
| Pixel GitHub star `★` | Large 8-bit star shape (the GitHub "star a repo" metaphor) | Floating mid-page left |
| Pixel pull request icon | Two circles connected by an arc, pixel-drawn — classic PR symbol | Bottom-right of the hero |
| Pixel `{ }` curly braces | Oversized pixel curly brace pair | Top-left corner, decorative |
| Pixel bug | A simple 8-bit insect/bug shape (for "squash the bug" dev culture) | Bottom-left corner |
| Pixel coffee cup | Steaming pixel cup — the universal developer symbol | Floating in the lower-right area |
| Pixel commit dot | A dot on a line — represents a git commit on a timeline | Floating near the table mid-section |
| Pixel `#` hash / octothorpe | Large pixelated hash symbol — evokes GitHub issues and markdown | Near the footer |

**Floating animation:** Each sprite floats in a slow, looping `translateY` animation using `steps(2)` or `steps(4)` — not smooth, but jerky/stepped like a real sprite bobbing in a game:

```css
@keyframes pixel-float {
  0%   { transform: translateY(0px); }
  50%  { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
}

.sprite {
  animation: pixel-float 2s steps(4, end) infinite;
}
```

Give each sprite a different `animation-delay` (0s, 0.3s, 0.7s, 1.2s...) so they don't all bob in sync.

### 3. Section Dividers

Between each section, use a **pixel-art divider** — a row of repeating pixel blocks drawn with CSS, like a brick wall or a jagged pixel edge. Not a plain `<hr>`. Example: a row of alternating 8px × 8px filled and empty squares forming a pixelated zigzag line.

### 4. Hero Section

The very top of the page (above the subscribe bar and table) must have an **impactful pixel-art hero** that sets the tone — similar to the reference image. It should contain:

- **Large display text** in Jersey 10: `"REPO FOR THAT"` in massive sizing (clamp between 64px and 120px). If it overflows, let it be huge and proud — this is a pixel game title screen.
- **Subtitle text** below it: `"OPEN SOURCE, ORGANIZED."` in a smaller but still large Jersey 10 size.
- The hero background should be a solid electric blue (`#0000FF`) rectangle that spans the full width, creating a bold color block. Text inside should be white (light mode) or black (dark mode) — this is the **one intentional inversion** used for dramatic effect.
- The floating sprites described above should overlap the hero section boundary, sticking out above and below it, giving depth.
- A **blinking pixel cursor** `█` should appear after the subtitle text, blinking using a `steps(1)` animation.
- The theme toggle `[DARK] / [LIGHT]` lives in the top-right corner of the hero block.

### 5. Pixel Art Category Badges

Each category in the filter bar should not be a plain text button. It should look like a **game item badge or HUD element**:

- A small CSS pixel-art icon drawn per category (e.g., a tiny robot head for AI Agents, a wrench for Dev Tools, a lock for Security, a lightning bolt for CLI Tools, a cylinder for Databases)
- Text label next to the icon
- The whole badge has a `2px` border, pixel shadow, and inverts on active/hover
- Badges are horizontally scrollable on mobile

### 6. Repo Cards in the Table

The table rows must feel like **game inventory items or quest entries**. Each row should have:

- A **pixel-art "type icon"** on the far left — a tiny 16×16 CSS sprite indicating the category (reuse the same icons from the filter badges)
- The repo name in large Jersey 10 acts like a **quest/item name**
- The category label styled like a **game stat badge** — bordered, tiny, inline
- The star count styled like a **score counter** — right-aligned, with a pixel star icon (`★`) drawn in CSS before the number
- On row hover: the entire row background flips to electric blue, all text flips to the contrasting color, and a tiny `▶` pixel arrow appears at the start of the row

### 7. "Load More" Button

Must look like a **retro game UI button** — wide, centered, with pixel shadow. The text reads:

```
▶ LOAD MORE REPOS
```

On hover: translate effect + shadow collapse.
While loading: text flips to `█ LOADING...` with a blinking animation using `steps(1)`.
When exhausted: `[ ★ YOU'VE SEEN IT ALL ★ ]` — static, no shadow, dimmed to `opacity: 0.5`.

### 8. Subscribe Bar

Styled like an **in-game notification banner or quest reward popup**:

- Full width, solid electric blue background (inverted from the rest of the page)
- Text in the contrasting color: `GET MORE REPOS LIKE THESE — FOR FREE`
- Input field and `[SUBSCRIBE]` button sit inline, styled with `2px` borders
- On success: the input and button are replaced by `✔ YOU'RE IN. WELCOME TO THE GUILD.` in blinking pixel style
- On duplicate: `✘ ALREADY A MEMBER.`

---

## Database Schema (Neon PostgreSQL via Drizzle ORM)

```sql
CREATE TABLE repos (
  id          SERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  url         TEXT NOT NULL UNIQUE,
  category    TEXT NOT NULL,
  stars       INTEGER NOT NULL DEFAULT 0,
  description TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE subscribers (
  id         SERIAL PRIMARY KEY,
  email      TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE categories (
  id    SERIAL PRIMARY KEY,
  slug  TEXT NOT NULL UNIQUE,
  label TEXT NOT NULL,
  icon  TEXT             -- e.g. "robot", "wrench", "lock" — maps to a CSS sprite component
);
```

### Predefined Categories

| Slug | Label | Icon Key |
|---|---|---|
| `ai-agents` | AI Agents | `robot` |
| `llm-wrappers` | LLM Wrappers | `brain` |
| `dev-tools` | Dev Tools | `wrench` |
| `ui-components` | UI Components | `palette` |
| `databases` | Databases | `cylinder` |
| `frameworks` | Frameworks | `grid` |
| `cli-tools` | CLI Tools | `lightning` |
| `self-hosted` | Self Hosted | `server` |
| `productivity` | Productivity | `clock` |
| `security` | Security | `lock` |
| `data-engineering` | Data Engineering | `chart` |
| `observability` | Observability | `eye` |

---

## API Routes

### `GET /api/repos`
- Params: `?page=1&limit=25&category=ai-agents&search=keyword`
- Returns paginated repos ordered by `stars DESC`
- Response: `{ data: [...], total: number, page: number, hasMore: boolean }`

### `GET /api/categories`
- Returns all categories including `icon` field

### `POST /api/subscribe`
- Body: `{ email: string }`
- Inserts to `subscribers`, handles duplicate gracefully

### `POST /api/admin/repos` *(protected)*
- Header: `x-admin-secret: YOUR_SECRET`
- Body: `{ url, category, stars, description }`
- Auto-extracts `name` from URL

---

## Page Layout (Top to Bottom)

```
┌─────────────────────────────────────────────┐
│  [FLOATING SPRITES overlap this boundary]   │
│  ┌─────────────────────────────────────┐    │
│  │  HERO BLOCK (electric blue bg)      │    │
│  │  "REPO FOR THAT"  (huge Jersey 10)  │    │
│  │  "OPEN SOURCE, ORGANIZED.█"         │    │
│  │                      [DARK / LIGHT] │    │
│  └─────────────────────────────────────┘    │
│  [FLOATING SPRITES overlap this boundary]   │
├─────────────────────────────────────────────┤
│  PIXEL DIVIDER (zigzag CSS blocks)          │
├─────────────────────────────────────────────┤
│  SUBSCRIBE BAR (inverted bg)                │
│  GET MORE REPOS — FOR FREE  [email] [SUB]   │
├─────────────────────────────────────────────┤
│  PIXEL DIVIDER                              │
├─────────────────────────────────────────────┤
│  FILTER BAR                                 │
│  [ALL] [🤖 AI AGENTS] [🔧 DEV TOOLS] ...   │
│                              [SEARCH...]    │
├─────────────────────────────────────────────┤
│  REPO TABLE                                 │
│  # │ ICON │ NAME   │ URL │ CATEGORY │ ★     │
│  ──┼──────┼────────┼─────┼──────────┼───── │
│  1 │ 🤖   │ owner/ │ ... │ AI Agents│ 12.4k│
│  ...                                        │
│                                             │
│           [ ▶ LOAD MORE REPOS ]             │
├─────────────────────────────────────────────┤
│  PIXEL DIVIDER                              │
├─────────────────────────────────────────────┤
│  FOOTER: REPO FOR THAT — BUILT FOR THE      │
│          OPEN SOURCE OBSESSED               │
│  [FLOATING ★ HEART SPRITE near footer]      │
└─────────────────────────────────────────────┘
```

---

## Animations Catalogue

All animations must use `steps()` timing — no smooth easing.

| Animation | Element | Keyframe |
|---|---|---|
| `pixel-float` | All sprites | `translateY(0 → -8px → 0)` in `steps(4)` |
| `pixel-blink` | Cursor `█`, loading text | `opacity(1 → 0)` in `steps(1)`, 1s infinite |
| `pixel-press` | Button active state | `translate(4px, 4px)` + remove shadow |
| `pixel-spin` | Coin sprite | Rotate through 4 frames using `steps(4)` |
| `pixel-glitch` | Hero title on load | Rapid `translateX(±2px)` for 300ms on mount, then stops |

---

## Component File Structure

```
/
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   ├── globals.css           # CSS vars, pixel grid bg, scanlines, scrollbar, global resets
│   └── api/
│       ├── repos/route.ts
│       ├── categories/route.ts
│       ├── subscribe/route.ts
│       └── admin/repos/route.ts
├── components/
│   ├── Hero.tsx               # Giant title + hero block + theme toggle
│   ├── SubscribeBar.tsx
│   ├── FilterBar.tsx          # Category badges with pixel icons
│   ├── RepoTable.tsx          # Table + row hover logic
│   ├── LoadMoreButton.tsx
│   ├── PixelDivider.tsx       # Reusable zigzag CSS divider
│   ├── FloatingSprites.tsx    # All floating CSS pixel art sprites
│   ├── sprites/               # Individual CSS sprite components
│   │   ├── StarSprite.tsx
│   │   ├── CoinSprite.tsx
│   │   ├── GemSprite.tsx
│   │   ├── MushroomSprite.tsx
│   │   ├── TrophySprite.tsx
│   │   └── ... (one file per sprite)
│   └── icons/                 # Tiny 16x16 CSS pixel icons for categories
│       ├── RobotIcon.tsx
│       ├── WrenchIcon.tsx
│       └── ...
├── db/
│   ├── index.ts
│   └── schema.ts
├── lib/
│   └── utils.ts               # formatStars(), extractRepoName(), debounce()
├── drizzle.config.ts
└── README.md
```

---

## Utility Functions

```ts
formatStars(n: number): string       // 12400 → "12.4k", 1000000 → "1M"
extractRepoName(url: string): string // "https://github.com/a/b" → "a/b"
debounce(fn: Function, delay: number): Function
```

---

## Seed Data

Seed **at least 30 repos** across all categories with real star counts. Examples: `langchain-ai/langchain`, `microsoft/autogen`, `vitejs/vite`, `supabase/supabase`, `shadcn-ui/ui`, `neondatabase/neon`, `trufflesuite/truffle`, `cli/cli`, `prometheus/prometheus`, etc.

---

## Environment Variables

```env
DATABASE_URL=     # Neon pooled connection string
ADMIN_SECRET=     # Protects POST /api/admin/repos
```

---

## Definition of Done

- [ ] Entire page feels like a pixel-art game world — not a table with a retro font
- [ ] Minimum 8 floating CSS pixel sprites visible and animating on the page
- [ ] Global dot-grid background texture and scanline overlay active
- [ ] Pixel dividers between every section
- [ ] Hero block is bold, full-width, inverted, with glitch animation on load
- [ ] Category filter uses icon badges, not plain text buttons
- [ ] Table rows have pixel icons, pixel star counter, and animated hover state
- [ ] Subscribe bar feels like a game notification banner
- [ ] Jersey 10 font on every text element — zero exceptions
- [ ] Zero border-radius anywhere
- [ ] All animations use `steps()` — no `ease`, no `cubic-bezier`
- [ ] Light/dark toggle works and persists via `localStorage`
- [ ] Only `--bg` (`#FFFFFF`/`#000000`) and `--fg` (`#0000FF`) used as colors
- [ ] SSR for initial 25 rows, client-side append for Load More
- [ ] Neon DB connected, Drizzle schema migrated
- [ ] Deployed to Vercel with env vars configured
- [ ] Mobile responsive — filter bar horizontally scrolls, table scrolls with sticky first column
