import { NextRequest, NextResponse } from 'next/server';
import { chatWithAI, AIProvider, ChatMessage } from '@/lib/ai-services';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, provider = 'gemini' }: { 
      messages: ChatMessage[], 
      provider?: AIProvider 
    } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' }, 
        { status: 400 }
      );
    }

    if (messages.length === 0) {
      return NextResponse.json(
        { error: 'At least one message is required' }, 
        { status: 400 }
      );
    }

    const response = await chatWithAI(messages, provider);

    return NextResponse.json({ 
      message: response,
      provider: provider
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    
    // Handle specific error messages
    const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan pada server';
    
    return NextResponse.json(
      { error: errorMessage }, 
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Chat API is working. Use POST method to send messages.' },
    { status: 200 }
  );
}