import { db } from "@/db";
import { categories } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
    const data = await db.select().from(categories);
    return NextResponse.json(data);
}
