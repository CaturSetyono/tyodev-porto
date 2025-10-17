// Test script untuk chatbot API
// Jalankan dengan: node test-chatbot.mjs

const testChatbot = async () => {
  const baseUrl = "http://localhost:3000";

  console.log("🧪 Testing Chatbot API...\n");

  // Test 1: Health check
  try {
    console.log("1️⃣ Testing health check...");
    const healthResponse = await fetch(`${baseUrl}/api/chat`);
    const healthData = await healthResponse.json();
    console.log("✅ Health check:", healthData.message);
  } catch (error) {
    console.log("❌ Health check failed:", error.message);
  }

  // Test 2: Chat with Gemini
  try {
    console.log("\n2️⃣ Testing chat with Gemini...");
    const geminiResponse = await fetch(`${baseUrl}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: "Apa keahlian utama Anda?",
          },
        ],
        provider: "gemini",
      }),
    });

    const geminiData = await geminiResponse.json();
    if (geminiResponse.ok) {
      console.log(
        "✅ Gemini response:",
        geminiData.message.substring(0, 100) + "..."
      );
    } else {
      console.log("❌ Gemini error:", geminiData.error);
    }
  } catch (error) {
    console.log("❌ Gemini test failed:", error.message);
  }

  // Test 3: Chat with OpenAI
  try {
    console.log("\n3️⃣ Testing chat with OpenAI...");
    const openaiResponse = await fetch(`${baseUrl}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: "Ceritakan tentang pengalaman Anda sebagai developer",
          },
        ],
        provider: "openai",
      }),
    });

    const openaiData = await openaiResponse.json();
    if (openaiResponse.ok) {
      console.log(
        "✅ OpenAI response:",
        openaiData.message.substring(0, 100) + "..."
      );
    } else {
      console.log("❌ OpenAI error:", openaiData.error);
    }
  } catch (error) {
    console.log("❌ OpenAI test failed:", error.message);
  }

  console.log("\n🏁 Test completed!");
};

// Jalankan test jika server development sudah running
testChatbot();
