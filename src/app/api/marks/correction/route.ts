import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { submitMarkCorrectionRequest } from '@/services/teacherService';
import { reviewCorrectionRequest } from '@/services/principalService';

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();

    // If teacher requesting correction
    if (user.role === 'TEACHER') {
      if (!user.teacherProfileId) {
        return NextResponse.json({ error: 'Teacher profile required' }, { status: 403 });
      }
      const { markId, requestedMarks, reason } = body;
      const result = await submitMarkCorrectionRequest(markId, user.teacherProfileId, Number(requestedMarks), reason, user);
      return NextResponse.json({ success: true, request: result });
    }

    // If principal or admin reviewing correction
    if (user.role === 'PRINCIPAL' || user.role === 'ADMIN' || user.role === 'SUPER_ADMIN') {
      const { requestId, approved, notes } = body;
      const result = await reviewCorrectionRequest(requestId, Boolean(approved), notes || '', user);
      return NextResponse.json({ success: true, request: result });
    }

    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  } catch (error: any) {
    console.error('Correction route error:', error);
    return NextResponse.json({ error: error.message || 'Failed to process correction' }, { status: 500 });
  }
}
