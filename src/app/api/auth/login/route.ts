import bcrypt from "bcryptjs";

import { supabaseAdmin } from "@/lib/supabase";
import {
  withApiHandler,
  validateRequestBody,
  validationSchemas,
} from "@/lib/api-middleware";

// Login endpoint
export const POST = withApiHandler(
  async ({ request }) => {
    const { email, password } = await validateRequestBody(
      request,
      (data: unknown) => {
        const body = data as Record<string, unknown>;
        return {
          email: validationSchemas.email(body.email as string),
          password: validationSchemas.requiredString(
            body.password as string,
            "Password"
          ),
        };
      }
    );

    // Check if user exists in admin_users table
    const { data: adminUser, error: fetchError } = await supabaseAdmin
      .from("admin_users")
      .select("*")
      .eq("email", email)
      .eq("is_active", true)
      .single();

    if (fetchError || !adminUser) {
      return { error: "Invalid credentials" };
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(
      password,
      adminUser.password_hash
    );

    if (!isValidPassword) {
      return { error: "Invalid credentials" };
    }

    // Update last login
    await supabaseAdmin
      .from("admin_users")
      .update({ last_login_at: new Date().toISOString() })
      .eq("id", adminUser.id);

    // Create session
    const session = {
      user: {
        id: adminUser.id,
        email: adminUser.email,
        full_name: adminUser.full_name,
        role: adminUser.role,
      },
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    };

    return {
      data: {
        message: "Login successful",
        user: session.user,
      },
      cookies: {
        set: [
          {
            name: "admin-session",
            value: JSON.stringify(session),
            options: {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              sameSite: "strict",
              maxAge: 24 * 60 * 60,
              path: "/",
            },
          },
        ],
      },
    };
  },
  { methods: ["POST"] }
);
