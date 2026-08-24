import { db } from '@/lib/db';
import { logAuditEvent } from '@/lib/audit';
import { AuthUser } from '@/types';

export const ADMISSION_STATUSES = [
  'SUBMITTED',
  'DOCUMENT_VERIFICATION',
  'INTERVIEW',
  'ASSESSMENT',
  'SELECTED',
  'WAITLISTED',
  'REJECTED',
  'ADMITTED',
] as const;

export async function submitAdmissionApplication(data: {
  studentName: string;
  parentName: string;
  email: string;
  phone: string;
  gradeApplying: string;
  previousSchool?: string;
  dob: string;
  address?: string;
}) {
  const count = await db.admissionApplication.count();
  const nextNum = (count + 1).toString().padStart(3, '0');
  const applicationNo = `AKD-ADM-2026-${nextNum}`;

  const application = await db.admissionApplication.create({
    data: {
      applicationNo,
      studentName: data.studentName,
      parentName: data.parentName,
      email: data.email,
      phone: data.phone,
      gradeApplying: data.gradeApplying,
      previousSchool: data.previousSchool || null,
      dob: new Date(data.dob),
      address: data.address || null,
      status: 'SUBMITTED',
      notes: 'Application submitted online via public admission portal.',
    },
  });

  await logAuditEvent({
    action: 'ADMISSION_SUBMITTED',
    entityType: 'AdmissionApplication',
    entityId: application.id,
    newValue: { applicationNo, studentName: data.studentName, grade: data.gradeApplying },
    reason: 'Prospective student applied for admission.',
  });

  return application;
}

export async function trackAdmissionApplication(applicationNo: string) {
  const cleanNo = applicationNo.trim();
  const application = await db.admissionApplication.findUnique({
    where: { applicationNo: cleanNo },
  });

  if (!application) {
    return null;
  }

  return {
    applicationNo: application.applicationNo,
    studentName: application.studentName,
    parentName: application.parentName,
    gradeApplying: application.gradeApplying,
    status: application.status,
    notes: application.notes,
    createdAt: application.createdAt.toISOString().split('T')[0],
    updatedAt: application.updatedAt.toISOString().split('T')[0],
  };
}

export async function getAdminAdmissionsPipeline(statusFilter?: string, query?: string) {
  return await db.admissionApplication.findMany({
    where: {
      ...(statusFilter && statusFilter !== 'ALL' ? { status: statusFilter } : {}),
      ...(query
        ? {
            OR: [
              { applicationNo: { contains: query } },
              { studentName: { contains: query } },
              { parentName: { contains: query } },
              { email: { contains: query } },
              { phone: { contains: query } },
            ],
          }
        : {}),
    },
    orderBy: { createdAt: 'desc' },
  });
}

export async function updateAdmissionStatus(
  applicationId: string,
  newStatus: string,
  notes?: string,
  user?: AuthUser
) {
  const prev = await db.admissionApplication.findUnique({ where: { id: applicationId } });
  if (!prev) throw new Error('Application not found');

  const updated = await db.admissionApplication.update({
    where: { id: applicationId },
    data: {
      status: newStatus,
      notes: notes !== undefined ? notes : prev.notes,
    },
  });

  if (user) {
    await logAuditEvent({
      user,
      action: 'ADMISSION_STATUS_UPDATED',
      entityType: 'AdmissionApplication',
      entityId: applicationId,
      oldValue: { status: prev.status },
      newValue: { status: newStatus, notes },
      reason: `Admission moved to ${newStatus}`,
    });
  }

  return updated;
}
