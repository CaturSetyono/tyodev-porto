import { NextRequest } from "next/server";

import { supabase, supabaseAdmin } from "@/lib/supabase";
import {
  withApiHandler,
  validateRequestBody,
  validationSchemas,
  handleDatabaseError,
} from "@/lib/api-middleware";

type RouteParams = {
  params: Promise<{ id: string }>;
};

// GET - Fetch single project (public if active, admin can see all)
export async function GET(request: NextRequest, { params }: RouteParams) {
  return withApiHandler(
    async ({ isAdmin }) => {
      const { id } = await params;

      const query = isAdmin
        ? supabaseAdmin.from("projects").select("*").eq("id", id)
        : supabase
            .from("projects")
            .select("*")
            .eq("id", id)
            .eq("status", "active");

      const { data: project, error } = await query.single();

      if (error) {
        return handleDatabaseError(error, "fetch project");
      }

      return { data: project };
    },
    { methods: ["GET"] }
  )(request);
}

// PUT - Update project (admin only)
export async function PUT(request: NextRequest, { params }: RouteParams) {
  return withApiHandler(
    async ({ request: req }) => {
      const { id } = await params;

      const projectData = await validateRequestBody(req, (data: unknown) => {
        const body = data as Record<string, unknown>;
        return {
          title: validationSchemas.optionalString(body.title),
          description: validationSchemas.optionalString(body.description),
          content: validationSchemas.optionalString(body.content),
          technologies:
            body.technologies && Array.isArray(body.technologies)
              ? body.technologies
              : undefined,
          project_url: validationSchemas.optionalString(body.project_url),
          github_url: validationSchemas.optionalString(body.github_url),
          image_url: validationSchemas.optionalString(body.image_url),
          status: validationSchemas.optionalString(body.status),
          order_index: body.order_index
            ? validationSchemas.requiredNumber(body.order_index, "Order index")
            : undefined,
          featured: body.featured !== undefined ? !!body.featured : undefined,
          start_date: validationSchemas.optionalString(body.start_date),
          end_date: validationSchemas.optionalString(body.end_date),
        };
      });

      // Remove undefined values
      const updateData = Object.fromEntries(
        Object.entries(projectData).filter(([, value]) => value !== undefined)
      );

      const { data: project, error } = await supabaseAdmin
        .from("projects")
        .update(updateData)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        return handleDatabaseError(error, "update project");
      }

      return {
        data: project,
        message: "Project updated successfully",
      };
    },
    { requireAdmin: true, methods: ["PUT"] }
  )(request);
}

// DELETE - Delete project (admin only)
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  return withApiHandler(
    async () => {
      const { id } = await params;

      const { error } = await supabaseAdmin
        .from("projects")
        .delete()
        .eq("id", id);

      if (error) {
        return handleDatabaseError(error, "delete project");
      }

      return {
        data: null,
        message: "Project deleted successfully",
      };
    },
    { requireAdmin: true, methods: ["DELETE"] }
  )(request);
}
