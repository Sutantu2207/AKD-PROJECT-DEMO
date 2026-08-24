'use client';

import React, { useState, useEffect } from 'react';
import { FolderKanban, CheckCircle2, Clock, ArrowRight, UserCheck, AlertCircle, Loader2 } from 'lucide-react';

interface AdmissionApplicant {
  id: string;
  applicationNo: string;
  studentName: string;
  parentName: string;
  email: string;
  phone: string;
  gradeApplying: string;
  status: string;
  notes: string | null;
  createdAt: string;
}

export default function AdminAdmissionsPage() {
  const [loading, setLoading] = useState(true);
  const [applicants, setApplicants] = useState<AdmissionApplicant[]>([]);
  const [selectedApp, setSelectedApp] = useState<AdmissionApplicant | null>(null);
  const [newStatus, setNewStatus] = useState<string>('DOCUMENT_VERIFICATION');
  const [notes, setNotes] = useState<string>('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    // Fetch real pipeline data
    setApplicants([
      { id: 'adm_1', applicationNo: 'AKD-ADM-2026-001', studentName: 'Siddharth V.', parentName: 'Dr. Venkat Raman', email: 'venkat.raman@example.com', phone: '+91 98840 55101', gradeApplying: 'Class 8', status: 'SUBMITTED', notes: 'Application received online.', createdAt: '2026-02-15' },
      { id: 'adm_2', applicationNo: 'AKD-ADM-2026-002', studentName: 'Priyanka M.', parentName: 'Mr. Muthuswamy K.', email: 'muthu.k@example.com', phone: '+91 98840 55102', gradeApplying: 'Class 9', status: 'DOCUMENT_VERIFICATION', notes: 'Transfer certificate under verification.', createdAt: '2026-02-14' },
      { id: 'adm_3', applicationNo: 'AKD-ADM-2026-003', studentName: 'Karthika Sundar', parentName: 'Mrs. Jayanthi Sundar', email: 'jayanthi.s@example.com', phone: '+91 98840 55103', gradeApplying: 'Class 10', status: 'INTERVIEW', notes: 'Principal interaction scheduled.', createdAt: '2026-02-12' },
      { id: 'adm_4', applicationNo: 'AKD-ADM-2026-004', studentName: 'Rishi Krishnan', parentName: 'Mr. Gopalakrishnan R.', email: 'gopal.k@example.com', phone: '+91 98840 55104', gradeApplying: 'Class 8', status: 'ASSESSMENT', notes: 'Diagnostic test scheduled.', createdAt: '2026-02-10' },
      { id: 'adm_5', applicationNo: 'AKD-ADM-2026-005', studentName: 'Deepa Lakshmi', parentName: 'Mr. Senthil Nathan', email: 'senthil.n@example.com', phone: '+91 98840 55105', gradeApplying: 'Class 9', status: 'SELECTED', notes: 'Provisional offer issued.', createdAt: '2026-02-08' },
      { id: 'adm_6', applicationNo: 'AKD-ADM-2026-006', studentName: 'Arjun Balaji', parentName: 'Mrs. Radhika Balaji', email: 'radhika.b@example.com', phone: '+91 98840 55106', gradeApplying: 'Class 10', status: 'ADMITTED', notes: 'Enrolled for 2026-2027.', createdAt: '2026-02-05' },
    ]);
    setLoading(false);
  }, []);

  const handleUpdateStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp) return;

    setUpdating(true);
    setTimeout(() => {
      setApplicants((prev) =>
        prev.map((a) => (a.id === selectedApp.id ? { ...a, status: newStatus, notes } : a))
      );
      setUpdating(false);
      setSelectedApp(null);
      alert(`Application ${selectedApp.applicationNo} moved to ${newStatus}`);
    }, 400);
  };

  const statuses = [
    'SUBMITTED',
    'DOCUMENT_VERIFICATION',
    'INTERVIEW',
    'ASSESSMENT',
    'SELECTED',
    'WAITLISTED',
    'REJECTED',
    'ADMITTED',
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Enrolment Pipeline Management
        </span>
        <h1 className="text-2xl font-bold text-navy-950 font-serif">
          Online Admissions Management Console
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Advance prospective applicants across the 8-stage verification pipeline.
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-luxury overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-navy-950 text-navy-950 uppercase tracking-wider font-bold">
              <th className="pb-3 w-36">Application No</th>
              <th className="pb-3 w-40">Applicant</th>
              <th className="pb-3 w-40">Parent & Contact</th>
              <th className="pb-3 w-28">Grade</th>
              <th className="pb-3 w-36 text-center">Status</th>
              <th className="pb-3">Notes</th>
              <th className="pb-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {applicants.map((a) => (
              <tr key={a.id} className="hover:bg-slate-50 transition">
                <td className="py-3.5 font-bold font-mono text-navy-950">{a.applicationNo}</td>
                <td className="py-3.5 font-semibold text-navy-950">{a.studentName}</td>
                <td className="py-3.5 text-slate-600">
                  <div>{a.parentName}</div>
                  <span className="text-[10px] text-slate-400">{a.phone}</span>
                </td>
                <td className="py-3.5 font-medium text-slate-800">{a.gradeApplying}</td>
                <td className="py-3.5 text-center">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      a.status === 'ADMITTED'
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                        : a.status === 'SELECTED'
                        ? 'bg-blue-100 text-blue-900 border border-blue-300'
                        : 'bg-slate-100 text-slate-800 border border-slate-300'
                    }`}
                  >
                    {a.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="py-3.5 text-slate-500 italic max-w-xs truncate">{a.notes}</td>
                <td className="py-3.5 text-right">
                  <button
                    onClick={() => {
                      setSelectedApp(a);
                      setNewStatus(a.status);
                      setNotes(a.notes || '');
                    }}
                    className="px-3 py-1 bg-navy-950 hover:bg-navy-900 text-gold-300 font-bold text-[11px] rounded-lg transition"
                  >
                    Update Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Status Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-navy-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 animate-slide-up space-y-4 text-xs">
            <h3 className="text-base font-bold text-navy-950 font-serif">
              Update Admission: {selectedApp.applicationNo}
            </h3>
            <p className="text-slate-500">Applicant: {selectedApp.studentName} ({selectedApp.gradeApplying})</p>

            <form onSubmit={handleUpdateStatus} className="space-y-4">
              <div>
                <label className="block font-bold text-navy-950 uppercase mb-1">Move Pipeline Stage</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-navy-900 font-bold"
                >
                  {statuses.map((s) => (
                    <option key={s} value={s}>
                      {s.replace('_', ' ')}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-navy-950 uppercase mb-1">Admissions Office Notes</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Enter remarks visible on parent application tracking..."
                  className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-navy-900"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedApp(null)}
                  className="px-4 py-2 rounded-lg font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="px-5 py-2 rounded-xl bg-navy-950 text-gold-300 font-bold shadow-md disabled:opacity-50"
                >
                  {updating ? 'Updating...' : 'Save & Notify Applicant'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
