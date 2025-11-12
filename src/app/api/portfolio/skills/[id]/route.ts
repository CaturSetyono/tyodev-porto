import { NextRequest } from "next/server";

import { supabaseAdmin } from "@/lib/supabase";
import {
  withApiHandler,
  validateRequestBody,
  validationSchemas,
  handleDatabaseError,
} from "@/lib/api-middleware";

type RouteParams = {
  params: Promise<{ id: string }>;
};

// GET - Fetch single skill (admin only, for editing)
export async function GET(request: NextRequest, { params }: RouteParams) {
  return withApiHandler(
    async () => {
      const { id } = await params;

      const { data: skill, error } = await supabaseAdmin
        .from("skills")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        return handleDatabaseError(error, "fetch skill");
      }

      return { data: skill };
    },
    { requireAdmin: true, methods: ["GET"] }
  )(request);
}

// PUT - Update skill (admin only)
export async function PUT(request: NextRequest, { params }: RouteParams) {
  return withApiHandler(
    async ({ request: req }) => {
      const { id } = await params;

      const skillData = await validateRequestBody(req, (data: unknown) => {
        const body = data as Record<string, unknown>;
        return {
          name: validationSchemas.optionalString(body.name),
          category: validationSchemas.optionalString(body.category),
          proficiency_level: body.proficiency_level
            ? validationSchemas.requiredNumber(
                body.proficiency_level,
                "Proficiency level"
              )
            : undefined,
          icon_url: validationSchemas.optionalString(body.icon_url),
          order_index: body.order_index
            ? validationSchemas.requiredNumber(body.order_index, "Order index")
            : undefined,
          is_active:
            body.is_active !== undefined ? !!body.is_active : undefined,
          description: validationSchemas.optionalString(body.description),
        };
      });

      // Remove undefined values
      const updateData = Object.fromEntries(
        Object.entries(skillData).filter(([, value]) => value !== undefined)
      );

      const { data: skill, error } = await supabaseAdmin
        .from("skills")
        .update(updateData)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        return handleDatabaseError(error, "update skill");
      }

      return {
        data: skill,
        message: "Skill updated successfully",
      };
    },
    { requireAdmin: true, methods: ["PUT"] }
  )(request);
}

// DELETE - Delete skill (admin only)
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  return withApiHandler(
    async () => {
      const { id } = await params;

      const { error } = await supabaseAdmin
        .from("skills")
        .delete()
        .eq("id", id);

      if (error) {
        return handleDatabaseError(error, "delete skill");
      }

      return {
        data: null,
        message: "Skill deleted successfully",
      };
    },
    { requireAdmin: true, methods: ["DELETE"] }
  )(request);
}
