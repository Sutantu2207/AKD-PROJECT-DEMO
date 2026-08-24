import { db } from '@/lib/db';
import { logAuditEvent } from '@/lib/audit';
import { calculateGrade } from '@/lib/grading';
import { AuthUser } from '@/types';

export async function getTeacherDashboard(userId: string) {
  const teacher = await db.teacherProfile.findUnique({
    where: { userId },
    include: {
      user: true,
      assignments: {
        where: { academicYear: { isCurrent: true } },
        include: {
          class: true,
          section: true,
          subject: true,
        },
      },
    },
  });

  if (!teacher) throw new Error('Teacher profile not found');

  // Compute student count & class analytics for assigned classes
  const assignedClasses = [];
  let totalAssignedStudents = 0;

  for (const assign of teacher.assignments) {
    const studentsCount = await db.studentEnrollment.count({
      where: {
        classId: assign.classId,
        sectionId: assign.sectionId,
        academicYear: { isCurrent: true },
        status: 'ACTIVE',
      },
    });

    totalAssignedStudents += studentsCount;

    // Calculate recent assessment average
    const recentAssessment = await db.assessment.findFirst({
      where: {
        classId: assign.classId,
        sectionId: assign.sectionId,
        subjectId: assign.subjectId,
        status: 'PUBLISHED',
      },
      orderBy: { date: 'desc' },
      include: { marks: true },
    });

    let avgScore = 78.5;
    if (recentAssessment && recentAssessment.marks.length > 0) {
      const validMarks = recentAssessment.marks.filter((m) => m.marksObtained !== null);
      if (validMarks.length > 0) {
        avgScore =
          Math.round(
            (validMarks.reduce((a, b) => a + (b.marksObtained || 0), 0) /
              (validMarks.length * recentAssessment.maxMarks)) *
              1000
          ) / 10;
      }
    }

    assignedClasses.push({
      assignmentId: assign.id,
      classId: assign.classId,
      sectionId: assign.sectionId,
      subjectId: assign.subjectId,
      className: assign.class.name,
      sectionName: assign.section.name,
      subjectName: assign.subject.name,
      subjectCode: assign.subject.code,
      studentCount: studentsCount,
      averageScore: avgScore,
    });
  }

  // Pending mark entries (Assessments in DRAFT status)
  const pendingAssessments = await db.assessment.findMany({
    where: {
      status: 'DRAFT',
      classId: { in: teacher.assignments.map((a) => a.classId) },
      sectionId: { in: teacher.assignments.map((a) => a.sectionId) },
      subjectId: { in: teacher.assignments.map((a) => a.subjectId) },
    },
    include: {
      exam: true,
      class: true,
      section: true,
      subject: true,
      marks: true,
    },
  });

  // Recent assignments created
  const activeAssignments = await db.assignment.findMany({
    where: { teacherId: teacher.id },
    include: {
      class: true,
      section: true,
      subject: true,
      submissions: true,
    },
    orderBy: { createdAt: 'desc' },
    take: 5,
  });

  return {
    teacher: {
      id: teacher.id,
      name: teacher.user.name,
      email: teacher.user.email,
      phone: teacher.user.phone,
      employeeId: teacher.employeeId,
      qualification: teacher.qualification,
      department: teacher.department,
    },
    totalClasses: assignedClasses.length,
    totalStudents: totalAssignedStudents,
    assignedClasses,
    pendingAssessments: pendingAssessments.map((pa) => ({
      id: pa.id,
      examName: pa.exam.name,
      className: `${pa.class.name}-${pa.section.name}`,
      subjectName: pa.subject.name,
      maxMarks: pa.maxMarks,
      marksEntered: pa.marks.length,
      status: pa.status,
      date: pa.date.toISOString().split('T')[0],
    })),
    activeAssignments: activeAssignments.map((aa) => ({
      id: aa.id,
      title: aa.title,
      className: `${aa.class.name}-${aa.section.name}`,
      subjectName: aa.subject.name,
      dueDate: aa.dueDate.toISOString().split('T')[0],
      submissionsCount: aa.submissions.length,
      gradedCount: aa.submissions.filter((s) => s.status === 'GRADED').length,
    })),
  };
}

/**
 * Fetch Spreadsheet Mark Entry data
 * Validates that the teacher is assigned to this class and subject!
 */
