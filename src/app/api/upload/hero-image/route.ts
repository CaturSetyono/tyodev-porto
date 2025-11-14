import { writeFile, mkdir } from "fs/promises";
import path from "path";

import { withApiHandler } from "@/lib/api-middleware";
import { supabaseAdmin } from "@/lib/supabase";

// POST - Upload hero profile image (admin only)
export const POST = withApiHandler(
  async ({ request }) => {
    try {
      const formData = await request.formData();
      const file = formData.get("file") as File;

      if (!file) {
        return {
          error: "No file uploaded",
          status: 400,
        };
      }

      // Validate file type
      const validTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
        "image/gif",
      ];
      if (!validTypes.includes(file.type)) {
        return {
          error:
            "Invalid file type. Please upload JPG, PNG, WebP, or GIF images only.",
          status: 400,
        };
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        return {
          error: "File too large. Maximum size is 5MB.",
          status: 400,
        };
      }

      // Generate unique filename
      const timestamp = Date.now();
      const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "");
      const extension = path.extname(originalName);
      const filename = `hero-${timestamp}${extension}`;

      // Create upload directory if it doesn't exist
      const uploadDir = path.join(process.cwd(), "public", "uploads", "hero");
      try {
        await mkdir(uploadDir, { recursive: true });
      } catch {
        // Directory might already exist
      }

      // Save file
      const filepath = path.join(uploadDir, filename);
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      await writeFile(filepath, buffer);

      // Generate public URL
      const publicUrl = `/uploads/hero/${filename}`;

      // Update hero section in database
      // Use profile_image_url as that's what exists in current database
      const updateField = "profile_image_url";

      const { data: existingHero } = await supabaseAdmin
        .from("hero_section")
        .select("id")
        .single();

      const updateData = { [updateField]: publicUrl };

      let result;
      if (existingHero) {
        result = await supabaseAdmin
          .from("hero_section")
          .update(updateData)
          .eq("id", existingHero.id)
          .select()
          .single();
      } else {
        result = await supabaseAdmin
          .from("hero_section")
          .insert([updateData])
          .select()
          .single();
      }

      if (result.error) {
        console.error("Database update failed:", result.error);
        return {
          error: `Failed to update database: ${result.error.message}`,
          status: 500,
        };
      }

      return {
        success: true,
        data: {
          filename,
          url: publicUrl,
          size: file.size,
          type: file.type,
        },
        message: "Profile image uploaded successfully",
      };
    } catch (error) {
      console.error("Upload error details:", error);

      // Return proper error structure
      const errorMessage =
        error instanceof Error ? error.message : "Failed to upload image";

      return {
        error: errorMessage,
        details:
          process.env.NODE_ENV === "development" ? String(error) : undefined,
        status: 500,
      };
    }
  },
  { requireAdmin: true, methods: ["POST"] }
);
