import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Project } from "@/models/Project";
import { getServerSession } from "next-auth/next";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    if (!body.thumbnail) {
      body.thumbnail = " "; // Bypass cached mongoose required validation
    }
    await connectDB();
    
    const project = await Project.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    
    return NextResponse.json(project);
  } catch (error: any) {
    console.error("Failed to update project:", error);
    return NextResponse.json({ error: "Failed to update project", details: error?.message }, { status: 500 });
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
    const project = await Project.findByIdAndDelete(id);
    
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    
    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error: any) {
    console.error("Failed to delete project:", error);
    return NextResponse.json({ error: "Failed to delete project", details: error?.message }, { status: 500 });
  }
}
