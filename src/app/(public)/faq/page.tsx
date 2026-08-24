'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, BookOpen, ShieldCheck } from 'lucide-react';

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What curriculum and boards are affiliated with A.K.D. Dharma Raja School?',
      a: 'AKD School provides dual excellence pathways offering both Central Board of Secondary Education (CBSE) and Tamil Nadu State Board curricula with rigorous experiential science laboratories and computer science tracks.',
    },
    {
      q: 'How do parents access the Digital Campus portal and track their child’s marks?',
      a: 'Parents receive secure credentials during enrollment. Through the AKD Digital Campus portal, parents can monitor real-time published assessment scores, attendance logs, homework submissions, year-over-year progress graphs, and download official Digital Report Cards.',
    },
    {
      q: 'How does the school ensure the privacy and security of student academic data?',
      a: 'The AKD platform implements strict role-based access control (RBAC). Parents only have access to their linked children, teachers can only view their assigned classes, and sensitive marks are protected with an immutable audit logging engine.',
    },
    {
      q: 'What is the procedure for admissions for the 2026-2027 academic session?',
      a: 'Parents can fill out the online application form on our Admissions page. An Application Reference Number is immediately generated, allowing parents to track their document verification, entrance assessment, and interview schedule.',
    },
    {
      q: 'Are scholarship and merit awards available for high-achieving students?',
      a: 'Yes, the A.K.D. Dharma Raja Educational Trust offers merit-based scholarships for students excelling in state-level talent Olympiads, national athletic meets, and academic distinction.',
    },
    {
      q: 'What co-curricular and sports facilities are offered on campus?',
      a: 'Our 22-acre campus features a 400m synthetic athletic track, basketball/volleyball courts, indoor badminton courts, cricket training nets, robotics labs, visual arts studios, and the Dr. A.P.J. Abdul Kalam 1,200-seat cultural auditorium.',
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-16 text-center">
        <span className="text-xs font-bold text-gold-700 uppercase tracking-widest bg-gold-50 px-3 py-1 rounded-full border border-gold-200">
          Knowledge Base
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold text-navy-950 mt-3 font-serif">
          Frequently Asked Questions
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl mx-auto mt-3 leading-relaxed">
          Common queries regarding admissions, academic curricula, student safety, and the AKD Digital Campus portal.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-8 space-y-4">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden transition"
          >
            <button
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              className="w-full p-5 text-left flex justify-between items-center gap-4 text-xs sm:text-sm font-bold text-navy-950 hover:bg-slate-50 transition"
            >
              <span>{faq.q}</span>
              <ChevronDown
                className={`w-4 h-4 text-gold-600 transition-transform ${
                  openIdx === idx ? 'transform rotate-180' : ''
                }`}
              />
            </button>
            {openIdx === idx && (
              <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3 bg-slate-50/50">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
