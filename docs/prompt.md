# frd

## requirements

- Patient Onboarding & Doctor Chat System
- Frontend: Next.js + TypeScript + Tailwind CSS
- Backend: Node.js + Express + tsx + Prisma
- DB: PostgreSQL (managed via Prisma)
- Authentication: Custom JWT-based (no 3rd party) with Patient & Doctor roles
- Onboarding: 3-step form (Personal, Medical, Insurance) with draft saving
- Real-time Chat: Socket.io between patients and assigned doctors

### unclear requirements

- Specific "draft saving" mechanism: Should it be auto-save on every change or a "Save Draft" button?
- "Preferred Doctor" assignment: Should any doctor be available for any patient, or is there a capacity limit?
- Socket.io scaling: Do we need a Redis adapter for potential multi-node deployment? (Assume single node for now)

## db

### tables

1. **users**
   - id, email, password, role (enum: PATIENT, DOCTOR), created_at, updated_at
2. **doctors**
   - id, user_id (FK), specialization, bio, availability_status
3. **onboarding_data** (Storing drafts and final data)
   - id, patient_id (FK), step_1_data (JSON), step_2_data (JSON), step_3_data (JSON), current_step, status (enum: DRAFT, COMPLETED)
4. **patients** (Final profile once onboarded)
   - id, user_id (FK), assigned_doctor_id (FK), full_name, dob, gender, phone, emergency_contact_name, emergency_contact_phone, blood_type, current_medications, allergies, chronic_conditions, surgeries, family_history, insurance_provider, insurance_id, policy_holder_name, preferred_time_slot, referral_source, additional_notes
5. **messages**
   - id, sender_id (FK), receiver_id (FK), content, read_at, created_at
6. **chat_rooms**
   - id, patient_id (FK), doctor_id (FK), created_at

# backend

- Middleware: `authMiddleware`, `roleMiddleware`, `errorMiddleware`, `loggingMiddleware` (pino)
- Modules:
  - `auth`: signup, login, me
  - `onboarding`: save draft, get draft, submit onboarding
  - `doctors`: list doctors (for selection)
  - `patients`: get profile, list assigned patients (for doctors)
  - `chat`: get conversation history, mark as read
- Socket.io:
  - Events: `join_room`, `send_message`, `receive_message`, `typing`, `online_status`
- Libs:
  - express, prisma, socket.io, pino, cors, helmet, jsonwebtoken, bcryptjs, zod, tsx, dotenv

# frontend

- Layout: Header (Logo, User Profile/Logout), Protected Routes
- Pages:
  - Auth: `/login`, `/signup`
  - Onboarding: `/onboarding` (Multi-step with transitions and persistence)
  - Dashboard:
    - Patient: `/dashboard` (Chat with assigned doctor, profile summary)
    - Doctor: `/doctor/dashboard` (List of assigned patients)
  - Chat: `/chat/:room_id` (Real-time interface)
- Libs:
  - reduxjs/toolkit (State management), tailwindcss (Styling), react-hook-form (Forms), zod (Validation), socket.io-client, lucide-react (Icons), shadcn/ui (UI Components), framer-motion (Animations), axios/rtk-query (API)

# rules:

- search for latest stable dependencies versions and check for latest docs and configuration.
- first discuss with me about library and dependencies with its skills and commands and then about table columns for backend and then each form fields in frontend with its validations and then unclear requirments or any gaps
- dont add any library or dependencies without my permission
- make plan, discuss with me, ask que with options like a,b,c.. before any implemntation
- check build errors for backend and frontend and fix them before moving to next step
- make seeders for each table at each phases
- give me steps for manual testing after each step
- i want git commit for diff steps and manual testing before each step so after complete one step give me steps for testing

# submission requirements:

## 1. Documentation Files
- **DECISIONS.md**: Documenting Authentication implementation, Form state & draft saving approach, Socket.io architecture, Database schema design, and Trade-offs/Assumptions.
- **TEST_CREDENTIALS.md**: Including Supabase project access, Test accounts for doctors and patients, and Testing instructions.
- **README.md**: Comprehensive setup instructions.
- **.env.example**: Template for environment variables.

## 2. Code & Database
- **Complete Source Code**: Clean, modular, and type-safe.
- **/db/schema.sql**: Containing the full database schema and seed data for initial setup.

## 3. Delivery
- **GitHub Repository**: Finalized repository with all history.
- **Screen Recording**: A complete, unedited 2-hour session showing the development/demo process.
- **Deployed Application**: Working URL of the hosted application.

## temp

Patient	patient1@example.com	password123
Doctor	dr.smith@example.com	doctor123