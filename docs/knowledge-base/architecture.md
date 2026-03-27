# System Architecture

## 📐 System Design
The platform utilizes a monolithic backend service communicating with a Next.js front-end SPA. The database is a managed PostgreSQL instance on Supabase.

### Data Flow
1. **Authentication**: Client sends credentials -> API validates via Prisma/Bcrypt -> Returns JWT.
2. **State Hydration**: Client retrieves JWT from `localStorage` -> RTK Query fetches `/auth/me` -> Redux populates the `User` context.
3. **Real-Time Chat**: Client initializes `socket.io-client` with JWT -> Server verifies JWT -> Client emits events -> Server persists via `ChatService` -> Server broadcasts to isolated room.

## ⚙️ Backend Architecture (Express)
The backend employs a modular, feature-based directory structure to ensure high cohesion and loose coupling.

### Key Modules:
- **Auth Module** (`/auth/*`): Handles registration, login, and the `getMe` endpoint for profile retrieval (including nested doctor/patient relations).
- **Onboarding Module** (`/onboarding/*`): Manages the 3-step draft process via `OnboardingDraft` and finalizes the `Patient` profile creation.
- **Doctor Module** (`/doctors/*`): Provides public indexing of available doctors for patient selection.
- **Chat Module** (`/chat/*`): Provides historical message retrieval endpoints.

### Real-Time Layer (`lib/io.ts`)
Wraps the core HTTP server. Utilizes middleware to decode JWTs from handshake headers, ensuring strict authorization before permitting socket connections to user-specific rooms.

## 🖥️ Frontend Architecture (Next.js)
Built heavily around client-side interactivity using the `use client` directive.

### Core Components:
- **Redux Store**: The central nervous system for API data caching and global auth state.
- **RTK Query Endpoints**: `authApi`, `onboardingApi`, and `chatApi` handle all network requests, cache invalidation (e.g., invalidating `User` tag on login), and loading states.
- **Dashboard Dynamic Routing**: A single page (`/dashboard/page.tsx`) that conditionally renders entire view hierarchies based on the Redux `Role` state.
- **Socket Custom Hook**: `useSocket.ts` abstracting connection lifecycle and event emission logic away from the UI components.
