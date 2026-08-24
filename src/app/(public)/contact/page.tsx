'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Admissions Inquiry',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-16 text-center">
        <span className="text-xs font-bold text-navy-800 uppercase tracking-widest bg-navy-100 px-3 py-1 rounded-full border border-navy-200">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold text-navy-950 mt-3 font-serif">
          Campus Directory & Inquiry
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl mx-auto mt-3 leading-relaxed">
          We welcome inquiries from prospective parents, alumni, and educational partners.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Contact Info Directory */}
        <div className="space-y-6">
          <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-luxury space-y-6">
            <h2 className="text-xl font-bold text-navy-950 font-serif">Main Administrative Office</h2>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-navy-950">Campus Address</strong>
                  A.K.D. Dharma Raja School Road, P.A.C.R. Nagar, Rajapalayam – 626 117, Virudhunagar District, Tamil Nadu, India.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gold-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-navy-950">Phone Numbers</strong>
                  Admissions Helpline: +91 4563 220 412<br />
                  Principal&apos;s Secretariat: +91 4563 221 890
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gold-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-navy-950">Email Directories</strong>
                  Admissions: admissions@akdschool.edu.in<br />
                  General Secretariat: info@akdschool.edu.in
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-gold-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-navy-950">Office & Visiting Hours</strong>
                  Monday through Saturday: 08:30 AM – 04:45 PM<br />
                  Parent-Teacher Interaction: Prior appointment recommended.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Interactive Inquiry Form */}
        <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-luxury">
          <h2 className="text-xl font-bold text-navy-950 font-serif mb-2">Send Campus Message</h2>
          <p className="text-xs text-slate-500 mb-6">Our admissions secretariat will respond within 24 business hours.</p>

          {submitted ? (
            <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 animate-slide-up text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <h3 className="font-bold text-sm">Message Transmitted Successfully</h3>
              <p className="text-xs text-emerald-700">Thank you for reaching out. Our administration has logged your inquiry.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-navy-950 uppercase mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter full name"
                  className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-navy-900 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-navy-950 uppercase mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@example.com"
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-navy-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-navy-950 uppercase mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-navy-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-950 uppercase mb-1">Subject</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-navy-900 focus:outline-none"
                >
                  <option value="Admissions Inquiry">Admissions 2026-27 Inquiry</option>
                  <option value="Campus Tour Booking">Campus Tour Booking</option>
                  <option value="Academic Verification">Academic Verification</option>
                  <option value="Alumni Relation">Alumni Relation</option>
                  <option value="General Query">General Query</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-950 uppercase mb-1">Message *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we assist you?"
                  className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-navy-900 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-navy-950 hover:bg-navy-900 text-gold-300 font-bold text-xs tracking-wide shadow-md transition flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
