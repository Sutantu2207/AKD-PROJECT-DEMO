import React from 'react';
import { Award, Briefcase, GraduationCap, Sparkles } from 'lucide-react';

export default function AlumniPage() {
  const alumniList = [
    {
      name: 'Dr. Vignesh Sundararajan',
      batch: 'Class of 2004',
      designation: 'Principal Research Scientist, ISRO',
      achievement: 'Key contributor to Chandrayaan navigation instrumentation and propulsion telemetry.',
    },
    {
      name: 'Ananya Ramachandran, IAS',
      batch: 'Class of 2008',
      designation: 'District Collector & Magistrate',
      achievement: 'Secured All-India Rank 24 in UPSC Civil Services Examination.',
    },
    {
      name: 'K. Balaji Varma',
      batch: 'Class of 2012',
      designation: 'Co-Founder & CTO, NextGen AI',
      achievement: 'Forbes 30 Under 30 Asia honoree in Enterprise Technology.',
    },
    {
      name: 'Dr. Preetha Muthuswamy',
      batch: 'Class of 2015',
      designation: 'Cardiothoracic Surgeon, AIIMS',
      achievement: 'Gold Medalist in MS General Surgery with 15+ peer-reviewed international publications.',
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-16 text-center">
        <span className="text-xs font-bold text-gold-700 uppercase tracking-widest bg-gold-50 px-3 py-1 rounded-full border border-gold-200">
          Global AKD Network
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold text-navy-950 mt-3 font-serif">
          Distinguished Alumni Spotlight
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl mx-auto mt-3 leading-relaxed">
          From civil services and aerospace research to entrepreneurship and medicine, our alumni illuminate leadership across the globe.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {alumniList.map((alumni, idx) => (
          <div
            key={idx}
            className="p-8 rounded-2xl bg-white border border-slate-200 shadow-luxury flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-extrabold text-gold-700 bg-gold-50 px-2.5 py-0.5 rounded border border-gold-200">
                  {alumni.batch}
                </span>
                <GraduationCap className="w-5 h-5 text-navy-800" />
              </div>
              <h3 className="text-xl font-bold text-navy-950 mt-2">{alumni.name}</h3>
              <p className="text-xs font-semibold text-maroon-800 uppercase tracking-wide mt-0.5">
                {alumni.designation}
              </p>
              <p className="text-xs text-slate-600 leading-relaxed mt-3">{alumni.achievement}</p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-navy-900">
              <Award className="w-4 h-4 text-gold-600 mr-1.5" />
              Active Alumni Mentor
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
