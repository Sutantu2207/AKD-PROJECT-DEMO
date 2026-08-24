import React from 'react';
import { requireRole } from '@/lib/auth';
import { BarChart3, TrendingUp, Users, Award, CheckCircle2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function TeacherAnalyticsPage() {
  const user = await requireRole(['TEACHER', 'SUPER_ADMIN', 'ADMIN', 'PRINCIPAL']);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Pedagogical Intelligence
        </span>
        <h1 className="text-2xl font-bold text-navy-950 font-serif">
          Class 10-A Mathematics Analytics
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Half-Yearly Examination statistical metrics, grade distributions, and performance curves.
        </p>
      </div>

      {/* Class Statistics KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-luxury">
          <span className="text-xs font-bold text-slate-400 uppercase">Class Average</span>
          <div className="text-3xl font-extrabold text-navy-950 font-serif mt-2">78.5%</div>
          <span className="text-xs text-emerald-700 font-semibold mt-1 block">↑ +2.5% vs Quarterly</span>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-luxury">
          <span className="text-xs font-bold text-slate-400 uppercase">Highest Score</span>
          <div className="text-3xl font-extrabold text-gold-600 font-serif mt-2">96.0%</div>
          <span className="text-xs text-slate-500 mt-1 block">Kavya Sridhar (10A02)</span>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-luxury">
          <span className="text-xs font-bold text-slate-400 uppercase">Median Score</span>
          <div className="text-3xl font-extrabold text-blue-600 font-serif mt-2">81.5%</div>
          <span className="text-xs text-slate-500 mt-1 block">Balanced distribution</span>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-luxury">
          <span className="text-xs font-bold text-slate-400 uppercase">Pass Rate</span>
          <div className="text-3xl font-extrabold text-emerald-600 font-serif mt-2">100%</div>
          <span className="text-xs text-emerald-700 font-semibold mt-1 block">10/10 Students Passed</span>
        </div>
      </div>

      {/* Grade Distribution */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-luxury space-y-6">
        <h3 className="text-base font-bold text-navy-950 font-serif">
          Grade Band Distribution (Class 10-A)
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-gold-50 border border-gold-200 text-center">
            <span className="text-2xl font-bold text-gold-800 font-serif block">4</span>
            <span className="font-bold text-navy-950 block mt-1">Grade A+ (90-100%)</span>
            <span className="text-[10px] text-slate-500">40% of class</span>
          </div>

          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-center">
            <span className="text-2xl font-bold text-blue-800 font-serif block">3</span>
            <span className="font-bold text-navy-950 block mt-1">Grade A (80-89%)</span>
            <span className="text-[10px] text-slate-500">30% of class</span>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
            <span className="text-2xl font-bold text-emerald-800 font-serif block">1</span>
            <span className="font-bold text-navy-950 block mt-1">Grade B+ (70-79%)</span>
            <span className="text-[10px] text-slate-500">10% of class</span>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-center">
            <span className="text-2xl font-bold text-amber-800 font-serif block">2</span>
            <span className="font-bold text-navy-950 block mt-1">Grade C/D (35-59%)</span>
            <span className="text-[10px] text-slate-500">Focus groups active</span>
          </div>
        </div>
      </div>
    </div>
  );
}
