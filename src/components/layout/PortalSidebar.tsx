'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, BookOpen, BarChart3, CalendarCheck, FileText, 
  Award, Bell, Settings, LogOut, Users, UserCheck, ShieldAlert, 
  GraduationCap, ClipboardCheck, Sparkles, FolderKanban, History
} from 'lucide-react';
import { AuthUser, UserRole } from '@/types';

interface PortalSidebarProps {
  user: AuthUser;
}

export function PortalSidebar({ user }: PortalSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
      router.refresh();
    } catch (e) {
      console.error(e);
      window.location.href = '/login';
    }
  };

  // Build role-specific navigation menu
  const getNavItems = () => {
    switch (user.role) {
      case 'PARENT':
        return [
          { name: 'Dashboard', href: '/parent', icon: LayoutDashboard },
          { name: 'Academics & Marks', href: '/parent/academics', icon: BookOpen },
          { name: 'Performance & Trends', href: '/parent/performance', icon: BarChart3 },
          { name: 'Attendance Records', href: '/parent/attendance', icon: CalendarCheck },
          { name: 'Assignments', href: '/parent/assignments', icon: FileText },
          { name: 'Digital Report Cards', href: '/parent/report-card', icon: Award },
          { name: 'Notifications', href: '/parent/notifications', icon: Bell },
        ];
      case 'STUDENT':
        return [
          { name: 'My Dashboard', href: '/student', icon: LayoutDashboard },
          { name: 'My Performance', href: '/student/performance', icon: BarChart3 },
          { name: 'Assignments', href: '/student/assignments', icon: FileText },
          { name: 'Study Materials', href: '/student/study-material', icon: BookOpen },
          { name: 'Timetable & Schedule', href: '/student/timetable', icon: CalendarCheck },
          { name: 'Achievements & Badges', href: '/student/achievements', icon: Award },
        ];
      case 'TEACHER':
        return [
          { name: 'Teacher Overview', href: '/teacher', icon: LayoutDashboard },
          { name: 'Spreadsheet Mark Entry', href: '/teacher/marks', icon: ClipboardCheck },
          { name: 'Daily Attendance', href: '/teacher/attendance', icon: CalendarCheck },
          { name: 'Assignments Manager', href: '/teacher/assignments', icon: FileText },
          { name: 'Study Materials', href: '/teacher/study-material', icon: BookOpen },
          { name: 'Academic Remarks', href: '/teacher/remarks', icon: Award },
          { name: 'Class Analytics', href: '/teacher/analytics', icon: BarChart3 },
        ];
      case 'PRINCIPAL':
        return [
          { name: 'Principal Overview', href: '/principal', icon: LayoutDashboard },
          { name: 'School Analytics', href: '/admin/analytics', icon: BarChart3 },
          { name: 'Academic Attention Alerts', href: '/admin/alerts', icon: ShieldAlert },
          { name: 'Mark Correction Approvals', href: '/principal/corrections', icon: ClipboardCheck },
          { name: 'Admission Pipeline', href: '/admin/admissions', icon: FolderKanban },
          { name: 'Audit Trail', href: '/admin/audit-logs', icon: History },
        ];
      case 'SUPER_ADMIN':
      case 'ADMIN':
      default:
        return [
          { name: 'School Executive Dashboard', href: '/admin', icon: LayoutDashboard },
          { name: 'Student Directory', href: '/admin/students', icon: GraduationCap },
          { name: 'Teacher Management', href: '/admin/teachers', icon: UserCheck },
          { name: 'Parent Management', href: '/admin/parents', icon: Users },
          { name: 'Classes & Subjects', href: '/admin/classes', icon: BookOpen },
          { name: 'Examinations Manager', href: '/admin/exams', icon: ClipboardCheck },
          { name: 'School Analytics', href: '/admin/analytics', icon: BarChart3 },
          { name: 'Admissions Pipeline', href: '/admin/admissions', icon: FolderKanban },
          { name: 'Academic Alerts', href: '/admin/alerts', icon: ShieldAlert },
          { name: 'CMS & Site Settings', href: '/admin/cms', icon: Settings },
          { name: 'Security Audit Logs', href: '/admin/audit-logs', icon: History },
        ];
    }
  };

  const navItems = getNavItems();

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case 'SUPER_ADMIN':
      case 'ADMIN':
        return 'bg-purple-900/60 text-purple-200 border-purple-700/60';
      case 'PRINCIPAL':
        return 'bg-amber-900/60 text-amber-200 border-amber-700/60';
      case 'TEACHER':
        return 'bg-blue-900/60 text-blue-200 border-blue-700/60';
      case 'PARENT':
        return 'bg-emerald-900/60 text-emerald-200 border-emerald-700/60';
      case 'STUDENT':
        return 'bg-sky-900/60 text-sky-200 border-sky-700/60';
      default:
        return 'bg-navy-800 text-slate-300 border-navy-700';
    }
  };

  return (
    <aside className="w-64 bg-navy-950 text-slate-300 border-r border-navy-800/80 flex flex-col flex-shrink-0 min-h-screen">
      {/* Brand Header */}
      <div className="p-4 border-b border-navy-800/80 flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-gold-400 to-amber-600 p-0.5 shadow-gold-glow flex items-center justify-center flex-shrink-0">
          <div className="w-full h-full bg-navy-950 rounded-[7px] flex items-center justify-center text-gold-400 font-serif font-bold text-base">
            AKD
          </div>
        </div>
        <div>
          <h2 className="text-white font-bold text-sm leading-tight tracking-tight">
            AKD DIGITAL
          </h2>
          <span className="text-[10px] text-gold-400 font-medium uppercase tracking-wider">
            Campus Ecosystem
          </span>
        </div>
      </div>

      {/* User Card */}
      <div className="p-3.5 mx-3 my-3 rounded-xl bg-navy-900/90 border border-navy-800 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-navy-700 to-navy-800 border border-gold-400/40 flex items-center justify-center text-gold-400 font-bold text-sm flex-shrink-0">
          {user.name.charAt(0)}
        </div>
        <div className="overflow-hidden flex-1">
          <h4 className="text-white font-semibold text-xs truncate leading-tight">
            {user.name}
          </h4>
          <span
            className={`inline-block mt-1 px-1.5 py-0.5 rounded text-[10px] font-semibold border ${getRoleBadgeColor(
              user.role
            )}`}
          >
            {user.role.replace('_', ' ')}
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        <div className="px-2 pb-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
          Main Navigation
        </div>
        {navItems.map((item) => {
          const isActive = Boolean(pathname && (pathname === item.href || pathname.startsWith(item.href + '/')));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-gold-500/20 via-navy-800 to-navy-800 text-gold-300 border-l-2 border-gold-400 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-navy-900/60'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-gold-400' : 'text-slate-400'}`} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Footer Actions */}
      <div className="p-3 border-t border-navy-800/80 space-y-2">
        <Link
          href="/"
          className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md bg-navy-900/60 hover:bg-navy-800 text-slate-400 hover:text-slate-200 text-xs transition"
        >
          <BookOpen className="w-3.5 h-3.5 text-gold-400" />
          Public School Website
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-md bg-maroon-900/30 hover:bg-maroon-900/60 text-red-300 hover:text-red-200 text-xs font-semibold border border-maroon-800/40 transition"
        >
          <LogOut className="w-3.5 h-3.5" />
          Secure Logout
        </button>
      </div>
    </aside>
  );
}
