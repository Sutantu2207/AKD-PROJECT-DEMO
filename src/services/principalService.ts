import { db } from '@/lib/db';
import { logAuditEvent } from '@/lib/audit';
import { AuthUser } from '@/types';

export async function getPrincipalOverview() {
  const currentYear = await db.academicYear.findFirst({ where: { isCurrent: true } });

  const totalStudents = await db.studentProfile.count();
  const totalFaculty = await db.teacherProfile.count();
  const activeAlerts = await db.academicAlert.findMany({
    where: { status: 'ACTIVE' },
    include: {
      student: {
        include: {
          user: true,
          enrollments: {
            where: { academicYear: { isCurrent: true } },
            include: { class: true, section: true },
          },
        },
      },
    },
  });

  const pendingCorrections = await db.markCorrectionRequest.findMany({
    where: { status: 'PENDING' },
    include: {
      teacher: { include: { user: true } },
      mark: {
        include: {
          student: { include: { user: true } },
          assessment: { include: { subject: true, exam: true, class: true, section: true } },
        },
      },
    },
  });

  // Faculty performance breakdown
  const teachers = await db.teacherProfile.findMany({
    include: {
      user: true,
      assignments: {
        where: { academicYear: { isCurrent: true } },
        include: { class: true, section: true, subject: true },
      },
    },
  });

  const facultySummary = teachers.map((t) => ({
    id: t.id,
    name: t.user.name,
    employeeId: t.employeeId,
    department: t.department,
    qualification: t.qualification,
    classesTaught: t.assignments.map((a) => `${a.class.name}-${a.section.name} (${a.subject.name})`),
  }));

  return {
    academicYear: currentYear?.name || '2025-2026',
    totalStudents,
    totalFaculty,
    activeAlerts,
    pendingCorrections,
    facultySummary,
  };
}

export async function reviewCorrectionRequest(
  requestId: string,
  approved: boolean,
  notes: string,
  user: AuthUser
) {
  const req = await db.markCorrectionRequest.findUnique({
    where: { id: requestId },
    include: {
      mark: {
        include: {
          student: { include: { user: true } },
          assessment: { include: { subject: true, exam: true } },
        },
      },
    },
  });

  if (!req) throw new Error('Correction request not found');

  const oldMarks = req.mark.marksObtained;
  const newMarks = req.requestedMarks;

  // If approved, update the actual Mark record
  if (approved) {
    await db.mark.update({
      where: { id: req.markId },
      data: {
        marksObtained: newMarks,
      },
    });
  }

  // Update request state
  const updatedReq = await db.markCorrectionRequest.update({
    where: { id: requestId },
    data: {
      status: approved ? 'APPROVED' : 'REJECTED',
      reviewedById: user.id,
      reviewNotes: notes,
      reviewedAt: new Date(),
    },
  });

  await logAuditEvent({
    user,
    action: approved ? 'MARK_CORRECTION_APPROVED' : 'MARK_CORRECTION_REJECTED',
    entityType: 'MarkCorrectionRequest',
    entityId: requestId,
    oldValue: { marksObtained: oldMarks },
    newValue: { marksObtained: approved ? newMarks : oldMarks, status: updatedReq.status },
    reason: notes || (approved ? 'Principal approved score adjustment.' : 'Principal rejected request.'),
  });

  return updatedReq;
}
