import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'AKD DIGITAL CAMPUS | A.K.D. Dharma Raja School',
  description:
    'Unified School Website, Student Information System, Parent Portal, Teacher Portal & Academic Intelligence Platform for A.K.D. Dharma Raja School.',
  keywords: [
    'AKD Dharma Raja School',
    'AKD Digital Campus',
    'School Portal',
    'Student Information System',
    'Academic Intelligence',
    'Parent Portal',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col">
        {children}
      </body>
    </html>
  );
}