export async function getAssessmentMarksForTeacher(assessmentId: string, teacherProfileId: string) {
  const assessment = await db.assessment.findUnique({
    where: { id: assessmentId },
    include: {
      exam: { include: { academicYear: true } },
      class: true,
      section: true,
      subject: true,
      marks: {
        include: {
          student: {
            include: { user: true },
          },
        },
      },
    },
  });

  if (!assessment) throw new Error('Assessment not found');

  // Verify teacher authorization for this class + section + subject
  const authorized = await db.teacherAssignment.findFirst({
    where: {
      teacherId: teacherProfileId,
      classId: assessment.classId,
      sectionId: assessment.sectionId,
      subjectId: assessment.subjectId,
    },
  });

  if (!authorized) {
    throw new Error('UNAUTHORIZED: You are not assigned to teach this class/subject.');
  }

  // Get all active enrolled students in this class/section
  const enrolledStudents = await db.studentEnrollment.findMany({
    where: {
      classId: assessment.classId,
      sectionId: assessment.sectionId,
      academicYearId: assessment.exam.academicYearId,
      status: 'ACTIVE',
    },
    include: {
      student: { include: { user: true } },
    },
    orderBy: { rollNo: 'asc' },
  });

  // Map enrolled students with marks
  const studentRows = enrolledStudents.map((enr) => {
    const existingMark = assessment.marks.find((m) => m.studentId === enr.student.id);
    return {
      studentId: enr.student.id,
      rollNo: enr.rollNo,
      name: enr.student.user.name,
      admissionNo: enr.student.admissionNo,
      marksObtained: existingMark?.marksObtained ?? null,
      isAbsent: existingMark?.isAbsent ?? false,
      remarks: existingMark?.remarks ?? '',
      markId: existingMark?.id ?? null,
    };
  });

  return {
    assessment: {
      id: assessment.id,
      examName: assessment.exam.name,
      academicYear: assessment.exam.academicYear.name,
      className: assessment.class.name,
      sectionName: assessment.section.name,
      subjectName: assessment.subject.name,
      maxMarks: assessment.maxMarks,
      passMarks: assessment.passMarks,
      date: assessment.date.toISOString().split('T')[0],
      status: assessment.status,
    },
    studentRows,
  };
}

/**
 * Save draft marks (Spreadsheet inline saving)
 */
export async function saveMarksDraft(
  assessmentId: string,
  marksData: { studentId: string; marksObtained: number | null; isAbsent: boolean; remarks?: string }[],
  user: AuthUser
) {
  const assessment = await db.assessment.findUnique({ where: { id: assessmentId } });
  if (!assessment) throw new Error('Assessment not found');

  for (const item of marksData) {
    // Validate bounds
    let validScore = item.marksObtained;
    if (validScore !== null) {
      if (validScore < 0) validScore = 0;
      if (validScore > assessment.maxMarks) validScore = assessment.maxMarks;
    }

    await db.mark.upsert({
      where: {
        assessmentId_studentId: {
          assessmentId,
          studentId: item.studentId,
        },
      },
      update: {
        marksObtained: item.isAbsent ? null : validScore,
        isAbsent: item.isAbsent,
        remarks: item.remarks || null,
      },
      create: {
        assessmentId,
        studentId: item.studentId,
        marksObtained: item.isAbsent ? null : validScore,
        isAbsent: item.isAbsent,
        remarks: item.remarks || null,
      },
    });
  }

  await logAuditEvent({
    user,
    action: 'MARKS_DRAFT_SAVED',
    entityType: 'Assessment',
    entityId: assessmentId,
    newValue: { count: marksData.length },
    reason: 'Teacher saved draft mark entries.',
  });

  return { success: true, count: marksData.length };
}

/**
 * Publish Assessment Marks
 * Transitions status to PUBLISHED, notifies parents & students, generates audit log
 */
