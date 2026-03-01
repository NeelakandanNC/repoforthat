import { db } from "@/db";
import { users } from "@/db/schema";
import { hashPassword, setSession, signToken } from "@/lib/auth";
import { eq, or } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { email, password, username } = await request.json();

        if (!email || !password || !username) {
            return NextResponse.json(
                { error: "Email, password, and username are required" },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = await db
            .select()
            .from(users)
            .where(or(eq(users.email, email), eq(users.username, username)))
            .limit(1);

        if (existingUser.length > 0) {
            return NextResponse.json(
                { error: "Email or username already taken" },
                { status: 409 }
            );
        }

        const hashedPassword = await hashPassword(password);

        const [newUser] = await db
            .insert(users)
            .values({
                email,
                password: hashedPassword,
                username,
            })
            .returning();

        const token = signToken({
            userId: newUser.id,
            email: newUser.email,
            username: newUser.username,
        });

        await setSession(token);

        return NextResponse.json({
            success: true,
            user: {
                id: newUser.id,
                email: newUser.email,
                username: newUser.username,
            },
        });
    } catch (error) {
        console.error("Signup error:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
