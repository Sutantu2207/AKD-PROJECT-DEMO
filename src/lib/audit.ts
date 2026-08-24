import { db } from './db';
import { AuthUser } from '@/types';

export interface AuditLogParams {
  user?: AuthUser | null;
  action: string;
  entityType: string;
  entityId: string;
  oldValue?: any;
  newValue?: any;
  reason?: string;
  ipAddress?: string;
}

export async function logAuditEvent(params: AuditLogParams) {
  try {
    await db.auditLog.create({
      data: {
        userId: params.user?.id || null,
        userRole: params.user?.role || 'SYSTEM',
        action: params.action,
        entityType: params.entityType,
        entityId: params.entityId,
        oldValue: params.oldValue ? JSON.stringify(params.oldValue) : null,
        newValue: params.newValue ? JSON.stringify(params.newValue) : null,
        reason: params.reason || null,
        ipAddress: params.ipAddress || '127.0.0.1',
      },
    });
  } catch (err) {
    console.error('Failed to write audit log:', err);
  }
}
