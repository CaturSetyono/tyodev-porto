import { supabase } from "@/lib/supabase";
import {
  withApiHandler,
  validateRequestBody,
  validationSchemas,
  handleDatabaseError,
} from "@/lib/api-middleware";

// POST - Send contact message
export const POST = withApiHandler(
  async ({ request }) => {
    const contactData = await validateRequestBody(request, (data: unknown) => {
      const body = data as Record<string, unknown>;
      return {
        name: validationSchemas.requiredString(body.name as string, "Name"),
        email: validationSchemas.email(body.email as string),
        subject:
          validationSchemas.optionalString(body.subject) ||
          "Contact Form Message",
        message: validationSchemas.requiredString(
          body.message as string,
          "Message"
        ),
      };
    });

    // Get client information for security
    const forwardedFor = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const ip = forwardedFor?.split(",")[0] || realIp || "unknown";
    const userAgent = request.headers.get("user-agent") || "";

    // Save to database (using contact_messages table as in original)
    const { data: message, error } = await supabase
      .from("contact_messages")
      .insert([
        {
          name: contactData.name.trim(),
          email: contactData.email.toLowerCase().trim(),
          subject: contactData.subject?.trim() || "",
          message: contactData.message.trim(),
          ip_address: ip,
          user_agent: userAgent,
          status: "unread",
        },
      ])
      .select()
      .single();

    if (error) {
      return handleDatabaseError(error, "send contact message");
    }

    return {
      data: {
        id: message.id,
        message: "Message sent successfully!",
      },
      message: "Contact message sent successfully",
    };
  },
  { methods: ["POST"] }
);
