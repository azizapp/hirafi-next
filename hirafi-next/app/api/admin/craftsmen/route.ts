import { NextResponse } from "next/server";
import pool from "@/lib/db";

// GET /api/admin/craftsmen - Get all craftsmen
export async function GET() {
  try {
    const [rows] = await pool.execute(
      `SELECT id, name, specialty, location, rating, review_count as reviewCount, 
              experience, phone, email, verified, featured
       FROM craftsmen 
       ORDER BY created_at DESC`
    );
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching craftsmen:", error);
    return NextResponse.json(
      { error: "Failed to fetch craftsmen" },
      { status: 500 }
    );
  }
}
