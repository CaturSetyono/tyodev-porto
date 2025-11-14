import { supabase, supabaseAdmin } from "@/lib/supabase";
import {
  withApiHandler,
  validateRequestBody,
  validationSchemas,
  handleDatabaseError,
} from "@/lib/api-middleware";

// GET - Fetch hero section (public)
export const GET = withApiHandler(
  async () => {
    const { data: heroSection, error } = await supabase
      .from("hero_section")
      .select("*")
      .single();

    if (error && error.code !== "PGRST116") {
      return handleDatabaseError(error, "fetch hero section");
    }

    // Return data as-is without confusing field mapping
    const mappedData = heroSection || {};

    return { data: mappedData };
  },
  { methods: ["GET"] }
);

// PUT - Update hero section (admin only)
export const PUT = withApiHandler(
  async ({ request }) => {
    const heroData = await validateRequestBody(request, (data: unknown) => {
      const body = data as Record<string, unknown>;
      return {
        greeting: validationSchemas.optionalString(body.greeting),
        name: validationSchemas.optionalString(body.name),
        title: validationSchemas.optionalString(body.title),
        subtitle: validationSchemas.optionalString(body.subtitle),
        description: validationSchemas.optionalString(body.description),
        profile_image_url: validationSchemas.optionalString(
          body.profile_image_url
        ),
        cta_text: validationSchemas.optionalString(body.cta_text), // CTA button text
        cta_url: validationSchemas.optionalString(body.cta_url), // CTA button URL
      };
    });

    // Check if hero section already exists
    const { data: existingHero } = await supabaseAdmin
      .from("hero_section")
      .select("id")
      .single();

    let result;
    if (existingHero) {
      // Update existing
      result = await supabaseAdmin
        .from("hero_section")
        .update(heroData)
        .eq("id", existingHero.id)
        .select()
        .single();
    } else {
      // Create new
      result = await supabaseAdmin
        .from("hero_section")
        .insert([heroData])
        .select()
        .single();
    }

    if (result.error) {
      return handleDatabaseError(result.error, "update hero section");
    }

    return {
      data: result.data,
      message: "Hero section updated successfully",
    };
  },
  { requireAdmin: true, methods: ["PUT"] }
);
