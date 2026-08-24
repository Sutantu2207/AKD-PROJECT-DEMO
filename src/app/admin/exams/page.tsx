import React from 'react';
import { requireRole } from '@/lib/auth';
import { db } from '@/lib/db';
import { ClipboardCheck, Plus, Calendar, CheckCircle2, Clock } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminExamsPage() {
  const user = await requireRole(['ADMIN', 'SUPER_ADMIN', 'PRINCIPAL']);

  const exams = await db.exam.findMany({
    where: { academicYear: { isCurrent: true } },
    include: {
      assessments: {
        include: { subject: true, class: true, section: true },
      },
    },
    orderBy: { startDate: 'asc' },
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Examination Management Suite
          </span>
          <h1 className="text-2xl font-bold text-navy-950 font-serif">
            Assessment Cycles & Schedules
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure Unit Tests, Term Examinations, and Board Revision assessments.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {exams.map((exam) => (
          <div key={exam.id} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-luxury space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <span className="text-[10px] uppercase font-bold text-gold-800 bg-gold-50 px-2 py-0.5 rounded border border-gold-200">
                  {exam.status}
                </span>
                <h3 className="text-lg font-bold text-navy-950 mt-1">{exam.name}</h3>
                <span className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <Calendar className="w-3.5 h-3.5 text-gold-600" />
                  {new Date(exam.startDate).toLocaleDateString()} – {new Date(exam.endDate).toLocaleDateString()}
                </span>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-navy-950 block">
                  {exam.assessments.length} Assessment Papers
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-500 block mb-2">Subject Assessments:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {exam.assessments.map((ass) => (
                  <div key={ass.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs flex justify-between items-center">
                    <div>
                      <strong className="text-navy-950 block">{ass.class.name}-{ass.section.name} {ass.subject.name}</strong>
                      <span className="text-[10px] text-slate-400">Max: {ass.maxMarks} marks</span>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        ass.status === 'PUBLISHED'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {ass.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
