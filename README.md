# AKD DIGITAL CAMPUS
> **Tradition. Education. Excellence. Digital.**  
> Unified Institutional Website, Student Information System (SIS), Academic Intelligence Platform, Parent Portal, Teacher Portal, Student Portal, and Principal/Admin Governance Suite for **A.K.D. Dharma Raja School** (Rajapalayam, Tamil Nadu).

---

## 🏛️ Platform Architecture

AKD Digital Campus is an enterprise-grade full-stack digital school management and learning platform designed to unify communication, assessments, attendance, admissions, and grounded academic analytics.

### 🌐 Key Portals & Modules

1. **Public Showcase Website (14 Pages)**
   - Complete institutional showcase covering Heritage (since 1952), Dual CBSE & State Board Curricula, 22-Acre Campus, Science Labs, 4 Houses, Achievements Wall, Events, Media Gallery, 8-Stage Admissions Tracker, Distinguished Alumni, Contact Directory, and Knowledge Base FAQ.
2. **Role-Based Access Control (RBAC)**
   - Secure cookie-based JWT sessions with strict server-side middleware and domain service guards across 6 roles (`SUPER_ADMIN`, `ADMIN`, `PRINCIPAL`, `TEACHER`, `PARENT`, `STUDENT`).
3. **Parent Portal Suite**
   - **Multi-Child Switcher**: Reactive switching between linked children (e.g. Aarav Sharma [10-A] and Ananya Sharma [8-A]).
   - **Academic Performance**: Subject benchmarks, change deltas, anonymized class averages, and mathematical progression metrics.
   - **Visual Analytics**: Interactive Recharts multi-term progression line charts and Year-over-Year comparison (2024-25 vs 2025-26).
   - **Official Digital Report Card**: Printable A4 transcript with school seal, grading scales, teacher & principal remarks.
   - **Daily Attendance & Assignments**: Real-time session regularities and homework tracking.
4. **Student Portal Suite**
   - Personal academic dashboard, homework submission form, searchable study materials repository (PDFs/notes), weekly timetable schedule, and positive achievement badges.
5. **Teacher Portal Suite**
   - **Spreadsheet Mark Entry**: Inline editable gradebook with range validation ($0 \le \text{marks} \le \text{maxMarks}$), absent flags, draft saving, mark publication (with automatic notifications and audit logging), and mark correction requests.
   - **Daily Attendance Register**: 1-click bulk present/absent tools.
   - **Curricular Workload**: Assignment publisher and qualitative remarks creator.
6. **Principal & Admin Governance Suites**
   - Executive analytics KPIs (1,850 students, 112 faculty, 99.4% pass rate), SIS student/teacher/parent directories, 8-stage admissions pipeline Kanban, early academic attention alert engine, live dynamic CMS settings editor, and immutable system audit trail.
7. **Grounded AI Intelligence**
   - Privacy-governed floating assistant drawer providing natural-language responses strictly backed by live database metrics.

---

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router, Server Components & Server Actions)
- **UI / Styling**: React 19, Tailwind CSS, Lucide React, Framer Motion
- **Data Visualization**: Recharts
- **Database & ORM**: PostgreSQL-ready Prisma ORM with SQLite local engine
- **Authentication**: JWT (`jsonwebtoken`), `bcryptjs`, HTTP-only secure cookies
- **Validation**: Zod schema validators

---

## 🛠️ Local Setup & Running Instructions

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/Sutantu2207/AKD-PROJECT-DEMO.git
cd AKD-PROJECT-DEMO
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### 3. Initialize & Seed Database
```bash
npm run prisma:push
npm run db:seed
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Demo Evaluator Accounts

The `/login` screen includes a **1-Click Evaluator Quick-Login Switcher** for instant one-tap access:

| Role | Email | Password | Primary Scope |
|---|---|---|---|
| **Principal** | `principal@akddemo.local` | `akdPrincipal2026!` | Academic oversight & mark correction approval |
| **Administrator** | `admin@akddemo.local` | `akdAdmin2026!` | Full SIS, CMS, Admissions pipeline & audit trail |
| **Teacher (Math)** | `teacher.priya@akddemo.local` | `akdTeacher2026!` | Classes 8-A, 9-A, 10-A Mathematics mark entry |
| **Teacher (Science)** | `teacher.rajesh@akddemo.local` | `akdTeacher2026!` | Classes 8-B, 9-A, 10-A, 10-B Science |
| **Parent (2 Children)** | `parent.ramesh@akddemo.local` | `akdParent2026!` | Aarav Sharma (10-A) & Ananya Sharma (8-A) |
| **Student (10-A)** | `student.aarav@akddemo.local` | `akdStudent2026!` | Aarav Sharma student dashboard & submissions |

---

## 📄 License
Institutional software developed for A.K.D. Dharma Raja School.
