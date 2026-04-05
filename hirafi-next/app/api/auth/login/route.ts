import { NextResponse } from "next/server";
import pool from "@/lib/db";
import bcrypt from "bcryptjs";

// POST /api/auth/login
export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, error: "بيانات ناقصة" }, { status: 400 });
    }

    const [rows] = await pool.execute(
      `SELECT id, name, email, role, password_hash FROM users WHERE email = ? AND is_active = 1 LIMIT 1`,
      [email]
    );

    const users = rows as { id: number; name: string; email: string; role: string; password_hash: string }[];
    if (users.length === 0) {
      return NextResponse.json({ success: false, error: "البريد الإلكتروني أو كلمة المرور غير صحيحة" }, { status: 401 });
    }

    const user = users[0];
    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      return NextResponse.json({ success: false, error: "البريد الإلكتروني أو كلمة المرور غير صحيحة" }, { status: 401 });
    }

    // Return user without password
    const { password_hash: _, ...safeUser } = user;
    return NextResponse.json({ success: true, user: safeUser });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ success: false, error: "خطأ في الخادم" }, { status: 500 });
  }
}
