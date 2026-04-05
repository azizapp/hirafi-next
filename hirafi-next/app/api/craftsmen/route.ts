import { NextResponse } from "next/server";
import pool from "@/lib/db";

// GET /api/craftsmen?search=...&category=...
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search   = searchParams.get("search")   || "";
  const category = searchParams.get("category") || "";
  const featured = searchParams.get("featured");

  try {
    let query = `SELECT * FROM v_artisans_full WHERE 1=1`;
    const params: string[] = [];

    if (search) {
      query += ` AND (artisan_name LIKE ? OR specialty LIKE ? OR location LIKE ?)`;
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }
    if (category) {
      query += ` AND specialty = ?`;
      params.push(category);
    }
    if (featured === "true") {
      query += ` AND is_featured = 1 AND is_verified = 1`;
    }

    query += ` ORDER BY rating DESC`;

    const [rows] = await pool.execute(query, params);
    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    console.error("DB error:", error);
    return NextResponse.json({ success: false, error: "Database error" }, { status: 500 });
  }
}
