import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { publishAssessmentMarks } from '@/services/teacherService';

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== 'TEACHER' && user.role !== 'PRINCIPAL' && user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized to publish marks' }, { status: 403 });
    }

    const { assessmentId } = await req.json();
    if (!assessmentId) {
      return NextResponse.json({ error: 'Assessment ID is required' }, { status: 400 });
    }

    const result = await publishAssessmentMarks(assessmentId, user);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Publish marks error:', error);
    return NextResponse.json({ error: error.message || 'Failed to publish marks' }, { status: 500 });
  }
}
