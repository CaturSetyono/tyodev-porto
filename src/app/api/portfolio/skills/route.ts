import { supabase, supabaseAdmin } from "@/lib/supabase";
import { withApiHandler, validateRequestBody, validationSchemas, handleDatabaseError } from "@/lib/api-middleware";

// GET - Fetch skills (public shows only active, admin shows all)
export const GET = withApiHandler(
  async ({ isAdmin }) => {
    const query = isAdmin 
      ? supabaseAdmin.from("skills").select("*")
      : supabase.from("skills").select("*").eq("is_active", true);

    const { data: skills, error } = await query.order("order_index", { ascending: true });

    if (error) {
      return handleDatabaseError(error, "fetch skills");
    }

    return { data: skills || [] };
  },
  { methods: ["GET"] }
);

// POST - Create new skill (admin only)
export const POST = withApiHandler(
  async ({ request }) => {
    const skillData = await validateRequestBody(request, (data: unknown) => {
      const body = data as Record<string, unknown>;
      return {
        name: validationSchemas.requiredString(body.name as string, "Name"),
        category: validationSchemas.optionalString(body.category),
        proficiency_level: body.proficiency_level ? validationSchemas.requiredNumber(body.proficiency_level, "Proficiency level") : 80,
        icon_url: validationSchemas.optionalString(body.icon_url),
        order_index: body.order_index ? validationSchemas.requiredNumber(body.order_index, "Order index") : 0,
        is_active: body.is_active !== undefined ? !!body.is_active : true,
        description: validationSchemas.optionalString(body.description),
      };
    });

    const { data: skill, error } = await supabaseAdmin
      .from("skills")
      .insert([skillData])
      .select()
      .single();

    if (error) {
      return handleDatabaseError(error, "create skill");
    }

    return {
      data: skill,
      message: "Skill created successfully"
    };
  },
  { requireAdmin: true, methods: ["POST"] }
);