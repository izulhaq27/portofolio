import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Experience } from "@/models/Experience";
import { getServerSession } from "next-auth/next";

export async function GET() {
  try {
    await connectDB();
    const experiences = await Experience.find({}).sort({ order: 1, createdAt: -1 });
    return NextResponse.json(experiences);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch experiences" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    await connectDB();
    const experience = await Experience.create(body);
    return NextResponse.json(experience, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create experience" }, { status: 500 });
  }
}
