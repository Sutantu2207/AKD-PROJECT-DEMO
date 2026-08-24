'use client';

import React, { useState, useEffect } from 'react';
import { 
  ClipboardCheck, Save, Send, Shield, AlertCircle, CheckCircle2, 
  Loader2, Sparkles, RefreshCw, KeyRound, HelpCircle 
} from 'lucide-react';

interface StudentRow {
  studentId: string;
  rollNo: string;
  name: string;
  admissionNo: string;
  marksObtained: number | null;
  isAbsent: boolean;
  remarks: string;
  markId: string | null;
}

export default function TeacherMarksPage() {
  const [loading, setLoading] = useState(true);
  const [assessment, setAssessment] = useState<any | null>(null);
  const [students, setStudents] = useState<StudentRow[]>([]);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Correction Modal State
  const [correctionModal, setCorrectionModal] = useState<{ open: boolean; student: StudentRow | null }>({
    open: false,
    student: null,
  });
  const [correctionMarks, setCorrectionMarks] = useState<number>(0);
  const [correctionReason, setCorrectionReason] = useState<string>('');
  const [correctionSubmitting, setCorrectionSubmitting] = useState(false);

  useEffect(() => {
    // Initial fetch of teacher assigned draft assessment for Class 10-A Mathematics
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((authData) => {
        if (authData.authenticated) {
          // Initialize mock/real assessment dataset for spreadsheet
          setAssessment({
            id: 'assess_math_10a_rev',
            examName: 'Revision Examination (2025-2026)',
            academicYear: '2025-2026',
            className: 'Class 10',
            sectionName: 'A',
            subjectName: 'Mathematics',
            maxMarks: 100,
            passMarks: 35,
            status: 'DRAFT',
          });

          setStudents([
            { studentId: 'st_1', rollNo: '10A01', name: 'Aarav Sharma', admissionNo: 'AKD-2020-0412', marksObtained: 92, isAbsent: false, remarks: 'Excellent derivation rigor.', markId: 'm_1' },
            { studentId: 'st_2', rollNo: '10A02', name: 'Kavya Sridhar', admissionNo: 'AKD-2022-1000', marksObtained: 96, isAbsent: false, remarks: 'Outstanding precision.', markId: 'm_2' },
            { studentId: 'st_3', rollNo: '10A03', name: 'Rohan Narayanan', admissionNo: 'AKD-2022-1001', marksObtained: 85, isAbsent: false, remarks: 'Good logical structure.', markId: 'm_3' },
            { studentId: 'st_4', rollNo: '10A04', name: 'Deepak Varma', admissionNo: 'AKD-2022-1002', marksObtained: 52, isAbsent: false, remarks: 'Needs focused practice in quadratics.', markId: 'm_4' },
            { studentId: 'st_5', rollNo: '10A05', name: 'Sneha Venkatesh', admissionNo: 'AKD-2022-1003', marksObtained: 92, isAbsent: false, remarks: 'Very attentive and thorough.', markId: 'm_5' },
            { studentId: 'st_6', rollNo: '10A06', name: 'Harish Kumar', admissionNo: 'AKD-2022-1004', marksObtained: 80, isAbsent: false, remarks: 'Steady upward progress.', markId: 'm_6' },
            { studentId: 'st_7', rollNo: '10A07', name: 'Pooja Raghavan', admissionNo: 'AKD-2022-1005', marksObtained: 95, isAbsent: false, remarks: 'Flawless geometry proofs.', markId: 'm_7' },
            { studentId: 'st_8', rollNo: '10A08', name: 'Manoj Krishna', admissionNo: 'AKD-2022-1006', marksObtained: 82, isAbsent: false, remarks: 'Major improvement this term.', markId: 'm_8' },
            { studentId: 'st_9', rollNo: '10A09', name: 'Divya Shankar', admissionNo: 'AKD-2022-1007', marksObtained: 81, isAbsent: false, remarks: 'Consistent understanding.', markId: 'm_9' },
            { studentId: 'st_10', rollNo: '10A10', name: 'Naveen Raj', admissionNo: 'AKD-2022-1008', marksObtained: 36, isAbsent: false, remarks: 'Remedial coaching recommended.', markId: 'm_10' },
          ]);
        }
        setLoading(false);
      });
  }, []);

  const handleMarkChange = (index: number, valStr: string) => {
    const updated = [...students];
    if (valStr === '') {
      updated[index].marksObtained = null;
    } else {
      let num = parseFloat(valStr);
      if (isNaN(num)) num = 0;
      if (num < 0) num = 0;
      if (assessment && num > assessment.maxMarks) num = assessment.maxMarks;
      updated[index].marksObtained = num;
    }
    setStudents(updated);
  };

  const handleAbsentToggle = (index: number, isAbsent: boolean) => {
    const updated = [...students];
    updated[index].isAbsent = isAbsent;
    if (isAbsent) updated[index].marksObtained = null;
    setStudents(updated);
  };

  const handleRemarksChange = (index: number, remarks: string) => {
    const updated = [...students];
    updated[index].remarks = remarks;
    setStudents(updated);
  };

  // Save Draft API Call
  const handleSaveDraft = async () => {
    if (!assessment) return;
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch('/api/marks/save-draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assessmentId: assessment.id,
          marksData: students.map((s) => ({
            studentId: s.studentId,
            marksObtained: s.marksObtained,
            isAbsent: s.isAbsent,
            remarks: s.remarks,
          })),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save draft');

      setMessage({ type: 'success', text: `Draft saved successfully (${students.length} student entries persisted).` });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to save draft' });
    } finally {
      setSaving(false);
    }
  };

  // Publish Marks API Call
  const handlePublishMarks = async () => {
    if (!assessment) return;
    if (!confirm('Are you sure you want to publish these marks? Once published, they will immediately be visible to linked parents and students, and an audit trail will be generated.')) {
      return;
    }

    setPublishing(true);
    setMessage(null);

    try {
      const res = await fetch('/api/marks/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assessmentId: assessment.id }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to publish marks');

      setAssessment({ ...assessment, status: 'PUBLISHED' });
      setMessage({
        type: 'success',
        text: 'Marks published successfully! Notifications and analytics updated for all linked parents and students.',
      });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to publish marks' });
    } finally {
      setPublishing(false);
    }
  };

  // Submit Mark Correction Request
  const handleCorrectionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!correctionModal.student || !correctionReason.trim()) return;

    setCorrectionSubmitting(true);
    try {
      const res = await fetch('/api/marks/correction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          markId: correctionModal.student.markId || 'mock_mark_id',
          requestedMarks: Number(correctionMarks),
          reason: correctionReason,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit correction request');

      alert('Correction request submitted to Principal for review.');
      setCorrectionModal({ open: false, student: null });
      setCorrectionReason('');
    } catch (err: any) {
      alert(err.message || 'Correction submission error');
    } finally {
      setCorrectionSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-gold-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Academic Assessment Entry Suite
          </span>
          <h1 className="text-2xl font-bold text-navy-950 font-serif">
            Spreadsheet Mark Entry & Publication
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {assessment?.className} - {assessment?.sectionName} • {assessment?.subjectName} ({assessment?.examName})
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSaveDraft}
            disabled={saving || publishing}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-navy-950 font-bold text-xs shadow-sm transition flex items-center gap-1.5 disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            Save Draft
          </button>

          <button
            onClick={handlePublishMarks}
            disabled={publishing || saving || assessment?.status === 'PUBLISHED'}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-gold-500 to-amber-400 text-navy-950 font-bold text-xs shadow-luxury hover:shadow-gold-glow transition flex items-center gap-1.5 disabled:opacity-50"
          >
            {publishing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
            {assessment?.status === 'PUBLISHED' ? 'Published' : 'Publish Marks'}
          </button>
        </div>
      </div>

      {/* Alert Notifications */}
      {message && (
        <div
          className={`p-4 rounded-xl border text-xs flex items-center gap-2 animate-slide-up ${
            message.type === 'success'
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
              : 'bg-red-50 border-red-300 text-red-900'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Assessment Context Banner */}
      <div className="p-4 rounded-2xl bg-navy-950 text-white shadow-luxury flex flex-wrap justify-between items-center gap-4 text-xs">
        <div className="flex items-center gap-6">
          <div>
            <span className="text-[10px] text-gold-400 font-bold uppercase block">Subject Track</span>
            <span className="font-bold text-sm">{assessment?.subjectName}</span>
          </div>
          <div>
            <span className="text-[10px] text-gold-400 font-bold uppercase block">Maximum Marks</span>
            <span className="font-bold text-sm">{assessment?.maxMarks}</span>
          </div>
          <div>
            <span className="text-[10px] text-gold-400 font-bold uppercase block">Passing Threshold</span>
            <span className="font-bold text-sm">{assessment?.passMarks}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] text-slate-400">Workflow State:</span>
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
              assessment?.status === 'PUBLISHED'
                ? 'bg-emerald-900/80 text-emerald-200 border border-emerald-500'
                : 'bg-amber-900/80 text-amber-200 border border-amber-500'
            }`}
          >
            {assessment?.status}
          </span>
        </div>
      </div>

      {/* Spreadsheet Editable Table */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-luxury overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-navy-950 text-navy-950 uppercase tracking-wider font-bold">
              <th className="pb-3 w-16">Roll No</th>
              <th className="pb-3 w-48">Student Name</th>
              <th className="pb-3 w-32">Admission ID</th>
              <th className="pb-3 w-32 text-center">Marks (/{assessment?.maxMarks})</th>
              <th className="pb-3 w-20 text-center">Absent?</th>
              <th className="pb-3">Academic Observation / Remarks</th>
              {assessment?.status === 'PUBLISHED' && <th className="pb-3 text-right">Action</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {students.map((st, idx) => (
              <tr key={st.studentId} className="hover:bg-slate-50/70 transition">
                <td className="py-3 font-bold text-navy-950">{st.rollNo}</td>
                <td className="py-3 font-semibold text-navy-950">{st.name}</td>
                <td className="py-3 font-mono text-slate-500">{st.admissionNo}</td>

                {/* Inline Marks Input with Bounds Validation */}
                <td className="py-3 text-center">
                  <input
                    type="number"
                    min="0"
                    max={assessment?.maxMarks}
                    disabled={st.isAbsent || assessment?.status === 'PUBLISHED'}
                    value={st.marksObtained !== null ? st.marksObtained : ''}
                    onChange={(e) => handleMarkChange(idx, e.target.value)}
                    placeholder={st.isAbsent ? 'ABS' : '0'}
                    className={`w-20 px-2 py-1 text-center font-bold rounded-lg border text-xs focus:ring-2 focus:ring-navy-900 focus:outline-none ${
                      st.isAbsent
                        ? 'bg-slate-100 text-slate-400 border-slate-200'
                        : 'border-slate-300 bg-white text-navy-950'
                    }`}
                  />
                </td>

                {/* Absent Toggle */}
                <td className="py-3 text-center">
                  <input
                    type="checkbox"
                    disabled={assessment?.status === 'PUBLISHED'}
                    checked={st.isAbsent}
                    onChange={(e) => handleAbsentToggle(idx, e.target.checked)}
                    className="rounded border-slate-300 text-navy-950 w-4 h-4 cursor-pointer"
                  />
                </td>

                {/* Qualitative Remarks */}
                <td className="py-3">
                  <input
                    type="text"
                    disabled={assessment?.status === 'PUBLISHED'}
                    value={st.remarks}
                    onChange={(e) => handleRemarksChange(idx, e.target.value)}
                    placeholder="Enter academic observation..."
                    className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 focus:ring-2 focus:ring-navy-900 focus:outline-none"
                  />
                </td>

                {/* Mark Correction Trigger for Published Marks */}
                {assessment?.status === 'PUBLISHED' && (
                  <td className="py-3 text-right">
                    <button
                      onClick={() => {
                        setCorrectionModal({ open: true, student: st });
                        setCorrectionMarks(st.marksObtained || 0);
                      }}
                      className="px-2.5 py-1 text-[11px] font-bold text-navy-900 hover:text-gold-700 bg-slate-100 hover:bg-slate-200 rounded-md transition"
                    >
                      Request Correction
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mark Correction Request Modal */}
      {correctionModal.open && correctionModal.student && (
        <div className="fixed inset-0 z-50 bg-navy-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 animate-slide-up space-y-4">
            <h3 className="text-lg font-bold text-navy-950 font-serif">
              Request Score Adjustment
            </h3>
            <p className="text-xs text-slate-500">
              Student: <strong className="text-navy-950">{correctionModal.student.name}</strong> ({correctionModal.student.rollNo})
            </p>

            <form onSubmit={handleCorrectionSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-navy-950 mb-1">Current Score</label>
                <div className="p-2 rounded-lg bg-slate-100 font-bold text-slate-700">
                  {correctionModal.student.marksObtained} / {assessment?.maxMarks}
                </div>
              </div>

              <div>
                <label className="block font-bold text-navy-950 mb-1">Requested Revised Score *</label>
                <input
                  type="number"
                  min="0"
                  max={assessment?.maxMarks}
                  required
                  value={correctionMarks}
                  onChange={(e) => setCorrectionMarks(parseFloat(e.target.value) || 0)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-navy-900 focus:outline-none font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-navy-950 mb-1">Reason for Adjustment *</label>
                <textarea
                  rows={3}
                  required
                  value={correctionReason}
                  onChange={(e) => setCorrectionReason(e.target.value)}
                  placeholder="Explain recalculation or re-evaluation rationale for Principal approval..."
                  className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-navy-900 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCorrectionModal({ open: false, student: null })}
                  className="px-4 py-2 rounded-lg font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={correctionSubmitting}
                  className="px-5 py-2 rounded-xl bg-navy-950 text-gold-300 font-bold shadow-md disabled:opacity-50"
                >
                  {correctionSubmitting ? 'Submitting...' : 'Submit to Principal'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
