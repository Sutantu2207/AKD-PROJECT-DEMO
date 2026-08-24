import React from 'react';
import Link from 'next/link';
import { 
  Shield, Phone, Mail, MapPin, Award, BookOpen, Clock, Heart, 
  ExternalLink, ChevronRight 
} from 'lucide-react';

export function PublicFooter() {
  return (
    <footer className="bg-navy-950 text-slate-300 border-t border-navy-800/80 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-navy-800/80">
          {/* Col 1: School Heritage & Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold-400 to-amber-600 p-0.5 shadow-gold-glow flex items-center justify-center">
                <div className="w-full h-full bg-navy-950 rounded-[7px] flex items-center justify-center text-gold-400 font-serif font-bold text-lg">
                  AKD
                </div>
              </div>
              <div>
                <h3 className="text-white font-bold text-base leading-tight">
                  A.K.D. DHARMA RAJA
                </h3>
                <p className="text-xs text-gold-400 font-medium tracking-widest uppercase">
                  Digital Campus
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Founded in 1952, A.K.D. Dharma Raja School is dedicated to fostering academic excellence, holistic character, and leadership rooted in traditional values and modern scientific acumen.
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy-900 border border-gold-400/20 text-xs text-gold-300">
                <Award className="w-3.5 h-3.5 text-gold-400" />
                CBSE & State Board Affiliated • 74 Years of Legacy
              </div>
            </div>
          </div>

          {/* Col 2: Institutional Navigation */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wide uppercase mb-4 text-gold-400 flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> Quick Explore
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { name: 'About & School History', href: '/about' },
                { name: 'Academic Curricula', href: '/academics' },
                { name: 'Campus & Infrastructure', href: '/campus' },
                { name: 'Specialized Facilities', href: '/facilities' },
                { name: 'Student Life & Houses', href: '/student-life' },
                { name: 'Interactive Achievement Wall', href: '/achievements' },
                { name: 'Upcoming Events Calendar', href: '/events' },
                { name: 'Masonry Photo Gallery', href: '/gallery' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-gold-300 transition-colors flex items-center gap-1.5 text-slate-400"
                  >
                    <ChevronRight className="w-3 h-3 text-gold-500/70" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Portals & Admissions */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wide uppercase mb-4 text-gold-400 flex items-center gap-2">
              <Shield className="w-4 h-4" /> Portals & Admissions
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { name: 'Admissions 2026-27 Guidelines', href: '/admissions' },
                { name: 'Online Application Tracking', href: '/admissions' },
                { name: 'Parent Academic Portal', href: '/login' },
                { name: 'Student Learning Workspace', href: '/login' },
                { name: 'Teacher Classroom Suite', href: '/login' },
                { name: 'Principal & Admin Dashboard', href: '/login' },
                { name: 'Alumni Network & Stories', href: '/alumni' },
                { name: 'Frequently Asked Questions', href: '/faq' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-gold-300 transition-colors flex items-center gap-1.5 text-slate-400"
                  >
                    <ChevronRight className="w-3 h-3 text-gold-500/70" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Campus Contact & Visiting Hours */}
          <div className="space-y-3 text-xs">
            <h4 className="text-white font-bold text-sm tracking-wide uppercase mb-4 text-gold-400 flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Contact Campus
            </h4>
            <p className="text-slate-400 flex items-start gap-2">
              <MapPin className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
              <span>A.K.D. Dharma Raja School Road, P.A.C.R. Nagar, Rajapalayam – 626 117, Tamil Nadu, India.</span>
            </p>
            <p className="text-slate-400 flex items-center gap-2">
              <Phone className="w-4 h-4 text-gold-400 flex-shrink-0" />
              <span>General: +91 4563 220 412 / 221 890</span>
            </p>
            <p className="text-slate-400 flex items-center gap-2">
              <Mail className="w-4 h-4 text-gold-400 flex-shrink-0" />
              <span>info@akdschool.edu.in</span>
            </p>
            <p className="text-slate-400 flex items-center gap-2">
              <Clock className="w-4 h-4 text-gold-400 flex-shrink-0" />
              <span>Mon – Sat: 8:30 AM – 4:45 PM</span>
            </p>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} A.K.D. Dharma Raja School. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-slate-400 font-medium">AKD DIGITAL CAMPUS v2.6.0</span>
            <span>•</span>
            <span className="text-gold-400/90 font-medium">Tradition. Education. Excellence. Digital.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
