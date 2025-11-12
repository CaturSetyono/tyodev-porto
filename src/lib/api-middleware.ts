import { NextRequest, NextResponse } from "next/server";

import { getAdminSession, type AdminSession } from "./admin-auth";

export interface ApiContext {
  isAdmin: boolean;
  adminSession?: AdminSession | undefined;
  request: NextRequest;
}

export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  message?: string;
  cookies?: {
    set?: Array<{
      name: string;
      value: string;
      options?: {
        httpOnly?: boolean;
        secure?: boolean;
        sameSite?: "strict" | "lax" | "none";
        maxAge?: number;
        path?: string;
      };
    }>;
    delete?: Array<{
      name: string;
      options?: {
        httpOnly?: boolean;
        secure?: boolean;
        sameSite?: "strict" | "lax" | "none";
        maxAge?: number;
        path?: string;
      };
    }>;
  };
}

/**
 * Wrapper function for API routes that provides consistent error handling,
 * authentication checking, and response formatting
 */
export function withApiHandler<T = unknown>(
  handler: (context: ApiContext) => Promise<ApiResponse<T>>,
  options?: {
    requireAdmin?: boolean;
    methods?: string[];
  }
) {
  return async (request: NextRequest, _params?: unknown) => {
    try {
      // Method validation
      if (options?.methods && !options.methods.includes(request.method)) {
        return NextResponse.json(
          { error: `Method ${request.method} not allowed` },
          { status: 405 }
        );
      }

      // Authentication check
      const adminSession = getAdminSession(request);
      const isAdmin = !!adminSession;

      if (options?.requireAdmin && !isAdmin) {
        return NextResponse.json(
          { error: "Admin authentication required" },
          { status: 401 }
        );
      }

      // Create context
      const context: ApiContext = {
        isAdmin,
        adminSession: adminSession || undefined,
        request,
      };

      // Execute handler
      const result = await handler(context);

      // Handle response
      if (result.error) {
        return NextResponse.json({ error: result.error }, { status: 400 });
      }

      // Create response
      const response = NextResponse.json(
        {
          data: result.data,
          message: result.message,
        },
        { status: 200 }
      );

      // Handle cookies
      if (result.cookies?.set) {
        result.cookies.set.forEach((cookie) => {
          response.cookies.set(cookie.name, cookie.value, cookie.options || {});
        });
      }

      if (result.cookies?.delete) {
        result.cookies.delete.forEach((cookie) => {
          response.cookies.set(cookie.name, "", {
            ...(cookie.options || {}),
            maxAge: 0,
          });
        });
      }

      return response;
    } catch (error) {
      console.error("API Error:", error);

      // Handle specific error types
      if (error instanceof Error) {
        if (error.message === "Unauthorized") {
          return NextResponse.json(
            { error: "Authentication required" },
            { status: 401 }
          );
        }

        if (error.message.includes("validation")) {
          return NextResponse.json({ error: error.message }, { status: 400 });
        }
      }

      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  };
}

/**
 * Validation helper for request body
 */
export async function validateRequestBody<T>(
  request: NextRequest,
  schema: (data: unknown) => T | never
): Promise<T> {
  try {
    const body = await request.json();
    return schema(body);
  } catch {
    throw new Error("Invalid request body format");
  }
}

/**
 * Standard validation schemas
 */
export const validationSchemas = {
  email: (email: string) => {
    if (!email || typeof email !== "string") {
      throw new Error("Email is required");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email format");
    }
    return email;
  },

  requiredString: (value: string, fieldName: string) => {
    if (!value || typeof value !== "string" || value.trim().length === 0) {
      throw new Error(`${fieldName} is required`);
    }
    return value.trim();
  },

  optionalString: (value: unknown) => {
    return value && typeof value === "string" ? value.trim() : undefined;
  },

  requiredNumber: (value: unknown, fieldName: string) => {
    if (typeof value !== "number" || isNaN(value)) {
      throw new Error(`${fieldName} must be a valid number`);
    }
    return value;
  },
};

/**
 * Database error handler
 */
export function handleDatabaseError(error: unknown, operation: string) {
  console.error(`Database error in ${operation}:`, error);

  // Type guard for database errors with code property
  if (error && typeof error === "object" && "code" in error) {
    const dbError = error as { code: string };

    if (dbError.code === "PGRST116") {
      return { error: "Record not found" };
    }

    if (dbError.code === "23505") {
      return { error: "Record already exists" };
    }

    if (dbError.code === "23503") {
      return { error: "Referenced record not found" };
    }
  }

  return { error: `Failed to ${operation}` };
}
