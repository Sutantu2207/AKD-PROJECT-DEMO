import React from 'react';
import Link from 'next/link';
import { BookOpen, CheckCircle2, Award, Sparkles, GraduationCap, ArrowRight, Laptop, Beaker } from 'lucide-react';

export default function AcademicsPage() {
  const sections = [
    {
      title: 'Primary Wing (Classes 1 to 5)',
      badge: 'Foundational Stage',
      desc: 'Focused on language fluency, mathematical reasoning, environmental studies, and foundational arts through active inquiry.',
      subjects: ['English Language & Phonics', 'Tamil / Regional Language', 'Mathematics & Logic', 'Environmental Studies (EVS)', 'Computer Literacy', 'Visual Arts & Physical Education'],
      approach: 'Activity-based learning with hands-on manipulative tools and storytelling.',
    },
    {
      title: 'Middle School (Classes 6 to 8)',
      badge: 'Preparatory & Experiential Stage',
      desc: 'Transition into specialized disciplines with laboratory demonstrations, scientific inquiry, and structured grammar.',
      subjects: ['Mathematics (Algebra & Geometry)', 'General Science (Physics, Chemistry, Biology)', 'Social Science (History, Civics, Geography)', 'English Literature', 'Tamil / Hindi', 'Introduction to Coding & Robotics'],
      approach: 'Inquiry-driven scientific experiments, project presentations, and group problem sets.',
    },
    {
      title: 'Secondary Wing (Classes 9 & 10)',
      badge: 'Board Preparation & Rigor',
      desc: 'Rigorous conceptual preparation adhering strictly to national curriculum guidelines, model board tests, and analytical workshops.',
      subjects: ['Advanced Mathematics', 'Integrated Science with Practical Labs', 'Social Science & Economics', 'English Communicative', 'Language II', 'Computer Applications (Python & SQL)'],
      approach: 'Diagnostic periodic assessments, remedial focus groups, and past 10-year question analytics.',
    },
    {
      title: 'Higher Secondary (Classes 11 & 12)',
      badge: 'Specialized Discipline Mastery',
      desc: 'Intensive academic tracks designed for board distinction and competitive entrance examinations (JEE, NEET, CUET, CA Foundation).',
      subjects: ['Group 1: Physics, Chemistry, Mathematics, Computer Science', 'Group 2: Physics, Chemistry, Biology, Mathematics', 'Group 3: Accountancy, Commerce, Economics, Business Maths / CS'],
      approach: 'High-intensity problem workouts, weekly mock exams, and university guidance mentorship.',
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-16 text-center">
        <span className="text-xs font-bold text-navy-800 uppercase tracking-widest bg-navy-100 px-3 py-1 rounded-full border border-navy-200">
          Academic Ecosystem
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold text-navy-950 mt-3 font-serif">
          Excellence in Pedagogy, Curricula & Assessment
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl mx-auto mt-3 leading-relaxed">
          Structured academic pathways designed to foster deep conceptual mastery, intellectual independence, and Olympiad readiness.
        </p>
      </div>

      {/* Tiers List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10 mb-16">
        {sections.map((sec, idx) => (
          <div
            key={idx}
            className="p-8 rounded-2xl bg-white border border-slate-200 shadow-luxury flex flex-col lg:flex-row gap-8 items-start justify-between"
          >
            <div className="max-w-2xl space-y-3">
              <span className="text-xs font-bold text-gold-700 bg-gold-50 px-3 py-1 rounded-md border border-gold-200">
                {sec.badge}
              </span>
              <h2 className="text-2xl font-bold text-navy-950 font-serif">{sec.title}</h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{sec.desc}</p>

              <div className="pt-2">
                <span className="text-xs font-bold text-navy-900 block mb-1.5">Core Disciplines:</span>
                <div className="flex flex-wrap gap-2">
                  {sec.subjects.map((sub, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full lg:w-80 p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-navy-950 block mb-1">Pedagogical Approach:</span>
                <p className="text-xs text-slate-600 leading-relaxed">{sec.approach}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 text-xs font-semibold text-emerald-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Integrated Digital Campus Tracking
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Box */}
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        <div className="p-8 rounded-2xl bg-navy-950 text-white text-center shadow-luxury">
          <h3 className="text-2xl font-bold font-serif mb-2 text-gold-300">
            Admissions for 2026-2027 Academic Year
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mb-6">
            Ensure your child gains admission to a tradition of uninterrupted academic distinction.
          </p>
          <Link
            href="/admissions"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-gold-500 to-amber-400 text-navy-950 font-bold text-xs tracking-wide shadow-md hover:shadow-gold-glow transition"
          >
            Apply Online for Admission <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
