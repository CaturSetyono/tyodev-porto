import { supabase, supabaseAdmin } from "@/lib/supabase";
import {
  withApiHandler,
  validateRequestBody,
  validationSchemas,
  handleDatabaseError,
} from "@/lib/api-middleware";

// GET - Fetch about info (public)
export const GET = withApiHandler(
  async () => {
    const { data: aboutInfo, error } = await supabase
      .from("about_info")
      .select("*")
      .single();

    if (error && error.code !== "PGRST116") {
      return handleDatabaseError(error, "fetch about info");
    }

    return { data: aboutInfo || {} };
  },
  { methods: ["GET"] }
);

// PUT - Update about info (admin only)
export const PUT = withApiHandler(
  async ({ request }) => {
    const aboutData = await validateRequestBody(request, (data: unknown) => {
      const body = data as Record<string, unknown>;
      return {
        title: validationSchemas.optionalString(body.title),
        description: validationSchemas.optionalString(body.description),
        content: validationSchemas.optionalString(body.content),
        profile_image_url: validationSchemas.optionalString(
          body.profile_image_url
        ),
        resume_url: validationSchemas.optionalString(body.resume_url),
        years_of_experience: body.years_of_experience
          ? validationSchemas.requiredNumber(
              body.years_of_experience,
              "Years of experience"
            )
          : undefined,
      };
    });

    // Check if about info already exists
    const { data: existingAbout } = await supabaseAdmin
      .from("about_info")
      .select("id")
      .single();

    let result;
    if (existingAbout) {
      // Update existing
      result = await supabaseAdmin
        .from("about_info")
        .update(aboutData)
        .eq("id", existingAbout.id)
        .select()
        .single();
    } else {
      // Create new
      result = await supabaseAdmin
        .from("about_info")
        .insert([aboutData])
        .select()
        .single();
    }

    if (result.error) {
      return handleDatabaseError(result.error, "update about info");
    }

    return {
      data: result.data,
      message: "About info updated successfully",
    };
  },
  { requireAdmin: true, methods: ["PUT"] }
);
