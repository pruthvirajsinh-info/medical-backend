Assignment: Patient Onboarding & Doctor Chat System
Build a healthcare application where patients complete an onboarding form and can chat with their assigned doctor in real-time.

Scenario
New patients visit the platform and complete a three-step onboarding process capturing their personal information, medical history, and insurance details. Once onboarded, they are assigned to a doctor and can communicate via real-time chat. Doctors can see their assigned patients and chat with them.

What to Build
Authentication System Build custom JWT-based authentication supporting patient and doctor roles. No third-party auth services allowed (no Clerk, Firebase Auth, NextAuth, etc). Implement signup, login, and protected routes with secure password hashing.

3-Step Onboarding Form Multi-step form with progress tracking, draft saving capability, and validation. Patients should be able to save and resume later. Show summary before final submission.

Real-Time Chat Socket.io-based messaging between assigned patient-doctor pairs. Include message persistence, typing indicators, online/offline status, and unread counts. Ensure proper room isolation.

Database Design Create complete schema in Supabase with proper relationships, constraints, and seed data.

Form Fields
Step
Field Name
Type
Notes
Step 1: Personal
Full Name
Text
Required, min 2 words

Date of Birth
Date
Required, 18+ years

Gender
Dropdown
Male/Female/Other/Prefer not to say

Phone Number
Text
Required, format validation

Emergency Contact Name
Text
Required

Emergency Contact Phone
Text
Required
Step 2: Medical
Blood Type
Dropdown
A+, A-, B+, B-, O+, O-, AB+, AB-, Unknown

Current Medications
Textarea
Optional, max 500 chars

Known Allergies
Multi-select
Penicillin, Aspirin, Sulfa, Latex, Shellfish, None, Other

Chronic Conditions
Checkboxes
Diabetes, Hypertension, Asthma, Heart Disease, Arthritis, None

Previous Surgeries
Textarea
Optional

Family Medical History
Textarea
Optional, max 300 chars
Step 3: Insurance
Insurance Provider
Text
Required

Insurance ID
Text
Required

Policy Holder Name
Text
Required

Preferred Doctor
Dropdown
From database, required

Preferred Time Slot
Radio
Morning/Afternoon/Evening

Referral Source
Dropdown
Google, Friend, Doctor Referral, Ad, Other

Additional Notes
Textarea
Optional, max 200 chars

Submission Requirements
1. GitHub Repository with:

Complete source code
README.md with setup instructions
.env.example
/db/schema.sql with schema and seed data
DECISIONS.md explaining your approach
2. DECISIONS.md documenting:

Authentication implementation
Form state and draft saving approach
Socket.io architecture
Database schema design
Trade-offs and assumptions made
3. TEST_CREDENTIALS.md with:

Supabase project access
Test accounts for doctor and patient
Testing instructions
4. Screen Recording

Upload to Google Drive with view permissions
Complete 2-hour session, unedited
5. Deployed Application

Working URL

You may use AI tools for coding assistants 