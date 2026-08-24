import React from 'react';
import { requireRole } from '@/lib/auth';
import { db } from '@/lib/db';
import { Users, GraduationCap, Phone, MapPin, Mail } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminParentsPage() {
  const user = await requireRole(['ADMIN', 'SUPER_ADMIN', 'PRINCIPAL']);

  const parents = await db.parentProfile.findMany({
    include: {
      user: true,
      children: {
        include: {
          student: {
            include: {
              user: true,
              enrollments: {
                where: { academicYear: { isCurrent: true } },
                include: { class: true, section: true },
              },
            },
          },
        },
      },
    },
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Guardian Directory & Linkages
        </span>
        <h1 className="text-2xl font-bold text-navy-950 font-serif">
          Parent & Guardian Profiles
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Supports multi-child linkages (e.g. Ramesh Sharma linked to both Aarav in 10-A and Ananya in 8-A).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {parents.map((p) => (
          <div key={p.id} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-luxury space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <h3 className="text-base font-bold text-navy-950">{p.user.name}</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {p.children.length} Children
                </span>
              </div>
              <p className="text-xs text-slate-500">{p.occupation || 'Parent'}</p>

              <div className="pt-2 text-xs space-y-1 text-slate-600">
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{p.user.email}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{p.user.phone || 'No phone recorded'}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <span className="text-[11px] font-bold text-navy-950 block mb-1.5">Linked Students:</span>
              <div className="space-y-1">
                {p.children.map((rel) => {
                  const enroll = rel.student.enrollments[0];
                  return (
                    <div key={rel.id} className="flex justify-between items-center text-xs p-1.5 rounded bg-slate-50 border border-slate-200">
                      <span className="font-semibold text-navy-950">{rel.student.user.name}</span>
                      <span className="text-[10px] text-gold-800 bg-gold-50 px-1.5 py-0.5 rounded font-mono font-bold">
                        {enroll ? `${enroll.class.name}-${enroll.section.name}` : 'Class 10-A'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
