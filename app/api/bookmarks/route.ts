import { db } from "@/db";
import { bookmarks } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userBookmarks = await db
        .select()
        .from(bookmarks)
        .where(eq(bookmarks.userId, session.userId));

    return NextResponse.json({ bookmarks: userBookmarks });
}

export async function POST(request: NextRequest) {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { repoId } = await request.json();

        if (!repoId) {
            return NextResponse.json({ error: "repoId is required" }, { status: 400 });
        }

        // Check if bookmark already exists
        const existing = await db
            .select()
            .from(bookmarks)
            .where(
                and(
                    eq(bookmarks.userId, session.userId),
                    eq(bookmarks.repoId, repoId)
                )
            )
            .limit(1);

        if (existing.length > 0) {
            // Remove bookmark (toggle off)
            await db
                .delete(bookmarks)
                .where(
                    and(
                        eq(bookmarks.userId, session.userId),
                        eq(bookmarks.repoId, repoId)
                    )
                );
            return NextResponse.json({ success: true, action: "removed" });
        } else {
            // Add bookmark
            await db.insert(bookmarks).values({
                userId: session.userId,
                repoId: repoId,
            });
            return NextResponse.json({ success: true, action: "added" });
        }
    } catch (error) {
        console.error("Bookmark error:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
