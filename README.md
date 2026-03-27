# Medical Consultation Platform - Backend API

This repository contains the Node.js / Express backend for the Medical Consultation Platform. It handles authentication, real-time socket communication, and interfacing with a PostgreSQL database via Prisma ORM.

## 🚀 Tech Stack
- **Framework**: Express.js (TypeScript)
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Real-time**: Socket.io
- **Security**: JWT, Bcrypt, Helmet, CORS
- **Documentation**: Swagger UI

---

## 💻 Local Setup Instructions

### 1. Prerequisites
- **Node.js**: v18 or explicitly v22+
- **PostgreSQL**: A running instance (local or hosted via Supabase/Neon).

### 2. Installation
Clone the repository and install the dependencies:
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory and add the following:

```env
# Server Configuration
PORT=4001

# JWT Secret for Authentication
JWT_SECRET="YOUR_SUPER_SECRET_KEY_HERE"

# Database Connections (Update with your specific PostgreSQL credentials)
# A transaction pooled connection string (optional, but highly recommended for Supabase)
DATABASE_URL="postgres://user:password@host:6543/postgres?pgbouncer=true&connection_limit=1"

# A direct, session-based connection string (Required for Prisma Migrations)
DIRECT_URL="postgres://user:password@host:5432/postgres"
```

### 4. Database Initialization
Run the following commands to construct your database schema and populate it with test data:

```bash
# Push the schema to your database
npx prisma db push

# Generate the Prisma Client
npx prisma generate

# Seed the database with mock accounts (Patient and Doctor)
npm run seed
```

### 5. Running the Development Server
Start the local server using `tsx`:
```bash
npm run dev
```

The server should now be running at `http://localhost:4001`.

---

## 🧪 Testing & API Documentation

Once the server is running, navigate to the Swagger UI interactive documentation:
👉 **[http://localhost:4001/api-docs](http://localhost:4001/api-docs)**

### Test Credentials (Created via `npm run seed`)
| Role | Email | Password |
| :--- | :--- | :--- |
| **Doctor** | `dr.smith@example.com` | `doctor123` |
| **Patient** | `patient1@example.com` | `password123` |

---

## 📜 Available Scripts

- `npm run dev` - Starts the development server with hot-reload via `tsx`.
- `npm run build` - Performs `npm install`, generates the Prisma client, and compiles TS to JS.
- `npm start` - Starts the production server using `tsx`.
- `npm run seed` - Re-seeds the database with default profiles.