export async function publishAssessmentMarks(assessmentId: string, user: AuthUser) {
  const assessment = await db.assessment.findUnique({
    where: { id: assessmentId },
    include: {
      exam: true,
      class: true,
      section: true,
      subject: true,
      marks: {
        include: {
          student: {
            include: {
              user: true,
              parents: { include: { parent: { include: { user: true } } } },
            },
          },
        },
      },
    },
  });

  if (!assessment) throw new Error('Assessment not found');

  // Update status to PUBLISHED
  await db.assessment.update({
    where: { id: assessmentId },
    data: { status: 'PUBLISHED' },
  });

  // Dispatch notifications to parents and students
  for (const m of assessment.marks) {
    const studentUser = m.student.user;
    const scoreText = m.isAbsent ? 'Absent' : `${m.marksObtained}/${assessment.maxMarks}`;

    // Student notification
    await db.notification.create({
      data: {
        userId: studentUser.id,
        title: `${assessment.subject.name} Marks Published`,
        message: `${assessment.exam.name} marks published. Score: ${scoreText}.`,
        link: '/student/performance',
        type: 'ACADEMIC',
      },
    });

    // Parent notifications
    for (const p of m.student.parents) {
      await db.notification.create({
        data: {
          userId: p.parent.userId,
          title: `${assessment.subject.name} Marks Published for ${studentUser.name}`,
          message: `${assessment.exam.name} marks published for ${studentUser.name} (${assessment.class.name}-${assessment.section.name}). Score: ${scoreText}.`,
          link: '/parent/academics',
          type: 'ACADEMIC',
        },
      });
    }
  }

  await logAuditEvent({
    user,
    action: 'MARKS_PUBLISHED',
    entityType: 'Assessment',
    entityId: assessmentId,
    newValue: {
      exam: assessment.exam.name,
      subject: assessment.subject.name,
      class: `${assessment.class.name}-${assessment.section.name}`,
      studentCount: assessment.marks.length,
    },
    reason: 'Official publication of examination assessment marks.',
  });

  return { success: true, publishedCount: assessment.marks.length };
}

/**
 * Record Bulk Class Attendance
 */
export async function recordBulkAttendance(
  classId: string,
  sectionId: string,
  dateStr: string,
  records: { studentId: string; status: string; remarks?: string }[],
  user: AuthUser
) {
  const targetDate = new Date(dateStr);

  for (const r of records) {
    await db.attendance.upsert({
      where: {
        studentId_date: {
          studentId: r.studentId,
          date: targetDate,
        },
      },
      update: {
        status: r.status,
        remarks: r.remarks || null,
        markedById: user.id,
      },
      create: {
        studentId: r.studentId,
        classId,
        sectionId,
        date: targetDate,
        status: r.status,
        remarks: r.remarks || null,
        markedById: user.id,
      },
    });
  }

  await logAuditEvent({
    user,
    action: 'ATTENDANCE_RECORDED',
    entityType: 'Attendance',
    entityId: `${classId}_${sectionId}_${dateStr}`,
    newValue: { date: dateStr, count: records.length },
    reason: 'Teacher recorded daily class attendance.',
  });

  return { success: true, count: records.length };
}

/**
 * Submit Mark Correction Request (Workflow for published marks)
 */
export async function submitMarkCorrectionRequest(
  markId: string,
  teacherProfileId: string,
  requestedMarks: number,
  reason: string,
  user: AuthUser
) {
  const mark = await db.mark.findUnique({
    where: { id: markId },
    include: { assessment: true, student: { include: { user: true } } },
  });

  if (!mark) throw new Error('Mark record not found');
  if (requestedMarks < 0 || requestedMarks > mark.assessment.maxMarks) {
    throw new Error(`Requested marks must be between 0 and ${mark.assessment.maxMarks}`);
  }

  const req = await db.markCorrectionRequest.create({
    data: {
      markId,
      teacherId: teacherProfileId,
      requestedMarks,
      reason,
      status: 'PENDING',
    },
  });

  await logAuditEvent({
    user,
    action: 'CORRECTION_REQUESTED',
    entityType: 'MarkCorrectionRequest',
    entityId: req.id,
    oldValue: { marksObtained: mark.marksObtained },
    newValue: { requestedMarks, reason },
    reason: `Teacher requested score adjustment for ${mark.student.user.name}`,
  });

  return req;
}

/**
 * Create New Assignment
 */
export async function createTeacherAssignment(
  teacherProfileId: string,
  data: {
    classId: string;
    sectionId: string;
    subjectId: string;
    title: string;
    description: string;
    dueDate: string;
    maxMarks: number;
  },
  user: AuthUser
) {
  const assign = await db.assignment.create({
    data: {
      teacherId: teacherProfileId,
      classId: data.classId,
      sectionId: data.sectionId,
      subjectId: data.subjectId,
      title: data.title,
      description: data.description,
      dueDate: new Date(data.dueDate),
      maxMarks: Number(data.maxMarks),
    },
  });

  // Notify students
  const enrollments = await db.studentEnrollment.findMany({
    where: { classId: data.classId, sectionId: data.sectionId, status: 'ACTIVE' },
    include: { student: true },
  });

  for (const enr of enrollments) {
    await db.notification.create({
      data: {
        userId: enr.student.userId,
        title: 'New Assignment Published',
        message: `${data.title} has been assigned. Due date: ${data.dueDate}`,
        link: '/student/assignments',
        type: 'ASSIGNMENT',
      },
    });
  }

  return assign;
}
