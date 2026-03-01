import { db } from "@/db";
import { users } from "@/db/schema";
import { comparePassword, setSession, signToken } from "@/lib/auth";
import { eq, or } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { identifier, password } = await request.json(); // identifier is email or username

        if (!identifier || !password) {
            return NextResponse.json(
                { error: "Identifier and password are required" },
                { status: 400 }
            );
        }

        const [user] = await db
            .select()
            .from(users)
            .where(or(eq(users.email, identifier), eq(users.username, identifier)))
            .limit(1);

        if (!user) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            );
        }

        const isPasswordCorrect = await comparePassword(password, user.password);

        if (!isPasswordCorrect) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            );
        }

        const token = signToken({
            userId: user.id,
            email: user.email,
            username: user.username,
        });

        await setSession(token);

        return NextResponse.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
            },
        });
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
