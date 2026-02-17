import { db } from "@/db";
import { subscribers } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email } = body;

        if (!email || !email.includes("@")) {
            return NextResponse.json({ error: "Invalid email" }, { status: 400 });
        }

        await db.insert(subscribers).values({ email });

        return NextResponse.json({ success: true, message: "Subscribed!" });
    } catch (error: any) {
        // Handle unique constraint violation (duplicate email)
        if (error?.message?.includes("unique") || error?.message?.includes("duplicate")) {
            return NextResponse.json(
                { error: "duplicate", message: "Already subscribed" },
                { status: 409 }
            );
        }
        return NextResponse.json(
            { error: "Server error" },
            { status: 500 }
        );
    }
}
