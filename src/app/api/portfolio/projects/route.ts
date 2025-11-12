import { supabase, supabaseAdmin } from "@/lib/supabase";
import {
  withApiHandler,
  validateRequestBody,
  validationSchemas,
  handleDatabaseError,
} from "@/lib/api-middleware";

// GET - Fetch projects (public shows only active, admin shows all)
export const GET = withApiHandler(
  async ({ isAdmin }) => {
    const query = isAdmin
      ? supabaseAdmin.from("projects").select("*")
      : supabase.from("projects").select("*").eq("status", "active");

    const { data: projects, error } = await query.order("order_index", {
      ascending: true,
    });

    if (error) {
      return handleDatabaseError(error, "fetch projects");
    }

    return { data: projects || [] };
  },
  { methods: ["GET"] }
);

// POST - Create new project (admin only)
export const POST = withApiHandler(
  async ({ request }) => {
    const projectData = await validateRequestBody(request, (data: unknown) => {
      const body = data as Record<string, unknown>;
      return {
        title: validationSchemas.requiredString(body.title as string, "Title"),
        description: validationSchemas.optionalString(body.description),
        content: validationSchemas.optionalString(body.content),
        technologies:
          body.technologies && Array.isArray(body.technologies)
            ? body.technologies
            : [],
        project_url: validationSchemas.optionalString(body.project_url),
        github_url: validationSchemas.optionalString(body.github_url),
        image_url: validationSchemas.optionalString(body.image_url),
        status: validationSchemas.optionalString(body.status) || "draft",
        order_index: body.order_index
          ? validationSchemas.requiredNumber(body.order_index, "Order index")
          : 0,
        featured: body.featured !== undefined ? !!body.featured : false,
        start_date: validationSchemas.optionalString(body.start_date),
        end_date: validationSchemas.optionalString(body.end_date),
      };
    });

    const { data: project, error } = await supabaseAdmin
      .from("projects")
      .insert([projectData])
      .select()
      .single();

    if (error) {
      return handleDatabaseError(error, "create project");
    }

    return {
      data: project,
      message: "Project created successfully",
    };
  },
  { requireAdmin: true, methods: ["POST"] }
);
