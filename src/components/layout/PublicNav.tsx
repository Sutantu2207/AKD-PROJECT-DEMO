'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, X, GraduationCap, Shield, ChevronRight, Phone, Mail, Award, BookOpen, User, Sparkles
} from 'lucide-react';

export function PublicNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Academics', href: '/academics' },
    { name: 'Campus', href: '/campus' },
    { name: 'Facilities', href: '/facilities' },
    { name: 'Student Life', href: '/student-life' },
    { name: 'Achievements', href: '/achievements' },
    { name: 'Events', href: '/events' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Admissions', href: '/admissions' },
    { name: 'Alumni', href: '/alumni' },
    { name: 'Contact', href: '/contact' },
    { name: 'FAQ', href: '/faq' },
  ];

  return (
    <header className="w-full z-50 sticky top-0 transition-all duration-300">
      {/* Top Heritage Bar */}
      <div className="bg-navy-950 text-slate-300 text-xs py-1.5 px-4 sm:px-8 border-b border-navy-800/80">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-gold-400 font-medium">
              <Shield className="w-3.5 h-3.5 text-gold-400" />
              Est. 1952 • Legacy of Excellence
            </span>
            <span className="hidden md:inline-block text-slate-500">•</span>
            <span className="hidden md:flex items-center gap-1 text-slate-300">
              <Phone className="w-3 h-3 text-gold-400" />
              +91 4563 220 412
            </span>
            <span className="hidden lg:flex items-center gap-1 text-slate-300">
              <Mail className="w-3 h-3 text-gold-400" />
              admissions@akdschool.edu.in
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admissions"
              className="text-amber-300 hover:text-amber-200 font-semibold flex items-center gap-1 transition"
            >
              <Sparkles className="w-3 h-3 text-amber-300" />
              Admissions 2026-27 Open
            </Link>
            <span className="text-slate-600">|</span>
            <Link
              href="/login"
              className="text-slate-200 hover:text-gold-300 font-medium flex items-center gap-1 transition"
            >
              <User className="w-3 h-3 text-gold-400" />
              Portal Login
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-navy-900/95 backdrop-blur-md shadow-luxury py-2.5 border-b border-navy-800'
            : 'bg-navy-900 py-3.5 border-b border-navy-800/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex justify-between items-center">
          {/* Logo & School Name */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold-400 to-amber-600 p-0.5 shadow-gold-glow flex items-center justify-center">
              <div className="w-full h-full bg-navy-950 rounded-[7px] flex items-center justify-center text-gold-400 font-serif font-bold text-lg">
                AKD
              </div>
            </div>
            <div>
              <div className="text-white font-bold text-base sm:text-lg tracking-tight leading-tight group-hover:text-gold-300 transition">
                A.K.D. DHARMA RAJA
              </div>
              <div className="text-[10px] sm:text-xs text-gold-400/90 font-medium tracking-widest uppercase">
                Digital Campus
              </div>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden xl:flex items-center gap-1 text-sm font-medium">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-md transition-all duration-200 ${
                    active
                      ? 'text-gold-300 bg-navy-800/90 font-semibold'
                      : 'text-slate-200 hover:text-white hover:bg-navy-800/50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-2.5">
            <Link
              href="/login"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-gold-500 via-amber-500 to-gold-400 text-navy-950 font-bold text-xs tracking-wide shadow-md hover:shadow-gold-glow transition transform hover:-translate-y-0.5 flex items-center gap-1.5"
            >
              <GraduationCap className="w-4 h-4" />
              PORTAL LOGIN
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg bg-navy-800 text-slate-200 hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-gold-400" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-navy-950/98 backdrop-blur-xl border-b border-navy-800 px-6 py-5 transition-all animate-slide-up">
            <div className="grid grid-cols-2 gap-2 mb-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-md text-sm font-medium flex items-center justify-between ${
                    pathname === link.href
                      ? 'bg-navy-800 text-gold-300 font-semibold'
                      : 'text-slate-300 hover:bg-navy-800/60 hover:text-white'
                  }`}
                >
                  {link.name}
                  <ChevronRight className="w-3.5 h-3.5 text-navy-600" />
                </Link>
              ))}
            </div>

            <div className="pt-3 border-t border-navy-800 flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-lg bg-gradient-to-r from-gold-500 to-amber-400 text-navy-950 font-bold text-center text-sm shadow-md"
              >
                Enter Digital Campus (Login)
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
