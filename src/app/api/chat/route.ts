import {
  chatWithAI,
  type AIProvider,
  type ChatMessage,
} from "@/lib/ai-services";
import { withApiHandler, validateRequestBody } from "@/lib/api-middleware";

// POST - Chat with AI
export const POST = withApiHandler(
  async ({ request }) => {
    const { messages, provider = "gemini" } = await validateRequestBody(
      request,
      (data: unknown) => {
        const body = data as Record<string, unknown>;

        if (!body.messages || !Array.isArray(body.messages)) {
          throw new Error("Messages array is required");
        }

        if (body.messages.length === 0) {
          throw new Error("At least one message is required");
        }

        return {
          messages: body.messages as ChatMessage[],
          provider: (body.provider as AIProvider) || "gemini",
        };
      }
    );

    const response = await chatWithAI(messages, provider);

    return {
      data: {
        message: response,
        provider: provider,
      },
    };
  },
  { methods: ["POST"] }
);

// GET - API status
export const GET = withApiHandler(
  async () => {
    return {
      data: {
        message: "Chat API is working. Use POST method to send messages.",
        status: "healthy",
      },
    };
  },
  { methods: ["GET"] }
);
