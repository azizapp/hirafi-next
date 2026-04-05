import { NextResponse } from "next/server";
import pool from "@/lib/db";

type Params = { params: Promise<{ id: string }> };

// GET /api/craftsmen/[id]
export async function GET(_req: Request, { params }: Params) {
  const { id } = await params;
  try {
    const [rows] = await pool.execute(
      `SELECT * FROM v_artisans_full WHERE artisan_id = ? LIMIT 1`,
      [id]
    );
    const artisans = rows as unknown[];
    if (artisans.length === 0) {
      return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    }
    // Fetch services
    const [services] = await pool.execute(
      `SELECT name, price_label AS price FROM services WHERE artisan_id = ?`,
      [id]
    );
    // Fetch reviews
    const [reviews] = await pool.execute(
      `SELECT * FROM v_latest_reviews WHERE artisan_id = ? LIMIT 20`,
      [id]
    );

    return NextResponse.json({
      success: true,
      data: { ...artisans[0] as object, services, reviews },
    });
  } catch (error) {
    console.error("DB error:", error);
    return NextResponse.json({ success: false, error: "Database error" }, { status: 500 });
  }
}
