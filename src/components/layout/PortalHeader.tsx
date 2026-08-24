'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Bell, Sparkles, User, ChevronDown, Calendar, ShieldCheck, 
  GraduationCap, Search, CheckCircle2 
} from 'lucide-react';
import { AuthUser, ChildSummary } from '@/types';
import { AIAssistantDrawer } from '@/components/ai/AIAssistantDrawer';

interface PortalHeaderProps {
  user: AuthUser;
  childrenList?: ChildSummary[];
  activeChildId?: string;
}

export function PortalHeader({ user, childrenList = [], activeChildId }: PortalHeaderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [aiDrawerOpen, setAiDrawerOpen] = useState(false);
  const [childMenuOpen, setChildMenuOpen] = useState(false);

  // Time-aware greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';

  const activeChild = childrenList.find((c) => c.studentId === activeChildId) || childrenList[0];

  const handleChildSelect = (childId: string) => {
    const params = new URLSearchParams(searchParams?.toString() || '');
    params.set('childId', childId);
    router.push(`?${params.toString()}`);
    setChildMenuOpen(false);
  };

  return (
    <>
      <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between z-30 sticky top-0 shadow-sm">
        {/* Left: Greeting & Role Title */}
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-base font-bold text-navy-950 flex items-center gap-2">
              <span>{greeting}, {user.name.split(' ')[0]}</span>
              <span className="hidden sm:inline-block text-xs font-normal text-slate-500">
                • {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </h1>
            <p className="text-xs text-slate-500">
              A.K.D. Dharma Raja School Digital Campus
            </p>
          </div>
        </div>

        {/* Right: Actions & Switchers */}
        <div className="flex items-center gap-3">
          {/* Multi-Child Switcher for Parents */}
          {user.role === 'PARENT' && childrenList.length > 0 && (
            <div className="relative">
              <button
                onClick={() => setChildMenuOpen(!childMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-navy-50 hover:bg-navy-100 border border-navy-200 text-xs font-semibold text-navy-900 transition shadow-sm"
              >
                <GraduationCap className="w-4 h-4 text-gold-600" />
                <span>
                  {activeChild ? `${activeChild.studentName} (${activeChild.className}-${activeChild.sectionName})` : 'Select Student'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-600" />
              </button>

              {childMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-luxury-lg border border-slate-200 py-2 z-50 animate-slide-up">
                  <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Linked Children ({childrenList.length})
                  </div>
                  {childrenList.map((ch) => (
                    <button
                      key={ch.studentId}
                      onClick={() => handleChildSelect(ch.studentId)}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition ${
                        activeChild?.studentId === ch.studentId
                          ? 'bg-gold-50 text-navy-950 font-bold border-l-2 border-gold-500'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div>
                        <div className="font-semibold">{ch.studentName}</div>
                        <div className="text-[11px] text-slate-500">
                          {ch.className}-{ch.sectionName} • Roll {ch.rollNo}
                        </div>
                      </div>
                      {activeChild?.studentId === ch.studentId && (
                        <CheckCircle2 className="w-4 h-4 text-gold-600" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* AKD AI Assistant Launcher Button */}
          <button
            onClick={() => setAiDrawerOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-navy-950 via-navy-900 to-navy-800 hover:from-navy-900 hover:to-navy-700 text-gold-300 border border-gold-400/40 text-xs font-bold shadow-md hover:shadow-gold-glow transition transform hover:-translate-y-0.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
            <span className="hidden md:inline">AKD AI Assistant</span>
            <span className="md:hidden">AI</span>
          </button>
        </div>
      </header>

      {/* Role-Aware AI Assistant Drawer */}
      <AIAssistantDrawer
        isOpen={aiDrawerOpen}
        onClose={() => setAiDrawerOpen(false)}
        user={user}
        activeChildId={activeChild?.studentId}
      />
    </>
  );
}
