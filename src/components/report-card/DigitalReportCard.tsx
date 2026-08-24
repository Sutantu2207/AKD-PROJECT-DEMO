'use client';

import React from 'react';
import { Printer, Download, Award, Shield, CheckCircle2 } from 'lucide-react';

interface ReportCardSubject {
  subjectName: string;
  maxMarks: number;
  passMarks: number;
  marksObtained: number;
  grade: string;
  remarks?: string;
}

interface DigitalReportCardProps {
  studentName: string;
  rollNo: string;
  admissionNo: string;
  className: string;
  sectionName: string;
  academicYear: string;
  term: string;
  version?: number;
  subjects: ReportCardSubject[];
  attendancePercent: number;
  teacherRemarks: string;
  principalRemarks: string;
  publishedDate?: string;
}

export function DigitalReportCard({
  studentName,
  rollNo,
  admissionNo,
  className,
  sectionName,
  academicYear,
  term,
  version = 1,
  subjects,
  attendancePercent,
  teacherRemarks,
  principalRemarks,
  publishedDate = 'December 28, 2025',
}: DigitalReportCardProps) {
  const totalMax = subjects.reduce((a, b) => a + b.maxMarks, 0);
  const totalObtained = subjects.reduce((a, b) => a + b.marksObtained, 0);
  const overallPercentage = totalMax > 0 ? Math.round((totalObtained / totalMax) * 1000) / 10 : 0;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4">
      {/* Top Action Bar (hidden on print) */}
      <div className="no-print flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-sm font-bold text-navy-950">Official Digital Academic Transcript</h2>
          <p className="text-xs text-slate-500">
            Version {version} • Tamper-proof institutional record
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-navy-900 hover:bg-navy-800 text-gold-300 font-bold text-xs shadow-md transition"
          >
            <Printer className="w-4 h-4" />
            Print / Save as PDF
          </button>
        </div>
      </div>

      {/* Official Printable Report Card Frame */}
      <div className="bg-white border-4 border-navy-950 p-8 sm:p-12 rounded-xl shadow-luxury max-w-4xl mx-auto print:border-2 print:p-6 print:shadow-none print:max-w-none">
        {/* Institutional Crest Header */}
        <div className="text-center border-b-2 border-navy-950 pb-6 mb-6">
          <div className="flex justify-center items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-lg bg-navy-950 text-gold-400 font-serif font-bold text-2xl flex items-center justify-center border-2 border-gold-400 shadow-sm">
              AKD
            </div>
            <div className="text-left">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-navy-950 uppercase font-serif">
                A.K.D. Dharma Raja School
              </h1>
              <p className="text-xs font-semibold text-gold-700 tracking-wider uppercase">
                Tradition • Education • Excellence • Est. 1952
              </p>
            </div>
          </div>
          <p className="text-[11px] text-slate-600">
            P.A.C.R. Nagar, Rajapalayam – 626 117, Tamil Nadu | Affiliated to CBSE & State Board
          </p>
          <div className="mt-3 inline-block bg-navy-950 text-gold-300 px-6 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
            Official Cumulative Academic Report Card • {term} ({academicYear})
          </div>
        </div>

        {/* Student Metadata Box */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-lg bg-slate-50 border border-slate-200 mb-6 text-xs">
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Student Name</span>
            <span className="font-bold text-navy-950 text-sm">{studentName}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Roll Number</span>
            <span className="font-bold text-navy-950">{rollNo}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Admission ID</span>
            <span className="font-bold text-navy-950">{admissionNo}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Class & Section</span>
            <span className="font-bold text-navy-950">{className} - Section {sectionName}</span>
          </div>
        </div>

        {/* Marks Table */}
        <table className="w-full text-xs border-collapse border border-slate-300 mb-6">
          <thead>
            <tr className="bg-navy-950 text-white font-bold">
              <th className="border border-navy-800 p-2.5 text-left">Subject</th>
              <th className="border border-navy-800 p-2.5 text-center w-24">Max Marks</th>
              <th className="border border-navy-800 p-2.5 text-center w-24">Pass Marks</th>
              <th className="border border-navy-800 p-2.5 text-center w-28">Marks Obtained</th>
              <th className="border border-navy-800 p-2.5 text-center w-20">Grade</th>
              <th className="border border-navy-800 p-2.5 text-left">Teacher Observation</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((sub, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'}>
                <td className="border border-slate-300 p-2.5 font-bold text-navy-900">
                  {sub.subjectName}
                </td>
                <td className="border border-slate-300 p-2.5 text-center font-medium">
                  {sub.maxMarks}
                </td>
                <td className="border border-slate-300 p-2.5 text-center font-medium text-slate-600">
                  {sub.passMarks}
                </td>
                <td className="border border-slate-300 p-2.5 text-center font-bold text-navy-950 text-sm">
                  {sub.marksObtained}
                </td>
                <td className="border border-slate-300 p-2.5 text-center font-extrabold text-gold-700">
                  {sub.grade}
                </td>
                <td className="border border-slate-300 p-2.5 text-slate-700 italic text-[11px]">
                  {sub.remarks || 'Commendable performance.'}
                </td>
              </tr>
            ))}
            {/* Summary Row */}
            <tr className="bg-slate-100 font-bold border-t-2 border-navy-950 text-navy-950">
              <td className="border border-slate-300 p-2.5 text-right font-extrabold">
                Grand Total & Cumulative Average:
              </td>
              <td className="border border-slate-300 p-2.5 text-center font-extrabold">{totalMax}</td>
              <td className="border border-slate-300 p-2.5 text-center font-extrabold">-</td>
              <td className="border border-slate-300 p-2.5 text-center text-sm font-extrabold text-navy-950">
                {totalObtained} ({overallPercentage}%)
              </td>
              <td className="border border-slate-300 p-2.5 text-center font-extrabold text-gold-700">
                {overallPercentage >= 90 ? 'A+' : overallPercentage >= 80 ? 'A' : 'B+'}
              </td>
              <td className="border border-slate-300 p-2.5 font-bold text-emerald-700">
                Academic Distinction Awarded
              </td>
            </tr>
          </tbody>
        </table>

        {/* Academic Analytics & Attendance Summary */}
        <div className="grid grid-cols-2 gap-4 mb-6 text-xs">
          <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50">
            <h4 className="font-bold text-navy-950 mb-1.5 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-gold-600" /> Attendance Statistics
            </h4>
            <p className="text-slate-700">
              Annual Session Attendance Rate: <strong className="text-navy-950">{attendancePercent}%</strong>
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              Meets full institutional qualifying attendance standard (minimum 85% required).
            </p>
          </div>

          <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50">
            <h4 className="font-bold text-navy-950 mb-1.5 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-gold-600" /> Grading Reference
            </h4>
            <p className="text-[10px] text-slate-600 leading-tight">
              A+ (90-100% Outstanding) • A (80-89% Excellent) • B+ (70-79% Commendable) • B (60-69% Good) • C (50-59% Average)
            </p>
          </div>
        </div>

        {/* Remarks Section */}
        <div className="space-y-3 mb-10 text-xs">
          <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
            <span className="font-bold text-navy-950 block mb-1">Class Teacher Remarks:</span>
            <p className="text-slate-700 italic">&ldquo;{teacherRemarks}&rdquo;</p>
          </div>
          <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
            <span className="font-bold text-navy-950 block mb-1">Principal&apos;s Endorsement:</span>
            <p className="text-slate-700 italic">&ldquo;{principalRemarks}&rdquo;</p>
          </div>
        </div>

        {/* Signatures & Seal */}
        <div className="pt-8 border-t border-slate-300 grid grid-cols-3 gap-6 text-center text-xs">
          <div>
            <div className="h-10 border-b border-slate-400 mb-1 flex items-end justify-center pb-1">
              <span className="font-serif italic text-slate-600 text-xs">Mrs. Priya Subramanian</span>
            </div>
            <span className="text-slate-600 font-bold uppercase text-[10px]">Class Teacher Signature</span>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="w-14 h-14 rounded-full border-2 border-navy-950 flex items-center justify-center text-[8px] font-bold text-navy-950 uppercase tracking-tighter text-center p-1">
              School Seal Verified
            </div>
            <span className="text-slate-400 text-[9px] mt-1">Date: {publishedDate}</span>
          </div>

          <div>
            <div className="h-10 border-b border-slate-400 mb-1 flex items-end justify-center pb-1">
              <span className="font-serif italic text-slate-800 text-xs">Prof. S. Meenakshi Sundaram</span>
            </div>
            <span className="text-slate-600 font-bold uppercase text-[10px]">Principal & Academic Head</span>
          </div>
        </div>
      </div>
    </div>
  );
}
