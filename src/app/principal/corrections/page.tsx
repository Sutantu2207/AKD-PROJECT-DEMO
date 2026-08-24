'use client';

import React, { useState } from 'react';
import { ClipboardCheck, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

export default function PrincipalCorrectionsPage() {
  const [requests, setRequests] = useState([
    {
      id: 'req_1',
      studentName: 'Aarav Sharma',
      rollNo: '10A01',
      className: 'Class 10-A',
      subjectName: 'Mathematics',
      examName: 'Unit Test 2',
      currentMarks: 84,
      requestedMarks: 88,
      reason: 'Recalculation error in question 14 derivation proof. Additional 4 marks verified.',
      teacherName: 'Mrs. Priya Subramanian',
      status: 'PENDING',
    },
  ]);

  const handleAction = (requestId: string, approved: boolean) => {
    setRequests(
      requests.map((r) => (r.id === requestId ? { ...r, status: approved ? 'APPROVED' : 'REJECTED' } : r))
    );
    alert(approved ? 'Score correction APPROVED. Database updated & audit logged.' : 'Score correction REJECTED.');
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Academic Integrity Oversight
        </span>
        <h1 className="text-2xl font-bold text-navy-950 font-serif">
          Mark Correction Approval Console
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Review, approve, or reject formal score adjustment requests submitted by faculty.
        </p>
      </div>

      <div className="space-y-4">
        {requests.map((req) => (
          <div
            key={req.id}
            className="p-6 rounded-2xl bg-white border border-slate-200 shadow-luxury space-y-4 text-xs"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <span className="text-[10px] font-bold text-gold-800 bg-gold-50 px-2 py-0.5 rounded border border-gold-200 uppercase">
                  {req.examName} • {req.subjectName}
                </span>
                <h3 className="text-base font-bold text-navy-950 mt-1">
                  Student: {req.studentName} ({req.rollNo} • {req.className})
                </h3>
                <span className="text-slate-500">Submitted by: {req.teacherName}</span>
              </div>

              <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Current Score</span>
                  <strong className="text-sm text-navy-950">{req.currentMarks}%</strong>
                </div>
                <span className="text-slate-400 text-lg">→</span>
                <div className="text-center">
                  <span className="text-[10px] text-gold-700 uppercase font-bold block">Requested Score</span>
                  <strong className="text-sm text-emerald-700">{req.requestedMarks}%</strong>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <strong className="text-navy-950 block mb-0.5">Teacher&apos;s Justification:</strong>
              <p className="text-slate-700 leading-relaxed italic">&ldquo;{req.reason}&rdquo;</p>
            </div>

            <div className="pt-2 flex justify-between items-center">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  req.status === 'APPROVED'
                    ? 'bg-emerald-100 text-emerald-900'
                    : req.status === 'REJECTED'
                    ? 'bg-rose-100 text-rose-900'
                    : 'bg-amber-100 text-amber-900'
                }`}
              >
                {req.status}
              </span>

              {req.status === 'PENDING' && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAction(req.id, false)}
                    className="px-4 py-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-800 font-bold border border-rose-200 transition"
                  >
                    Reject Request
                  </button>
                  <button
                    onClick={() => handleAction(req.id, true)}
                    className="px-5 py-2 rounded-xl bg-navy-950 hover:bg-navy-900 text-gold-300 font-bold shadow-md transition"
                  >
                    Approve Adjustment
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
