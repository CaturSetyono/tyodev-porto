import { NextRequest, NextResponse } from "next/server";

import { supabaseAdmin } from "@/lib/supabase";
import { requireAdminAuth, createAdminErrorResponse } from "@/lib/admin-auth";

// GET - Fetch about info
export async function GET() {
  try {
    const { data: aboutInfo, error } = await supabaseAdmin
      .from("about_info")
      .select("*")
      .single();

    if (error && error.code !== "PGRST116") {
      console.error("Error fetching about info:", error);
      return NextResponse.json(
        { error: "Failed to fetch about info" },
        { status: 500 }
      );
    }

    // Return empty object if no data exists
    return NextResponse.json(aboutInfo || {});
  } catch (error) {
    console.error("Error in GET /api/admin/about:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT - Update about info
export async function PUT(request: NextRequest) {
  try {
    // Check admin authentication
    requireAdminAuth(request);

    const aboutData = await request.json();

    // Check if record exists
    const { data: existingData } = await supabaseAdmin
      .from("about_info")
      .select("id")
      .single();

    let result;
    if (existingData) {
      // Update existing record
      result = await supabaseAdmin
        .from("about_info")
        .update({
          ...aboutData,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existingData.id);
    } else {
      // Insert new record
      result = await supabaseAdmin.from("about_info").insert({
        ...aboutData,
        updated_at: new Date().toISOString(),
      });
    }

    if (result.error) {
      console.error("Error updating about info:", result.error);
      return NextResponse.json(
        { error: "Failed to update about info" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "About info updated successfully" });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return createAdminErrorResponse("Unauthorized", 401);
    }
    console.error("Error in PUT /api/admin/about:", error);
    return NextResponse.json(
      { error: "Failed to update about info" },
      { status: 500 }
    );
  }
}
