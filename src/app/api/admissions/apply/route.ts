import { NextRequest, NextResponse } from 'next/server';
import { submitAdmissionApplication } from '@/services/admissionService';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    if (!data.studentName || !data.parentName || !data.email || !data.phone || !data.gradeApplying || !data.dob) {
      return NextResponse.json({ error: 'Missing required admission application fields' }, { status: 400 });
    }

    const application = await submitAdmissionApplication(data);
    return NextResponse.json({
      success: true,
      applicationNo: application.applicationNo,
      message: 'Application registered successfully. You can track your status anytime with your reference number.',
    });
  } catch (error) {
    console.error('Admission apply error:', error);
    return NextResponse.json({ error: 'Failed to submit admission application' }, { status: 500 });
  }
}
