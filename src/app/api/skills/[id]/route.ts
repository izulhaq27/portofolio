import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Skill } from "@/models/Skill";
import { getServerSession } from "next-auth/next";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    await connectDB();
    
    const skill = await Skill.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    
    if (!skill) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }
    
    return NextResponse.json(skill);
  } catch (error: any) {
    console.error("Failed to update skill:", error);
    return NextResponse.json({ error: "Failed to update skill", details: error?.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const skill = await Skill.findByIdAndDelete(id);
    
    if (!skill) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }
    
    return NextResponse.json({ message: "Skill deleted successfully" });
  } catch (error: any) {
    console.error("Failed to delete skill:", error);
    return NextResponse.json({ error: "Failed to delete skill", details: error?.message }, { status: 500 });
  }
}
