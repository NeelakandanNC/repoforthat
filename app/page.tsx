import { db } from "@/db";
import { repos, categories } from "@/db/schema";
import { desc, sql } from "drizzle-orm";
import HomeClient from "./HomeClient";

export const dynamic = "force-dynamic";

export default async function Home() {
  // SSR: Fetch initial 25 repos and all categories
  const [initialRepos, allCategories] = await Promise.all([
    db.select().from(repos).orderBy(desc(repos.stars)).limit(25),
    db.select().from(categories),
  ]);

  const totalResult = await db
    .select({ count: sql<number>`count(*)` })
    .from(repos);
  const total = Number(totalResult[0].count);

  return (
    <HomeClient
      initialRepos={initialRepos}
      categories={allCategories}
      totalRepos={total}
    />
  );
}
