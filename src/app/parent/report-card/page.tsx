import React from 'react';
import { requireRole } from '@/lib/auth';
import { getParentDashboard } from '@/services/parentService';
import { DigitalReportCard } from '@/components/report-card/DigitalReportCard';

export const dynamic = 'force-dynamic';

export default async function ParentReportCardPage({
  searchParams,
}: {
  searchParams: Promise<{ childId?: string }>;
}) {
  const { childId } = await searchParams;
  const user = await requireRole(['PARENT', 'SUPER_ADMIN', 'ADMIN']);
  const data = await getParentDashboard(user.id, childId);

  if (!data || !data.activeChild) {
    return <div className="p-8 text-center bg-white rounded-xl">No report card generated.</div>;
  }

  const { activeChild, subjectPerformances } = data;

  const reportCardSubjects = subjectPerformances.map((s) => ({
    subjectName: s.subjectName,
    maxMarks: s.maxMarks,
    passMarks: Math.round(s.maxMarks * 0.35),
    marksObtained: s.latestScore,
    grade: s.grade,
    remarks: s.percentage >= 90 ? 'Outstanding analytical grasp & precision.' : s.percentage >= 80 ? 'Commendable performance and regular participation.' : 'Steady effort.',
  }));

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Official Academic Credential
        </span>
        <h1 className="text-2xl font-bold text-navy-950 font-serif">
          Official Digital Report Card
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Half-Yearly Examination Academic Transcript for <strong className="text-navy-950">{activeChild.name}</strong>
        </p>
      </div>

      <DigitalReportCard
        studentName={activeChild.name}
        rollNo={activeChild.rollNo}
        admissionNo={activeChild.admissionNo}
        className={activeChild.className}
        sectionName={activeChild.sectionName}
        academicYear="2025-2026"
        term="Half-Yearly Examination"
        version={1}
        subjects={reportCardSubjects}
        attendancePercent={activeChild.attendancePercentage}
        teacherRemarks="Demonstrates exceptional analytical clarity, consistent homework diligence, and active classroom curiosity."
        principalRemarks="Exemplary academic discipline and character. Congratulations on securing distinction."
        publishedDate="December 28, 2025"
      />
    </div>
  );
}
