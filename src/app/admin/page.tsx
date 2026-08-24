import React from 'react';
import Link from 'next/link';
import { requireRole } from '@/lib/auth';
import { getSchoolAnalytics } from '@/services/adminService';
import { 
  Users, GraduationCap, Award, CalendarCheck, ShieldAlert, 
  FolderKanban, ArrowRight, CheckCircle2, TrendingUp, Sparkles, 
  BookOpen, UserCheck 
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const user = await requireRole(['ADMIN', 'SUPER_ADMIN', 'PRINCIPAL']);
  const analytics = await getSchoolAnalytics();
  const { kpis, gradeDistribution, classPerformance } = analytics;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="bg-navy-950 text-white p-8 rounded-2xl shadow-luxury flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border border-navy-800">
        <div>
          <span className="text-xs font-bold text-gold-400 uppercase tracking-wider block">
            Institutional Administration & Governance
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white mt-1">
            School Executive Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 font-light mt-1">
            Session {analytics.academicYear} • A.K.D. Dharma Raja School Digital Campus
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/students"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-amber-400 text-navy-950 font-bold text-xs shadow-md hover:shadow-gold-glow transition flex items-center gap-1.5"
          >
            <GraduationCap className="w-3.5 h-3.5" /> Enrolled Students
          </Link>
          <Link
            href="/admin/admissions"
            className="px-5 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-slate-200 border border-navy-700 text-xs font-semibold transition flex items-center gap-1.5"
          >
            <FolderKanban className="w-3.5 h-3.5" /> Admission Pipeline ({kpis.pendingAdmissionsCount})
          </Link>
        </div>
      </div>

      {/* Main KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-luxury">
          <span className="text-xs font-bold text-slate-400 uppercase">Active Students</span>
          <div className="text-3xl font-extrabold text-navy-950 font-serif mt-2">
            {kpis.totalStudents}
          </div>
          <span className="text-xs text-slate-500 mt-1 block">Across Classes 8-10</span>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-luxury">
          <span className="text-xs font-bold text-slate-400 uppercase">Distinguished Faculty</span>
          <div className="text-3xl font-extrabold text-navy-950 font-serif mt-2">
            {kpis.totalTeachers}
          </div>
          <span className="text-xs text-slate-500 mt-1 block">100% Assigned</span>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-luxury">
          <span className="text-xs font-bold text-slate-400 uppercase">Board Pass Rate</span>
          <div className="text-3xl font-extrabold text-emerald-600 font-serif mt-2">
            {kpis.passPercentage}%
          </div>
          <span className="text-xs text-emerald-700 font-semibold mt-1 block">Academic Distinction</span>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-luxury">
          <span className="text-xs font-bold text-slate-400 uppercase">School Average Score</span>
          <div className="text-3xl font-extrabold text-gold-600 font-serif mt-2">
            {kpis.schoolAverage}%
          </div>
          <span className="text-xs text-slate-500 mt-1 block">Grade A Cumulative</span>
        </div>
      </div>

      {/* Two Columns: Class Performance Benchmarks & Academic Attention Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Class Performance Table */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-luxury space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-base font-bold text-navy-950">Class-Wise Academic Performance</h3>
              <p className="text-xs text-slate-500">Curricular averages and student strength</p>
            </div>
            <Link href="/admin/analytics" className="text-xs font-bold text-gold-700 hover:underline">
              Detailed Analytics →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider">
                  <th className="pb-3 font-semibold">Grade & Class</th>
                  <th className="pb-3 font-semibold text-center">Enrolled Students</th>
                  <th className="pb-3 font-semibold text-center">Term Average</th>
                  <th className="pb-3 font-semibold text-center">Pass Rate</th>
                  <th className="pb-3 font-semibold text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {classPerformance.map((c) => (
                  <tr key={c.classId} className="hover:bg-slate-50 transition">
                    <td className="py-3 font-bold text-navy-950">{c.className}</td>
                    <td className="py-3 text-center font-medium text-slate-700">{c.studentCount}</td>
                    <td className="py-3 text-center font-extrabold text-navy-950 text-sm">{c.average}%</td>
                    <td className="py-3 text-center font-bold text-emerald-700">100%</td>
                    <td className="py-3 text-center">
                      <Link
                        href="/admin/classes"
                        className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-navy-950 font-bold text-[11px] transition"
                      >
                        Manage Class
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 1 Col: Grade Distribution & Alerts Preview */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-luxury space-y-4">
            <h3 className="text-sm font-bold text-navy-950">School Grade Distribution</h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {gradeDistribution.map((g) => (
                <div key={g.grade} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <span className="font-extrabold text-navy-950 text-base block">{g.count}</span>
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Grade {g.grade}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200 shadow-luxury space-y-3">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4 text-amber-700" />
              <span>Academic Attention Alerts ({kpis.activeAlertsCount})</span>
            </div>
            <p className="text-xs text-amber-800 leading-relaxed">
              2 student records currently meet automated intervention criteria (Score decline in 10-A, Attendance flag in 10-A).
            </p>
            <Link
              href="/admin/alerts"
              className="inline-block px-4 py-2 rounded-xl bg-navy-950 text-gold-300 font-bold text-xs shadow-sm"
            >
              Review Alert Console →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
