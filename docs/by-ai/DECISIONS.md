# Architectural Decisions & Trade-offs

## 1. Authentication Implementation
- **Approach**: Used JWT-based authentication with a custom Express middleware.
- **Rationale**: Standard, stateless, and scalable. Integrated with Socket.io for a consistent security model across HTTP and WebSockets.
- **Trade-off**: For simplicity in this interview project, tokens are stored in `localStorage` and managed via a Redux `authSlice`. In a production environment with sensitive medical data, sliding sessions or HTTP-only cookies would be preferred to mitigate XSS risks.

## 2. Onboarding Flow & Draft Saving
- **Approach**: Implemented a JSON-based draft saving mechanism in the database (`OnboardingDraft` model).
- **Rationale**: High flexibility for changing form structures without migrations. Data is persisted on every "Next" step, allowing users to resume from where they left off.
- **Validation**: Frontend uses `zod` and `react-hook-form` for real-time feedback; backend performs final validation upon submission.

## 3. Socket.io Architecture
- **Approach**: Room-based isolation using a deterministic room ID: `[userId1, userId2].sort().join("_")`.
- **Rationale**: Ensures that a patient and their assigned doctor always join the same unique, private communication channel.
- **Handshake**: Secured via a JWT handshake to ensure only authenticated users can connect.

## 4. Database Schema Design (Prisma)
- **Approach**: Relational design with `User`, `Patient`, `Doctor`, and `Message` models.
- **Relationships**: 
  - One-to-one between `User` and `Patient`/`Doctor`.
  - One-to-many between `Doctor` and assigned `Patient`s.
  - Many-to-many (effectively) for `Message` between any two `User`s.
- **Trade-off**: Used UUIDs for primary keys to prevent ID enumeration (important for privacy).

## 5. UI/UX & Design Choices
- **Theme**: Premium "Medical Blue" aesthetic using Tailwind CSS & Framer Motion.
- **Decision**: Forced all input text to black (#111827) to ensure readability across all browser defaults.
- **Accessibility**: Required fields are clearly marked with `*` and custom validation messages appear below inputs instead of browser-native tooltips.
