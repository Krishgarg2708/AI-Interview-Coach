# InterCoach AI — Your AI Interview Coach

A production-ready, full-stack AI interview coaching platform that simulates real technical, HR, and behavioral interviews with a conversational AI interviewer. Get instant scores, detailed feedback, and a personalized improvement plan — all in a premium SaaS-grade UI.

## Features

### Core Experience
- **Conversational AI interviewer** — asks one question at a time, listens to your answers, and generates dynamic follow-ups based on what you said. No scripted flows; every session is unique.
- **Context-aware question engine** — adapts to your role, difficulty, experience level, and interview type. Challenges vague answers and digs deeper on strong ones.
- **Live timer, pause/resume/end** — full control over the session, with auto-end when time runs out.

### Interview Setup
Choose from:
- **12 roles** (Frontend, Backend, Full Stack, AI, ML, Data Science, DevOps, Cyber Security, Product Manager, UI/UX, Software Engineer, Custom)
- **3 difficulties** (Easy, Medium, Hard)
- **4 experience levels** (Fresher → 5+ Years)
- **6 interview types** (HR, Technical, Behavioral, System Design, Coding, Mixed)
- **5 durations** (10, 20, 30, 45, 60 min)

### AI Feedback Report
After every interview, receive:
- Overall, Technical, HR, Communication, and Confidence scores
- Radar chart of skill breakdown
- Strengths and areas to improve
- Missed concepts with tags
- Week-by-week improvement roadmap
- Curated learning resources
- Hiring chance estimate and company-readiness rating

### Dashboard & Analytics
- Stats cards (avg score, technical, communication, confidence)
- Score progress area chart
- Daily streak tracker with weekly grid
- Recent interviews + resume-in-progress
- Achievement board
- Performance page with line, bar, and pie charts plus full history

### Resume Analysis
- Upload PDF/DOCX
- Auto-extracted skills, strengths, weaknesses, missing skills
- ATS score and resume score
- Improvement suggestions

### Gamification
- 8 achievements (First Steps, On Fire, Top Performer, Perfectionist, Night Owl, etc.)
- Daily practice streak
- Unlocks automatically based on activity

### Design
- Dark/light theme with glassmorphism, animated gradient blobs, gradient borders
- Framer Motion page transitions and micro-interactions
- Fully responsive (mobile sheet nav → desktop sidebar)
- Custom Inter + Plus Jakarta Sans typography

## Tech Stack
- **Next.js 15 / React 19 / TypeScript**
- **Tailwind CSS** with a 6-ramp color system
- **ShadCN UI** components
- **Framer Motion** animations
- **Recharts** analytics
- **React Hook Form + Zod** auth forms
- **Supabase** (Postgres + Auth + Storage) with RLS on every table

## Architecture

```
app/
  layout.tsx              # Root layout with providers
  page.tsx                # Landing page
  login/ register/ forgot-password/
  dashboard/              # Stats, charts, achievements
  interview/
    setup/                # Multi-step config
    [id]/                 # Live interview room
      report/             # AI feedback report
  performance/            # Full analytics
  resume/                 # Upload + analysis
  achievements/ schedule/ settings/

components/
  auth-provider.tsx      # Supabase session + profile context
  protected-route.tsx    # Auth gate
  dashboard-shell.tsx    # Sidebar + nav
  navbar.tsx              # Marketing nav + Logo
  theme-provider.tsx      animated-background.tsx
  ui/                     # ShadCN primitives (custom Progress)

lib/
  supabase.ts             # Lazy singleton client (Proxy)
  types.ts                # Domain types + config constants
  interview-engine.ts     # Conversational AI + scoring engine
  data.ts                 # Supabase data-access layer + achievements
```

### AI Interviewer Engine
`lib/interview-engine.ts` is a self-contained, rules-based conversational engine that simulates a senior interviewer:
- Role-specific question banks (frontend, backend, AI, ML, data science, DevOps, cyber security, product, UX, software engineer)
- Dynamic follow-up chains per question (depth 1–4)
- Vague-answer detection (word count + keyword match) → challenges the candidate
- Filler-word and keyword-matching analysis
- Weighted scoring across Technical (40%), HR (20%), Communication (25%), Confidence (15%)

The engine is intentionally decoupled from the network layer so a real LLM (OpenAI GPT-4.1 / GPT-5) can drop in by replacing the `getNextQuestion` and `generateReport` functions — the data contract (config → messages → report) stays identical.

## Database
Supabase Postgres with RLS on every table. Schema (`create_interview_coach_schema` migration):
- `profiles` (extends `auth.users`)
- `resumes` (with `analysis` JSONB + ATS/resume scores)
- `interviews` (config + final scores + `report` JSONB)
- `interview_messages` (transcript)
- `interview_scores` (per-category)
- `achievements` (badge definitions)
- `user_achievements` (unlocks)
- `skills` (per-user progress)

Owner-scoped CRUD policies on all user tables; read-only on `achievements`. Achievement unlocking and profile stats updates run automatically on interview completion.

## What's Not Implemented (Scope Limitations)
The original spec included voice (Whisper STT, ElevenLabs/OpenAI TTS), live emotion detection, webcam monitoring, a Monaco coding round, and an admin panel. These require API keys and infrastructure beyond this environment, so the shipped MVP uses a text-based conversational interface instead of voice. The architecture is designed so these can be added as edge-function-backed features without restructuring the app.

## Getting Started
The Supabase project is pre-provisioned — env vars are already set. Sign up at `/register` and start practicing at `/interview/setup`.
