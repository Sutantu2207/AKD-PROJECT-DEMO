import React from 'react';
import { requireRole } from '@/lib/auth';
import { PortalSidebar } from '@/components/layout/PortalSidebar';
import { PortalHeader } from '@/components/layout/PortalHeader';

export const dynamic = 'force-dynamic';

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireRole(['STUDENT', 'SUPER_ADMIN', 'ADMIN']);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <PortalSidebar user={user} />
      <div className="flex-1 flex flex-col min-w-0">
        <PortalHeader user={user} />
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
