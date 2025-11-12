import { withApiHandler } from "@/lib/api-middleware";

// Logout endpoint
export const POST = withApiHandler(
  async () => {
    return {
      data: {
        message: "Logout successful",
      },
      cookies: {
        delete: [
          {
            name: "admin-session",
            options: {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              sameSite: "strict",
              path: "/",
            },
          },
        ],
      },
    };
  },
  { methods: ["POST"] }
);
