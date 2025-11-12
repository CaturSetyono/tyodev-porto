import { withApiHandler } from "@/lib/api-middleware";

// Get current user info
export const GET = withApiHandler(
  async ({ adminSession }) => {
    return {
      data: { user: adminSession?.user },
    };
  },
  { requireAdmin: true, methods: ["GET"] }
);
