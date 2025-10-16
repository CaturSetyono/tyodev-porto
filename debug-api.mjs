// Debug script untuk melihat error API
import fetch from "node-fetch";

const testAPI = async () => {
  try {
    console.log("Testing API at http://localhost:3001/api/chat");

    const response = await fetch("http://localhost:3001/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: "Halo, siapa Anda?",
          },
        ],
        provider: "gemini",
      }),
    });

    console.log("Status:", response.status);
    const data = await response.text();
    console.log("Response:", data);
  } catch (error) {
    console.error("Error details:", error);
  }
};

testAPI();
