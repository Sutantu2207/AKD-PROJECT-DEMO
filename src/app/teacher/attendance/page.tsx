'use client';

import React, { useState } from 'react';
import { CalendarCheck, Save, CheckCircle2, XCircle, Clock, Loader2, Users } from 'lucide-react';

interface AttendanceStudent {
  studentId: string;
  rollNo: string;
  name: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED';
  remarks: string;
}

export default function TeacherAttendancePage() {
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedClass, setSelectedClass] = useState('10-A');
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [roster, setRoster] = useState<AttendanceStudent[]>([
    { studentId: 'st_1', rollNo: '10A01', name: 'Aarav Sharma', status: 'PRESENT', remarks: '' },
    { studentId: 'st_2', rollNo: '10A02', name: 'Kavya Sridhar', status: 'PRESENT', remarks: '' },
    { studentId: 'st_3', rollNo: '10A03', name: 'Rohan Narayanan', status: 'PRESENT', remarks: '' },
    { studentId: 'st_4', rollNo: '10A04', name: 'Deepak Varma', status: 'PRESENT', remarks: '' },
    { studentId: 'st_5', rollNo: '10A05', name: 'Sneha Venkatesh', status: 'PRESENT', remarks: '' },
    { studentId: 'st_6', rollNo: '10A06', name: 'Harish Kumar', status: 'PRESENT', remarks: '' },
    { studentId: 'st_7', rollNo: '10A07', name: 'Pooja Raghavan', status: 'PRESENT', remarks: '' },
    { studentId: 'st_8', rollNo: '10A08', name: 'Manoj Krishna', status: 'PRESENT', remarks: '' },
    { studentId: 'st_9', rollNo: '10A09', name: 'Divya Shankar', status: 'PRESENT', remarks: '' },
    { studentId: 'st_10', rollNo: '10A10', name: 'Naveen Raj', status: 'PRESENT', remarks: '' },
  ]);

  const handleStatusChange = (index: number, status: 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED') => {
    const updated = [...roster];
    updated[index].status = status;
    setRoster(updated);
  };

  const handleBulkSetAll = (status: 'PRESENT' | 'ABSENT') => {
    const updated = roster.map((s) => ({ ...s, status }));
    setRoster(updated);
  };

  const handleSaveAttendance = async () => {
    setSaving(true);
    setSuccessMsg(null);

    try {
      const res = await fetch('/api/attendance/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          classId: 'class_10',
          sectionId: 'sec_10a',
          date,
          records: roster.map((s) => ({
            studentId: s.studentId,
            status: s.status,
            remarks: s.remarks,
          })),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to record attendance');

      setSuccessMsg(`Attendance for Class ${selectedClass} recorded successfully (${roster.length} students).`);
    } catch (err: any) {
      alert(err.message || 'Attendance error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Daily Session Recording
          </span>
          <h1 className="text-2xl font-bold text-navy-950 font-serif">
            Class Attendance Register
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Mark daily attendance with 1-click bulk tools and instant synchronization.
          </p>
        </div>

        <button
          onClick={handleSaveAttendance}
          disabled={saving}
          className="px-6 py-2.5 rounded-xl bg-navy-950 hover:bg-navy-900 text-gold-300 font-bold text-xs shadow-md transition flex items-center gap-2 disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Attendance Record
        </button>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-center gap-2 animate-slide-up">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Filter & Controls Bar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Select Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="text-xs px-3 py-1.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-navy-900 font-medium"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Class & Section</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="text-xs px-3 py-1.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-navy-900 font-semibold"
            >
              <option value="10-A">Class 10 - Section A</option>
              <option value="9-A">Class 9 - Section A</option>
              <option value="8-A">Class 8 - Section A</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleBulkSetAll('PRESENT')}
            className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition"
          >
            ✓ Mark All Present
          </button>
          <button
            onClick={() => handleBulkSetAll('ABSENT')}
            className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 text-xs font-bold transition"
          >
            ✕ Mark All Absent
          </button>
        </div>
      </div>

      {/* Attendance Grid */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-luxury overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-navy-950 text-navy-950 uppercase tracking-wider font-bold">
              <th className="pb-3 w-16">Roll</th>
              <th className="pb-3 w-48">Student Name</th>
              <th className="pb-3 text-center w-64">Attendance Status</th>
              <th className="pb-3">Session Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {roster.map((st, idx) => (
              <tr key={st.studentId} className="hover:bg-slate-50 transition">
                <td className="py-3 font-bold text-navy-950">{st.rollNo}</td>
                <td className="py-3 font-semibold text-navy-950">{st.name}</td>

                {/* Status Radio Buttons */}
                <td className="py-3 text-center">
                  <div className="inline-flex rounded-lg border border-slate-200 p-0.5 bg-slate-50 gap-1">
                    {(['PRESENT', 'ABSENT', 'LATE', 'EXCUSED'] as const).map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => handleStatusChange(idx, status)}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition ${
                          st.status === status
                            ? status === 'PRESENT'
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : status === 'ABSENT'
                              ? 'bg-rose-600 text-white shadow-xs'
                              : status === 'LATE'
                              ? 'bg-amber-600 text-white shadow-xs'
                              : 'bg-blue-600 text-white shadow-xs'
                            : 'text-slate-600 hover:text-navy-950'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </td>

                <td className="py-3">
                  <input
                    type="text"
                    value={st.remarks}
                    onChange={(e) => {
                      const updated = [...roster];
                      updated[idx].remarks = e.target.value;
                      setRoster(updated);
                    }}
                    placeholder="Optional remarks (e.g. medical excuse, sports duty)"
                    className="w-full text-xs px-2.5 py-1 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-navy-900"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
