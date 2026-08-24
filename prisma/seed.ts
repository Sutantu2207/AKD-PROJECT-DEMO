import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting AKD DIGITAL CAMPUS database seeding...');

  // Clean existing tables in reverse relational order
  await prisma.auditLog.deleteMany();
  await prisma.aIInsight.deleteMany();
  await prisma.reportCard.deleteMany();
  await prisma.admissionDocument.deleteMany();
  await prisma.admissionApplication.deleteMany();
  await prisma.galleryItem.deleteMany();
  await prisma.event.deleteMany();
  await prisma.achievement.deleteMany();
  await prisma.academicAlert.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.announcement.deleteMany();
  await prisma.teacherRemark.deleteMany();
  await prisma.studyMaterial.deleteMany();
  await prisma.assignmentSubmission.deleteMany();
  await prisma.assignment.deleteMany();
  await prisma.attendance.deleteMany();
  await prisma.markCorrectionRequest.deleteMany();
  await prisma.mark.deleteMany();
  await prisma.assessment.deleteMany();
  await prisma.exam.deleteMany();
  await prisma.studentEnrollment.deleteMany();
  await prisma.teacherAssignment.deleteMany();
  await prisma.subject.deleteMany();
  await prisma.section.deleteMany();
  await prisma.class.deleteMany();
  await prisma.academicYear.deleteMany();
  await prisma.parentStudent.deleteMany();
  await prisma.studentProfile.deleteMany();
  await prisma.parentProfile.deleteMany();
  await prisma.teacherProfile.deleteMany();
  await prisma.principalProfile.deleteMany();
  await prisma.adminProfile.deleteMany();
  await prisma.user.deleteMany();
  await prisma.siteSetting.deleteMany();

  // ----------------------------------------------------
  // 1. SITE SETTINGS (CMS & STATS)
  // ----------------------------------------------------
  console.log('⚙️  Creating Site Settings & CMS data...');
  const siteSettings = [
    { key: 'school_name', value: 'A.K.D. Dharma Raja School', category: 'GENERAL' },
    { key: 'school_tagline', value: 'Tradition. Education. Excellence. Digital.', category: 'GENERAL' },
    { key: 'school_established', value: '1952', category: 'GENERAL' },
    { key: 'stat_students', value: '1850', category: 'STATS' },
    { key: 'stat_faculty', value: '112', category: 'STATS' },
    { key: 'stat_years', value: '74', category: 'STATS' },
    { key: 'stat_achievements', value: '460', category: 'STATS' },
    { key: 'stat_pass_rate', value: '99.4', category: 'STATS' },
    { key: 'admission_status', value: 'OPEN', category: 'CMS' },
    { key: 'admission_year', value: '2026-2027', category: 'CMS' },
    { key: 'grading_rules', value: JSON.stringify([
      { min: 90, max: 100, grade: 'A+', gpa: 4.0, description: 'Outstanding Academic Performance' },
      { min: 80, max: 89.9, grade: 'A', gpa: 3.7, description: 'Excellent Comprehension & Mastery' },
      { min: 70, max: 79.9, grade: 'B+', gpa: 3.3, description: 'Commendable Academic Progress' },
      { min: 60, max: 69.9, grade: 'B', gpa: 3.0, description: 'Good Understanding of Fundamentals' },
      { min: 50, max: 59.9, grade: 'C', gpa: 2.5, description: 'Average Performance - Scope for Growth' },
      { min: 35, max: 49.9, grade: 'D', gpa: 2.0, description: 'Needs Targeted Academic Support' },
      { min: 0, max: 34.9, grade: 'F', gpa: 0.0, description: 'Unsatisfactory - Remedial Attention Required' }
    ]), category: 'GRADING' }
  ];

  for (const s of siteSettings) {
    await prisma.siteSetting.create({ data: s });
  }

  // ----------------------------------------------------
  // 2. ACADEMIC YEARS
  // ----------------------------------------------------
  console.log('📅 Creating Academic Years...');
  const yearPrev = await prisma.academicYear.create({
    data: {
      name: '2024-2025',
      startDate: new Date('2024-06-01'),
      endDate: new Date('2025-04-30'),
      isCurrent: false,
    },
  });

  const yearCurr = await prisma.academicYear.create({
    data: {
      name: '2025-2026',
      startDate: new Date('2025-06-01'),
      endDate: new Date('2026-04-30'),
      isCurrent: true,
    },
  });

  // ----------------------------------------------------
  // 3. CLASSES & SECTIONS
  // ----------------------------------------------------
  console.log('🏫 Creating Classes, Sections & Subjects...');
  const class8 = await prisma.class.create({ data: { gradeLevel: 8, name: 'Class 8' } });
  const class9 = await prisma.class.create({ data: { gradeLevel: 9, name: 'Class 9' } });
  const class10 = await prisma.class.create({ data: { gradeLevel: 10, name: 'Class 10' } });

  // Sections
  const sec8A = await prisma.section.create({ data: { name: 'A', classId: class8.id } });
  const sec8B = await prisma.section.create({ data: { name: 'B', classId: class8.id } });
  const sec9A = await prisma.section.create({ data: { name: 'A', classId: class9.id } });
  const sec10A = await prisma.section.create({ data: { name: 'A', classId: class10.id } });
  const sec10B = await prisma.section.create({ data: { name: 'B', classId: class10.id } });

  // Subjects for each Class
  const subjectDefs = [
    { name: 'Mathematics', code: 'MATH' },
    { name: 'Science', code: 'SCI' },
    { name: 'English', code: 'ENG' },
    { name: 'Social Science', code: 'SOC' },
    { name: 'Tamil', code: 'TAM' },
    { name: 'Computer Science', code: 'CS' },
  ];

  const subjects8: Record<string, any> = {};
  const subjects9: Record<string, any> = {};
  const subjects10: Record<string, any> = {};

  for (const s of subjectDefs) {
    subjects8[s.code] = await prisma.subject.create({
      data: { name: s.name, code: `${s.code}-08`, classId: class8.id },
    });
    subjects9[s.code] = await prisma.subject.create({
      data: { name: s.name, code: `${s.code}-09`, classId: class9.id },
    });
    subjects10[s.code] = await prisma.subject.create({
      data: { name: s.name, code: `${s.code}-10`, classId: class10.id },
    });
  }

  // ----------------------------------------------------
  // 4. USERS & PROFILES (ADMIN, PRINCIPAL, TEACHERS, PARENTS, STUDENTS)
  // ----------------------------------------------------
  console.log('👥 Creating Users, Roles and Profiles...');
  const commonPassword = await bcrypt.hash('akdDemo2026!', 10);
  const adminPassword = await bcrypt.hash('akdAdmin2026!', 10);
  const principalPassword = await bcrypt.hash('akdPrincipal2026!', 10);
  const teacherPassword = await bcrypt.hash('akdTeacher2026!', 10);
  const parentPassword = await bcrypt.hash('akdParent2026!', 10);
  const studentPassword = await bcrypt.hash('akdStudent2026!', 10);

  // Super Admin
  const superAdminUser = await prisma.user.create({
    data: {
      email: 'superadmin@akddemo.local',
      passwordHash: adminPassword,
      role: 'SUPER_ADMIN',
      name: 'Dr. R. Ramanathan',
      phone: '+91 94433 10001',
      adminProfile: {
        create: { designation: 'Chief Technology Director', permissions: 'ALL' },
      },
    },
  });

  // Admin
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@akddemo.local',
      passwordHash: adminPassword,
      role: 'ADMIN',
      name: 'Dr. K. Sundararajan',
      phone: '+91 94433 10002',
      adminProfile: {
        create: { designation: 'Administrative Dean', permissions: 'ALL' },
      },
    },
  });

  // Principal
  const principalUser = await prisma.user.create({
    data: {
      email: 'principal@akddemo.local',
      passwordHash: principalPassword,
      role: 'PRINCIPAL',
      name: 'Prof. S. Meenakshi Sundaram',
      phone: '+91 94433 10003',
      principalProfile: {
        create: {
          designation: 'Principal & Academic Head',
          bio: 'Leading A.K.D. Dharma Raja School with 28+ years of dedicated educational leadership and academic excellence.',
        },
      },
    },
  });

  // Teachers
  const teacherPriyaUser = await prisma.user.create({
    data: {
      email: 'teacher.priya@akddemo.local',
      passwordHash: teacherPassword,
      role: 'TEACHER',
      name: 'Mrs. Priya Subramanian',
      phone: '+91 98421 20001',
      teacherProfile: {
        create: {
          employeeId: 'AKD-T-0101',
          qualification: 'M.Sc., M.Ed. (Mathematics)',
          department: 'Mathematics',
          joiningDate: new Date('2016-06-15'),
        },
      },
    },
    include: { teacherProfile: true },
  });

  const teacherRajeshUser = await prisma.user.create({
    data: {
      email: 'teacher.rajesh@akddemo.local',
      passwordHash: teacherPassword,
      role: 'TEACHER',
      name: 'Mr. Rajesh Kannan',
      phone: '+91 98421 20002',
      teacherProfile: {
        create: {
          employeeId: 'AKD-T-0102',
          qualification: 'M.Sc., B.Ed. (Physics)',
          department: 'Science',
          joiningDate: new Date('2018-05-10'),
        },
      },
    },
    include: { teacherProfile: true },
  });

  const teacherAnithaUser = await prisma.user.create({
    data: {
      email: 'teacher.anitha@akddemo.local',
      passwordHash: teacherPassword,
      role: 'TEACHER',
      name: 'Mrs. Anitha Balaji',
      phone: '+91 98421 20003',
      teacherProfile: {
        create: {
          employeeId: 'AKD-T-0103',
          qualification: 'M.A., M.Phil. (English)',
          department: 'English',
          joiningDate: new Date('2015-07-01'),
        },
      },
    },
    include: { teacherProfile: true },
  });

  const teacherMuruganUser = await prisma.user.create({
    data: {
      email: 'teacher.murugan@akddemo.local',
      passwordHash: teacherPassword,
      role: 'TEACHER',
      name: 'Mr. V. Murugan',
      phone: '+91 98421 20004',
      teacherProfile: {
        create: {
          employeeId: 'AKD-T-0104',
          qualification: 'M.A., B.Ed. (History)',
          department: 'Social Science',
          joiningDate: new Date('2014-06-01'),
        },
      },
    },
    include: { teacherProfile: true },
  });

  const teacherDivyaUser = await prisma.user.create({
    data: {
      email: 'teacher.divya@akddemo.local',
      passwordHash: teacherPassword,
      role: 'TEACHER',
      name: 'Ms. Divya Ramachandran',
      phone: '+91 98421 20005',
      teacherProfile: {
        create: {
          employeeId: 'AKD-T-0105',
          qualification: 'M.C.A., B.Ed.',
          department: 'Computer Science',
          joiningDate: new Date('2020-09-01'),
        },
      },
    },
    include: { teacherProfile: true },
  });

  // ----------------------------------------------------
  // 5. TEACHER ASSIGNMENTS (RBAC PERMISSIONS)
  // ----------------------------------------------------
  console.log('🔗 Assigning Teachers to Classes, Sections & Subjects...');
  const teacherAssignments = [
    // Priya: Math in 8-A, 9-A, 10-A
    { teacherId: teacherPriyaUser.teacherProfile!.id, classId: class8.id, sectionId: sec8A.id, subjectId: subjects8['MATH'].id },
    { teacherId: teacherPriyaUser.teacherProfile!.id, classId: class9.id, sectionId: sec9A.id, subjectId: subjects9['MATH'].id },
    { teacherId: teacherPriyaUser.teacherProfile!.id, classId: class10.id, sectionId: sec10A.id, subjectId: subjects10['MATH'].id },
    // Rajesh: Science in 8-B, 9-A, 10-A, 10-B
    { teacherId: teacherRajeshUser.teacherProfile!.id, classId: class8.id, sectionId: sec8B.id, subjectId: subjects8['SCI'].id },
    { teacherId: teacherRajeshUser.teacherProfile!.id, classId: class9.id, sectionId: sec9A.id, subjectId: subjects9['SCI'].id },
    { teacherId: teacherRajeshUser.teacherProfile!.id, classId: class10.id, sectionId: sec10A.id, subjectId: subjects10['SCI'].id },
    { teacherId: teacherRajeshUser.teacherProfile!.id, classId: class10.id, sectionId: sec10B.id, subjectId: subjects10['SCI'].id },
    // Anitha: English in 8-A, 8-B, 9-A, 10-A
    { teacherId: teacherAnithaUser.teacherProfile!.id, classId: class8.id, sectionId: sec8A.id, subjectId: subjects8['ENG'].id },
    { teacherId: teacherAnithaUser.teacherProfile!.id, classId: class8.id, sectionId: sec8B.id, subjectId: subjects8['ENG'].id },
    { teacherId: teacherAnithaUser.teacherProfile!.id, classId: class9.id, sectionId: sec9A.id, subjectId: subjects9['ENG'].id },
    { teacherId: teacherAnithaUser.teacherProfile!.id, classId: class10.id, sectionId: sec10A.id, subjectId: subjects10['ENG'].id },
    // Murugan: Social Science in 8-A, 9-A, 10-A
    { teacherId: teacherMuruganUser.teacherProfile!.id, classId: class8.id, sectionId: sec8A.id, subjectId: subjects8['SOC'].id },
    { teacherId: teacherMuruganUser.teacherProfile!.id, classId: class9.id, sectionId: sec9A.id, subjectId: subjects9['SOC'].id },
    { teacherId: teacherMuruganUser.teacherProfile!.id, classId: class10.id, sectionId: sec10A.id, subjectId: subjects10['SOC'].id },
    // Divya: Computer Science in 9-A, 10-A, 10-B
    { teacherId: teacherDivyaUser.teacherProfile!.id, classId: class9.id, sectionId: sec9A.id, subjectId: subjects9['CS'].id },
    { teacherId: teacherDivyaUser.teacherProfile!.id, classId: class10.id, sectionId: sec10A.id, subjectId: subjects10['CS'].id },
    { teacherId: teacherDivyaUser.teacherProfile!.id, classId: class10.id, sectionId: sec10B.id, subjectId: subjects10['CS'].id },
  ];

  for (const ta of teacherAssignments) {
    await prisma.teacherAssignment.create({
      data: {
        ...ta,
        academicYearId: yearCurr.id,
      },
    });
  }

  // ----------------------------------------------------
  // 6. PARENTS & STUDENTS (MULTI-CHILD RELATIONSHIPS)
  // ----------------------------------------------------
  console.log('👨‍👩‍👧‍👦 Creating Parents, Students and Enrollments...');

  // Key Demo Parent: Ramesh Sharma (Father of Aarav Sharma [10-A] and Ananya Sharma [8-A])
  const parentRameshUser = await prisma.user.create({
    data: {
      email: 'parent.ramesh@akddemo.local',
      passwordHash: parentPassword,
      role: 'PARENT',
      name: 'Mr. Ramesh Sharma',
      phone: '+91 97890 30001',
      parentProfile: {
        create: {
          occupation: 'Senior Software Engineering Manager',
          address: '42, Heritage Enclave, South Cotton Road, Rajapalayam',
          emergencyContact: '+91 97890 30002',
        },
      },
    },
    include: { parentProfile: true },
  });

  // Additional Parents
  const parentMeenaUser = await prisma.user.create({
    data: {
      email: 'parent.meena@akddemo.local',
      passwordHash: parentPassword,
      role: 'PARENT',
      name: 'Mrs. Meenakshi Sridhar',
      phone: '+91 97890 30003',
      parentProfile: {
        create: {
          occupation: 'Chartered Accountant',
          address: '15, Gandhi Nagar Main Road, Rajapalayam',
          emergencyContact: '+91 97890 30004',
        },
      },
    },
    include: { parentProfile: true },
  });

  const parentKarthikUser = await prisma.user.create({
    data: {
      email: 'parent.karthik@akddemo.local',
      passwordHash: parentPassword,
      role: 'PARENT',
      name: 'Mr. Karthik Narayanan',
      phone: '+91 97890 30005',
      parentProfile: {
        create: {
          occupation: 'Textile Industry Director',
          address: '88, Mill Road, Rajapalayam',
          emergencyContact: '+91 97890 30006',
        },
      },
    },
    include: { parentProfile: true },
  });

  // Key Demo Student 1: Aarav Sharma (Class 10-A)
  const studentAaravUser = await prisma.user.create({
    data: {
      email: 'student.aarav@akddemo.local',
      passwordHash: studentPassword,
      role: 'STUDENT',
      name: 'Aarav Sharma',
      phone: '+91 97890 40001',
      studentProfile: {
        create: {
          rollNo: '10A01',
          admissionNo: 'AKD-2020-0412',
          dob: new Date('2010-04-14'),
          gender: 'MALE',
          bloodGroup: 'O+',
          emergencyContact: '+91 97890 30001',
          currentClassId: class10.id,
          currentSectionId: sec10A.id,
        },
      },
    },
    include: { studentProfile: true },
  });

  // Key Demo Student 2: Ananya Sharma (Class 8-A) - Sibling to Aarav
  const studentAnanyaUser = await prisma.user.create({
    data: {
      email: 'student.ananya@akddemo.local',
      passwordHash: studentPassword,
      role: 'STUDENT',
      name: 'Ananya Sharma',
      phone: '+91 97890 40002',
      studentProfile: {
        create: {
          rollNo: '08A01',
          admissionNo: 'AKD-2022-0891',
          dob: new Date('2012-09-22'),
          gender: 'FEMALE',
          bloodGroup: 'B+',
          emergencyContact: '+91 97890 30001',
          currentClassId: class8.id,
          currentSectionId: sec8A.id,
        },
      },
    },
    include: { studentProfile: true },
  });

  // Link Parent Ramesh to both Aarav and Ananya
  await prisma.parentStudent.create({
    data: {
      parentId: parentRameshUser.parentProfile!.id,
      studentId: studentAaravUser.studentProfile!.id,
      relationship: 'FATHER',
      isPrimary: true,
    },
  });

  await prisma.parentStudent.create({
    data: {
      parentId: parentRameshUser.parentProfile!.id,
      studentId: studentAnanyaUser.studentProfile!.id,
      relationship: 'FATHER',
      isPrimary: true,
    },
  });

  // Enroll Aarav in Class 10-A (Current) and Class 9-A (Previous Year for YoY comparison)
  await prisma.studentEnrollment.create({
    data: {
      studentId: studentAaravUser.studentProfile!.id,
      classId: class10.id,
      sectionId: sec10A.id,
      academicYearId: yearCurr.id,
      rollNo: '10A01',
      status: 'ACTIVE',
    },
  });

  await prisma.studentEnrollment.create({
    data: {
      studentId: studentAaravUser.studentProfile!.id,
      classId: class9.id,
      sectionId: sec9A.id,
      academicYearId: yearPrev.id,
      rollNo: '09A01',
      status: 'PROMOTED',
    },
  });

  // Enroll Ananya in Class 8-A (Current)
  await prisma.studentEnrollment.create({
    data: {
      studentId: studentAnanyaUser.studentProfile!.id,
      classId: class8.id,
      sectionId: sec8A.id,
      academicYearId: yearCurr.id,
      rollNo: '08A01',
      status: 'ACTIVE',
    },
  });

  // Additional 38 students across Class 10-A, 10-B, 9-A, 8-A, 8-B
  const studentRoster = [
    // Class 10-A
    { name: 'Kavya Sridhar', gender: 'FEMALE', roll: '10A02', classId: class10.id, secId: sec10A.id, email: 'student.kavya@akddemo.local', parentProf: parentMeenaUser.parentProfile!.id },
    { name: 'Rohan Narayanan', gender: 'MALE', roll: '10A03', classId: class10.id, secId: sec10A.id, email: 'student.rohan@akddemo.local', parentProf: parentKarthikUser.parentProfile!.id },
    { name: 'Deepak Varma', gender: 'MALE', roll: '10A04', classId: class10.id, secId: sec10A.id, email: 'student.deepak@akddemo.local' },
    { name: 'Sneha Venkatesh', gender: 'FEMALE', roll: '10A05', classId: class10.id, secId: sec10A.id, email: 'student.sneha@akddemo.local' },
    { name: 'Harish Kumar', gender: 'MALE', roll: '10A06', classId: class10.id, secId: sec10A.id, email: 'student.harish@akddemo.local' },
    { name: 'Pooja Raghavan', gender: 'FEMALE', roll: '10A07', classId: class10.id, secId: sec10A.id, email: 'student.pooja@akddemo.local' },
    { name: 'Manoj Krishna', gender: 'MALE', roll: '10A08', classId: class10.id, secId: sec10A.id, email: 'student.manoj@akddemo.local' },
    { name: 'Divya Shankar', gender: 'FEMALE', roll: '10A09', classId: class10.id, secId: sec10A.id, email: 'student.divyas@akddemo.local' },
    { name: 'Naveen Raj', gender: 'MALE', roll: '10A10', classId: class10.id, secId: sec10A.id, email: 'student.naveen@akddemo.local' },

    // Class 10-B
    { name: 'Akash Sundaram', gender: 'MALE', roll: '10B01', classId: class10.id, secId: sec10B.id, email: 'student.akash@akddemo.local' },
    { name: 'Bhavani Devi', gender: 'FEMALE', roll: '10B02', classId: class10.id, secId: sec10B.id, email: 'student.bhavani@akddemo.local' },
    { name: 'Gokulnath P.', gender: 'MALE', roll: '10B03', classId: class10.id, secId: sec10B.id, email: 'student.gokul@akddemo.local' },
    { name: 'Ishwarya R.', gender: 'FEMALE', roll: '10B04', classId: class10.id, secId: sec10B.id, email: 'student.ishwaryar@akddemo.local' },
    { name: 'Jeevan Prakash', gender: 'MALE', roll: '10B05', classId: class10.id, secId: sec10B.id, email: 'student.jeevan@akddemo.local' },
    { name: 'Keerthana M.', gender: 'FEMALE', roll: '10B06', classId: class10.id, secId: sec10B.id, email: 'student.keerthana@akddemo.local' },
    { name: 'Lokesh Waran', gender: 'MALE', roll: '10B07', classId: class10.id, secId: sec10B.id, email: 'student.lokesh@akddemo.local' },
    { name: 'Monisha S.', gender: 'FEMALE', roll: '10B08', classId: class10.id, secId: sec10B.id, email: 'student.monisha@akddemo.local' },

    // Class 9-A
    { name: 'Nithish Kumar', gender: 'MALE', roll: '09A02', classId: class9.id, secId: sec9A.id, email: 'student.nithish@akddemo.local' },
    { name: 'Pavithra S.', gender: 'FEMALE', roll: '09A03', classId: class9.id, secId: sec9A.id, email: 'student.pavithra@akddemo.local' },
    { name: 'Pranav Murali', gender: 'MALE', roll: '09A04', classId: class9.id, secId: sec9A.id, email: 'student.pranav@akddemo.local' },
    { name: 'Rashmika V.', gender: 'FEMALE', roll: '09A05', classId: class9.id, secId: sec9A.id, email: 'student.rashmika@akddemo.local' },
    { name: 'Saravanan T.', gender: 'MALE', roll: '09A06', classId: class9.id, secId: sec9A.id, email: 'student.saravanan@akddemo.local' },
    { name: 'Swetha Nathan', gender: 'FEMALE', roll: '09A07', classId: class9.id, secId: sec9A.id, email: 'student.swetha@akddemo.local' },
    { name: 'Tharun Prasad', gender: 'MALE', roll: '09A08', classId: class9.id, secId: sec9A.id, email: 'student.tharun@akddemo.local' },
    { name: 'Varun Balan', gender: 'MALE', roll: '09A09', classId: class9.id, secId: sec9A.id, email: 'student.varun@akddemo.local' },

    // Class 8-A
    { name: 'Abhinav Ram', gender: 'MALE', roll: '08A02', classId: class8.id, secId: sec8A.id, email: 'student.abhinav@akddemo.local' },
    { name: 'Dharshini K.', gender: 'FEMALE', roll: '08A03', classId: class8.id, secId: sec8A.id, email: 'student.dharshini@akddemo.local' },
    { name: 'Ganesh Moorthy', gender: 'MALE', roll: '08A04', classId: class8.id, secId: sec8A.id, email: 'student.ganesh@akddemo.local' },
    { name: 'Janani Priya', gender: 'FEMALE', roll: '08A05', classId: class8.id, secId: sec8A.id, email: 'student.janani@akddemo.local' },
    { name: 'Madhavan S.', gender: 'MALE', roll: '08A06', classId: class8.id, secId: sec8A.id, email: 'student.madhavan@akddemo.local' },
    { name: 'Nandhini R.', gender: 'FEMALE', roll: '08A07', classId: class8.id, secId: sec8A.id, email: 'student.nandhini@akddemo.local' },

    // Class 8-B
    { name: 'Prem Kumar', gender: 'MALE', roll: '08B01', classId: class8.id, secId: sec8B.id, email: 'student.prem@akddemo.local' },
    { name: 'Rithika Sri', gender: 'FEMALE', roll: '08B02', classId: class8.id, secId: sec8B.id, email: 'student.rithika@akddemo.local' },
    { name: 'Sai Saran', gender: 'MALE', roll: '08B03', classId: class8.id, secId: sec8B.id, email: 'student.saisaran@akddemo.local' },
    { name: 'Tejaswini M.', gender: 'FEMALE', roll: '08B04', classId: class8.id, secId: sec8B.id, email: 'student.tejaswini@akddemo.local' },
    { name: 'Vigneshwaran K.', gender: 'MALE', roll: '08B05', classId: class8.id, secId: sec8B.id, email: 'student.vignesh@akddemo.local' },
    { name: 'Yamini K.', gender: 'FEMALE', roll: '08B06', classId: class8.id, secId: sec8B.id, email: 'student.yamini@akddemo.local' },
  ];

  const createdStudents: Record<string, any> = {
    '10A01': studentAaravUser.studentProfile,
    '08A01': studentAnanyaUser.studentProfile,
  };

  for (let i = 0; i < studentRoster.length; i++) {
    const s = studentRoster[i];
    const u = await prisma.user.create({
      data: {
        email: s.email,
        passwordHash: studentPassword,
        role: 'STUDENT',
        name: s.name,
        studentProfile: {
          create: {
            rollNo: s.roll,
            admissionNo: `AKD-2022-${1000 + i}`,
            dob: new Date('2010-06-15'),
            gender: s.gender,
            bloodGroup: 'A+',
            currentClassId: s.classId,
            currentSectionId: s.secId,
          },
        },
      },
      include: { studentProfile: true },
    });

    createdStudents[s.roll] = u.studentProfile;

    await prisma.studentEnrollment.create({
      data: {
        studentId: u.studentProfile!.id,
        classId: s.classId,
        sectionId: s.secId,
        academicYearId: yearCurr.id,
        rollNo: s.roll,
        status: 'ACTIVE',
      },
    });

    if (s.parentProf) {
      await prisma.parentStudent.create({
        data: {
          parentId: s.parentProf,
          studentId: u.studentProfile!.id,
          relationship: 'PARENT',
          isPrimary: true,
        },
      });
    }
  }

  // ----------------------------------------------------
  // 7. EXAMS, ASSESSMENTS & MARKS (CURRENT & HISTORICAL)
  // ----------------------------------------------------
  console.log('📝 Creating Examinations, Multi-term Assessments and Mark Datasets...');

  // Current Year Exams (2025-2026)
  const examUT1 = await prisma.exam.create({
    data: {
      name: 'Unit Test 1',
      academicYearId: yearCurr.id,
      startDate: new Date('2025-07-15'),
      endDate: new Date('2025-07-22'),
      status: 'COMPLETED',
    },
  });

  const examQuarterly = await prisma.exam.create({
    data: {
      name: 'Quarterly Examination',
      academicYearId: yearCurr.id,
      startDate: new Date('2025-09-18'),
      endDate: new Date('2025-09-28'),
      status: 'COMPLETED',
    },
  });

  const examUT2 = await prisma.exam.create({
    data: {
      name: 'Unit Test 2',
      academicYearId: yearCurr.id,
      startDate: new Date('2025-11-10'),
      endDate: new Date('2025-11-17'),
      status: 'COMPLETED',
    },
  });

  const examHalfYearly = await prisma.exam.create({
    data: {
      name: 'Half-Yearly Examination',
      academicYearId: yearCurr.id,
      startDate: new Date('2025-12-12'),
      endDate: new Date('2025-12-23'),
      status: 'COMPLETED',
    },
  });

  const examRevision = await prisma.exam.create({
    data: {
      name: 'Revision Examination',
      academicYearId: yearCurr.id,
      startDate: new Date('2026-02-05'),
      endDate: new Date('2026-02-16'),
      status: 'ACTIVE',
    },
  });

  const examFinal = await prisma.exam.create({
    data: {
      name: 'Annual Board Examination',
      academicYearId: yearCurr.id,
      startDate: new Date('2026-03-20'),
      endDate: new Date('2026-04-05'),
      status: 'UPCOMING',
    },
  });

  // Previous Year Exam for YoY comparison
  const examPrevFinal = await prisma.exam.create({
    data: {
      name: 'Annual Final Examination (2024-25)',
      academicYearId: yearPrev.id,
      startDate: new Date('2025-03-15'),
      endDate: new Date('2025-03-30'),
      status: 'COMPLETED',
    },
  });

  // Helper to create assessment and populate marks
  const class10AStudents = [
    '10A01', '10A02', '10A03', '10A04', '10A05', '10A06', '10A07', '10A08', '10A09', '10A10'
  ];

  // Subject mark trajectory presets for Class 10-A
  // Aarav (10A01): Math improves from 71 -> 78 -> 84 -> 88!
  const mathScores10A: Record<string, number[]> = {
    '10A01': [71, 78, 84, 88, 92], // Aarav: Clear Improving trend!
    '10A02': [92, 94, 91, 95, 96], // Kavya: High Consistent
    '10A03': [82, 80, 81, 83, 85], // Rohan: Stable
    '10A04': [65, 62, 58, 54, 52], // Deepak: Declining (Needs attention)
    '10A05': [88, 85, 89, 90, 92], // Sneha: Strong
    '10A06': [74, 76, 75, 78, 80], // Harish: Stable/Improving
    '10A07': [90, 88, 92, 94, 95], // Pooja: High
    '10A08': [58, 64, 70, 76, 82], // Manoj: Huge Improvement Champion!
    '10A09': [78, 77, 79, 80, 81], // Divya: Stable
    '10A10': [45, 42, 40, 38, 36], // Naveen: Needs Attention
  };

  const scienceScores10A: Record<string, number[]> = {
    '10A01': [90, 92, 94, 95, 96], // Aarav: Science Star!
    '10A02': [95, 96, 97, 98, 99],
    '10A03': [78, 82, 85, 87, 89],
    '10A04': [60, 58, 56, 52, 50],
    '10A05': [85, 88, 90, 91, 93],
    '10A06': [72, 74, 75, 77, 79],
    '10A07': [92, 90, 94, 96, 97],
    '10A08': [65, 69, 73, 78, 82],
    '10A09': [80, 82, 81, 84, 86],
    '10A10': [50, 48, 45, 42, 40],
  };

  const englishScores10A: Record<string, number[]> = {
    '10A01': [84, 82, 85, 86, 88], // Aarav
    '10A02': [91, 93, 90, 94, 95],
    '10A03': [80, 81, 82, 84, 85],
    '10A04': [68, 65, 62, 60, 58],
    '10A05': [86, 87, 88, 90, 91],
    '10A06': [76, 75, 78, 80, 82],
    '10A07': [88, 89, 91, 92, 94],
    '10A08': [70, 72, 75, 78, 80],
    '10A09': [82, 83, 85, 86, 88],
    '10A10': [55, 52, 50, 48, 46],
  };

  const examsList = [examUT1, examQuarterly, examUT2, examHalfYearly, examRevision];
  const maxMarksList = [50, 100, 50, 100, 100];

  // Populate Class 10-A Assessments and Marks
  for (let eIdx = 0; eIdx < examsList.length; eIdx++) {
    const exam = examsList[eIdx];
    const maxM = maxMarksList[eIdx];
    const scale = maxM / 100;
    const isDraft = eIdx === 4; // Revision exam is Draft

    // Math Assessment
    const mathAssessment = await prisma.assessment.create({
      data: {
        examId: exam.id,
        subjectId: subjects10['MATH'].id,
        classId: class10.id,
        sectionId: sec10A.id,
        maxMarks: maxM,
        passMarks: maxM * 0.35,
        date: new Date(exam.startDate),
        status: isDraft ? 'DRAFT' : 'PUBLISHED',
      },
    });

    for (const roll of class10AStudents) {
      const studentProf = createdStudents[roll];
      if (studentProf) {
        const rawScore = mathScores10A[roll][eIdx];
        const scaledScore = Math.round(rawScore * scale * 10) / 10;
        await prisma.mark.create({
          data: {
            assessmentId: mathAssessment.id,
            studentId: studentProf.id,
            marksObtained: scaledScore,
            isAbsent: false,
            remarks: rawScore >= 90 ? 'Outstanding analytical work.' : rawScore >= 75 ? 'Good logical approach.' : 'Needs regular problem practice.',
          },
        });
      }
    }

    // Science Assessment
    const sciAssessment = await prisma.assessment.create({
      data: {
        examId: exam.id,
        subjectId: subjects10['SCI'].id,
        classId: class10.id,
        sectionId: sec10A.id,
        maxMarks: maxM,
        passMarks: maxM * 0.35,
        date: new Date(exam.startDate),
        status: isDraft ? 'DRAFT' : 'PUBLISHED',
      },
    });

    for (const roll of class10AStudents) {
      const studentProf = createdStudents[roll];
      if (studentProf) {
        const rawScore = scienceScores10A[roll][eIdx];
        const scaledScore = Math.round(rawScore * scale * 10) / 10;
        await prisma.mark.create({
          data: {
            assessmentId: sciAssessment.id,
            studentId: studentProf.id,
            marksObtained: scaledScore,
            isAbsent: false,
            remarks: rawScore >= 90 ? 'Exceptional scientific clarity and lab acumen.' : 'Well prepared.',
          },
        });
      }
    }

    // English Assessment
    const engAssessment = await prisma.assessment.create({
      data: {
        examId: exam.id,
        subjectId: subjects10['ENG'].id,
        classId: class10.id,
        sectionId: sec10A.id,
        maxMarks: maxM,
        passMarks: maxM * 0.35,
        date: new Date(exam.startDate),
        status: isDraft ? 'DRAFT' : 'PUBLISHED',
      },
    });

    for (const roll of class10AStudents) {
      const studentProf = createdStudents[roll];
      if (studentProf) {
        const rawScore = englishScores10A[roll][eIdx];
        const scaledScore = Math.round(rawScore * scale * 10) / 10;
        await prisma.mark.create({
          data: {
            assessmentId: engAssessment.id,
            studentId: studentProf.id,
            marksObtained: scaledScore,
            isAbsent: false,
            remarks: 'Good vocabulary and reading comprehension.',
          },
        });
      }
    }
  }

  // Previous Year (2024-25) Final Marks for Aarav in Class 9-A (For Authentic Year-over-Year comparison)
  const prevAssessMath = await prisma.assessment.create({
    data: {
      examId: examPrevFinal.id,
      subjectId: subjects9['MATH'].id,
      classId: class9.id,
      sectionId: sec9A.id,
      maxMarks: 100,
      passMarks: 35,
      date: new Date('2025-03-20'),
      status: 'PUBLISHED',
    },
  });

  const prevAssessSci = await prisma.assessment.create({
    data: {
      examId: examPrevFinal.id,
      subjectId: subjects9['SCI'].id,
      classId: class9.id,
      sectionId: sec9A.id,
      maxMarks: 100,
      passMarks: 35,
      date: new Date('2025-03-22'),
      status: 'PUBLISHED',
    },
  });

  const prevAssessEng = await prisma.assessment.create({
    data: {
      examId: examPrevFinal.id,
      subjectId: subjects9['ENG'].id,
      classId: class9.id,
      sectionId: sec9A.id,
      maxMarks: 100,
      passMarks: 35,
      date: new Date('2025-03-24'),
      status: 'PUBLISHED',
    },
  });

  // Aarav scored 74 in Math, 88 in Science, 80 in English in previous year Class 9!
  await prisma.mark.create({
    data: {
      assessmentId: prevAssessMath.id,
      studentId: studentAaravUser.studentProfile!.id,
      marksObtained: 74,
      isAbsent: false,
      remarks: 'Strong foundation in geometry, needs algebra focus.',
    },
  });

  await prisma.mark.create({
    data: {
      assessmentId: prevAssessSci.id,
      studentId: studentAaravUser.studentProfile!.id,
      marksObtained: 88,
      isAbsent: false,
      remarks: 'Very attentive during lab experiments.',
    },
  });

  await prisma.mark.create({
    data: {
      assessmentId: prevAssessEng.id,
      studentId: studentAaravUser.studentProfile!.id,
      marksObtained: 80,
      isAbsent: false,
      remarks: 'Fluent expressive essays.',
    },
  });

  // ----------------------------------------------------
  // 8. ATTENDANCE DATA (MONTHLY LOGS)
  // ----------------------------------------------------
  console.log('📊 Creating Attendance Records & Monthly Trends...');
  const attendanceDates = [
    new Date('2025-11-03'), new Date('2025-11-04'), new Date('2025-11-05'), new Date('2025-11-06'), new Date('2025-11-07'),
    new Date('2025-11-10'), new Date('2025-11-11'), new Date('2025-11-12'), new Date('2025-11-13'), new Date('2025-11-14'),
    new Date('2025-11-17'), new Date('2025-11-18'), new Date('2025-11-19'), new Date('2025-11-20'), new Date('2025-11-21'),
    new Date('2025-12-01'), new Date('2025-12-02'), new Date('2025-12-03'), new Date('2025-12-04'), new Date('2025-12-05'),
    new Date('2025-12-08'), new Date('2025-12-09'), new Date('2025-12-10'), new Date('2025-12-11'), new Date('2025-12-12'),
  ];

  for (const date of attendanceDates) {
    for (const roll of class10AStudents) {
      const studentProf = createdStudents[roll];
      if (studentProf) {
        // Aarav (10A01) has 96% attendance (only 1 excused day)
        let status = 'PRESENT';
        if (roll === '10A01' && date.getDate() === 5 && date.getMonth() === 10) {
          status = 'EXCUSED';
        } else if (roll === '10A04' && (date.getDate() === 4 || date.getDate() === 11)) {
          status = 'ABSENT'; // Deepak has lower attendance
        } else if (roll === '10A10' && (date.getDate() === 3 || date.getDate() === 10 || date.getDate() === 17)) {
          status = 'ABSENT'; // Naveen has low attendance
        }

        await prisma.attendance.create({
          data: {
            studentId: studentProf.id,
            classId: class10.id,
            sectionId: sec10A.id,
            date,
            status,
            remarks: status === 'EXCUSED' ? 'Medical leave approved' : undefined,
            markedById: teacherPriyaUser.id,
          },
        });
      }
    }
  }

  // ----------------------------------------------------
  // 9. ASSIGNMENTS & SUBMISSIONS
  // ----------------------------------------------------
  console.log('📚 Creating Assignments & Student Submissions...');
  const assignMath = await prisma.assignment.create({
    data: {
      teacherId: teacherPriyaUser.teacherProfile!.id,
      classId: class10.id,
      sectionId: sec10A.id,
      subjectId: subjects10['MATH'].id,
      title: 'Trigonometric Identities & Applications Problem Set',
      description: 'Solve problems 1 through 15 from Section 8.4 of NCERT textbook. Show all derivation steps clearly.',
      dueDate: new Date('2026-02-28'),
      maxMarks: 20,
    },
  });

  const assignSci = await prisma.assignment.create({
    data: {
      teacherId: teacherRajeshUser.teacherProfile!.id,
      classId: class10.id,
      sectionId: sec10A.id,
      subjectId: subjects10['SCI'].id,
      title: 'Electromagnetic Induction & Faraday’s Laws Lab Report',
      description: 'Document your observations from the galvanometer deflection experiment with circuit diagram.',
      dueDate: new Date('2026-03-05'),
      maxMarks: 25,
    },
  });

  // Aarav submission
  await prisma.assignmentSubmission.create({
    data: {
      assignmentId: assignMath.id,
      studentId: studentAaravUser.studentProfile!.id,
      submissionText: 'Completed all 15 problems with step-by-step angle transformations.',
      fileUrl: '/assignments/trig_aarav_sharma.pdf',
      status: 'GRADED',
      marksObtained: 19,
      feedback: 'Excellent rigor in proof derivations. Clean presentation.',
      gradedAt: new Date('2026-02-15'),
    },
  });

  // ----------------------------------------------------
  // 10. STUDY MATERIALS
  // ----------------------------------------------------
  console.log('📖 Uploading Categorized Study Materials...');
  const studyMaterials = [
    {
      teacherId: teacherPriyaUser.teacherProfile!.id,
      classId: class10.id,
      subjectId: subjects10['MATH'].id,
      title: 'Class 10 Quadratic Equations & Polynomials Revision Notes',
      description: 'Complete formula sheet, discriminant analysis and solved board questions.',
      topic: 'Algebra',
      category: 'NOTES',
      fileUrl: '/materials/math_class10_quadratics_revision.pdf',
    },
    {
      teacherId: teacherPriyaUser.teacherProfile!.id,
      classId: class10.id,
      subjectId: subjects10['MATH'].id,
      title: 'Mathematics Past 5-Year Board Question Papers with Marking Scheme',
      description: 'Comprehensive compilation of standard 10th CBSE & State board model papers.',
      topic: 'Exam Preparation',
      category: 'QUESTION_PAPER',
      fileUrl: '/materials/math_past_5year_papers.pdf',
    },
    {
      teacherId: teacherRajeshUser.teacherProfile!.id,
      classId: class10.id,
      subjectId: subjects10['SCI'].id,
      title: 'Optics: Ray Diagrams, Lenses & Mirrors Formula Quick Reference',
      description: 'Illustrated guide for convex/concave image formations and magnification signs.',
      topic: 'Physics - Light',
      category: 'PDF',
      fileUrl: '/materials/science_optics_ray_diagrams.pdf',
    },
    {
      teacherId: teacherDivyaUser.teacherProfile!.id,
      classId: class10.id,
      subjectId: subjects10['CS'].id,
      title: 'Python Data Structures: Lists, Tuples, Dictionaries & Functions',
      description: 'Code snippets, memory layout illustrations and practice programming challenges.',
      topic: 'Python Programming',
      category: 'REVISION',
      fileUrl: '/materials/cs_python_data_structures.pdf',
    },
  ];

  for (const sm of studyMaterials) {
    await prisma.studyMaterial.create({ data: sm });
  }

  // ----------------------------------------------------
  // 11. TEACHER REMARKS
  // ----------------------------------------------------
  console.log('💬 Adding Teacher Remarks...');
  await prisma.teacherRemark.create({
    data: {
      teacherId: teacherPriyaUser.teacherProfile!.id,
      studentId: studentAaravUser.studentProfile!.id,
      classId: class10.id,
      subjectId: subjects10['MATH'].id,
      academicYearId: yearCurr.id,
      remark: 'Aarav has shown outstanding progression in advanced problem solving and maintains proactive participation in analytical discussions.',
      status: 'PUBLISHED',
    },
  });

  await prisma.teacherRemark.create({
    data: {
      teacherId: teacherRajeshUser.teacherProfile!.id,
      studentId: studentAaravUser.studentProfile!.id,
      classId: class10.id,
      subjectId: subjects10['SCI'].id,
      academicYearId: yearCurr.id,
      remark: 'Consistently the top performer in physics experiments; demonstrates remarkable curiosity and precision in scientific inquiry.',
      status: 'PUBLISHED',
    },
  });

  // ----------------------------------------------------
  // 12. ANNOUNCEMENTS & NOTIFICATIONS
  // ----------------------------------------------------
  console.log('📢 Creating Announcements & Targeted Notifications...');
  await prisma.announcement.create({
    data: {
      title: 'Half-Yearly Examination Results Published on Digital Campus',
      content: 'Official marks and detailed subject-wise trend analytics for the Half-Yearly Examination are now accessible through the Parent and Student portals.',
      targetRole: 'ALL',
      authorId: principalUser.id,
      priority: 'URGENT',
    },
  });

  await prisma.announcement.create({
    data: {
      title: 'Annual Science & Innovation Expo 2026 Registration Open',
      content: 'Students from Classes 8 through 12 are invited to submit their innovative working models and STEM projects. Mentorship sessions begin this Saturday.',
      targetRole: 'STUDENT',
      classId: class10.id,
      authorId: teacherRajeshUser.id,
      priority: 'NORMAL',
    },
  });

  // Parent Notification
  await prisma.notification.create({
    data: {
      userId: parentRameshUser.id,
      title: 'Mathematics Marks Published',
      message: 'Half-Yearly examination marks for Aarav Sharma (Class 10-A) have been published. Score: 88% (Grade A).',
      link: '/parent/academics',
      type: 'ACADEMIC',
      isRead: false,
    },
  });

  await prisma.notification.create({
    data: {
      userId: parentRameshUser.id,
      title: 'Digital Report Card Generated',
      message: 'Half-Yearly Digital Report Card is now available for download.',
      link: '/parent/report-card',
      type: 'ACADEMIC',
      isRead: false,
    },
  });

  // Student Notification
  await prisma.notification.create({
    data: {
      userId: studentAaravUser.id,
      title: 'New Assignment Uploaded',
      message: 'Trigonometric Identities Problem Set has been assigned by Mrs. Priya Subramanian.',
      link: '/student/assignments',
      type: 'ASSIGNMENT',
      isRead: true,
    },
  });

  // ----------------------------------------------------
  // 13. ACHIEVEMENTS & GAMIFICATION BADGES
  // ----------------------------------------------------
  console.log('🏆 Creating Achievements & Positive Gamification Badges...');
  await prisma.achievement.create({
    data: {
      studentId: studentAaravUser.studentProfile!.id,
      title: 'State Science Talent Olympiad — Gold Medalist',
      description: 'Secured 1st rank in the Tamil Nadu State Science & Mathematics Olympiad 2025.',
      category: 'SCIENCE',
      badgeType: 'Consistent Performer',
      date: new Date('2025-11-20'),
      isPublic: true,
    },
  });

  await prisma.achievement.create({
    data: {
      studentId: studentAaravUser.studentProfile!.id,
      title: 'Mathematics Improvement Star',
      description: 'Demonstrated continuous upward score trajectory from 71% to 88% across consecutive term assessments.',
      category: 'ACADEMIC',
      badgeType: 'Improvement Champion',
      date: new Date('2025-12-24'),
      isPublic: true,
    },
  });

  await prisma.achievement.create({
    data: {
      studentId: studentAnanyaUser.studentProfile!.id,
      title: 'Inter-School Classical Music & Arts Fest — First Prize',
      description: 'Won First Prize in the State Carnatic Vocal Junior Category at Chennai Sahodaya Fest.',
      category: 'ARTS',
      badgeType: 'Creative Achiever',
      date: new Date('2025-10-15'),
      isPublic: true,
    },
  });

  await prisma.achievement.create({
    data: {
      studentId: createdStudents['10A02'].id,
      title: 'Zonal Athletics Championship — 400m Gold',
      description: 'Clocked record timing at the District Athletics Meet representing AKD School.',
      category: 'SPORTS',
      badgeType: 'Sports Excellence',
      date: new Date('2025-12-05'),
      isPublic: true,
    },
  });

  // ----------------------------------------------------
  // 14. ACADEMIC ALERTS ENGINE
  // ----------------------------------------------------
  console.log('🚨 Configuring Academic Attention Alerts...');
  // Deepak Varma (10A04) has declining score trigger
  await prisma.academicAlert.create({
    data: {
      studentId: createdStudents['10A04'].id,
      type: 'SCORE_DECLINE',
      message: 'Mathematics score experienced a continuous downward trajectory across the last three terms (65% -> 58% -> 54%). Recommend focused tutorial support in Algebraic functions.',
      severity: 'MEDIUM',
      status: 'ACTIVE',
    },
  });

  // Naveen Raj (10A10) has low attendance trigger
  await prisma.academicAlert.create({
    data: {
      studentId: createdStudents['10A10'].id,
      type: 'LOW_ATTENDANCE',
      message: 'Monthly attendance fell below the school threshold (74.2%). Parent notification recommended.',
      severity: 'HIGH',
      status: 'ACTIVE',
    },
  });

  // ----------------------------------------------------
  // 15. AI GROUNDED INSIGHTS
  // ----------------------------------------------------
  console.log('🤖 Generating Grounded AI Academic Insights...');
  await prisma.aIInsight.create({
    data: {
      studentId: studentAaravUser.studentProfile!.id,
      subjectId: subjects10['MATH'].id,
      insightText: 'Mathematics performance rose from 71.0% in Unit Test 1 to 88.0% in the Half-Yearly examination, demonstrating an improvement of +17.0 percentage points. The score currently stands 12.0% above the class average of 76.0%.',
      evidenceData: JSON.stringify({
        subject: 'Mathematics',
        previousScore: 71.0,
        currentScore: 88.0,
        delta: 17.0,
        classAverage: 76.0,
        assessmentsCompared: ['Unit Test 1', 'Quarterly', 'Unit Test 2', 'Half-Yearly'],
      }),
      changeDelta: 17.0,
      trendStatus: 'IMPROVING',
      confidence: 1.0,
    },
  });

  await prisma.aIInsight.create({
    data: {
      studentId: studentAaravUser.studentProfile!.id,
      subjectId: subjects10['SCI'].id,
      insightText: 'Science remains the strongest academic subject with consistent scores exceeding 94.0% across all term examinations. Maintained top 3 percentile in Class 10-A.',
      evidenceData: JSON.stringify({
        subject: 'Science',
        currentScore: 95.0,
        classAverage: 79.2,
        trendStatus: 'STABLE',
      }),
      changeDelta: 3.0,
      trendStatus: 'STABLE',
      confidence: 1.0,
    },
  });

  // ----------------------------------------------------
  // 16. DIGITAL REPORT CARDS
  // ----------------------------------------------------
  console.log('📜 Generating Digital Report Card records...');
  await prisma.reportCard.create({
    data: {
      studentId: studentAaravUser.studentProfile!.id,
      academicYearId: yearCurr.id,
      classId: class10.id,
      sectionId: sec10A.id,
      term: 'Half-Yearly',
      version: 1,
      status: 'PUBLISHED',
      attendancePercent: 96.5,
      teacherRemarks: 'Aarav has demonstrated exceptional dedication and consistent academic advancement in Mathematics and Science.',
      principalRemarks: 'Commendable discipline and exemplary academic conduct. Congratulations on securing distinction.',
      publishedAt: new Date('2025-12-28'),
    },
  });

  // ----------------------------------------------------
  // 17. PUBLIC EVENTS & MASONRY GALLERY
  // ----------------------------------------------------
  console.log('🎨 Populating Public Events & Gallery Items...');
  const events = [
    {
      title: '74th Annual Sports Meet & Athletic Carnival',
      description: 'Witness high-octane track and field competitions, march-past drills, and torch lighting ceremony at the school stadium.',
      date: new Date('2026-03-12'),
      time: '08:30 AM - 04:30 PM',
      location: 'AKD Memorial Athletic Complex',
      category: 'SPORTS',
      imageUrl: '/images/events/sports_meet.jpg',
      isPublished: true,
    },
    {
      title: 'State-Level Inter-School Robotics & AI Symposium',
      description: 'Over 40 leading schools compete in autonomous line-following robotics, IoT innovation, and machine learning demonstrations.',
      date: new Date('2026-03-25'),
      time: '09:00 AM - 05:00 PM',
      location: 'Dr. A.P.J. Abdul Kalam Auditorium',
      category: 'ACADEMIC',
      imageUrl: '/images/events/robotics_expo.jpg',
      isPublished: true,
    },
    {
      title: 'Heritage Day & Founders Memorial Celebration',
      description: 'Honoring the timeless philanthropic vision of founder A.K.D. Dharma Raja with traditional cultural recitals and awards.',
      date: new Date('2026-04-10'),
      time: '05:30 PM - 08:30 PM',
      location: 'Central Campus Amphitheatre',
      category: 'CULTURAL',
      imageUrl: '/images/events/heritage_day.jpg',
      isPublished: true,
    },
  ];

  for (const ev of events) {
    await prisma.event.create({ data: ev });
  }

  const galleryItems = [
    { title: 'High-Tech Physics & Chemistry Research Laboratory', category: 'ACADEMICS', mediaType: 'IMAGE', mediaUrl: '/images/gallery/science_lab.jpg', caption: 'State-of-the-art laboratory equipped with digital sensors.' },
    { title: 'Central Knowledge Hub & Heritage Library', category: 'CAMPUS', mediaType: 'IMAGE', mediaUrl: '/images/gallery/library.jpg', caption: 'Over 35,000 volumes, e-journals, and silent study zones.' },
    { title: 'Olympic-Standard 400m Synthetic Athletic Track', category: 'SPORTS', mediaType: 'IMAGE', mediaUrl: '/images/gallery/athletics.jpg', caption: 'World-class sports infrastructure nurturing state champions.' },
    { title: 'Robotics & Advanced Computer Center', category: 'ACADEMICS', mediaType: 'IMAGE', mediaUrl: '/images/gallery/computer_center.jpg', caption: '120 high-performance workstations for coding & AI.' },
    { title: 'Annual Cultural Festival & Music Orchestra', category: 'CULTURAL', mediaType: 'IMAGE', mediaUrl: '/images/gallery/cultural_fest.jpg', caption: 'Vibrant celebration of South Indian heritage and global music.' },
    { title: 'Green Campus & Solar-Powered Academic Blocks', category: 'CAMPUS', mediaType: 'IMAGE', mediaUrl: '/images/gallery/campus_green.jpg', caption: '22-acre lush green eco-friendly educational sanctuary.' },
  ];

  for (const gi of galleryItems) {
    await prisma.galleryItem.create({ data: gi });
  }

  // ----------------------------------------------------
  // 18. ADMISSIONS PIPELINE (8 STAGES)
  // ----------------------------------------------------
  console.log('📋 Populating Online Admissions Pipeline...');
  const admissions = [
    {
      applicationNo: 'AKD-ADM-2026-001',
      studentName: 'Siddharth V.',
      parentName: 'Dr. Venkat Raman',
      email: 'venkat.raman@example.com',
      phone: '+91 98840 55101',
      gradeApplying: 'Class 8',
      previousSchool: 'Vidya Mandir Senior Secondary',
      dob: new Date('2012-07-11'),
      status: 'SUBMITTED',
      notes: 'Application received online. Ready for preliminary document verification.',
    },
    {
      applicationNo: 'AKD-ADM-2026-002',
      studentName: 'Priyanka M.',
      parentName: 'Mr. Muthuswamy K.',
      email: 'muthu.k@example.com',
      phone: '+91 98840 55102',
      gradeApplying: 'Class 9',
      previousSchool: 'DAV Public School',
      dob: new Date('2011-03-24'),
      status: 'DOCUMENT_VERIFICATION',
      notes: 'Transfer certificate and previous report cards under review.',
    },
    {
      applicationNo: 'AKD-ADM-2026-003',
      studentName: 'Karthika Sundar',
      parentName: 'Mrs. Jayanthi Sundar',
      email: 'jayanthi.s@example.com',
      phone: '+91 98840 55103',
      gradeApplying: 'Class 10',
      previousSchool: 'Kendriya Vidyalaya',
      dob: new Date('2010-11-19'),
      status: 'INTERVIEW',
      notes: 'Scheduled for principal interaction on March 15th.',
    },
    {
      applicationNo: 'AKD-ADM-2026-004',
      studentName: 'Rishi Krishnan',
      parentName: 'Mr. Gopalakrishnan R.',
      email: 'gopal.k@example.com',
      phone: '+91 98840 55104',
      gradeApplying: 'Class 8',
      previousSchool: 'Bala Vidya Mandir',
      dob: new Date('2012-05-18'),
      status: 'ASSESSMENT',
      notes: 'Academic diagnostic assessment scheduled for March 10th.',
    },
    {
      applicationNo: 'AKD-ADM-2026-005',
      studentName: 'Deepa Lakshmi',
      parentName: 'Mr. Senthil Nathan',
      email: 'senthil.n@example.com',
      phone: '+91 98840 55105',
      gradeApplying: 'Class 9',
      previousSchool: 'St. Joseph Higher Secondary',
      dob: new Date('2011-08-04'),
      status: 'SELECTED',
      notes: 'Selected for admission in Merit Category. Provisional offer letter issued.',
    },
    {
      applicationNo: 'AKD-ADM-2026-006',
      studentName: 'Arjun Balaji',
      parentName: 'Mrs. Radhika Balaji',
      email: 'radhika.b@example.com',
      phone: '+91 98840 55106',
      gradeApplying: 'Class 10',
      previousSchool: 'Maharishi Vidya Mandir',
      dob: new Date('2010-02-14'),
      status: 'ADMITTED',
      notes: 'Admission confirmed. Fee receipt issued. Enrolled for 2026-2027.',
    },
  ];

  for (const adm of admissions) {
    await prisma.admissionApplication.create({ data: adm });
  }

  // ----------------------------------------------------
  // 19. AUDIT LOGS
  // ----------------------------------------------------
  console.log('🔒 Writing Initial Audit Logs...');
  await prisma.auditLog.create({
    data: {
      userId: teacherPriyaUser.id,
      userRole: 'TEACHER',
      action: 'MARKS_PUBLISHED',
      entityType: 'Assessment',
      entityId: examHalfYearly.id,
      newValue: JSON.stringify({ class: '10-A', subject: 'Mathematics', count: 10 }),
      reason: 'Published official Half-Yearly marks after departmental verification.',
    },
  });

  await prisma.auditLog.create({
    data: {
      userId: adminUser.id,
      userRole: 'ADMIN',
      action: 'TEACHER_ASSIGNED',
      entityType: 'TeacherAssignment',
      entityId: teacherPriyaUser.id,
      newValue: JSON.stringify({ teacher: 'Mrs. Priya', subjects: ['Mathematics'], classes: ['8-A', '9-A', '10-A'] }),
      reason: 'Annual faculty workload assignment approved by principal.',
    },
  });

  console.log('✅ Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
