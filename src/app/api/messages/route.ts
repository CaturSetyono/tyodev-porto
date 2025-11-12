import { supabaseAdmin } from "@/lib/supabase";
import { withApiHandler, handleDatabaseError } from "@/lib/api-middleware";

// GET - Fetch all messages (admin only)
export const GET = withApiHandler(
  async () => {
    const { data: messages, error } = await supabaseAdmin
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return handleDatabaseError(error, "fetch messages");
    }

    return { data: messages || [] };
  },
  { requireAdmin: true, methods: ["GET"] }
);

// DELETE - Delete all read messages (admin only)
export const DELETE = withApiHandler(
  async () => {
    const { error } = await supabaseAdmin
      .from("contact_messages")
      .delete()
      .eq("status", "read");

    if (error) {
      return handleDatabaseError(error, "delete read messages");
    }

    return {
      data: null,
      message: "Read messages deleted successfully",
    };
  },
  { requireAdmin: true, methods: ["DELETE"] }
);
