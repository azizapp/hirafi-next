import { NextResponse } from "next/server";
import pool from "@/lib/db";

// GET /api/admin/stats - Get dashboard statistics
export async function GET() {
  try {
    // Get total users
    const [usersResult] = await pool.execute(
      "SELECT COUNT(*) as count FROM users"
    );
    const totalUsers = (usersResult as { count: number }[])[0].count;

    // Get total craftsmen (users with role = 'artisan')
    const [craftsmenResult] = await pool.execute(
      "SELECT COUNT(*) as count FROM users WHERE role = 'artisan'"
    );
    const totalCraftsmen = (craftsmenResult as { count: number }[])[0].count;

    // Get total categories
    const [categoriesResult] = await pool.execute(
      "SELECT COUNT(*) as count FROM categories"
    );
    const totalCategories = (categoriesResult as { count: number }[])[0].count;

    // Get total reviews
    const [reviewsResult] = await pool.execute(
      "SELECT COUNT(*) as count FROM reviews"
    );
    const totalReviews = (reviewsResult as { count: number }[])[0].count;

    // Get pending verifications (unverified craftsmen)
    const [pendingResult] = await pool.execute(
      "SELECT COUNT(*) as count FROM craftsmen WHERE verified = 0"
    );
    const pendingVerifications = (pendingResult as { count: number }[])[0].count;

    // Get new users this month
    const [newUsersResult] = await pool.execute(
      `SELECT COUNT(*) as count FROM users 
       WHERE created_at >= DATE_FORMAT(NOW(), '%Y-%m-01')`
    );
    const newUsersThisMonth = (newUsersResult as { count: number }[])[0].count;

    return NextResponse.json({
      totalUsers,
      totalCraftsmen,
      totalCategories,
      totalReviews,
      pendingVerifications,
      newUsersThisMonth,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch statistics" },
      { status: 500 }
    );
  }
}
