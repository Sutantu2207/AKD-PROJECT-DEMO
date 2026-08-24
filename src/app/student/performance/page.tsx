import React from 'react';
import { requireRole } from '@/lib/auth';
import { getStudentDashboard } from '@/services/studentService';
import { getGroundedStudentInsights } from '@/services/aiInsightService';
import { Award, TrendingUp, CheckCircle2, Bot, Sparkles } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function StudentPerformancePage() {
  const user = await requireRole(['STUDENT', 'SUPER_ADMIN', 'ADMIN']);
  const data = await getStudentDashboard(user.id);
  const insights = await getGroundedStudentInsights(data.student.id);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Academic Progress Report
        </span>
        <h1 className="text-2xl font-bold text-navy-950 font-serif">
          My Scores & Subject Analytics
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Student: <strong className="text-navy-950">{data.student.name}</strong> ({data.student.className}-{data.student.sectionName})
        </p>
      </div>

      {/* Grounded AI Insights */}
      {insights.length > 0 && (
        <div className="p-6 rounded-2xl bg-navy-950 text-white shadow-luxury space-y-4 border border-navy-800">
          <div className="flex items-center gap-2 text-gold-300 font-bold text-sm">
            <Bot className="w-5 h-5 text-gold-400" />
            <span>AI Learning & Focus Insights</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {insights.map((ins) => (
              <div key={ins.id} className="p-4 rounded-xl bg-navy-900 border border-navy-700 text-xs space-y-1.5">
                <span className="text-xs font-bold text-gold-400">{ins.subjectName}</span>
                <p className="text-slate-300 leading-relaxed">{ins.insightText}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Subject Detailed Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.subjectPerformances.map((sub) => (
          <div
            key={sub.subjectId}
            className="p-6 rounded-2xl bg-white border border-slate-200 shadow-luxury flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-navy-900 bg-slate-100 px-2 py-0.5 rounded font-mono">
                  {sub.subjectCode}
                </span>
                <span className="text-xs font-bold text-gold-700 bg-gold-50 px-2 py-0.5 rounded border border-gold-200">
                  Grade {sub.grade}
                </span>
              </div>
              <h3 className="text-lg font-bold text-navy-950 mt-2">{sub.subjectName}</h3>

              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-navy-950 font-serif">{sub.percentage}%</span>
                <span className="text-xs text-slate-500">({sub.latestScore}/{sub.maxMarks} marks)</span>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 text-xs space-y-1 text-slate-600">
                <div className="flex justify-between">
                  <span>Class Average:</span>
                  <strong className="text-navy-950">{sub.classAverage}%</strong>
                </div>
                <div className="flex justify-between">
                  <span>Trend Status:</span>
                  <strong className="text-emerald-700">{sub.trend}</strong>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100">
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full block text-center border border-emerald-200">
                ✓ {sub.statusBadge}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
