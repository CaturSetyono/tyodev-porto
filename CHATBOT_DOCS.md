# Chatbot Integration Documentation

## Overview

Chatbot yang terintegrasi dengan dua AI provider: Google Gemini dan Grok AI. Chatbot ini dirancang khusus untuk menjawab pertanyaan tentang portfolio dan keahlian developer.

## Features

- **Dual AI Provider**: Dapat menggunakan Gemini AI atau Grok AI
- **Context-Aware**: Bot memiliki konteks tentang portfolio dan keahlian
- **Real-time Chat**: Interface chat yang responsive dengan loading states
- **Provider Switching**: User dapat memilih AI provider secara real-time

## Setup Instructions

### 1. Environment Variables

Pastikan file `.env.local` berisi API keys yang valid:

```bash
GROK_API_KEY=your-grok-api-key-here
GEMINI_API_KEY=your-gemini-api-key-here
```

### 2. Dependencies

Dependencies yang dibutuhkan sudah terinstall:

- `@google/generative-ai` - SDK untuk Google Gemini
- `openai` - SDK untuk Grok AI (menggunakan OpenAI compatible API)

### 3. API Endpoints

#### POST /api/chat

Endpoint untuk mengirim pesan ke chatbot.

**Request Body:**

```json
{
  "messages": [
    {
      "role": "user",
      "content": "Apa keahlian utama Anda?"
    }
  ],
  "provider": "gemini" // atau "grok"
}
```

**Response:**

```json
{
  "message": "Saya memiliki keahlian dalam...",
  "provider": "gemini"
}
```

## Architecture

### File Structure

```
src/
├── app/api/chat/route.ts          # API endpoint untuk chat
├── lib/ai-services.ts             # Service layer untuk AI providers
├── types/chat.ts                  # TypeScript type definitions
└── components/contact-section.tsx # UI component untuk chatbot
```

### AI Services (`src/lib/ai-services.ts`)

- `chatWithGemini()` - Handler untuk Google Gemini API
- `chatWithGrok()` - Handler untuk Grok AI API
- `chatWithAI()` - Universal interface untuk kedua provider

### Portfolio Context

Bot memiliki konteks pre-built tentang:

- Nama dan profesi developer
- Keahlian teknis (Frontend, Backend, Mobile, Database, Cloud)
- Pengalaman kerja
- Jenis proyek yang pernah dikerjakan

## Usage

### Basic Chat

1. User mengetik pertanyaan di chat input
2. Memilih AI provider (Gemini/Grok)
3. Klik "Kirim" atau tekan Enter
4. Bot merespons berdasarkan konteks portfolio

### Provider Switching

User dapat berganti antara Gemini dan Grok AI kapan saja dengan mengklik tombol provider di atas chat area.

## API Configuration

### Gemini AI

- Model: `gemini-pro`
- Endpoint: Google Generative AI API
- Features: Chat history support, context-aware responses

### Grok AI

- Model: `grok-beta`
- Endpoint: X.AI API (OpenAI compatible)
- Features: High-quality responses, fast processing

## Error Handling

- Network errors
- Invalid API keys
- Rate limiting
- Malformed requests

## Security Considerations

- API keys stored in environment variables
- Input validation on both client and server
- Error messages don't expose sensitive information
- Rate limiting dapat ditambahkan di masa depan

## Customization

### Adding New AI Providers

1. Extend `AIProvider` type di `src/types/chat.ts`
2. Tambahkan handler function di `src/lib/ai-services.ts`
3. Update `chatWithAI()` function untuk include provider baru
4. Tambahkan UI button di `contact-section.tsx`

### Modifying Portfolio Context

Edit variabel `portfolioContext` di `src/lib/ai-services.ts` untuk mengupdate informasi tentang developer.

## Testing

- Test API endpoint: `GET /api/chat` untuk health check
- Test dengan berbagai jenis pertanyaan
- Test error scenarios (invalid API keys, network issues)

## Troubleshooting

### Common Issues

1. **API Key Invalid**: Pastikan API keys valid dan memiliki quota
2. **Network Errors**: Check koneksi internet dan status API providers
3. **TypeScript Errors**: Pastikan semua types sudah didefined dengan benar
4. **Slow Responses**: Normal untuk AI processing, tapi check network speed

### Debug Mode

Set `console.log` di `ai-services.ts` untuk debug API calls dan responses.
