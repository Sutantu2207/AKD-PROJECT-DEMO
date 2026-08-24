import React from 'react';
import { requireRole } from '@/lib/auth';
import { getParentDashboard, getParentYearComparison } from '@/services/parentService';
import { getGroundedStudentInsights } from '@/services/aiInsightService';
import { PerformanceCharts } from '@/components/charts/PerformanceCharts';
import { Sparkles, TrendingUp, ShieldCheck, ArrowUpRight, ArrowDownRight, Minus, Bot } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ParentPerformancePage({
  searchParams,
}: {
  searchParams: Promise<{ childId?: string }>;
}) {
  const { childId } = await searchParams;
  const user = await requireRole(['PARENT', 'SUPER_ADMIN', 'ADMIN']);
  const data = await getParentDashboard(user.id, childId);

  if (!data || !data.activeChild) {
    return <div className="p-8 text-center bg-white rounded-xl">No performance records found.</div>;
  }

  const { activeChild, performanceChartData } = data;
  const yoyData = await getParentYearComparison(activeChild.studentId);
  const aiInsights = await getGroundedStudentInsights(activeChild.studentId);

  return (
    <div className="space-y-10 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Longitudinal Analytics
        </span>
        <h1 className="text-2xl font-bold text-navy-950 font-serif">
          Academic Progress & Multi-Term Trajectory
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Student: <strong className="text-navy-950">{activeChild.name}</strong> ({activeChild.className}-{activeChild.sectionName} • Roll {activeChild.rollNo})
        </p>
      </div>

      {/* Grounded AI Academic Insights Banner */}
      {aiInsights.length > 0 && (
        <div className="bg-navy-950 text-white p-6 sm:p-8 rounded-2xl shadow-luxury space-y-4 border border-navy-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gold-300 font-bold text-sm">
              <Bot className="w-5 h-5 text-gold-400" />
              <span>Grounded AI Performance Insights</span>
            </div>
            <span className="text-[10px] uppercase font-bold text-gold-400 bg-gold-400/20 px-2.5 py-0.5 rounded border border-gold-400/30">
              Verified Against Database Scores
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aiInsights.map((ins) => (
              <div key={ins.id} className="p-4 rounded-xl bg-navy-900/90 border border-navy-700/70 space-y-2">
                <span className="text-xs font-bold text-gold-400">{ins.subjectName}</span>
                <p className="text-xs text-slate-200 leading-relaxed font-light">{ins.insightText}</p>
                {ins.evidence && (
                  <div className="pt-2 border-t border-navy-800 text-[11px] text-slate-400 flex items-center gap-3">
                    <span>Baseline: {ins.evidence.previousScore}%</span>
                    <span>→</span>
                    <span className="text-emerald-400 font-semibold">Latest: {ins.evidence.currentScore}% (+{ins.delta}%)</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Interactive Recharts Section */}
      <PerformanceCharts
        multiTermData={performanceChartData}
        yearComparisonData={yoyData.comparisons}
        previousYearName={yoyData.previousYear || '2024-2025'}
        currentYearName={yoyData.currentYear || '2025-2026'}
      />

      {/* Year-over-Year Detailed Mathematical Calculation Table */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-luxury space-y-4">
        <div>
          <h3 className="text-base font-bold text-navy-950">
            Year-over-Year Mathematical Score Comparison
          </h3>
          <p className="text-xs text-slate-500">
            Formula: Difference = Current Score − Previous Score | % Change = ((Current − Prev) / Prev) × 100
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider">
                <th className="pb-3 font-semibold">Subject</th>
                <th className="pb-3 font-semibold text-center">{yoyData.previousYear} Score</th>
                <th className="pb-3 font-semibold text-center">{yoyData.currentYear} Score</th>
                <th className="pb-3 font-semibold text-center">Score Delta (Points)</th>
                <th className="pb-3 font-semibold text-center">Percentage Growth</th>
                <th className="pb-3 font-semibold text-center">Trajectory</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {yoyData.comparisons.map((c: any, idx: number) => (
                <tr key={idx} className="hover:bg-slate-50 transition">
                  <td className="py-3.5 font-bold text-navy-950">{c.subject}</td>
                  <td className="py-3.5 text-center font-medium text-slate-600">
                    {c.previousScore !== null ? `${c.previousScore}%` : 'N/A'}
                  </td>
                  <td className="py-3.5 text-center font-extrabold text-navy-950 text-sm">
                    {c.currentScore}%
                  </td>
                  <td className="py-3.5 text-center font-bold">
                    {c.difference !== null && c.difference > 0 ? (
                      <span className="text-emerald-700 flex items-center justify-center gap-0.5">
                        <ArrowUpRight className="w-3.5 h-3.5" /> +{c.difference} pts
                      </span>
                    ) : c.difference !== null && c.difference < 0 ? (
                      <span className="text-rose-700 flex items-center justify-center gap-0.5">
                        <ArrowDownRight className="w-3.5 h-3.5" /> {c.difference} pts
                      </span>
                    ) : (
                      <span className="text-slate-400 flex items-center justify-center gap-0.5">
                        <Minus className="w-3.5 h-3.5" /> 0.0 pts
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 text-center font-bold text-slate-700">
                    {c.percentageChange !== null && c.percentageChange > 0 ? (
                      <span className="text-emerald-700">+{c.percentageChange}%</span>
                    ) : c.percentageChange !== null ? (
                      <span>{c.percentageChange}%</span>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td className="py-3.5 text-center">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        c.trend === 'IMPROVING'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {c.trend}
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
