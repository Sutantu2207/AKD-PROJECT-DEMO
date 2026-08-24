import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { queryRoleAwareAssistant } from '@/services/aiInsightService';

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized session' }, { status: 401 });
    }

    const { prompt, activeChildId } = await req.json();

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const result = await queryRoleAwareAssistant(prompt, user, activeChildId);
    return NextResponse.json(result);
  } catch (error) {
    console.error('AI assistant error:', error);
    return NextResponse.json(
      { reply: 'An error occurred while generating grounded academic insights.' },
      { status: 500 }
    );
  }
}
