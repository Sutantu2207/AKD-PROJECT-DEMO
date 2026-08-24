'use client';

import React, { useState } from 'react';
import { Award, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export default function TeacherRemarksPage() {
  const [remarksList, setRemarksList] = useState([
    {
      studentId: 'st_1',
      rollNo: '10A01',
      studentName: 'Aarav Sharma',
      remark: 'Aarav has shown outstanding progression in advanced problem solving and maintains proactive participation in analytical discussions.',
      status: 'PUBLISHED',
    },
    {
      studentId: 'st_4',
      rollNo: '10A04',
      studentName: 'Deepak Varma',
      remark: 'Shows genuine curiosity in geometry proofs; recommend extra practice in algebra word problems before board exams.',
      status: 'PUBLISHED',
    },
  ]);

  const [newRemarkText, setNewRemarkText] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('10A02');

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRemarkText.trim()) return;

    setRemarksList([
      {
        studentId: `st_${Date.now()}`,
        rollNo: selectedStudent,
        studentName: selectedStudent === '10A02' ? 'Kavya Sridhar' : 'Rohan Narayanan',
        remark: newRemarkText,
        status: 'PUBLISHED',
      },
      ...remarksList,
    ]);
    setNewRemarkText('');
    alert('Academic remark published to student and parent portal.');
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Qualitative Academic Feedback
        </span>
        <h1 className="text-2xl font-bold text-navy-950 font-serif">
          Student Academic Remarks
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Publish constructive, encouraging academic observations visible to authorized parents and students.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 1 Col: Compose Remark */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-luxury space-y-4">
          <h3 className="text-sm font-bold text-navy-950">Add Academic Remark</h3>

          <form onSubmit={handlePublish} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-navy-950 mb-1">Select Student</label>
              <select
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-navy-900 focus:outline-none font-semibold"
              >
                <option value="10A02">10A02 - Kavya Sridhar</option>
                <option value="10A03">10A03 - Rohan Narayanan</option>
                <option value="10A05">10A05 - Sneha Venkatesh</option>
                <option value="10A06">10A06 - Harish Kumar</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-navy-950 mb-1">Qualitative Feedback *</label>
              <textarea
                rows={5}
                required
                value={newRemarkText}
                onChange={(e) => setNewRemarkText(e.target.value)}
                placeholder="Enter observations on student problem-solving approach, discipline, and subject mastery..."
                className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-navy-900 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-navy-950 hover:bg-navy-900 text-gold-300 font-bold shadow-md transition flex items-center justify-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" /> Publish Remark
            </button>
          </form>
        </div>

        {/* Right 2 Cols: Published Remarks Log */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-base font-bold text-navy-950">Published Remarks History</h3>

          <div className="space-y-3">
            {remarksList.map((r, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-luxury space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-navy-950 text-sm">
                    {r.studentName} ({r.rollNo})
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    ✓ {r.status}
                  </span>
                </div>
                <p className="text-slate-700 italic leading-relaxed">&ldquo;{r.remark}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
