import { NextRequest, NextResponse } from "next/server";

import { supabaseAdmin } from "@/lib/supabase";
import { requireAdminAuth, createAdminErrorResponse } from "@/lib/admin-auth";

// GET - Fetch all site settings
export async function GET() {
  try {
    const { data: settings, error } = await supabaseAdmin
      .from("site_settings")
      .select("*")
      .order("key", { ascending: true });

    if (error) {
      console.error("Error fetching settings:", error);
      return NextResponse.json(
        { error: "Failed to fetch settings" },
        { status: 500 }
      );
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error in GET /api/admin/settings:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT - Update site settings
export async function PUT(request: NextRequest) {
  try {
    // Check admin authentication
    requireAdminAuth(request);

    const settingsData = await request.json();

    // Update each setting
    const updatePromises = Object.entries(settingsData).map(
      async ([key, value]) => {
        const { error } = await supabaseAdmin
          .from("site_settings")
          .upsert(
            { key, value: value as string },
            { onConflict: "key", ignoreDuplicates: false }
          );

        if (error) {
          console.error(`Error updating setting ${key}:`, error);
          throw error;
        }
      }
    );

    await Promise.all(updatePromises);

    return NextResponse.json({ message: "Settings updated successfully" });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return createAdminErrorResponse("Unauthorized", 401);
    }
    console.error("Error in PUT /api/admin/settings:", error);
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    );
  }
}
