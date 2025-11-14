import { withApiHandler } from "@/lib/api-middleware";

// GET - Check admin authentication status
export const GET = withApiHandler(
  async ({ isAdmin, adminSession }) => {
    return {
      data: {
        isAuthenticated: isAdmin,
        session: adminSession
          ? {
              id: adminSession.id,
              username: adminSession.username,
            }
          : null,
      },
    };
  },
  { methods: ["GET"] }
);
