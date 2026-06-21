import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { ContactMessage } from "@/models/ContactMessage";
import { getServerSession } from "next-auth/next";

export async function GET() {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const count = await ContactMessage.countDocuments({ read: false });
    
    return NextResponse.json({ count });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch unread count" }, { status: 500 });
  }
}
