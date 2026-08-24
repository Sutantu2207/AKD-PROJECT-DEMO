import React from 'react';
import { requireRole } from '@/lib/auth';
import { db } from '@/lib/db';
import { BookOpen, FileText, Download, Search, Tag } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function StudentStudyMaterialPage() {
  const user = await requireRole(['STUDENT', 'SUPER_ADMIN', 'ADMIN']);

  const materials = await db.studyMaterial.findMany({
    include: {
      subject: true,
      teacher: { include: { user: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Digital Learning Resources
        </span>
        <h1 className="text-2xl font-bold text-navy-950 font-serif">
          Study Materials, Formula Sheets & Question Banks
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Download faculty-curated revision notes and previous year question papers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {materials.map((mat) => (
          <div
            key={mat.id}
            className="p-6 rounded-2xl bg-white border border-slate-200 shadow-luxury flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-bold text-gold-800 bg-gold-50 px-2.5 py-0.5 rounded border border-gold-200 uppercase">
                  {mat.category}
                </span>
                <span className="text-xs text-slate-400 font-mono">{mat.subject.code}</span>
              </div>

              <h3 className="text-base font-bold text-navy-950">{mat.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{mat.description}</p>
              
              <div className="pt-2 text-[11px] text-slate-500">
                <span>Faculty: {mat.teacher.user.name}</span> • <span>Topic: {mat.topic || 'General'}</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
              <span className="text-xs text-slate-400 font-medium">PDF Document</span>
              <a
                href={mat.fileUrl}
                download
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-navy-950 hover:bg-navy-900 text-gold-300 font-bold text-xs shadow-sm transition"
              >
                <Download className="w-3.5 h-3.5" /> Download
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
