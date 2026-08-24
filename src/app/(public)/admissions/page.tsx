'use client';

import React, { useState } from 'react';
import { 
  Sparkles, CheckCircle2, Search, ArrowRight, Shield, FileText, 
  Clock, AlertCircle, Loader2, Send 
} from 'lucide-react';

export default function AdmissionsPage() {
  // Tab state: Apply Online vs Track Application
  const [activeTab, setActiveTab] = useState<'apply' | 'track'>('apply');

  // Application Form State
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    email: '',
    phone: '',
    gradeApplying: 'Class 8',
    previousSchool: '',
    dob: '',
    address: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Application Tracking State
  const [searchAppNo, setSearchAppNo] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [trackResult, setTrackResult] = useState<any | null>(null);
  const [trackError, setTrackError] = useState<string | null>(null);

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(null);

    try {
      const res = await fetch('/api/admissions/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit application');

      setSubmitSuccess(data.applicationNo);
      setFormData({
        studentName: '',
        parentName: '',
        email: '',
        phone: '',
        gradeApplying: 'Class 8',
        previousSchool: '',
        dob: '',
        address: '',
      });
    } catch (err: any) {
      setSubmitError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTrackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchAppNo.trim()) return;

    setIsTracking(true);
    setTrackError(null);
    setTrackResult(null);

    try {
      const res = await fetch(`/api/admissions/track?appNo=${encodeURIComponent(searchAppNo.trim())}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Application number not found');
      setTrackResult(data.application);
    } catch (err: any) {
      setTrackError(err.message);
    } finally {
      setIsTracking(false);
    }
  };

  const pipelineStages = [
    'SUBMITTED',
    'DOCUMENT_VERIFICATION',
    'INTERVIEW',
    'ASSESSMENT',
    'SELECTED',
    'ADMITTED',
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-12 text-center">
        <span className="text-xs font-bold text-amber-800 uppercase tracking-widest bg-amber-50 px-3.5 py-1 rounded-full border border-amber-200">
          Admissions 2026–2027 Academic Year
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold text-navy-950 mt-3 font-serif">
          Join the Legacy of Academic Distinction
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl mx-auto mt-3 leading-relaxed">
          Follow our transparent, merit-oriented admissions process. Complete your application online and track real-time progress.
        </p>

        {/* Tab Switcher */}
        <div className="mt-8 inline-flex p-1 rounded-xl bg-slate-200 border border-slate-300">
          <button
            onClick={() => setActiveTab('apply')}
            className={`px-6 py-2 rounded-lg text-xs font-bold transition ${
              activeTab === 'apply'
                ? 'bg-navy-950 text-gold-300 shadow-md'
                : 'text-slate-700 hover:text-navy-950'
            }`}
          >
            Online Application Form
          </button>
          <button
            onClick={() => setActiveTab('track')}
            className={`px-6 py-2 rounded-lg text-xs font-bold transition ${
              activeTab === 'track'
                ? 'bg-navy-950 text-gold-300 shadow-md'
                : 'text-slate-700 hover:text-navy-950'
            }`}
          >
            Track Application Status
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        {/* TAB 1: ONLINE APPLICATION FORM */}
        {activeTab === 'apply' && (
          <div className="bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-luxury">
            <div className="mb-6 pb-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-navy-950 font-serif">
                Prospective Student Application Form
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Please provide accurate details. An official application reference number will be generated upon submission.
              </p>
            </div>

            {submitSuccess && (
              <div className="mb-6 p-5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 animate-slide-up">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  Application Submitted Successfully!
                </div>
                <p className="text-xs mt-2 text-emerald-800">
                  Your official Application Reference Number is:{' '}
                  <strong className="text-navy-950 font-mono bg-emerald-100 px-2 py-0.5 rounded text-sm">
                    {submitSuccess}
                  </strong>
                </p>
                <p className="text-[11px] text-emerald-700 mt-1">
                  Please save this number to track your document verification and interview scheduling in the tracking tab.
                </p>
              </div>
            )}

            {submitError && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                <span>{submitError}</span>
              </div>
            )}

            <form onSubmit={handleApplySubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-1.5">
                    Student Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    placeholder="e.g. Siddharth Venkat"
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-navy-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-1.5">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-navy-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-1.5">
                    Grade Applying For *
                  </label>
                  <select
                    value={formData.gradeApplying}
                    onChange={(e) => setFormData({ ...formData, gradeApplying: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-navy-900 focus:outline-none"
                  >
                    <option value="Class 8">Class 8</option>
                    <option value="Class 9">Class 9</option>
                    <option value="Class 10">Class 10</option>
                    <option value="Class 11 (Science)">Class 11 (Science - PCM/PCB)</option>
                    <option value="Class 11 (Commerce)">Class 11 (Commerce & Economics)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-1.5">
                    Previous School Attended
                  </label>
                  <input
                    type="text"
                    value={formData.previousSchool}
                    onChange={(e) => setFormData({ ...formData, previousSchool: e.target.value })}
                    placeholder="e.g. Vidya Mandir"
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-navy-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-1.5">
                    Parent / Guardian Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    placeholder="e.g. Dr. Venkat Raman"
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-navy-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-1.5">
                    Contact Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98840 55101"
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-navy-900 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-1.5">
                    Parent Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="parent.name@example.com"
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-navy-900 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-1.5">
                    Residential Address
                  </label>
                  <textarea
                    rows={2}
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Street, City, Pincode"
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-navy-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-gold-500 to-amber-400 hover:from-gold-600 hover:to-amber-500 text-navy-950 font-bold text-xs tracking-wide shadow-luxury transition flex items-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Registering Application...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit Online Application
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 2: APPLICATION STATUS TRACKER */}
        {activeTab === 'track' && (
          <div className="bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-luxury">
            <div className="mb-6 pb-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-navy-950 font-serif">
                Real-Time Application Status Lookup
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Enter your application reference number (e.g. <code>AKD-ADM-2026-001</code>) to track your verification stage.
              </p>
            </div>

            <form onSubmit={handleTrackSubmit} className="flex gap-3 mb-8">
              <input
                type="text"
                required
                value={searchAppNo}
                onChange={(e) => setSearchAppNo(e.target.value)}
                placeholder="Enter Application Reference No. (e.g. AKD-ADM-2026-001)"
                className="flex-1 text-xs px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-navy-900 focus:outline-none uppercase font-mono"
              />
              <button
                type="submit"
                disabled={isTracking}
                className="px-6 py-3 rounded-xl bg-navy-950 hover:bg-navy-900 text-gold-300 font-bold text-xs shadow-md transition flex items-center gap-2 disabled:opacity-50"
              >
                {isTracking ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                Track Application
              </button>
            </form>

            {trackError && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                <span>{trackError}</span>
              </div>
            )}

            {trackResult && (
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-6 animate-slide-up">
                <div className="flex flex-wrap justify-between items-start gap-4 pb-4 border-b border-slate-200">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Application Number</span>
                    <h3 className="text-lg font-bold text-navy-950 font-mono">{trackResult.applicationNo}</h3>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Current Status</span>
                    <div className="inline-block mt-0.5 px-3 py-1 rounded-full text-xs font-bold bg-navy-950 text-gold-300 border border-gold-400/40">
                      {trackResult.status.replace('_', ' ')}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Applicant</span>
                    <span className="font-bold text-navy-950">{trackResult.studentName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Parent</span>
                    <span className="font-bold text-navy-950">{trackResult.parentName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Grade Applying</span>
                    <span className="font-bold text-navy-950">{trackResult.gradeApplying}</span>
                  </div>
                </div>

                {trackResult.notes && (
                  <div className="p-3.5 rounded-lg bg-white border border-slate-200 text-xs">
                    <span className="font-bold text-navy-950 block mb-1">Admissions Office Remarks:</span>
                    <p className="text-slate-700">{trackResult.notes}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
