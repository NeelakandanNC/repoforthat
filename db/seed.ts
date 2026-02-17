import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as dotenv from "dotenv";
import { repos, categories } from "./schema";

dotenv.config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

const seedCategories = [
    { slug: "ai-agents", label: "AI Agents", icon: "robot" },
    { slug: "llm-wrappers", label: "LLM Wrappers", icon: "brain" },
    { slug: "dev-tools", label: "Dev Tools", icon: "wrench" },
    { slug: "ui-components", label: "UI Components", icon: "palette" },
    { slug: "databases", label: "Databases", icon: "cylinder" },
    { slug: "frameworks", label: "Frameworks", icon: "grid" },
    { slug: "cli-tools", label: "CLI Tools", icon: "lightning" },
    { slug: "self-hosted", label: "Self Hosted", icon: "server" },
    { slug: "productivity", label: "Productivity", icon: "clock" },
    { slug: "security", label: "Security", icon: "lock" },
    { slug: "data-engineering", label: "Data Engineering", icon: "chart" },
    { slug: "observability", label: "Observability", icon: "eye" },
];

const seedRepos = [
    { name: "langchain-ai/langchain", url: "https://github.com/langchain-ai/langchain", category: "ai-agents", stars: 98200, description: "Build context-aware reasoning applications" },
    { name: "microsoft/autogen", url: "https://github.com/microsoft/autogen", category: "ai-agents", stars: 35800, description: "A programming framework for agentic AI" },
    { name: "significant-gravitas/AutoGPT", url: "https://github.com/significant-gravitas/AutoGPT", category: "ai-agents", stars: 169000, description: "AutoGPT is the vision of accessible AI for everyone" },
    { name: "crewAIInc/crewAI", url: "https://github.com/crewAIInc/crewAI", category: "ai-agents", stars: 22400, description: "Framework for orchestrating role-playing autonomous AI agents" },
    { name: "openai/openai-python", url: "https://github.com/openai/openai-python", category: "llm-wrappers", stars: 23500, description: "The official Python library for the OpenAI API" },
    { name: "hwchase17/langchainjs", url: "https://github.com/langchain-ai/langchainjs", category: "llm-wrappers", stars: 13200, description: "Build context-aware reasoning applications in JS/TS" },
    { name: "ollama/ollama", url: "https://github.com/ollama/ollama", category: "llm-wrappers", stars: 105000, description: "Get up and running with Llama and other large language models" },
    { name: "vitejs/vite", url: "https://github.com/vitejs/vite", category: "dev-tools", stars: 70200, description: "Next generation frontend tooling" },
    { name: "evanw/esbuild", url: "https://github.com/evanw/esbuild", category: "dev-tools", stars: 38400, description: "An extremely fast bundler for the web" },
    { name: "biomejs/biome", url: "https://github.com/biomejs/biome", category: "dev-tools", stars: 16300, description: "A performant toolchain for web projects" },
    { name: "shadcn-ui/ui", url: "https://github.com/shadcn-ui/ui", category: "ui-components", stars: 76800, description: "Beautifully designed components built with Radix UI and Tailwind" },
    { name: "chakra-ui/chakra-ui", url: "https://github.com/chakra-ui/chakra-ui", category: "ui-components", stars: 38200, description: "Simple, modular and accessible component library" },
    { name: "radix-ui/primitives", url: "https://github.com/radix-ui/primitives", category: "ui-components", stars: 16500, description: "Unstyled, accessible components for building high-quality design systems" },
    { name: "supabase/supabase", url: "https://github.com/supabase/supabase", category: "databases", stars: 75600, description: "The open source Firebase alternative" },
    { name: "neondatabase/neon", url: "https://github.com/neondatabase/neon", category: "databases", stars: 15800, description: "Neon: Serverless Postgres — fully managed, autoscaling" },
    { name: "drizzle-team/drizzle-orm", url: "https://github.com/drizzle-team/drizzle-orm", category: "databases", stars: 25400, description: "TypeScript ORM that lives on the edge" },
    { name: "vercel/next.js", url: "https://github.com/vercel/next.js", category: "frameworks", stars: 128000, description: "The React Framework for the Web" },
    { name: "sveltejs/svelte", url: "https://github.com/sveltejs/svelte", category: "frameworks", stars: 80700, description: "Cybernetically enhanced web apps" },
    { name: "astro-build/astro", url: "https://github.com/withastro/astro", category: "frameworks", stars: 48300, description: "The web framework for content-driven websites" },
    { name: "cli/cli", url: "https://github.com/cli/cli", category: "cli-tools", stars: 37800, description: "GitHub's official command line tool" },
    { name: "junegunn/fzf", url: "https://github.com/junegunn/fzf", category: "cli-tools", stars: 66700, description: "A command-line fuzzy finder" },
    { name: "BurntSushi/ripgrep", url: "https://github.com/BurntSushi/ripgrep", category: "cli-tools", stars: 49200, description: "recursively searches directories for a regex pattern" },
    { name: "immich-app/immich", url: "https://github.com/immich-app/immich", category: "self-hosted", stars: 55800, description: "High performance self-hosted photo and video management" },
    { name: "nextcloud/server", url: "https://github.com/nextcloud/server", category: "self-hosted", stars: 28500, description: "Nextcloud server, a safe home for all your data" },
    { name: "louislam/uptime-kuma", url: "https://github.com/louislam/uptime-kuma", category: "self-hosted", stars: 62300, description: "A fancy self-hosted monitoring tool" },
    { name: "toeverything/AFFiNE", url: "https://github.com/toeverything/AFFiNE", category: "productivity", stars: 43700, description: "The next-gen knowledge base that empowers users" },
    { name: "appwrite/appwrite", url: "https://github.com/appwrite/appwrite", category: "productivity", stars: 46200, description: "Build like a team of hundreds" },
    { name: "logto-io/logto", url: "https://github.com/logto-io/logto", category: "security", stars: 9800, description: "The better identity infrastructure for developers" },
    { name: "keycloak/keycloak", url: "https://github.com/keycloak/keycloak", category: "security", stars: 24600, description: "Open Source Identity and Access Management" },
    { name: "apache/airflow", url: "https://github.com/apache/airflow", category: "data-engineering", stars: 37800, description: "A platform to programmatically author, schedule, and monitor workflows" },
    { name: "dbt-labs/dbt-core", url: "https://github.com/dbt-labs/dbt-core", category: "data-engineering", stars: 10200, description: "dbt enables data analysts to transform data in their warehouses" },
    { name: "prometheus/prometheus", url: "https://github.com/prometheus/prometheus", category: "observability", stars: 56800, description: "The Prometheus monitoring system and time series database" },
    { name: "grafana/grafana", url: "https://github.com/grafana/grafana", category: "observability", stars: 65700, description: "The open and composable observability and data visualization platform" },
    { name: "getsentry/sentry", url: "https://github.com/getsentry/sentry", category: "observability", stars: 39800, description: "Developer-first error tracking and performance monitoring" },
];

async function seed() {
    console.log("🌱 Seeding database...");

    // Create tables via raw SQL
    await sql`
    CREATE TABLE IF NOT EXISTS categories (
      id SERIAL PRIMARY KEY,
      slug TEXT NOT NULL UNIQUE,
      label TEXT NOT NULL,
      icon TEXT
    )
  `;
    await sql`
    CREATE TABLE IF NOT EXISTS repos (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      url TEXT NOT NULL UNIQUE,
      category TEXT NOT NULL,
      stars INTEGER NOT NULL DEFAULT 0,
      description TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
    await sql`
    CREATE TABLE IF NOT EXISTS subscribers (
      id SERIAL PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

    console.log("✅ Tables created");

    // Seed categories
    for (const cat of seedCategories) {
        await db.insert(categories).values(cat).onConflictDoNothing();
    }
    console.log(`✅ Seeded ${seedCategories.length} categories`);

    // Seed repos
    for (const repo of seedRepos) {
        await db.insert(repos).values(repo).onConflictDoNothing();
    }
    console.log(`✅ Seeded ${seedRepos.length} repos`);

    console.log("🎮 Seed complete!");
}

seed().catch((err) => {
    console.error("Seed error:", err);
    process.exit(1);
});
