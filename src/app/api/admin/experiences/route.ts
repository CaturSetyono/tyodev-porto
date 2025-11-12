import { NextRequest, NextResponse } from "next/server";

import { supabaseAdmin } from "@/lib/supabase";
import { requireAdminAuth, createAdminErrorResponse } from "@/lib/admin-auth";

// GET - Fetch all experiences
export async function GET() {
  try {
    const { data: experiences, error } = await supabaseAdmin
      .from("experiences")
      .select("*")
      .order("order_index", { ascending: true });

    if (error) {
      console.error("Error fetching experiences:", error);
      return NextResponse.json(
        { error: "Failed to fetch experiences" },
        { status: 500 }
      );
    }

    return NextResponse.json(experiences);
  } catch (error) {
    console.error("Error in GET /api/admin/experiences:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST - Create new experience
export async function POST(request: NextRequest) {
  try {
    // Check admin authentication
    requireAdminAuth(request);

    const experienceData = await request.json();

    // Validate required fields
    if (!experienceData.company || !experienceData.position) {
      return createAdminErrorResponse("Company and position are required", 400);
    }

    const { data: experience, error } = await supabaseAdmin
      .from("experiences")
      .insert([experienceData])
      .select()
      .single();

    if (error) {
      console.error("Error creating experience:", error);
      return NextResponse.json(
        { error: "Failed to create experience" },
        { status: 500 }
      );
    }

    return NextResponse.json({ experience }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return createAdminErrorResponse("Unauthorized", 401);
    }
    console.error("Error in POST /api/admin/experiences:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
