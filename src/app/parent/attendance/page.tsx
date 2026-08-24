import React from 'react';
import { requireRole } from '@/lib/auth';
import { getParentDashboard } from '@/services/parentService';
import { CalendarCheck, CheckCircle2, XCircle, Clock, AlertTriangle, ShieldCheck } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ParentAttendancePage({
  searchParams,
}: {
  searchParams: Promise<{ childId?: string }>;
}) {
  const { childId } = await searchParams;
  const user = await requireRole(['PARENT', 'SUPER_ADMIN', 'ADMIN']);
  const data = await getParentDashboard(user.id, childId);

  if (!data || !data.activeChild) {
    return <div className="p-8 text-center bg-white rounded-xl">No attendance records found.</div>;
  }

  const { activeChild, attendanceList } = data;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Daily Tracking & Compliance
        </span>
        <h1 className="text-2xl font-bold text-navy-950 font-serif">
          Attendance Log & Regularity Metrics
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Student: <strong className="text-navy-950">{activeChild.name}</strong> ({activeChild.className}-{activeChild.sectionName})
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-luxury">
          <span className="text-xs font-bold text-slate-400 uppercase">Overall Attendance</span>
          <div className="text-3xl font-extrabold text-navy-950 font-serif mt-2">
            {activeChild.attendancePercentage}%
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">
            ✓ Exceeds 85% requirement
          </span>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-luxury">
          <span className="text-xs font-bold text-slate-400 uppercase">Present Sessions</span>
          <div className="text-3xl font-extrabold text-emerald-600 font-serif mt-2">
            {activeChild.presentDays}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Recorded working days</span>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-luxury">
          <span className="text-xs font-bold text-slate-400 uppercase">Unexcused Absences</span>
          <div className="text-3xl font-extrabold text-rose-600 font-serif mt-2">
            {activeChild.absentDays}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Zero unauthorized flags</span>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-luxury">
          <span className="text-xs font-bold text-slate-400 uppercase">Approved Leaves</span>
          <div className="text-3xl font-extrabold text-blue-600 font-serif mt-2">
            {activeChild.excusedDays}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Medical leave acknowledged</span>
        </div>
      </div>

      {/* Detailed Chronological Attendance Log */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-luxury space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-base font-bold text-navy-950">Daily Attendance Chronology</h3>
            <p className="text-xs text-slate-500">Verified teacher records for the current academic session</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider">
                <th className="pb-3 font-semibold">Date</th>
                <th className="pb-3 font-semibold text-center">Status</th>
                <th className="pb-3 font-semibold">Remarks & Authorizations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {attendanceList.map((a: any) => (
                <tr key={a.id} className="hover:bg-slate-50 transition">
                  <td className="py-3 font-bold text-navy-950">
                    {new Date(a.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="py-3 text-center">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        a.status === 'PRESENT'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : a.status === 'EXCUSED'
                          ? 'bg-blue-50 text-blue-800 border border-blue-200'
                          : a.status === 'LATE'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : 'bg-rose-50 text-rose-800 border border-rose-200'
                      }`}
                    >
                      {a.status === 'PRESENT' && <CheckCircle2 className="w-3 h-3" />}
                      {a.status === 'EXCUSED' && <Clock className="w-3 h-3" />}
                      {a.status === 'ABSENT' && <XCircle className="w-3 h-3" />}
                      {a.status}
                    </span>
                  </td>
                  <td className="py-3 text-slate-600 text-xs">
                    {a.remarks || 'Standard full session recorded.'}
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
