import React from 'react';
import Link from 'next/link';
import { requireRole } from '@/lib/auth';
import { getParentDashboard } from '@/services/parentService';
import { Bell, ArrowRight, CheckCircle2, Award, BookOpen } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ParentNotificationsPage({
  searchParams,
}: {
  searchParams: Promise<{ childId?: string }>;
}) {
  const { childId } = await searchParams;
  const user = await requireRole(['PARENT', 'SUPER_ADMIN', 'ADMIN']);
  const data = await getParentDashboard(user.id, childId);

  if (!data) return <div className="p-8 text-center">No notifications.</div>;

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Campus Circulars & Alerts
        </span>
        <h1 className="text-2xl font-bold text-navy-950 font-serif">
          Notification Center
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Official academic mark publications, circulars, and teacher communications.
        </p>
      </div>

      <div className="space-y-3">
        {(data.notifications || []).map((n) => (
          <div
            key={n.id}
            className={`p-5 rounded-2xl border transition flex items-start gap-4 ${
              n.isRead
                ? 'bg-white border-slate-200'
                : 'bg-gold-50/40 border-gold-300 shadow-sm'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-navy-950 text-gold-400 flex items-center justify-center flex-shrink-0 shadow-sm">
              <Bell className="w-5 h-5" />
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex justify-between items-start">
                <h3 className="text-sm font-bold text-navy-950">{n.title}</h3>
                <span className="text-[10px] text-slate-400">{n.createdAt}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{n.message}</p>

              {n.link && (
                <div className="pt-2">
                  <Link
                    href={n.link}
                    className="inline-flex items-center gap-1 text-xs font-bold text-gold-700 hover:text-gold-900"
                  >
                    Open Relevant Portal Module <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
