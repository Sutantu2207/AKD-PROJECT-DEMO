import React from 'react';
import { db } from '@/lib/db';
import { Award, Trophy, Sparkles, Filter, Calendar } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AchievementsPage() {
  const achievements = await db.achievement.findMany({
    where: { isPublic: true },
    orderBy: { date: 'desc' },
  });

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-12 text-center">
        <span className="text-xs font-bold text-gold-700 uppercase tracking-widest bg-gold-50 px-3 py-1 rounded-full border border-gold-200">
          Hall of Distinction
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold text-navy-950 mt-3 font-serif">
          Interactive Achievement Wall
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl mx-auto mt-3 leading-relaxed">
          Celebrating state, national, and international accolades won by our students across STEM, arts, athletics, and leadership.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-luxury hover:shadow-gold-glow hover:border-gold-400/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] font-bold text-gold-800 bg-gold-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {ach.category}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(ach.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span>
                </div>

                <h3 className="text-base font-bold text-navy-950 mb-1.5">{ach.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{ach.description}</p>
              </div>

              {ach.badgeType && (
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    🏆 {ach.badgeType}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">Verified Credential</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
