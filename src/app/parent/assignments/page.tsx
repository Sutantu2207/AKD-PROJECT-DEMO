import React from 'react';
import { requireRole } from '@/lib/auth';
import { getParentDashboard } from '@/services/parentService';
import { FileText, CheckCircle2, Clock, AlertCircle, Award } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ParentAssignmentsPage({
  searchParams,
}: {
  searchParams: Promise<{ childId?: string }>;
}) {
  const { childId } = await searchParams;
  const user = await requireRole(['PARENT', 'SUPER_ADMIN', 'ADMIN']);
  const data = await getParentDashboard(user.id, childId);

  if (!data || !data.activeChild) {
    return <div className="p-8 text-center bg-white rounded-xl">No assignment records found.</div>;
  }

  const { activeChild, assignments } = data;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Homework & Project Submission Tracking
        </span>
        <h1 className="text-2xl font-bold text-navy-950 font-serif">
          Child Assignments & Faculty Reviews
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Student: <strong className="text-navy-950">{activeChild.name}</strong> ({activeChild.className}-{activeChild.sectionName})
        </p>
      </div>

      <div className="space-y-4">
        {assignments.length === 0 ? (
          <div className="p-8 rounded-2xl bg-white border border-slate-200 text-center text-xs text-slate-500">
            No assignments currently active for this class.
          </div>
        ) : (
          assignments.map((a: any) => (
            <div
              key={a.id}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-luxury flex flex-col md:flex-row justify-between gap-6 items-start"
            >
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-navy-800 bg-navy-100 px-2.5 py-0.5 rounded uppercase">
                    {a.subjectName}
                  </span>
                  <span className="text-xs text-slate-400">Faculty: {a.teacherName}</span>
                </div>
                <h3 className="text-base font-bold text-navy-950">{a.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{a.description}</p>

                {a.feedback && (
                  <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                    <strong className="text-navy-950 block mb-0.5">Teacher Feedback:</strong>
                    <p className="italic">&ldquo;{a.feedback}&rdquo;</p>
                  </div>
                )}
              </div>

              <div className="flex flex-col items-start md:items-end justify-between self-stretch gap-4">
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Due Date</span>
                  <span className="text-xs font-bold text-navy-950">{a.dueDate}</span>
                </div>

                <div className="flex items-center gap-2">
                  {a.status === 'GRADED' && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-300">
                      ✓ Graded: {a.marksObtained}/{a.maxMarks}
                    </span>
                  )}
                  {a.status === 'SUBMITTED' && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-800 border border-blue-300">
                      Submitted (Under Review)
                    </span>
                  )}
                  {a.status === 'PENDING' && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-300">
                      Pending Submission
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
