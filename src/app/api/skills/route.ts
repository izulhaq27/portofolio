import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Skill } from "@/models/Skill";
import { getServerSession } from "next-auth/next";

export async function GET() {
  try {
    await connectDB();
    const skills = await Skill.find().sort({ createdAt: 1 });
    return NextResponse.json(skills);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 });
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
    
    const skill = await Skill.create(body);
    return NextResponse.json(skill, { status: 201 });
  } catch (error: any) {
    console.error("Failed to create skill:", error);
    return NextResponse.json({ error: "Failed to create skill", details: error?.message }, { status: 500 });
  }
}
