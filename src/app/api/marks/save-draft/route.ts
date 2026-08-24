import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { saveMarksDraft } from '@/services/teacherService';

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== 'TEACHER' && user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized to enter marks' }, { status: 403 });
    }

    const { assessmentId, marksData } = await req.json();

    if (!assessmentId || !Array.isArray(marksData)) {
      return NextResponse.json({ error: 'Invalid mark entry payload' }, { status: 400 });
    }

    const result = await saveMarksDraft(assessmentId, marksData, user);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Save marks draft error:', error);
    return NextResponse.json({ error: error.message || 'Failed to save marks draft' }, { status: 500 });
  }
}
