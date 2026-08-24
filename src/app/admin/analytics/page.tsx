import React from 'react';
import { requireRole } from '@/lib/auth';
import { getSchoolAnalytics } from '@/services/adminService';
import { BarChart3, TrendingUp, Award, Users, CheckCircle2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminAnalyticsPage() {
  const user = await requireRole(['ADMIN', 'SUPER_ADMIN', 'PRINCIPAL']);
  const analytics = await getSchoolAnalytics();
  const { kpis, gradeDistribution, classPerformance } = analytics;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Enterprise School Intelligence
        </span>
        <h1 className="text-2xl font-bold text-navy-950 font-serif">
          School-Wide Academic Performance Analytics
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Comprehensive cross-grade performance distributions, pass rates, and attendance regularities.
        </p>
      </div>

      {/* Main KPI Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-luxury">
          <span className="text-xs font-bold text-slate-400 uppercase">School Average</span>
          <div className="text-3xl font-extrabold text-navy-950 font-serif mt-2">{kpis.schoolAverage}%</div>
          <span className="text-xs text-emerald-700 font-semibold mt-1 block">Grade A Cumulative</span>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-luxury">
          <span className="text-xs font-bold text-slate-400 uppercase">Overall Pass Rate</span>
          <div className="text-3xl font-extrabold text-emerald-600 font-serif mt-2">{kpis.passPercentage}%</div>
          <span className="text-xs text-slate-500 mt-1 block">100% Board Success</span>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-luxury">
          <span className="text-xs font-bold text-slate-400 uppercase">Attendance Rate</span>
          <div className="text-3xl font-extrabold text-blue-600 font-serif mt-2">{kpis.overallAttendanceRate}%</div>
          <span className="text-xs text-slate-500 mt-1 block">Campus Standard Met</span>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-luxury">
          <span className="text-xs font-bold text-slate-400 uppercase">Active Curricula</span>
          <div className="text-3xl font-extrabold text-gold-600 font-serif mt-2">100%</div>
          <span className="text-xs text-slate-500 mt-1 block">All Syllabi Covered</span>
        </div>
      </div>

      {/* Class Benchmarking Table */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-luxury space-y-4">
        <h3 className="text-base font-bold text-navy-950">Comparative Grade-by-Grade Benchmarks</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider">
                <th className="pb-3 font-semibold">Class</th>
                <th className="pb-3 font-semibold text-center">Enrolled Strength</th>
                <th className="pb-3 font-semibold text-center">Average Score</th>
                <th className="pb-3 font-semibold text-center">School Benchmark Comparison</th>
                <th className="pb-3 font-semibold text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {classPerformance.map((c) => (
                <tr key={c.classId} className="hover:bg-slate-50 transition">
                  <td className="py-3.5 font-bold text-navy-950">{c.className}</td>
                  <td className="py-3.5 text-center font-medium text-slate-700">{c.studentCount} students</td>
                  <td className="py-3.5 text-center font-extrabold text-navy-950 text-sm">{c.average}%</td>
                  <td className="py-3.5 text-center font-semibold text-emerald-700">
                    {c.average >= kpis.schoolAverage ? `+${Math.round((c.average - kpis.schoolAverage) * 10) / 10}% above avg` : `${Math.round((c.average - kpis.schoolAverage) * 10) / 10}% vs avg`}
                  </td>
                  <td className="py-3.5 text-center">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      OPTIMAL
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
