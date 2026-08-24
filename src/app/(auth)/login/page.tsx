'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Lock, Mail, GraduationCap, Shield, ArrowRight, Loader2, 
  AlertCircle, Sparkles, CheckCircle2, User, KeyRound 
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (loginEmail?: string, loginPass?: string) => {
    const targetEmail = loginEmail || email;
    const targetPassword = loginPass || password;

    if (!targetEmail || !targetPassword) {
      setError('Please enter both email and password');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: targetEmail, password: targetPassword }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      router.push(data.redirectUrl || '/portal');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Invalid credentials. Please try again.');
      setLoading(false);
    }
  };

  const quickDemoAccounts = [
    {
      role: 'Principal',
      email: 'principal@akddemo.local',
      pass: 'akdPrincipal2026!',
      badge: 'bg-amber-100 text-amber-900 border-amber-300',
      desc: 'Academic oversight & alert review',
    },
    {
      role: 'Admin',
      email: 'admin@akddemo.local',
      pass: 'akdAdmin2026!',
      badge: 'bg-purple-100 text-purple-900 border-purple-300',
      desc: 'Full institutional management & CMS',
    },
    {
      role: 'Teacher (Math)',
      email: 'teacher.priya@akddemo.local',
      pass: 'akdTeacher2026!',
      badge: 'bg-blue-100 text-blue-900 border-blue-300',
      desc: 'Classes 8-A, 9-A, 10-A mark entry',
    },
    {
      role: 'Teacher (Science)',
      email: 'teacher.rajesh@akddemo.local',
      pass: 'akdTeacher2026!',
      badge: 'bg-indigo-100 text-indigo-900 border-indigo-300',
      desc: 'Classes 9-A, 10-A, 10-B Science',
    },
    {
      role: 'Parent (2 Children)',
      email: 'parent.ramesh@akddemo.local',
      pass: 'akdParent2026!',
      badge: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      desc: 'Aarav (10-A) & Ananya (8-A)',
    },
    {
      role: 'Student (10-A)',
      email: 'student.aarav@akddemo.local',
      pass: 'akdStudent2026!',
      badge: 'bg-sky-100 text-sky-900 border-sky-300',
      desc: 'Class 10-A student workspace',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy-950/10 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* Brand Crest */}
        <Link href="/" className="inline-flex items-center gap-3 group mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-400 to-amber-600 p-0.5 shadow-gold-glow flex items-center justify-center">
            <div className="w-full h-full bg-navy-950 rounded-[9px] flex items-center justify-center text-gold-400 font-serif font-bold text-xl">
              AKD
            </div>
          </div>
        </Link>
        <h2 className="text-2xl font-bold text-navy-950 tracking-tight font-serif">
          A.K.D. Dharma Raja School
        </h2>
        <p className="text-xs text-gold-700 font-bold uppercase tracking-widest mt-0.5">
          Digital Campus Ecosystem
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-2xl border border-slate-200 shadow-luxury">
          <div className="mb-6 text-center">
            <h3 className="text-base font-bold text-navy-950">Unified Secure Sign-In</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Role permissions are automatically resolved on the server.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-1">
                Institutional Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@akddemo.local"
                  className="w-full text-xs pl-10 pr-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-navy-900 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full text-xs pl-10 pr-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-navy-900 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center text-slate-600">
                <input type="checkbox" className="rounded border-slate-300 text-navy-950 mr-1.5" defaultChecked />
                Remember session
              </label>
              <span className="text-slate-400 hover:text-navy-950 cursor-pointer">Forgot password?</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-navy-950 to-navy-900 hover:from-navy-900 hover:to-navy-800 text-gold-300 font-bold text-xs tracking-wider uppercase shadow-md transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-gold-400" />
                  Verifying Identity...
                </>
              ) : (
                <>
                  <KeyRound className="w-4 h-4 text-gold-400" />
                  Sign In to Campus
                </>
              )}
            </button>
          </form>

          {/* 1-CLICK QUICK EVALUATOR DEMO LOGIN */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-gold-500" />
                1-Click Evaluator Quick Login
              </span>
              <span className="text-[10px] text-slate-400 font-semibold">Demo Sandbox</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {quickDemoAccounts.map((acc, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setEmail(acc.email);
                    setPassword(acc.pass);
                    handleLogin(acc.email, acc.pass);
                  }}
                  disabled={loading}
                  className="p-2.5 text-left rounded-lg bg-slate-50 hover:bg-gold-50 border border-slate-200 hover:border-gold-300 transition text-xs flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-navy-950 text-[11px] truncate">{acc.role}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 truncate mt-0.5">{acc.desc}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-slate-500 mt-6">
          <Link href="/" className="hover:text-navy-950 font-semibold transition">
            ← Return to Public School Showcase
          </Link>
        </p>
      </div>
    </div>
  );
}
