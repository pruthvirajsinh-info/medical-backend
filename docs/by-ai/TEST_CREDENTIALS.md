# Test Credentials & Instructions

## 🩺 Test Accounts

| Role | Email | Password |
| :--- | :--- | :--- |
| **Doctor** | `dr.smith@example.com` | `doctor123` |
| **Patient** | `patient1@example.com` | `password123` |

## 🚀 Setup & Execution

### Backend
1. `npm install`
2. Configure `.env` (DATABASE_URL, DIRECT_URL, JWT_SECRET).
3. `npx prisma migrate dev`
4. `npm run seed` (Crucial for resetting test roles).
5. `npm run dev` (Runs on `http://localhost:4001`)

### Frontend
1. `npm install`
2. `npm run dev` (Runs on `http://localhost:3000`)

## 🧪 Testing Instructions

### 1. Onboarding Flow (Patient)
- Log in as the test patient.
- If not already onboarded, you will be redirected to the 3-step form.
- **Step 1**: Personal Info.
- **Step 2**: Medical Info (Blood type, etc.).
- **Step 3**: Insurance & Doctor Selection (Select "Dr. Smith").
- Click **Finish** to land on the dashboard.

### 2. Clinical Dashboard
- **Patient View**: Displays medical summary and selected doctor details.
- **Doctor View**: Displays a directory of all assigned patients (after logging in as `dr.smith`).

### 3. Real-time Chat
- Open two browser windows (one in Incognito).
- **Window 1 (Patient)**: Click "Start Consultation" on the dashboard.
- **Window 2 (Doctor)**: Click "Begin Session" for the patient.
- Exchange messages and verify real-time delivery and database persistence upon refresh.

### 4. API Documentation
- Visit `http://localhost:4001/api-docs` to view and test Swagger documentation.
