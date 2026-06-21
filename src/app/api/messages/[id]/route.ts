import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { ContactMessage } from "@/models/ContactMessage";
import { getServerSession } from "next-auth/next";

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const message = await ContactMessage.findByIdAndDelete(id);
    
    if (!message) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }
    
    return NextResponse.json({ message: "Message deleted successfully" });
  } catch (error: any) {
    console.error("Failed to delete message:", error);
    return NextResponse.json({ error: "Failed to delete message", details: error?.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    await connectDB();
    
    const message = await ContactMessage.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json(message);
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to update message" }, { status: 500 });
  }
}
