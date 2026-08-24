import React from 'react';
import { db } from '@/lib/db';
import { Image as ImageIcon, Video, Camera } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function GalleryPage() {
  const galleryItems = await db.galleryItem.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-12 text-center">
        <span className="text-xs font-bold text-gold-700 uppercase tracking-widest bg-gold-50 px-3 py-1 rounded-full border border-gold-200">
          Visual Chronicle
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold text-navy-950 mt-3 font-serif">
          Campus, Laboratories & Event Gallery
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl mx-auto mt-3 leading-relaxed">
          Moments of discovery, artistic expression, and athletic triumph captured across our campus.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-luxury group hover:shadow-gold-glow transition-all"
            >
              {/* Media Container Placeholder / Image */}
              <div className="h-52 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 flex flex-col items-center justify-center text-white relative p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-gold-400/20 text-gold-400 flex items-center justify-center mb-2 group-hover:scale-110 transition transform">
                  {item.mediaType === 'VIDEO' ? <Video className="w-6 h-6" /> : <Camera className="w-6 h-6" />}
                </div>
                <span className="text-[11px] uppercase font-bold text-gold-400 tracking-wider">
                  {item.category}
                </span>
                <h4 className="text-sm font-bold text-white mt-1 px-4 leading-snug">
                  {item.title}
                </h4>
              </div>

              {/* Caption Box */}
              <div className="p-4 bg-white text-xs text-slate-600 leading-relaxed">
                {item.caption || 'State-of-the-art campus learning environment.'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
