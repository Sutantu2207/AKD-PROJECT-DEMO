import { db } from '@/lib/db';
import { calculateGrade, getStatusBadge } from '@/lib/grading';
import { calculateAcademicTrend, ScoreHistoryPoint } from '@/lib/trend';
import { SubjectPerformance } from '@/types';

export async function getStudentDashboard(userId: string) {
  const student = await db.studentProfile.findUnique({
    where: { userId },
    include: {
      user: true,
      enrollments: {
        where: { academicYear: { isCurrent: true } },
        include: { class: true, section: true, academicYear: true },
      },
    },
  });

  if (!student) throw new Error('Student profile not found');

  const currentEnrollment = student.enrollments[0];
  const classId = currentEnrollment?.classId;
  const sectionId = currentEnrollment?.sectionId;

  // 1. Fetch all published marks for current academic year
  const marks = await db.mark.findMany({
    where: {
      studentId: student.id,
      assessment: {
        status: 'PUBLISHED',
        exam: { academicYear: { isCurrent: true } },
      },
    },
    include: {
      assessment: {
        include: {
          subject: true,
          exam: true,
        },
      },
    },
    orderBy: { assessment: { date: 'asc' } },
  });

  // Calculate subject-wise performance
  const subjectsMap: Record<string, { subject: any; marks: any[] }> = {};
  for (const m of marks) {
    const sId = m.assessment.subjectId;
    if (!subjectsMap[sId]) {
      subjectsMap[sId] = { subject: m.assessment.subject, marks: [] };
    }
    subjectsMap[sId].marks.push(m);
  }

  const subjectPerformances: SubjectPerformance[] = [];
  let totalPercentageSum = 0;
  let subjectCount = 0;

  for (const sId of Object.keys(subjectsMap)) {
    const item = subjectsMap[sId];
    const history: ScoreHistoryPoint[] = item.marks.map((m) => ({
      date: m.assessment.date,
      score: m.marksObtained ?? 0,
      maxMarks: m.assessment.maxMarks,
      percentage: m.marksObtained !== null ? (m.marksObtained / m.assessment.maxMarks) * 100 : 0,
      examName: m.assessment.exam.name,
    }));

    const trendResult = calculateAcademicTrend(history);
    const latestPct = trendResult.latestScore;
    const gradeInfo = calculateGrade(latestPct);

    // Fetch class average for latest assessment
    const latestAssessmentId = item.marks[item.marks.length - 1].assessmentId;
    const classMarks = await db.mark.findMany({
      where: { assessmentId: latestAssessmentId, marksObtained: { not: null } },
    });
    const classAvg =
      classMarks.length > 0
        ? Math.round(
            (classMarks.reduce((acc, cm) => acc + (cm.marksObtained || 0), 0) /
              (classMarks.length * item.marks[item.marks.length - 1].assessment.maxMarks)) *
              1000
          ) / 10
        : 75;

    totalPercentageSum += latestPct;
    subjectCount++;

    subjectPerformances.push({
      subjectId: item.subject.id,
      subjectName: item.subject.name,
      subjectCode: item.subject.code,
      latestScore: item.marks[item.marks.length - 1].marksObtained ?? 0,
      maxMarks: item.marks[item.marks.length - 1].assessment.maxMarks,
      percentage: Math.round(latestPct * 10) / 10,
      grade: gradeInfo.grade,
      previousScore: trendResult.previousScore,
      changeDelta: trendResult.delta,
      trend: trendResult.status,
      classAverage: classAvg,
      statusBadge: getStatusBadge(latestPct, trendResult.delta, classAvg),
    });
  }

  const overallPercentage = subjectCount > 0 ? Math.round((totalPercentageSum / subjectCount) * 10) / 10 : 0;

  // 2. Attendance Summary
  const attendanceRecords = await db.attendance.findMany({
    where: { studentId: student.id },
    orderBy: { date: 'desc' },
  });

  const totalDays = attendanceRecords.length;
  const presentDays = attendanceRecords.filter((a) => a.status === 'PRESENT' || a.status === 'LATE').length;
  const absentDays = attendanceRecords.filter((a) => a.status === 'ABSENT').length;
  const excusedDays = attendanceRecords.filter((a) => a.status === 'EXCUSED').length;
  const attendanceRate = totalDays > 0 ? Math.round((presentDays / totalDays) * 1000) / 10 : 96.0;

  // 3. Upcoming exams
  const upcomingExams = await db.exam.findMany({
    where: {
      academicYear: { isCurrent: true },
      status: { in: ['UPCOMING', 'ACTIVE'] },
    },
    include: {
      assessments: {
        where: classId ? { classId } : {},
        include: { subject: true },
      },
    },
    take: 3,
  });

  // 4. Assignments
  const assignments = await db.assignment.findMany({
    where: classId && sectionId ? { classId, sectionId } : {},
    include: {
      subject: true,
      teacher: { include: { user: true } },
      submissions: { where: { studentId: student.id } },
    },
    orderBy: { dueDate: 'asc' },
    take: 5,
  });

  // 5. Announcements
  const announcements = await db.announcement.findMany({
    where: {
      OR: [
        { targetRole: 'ALL' },
        { targetRole: 'STUDENT' },
        ...(classId ? [{ classId }] : []),
      ],
    },
    include: { author: true },
    orderBy: { createdAt: 'desc' },
    take: 5,
  });

  // 6. Achievements & Badges
  const achievements = await prismaDbAchievements(student.id);

  return {
    student: {
      id: student.id,
      name: student.user.name,
      email: student.user.email,
      rollNo: student.rollNo,
      admissionNo: student.admissionNo,
      gender: student.gender,
      bloodGroup: student.bloodGroup,
      className: currentEnrollment?.class.name || 'Class 10',
      sectionName: currentEnrollment?.section.name || 'A',
      classId,
      sectionId,
    },
    overallPercentage,
    overallGrade: calculateGrade(overallPercentage).grade,
    attendance: {
      rate: attendanceRate,
      totalDays,
      presentDays,
      absentDays,
      excusedDays,
      records: attendanceRecords.slice(0, 15),
    },
    subjectPerformances,
    upcomingExams,
    assignments: assignments.map((a) => ({
      id: a.id,
      title: a.title,
      description: a.description,
      subjectName: a.subject.name,
      teacherName: a.teacher.user.name,
      dueDate: a.dueDate.toISOString().split('T')[0],
      maxMarks: a.maxMarks,
      status: a.submissions[0]
        ? (a.submissions[0].status as any)
        : new Date(a.dueDate) < new Date()
        ? 'OVERDUE'
        : 'PENDING',
      marksObtained: a.submissions[0]?.marksObtained ?? undefined,
      feedback: a.submissions[0]?.feedback ?? undefined,
    })),
    announcements: announcements.map((an) => ({
      id: an.id,
      title: an.title,
      content: an.content,
      authorName: an.author.name,
      priority: an.priority,
      createdAt: an.createdAt.toISOString().split('T')[0],
    })),
    achievements,
  };
}

async function prismaDbAchievements(studentId: string) {
  return await db.achievement.findMany({
    where: { studentId },
    orderBy: { date: 'desc' },
  });
}

export async function submitStudentAssignment(
  studentProfileId: string,
  assignmentId: string,
  submissionText: string
) {
  const existing = await db.assignmentSubmission.findUnique({
    where: { assignmentId_studentId: { assignmentId, studentId: studentProfileId } },
  });

  if (existing) {
    return await db.assignmentSubmission.update({
      where: { id: existing.id },
      data: {
        submissionText,
        submittedAt: new Date(),
        status: 'SUBMITTED',
      },
    });
  }

  return await db.assignmentSubmission.create({
    data: {
      assignmentId,
      studentId: studentProfileId,
      submissionText,
      status: 'SUBMITTED',
    },
  });
}

export async function getStudentStudyMaterials(classId: string, category?: string, search?: string) {
  return await db.studyMaterial.findMany({
    where: {
      classId,
      ...(category && category !== 'ALL' ? { category } : {}),
      ...(search
        ? {
            OR: [
              { title: { contains: search } },
              { topic: { contains: search } },
              { description: { contains: search } },
            ],
          }
        : {}),
    },
    include: {
      subject: true,
      teacher: { include: { user: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
}
