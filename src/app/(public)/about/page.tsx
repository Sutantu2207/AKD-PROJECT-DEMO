import React from 'react';
import { Shield, Award, BookOpen, Compass, Users, CheckCircle2, Star, Sparkles } from 'lucide-react';

export default function AboutPage() {
  const historyTimeline = [
    {
      year: '1952',
      title: 'Founding of A.K.D. Dharma Raja School',
      desc: 'Established with the noble philanthropic vision of Shri A.K.D. Dharma Raja to provide high-caliber, character-oriented education in Rajapalayam.',
    },
    {
      year: '1975',
      title: 'Expansion to Secondary & Higher Secondary',
      desc: 'Inauguration of advanced physics and chemistry research wings, introducing rigorous science and commerce streams.',
    },
    {
      year: '1998',
      title: 'Modern Sports Complex & Auditorium',
      desc: 'Addition of the 400m synthetic athletic track, Olympic-standard sports arena, and the Dr. A.P.J. Abdul Kalam Memorial Auditorium.',
    },
    {
      year: '2015',
      title: 'Smart STEM & Robotics Laboratories',
      desc: 'Pioneered early AI and Robotics education with dedicated computational innovation labs.',
    },
    {
      year: '2026',
      title: 'Launch of AKD DIGITAL CAMPUS',
      desc: 'Unifying institutional governance, parent transparency, teacher workflows, and AI academic intelligence on a state-of-the-art digital platform.',
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-16 text-center">
        <span className="text-xs font-bold text-gold-700 uppercase tracking-widest bg-gold-50 px-3 py-1 rounded-full border border-gold-200">
          Our Heritage & Identity
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold text-navy-950 mt-3 font-serif">
          Rooted in Tradition. Driving Educational Excellence.
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl mx-auto mt-3 leading-relaxed">
          Over 74 years of dedicated service in nurturing ethical leadership, intellectual rigor, and cultural pride.
        </p>
      </div>

      {/* Vision & Mission Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl bg-navy-950 text-white shadow-luxury relative overflow-hidden">
            <div className="w-12 h-12 rounded-xl bg-gold-400/20 text-gold-400 flex items-center justify-center mb-4">
              <Compass className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold font-serif mb-3 text-gold-300">Our Vision</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              To be a beacon of transformative school education where timeless moral fortitude meets futuristic scientific inquiry, cultivating enlightened citizens who lead with wisdom, compassion, and innovation.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-luxury">
            <div className="w-12 h-12 rounded-xl bg-maroon-50 text-maroon-800 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold font-serif mb-3 text-navy-950">Our Mission</h2>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>Deliver an uncompromising standard of academic and technological learning.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>Nurture ethical responsibility, cultural roots, and community empathy.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>Provide world-class sporting, computational, and artistic infrastructure.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Historical Timeline */}
      <div className="max-w-4xl mx-auto px-4 sm:px-8 mb-20">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-navy-700 uppercase tracking-widest">
            Chronology of Growth
          </span>
          <h2 className="text-3xl font-bold text-navy-950 mt-1 font-serif">School History & Milestones</h2>
        </div>

        <div className="relative border-l-2 border-gold-400/40 ml-4 sm:ml-8 space-y-10">
          {historyTimeline.map((item, idx) => (
            <div key={idx} className="relative pl-6 sm:pl-8 group">
              {/* Bullet Dot */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-navy-950 border-2 border-gold-400 group-hover:scale-125 transition" />
              <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition">
                <span className="text-xs font-extrabold text-gold-700 bg-gold-50 px-2.5 py-0.5 rounded">
                  {item.year}
                </span>
                <h3 className="text-base font-bold text-navy-950 mt-2 mb-1">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leadership Profile */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-luxury flex flex-col md:flex-row items-center gap-8">
          <div className="w-32 h-32 rounded-2xl bg-navy-950 text-gold-400 flex items-center justify-center font-serif font-bold text-4xl border-2 border-gold-400 flex-shrink-0 shadow-gold-glow">
            AKD
          </div>
          <div className="space-y-3">
            <span className="text-xs font-bold text-maroon-800 uppercase tracking-wider">
              Principal&apos;s Address
            </span>
            <h3 className="text-2xl font-bold text-navy-950 font-serif">
              Prof. S. Meenakshi Sundaram
            </h3>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
              Principal & Academic Head • M.Sc., M.Ed., M.Phil.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
              &ldquo;Education at AKD is not merely the transmission of facts, but the ignition of intellect and character. As we navigate the digital era, our commitment remains unshakable: honoring our rich 74-year heritage while empowering our children with cutting-edge academic and technological capabilities.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
