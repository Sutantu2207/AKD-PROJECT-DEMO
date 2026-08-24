import React from 'react';
import { redirect } from 'next/navigation';
import { requireRole } from '@/lib/auth';
import { getParentDashboard } from '@/services/parentService';
import { PortalSidebar } from '@/components/layout/PortalSidebar';
import { PortalHeader } from '@/components/layout/PortalHeader';

export const dynamic = 'force-dynamic';

export default async function ParentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireRole(['PARENT', 'SUPER_ADMIN', 'ADMIN']);
  const dashboardData = await getParentDashboard(user.id);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <PortalSidebar user={user} />
      <div className="flex-1 flex flex-col min-w-0">
        <PortalHeader
          user={user}
          childrenList={dashboardData.children}
          activeChildId={dashboardData.activeChild?.studentId}
        />
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
