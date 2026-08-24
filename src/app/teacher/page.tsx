import React from 'react';
import Link from 'next/link';
import { requireRole } from '@/lib/auth';
import { getTeacherDashboard } from '@/services/teacherService';
import { 
  Users, BookOpen, ClipboardCheck, CalendarCheck, FileText, 
  ArrowRight, CheckCircle2, Clock, Sparkles, TrendingUp 
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function TeacherDashboardPage() {
  const user = await requireRole(['TEACHER', 'SUPER_ADMIN', 'ADMIN', 'PRINCIPAL']);
  const data = await getTeacherDashboard(user.id);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="bg-navy-950 text-white p-8 rounded-2xl shadow-luxury flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border border-navy-800">
        <div>
          <span className="text-xs font-bold text-gold-400 uppercase tracking-wider block">
            Faculty Academic Workspace
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white mt-1">
            Welcome, {data.teacher.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 font-light mt-1">
            Employee ID: {data.teacher.employeeId} • Department of {data.teacher.department} • {data.teacher.qualification}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/teacher/marks"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-amber-400 text-navy-950 font-bold text-xs shadow-md hover:shadow-gold-glow transition flex items-center gap-1.5"
          >
            <ClipboardCheck className="w-3.5 h-3.5" /> Spreadsheet Mark Entry
          </Link>
          <Link
            href="/teacher/attendance"
            className="px-5 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-slate-200 border border-navy-700 text-xs font-semibold transition flex items-center gap-1.5"
          >
            <CalendarCheck className="w-3.5 h-3.5" /> Daily Attendance
          </Link>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-luxury">
          <span className="text-xs font-bold text-slate-400 uppercase">Assigned Classes</span>
          <div className="text-3xl font-extrabold text-navy-950 font-serif mt-2">
            {data.totalClasses}
          </div>
          <span className="text-xs text-slate-500 mt-1 block">Active curriculum tracks</span>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-luxury">
          <span className="text-xs font-bold text-slate-400 uppercase">Total Students</span>
          <div className="text-3xl font-extrabold text-emerald-600 font-serif mt-2">
            {data.totalStudents}
          </div>
          <span className="text-xs text-slate-500 mt-1 block">Across all assigned sections</span>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-luxury">
          <span className="text-xs font-bold text-slate-400 uppercase">Pending Draft Marks</span>
          <div className="text-3xl font-extrabold text-amber-600 font-serif mt-2">
            {data.pendingAssessments.length}
          </div>
          <span className="text-xs text-slate-500 mt-1 block">Ready for publication</span>
        </div>
      </div>

      {/* Assigned Classes Grid */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-navy-950 font-serif">My Assigned Classes & Sections</h2>
            <p className="text-xs text-slate-500">Access is strictly scoped to your assigned subjects and sections.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.assignedClasses.map((c) => (
            <div
              key={c.assignmentId}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-luxury hover:border-gold-400/60 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-bold text-navy-950 bg-slate-100 px-2.5 py-1 rounded font-mono">
                    {c.className} - {c.sectionName}
                  </span>
                  <span className="text-xs font-bold text-gold-700 bg-gold-50 px-2 py-0.5 rounded border border-gold-200">
                    {c.subjectCode}
                  </span>
                </div>

                <h3 className="text-base font-bold text-navy-950">{c.subjectName}</h3>
                <p className="text-xs text-slate-500 mt-1">{c.studentCount} Enrolled Students</p>

                <div className="mt-4 pt-3 border-t border-slate-100 text-xs flex justify-between">
                  <span className="text-slate-500">Class Average:</span>
                  <strong className="text-navy-950 font-bold">{c.averageScore}%</strong>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100 flex gap-2">
                <Link
                  href="/teacher/marks"
                  className="flex-1 text-center py-2 rounded-lg bg-navy-950 hover:bg-navy-900 text-gold-300 font-bold text-xs shadow-sm transition"
                >
                  Enter Marks
                </Link>
                <Link
                  href="/teacher/attendance"
                  className="flex-1 text-center py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition"
                >
                  Attendance
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
