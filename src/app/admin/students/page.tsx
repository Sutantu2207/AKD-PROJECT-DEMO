import React from 'react';
import { requireRole } from '@/lib/auth';
import { getAdminStudents } from '@/services/adminService';
import { GraduationCap, Search, Plus, Users, UserCheck, Shield } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminStudentsPage() {
  const user = await requireRole(['ADMIN', 'SUPER_ADMIN', 'PRINCIPAL']);
  const students = await getAdminStudents();

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Student Information System (SIS)
          </span>
          <h1 className="text-2xl font-bold text-navy-950 font-serif">
            Enrolled Student Directory
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage student registrations, academic year enrollments, and parent linkages.
          </p>
        </div>
      </div>

      {/* Directory Table */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-luxury overflow-x-auto space-y-4">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-navy-950">Total Enrolled Students: {students.length}</span>
        </div>

        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-navy-950 text-navy-950 uppercase tracking-wider font-bold">
              <th className="pb-3 w-20">Roll No</th>
              <th className="pb-3 w-48">Student Name</th>
              <th className="pb-3 w-36">Admission No</th>
              <th className="pb-3 w-32">Class & Section</th>
              <th className="pb-3 w-48">Linked Parent / Contact</th>
              <th className="pb-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {students.map((st) => {
              const currentEnroll = st.enrollments[0];
              const parentRel = st.parents[0];
              return (
                <tr key={st.id} className="hover:bg-slate-50 transition">
                  <td className="py-3 font-bold text-navy-950">{st.rollNo}</td>
                  <td className="py-3 font-semibold text-navy-950">
                    <div>{st.user.name}</div>
                    <span className="text-[10px] text-slate-400 font-normal">{st.user.email}</span>
                  </td>
                  <td className="py-3 font-mono text-slate-600">{st.admissionNo}</td>
                  <td className="py-3 font-medium text-slate-800">
                    {currentEnroll ? `${currentEnroll.class.name} - ${currentEnroll.section.name}` : 'Class 10-A'}
                  </td>
                  <td className="py-3 text-slate-600">
                    {parentRel ? (
                      <div>
                        <strong className="text-navy-950">{parentRel.parent.user.name}</strong>
                        <div className="text-[10px] text-slate-400">{parentRel.parent.user.phone || 'No phone recorded'}</div>
                      </div>
                    ) : (
                      <span className="text-slate-400 italic">No parent linked</span>
                    )}
                  </td>
                  <td className="py-3 text-center">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      ACTIVE
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
