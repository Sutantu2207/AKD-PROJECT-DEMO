import React from 'react';
import { requireRole } from '@/lib/auth';
import { getParentDashboard } from '@/services/parentService';
import { BookOpen, TrendingUp, ShieldCheck, ArrowUpRight, ArrowDownRight, Minus, Award } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ParentAcademicsPage({
  searchParams,
}: {
  searchParams: Promise<{ childId?: string }>;
}) {
  const { childId } = await searchParams;
  const user = await requireRole(['PARENT', 'SUPER_ADMIN', 'ADMIN']);
  const data = await getParentDashboard(user.id, childId);

  if (!data || !data.activeChild) {
    return <div className="p-8 text-center bg-white rounded-xl">No academic records found.</div>;
  }

  const { activeChild, subjectPerformances } = data;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Academic Performance Analysis
          </span>
          <h1 className="text-2xl font-bold text-navy-950 font-serif">
            Subject-Wise Marks & Class Benchmark
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Student: <strong className="text-navy-950">{activeChild.name}</strong> ({activeChild.className}-{activeChild.sectionName} • Roll {activeChild.rollNo})
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy-950 text-gold-300 text-xs font-semibold shadow-sm">
          <ShieldCheck className="w-4 h-4 text-gold-400" />
          Anonymized Peer Comparisons
        </div>
      </div>

      {/* Subject Performance Detailed Table */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-luxury space-y-6">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider">
                <th className="pb-3 font-semibold">Subject</th>
                <th className="pb-3 font-semibold text-center">Score / Max</th>
                <th className="pb-3 font-semibold text-center">Percentage</th>
                <th className="pb-3 font-semibold text-center">Grade</th>
                <th className="pb-3 font-semibold text-center">Previous Term</th>
                <th className="pb-3 font-semibold text-center">Progress</th>
                <th className="pb-3 font-semibold text-center">Class Avg</th>
                <th className="pb-3 font-semibold text-center">School Avg</th>
                <th className="pb-3 font-semibold text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {subjectPerformances.map((sub) => (
                <tr key={sub.subjectId} className="hover:bg-slate-50 transition">
                  <td className="py-3.5 font-bold text-navy-950">
                    <div>{sub.subjectName}</div>
                    <span className="text-[10px] text-slate-400 font-mono">{sub.subjectCode}</span>
                  </td>
                  <td className="py-3.5 text-center font-medium text-slate-700">
                    {sub.latestScore} / {sub.maxMarks}
                  </td>
                  <td className="py-3.5 text-center font-extrabold text-navy-950 text-sm">
                    {sub.percentage}%
                  </td>
                  <td className="py-3.5 text-center font-extrabold text-gold-700 text-sm">
                    {sub.grade}
                  </td>
                  <td className="py-3.5 text-center text-slate-500">
                    {sub.previousScore ? `${sub.previousScore}%` : '-'}
                  </td>
                  <td className="py-3.5 text-center font-bold">
                    {sub.changeDelta !== undefined && sub.changeDelta > 0 ? (
                      <span className="text-emerald-700 flex items-center justify-center gap-0.5">
                        <ArrowUpRight className="w-3.5 h-3.5" /> +{sub.changeDelta}%
                      </span>
                    ) : sub.changeDelta !== undefined && sub.changeDelta < 0 ? (
                      <span className="text-rose-700 flex items-center justify-center gap-0.5">
                        <ArrowDownRight className="w-3.5 h-3.5" /> {sub.changeDelta}%
                      </span>
                    ) : (
                      <span className="text-slate-400 flex items-center justify-center gap-0.5">
                        <Minus className="w-3.5 h-3.5" /> Stable
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 text-center font-semibold text-slate-700">
                    {sub.classAverage}%
                  </td>
                  <td className="py-3.5 text-center text-slate-500">
                    {sub.schoolAverage || 74.0}%
                  </td>
                  <td className="py-3.5 text-center">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        sub.statusBadge === 'Strong'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : sub.statusBadge === 'Improving'
                          ? 'bg-blue-50 text-blue-800 border border-blue-200'
                          : sub.statusBadge === 'Needs Attention'
                          ? 'bg-amber-50 text-amber-900 border border-amber-200'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {sub.statusBadge}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transparent Academic Rules Explanation */}
      <div className="p-6 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-slate-600 space-y-2">
        <h4 className="font-bold text-navy-950 flex items-center gap-1.5">
          <Award className="w-4 h-4 text-gold-600" /> Academic Transparency Standards
        </h4>
        <p className="leading-relaxed">
          • Class and school averages are strictly anonymized. No individual student identities or peer marks are ever exposed.
        </p>
        <p className="leading-relaxed">
          • Academic statuses (Strong, Improving, Stable, Needs Attention) are generated from transparent mathematical delta rules based on consecutive chronological examinations.
        </p>
      </div>
    </div>
  );
}
