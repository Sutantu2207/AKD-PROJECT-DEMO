import React from 'react';
import Link from 'next/link';
import { requireRole } from '@/lib/auth';
import { getPrincipalOverview } from '@/services/principalService';
import { 
  Award, ShieldAlert, ClipboardCheck, Users, BookOpen, 
  ArrowRight, CheckCircle2, TrendingUp 
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function PrincipalDashboardPage() {
  const user = await requireRole(['PRINCIPAL', 'SUPER_ADMIN']);
  const overview = await getPrincipalOverview();

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="bg-navy-950 text-white p-8 rounded-2xl shadow-luxury flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border border-navy-800">
        <div>
          <span className="text-xs font-bold text-gold-400 uppercase tracking-wider block">
            Academic Head & Management Oversight
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white mt-1">
            Principal&apos;s Command Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 font-light mt-1">
            Session {overview.academicYear} • Prof. S. Meenakshi Sundaram
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/principal/corrections"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-amber-400 text-navy-950 font-bold text-xs shadow-md hover:shadow-gold-glow transition flex items-center gap-1.5"
          >
            <ClipboardCheck className="w-3.5 h-3.5" /> Correction Requests ({overview.pendingCorrections.length})
          </Link>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-luxury">
          <span className="text-xs font-bold text-slate-400 uppercase">Active Student Body</span>
          <div className="text-3xl font-extrabold text-navy-950 font-serif mt-2">
            {overview.totalStudents}
          </div>
          <span className="text-xs text-slate-500 mt-1 block">Full institutional strength</span>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-luxury">
          <span className="text-xs font-bold text-slate-400 uppercase">Distinguished Faculty</span>
          <div className="text-3xl font-extrabold text-navy-950 font-serif mt-2">
            {overview.totalFaculty}
          </div>
          <span className="text-xs text-slate-500 mt-1 block">Active curriculum leads</span>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-luxury">
          <span className="text-xs font-bold text-slate-400 uppercase">Flagged Academic Alerts</span>
          <div className="text-3xl font-extrabold text-amber-600 font-serif mt-2">
            {overview.activeAlerts.length}
          </div>
          <span className="text-xs text-slate-500 mt-1 block">Early intervention cases</span>
        </div>
      </div>

      {/* Faculty Workload Breakdown */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-luxury space-y-4">
        <h3 className="text-base font-bold text-navy-950">Faculty Teaching Assignments & Scope</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {overview.facultySummary.map((f) => (
            <div key={f.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-navy-950">{f.name}</h4>
                  <span className="text-[10px] text-slate-400">{f.employeeId} • {f.department}</span>
                </div>
                <span className="text-[10px] font-bold text-gold-700 bg-gold-50 px-2 py-0.5 rounded border border-gold-200">
                  {f.classesTaught.length} Assigned Classes
                </span>
              </div>
              <div className="flex flex-wrap gap-1 pt-1">
                {f.classesTaught.map((ct, idx) => (
                  <span key={idx} className="bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-700 font-medium">
                    {ct}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
