import React from 'react';
import Link from 'next/link';
import { requireRole } from '@/lib/auth';
import { getStudentDashboard } from '@/services/studentService';
import { 
  Award, BookOpen, CalendarCheck, FileText, ArrowRight, Sparkles, 
  TrendingUp, Clock, CheckCircle2, Trophy 
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function StudentDashboardPage() {
  const user = await requireRole(['STUDENT', 'SUPER_ADMIN', 'ADMIN']);
  const data = await getStudentDashboard(user.id);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="bg-navy-950 text-white p-8 rounded-2xl shadow-luxury flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border border-navy-800">
        <div>
          <span className="text-xs font-bold text-gold-400 uppercase tracking-wider block">
            Student Academic Workspace
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white mt-1">
            Welcome back, {data.student.name.split(' ')[0]}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 font-light mt-1">
            {data.student.className} - Section {data.student.sectionName} • Roll Number: {data.student.rollNo} • Admission ID: {data.student.admissionNo}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/student/assignments"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-amber-400 text-navy-950 font-bold text-xs shadow-md hover:shadow-gold-glow transition flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5" /> Submit Homework
          </Link>
          <Link
            href="/student/study-material"
            className="px-5 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-slate-200 border border-navy-700 text-xs font-semibold transition"
          >
            Study Notes
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-luxury">
          <span className="text-xs font-bold text-slate-400 uppercase">Cumulative Score</span>
          <div className="text-3xl font-extrabold text-navy-950 font-serif mt-2">
            {data.overallPercentage}%
          </div>
          <span className="text-xs font-bold text-gold-700 bg-gold-50 px-2 py-0.5 rounded border border-gold-200 mt-2 inline-block">
            Grade {data.overallGrade} • Distinction
          </span>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-luxury">
          <span className="text-xs font-bold text-slate-400 uppercase">My Attendance</span>
          <div className="text-3xl font-extrabold text-emerald-600 font-serif mt-2">
            {data.attendance.rate}%
          </div>
          <span className="text-xs text-slate-500 mt-2 block">
            {data.attendance.presentDays} of {data.attendance.totalDays} sessions
          </span>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-luxury">
          <span className="text-xs font-bold text-slate-400 uppercase">Active Assignments</span>
          <div className="text-3xl font-extrabold text-navy-950 font-serif mt-2">
            {data.assignments.length}
          </div>
          <span className="text-xs text-blue-700 font-medium mt-2 block">
            Next due in 3 days
          </span>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-luxury">
          <span className="text-xs font-bold text-slate-400 uppercase">Earned Badges</span>
          <div className="text-3xl font-extrabold text-gold-600 font-serif mt-2">
            {data.achievements.length}
          </div>
          <span className="text-xs text-emerald-700 font-medium mt-2 block">
            🏆 Improvement Star
          </span>
        </div>
      </div>

      {/* Two Columns: Subject Overview & Pending Work */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Subject Breakdown */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-luxury space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-navy-950">Subject Performance Breakdown</h3>
            <Link href="/student/performance" className="text-xs font-bold text-gold-700 hover:underline">
              Detailed Trends →
            </Link>
          </div>

          <div className="space-y-3">
            {data.subjectPerformances.map((sub) => (
              <div
                key={sub.subjectId}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4"
              >
                <div>
                  <h4 className="font-bold text-navy-950 text-xs sm:text-sm">{sub.subjectName}</h4>
                  <span className="text-[11px] text-slate-500">
                    Latest: {sub.latestScore}/{sub.maxMarks} • Class Avg: {sub.classAverage}%
                  </span>
                </div>

                <div className="flex items-center gap-3 text-right">
                  <div>
                    <span className="text-sm font-extrabold text-navy-950 block">{sub.percentage}%</span>
                    <span className="text-[10px] font-bold text-gold-700">Grade {sub.grade}</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {sub.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Upcoming Homework & Exams */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-luxury space-y-4">
            <h3 className="text-sm font-bold text-navy-950">Upcoming Deadlines</h3>
            <div className="space-y-3">
              {data.assignments.slice(0, 3).map((a) => (
                <div key={a.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <div className="flex justify-between items-start font-semibold text-navy-950">
                    <span>{a.title}</span>
                    <span className="text-[10px] text-gold-800 bg-gold-100 px-1.5 py-0.5 rounded font-bold">
                      {a.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">Due: {a.dueDate} • {a.subjectName}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
