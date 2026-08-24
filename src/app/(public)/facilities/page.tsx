import React from 'react';
import { 
  Building2, BookOpen, Laptop, Trophy, Shield, Sparkles, CheckCircle2, 
  Flame, Music, Compass, Sun 
} from 'lucide-react';

export default function FacilitiesPage() {
  const facilities = [
    {
      title: 'Smart Interactive Classrooms',
      icon: Building2,
      desc: 'All 65+ classrooms are acoustically treated and equipped with digital interactive flat panels, high-speed fiber connectivity, and ergonomic modular furniture.',
      specs: ['65+ Smart Learning Spaces', 'Interactive 4K Touch Displays', 'Ergonomic Posture Seating'],
    },
    {
      title: 'Physics & Chemistry Research Labs',
      icon: Flame,
      desc: 'State-of-the-art laboratory benches with individual gas burners, precision digital balances, spectrometer stations, and complete safety containment apparatus.',
      specs: ['Over 120 Working Lab Stations', 'Digital Sensor Probes', 'OSHA Standard Safety Hoods'],
    },
    {
      title: 'Robotics & Advanced Computer Center',
      icon: Laptop,
      desc: '120 high-end computing systems featuring dedicated GPU acceleration for machine learning projects, Arduino/Raspberry Pi robotics benches, and 3D printing suites.',
      specs: ['120 Workstations (i7 / 32GB)', 'Robotics Workbench Kits', 'High-Speed Dedicated Fiber'],
    },
    {
      title: 'Central Knowledge Hub & Heritage Library',
      icon: BookOpen,
      desc: 'Houses over 35,000 physical volumes spanning classical Tamil literature, international encyclopedias, competitive exam repositories, plus digital e-book access.',
      specs: ['35,000+ Curated Books', 'Silent Research Pods', 'DELNET Digital Catalog Access'],
    },
    {
      title: 'Olympic-Standard Sports Arena & Track',
      icon: Trophy,
      desc: 'A full 400-meter synthetic running track, floodlit basketball and volleyball courts, 2 cricket nets with bowling machines, and indoor badminton arenas.',
      specs: ['400m All-Weather Athletic Track', 'Floodlit Basketball Arena', 'Indoor Badminton Courts'],
    },
    {
      title: 'Dr. A.P.J. Abdul Kalam Auditorium',
      icon: Music,
      desc: 'A grand 1,200-seat centrally air-conditioned cultural auditorium with professional acoustic line-array sound systems and stage theatrical lighting.',
      specs: ['1,200 Tiered Seating Capacity', 'Surround Sound Line Array', 'Green Rooms & Dressing Suites'],
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-16 text-center">
        <span className="text-xs font-bold text-gold-700 uppercase tracking-widest bg-gold-50 px-3 py-1 rounded-full border border-gold-200">
          World-Class Infrastructure
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold text-navy-950 mt-3 font-serif">
          State-of-the-Art Facilities & Learning Environments
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl mx-auto mt-3 leading-relaxed">
          Designed to stimulate curiosity, physical fitness, creative expression, and rigorous experimental inquiry.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {facilities.map((fac, idx) => {
          const Icon = fac.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-luxury hover:shadow-gold-glow hover:border-gold-400/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-navy-950 text-gold-400 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-navy-950 mb-2">{fac.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">{fac.desc}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-1.5">
                {fac.specs.map((sp, sIdx) => (
                  <div key={sIdx} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>{sp}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
