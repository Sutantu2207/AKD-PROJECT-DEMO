import { AcademicGradeRule } from '@/types';

export const DEFAULT_GRADE_RULES: AcademicGradeRule[] = [
  { min: 90, max: 100, grade: 'A+', gpa: 4.0, description: 'Outstanding Academic Performance' },
  { min: 80, max: 89.9, grade: 'A', gpa: 3.7, description: 'Excellent Comprehension & Mastery' },
  { min: 70, max: 79.9, grade: 'B+', gpa: 3.3, description: 'Commendable Academic Progress' },
  { min: 60, max: 69.9, grade: 'B', gpa: 3.0, description: 'Good Understanding of Fundamentals' },
  { min: 50, max: 59.9, grade: 'C', gpa: 2.5, description: 'Average Performance - Scope for Growth' },
  { min: 35, max: 49.9, grade: 'D', gpa: 2.0, description: 'Needs Targeted Academic Support' },
  { min: 0, max: 34.9, grade: 'F', gpa: 0.0, description: 'Remedial Attention Required' },
];

export function calculateGrade(percentage: number, customRules?: AcademicGradeRule[]): { grade: string; gpa: number; description: string } {
  const rules = customRules && customRules.length > 0 ? customRules : DEFAULT_GRADE_RULES;
  const clamped = Math.max(0, Math.min(100, percentage));

  for (const rule of rules) {
    if (clamped >= rule.min && clamped <= rule.max + 0.01) {
      return { grade: rule.grade, gpa: rule.gpa, description: rule.description };
    }
  }

  return { grade: 'F', gpa: 0.0, description: 'Remedial Attention Required' };
}

export function getStatusBadge(
  percentage: number,
  delta?: number,
  classAverage?: number
): 'Strong' | 'Improving' | 'Stable' | 'Needs Attention' {
  if (percentage < 50 || (delta !== undefined && delta <= -7)) {
    return 'Needs Attention';
  }
  if (delta !== undefined && delta >= 4) {
    return 'Improving';
  }
  if (percentage >= 85) {
    return 'Strong';
  }
  return 'Stable';
}
