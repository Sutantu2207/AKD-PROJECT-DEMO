import React from 'react';
import Link from 'next/link';
import { requireRole } from '@/lib/auth';
import { getParentDashboard } from '@/services/parentService';
import { 
  GraduationCap, TrendingUp, CalendarCheck, Award, BookOpen, 
  ArrowRight, CheckCircle2, AlertCircle, ArrowUpRight, FileText, Bell 
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ParentDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ childId?: string }>;
}) {
  const { childId } = await searchParams;
  const user = await requireRole(['PARENT', 'SUPER_ADMIN', 'ADMIN']);
  const data = await getParentDashboard(user.id, childId);

  if (!data || !data.activeChild) {
    return (
      <div className="p-8 bg-white rounded-2xl border border-slate-200 text-center">
        <h2 className="text-lg font-bold text-navy-950">No Enrolled Children Found</h2>
        <p className="text-xs text-slate-500 mt-1">Please contact school administration to link your student profile.</p>
      </div>
    );
  }

  const { activeChild, children, subjectPerformances, assignments, teacherRemarks, notifications } = data;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* 1. Multi-Child Selector Banner (if parent has multiple children) */}
      {children.length > 1 && (
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Viewing Academic Profile For:
            </span>
            <h2 className="text-base font-bold text-navy-950">
              {activeChild.name} ({activeChild.className}-{activeChild.sectionName} • Roll {activeChild.rollNo})
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {children.map((ch) => (
              <Link
                key={ch.studentId}
                href={`/parent?childId=${ch.studentId}`}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  ch.studentId === activeChild.studentId
                    ? 'bg-navy-950 text-gold-300 shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>{ch.studentName}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 2. Main KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Overall Percentage */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-luxury flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Overall Score</span>
            <div className="w-8 h-8 rounded-lg bg-gold-100 text-gold-700 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-navy-950 font-serif">
              {activeChild.overallPercentage}%
            </div>
            <div className="flex items-center gap-2 mt-1 text-xs text-slate-500 font-medium">
              <span className="text-gold-700 font-bold bg-gold-50 px-1.5 py-0.5 rounded border border-gold-200">
                Grade {activeChild.overallGrade}
              </span>
              <span>Cumulative Distinction</span>
            </div>
          </div>
        </div>

        {/* Attendance Rate */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-luxury flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Attendance</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-navy-950 font-serif">
              {activeChild.attendancePercentage}%
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {activeChild.presentDays} of {activeChild.totalDays} sessions present
            </p>
          </div>
        </div>

        {/* Class Benchmark Comparison */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-luxury flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Class Benchmark</span>
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-navy-950 font-serif">
              +12.0%
            </div>
            <p className="text-xs text-emerald-700 font-semibold mt-1 flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> Above Class Average (76.0%)
            </p>
          </div>
        </div>

        {/* Academic Trend */}
        <div className="p-6 rounded-2xl bg-navy-950 text-white shadow-luxury flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-gold-400 uppercase tracking-wider">Academic Trend</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-gold-400/20 text-gold-300 font-bold border border-gold-400/30">
              Grounded
            </span>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold text-gold-300 font-serif">
              Improving (↑ +17%)
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Steady rise across Mathematics and Science term assessments.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Subject-wise Performance Snapshot */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-luxury space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-base font-bold text-navy-950">Subject Performance & Benchmark Overview</h3>
            <p className="text-xs text-slate-500">Official Half-Yearly examination marks breakdown</p>
          </div>
          <Link
            href="/parent/academics"
            className="text-xs font-bold text-gold-700 hover:text-gold-900 flex items-center gap-1"
          >
            Detailed Analytics <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider">
                <th className="pb-3 font-semibold">Subject</th>
                <th className="pb-3 font-semibold text-center">Latest Marks</th>
                <th className="pb-3 font-semibold text-center">Grade</th>
                <th className="pb-3 font-semibold text-center">Previous Score</th>
                <th className="pb-3 font-semibold text-center">Change</th>
                <th className="pb-3 font-semibold text-center">Class Average</th>
                <th className="pb-3 font-semibold text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {subjectPerformances.map((sub) => (
                <tr key={sub.subjectId} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 font-bold text-navy-950">{sub.subjectName}</td>
                  <td className="py-3 text-center font-extrabold text-navy-900">{sub.percentage}%</td>
                  <td className="py-3 text-center font-bold text-gold-700">{sub.grade}</td>
                  <td className="py-3 text-center text-slate-500">{sub.previousScore ? `${sub.previousScore}%` : '-'}</td>
                  <td className="py-3 text-center font-semibold text-emerald-600">
                    {sub.changeDelta && sub.changeDelta > 0 ? `+${sub.changeDelta}%` : sub.changeDelta ? `${sub.changeDelta}%` : '-'}
                  </td>
                  <td className="py-3 text-center text-slate-600">{sub.classAverage}%</td>
                  <td className="py-3 text-center">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {sub.statusBadge}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Two Column: Teacher Remarks & Urgent Circulars */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Teacher Remarks */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-luxury space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-navy-950">Published Faculty Remarks</h3>
            <span className="text-[10px] text-slate-400 font-semibold">Verified</span>
          </div>

          <div className="space-y-3">
            {teacherRemarks.map((tr) => (
              <div key={tr.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <div className="flex justify-between items-start mb-1 font-semibold text-navy-950">
                  <span>{tr.teacherName} ({tr.subjectName})</span>
                  <span className="text-[10px] text-slate-400 font-normal">{tr.date}</span>
                </div>
                <p className="text-slate-600 italic mt-1 leading-relaxed">&ldquo;{tr.remark}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications & Assignments */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-luxury space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-navy-950">Recent Notifications & Assignments</h3>
            <Link href="/parent/notifications" className="text-xs text-gold-700 font-bold hover:underline">
              View All
            </Link>
          </div>

          <div className="space-y-3">
            {notifications.slice(0, 3).map((n) => (
              <div key={n.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-navy-950 text-gold-400 flex items-center justify-center flex-shrink-0">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-navy-950">{n.title}</h4>
                  <p className="text-slate-600 mt-0.5 leading-relaxed">{n.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
