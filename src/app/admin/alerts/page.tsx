import React from 'react';
import { requireRole } from '@/lib/auth';
import { getAdminAcademicAlerts } from '@/services/adminService';
import { ShieldAlert, CheckCircle2, AlertTriangle, ArrowRight, UserCheck } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminAlertsPage() {
  const user = await requireRole(['ADMIN', 'SUPER_ADMIN', 'PRINCIPAL']);
  const alerts = await getAdminAcademicAlerts();

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Early Academic Attention System
        </span>
        <h1 className="text-2xl font-bold text-navy-950 font-serif">
          Academic Attention & Attendance Alerts
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Configurable rule-based triggers identifying consecutive score declines and low attendance.
        </p>
      </div>

      <div className="space-y-4">
        {alerts.map((al) => (
          <div
            key={al.id}
            className={`p-6 rounded-2xl border shadow-luxury flex flex-col md:flex-row justify-between items-start gap-6 ${
              al.status === 'ACTIVE'
                ? 'bg-amber-50/40 border-amber-300'
                : 'bg-white border-slate-200 opacity-70'
            }`}
          >
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded uppercase ${
                    al.severity === 'HIGH'
                      ? 'bg-rose-100 text-rose-900 border border-rose-300'
                      : 'bg-amber-100 text-amber-900 border border-amber-300'
                  }`}
                >
                  {al.type.replace('_', ' ')}
                </span>
                <span className="text-xs font-bold text-navy-950">
                  {al.student.user.name} ({al.student.rollNo} • Class 10-A)
                </span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">{al.message}</p>
            </div>

            <div className="flex flex-col items-start md:items-end gap-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  al.status === 'ACTIVE'
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-emerald-100 text-emerald-900'
                }`}
              >
                {al.status}
              </span>
              <button
                onClick={() => alert(`Academic intervention logged for ${al.student.user.name}`)}
                className="px-4 py-1.5 rounded-lg bg-navy-950 hover:bg-navy-900 text-gold-300 font-bold text-xs shadow-sm transition"
              >
                Log Intervention
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
