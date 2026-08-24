import React from 'react';
import { requireRole } from '@/lib/auth';
import { getStudentDashboard } from '@/services/studentService';
import { Award, Trophy, Sparkles, CheckCircle2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function StudentAchievementsPage() {
  const user = await requireRole(['STUDENT', 'SUPER_ADMIN', 'ADMIN']);
  const data = await getStudentDashboard(user.id);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Student Recognition & Badges
        </span>
        <h1 className="text-2xl font-bold text-navy-950 font-serif">
          My Achievement Portfolio & Credentials
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Verified certificates, Olympiad medals, and positive academic badges.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.achievements.map((ach) => (
          <div
            key={ach.id}
            className="p-6 rounded-2xl bg-white border border-slate-200 shadow-luxury flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-bold text-gold-800 bg-gold-100 px-2.5 py-0.5 rounded uppercase">
                  {ach.category}
                </span>
                <span className="text-xs text-slate-400">{new Date(ach.date).toLocaleDateString()}</span>
              </div>
              <h3 className="text-base font-bold text-navy-950 mt-2">{ach.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-1">{ach.description}</p>
            </div>

            {ach.badgeType && (
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  🏆 {ach.badgeType}
                </span>
                <span className="text-[10px] text-slate-400 font-semibold">Institutional Seal</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
