import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';

export default async function PortalDispatcher() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  switch (user.role) {
    case 'PARENT':
      redirect('/parent');
    case 'STUDENT':
      redirect('/student');
    case 'TEACHER':
      redirect('/teacher');
    case 'PRINCIPAL':
      redirect('/principal');
    case 'SUPER_ADMIN':
    case 'ADMIN':
    default:
      redirect('/admin');
  }
}
