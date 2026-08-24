import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { signToken } from '@/lib/auth';
import { AuthUser, UserRole } from '@/types';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const user = await db.user.findUnique({
      where: { email: email.toLowerCase().trim() },
      include: {
        adminProfile: true,
        principalProfile: true,
        teacherProfile: true,
        parentProfile: true,
        studentProfile: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const passwordValid = await bcrypt.compare(password, user.passwordHash);
    if (!passwordValid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    if (user.status !== 'ACTIVE') {
      return NextResponse.json({ error: 'Account is deactivated. Contact administration.' }, { status: 403 });
    }

    // Update lastLoginAt
    await db.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    const authUser: AuthUser = {
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

    const token = signToken(authUser);

    const res = NextResponse.json({
      success: true,
      user: authUser,
      redirectUrl: getRedirectUrlForRole(user.role as UserRole),
    });

    // Set secure HTTP-only session cookie
    res.cookies.set('akd_session_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return res;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server authentication error' }, { status: 500 });
  }
}

function getRedirectUrlForRole(role: UserRole): string {
  switch (role) {
    case 'PARENT':
      return '/parent';
    case 'STUDENT':
      return '/student';
    case 'TEACHER':
      return '/teacher';
    case 'PRINCIPAL':
      return '/principal';
    case 'SUPER_ADMIN':
    case 'ADMIN':
    default:
      return '/admin';
  }
}
