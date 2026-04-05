import { NextResponse } from "next/server";
import pool from "@/lib/db";

// POST /api/contact
export async function POST(request: Request) {
  try {
    const { artisanId, clientName, clientPhone, clientEmail, message } = await request.json();

    if (!artisanId || !clientName || !clientPhone || !message) {
      return NextResponse.json({ success: false, error: "بيانات ناقصة" }, { status: 400 });
    }

    await pool.execute(
      `INSERT INTO contact_requests (artisan_id, client_name, client_phone, client_email, message) VALUES (?, ?, ?, ?, ?)`,
      [artisanId, clientName, clientPhone, clientEmail || null, message]
    );

    return NextResponse.json({ success: true, message: "تم إرسال طلبك بنجاح" }, { status: 201 });
  } catch (error) {
    console.error("Contact error:", error);
    return NextResponse.json({ success: false, error: "خطأ في الخادم" }, { status: 500 });
  }
}
