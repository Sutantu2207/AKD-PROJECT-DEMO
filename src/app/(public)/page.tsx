import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import { 
  GraduationCap, Award, Shield, BookOpen, Users, ArrowRight, Sparkles, 
  Calendar, CheckCircle2, ChevronRight, Star, MapPin, Phone, Clock, 
  Flame, Laptop, Trophy, Compass 
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  let statStudents = '1,850+';
  let statFaculty = '112+';
  let statYears = '74';
  let statAchievements = '460+';
  let statPassRate = '99.4%';
  let recentAchievements: any[] = [];
  let upcomingEvents: any[] = [];

  try {
    const settings = await db.siteSetting.findMany();
    const settingsMap: Record<string, string> = {};
    for (const s of settings) {
      settingsMap[s.key] = s.value;
    }
    statStudents = settingsMap['stat_students'] || statStudents;
    statFaculty = settingsMap['stat_faculty'] || statFaculty;
    statYears = settingsMap['stat_years'] || statYears;
    statAchievements = settingsMap['stat_achievements'] || statAchievements;
    statPassRate = settingsMap['stat_pass_rate'] || statPassRate;

    recentAchievements = await db.achievement.findMany({
      where: { isPublic: true },
      take: 3,
      orderBy: { date: 'desc' },
    });

    upcomingEvents = await db.event.findMany({
      where: { isPublished: true },
      take: 3,
      orderBy: { date: 'asc' },
    });
  } catch (error) {
    console.error('Failed to load DB stats, using default static fallbacks:', error);
  }

  // If DB was empty or seeding, fallback to rich defaults
  if (recentAchievements.length === 0) {
    recentAchievements = [
      {
        id: 'ach_1',
        title: 'Tamil Nadu State Talent Search Olympiad — 1st Rank',
        description: 'Secured state-wide 1st rank with distinction in Higher Secondary Science & Mathematics stream.',
        category: 'ACADEMIC',
        date: new Date('2026-01-14'),
      },
      {
        id: 'ach_2',
        title: 'National Children Science Congress (NCSC) Gold Medal',
        description: 'Solar micro-irrigation prototype engineered by AKD Robotics team won national Gold recognition.',
        category: 'SCIENCE_INNOVATION',
        date: new Date('2025-12-05'),
      },
      {
        id: 'ach_3',
        title: 'State Inter-School Athletics Championship — Overall Trophy',
        description: 'AKD athletics contingent captured 14 gold medals across 400m sprint, relay, and high jump.',
        category: 'SPORTS',
        date: new Date('2025-11-20'),
      },
    ];
  }

  if (upcomingEvents.length === 0) {
    upcomingEvents = [
      {
        id: 'ev_1',
        title: 'Annual Science & Innovation Exhibition 2026',
        description: 'Interactive STEM model exhibits, robotics demonstrations, and guest keynote by ISRO scientists.',
        date: new Date('2026-03-15'),
        location: 'Main Science Complex & Auditorium',
        category: 'ACADEMIC',
      },
      {
        id: 'ev_2',
        title: '74th Annual Sports Day & Athletic Meet',
        description: 'Track and field events, 4-House march past, and championship trophy presentation.',
        date: new Date('2026-03-22'),
        location: 'Synthetic Athletic Stadium',
        category: 'SPORTS',
      },
      {
        id: 'ev_3',
        title: 'Parent-Teacher Academic Review (Half-Yearly)',
        description: 'One-on-one progress discussions and digital report card consultation with class tutors.',
        date: new Date('2026-04-02'),
        location: 'Academic Classrooms (Block A & B)',
        category: 'PARENT_TEACHER',
      },
    ];
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative w-full bg-navy-950 text-white overflow-hidden py-24 lg:py-32 border-b border-navy-800">
        {/* Subtle Background Glow Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-400/10 rounded-full blur-3xl pointer-events-none transform translate-x-1/3 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-maroon-900/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          <div className="max-w-3xl space-y-6 animate-fade-in">
            {/* Heritage Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900/90 border border-gold-400/30 text-xs font-semibold text-gold-300 shadow-gold-glow">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>A.K.D. Dharma Raja School • Est. 1952</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] font-serif">
              Where <span className="text-gold-gradient">Tradition</span> Meets Tomorrow.
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
              Empowering students with deep-rooted values, rigorous academic excellence, and the technological confidence to shape a rapidly evolving global future.
            </p>

            {/* Action CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/about"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-gold-500 via-amber-500 to-gold-400 text-navy-950 font-bold text-sm shadow-luxury hover:shadow-gold-glow transition transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                Explore Our School
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/login"
                className="px-6 py-3.5 rounded-xl bg-navy-900/90 hover:bg-navy-800 text-slate-200 hover:text-white border border-navy-700 font-semibold text-sm transition flex items-center gap-2"
              >
                <GraduationCap className="w-4 h-4 text-gold-400" />
                Parent & Student Portal
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-slate-500 text-xs flex flex-col items-center gap-1 opacity-70">
          <span>Scroll to explore</span>
          <div className="w-1 h-3 bg-gold-400/60 rounded-full animate-bounce" />
        </div>
      </section>

      {/* 2. DYNAMIC CMS STATISTICS BAR */}
      <section className="bg-navy-900 text-white py-10 border-b border-navy-800/80 shadow-luxury relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            <div className="p-3 border-r border-navy-800/60 last:border-none">
              <div className="text-3xl sm:text-4xl font-extrabold text-gold-300 font-serif">
                {statStudents}
              </div>
              <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">
                Active Students
              </div>
            </div>

            <div className="p-3 border-r border-navy-800/60 last:border-none">
              <div className="text-3xl sm:text-4xl font-extrabold text-white font-serif">
                {statFaculty}
              </div>
              <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">
                Distinguished Faculty
              </div>
            </div>

            <div className="p-3 border-r border-navy-800/60 last:border-none">
              <div className="text-3xl sm:text-4xl font-extrabold text-gold-300 font-serif">
                {statYears}
              </div>
              <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">
                Years of Heritage
              </div>
            </div>

            <div className="p-3 border-r border-navy-800/60 last:border-none">
              <div className="text-3xl sm:text-4xl font-extrabold text-white font-serif">
                {statAchievements}
              </div>
              <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">
                State & National Awards
              </div>
            </div>

            <div className="p-3 col-span-2 md:col-span-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-gold-300 font-serif">
                {statPassRate}
              </div>
              <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">
                Board Pass Rate
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTRODUCTION & WHY AKD */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-maroon-800 uppercase tracking-widest bg-maroon-50 px-3 py-1 rounded-full border border-maroon-100">
              The AKD Distinction
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-950 mt-3 font-serif">
              An Educational Legacy Built on Discipline, Intellect & Character
            </h2>
            <p className="text-sm text-slate-600 mt-3 leading-relaxed">
              At A.K.D. Dharma Raja School, we harmonize timeless discipline and moral rectitude with futuristic STEM pedagogy, AI literacy, and individualized academic attention.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: BookOpen,
                title: 'Academic Rigor',
                desc: 'Comprehensive CBSE & State curricula structured for conceptual depth, Olympiad readiness, and critical reasoning.',
              },
              {
                icon: Shield,
                title: 'Character & Heritage',
                desc: 'Instilling cultural values, civic duty, integrity, and self-discipline inspired by our founding visionaries.',
              },
              {
                icon: Laptop,
                title: 'Advanced STEM & AI',
                desc: 'State-of-the-art robotics laboratories, computer science studios, and digital research infrastructure.',
              },
              {
                icon: Trophy,
                title: 'Holistic Leadership',
                desc: 'Vibrant houses, competitive athletics, public speaking, arts, and state-level cultural tournaments.',
              },
            ].map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-gold-400/50 hover:bg-white hover:shadow-luxury transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-navy-950 text-gold-400 flex items-center justify-center mb-4 group-hover:scale-110 transition transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-navy-950 mb-2">{pillar.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{pillar.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. ACADEMIC EXCELLENCE TIERS */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <span className="text-xs font-bold text-navy-700 uppercase tracking-widest">
                Curricular Stages
              </span>
              <h2 className="text-3xl font-bold text-navy-950 mt-1 font-serif">
                Comprehensive Learning from Foundation to Mastery
              </h2>
            </div>
            <Link
              href="/academics"
              className="text-xs font-bold text-navy-900 hover:text-gold-600 flex items-center gap-1 transition"
            >
              View Full Academic Framework <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                stage: 'Primary School',
                classes: 'Classes 1 to 5',
                focus: 'Curiosity, Foundational Literacy, Numeracy & Experiential Learning',
              },
              {
                stage: 'Middle School',
                classes: 'Classes 6 to 8',
                focus: 'Analytical Thinking, Science Laboratories, Linguistics & Social Sciences',
              },
              {
                stage: 'Secondary School',
                classes: 'Classes 9 & 10',
                focus: 'Board Exam Preparation, Advanced STEM, Reasoning & Olympiad Track',
              },
              {
                stage: 'Higher Secondary',
                classes: 'Classes 11 & 12',
                focus: 'Specialized Science, Commerce & Humanities with Competitive Exam Prep',
              },
            ].map((tier, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold text-gold-700 bg-gold-50 px-2.5 py-1 rounded-md">
                    {tier.classes}
                  </span>
                  <h3 className="text-lg font-bold text-navy-950 mt-3 mb-2">{tier.stage}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{tier.focus}</p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-navy-900">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-1.5" />
                  Full Department Support
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ACHIEVEMENTS & EVENTS ROW */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Recent Student Achievements */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <span className="text-xs font-bold text-maroon-800 uppercase tracking-wider">
                    Excellence In Action
                  </span>
                  <h3 className="text-2xl font-bold text-navy-950 font-serif">Recent Achievements</h3>
                </div>
                <Link
                  href="/achievements"
                  className="text-xs font-bold text-gold-700 hover:text-gold-900 flex items-center gap-1"
                >
                  Wall of Fame <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-4">
                {recentAchievements.map((ach) => (
                  <div
                    key={ach.id}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-gold-400/50 transition flex items-start gap-3.5"
                  >
                    <div className="w-10 h-10 rounded-lg bg-navy-950 text-gold-400 flex items-center justify-center flex-shrink-0">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-gold-800 bg-gold-100 px-2 py-0.5 rounded">
                        {ach.category}
                      </span>
                      <h4 className="text-sm font-bold text-navy-950 mt-1">{ach.title}</h4>
                      <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{ach.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Upcoming Events Calendar Preview */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <span className="text-xs font-bold text-navy-700 uppercase tracking-wider">
                    Campus Pulse
                  </span>
                  <h3 className="text-2xl font-bold text-navy-950 font-serif">Upcoming Events</h3>
                </div>
                <Link
                  href="/events"
                  className="text-xs font-bold text-navy-900 hover:text-gold-700 flex items-center gap-1"
                >
                  Full Calendar <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-4">
                {upcomingEvents.map((ev) => (
                  <div
                    key={ev.id}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-navy-400 transition flex items-start gap-4"
                  >
                    <div className="w-12 h-12 rounded-lg bg-navy-900 text-white flex flex-col items-center justify-center flex-shrink-0">
                      <span className="text-[10px] font-bold uppercase text-gold-400">
                        {new Date(ev.date).toLocaleString('default', { month: 'short' })}
                      </span>
                      <span className="text-base font-extrabold leading-none">
                        {new Date(ev.date).getDate()}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-navy-800 bg-navy-100 px-2 py-0.5 rounded">
                        {ev.category}
                      </span>
                      <h4 className="text-sm font-bold text-navy-950 mt-1">{ev.title}</h4>
                      <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{ev.description}</p>
                      <div className="mt-2 text-[11px] text-slate-500 flex items-center gap-3">
                        <span>📍 {ev.location || 'Main Auditorium'}</span>
                        <span>⏰ {ev.time || '09:00 AM'}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ADMISSIONS CTA BANNER */}
      <section className="py-16 bg-navy-950 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="max-w-2xl space-y-3 text-center lg:text-left">
            <span className="inline-block text-xs font-bold text-gold-400 bg-navy-900 px-3 py-1 rounded-full border border-gold-400/30 uppercase tracking-widest">
              Admissions Open for 2026-2027
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-serif text-white">
              Give Your Child the Foundation for Lifelong Excellence
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
              Applications are now accepted online. Complete the seamless application process and track your progress through our real-time admissions portal.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/admissions"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-gold-500 to-amber-400 text-navy-950 font-bold text-xs sm:text-sm tracking-wide shadow-luxury hover:shadow-gold-glow transition transform hover:-translate-y-0.5"
            >
              Apply for Admission
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-slate-200 border border-navy-700 text-xs sm:text-sm font-semibold transition"
            >
              Schedule Campus Visit
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
