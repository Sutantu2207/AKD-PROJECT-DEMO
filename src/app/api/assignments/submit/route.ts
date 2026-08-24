import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { submitStudentAssignment } from '@/services/studentService';

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'STUDENT') {
      return NextResponse.json({ error: 'Only enrolled students can submit assignments' }, { status: 403 });
    }

    if (!user.studentProfileId) {
      return NextResponse.json({ error: 'Student profile required' }, { status: 403 });
    }

    const { assignmentId, submissionText } = await req.json();

    if (!assignmentId || !submissionText) {
      return NextResponse.json({ error: 'Assignment ID and submission text are required' }, { status: 400 });
    }

    const result = await submitStudentAssignment(user.studentProfileId, assignmentId, submissionText);
    return NextResponse.json({ success: true, submission: result });
  } catch (error: any) {
    console.error('Assignment submission error:', error);
    return NextResponse.json({ error: error.message || 'Failed to submit assignment' }, { status: 500 });
  }
}
