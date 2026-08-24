import React from 'react';
import { Trophy, Music, Palette, Users, Globe, Compass, Award, Sparkles } from 'lucide-react';

export default function StudentLifePage() {
  const houses = [
    { name: 'Kalam House', motto: 'Wings of Innovation', color: 'from-amber-500 to-amber-700', badge: 'Yellow' },
    { name: 'Ramanujan House', motto: 'Truth in Logic', color: 'from-blue-600 to-blue-800', badge: 'Blue' },
    { name: 'Bharathi House', motto: 'Courage in Expression', color: 'from-red-600 to-red-800', badge: 'Red' },
    { name: 'Tagore House', motto: 'Harmony in Arts', color: 'from-emerald-600 to-emerald-800', badge: 'Green' },
  ];

  const clubs = [
    { name: 'Robotics & AI Guild', desc: 'Design line-following bots, drone aerodynamics, and AI vision models.' },
    { name: 'Debate & Model UN', desc: 'Sharpen parliamentary debate, diplomacy, and international relations reasoning.' },
    { name: 'Eco-Warriors & Forestry', desc: 'Manage organic campus gardens, composting, and biodiversity cataloging.' },
    { name: 'Carnatic Music & Orchestra', desc: 'Vocal recitals, mridangam percussion, violin ensemble, and annual concerts.' },
    { name: 'Literary & Creative Writing', desc: 'Publish the bi-monthly school journal "The Dharma Raja Chronicle".' },
    { name: 'Astronomy & Stargazing', desc: 'Night sky observation sessions using computerized telescope mounts.' },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-16 text-center">
        <span className="text-xs font-bold text-gold-700 uppercase tracking-widest bg-gold-50 px-3 py-1 rounded-full border border-gold-200">
          Vibrant Campus Life
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold text-navy-950 mt-3 font-serif">
          Co-Curriculars, Houses & Student Clubs
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl mx-auto mt-3 leading-relaxed">
          Nurturing well-rounded, socially adept leaders through active engagement in sports, cultural arts, debates, and community service.
        </p>
      </div>

      {/* House System */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-20">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-navy-950 font-serif">The Four Institutional Houses</h2>
          <p className="text-xs text-slate-500">Every student is assigned to a House fostering camaraderie and healthy competition.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {houses.map((h, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-luxury text-center flex flex-col items-center justify-between"
            >
              <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${h.color} text-white font-bold text-lg flex items-center justify-center shadow-md mb-4`}>
                {h.name.charAt(0)}
              </div>
              <h3 className="text-base font-bold text-navy-950">{h.name}</h3>
              <p className="text-xs text-slate-500 italic mt-1">&ldquo;{h.motto}&rdquo;</p>
              <span className="mt-4 text-[10px] uppercase font-bold text-slate-400 border border-slate-200 px-2 py-0.5 rounded">
                House of Distinction
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Student Clubs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-navy-950 font-serif">Student Clubs & Societies</h2>
          <p className="text-xs text-slate-500">Meeting every Wednesday afternoon for faculty-mentored hands-on exploration.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubs.map((c, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition">
              <h3 className="text-sm font-bold text-navy-950 mb-1.5">{c.name}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
