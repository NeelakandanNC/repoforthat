import { db } from "@/db";
import { repos, categories } from "@/db/schema";
import { desc, eq, sql } from "drizzle-orm";
import HomeClient from "./HomeClient";

export const dynamic = "force-dynamic";

export default async function Home() {
  // SSR: Fetch initial 25 FOSS repos (default tab) and all categories
  const [initialRepos, allCategories] = await Promise.all([
    db
      .select()
      .from(repos)
      .where(eq(repos.type, "foss"))
      .orderBy(desc(repos.createdAt))
      .limit(25),
    db.select().from(categories),
  ]);

  // Get counts per type
  const [fossCountResult, agentCountResult] = await Promise.all([
    db
      .select({ count: sql<number>`count(*)` })
      .from(repos)
      .where(eq(repos.type, "foss")),
    db
      .select({ count: sql<number>`count(*)` })
      .from(repos)
      .where(eq(repos.type, "agent")),
  ]);

  const fossCount = Number(fossCountResult[0].count);
  const agentCount = Number(agentCountResult[0].count);
  const total = fossCount + agentCount;

  return (
    <HomeClient
      initialRepos={initialRepos}
      categories={allCategories}
      totalRepos={total}
      fossCount={fossCount}
      agentCount={agentCount}
    />
  );
}
