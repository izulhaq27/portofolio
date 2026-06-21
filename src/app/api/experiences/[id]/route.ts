import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Experience } from "@/models/Experience";
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
    
    const experience = await Experience.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    
    if (!experience) {
      return NextResponse.json({ error: "Experience not found" }, { status: 404 });
    }
    
    return NextResponse.json(experience);
  } catch (error: any) {
    console.error("Failed to update experience:", error);
    return NextResponse.json({ error: "Failed to update experience", details: error?.message }, { status: 500 });
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
    const experience = await Experience.findByIdAndDelete(id);
    
    if (!experience) {
      return NextResponse.json({ error: "Experience not found" }, { status: 404 });
    }
    
    return NextResponse.json({ message: "Experience deleted successfully" });
  } catch (error: any) {
    console.error("Failed to delete experience:", error);
    return NextResponse.json({ error: "Failed to delete experience", details: error?.message }, { status: 500 });
  }
}
