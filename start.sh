#!/bin/bash

echo "🚀 Starting Chatbot Portfolio Development"
echo "======================================="

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ Error: .env.local file not found!"
    echo "Please create .env.local with your API keys:"
    echo "GROK_API_KEY=your-grok-api-key"
    echo "GEMINI_API_KEY=your-gemini-api-key"
    exit 1
fi

echo "✅ Environment file found"

# Install dependencies if needed
echo "📦 Installing dependencies..."
npm install

# Start development server
echo "🔥 Starting development server..."
echo "Open http://localhost:3000 to see your portfolio"
echo "Navigate to the Contact section to test the chatbot"
echo ""
echo "To test the API directly, run: node test-chatbot.mjs"
echo ""

npm run dev