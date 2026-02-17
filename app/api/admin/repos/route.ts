import { db } from "@/db";
import { repos } from "@/db/schema";
import { extractRepoName } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const adminSecret = request.headers.get("x-admin-secret");

    if (!adminSecret || adminSecret !== process.env.ADMIN_SECRET) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { url, category, stars, description } = body;

        if (!url || !category) {
            return NextResponse.json(
                { error: "url and category are required" },
                { status: 400 }
            );
        }

        const name = extractRepoName(url);

        const result = await db.insert(repos).values({
            name,
            url,
            category,
            stars: stars || 0,
            description: description || null,
        }).returning();

        return NextResponse.json({ success: true, data: result[0] });
    } catch (error: any) {
        if (error?.message?.includes("unique") || error?.message?.includes("duplicate")) {
            return NextResponse.json(
                { error: "Repo already exists" },
                { status: 409 }
            );
        }
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
