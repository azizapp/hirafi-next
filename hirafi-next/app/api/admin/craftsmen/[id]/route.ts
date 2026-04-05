import { NextResponse } from "next/server";
import pool from "@/lib/db";

// PATCH /api/admin/craftsmen/[id] - Update craftsman (verified/featured)
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { verified, featured } = body;

    // Build update query dynamically
    const updates: string[] = [];
    const values: (number | string)[] = [];

    if (typeof verified === "boolean") {
      updates.push("verified = ?");
      values.push(verified ? 1 : 0);
    }
    if (typeof featured === "boolean") {
      updates.push("featured = ?");
      values.push(featured ? 1 : 0);
    }

    if (updates.length === 0) {
      return NextResponse.json({ error: "No fields to update" }, { status: 400 });
    }

    values.push(id);
    await pool.execute(
      `UPDATE craftsmen SET ${updates.join(", ")} WHERE id = ?`,
      values
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating craftsman:", error);
    return NextResponse.json(
      { error: "Failed to update craftsman" },
      { status: 500 }
    );
  }
}
