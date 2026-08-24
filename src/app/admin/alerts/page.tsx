'use client';

import React, { useState } from 'react';
import { ShieldAlert, CheckCircle2, AlertTriangle, ArrowRight, UserCheck } from 'lucide-react';

export default function AdminAlertsPage() {
  const [loggedInterventions, setLoggedInterventions] = useState<{ [id: string]: boolean }>({});

  const alerts = [
    {
      id: 'al_1',
      type: 'SCORE_DECLINE',
      severity: 'HIGH',
      status: 'ACTIVE',
      studentName: 'Deepak Varma (10A04 • Class 10-A)',
      message: 'Consecutive score decline detected across Unit Test 1 (68%) and Quarterly Examination (52%) in Mathematics.',
    },
    {
      id: 'al_2',
      type: 'LOW_ATTENDANCE',
      severity: 'MEDIUM',
      status: 'ACTIVE',
      studentName: 'Naveen Raj (10A10 • Class 10-A)',
      message: 'Monthly attendance fell below school threshold (81.2% vs required 85.0%).',
    },
  ];

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
                  {al.studentName}
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
                onClick={() => {
                  setLoggedInterventions((prev) => ({ ...prev, [al.id]: true }));
                  alert(`Intervention scheduled for ${al.studentName}`);
                }}
                className="px-4 py-1.5 rounded-lg bg-navy-950 hover:bg-navy-900 text-gold-300 font-bold text-xs shadow-sm transition"
              >
                {loggedInterventions[al.id] ? '✓ Intervention Logged' : 'Log Intervention'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
