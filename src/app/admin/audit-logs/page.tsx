import React from 'react';
import { requireRole } from '@/lib/auth';
import { getAdminAuditLogs } from '@/services/adminService';
import { History, Shield, CheckCircle2, Lock } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminAuditLogsPage() {
  const user = await requireRole(['SUPER_ADMIN', 'ADMIN', 'PRINCIPAL']);
  const logs = await getAdminAuditLogs(50);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          System Integrity & Compliance
        </span>
        <h1 className="text-2xl font-bold text-navy-950 font-serif">
          Tamper-Proof Audit Trail
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Immutable chronological log of all sensitive mark publications, attendance records, and faculty assignments.
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-luxury overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-navy-950 text-navy-950 uppercase tracking-wider font-bold">
              <th className="pb-3 w-40">Timestamp</th>
              <th className="pb-3 w-40">User & Role</th>
              <th className="pb-3 w-44">Action</th>
              <th className="pb-3 w-32">Entity</th>
              <th className="pb-3">Reason / Context</th>
              <th className="pb-3 w-28 text-right">IP Address</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-slate-50 transition">
                <td className="py-3 font-mono text-slate-500 text-[11px]">
                  {new Date(log.createdAt).toLocaleString()}
                </td>
                <td className="py-3 font-semibold text-navy-950">
                  <div>{log.user?.name || 'System Auto'}</div>
                  <span className="text-[10px] text-slate-400 font-mono">{log.userRole}</span>
                </td>
                <td className="py-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-navy-950 text-gold-300 font-mono">
                    {log.action}
                  </span>
                </td>
                <td className="py-3 text-slate-600 font-mono text-[11px]">{log.entityType}</td>
                <td className="py-3 text-slate-600 italic">{log.reason || 'Operation logged by server.'}</td>
                <td className="py-3 text-right font-mono text-slate-400 text-[11px]">{log.ipAddress}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
