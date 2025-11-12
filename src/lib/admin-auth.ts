import { NextRequest } from "next/server";

export interface AdminSession {
  user: {
    id: string;
    email: string;
    full_name?: string;
    role: string;
  };
  expires: Date;
}

export function getAdminSession(request: NextRequest): AdminSession | null {
  try {
    const sessionCookie = request.cookies.get("admin-session");

    if (!sessionCookie) {
      return null;
    }

    const session: AdminSession = JSON.parse(sessionCookie.value);

    // Check if session is expired
    if (new Date() > new Date(session.expires)) {
      return null;
    }

    return session;
  } catch (error) {
    console.error("Error parsing admin session:", error);
    return null;
  }
}

export function requireAdminAuth(request: NextRequest): AdminSession {
  const session = getAdminSession(request);

  if (!session) {
    throw new Error("Unauthorized");
  }

  return session;
}

export function createAdminResponse(data: unknown, status: number = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function createAdminErrorResponse(
  message: string,
  status: number = 400
) {
  return createAdminResponse({ error: message }, status);
}
