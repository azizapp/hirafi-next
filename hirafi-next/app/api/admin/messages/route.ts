import { NextResponse } from "next/server";
import pool from "@/lib/db";

// GET /api/admin/messages - Get all contact messages
export async function GET() {
  try {
    const [rows] = await pool.execute(
      `SELECT id, name, phone, message, craftsman_id as craftsmanId, created_at as createdAt
       FROM contact_messages
       ORDER BY created_at DESC`
    );
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}
