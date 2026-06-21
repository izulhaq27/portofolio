import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    await connectDB();
    
    // Check if an admin already exists
    const existingAdmin = await User.findOne({ email: "admin@portfolio.com" });
    if (existingAdmin) {
      return NextResponse.json({ message: "Admin user already exists" }, { status: 400 });
    }

    // Create the admin user
    const hashedPassword = await bcrypt.hash("admin123", 10);
    await User.create({
      name: "Super Admin",
      email: "admin@portfolio.com",
      password: hashedPassword,
      role: "admin",
    });

    return NextResponse.json({ 
      message: "Admin created successfully!", 
      email: "admin@portfolio.com",
      password: "admin123",
      note: "Please log in using these credentials."
    }, { status: 201 });
    
  } catch (error: any) {
    console.error("Setup error:", error);
    return NextResponse.json({ 
      error: "Failed to set up admin user", 
      details: error?.message || String(error)
    }, { status: 500 });
  }
}
