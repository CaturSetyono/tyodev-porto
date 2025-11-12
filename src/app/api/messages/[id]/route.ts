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

// GET - Fetch single message (admin only)
export async function GET(request: NextRequest, { params }: RouteParams) {
  return withApiHandler(
    async () => {
      const { id } = await params;

      const { data: message, error } = await supabaseAdmin
        .from("contact_messages")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        return handleDatabaseError(error, "fetch message");
      }

      return { data: message };
    },
    { requireAdmin: true, methods: ["GET"] }
  )(request);
}

// PUT - Update message status (admin only)
export async function PUT(request: NextRequest, { params }: RouteParams) {
  return withApiHandler(
    async ({ request: req }) => {
      const { id } = await params;

      const { status } = await validateRequestBody(req, (data: unknown) => {
        const body = data as Record<string, unknown>;
        return {
          status: validationSchemas.optionalString(body.status) || "read",
        };
      });

      const { data: message, error } = await supabaseAdmin
        .from("contact_messages")
        .update({ status })
        .eq("id", id)
        .select()
        .single();

      if (error) {
        return handleDatabaseError(error, "update message status");
      }

      return {
        data: message,
        message: "Message status updated successfully",
      };
    },
    { requireAdmin: true, methods: ["PUT"] }
  )(request);
}

// DELETE - Delete single message (admin only)
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  return withApiHandler(
    async () => {
      const { id } = await params;

      const { error } = await supabaseAdmin
        .from("contact_messages")
        .delete()
        .eq("id", id);

      if (error) {
        return handleDatabaseError(error, "delete message");
      }

      return {
        data: null,
        message: "Message deleted successfully",
      };
    },
    { requireAdmin: true, methods: ["DELETE"] }
  )(request);
}
