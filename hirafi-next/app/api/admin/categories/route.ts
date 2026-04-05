import { NextResponse } from "next/server";
import pool from "@/lib/db";

// GET /api/admin/categories - Get all categories
export async function GET() {
  try {
    const [rows] = await pool.execute(
      `SELECT c.id, c.name, c.icon, 
              (SELECT COUNT(*) FROM craftsmen WHERE specialty = c.name) as count
       FROM categories c
       ORDER BY c.name`
    );
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

// POST /api/admin/categories - Create new category
export async function POST(request: Request) {
  try {
    const { name, icon } = await request.json();

    if (!name || !name.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const [result] = await pool.execute(
      "INSERT INTO categories (name, icon) VALUES (?, ?)",
      [name.trim(), icon || "LayoutGrid"]
    );

    const insertId = (result as { insertId: number }).insertId;
    
    return NextResponse.json({
      id: insertId.toString(),
      name: name.trim(),
      icon: icon || "LayoutGrid",
      count: 0,
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
}
