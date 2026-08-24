'use client';

import React, { useState } from 'react';
import { FileText, Plus, CheckCircle2, Clock, Users, Loader2 } from 'lucide-react';

export default function TeacherAssignmentsPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [creating, setCreating] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    subject: 'Mathematics',
    classSection: 'Class 10-A',
    dueDate: '',
    maxMarks: '20',
    description: '',
  });

  const [assignmentsList, setAssignmentsList] = useState([
    {
      id: 'a1',
      title: 'Trigonometric Identities & Applications Problem Set',
      className: 'Class 10-A',
      subjectName: 'Mathematics',
      dueDate: '2026-02-28',
      maxMarks: 20,
      submissionsCount: 10,
      gradedCount: 10,
    },
    {
      id: 'a2',
      title: 'Quadratic Equations Board Question Workshop',
      className: 'Class 10-A',
      subjectName: 'Mathematics',
      dueDate: '2026-03-10',
      maxMarks: 25,
      submissionsCount: 8,
      gradedCount: 2,
    },
  ]);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);

    setTimeout(() => {
      setAssignmentsList([
        {
          id: `a_${Date.now()}`,
          title: formData.title,
          className: formData.classSection,
          subjectName: formData.subject,
          dueDate: formData.dueDate,
          maxMarks: Number(formData.maxMarks),
          submissionsCount: 0,
          gradedCount: 0,
        },
        ...assignmentsList,
      ]);
      setCreating(false);
      setShowCreateModal(false);
      setFormData({
        title: '',
        subject: 'Mathematics',
        classSection: 'Class 10-A',
        dueDate: '',
        maxMarks: '20',
        description: '',
      });
    }, 500);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Curricular Workload Manager
          </span>
          <h1 className="text-2xl font-bold text-navy-950 font-serif">
            Assignments & Submissions Review
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Create structured problem sets and grade student submissions.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-amber-400 text-navy-950 font-bold text-xs shadow-md hover:shadow-gold-glow transition flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Create New Assignment
        </button>
      </div>

      <div className="space-y-4">
        {assignmentsList.map((a) => (
          <div
            key={a.id}
            className="p-6 rounded-2xl bg-white border border-slate-200 shadow-luxury flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-navy-800 bg-navy-100 px-2 py-0.5 rounded uppercase">
                  {a.className}
                </span>
                <span className="text-xs font-bold text-gold-700">{a.subjectName}</span>
              </div>
              <h3 className="text-base font-bold text-navy-950">{a.title}</h3>
              <p className="text-xs text-slate-500">Due: {a.dueDate} • Maximum Marks: {a.maxMarks}</p>
            </div>

            <div className="flex items-center gap-6 text-xs">
              <div className="text-center">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Submissions</span>
                <span className="text-base font-extrabold text-navy-950">{a.submissionsCount}</span>
              </div>

              <div className="text-center">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Graded</span>
                <span className="text-base font-extrabold text-emerald-600">{a.gradedCount}</span>
              </div>

              <button
                onClick={() => alert(`Reviewing submissions for ${a.title}`)}
                className="px-4 py-2 rounded-lg bg-navy-950 hover:bg-navy-900 text-gold-300 font-bold text-xs shadow-sm transition"
              >
                Review Submissions
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-navy-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 animate-slide-up space-y-4">
            <h3 className="text-lg font-bold text-navy-950 font-serif">Create New Assignment</h3>

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-navy-950 uppercase mb-1">Assignment Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Optics Ray Diagrams Problem Set"
                  className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-navy-900 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-navy-950 uppercase mb-1">Class</label>
                  <select
                    value={formData.classSection}
                    onChange={(e) => setFormData({ ...formData, classSection: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-navy-900 focus:outline-none"
                  >
                    <option value="Class 10-A">Class 10-A</option>
                    <option value="Class 9-A">Class 9-A</option>
                    <option value="Class 8-A">Class 8-A</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-navy-950 uppercase mb-1">Max Marks</label>
                  <input
                    type="number"
                    required
                    value={formData.maxMarks}
                    onChange={(e) => setFormData({ ...formData, maxMarks: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-navy-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-navy-950 uppercase mb-1">Submission Deadline *</label>
                <input
                  type="date"
                  required
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-navy-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-navy-950 uppercase mb-1">Instructions & Problem Description</label>
                <textarea
                  rows={4}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detail the problems to solve, textbook sections, and required format..."
                  className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-navy-900 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-lg font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="px-5 py-2 rounded-xl bg-navy-950 text-gold-300 font-bold shadow-md disabled:opacity-50"
                >
                  {creating ? 'Publishing...' : 'Publish to Students'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
