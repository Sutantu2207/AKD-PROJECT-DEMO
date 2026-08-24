import React from 'react';
import { requireRole } from '@/lib/auth';
import { Clock, CalendarCheck, BookOpen } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function StudentTimetablePage() {
  const user = await requireRole(['STUDENT', 'SUPER_ADMIN', 'ADMIN']);

  const schedule = [
    { period: 'Period 1 (08:45 - 09:30)', mon: 'Mathematics', tue: 'Science (Physics)', wed: 'Mathematics', thu: 'English', fri: 'Science (Chemistry)', sat: 'Mathematics' },
    { period: 'Period 2 (09:30 - 10:15)', mon: 'Science (Physics)', tue: 'Mathematics', wed: 'Social Science', thu: 'Mathematics', fri: 'English', sat: 'Science (Physics)' },
    { period: 'Period 3 (10:30 - 11:15)', mon: 'English', tue: 'Social Science', wed: 'Science (Chemistry)', thu: 'Computer Science', fri: 'Mathematics', sat: 'Social Science' },
    { period: 'Period 4 (11:15 - 12:00)', mon: 'Social Science', tue: 'Tamil', wed: 'English', thu: 'Science (Physics)', fri: 'Tamil', sat: 'Robotics Lab' },
    { period: 'Period 5 (12:45 - 01:30)', mon: 'Computer Science', tue: 'Mathematics', wed: 'Tamil', thu: 'Social Science', fri: 'Computer Science', sat: 'Library' },
    { period: 'Period 6 (01:30 - 02:15)', mon: 'Science (Biology)', tue: 'Computer Science', wed: 'Physics Lab', thu: 'Tamil', fri: 'Biology Lab', sat: 'Sports & Games' },
    { period: 'Period 7 (02:30 - 03:15)', mon: 'Tamil', tue: 'Chemistry Lab', wed: 'Sports & Games', thu: 'Physics Lab', fri: 'Moral Instruction', sat: 'Clubs' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Class 10-A Weekly Schedule
        </span>
        <h1 className="text-2xl font-bold text-navy-950 font-serif">
          Academic Timetable
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Regular instruction hours: Monday through Saturday (08:30 AM – 03:30 PM).
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-luxury overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="bg-navy-950 text-white font-bold">
              <th className="p-3 border border-navy-800">Time Slot</th>
              <th className="p-3 border border-navy-800 text-center">Monday</th>
              <th className="p-3 border border-navy-800 text-center">Tuesday</th>
              <th className="p-3 border border-navy-800 text-center">Wednesday</th>
              <th className="p-3 border border-navy-800 text-center">Thursday</th>
              <th className="p-3 border border-navy-800 text-center">Friday</th>
              <th className="p-3 border border-navy-800 text-center">Saturday</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {schedule.map((row, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                <td className="p-3 font-bold text-navy-950 border border-slate-200">{row.period}</td>
                <td className="p-3 text-center border border-slate-200 font-medium text-slate-700">{row.mon}</td>
                <td className="p-3 text-center border border-slate-200 font-medium text-slate-700">{row.tue}</td>
                <td className="p-3 text-center border border-slate-200 font-medium text-slate-700">{row.wed}</td>
                <td className="p-3 text-center border border-slate-200 font-medium text-slate-700">{row.thu}</td>
                <td className="p-3 text-center border border-slate-200 font-medium text-slate-700">{row.fri}</td>
                <td className="p-3 text-center border border-slate-200 font-medium text-slate-700">{row.sat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
