# Phase 1: Authentication & User Management

## Goal
Set up the foundational full-stack architecture, implement JWT-based authentication, and handle user registration/login.

## Implementation Steps
1. **Backend Initialization**: scaffolded `medical-backend` using Express and Prisma.
2. **Schema Definition**: Created the `User` model with `email`, `password`, and `role` (PATIENT or DOCTOR) enums.
3. **API Endpoints**: 
   - `POST /auth/register` (password hashing with bcrypt).
   - `POST /auth/login` (JWT token generation).
   - `GET /auth/me` (Protected route yielding the profile).
4. **API Documentation**: Integrated Swagger (`swagger-ui-express`) for easy testing.
5. **Frontend Setup**: Scaffolded Next.js and configured Redux Toolkit.
6. **State Management**: Created `baseApi` and `authApi` for RTK Query, and `authSlice` to persist JWT tokens.
7. **Auth UI**: Built responsive `/login` and `/signup` pages with Zod validation.

## Key Learnings & Nuances
- **Global Error Handling**: Consistent error responses from the backend simplify RTK Query error unwrapping on the frontend.
- **Form Validation**: `react-hook-form` coupled with `@hookform/resolvers/zod` provides a highly robust validation pipeline before network requests are even fired. 
