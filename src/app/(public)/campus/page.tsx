import React from 'react';
import Link from 'next/link';
import { MapPin, Sun, Shield, Sparkles, Building2, Trees, Droplet, ArrowRight } from 'lucide-react';

export default function CampusPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-16 text-center">
        <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Eco-Friendly Educational Sanctuary
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold text-navy-950 mt-3 font-serif">
          Our 22-Acre Serene Green Campus
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl mx-auto mt-3 leading-relaxed">
          Situated at the foothills of the Western Ghats in Rajapalayam, our campus harmonizes heritage architecture with modern sustainable infrastructure.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12 mb-16">
        {/* Campus Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-luxury">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
              <Sun className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-navy-950 mb-2">100% Solar-Powered Campus</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our 180 kW rooftop solar grid provides clean renewable energy powering all academic blocks, computer laboratories, and lighting across campus.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-luxury">
            <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center mb-4">
              <Droplet className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-navy-950 mb-2">Rainwater & Water Neutrality</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Extensive rainwater harvesting percolation ponds and on-site multi-stage filtration water plants ensure 100% pure mineral-rich drinking water.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-luxury">
            <div className="w-12 h-12 rounded-xl bg-navy-50 text-navy-800 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-navy-950 mb-2">24/7 Monitored Safe Zone</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Over 180 high-definition CCTV security cameras, biometric access controls, and trained security personnel ensure total safety and peace of mind.
            </p>
          </div>
        </div>

        {/* 360 Virtual Campus Tour Teaser */}
        <div className="p-8 sm:p-12 rounded-2xl bg-navy-950 text-white shadow-luxury text-center space-y-4">
          <span className="text-xs font-bold text-gold-400 uppercase tracking-widest bg-navy-900 px-3 py-1 rounded-full border border-gold-400/30">
            Interactive Campus Tour
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white">
            Experience the AKD Campus in Person
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            We welcome prospective parents and students for guided walk-throughs of our science research labs, digital libraries, and sports arena.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-gold-500 to-amber-400 text-navy-950 font-bold text-xs tracking-wide shadow-luxury hover:shadow-gold-glow transition"
            >
              Book Campus Visit Tour <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
