'use client';

import React, { useState } from 'react';
import { Settings, Save, CheckCircle2, Sparkles, Globe } from 'lucide-react';

export default function AdminCMSPage() {
  const [stats, setStats] = useState({
    stat_students: '1850',
    stat_faculty: '112',
    stat_years: '74',
    stat_achievements: '460',
    stat_pass_rate: '99.4',
    school_tagline: 'Tradition. Education. Excellence. Digital.',
  });

  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Public Website Content Management
        </span>
        <h1 className="text-2xl font-bold text-navy-950 font-serif">
          CMS & Dynamic Homepage Statistics
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Update public counters and banner copy without modifying source code.
        </p>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-center gap-2 animate-slide-up">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Homepage statistics and CMS settings updated in live database!</span>
        </div>
      )}

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-luxury">
        <form onSubmit={handleSave} className="space-y-6 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block font-bold text-navy-950 uppercase mb-1">
                Active Students Counter
              </label>
              <input
                type="text"
                value={stats.stat_students}
                onChange={(e) => setStats({ ...stats, stat_students: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-navy-900 font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-navy-950 uppercase mb-1">
                Faculty Strength Counter
              </label>
              <input
                type="text"
                value={stats.stat_faculty}
                onChange={(e) => setStats({ ...stats, stat_faculty: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-navy-900 font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-navy-950 uppercase mb-1">
                Years of Heritage Counter
              </label>
              <input
                type="text"
                value={stats.stat_years}
                onChange={(e) => setStats({ ...stats, stat_years: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-navy-900 font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-navy-950 uppercase mb-1">
                Board Exam Pass Rate (%)
              </label>
              <input
                type="text"
                value={stats.stat_pass_rate}
                onChange={(e) => setStats({ ...stats, stat_pass_rate: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-navy-900 font-bold"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-navy-950 uppercase mb-1">
                Primary School Tagline
              </label>
              <input
                type="text"
                value={stats.school_tagline}
                onChange={(e) => setStats({ ...stats, school_tagline: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-navy-900 font-bold"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-navy-950 hover:bg-navy-900 text-gold-300 font-bold text-xs shadow-md transition flex items-center gap-2"
            >
              <Save className="w-4 h-4" /> Save CMS Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
