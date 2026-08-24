'use client';

import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from 'recharts';

interface PerformanceChartsProps {
  multiTermData: any[];
  yearComparisonData: any[];
  previousYearName: string;
  currentYearName: string;
}

export function PerformanceCharts({
  multiTermData,
  yearComparisonData,
  previousYearName,
  currentYearName,
}: PerformanceChartsProps) {
  const [selectedSubject, setSelectedSubject] = useState<string>('All');

  const customTooltipStyle = {
    backgroundColor: '#0B192C',
    borderColor: '#1E3E62',
    color: '#ffffff',
    borderRadius: '12px',
    fontSize: '12px',
  };

  return (
    <div className="space-y-10">
      {/* 1. Multi-Term Chronological Line Chart */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-luxury space-y-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <h3 className="text-base font-bold text-navy-950 font-serif">
              Assessment Chronology & Marks Progression
            </h3>
            <p className="text-xs text-slate-500">
              Tracking performance trajectory across Unit Tests, Quarterly, and Half-Yearly examinations.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-slate-600">Filter View:</span>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-navy-900"
            >
              <option value="All">All Subjects (Overall View)</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Science">Science</option>
              <option value="English">English</option>
            </select>
          </div>
        </div>

        <div className="h-80 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={multiTermData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="term" stroke="#64748b" fontSize={12} tickLine={false} />
              <YAxis domain={[0, 100]} stroke="#64748b" fontSize={12} tickLine={false} unit="%" />
              <Tooltip contentStyle={customTooltipStyle} />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '12px' }} />

              {(selectedSubject === 'All' || selectedSubject === 'Overall') && (
                <Line
                  type="monotone"
                  dataKey="Overall"
                  stroke="#D4AF37"
                  strokeWidth={3.5}
                  dot={{ r: 5, fill: '#0B192C', stroke: '#D4AF37', strokeWidth: 2 }}
                  activeDot={{ r: 7 }}
                />
              )}
              {(selectedSubject === 'All' || selectedSubject === 'Mathematics') && (
                <Line
                  type="monotone"
                  dataKey="Mathematics"
                  stroke="#1E3E62"
                  strokeWidth={2.5}
                  dot={{ r: 4 }}
                />
              )}
              {(selectedSubject === 'All' || selectedSubject === 'Science') && (
                <Line
                  type="monotone"
                  dataKey="Science"
                  stroke="#10B981"
                  strokeWidth={2.5}
                  dot={{ r: 4 }}
                />
              )}
              {(selectedSubject === 'All' || selectedSubject === 'English') && (
                <Line
                  type="monotone"
                  dataKey="English"
                  stroke="#881337"
                  strokeWidth={2.5}
                  dot={{ r: 4 }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. Year-over-Year Comparison Bar Chart */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-luxury space-y-6">
        <div>
          <h3 className="text-base font-bold text-navy-950 font-serif">
            Year-over-Year Academic Comparison ({previousYearName} vs {currentYearName})
          </h3>
          <p className="text-xs text-slate-500">
            Subject-by-subject percentage shift compared against the previous academic year.
          </p>
        </div>

        <div className="h-80 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={yearComparisonData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="subject" stroke="#64748b" fontSize={12} tickLine={false} />
              <YAxis domain={[0, 100]} stroke="#64748b" fontSize={12} tickLine={false} unit="%" />
              <Tooltip contentStyle={customTooltipStyle} />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '12px' }} />

              <Bar
                dataKey="previousScore"
                name={`${previousYearName} (Previous Year)`}
                fill="#94A3B8"
                radius={[6, 6, 0, 0]}
              />
              <Bar
                dataKey="currentScore"
                name={`${currentYearName} (Current Year)`}
                fill="#0B192C"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
