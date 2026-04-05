import { NextResponse } from "next/server";
import pool from "@/lib/db";

// GET /api/admin/users - Get all users
export async function GET() {
  try {
    const [rows] = await pool.execute(
      `SELECT id, name, email, phone, role, is_active as isActive, created_at as createdAt 
       FROM users 
       ORDER BY created_at DESC`
    );
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
