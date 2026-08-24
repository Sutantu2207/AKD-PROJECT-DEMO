export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'PRINCIPAL' | 'TEACHER' | 'PARENT' | 'STUDENT';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string | null;
  avatarUrl?: string | null;
  studentProfileId?: string;
  parentProfileId?: string;
  teacherProfileId?: string;
  adminProfileId?: string;
  principalProfileId?: string;
}

export type TrendStatus = 'IMPROVING' | 'STABLE' | 'DECLINING' | 'INSUFFICIENT_DATA';

export interface AcademicGradeRule {
  min: number;
  max: number;
  grade: string;
  gpa: number;
  description: string;
}

export interface SubjectPerformance {
  subjectId: string;
  subjectName: string;
  subjectCode: string;
  latestScore: number;
  maxMarks: number;
  percentage: number;
  grade: string;
  previousScore?: number;
  changeDelta?: number;
  trend: TrendStatus;
  classAverage: number;
  schoolAverage?: number;
  teacherName?: string;
  statusBadge: 'Strong' | 'Improving' | 'Stable' | 'Needs Attention';
}

export interface ChildSummary {
  studentId: string;
  studentName: string;
  rollNo: string;
  admissionNo: string;
  className: string;
  sectionName: string;
  gradeLevel: number;
  avatarUrl?: string | null;
  attendancePercentage: number;
  overallPercentage: number;
  trend: TrendStatus;
}

export interface AssignmentItem {
  id: string;
  title: string;
  subjectName: string;
  teacherName: string;
  dueDate: string;
  maxMarks: number;
  description: string;
  status: 'PENDING' | 'SUBMITTED' | 'GRADED' | 'OVERDUE';
  marksObtained?: number;
  feedback?: string;
  submissionDate?: string;
}

export interface AcademicAlertItem {
  id: string;
  studentName: string;
  rollNo: string;
  className: string;
  type: 'SCORE_DECLINE' | 'LOW_ATTENDANCE' | 'MISSED_ASSIGNMENTS' | 'LOW_ASSESSMENT_SCORE';
  message: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  createdAt: string;
}
