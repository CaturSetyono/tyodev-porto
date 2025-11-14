import { withApiHandler } from "@/lib/api-middleware";

// GET - Check admin authentication status
export const GET = withApiHandler(
  async ({ isAdmin, adminSession }) => {
    return {
      data: {
        isAuthenticated: isAdmin,
        session: adminSession
          ? {
              id: adminSession.user.id,
              email: adminSession.user.email,
              fullName: adminSession.user.full_name || null,
              role: adminSession.user.role,
              expires: adminSession.expires,
            }
          : null,
      },
    };
  },
  { methods: ["GET"] }
);
