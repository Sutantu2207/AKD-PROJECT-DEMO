import { NextRequest, NextResponse } from 'next/server';
import { trackAdmissionApplication } from '@/services/admissionService';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const applicationNo = searchParams.get('appNo');

    if (!applicationNo) {
      return NextResponse.json({ error: 'Application number is required' }, { status: 400 });
    }

    const application = await trackAdmissionApplication(applicationNo);
    if (!application) {
      return NextResponse.json({ error: 'Application number not found. Please verify and try again.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, application });
  } catch (error) {
    console.error('Admission tracking error:', error);
    return NextResponse.json({ error: 'Error retrieving admission status' }, { status: 500 });
  }
}
