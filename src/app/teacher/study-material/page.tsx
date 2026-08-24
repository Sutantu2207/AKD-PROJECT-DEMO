'use client';

import React, { useState } from 'react';
import { BookOpen, Upload, Plus, FileText, CheckCircle2 } from 'lucide-react';

export default function TeacherStudyMaterialPage() {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [materials, setMaterials] = useState([
    {
      id: 'sm1',
      title: 'Class 10 Quadratic Equations & Polynomials Revision Notes',
      category: 'NOTES',
      topic: 'Algebra',
      className: 'Class 10',
      subjectName: 'Mathematics',
      date: '2026-02-10',
    },
    {
      id: 'sm2',
      title: 'Mathematics Past 5-Year Board Question Papers with Marking Scheme',
      category: 'QUESTION_PAPER',
      topic: 'Exam Preparation',
      className: 'Class 10',
      subjectName: 'Mathematics',
      date: '2026-02-14',
    },
  ]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Curriculum Resource Repository
          </span>
          <h1 className="text-2xl font-bold text-navy-950 font-serif">
            Study Material & Notes Upload
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Share PDFs, formula quick sheets, and past question papers with assigned classes.
          </p>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-amber-400 text-navy-950 font-bold text-xs shadow-md hover:shadow-gold-glow transition flex items-center gap-1.5"
        >
          <Upload className="w-4 h-4" /> Upload New Material
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {materials.map((m) => (
          <div key={m.id} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-luxury flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-bold text-gold-800 bg-gold-50 px-2.5 py-0.5 rounded border border-gold-200 uppercase">
                  {m.category}
                </span>
                <span className="text-xs text-slate-400">{m.date}</span>
              </div>
              <h3 className="text-base font-bold text-navy-950">{m.title}</h3>
              <p className="text-xs text-slate-500">
                {m.className} • {m.subjectName} • Topic: {m.topic}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center text-xs">
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Published to Students
              </span>
              <button
                onClick={() => alert(`Managing material: ${m.title}`)}
                className="text-navy-900 font-bold hover:underline"
              >
                Edit Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-navy-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 animate-slide-up space-y-4">
            <h3 className="text-lg font-bold text-navy-950 font-serif">Upload Study Resource</h3>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Resource uploaded and mapped to Class 10-A Mathematics!');
                setShowUploadModal(false);
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block font-bold text-navy-950 mb-1">Resource Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Surface Areas & Volumes Formula Cheat Sheet"
                  className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-navy-900 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-navy-950 mb-1">Category</label>
                  <select className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-navy-900 focus:outline-none">
                    <option value="NOTES">Revision Notes</option>
                    <option value="PDF">PDF Formula Sheet</option>
                    <option value="QUESTION_PAPER">Question Paper</option>
                    <option value="REVISION">Revision Guide</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-navy-950 mb-1">Topic</label>
                  <input
                    type="text"
                    placeholder="e.g. Geometry"
                    className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-navy-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-navy-950 mb-1">Upload File (PDF / DOC)</label>
                <input
                  type="file"
                  className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-navy-950 file:text-gold-300 hover:file:bg-navy-900"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-lg font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-navy-950 text-gold-300 font-bold shadow-md"
                >
                  Upload & Distribute
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
