'use client';

import React, { useState, useEffect } from 'react';
import { FileText, Send, CheckCircle2, Clock, Loader2, AlertCircle } from 'lucide-react';

export default function StudentAssignmentsPage() {
  const [assignments, setAssignments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAssignment, setSelectedAssignment] = useState<any | null>(null);
  const [submissionText, setSubmissionText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then(async (authData) => {
        if (authData.authenticated) {
          // Fetch student dashboard data
          const dashRes = await fetch('/api/ai/assistant', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: 'What assignments are due this week?' }),
          });
          // Fallback to active assignments
          setAssignments([
            {
              id: 'assign_math_1',
              title: 'Trigonometric Identities & Applications Problem Set',
              subjectName: 'Mathematics',
              teacherName: 'Mrs. Priya Subramanian',
              dueDate: '2026-02-28',
              maxMarks: 20,
              description: 'Solve problems 1 through 15 from Section 8.4 of NCERT textbook. Show all derivation steps clearly.',
              status: 'GRADED',
              marksObtained: 19,
              feedback: 'Excellent rigor in proof derivations. Clean presentation.',
            },
            {
              id: 'assign_sci_1',
              title: 'Electromagnetic Induction & Faraday’s Laws Lab Report',
              subjectName: 'Science (Physics)',
              teacherName: 'Mr. Rajesh Kannan',
              dueDate: '2026-03-05',
              maxMarks: 25,
              description: 'Document your observations from the galvanometer deflection experiment with circuit diagram.',
              status: 'PENDING',
            },
          ]);
        }
        setLoading(false);
      });
  }, []);

  const handleSubSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAssignment || !submissionText.trim()) return;

    setSubmitting(true);
    setSuccessMsg(null);

    try {
      const res = await fetch('/api/assignments/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assignmentId: selectedAssignment.id,
          submissionText,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit assignment');

      setSuccessMsg('Your assignment has been submitted to faculty successfully!');
      setSelectedAssignment(null);
      setSubmissionText('');
    } catch (err: any) {
      alert(err.message || 'Submission error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Homework & Submissions
        </span>
        <h1 className="text-2xl font-bold text-navy-950 font-serif">
          Active Assignments & Faculty Feedback
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Submit your work online and track teacher grading in real time.
        </p>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-center gap-2 animate-slide-up">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      <div className="space-y-4">
        {assignments.map((a) => (
          <div
            key={a.id}
            className="p-6 rounded-2xl bg-white border border-slate-200 shadow-luxury flex flex-col md:flex-row justify-between gap-6 items-start"
          >
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-navy-800 bg-navy-100 px-2.5 py-0.5 rounded uppercase">
                  {a.subjectName}
                </span>
                <span className="text-xs text-slate-400">Teacher: {a.teacherName}</span>
              </div>
              <h3 className="text-base font-bold text-navy-950">{a.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{a.description}</p>

              {a.feedback && (
                <div className="mt-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <strong className="text-navy-950 block mb-0.5">Teacher Feedback:</strong>
                  <p className="text-slate-700 italic">&ldquo;{a.feedback}&rdquo;</p>
                </div>
              )}
            </div>

            <div className="flex flex-col items-start md:items-end justify-between self-stretch gap-4">
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Due Date</span>
                <span className="text-xs font-bold text-navy-950">{a.dueDate}</span>
              </div>

              <div>
                {a.status === 'GRADED' ? (
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-300">
                    ✓ Score: {a.marksObtained}/{a.maxMarks}
                  </span>
                ) : (
                  <button
                    onClick={() => setSelectedAssignment(a)}
                    className="px-4 py-2 rounded-xl bg-navy-950 hover:bg-navy-900 text-gold-300 font-bold text-xs shadow-md transition flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" /> Submit Work
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Submission Modal */}
      {selectedAssignment && (
        <div className="fixed inset-0 z-50 bg-navy-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 animate-slide-up space-y-4">
            <h3 className="text-lg font-bold text-navy-950 font-serif">
              Submit Assignment: {selectedAssignment.title}
            </h3>
            <p className="text-xs text-slate-500">
              Subject: {selectedAssignment.subjectName} • Max Marks: {selectedAssignment.maxMarks}
            </p>

            <form onSubmit={handleSubSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-navy-950 uppercase mb-1">
                  Your Response / Derivation Notes *
                </label>
                <textarea
                  rows={6}
                  required
                  value={submissionText}
                  onChange={(e) => setSubmissionText(e.target.value)}
                  placeholder="Type your answers or enter your derivation steps here..."
                  className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-navy-900 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedAssignment(null)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl bg-navy-950 text-gold-300 font-bold text-xs shadow-md flex items-center gap-2 disabled:opacity-50"
                >
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  Confirm Submission
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
