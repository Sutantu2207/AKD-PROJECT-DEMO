import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { recordBulkAttendance } from '@/services/teacherService';

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== 'TEACHER' && user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized to mark attendance' }, { status: 403 });
    }

    const { classId, sectionId, date, records } = await req.json();

    if (!classId || !sectionId || !date || !Array.isArray(records)) {
      return NextResponse.json({ error: 'Missing required attendance fields' }, { status: 400 });
    }

    const result = await recordBulkAttendance(classId, sectionId, date, records, user);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Bulk attendance error:', error);
    return NextResponse.json({ error: error.message || 'Failed to record attendance' }, { status: 500 });
  }
}
