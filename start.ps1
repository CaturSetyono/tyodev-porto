Write-Host "🚀 Starting Chatbot Portfolio Development" -ForegroundColor Green
Write-Host "=======================================" -ForegroundColor Green

# Check if .env.local exists
if (-not (Test-Path ".env.local")) {
    Write-Host "❌ Error: .env.local file not found!" -ForegroundColor Red
    Write-Host "Please create .env.local with your API keys:" -ForegroundColor Yellow
    Write-Host "OPENAI_API_KEY=your-openai-api-key" -ForegroundColor Yellow
    Write-Host "GEMINI_API_KEY=your-gemini-api-key" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Environment file found" -ForegroundColor Green

# Install dependencies if needed
Write-Host "📦 Installing dependencies..." -ForegroundColor Cyan
npm install

# Start development server
Write-Host "🔥 Starting development server..." -ForegroundColor Cyan
Write-Host "Open http://localhost:3000 to see your portfolio" -ForegroundColor Yellow
Write-Host "Navigate to the Contact section to test the chatbot" -ForegroundColor Yellow
Write-Host ""
Write-Host "To test the API directly, run: node test-chatbot.mjs" -ForegroundColor Magenta
Write-Host ""

npm run dev