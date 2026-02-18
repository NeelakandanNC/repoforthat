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
  { slug: "finance", label: "Finance", icon: "dollar" },
  { slug: "claude-code", label: "Claude Code", icon: "code" },
  { slug: "hardware", label: "Hardware", icon: "cpu" },
  { slug: "video", label: "Video", icon: "film" },
  { slug: "data", label: "Data", icon: "database" },
  { slug: "agentic-ai", label: "Agentic AI", icon: "spark" },
  { slug: "health", label: "Health", icon: "heart" }
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
  { name: "ValueCell", url: "https://github.com/ValueCell-ai/valuecell", category: "finance", description: "A community-driven, multi-agent platform for financial applications." },
  { name: "likec4/likec4", url: "https://github.com/likec4/likec4", category: "dev-tools", description: "Software architecture with always actual and live diagrams from your code" },
  { name: "lyogavin/airllm", url: "https://github.com/lyogavin/airllm", category: "dev-tools", description: "AirLLM 70B inference with single 4GB GPU" },
  { name: "h9zdev/WireTapper", url: "https://github.com/h9zdev/WireTapper", category: "hardware", description: "Wireless OSINT & Signal Intelligence Platform" },
  { name: "timoncool/videosos", url: "https://github.com/timoncool/videosos", category: "video", description: "Open-Source AI Video Editor with 100+ Models" },
  { name: "schelskedevco/ignidash", url: "https://github.com/schelskedevco/ignidash", category: "finance", description: "AI-powered platform for planning long-term personal finances" },
  { name: "Roboparty/roboto_origin", url: "https://github.com/Roboparty/roboto_origin", category: "hardware", description: "Fully Open-Source DIY Humanoid Robot" },
  { name: "robot-learning-co/trlc-dk1", url: "https://github.com/robot-learning-co/trlc-dk1", category: "hardware", description: "An Open Source Dev Kit for AI-native Robotics" },
  { name: "Fincept-Corporation/FinceptTerminal", url: "https://github.com/Fincept-Corporation/FinceptTerminal", category: "finance", description: "Financial intelligence platform with CFA-level analytics, AI automation" },
  { name: "nyldn/claude-octopus", url: "https://github.com/nyldn/claude-octopus", category: "claude-code", description: "Multi-tentacled orchestrator for Claude Code" },
  { name: "Prat011/awesome-llm-skills", url: "https://github.com/Prat011/awesome-llm-skills", category: "cli-tools", description: "List of Skills, resources, and tools for customizing AI workflows" },
  { name: "koala73/worldmonitor", url: "https://github.com/koala73/worldmonitor", category: "data", description: "News aggregation, geopolitical monitoring, and infrastructure tracking" },
  { name: "theNetworkChuck/claude-phone", url: "https://github.com/theNetworkChuck/claude-phone", category: "claude-code", description: "Voice interface for Claude Code via SIP/3CX" },
  { name: "FareedKhan-dev/production-grade-agentic-system", url: "https://github.com/FareedKhan-dev/production-grade-agentic-system", category: "agentic-ai", description: "Production-Grade Agentic AI System" },
  { name: "BrianRWagner/ai-marketing-skills", url: "https://github.com/BrianRWagner/ai-marketing-skills", category: "claude-code", description: "Marketing frameworks for Claude Code" },
  { name: "informatici/openhospital", url: "https://github.com/informatici/openhospital", category: "health", description: "Health Information Management System" },
  { name: "L1AD/claude-task-viewer", url: "https://github.com/L1AD/claude-task-viewer", category: "claude-code", description: "A real-time Kanban board for observing Claude Code tasks" },
  { name: "elliot35/deterministic-agent-control-protocol", url: "https://github.com/elliot35/deterministic-agent-control-protocol", category: "agentic-ai", description: "A governance gateway for AI agents" },
  { name: "EvoAgentX/Awesome-Self-Evolving-Agents", url: "https://github.com/EvoAgentX/Awesome-Self-Evolving-Agents", category: "agentic-ai", description: "A New Paradigm Bridging Foundation Models and Lifelong Agentic Systems" },
  { name: "grikdotnet/ai-stenographer", url: "https://github.com/grikdotnet/ai-stenographer", category: "productivity", description: "A desktop speech recognition application" },
  { name: "ancoleman/ai-design-components", url: "https://github.com/ancoleman/ai-design-components", category: "claude-code", description: "Full Stack development skills" },
  { name: "sickn33/antigravity-awesome-skills", url: "https://github.com/sickn33/antigravity-awesome-skills", category: "cli-tools", description: "The Ultimate Collection of 800+ Agentic Skills" },
  { name: "OpenCoworkAI/open-cowork", url: "https://github.com/OpenCoworkAI/open-cowork", category: "productivity", description: "Your Personal AI Agent Desktop App" },
  { name: "ognjengt/founder-skills", url: "https://github.com/ognjengt/founder-skills", category: "claude-code", description: "Skills that turn Claude into a Fortune 500 growth team" },
  { name: "virattt/dexter", url: "https://github.com/virattt/dexter", category: "finance", description: "An autonomous agent for deep financial research" },
  { name: "commaai/openpilot", url: "https://github.com/commaai/openpilot", category: "hardware", description: "Operating system for robotics" },
  { name: "The-Swarm-Corporation/AutoHedge", url: "https://github.com/The-Swarm-Corporation/AutoHedge", category: "finance", description: "Agent hedge fund that trades on your behalf" }
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
