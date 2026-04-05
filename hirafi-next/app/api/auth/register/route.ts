import { NextResponse } from "next/server";
import pool from "@/lib/db";
import bcrypt from "bcryptjs";

// POST /api/auth/register
export async function POST(request: Request) {
  try {
    const { name, email, phone, password, role } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ success: false, error: "بيانات ناقصة" }, { status: 400 });
    }

    // Check if email already registered
    const [existing] = await pool.execute(
      `SELECT id FROM users WHERE email = ? LIMIT 1`,
      [email]
    );
    if ((existing as unknown[]).length > 0) {
      return NextResponse.json({ success: false, error: "البريد الإلكتروني مسجل مسبقاً" }, { status: 409 });
    }

    const hash = await bcrypt.hash(password, 10);
    const [result] = await pool.execute(
      `INSERT INTO users (name, email, phone, password_hash, role) VALUES (?, ?, ?, ?, ?)`,
      [name, email, phone || null, hash, role === "artisan" ? "artisan" : "client"]
    );

    const insertId = (result as { insertId: number }).insertId;
    return NextResponse.json({ success: true, userId: insertId }, { status: 201 });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json({ success: false, error: "خطأ في الخادم" }, { status: 500 });
  }
}
