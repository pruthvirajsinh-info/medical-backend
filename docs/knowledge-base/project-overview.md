# Medical Consultation Platform - Project Overview

## 🎯 Project Goal
To build a full-stack, real-time Medical Consultation Platform where patients can complete a multi-step onboarding process, select a doctor, and engage in real-time chat consultations. Doctors have a dedicated view to manage their assigned patient cases.

## 🛠️ Tech Stack
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL (hosted on Supabase)
- **ORM**: Prisma
- **Frontend**: Next.js (App Router), React, Tailwind CSS
- **State Management**: Redux Toolkit & RTK Query
- **Real-time Communication**: Socket.io
- **Form Handling & Validation**: React Hook Form, Zod
- **Animations**: Framer Motion
- **API Documentation**: Swagger (swagger-ui-express, swagger-jsdoc)

## 🏗️ High-Level Architecture
The system follows a modern client-server architecture:
1. **Client**: A robust Next.js frontend utilizing Redux for global state and RTK Query for data fetching and caching. It handles complex, multi-step forms with persistent local drafts.
2. **REST API**: An Express-based backend serving JSON responses. It uses controllers and services to separate HTTP logic from business logic.
3. **Database Layer**: Prisma ORM interacts with the PostgreSQL database, ensuring type safety from schema to query.
4. **WebSocket Server**: Integrated alongside the Express server, Socket.io manages dedicated rooms based on `userId` to enable end-to-end encrypted, real-time messaging between patients and doctors.

## ✨ Key Features
- **Role-Based Access Control (RBAC)**: Distinct dashboards and permissions for `PATIENT` and `DOCTOR` roles.
- **Resilient Onboarding**: A 3-step form wizard that persists data to the database at each step, preventing data loss.
- **Real-Time Consultations**: Encrypted, instant messaging with message history persistence.
- **Data Hydration**: JWT authentication combined with Redux initialization to seamlessly restore user sessions.
- **Premium UI**: Custom styling with deep blacks, vibrant blues, and smooth Framer Motion micro-interactions.
