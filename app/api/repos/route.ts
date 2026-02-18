import { db } from "@/db";
import { repos } from "@/db/schema";
import { sql, eq, desc, and } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "25");
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    const offset = (page - 1) * limit;

    const conditions = [];
    if (category) {
        conditions.push(eq(repos.category, category));
    }
    if (search) {
        conditions.push(
            sql`(${repos.name} ILIKE ${"%" + search + "%"} OR ${repos.description} ILIKE ${"%" + search + "%"})`
        );
    }

    const where = conditions.length > 0 ? and(...conditions) : undefined;

    const [data, countResult] = await Promise.all([
        db
            .select()
            .from(repos)
            .where(where)
            .orderBy(desc(repos.createdAt))
            .limit(limit)
            .offset(offset),
        db
            .select({ count: sql<number>`count(*)` })
            .from(repos)
            .where(where),
    ]);

    const total = Number(countResult[0].count);

    return NextResponse.json({
        data,
        total,
        page,
        hasMore: offset + limit < total,
    });
}
