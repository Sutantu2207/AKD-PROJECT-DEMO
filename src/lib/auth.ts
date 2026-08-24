import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { AuthUser, UserRole } from '@/types';
import { db } from './db';

const JWT_SECRET = process.env.JWT_SECRET || 'akd_campus_secure_jwt_token_key_super_prod_2026';
const COOKIE_NAME = 'akd_session_token';

export function signToken(user: AuthUser): string {
  return jwt.sign(user, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): AuthUser | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthUser;
  } catch {
    return null;
  }
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;

    const decoded = verifyToken(token);
    if (!decoded) return null;

    // Optional db check to ensure user is active
    const user = await db.user.findUnique({
      where: { id: decoded.id },
      include: {
        adminProfile: true,
        principalProfile: true,
        teacherProfile: true,
        parentProfile: true,
        studentProfile: true,
      },
    });

    if (!user || user.status !== 'ACTIVE') return null;

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role as UserRole,
      phone: user.phone,
      avatarUrl: user.avatarUrl,
      adminProfileId: user.adminProfile?.id,
      principalProfileId: user.principalProfile?.id,
      teacherProfileId: user.teacherProfile?.id,
      parentProfileId: user.parentProfile?.id,
      studentProfileId: user.studentProfile?.id,
    };
  } catch {
    return null;
  }
}

export async function requireAuth(): Promise<AuthUser> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('UNAUTHORIZED');
  }
  return user;
}

export async function requireRole(allowedRoles: UserRole[]): Promise<AuthUser> {
  const user = await requireAuth();
  if (!allowedRoles.includes(user.role)) {
    throw new Error(`FORBIDDEN: Requires role ${allowedRoles.join(' or ')}`);
  }
  return user;
}
