import React from 'react';
import { requireRole } from '@/lib/auth';
import { db } from '@/lib/db';
import { BookOpen, Users, Plus, Award } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminClassesPage() {
  const user = await requireRole(['ADMIN', 'SUPER_ADMIN', 'PRINCIPAL']);

  const classes = await db.class.findMany({
    include: {
      sections: true,
      subjects: true,
      enrollments: { where: { academicYear: { isCurrent: true }, status: 'ACTIVE' } },
    },
    orderBy: { gradeLevel: 'asc' },
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Academic Structure
        </span>
        <h1 className="text-2xl font-bold text-navy-950 font-serif">
          Classes, Sections & Subjects
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Curricular grade frameworks, enrolled student capacities, and subject allocations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {classes.map((c) => (
          <div key={c.id} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-luxury space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold text-gold-700 bg-gold-50 px-2.5 py-0.5 rounded border border-gold-200">
                  Grade {c.gradeLevel}
                </span>
                <span className="text-xs text-slate-500 font-bold">
                  {c.enrollments.length} Active Students
                </span>
              </div>

              <h3 className="text-xl font-bold text-navy-950 mt-2 font-serif">{c.name}</h3>

              <div className="mt-3">
                <span className="text-xs font-bold text-navy-950 block mb-1">Sections:</span>
                <div className="flex gap-2">
                  {c.sections.map((sec) => (
                    <span key={sec.id} className="text-xs bg-slate-100 px-2.5 py-1 rounded-md font-mono font-bold text-navy-950">
                      Section {sec.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100">
                <span className="text-xs font-bold text-navy-950 block mb-1.5">Curricular Subjects:</span>
                <div className="flex flex-wrap gap-1">
                  {c.subjects.map((sub) => (
                    <span key={sub.id} className="text-[11px] bg-navy-50 text-navy-900 px-2 py-0.5 rounded border border-navy-200">
                      {sub.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
