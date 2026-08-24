import React from 'react';
import { requireRole } from '@/lib/auth';
import { getAdminTeachers } from '@/services/adminService';
import { UserCheck, BookOpen, Plus, Shield } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminTeachersPage() {
  const user = await requireRole(['ADMIN', 'SUPER_ADMIN', 'PRINCIPAL']);
  const teachers = await getAdminTeachers();

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Faculty Directory & Workload
        </span>
        <h1 className="text-2xl font-bold text-navy-950 font-serif">
          Teacher Profiles & Class Assignments
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Explicit subject and class mappings governing teacher RBAC permissions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {teachers.map((t) => (
          <div key={t.id} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-luxury space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-bold text-navy-900 bg-slate-100 px-2 py-0.5 rounded font-mono">
                  {t.employeeId}
                </span>
                <h3 className="text-base font-bold text-navy-950 mt-1">{t.user.name}</h3>
                <p className="text-xs text-slate-500">{t.qualification} • {t.department}</p>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                ACTIVE
              </span>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <span className="text-xs font-bold text-navy-950 block mb-2">Assigned Curriculum Load:</span>
              <div className="flex flex-wrap gap-1.5">
                {t.assignments.map((a) => (
                  <span
                    key={a.id}
                    className="text-xs bg-navy-50 text-navy-900 px-2.5 py-1 rounded-lg border border-navy-200 font-medium"
                  >
                    {a.class.name}-{a.section.name} ({a.subject.name})
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
