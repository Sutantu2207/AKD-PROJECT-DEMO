import React from 'react';
import { db } from '@/lib/db';
import { Calendar, MapPin, Clock, Tag } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function EventsPage() {
  let events: any[] = [];
  try {
    events = await db.event.findMany({
      where: { isPublished: true },
      orderBy: { date: 'asc' },
    });
  } catch (err) {
    console.error('Failed to query events:', err);
  }

  if (events.length === 0) {
    events = [
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
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-12 text-center">
        <span className="text-xs font-bold text-navy-800 uppercase tracking-widest bg-navy-100 px-3 py-1 rounded-full border border-navy-200">
          Campus Calendar
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold text-navy-950 mt-3 font-serif">
          Upcoming Events & Academic Symposia
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl mx-auto mt-3 leading-relaxed">
          Stay informed about inter-school tournaments, science exhibitions, parent-teacher interactions, and cultural galas.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 space-y-6">
        {events.map((ev) => (
          <div
            key={ev.id}
            className="p-6 rounded-2xl bg-white border border-slate-200 shadow-luxury hover:border-navy-400 transition-all flex flex-col md:flex-row items-start gap-6"
          >
            {/* Date Badge */}
            <div className="w-20 h-20 rounded-xl bg-navy-950 text-white flex flex-col items-center justify-center flex-shrink-0 shadow-md">
              <span className="text-xs font-bold uppercase text-gold-400 tracking-wider">
                {new Date(ev.date).toLocaleString('default', { month: 'short' })}
              </span>
              <span className="text-2xl font-extrabold leading-none mt-1">
                {new Date(ev.date).getDate()}
              </span>
              <span className="text-[10px] text-slate-400 mt-0.5">
                {new Date(ev.date).getFullYear()}
              </span>
            </div>

            {/* Event Content */}
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-navy-800 bg-navy-100 px-2.5 py-0.5 rounded uppercase">
                  {ev.category}
                </span>
              </div>
              <h3 className="text-lg font-bold text-navy-950">{ev.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{ev.description}</p>
              
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-gold-600" />
                  {ev.time || '09:00 AM - 04:30 PM'}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-gold-600" />
                  {ev.location || 'Central Campus Auditorium'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
