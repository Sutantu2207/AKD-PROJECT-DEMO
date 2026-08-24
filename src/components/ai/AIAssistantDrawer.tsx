'use client';

import React, { useState } from 'react';
import { 
  X, Send, Sparkles, Bot, User as UserIcon, Shield, CheckCircle2, 
  HelpCircle, ArrowRight, CornerDownLeft, Loader2 
} from 'lucide-react';
import { AuthUser } from '@/types';

interface AIAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  user: AuthUser;
  activeChildId?: string;
}

interface Message {
  sender: 'user' | 'ai';
  text: string;
  dataPoints?: any;
  suggestions?: string[];
  time: string;
}

export function AIAssistantDrawer({ isOpen, onClose, user, activeChildId }: AIAssistantDrawerProps) {
  const [inputPrompt, setInputPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  // Initial welcome message based on role
  const getInitialMessages = (): Message[] => {
    switch (user.role) {
      case 'PARENT':
        return [
          {
            sender: 'ai',
            text: `Hello ${user.name}! I am your AKD Academic AI Assistant. I have verified access to your linked child's performance data. How can I assist you with marks, trends, or attendance today?`,
            suggestions: [
              'How is my child doing in Mathematics?',
              'What is my child\'s attendance this month?',
              'Show comparison with previous academic year',
            ],
            time: 'Just now',
          },
        ];
      case 'TEACHER':
        return [
          {
            sender: 'ai',
            text: `Welcome Mrs./Mr. ${user.name.split(' ')[1] || user.name}! I am here to help you analyze class trends, identify students requiring support, and manage assignment deadlines.`,
            suggestions: [
              'Which students in 10-A had a score decline?',
              'Show average marks in Mathematics',
              'Check attendance alerts for my assigned classes',
            ],
            time: 'Just now',
          },
        ];
      case 'STUDENT':
        return [
          {
            sender: 'ai',
            text: `Hi ${user.name.split(' ')[0]}! I am your learning assistant. Ask me about upcoming assignments, study notes, or your exam performance breakdown.`,
            suggestions: [
              'What assignments are due this week?',
              'How can I improve in Mathematics?',
              'Show my overall grade summary',
            ],
            time: 'Just now',
          },
        ];
      default:
        return [
          {
            sender: 'ai',
            text: `Welcome to AKD Institutional Intelligence. Ask me about school-wide pass rates, attendance distributions, or pending admission reviews.`,
            suggestions: [
              'Which class has the highest attendance?',
              'Show pass percentage across all grades',
              'Summarize pending admission pipeline',
            ],
            time: 'Just now',
          },
        ];
    }
  };

  const [messages, setMessages] = useState<Message[]>(getInitialMessages());

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || inputPrompt;
    if (!textToSend.trim() || loading) return;

    const userMsg: Message = {
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: textToSend,
          activeChildId,
        }),
      });

      const data = await res.json();

      const aiMsg: Message = {
        sender: 'ai',
        text: data.reply || 'Data could not be retrieved at this time.',
        dataPoints: data.dataPoints,
        suggestions: data.suggestions,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (e) {
      console.error(e);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: 'Unable to connect to Academic Intelligence layer. Please try again.',
          time: 'Just now',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-navy-950/60 backdrop-blur-sm flex justify-end transition-opacity">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-left border-l border-slate-200">
        {/* Drawer Header */}
        <div className="p-4 bg-navy-950 text-white flex items-center justify-between border-b border-navy-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold-400 to-amber-600 p-0.5 flex items-center justify-center shadow-gold-glow">
              <Bot className="w-4 h-4 text-navy-950 font-bold" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-gold-300 flex items-center gap-1.5">
                <span>AKD AI Assistant</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-gold-500/20 text-gold-400 border border-gold-400/30">
                  Grounded
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">
                Strict Role-Based Academic Intelligence
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Privacy & Grounding Guard Notice */}
        <div className="bg-amber-50 border-b border-amber-200/80 px-4 py-2 text-[11px] text-amber-900 flex items-center gap-2">
          <Shield className="w-3.5 h-3.5 text-amber-700 flex-shrink-0" />
          <span>All insights are verified facts strictly from the active database. Zero invented marks.</span>
        </div>

        {/* Messages Feed */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${
                m.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed shadow-sm ${
                  m.sender === 'user'
                    ? 'bg-navy-900 text-white rounded-br-none'
                    : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1 font-semibold text-[10px] text-gold-600">
                  {m.sender === 'user' ? 'You' : 'AKD Academic AI'}
                  <span className="text-slate-400 font-normal ml-auto text-[9px]">{m.time}</span>
                </div>
                <p className="whitespace-pre-line">{m.text}</p>

                {/* Optional Data Points breakdown */}
                {m.dataPoints && (
                  <div className="mt-2.5 pt-2 border-t border-slate-100 bg-slate-50 p-2 rounded-lg text-[11px] text-slate-700">
                    <span className="font-bold text-navy-950 block mb-1">Supporting Data:</span>
                    <pre className="text-[10px] font-mono text-slate-600 overflow-x-auto">
                      {JSON.stringify(m.dataPoints, null, 2)}
                    </pre>
                  </div>
                )}
              </div>

              {/* Suggestions chips */}
              {m.suggestions && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {m.suggestions.map((sug, sIdx) => (
                    <button
                      key={sIdx}
                      onClick={() => handleSend(sug)}
                      className="text-[11px] bg-white hover:bg-gold-50 hover:text-gold-800 hover:border-gold-300 text-slate-600 border border-slate-200 px-2.5 py-1 rounded-full transition shadow-xs flex items-center gap-1"
                    >
                      <span>{sug}</span>
                      <ArrowRight className="w-2.5 h-2.5 text-gold-600" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-slate-500 bg-white p-3 rounded-xl border border-slate-200 w-fit">
              <Loader2 className="w-4 h-4 text-gold-600 animate-spin" />
              <span>Analyzing authenticated database records...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder="Ask about marks, trends, attendance..."
              className="flex-1 text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-900 focus:border-transparent"
            />
            <button
              type="submit"
              disabled={loading || !inputPrompt.trim()}
              className="p-2.5 rounded-lg bg-navy-900 hover:bg-navy-800 text-gold-400 font-bold transition disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
