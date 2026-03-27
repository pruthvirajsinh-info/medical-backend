# Rules and Guidelines

*This is a reusable playbook for future builds.*

## 📁 1. Project Setup Rules
- **Monorepo Structure (Optional but Recommended)**: Keep frontend and backend decoupled but within the same overarching parent folder if building single-developer full-stack MVPs.
- **Strict Typing**: TypeScript is mandatory. `strict: true` must be enabled in `tsconfig.json`. Types `any` are banned unless interacting with a completely untyped third-party legacy package.

## 🗂️ 2. Folder Structure Standards
### Backend (Express)
```
/src
  /config       # Environment parsing & DB connection
  /middlewares  # Reusable logic (Auth, Error handling)
  /modules      # Feature-based encapsulation (domain-driven)
    /auth       # -> auth.controller.ts, auth.service.ts, auth.routes.ts
    /chat
  /lib          # Singleton utilities (Socket.io, logger)
```
### Frontend (Next.js App Router)
```
/src
  /app          # Routing & Layouts
  /components   # Dumb UI components
  /hooks        # Custom logic (useSocket, useAuth)
  /store        # Redux formulation & RTK queries
  /lib          # Utils (Tailwind `cn`, formatting)
```

## 🌐 3. API Design Rules
- **RESTful Compliance**: Nouns for endpoints (`/doctors`), verbs only for specific actions (`/onboarding/finalize`).
- **Standardized Responses**: Controller methods should invariably respond in a uniform wrapper:
  `{ success: true, data: ... }` or `{ error: "Message" }`.

## 🔒 4. Auth & RBAC Guidelines
- **Stateless Verification**: Use JWTs containing minimal payload (`userId`, `role`).
- **Middleware Guard**: Protect routes aggressively via a centralized `authenticateUser` middleware that throws 401s on absent tokens.
- **UI Guarding**: The frontend must check `user.role` on the top-level layout of restricted routes, bouncing unauthorized users back to `/login` *before* hitting network requests.

## ⚡ 5. Performance Best Practices
- **DB Queries**: Use Prisma's `select` heavily to prune returned payloads. Avoid `SELECT *` implicit behavior for heavy tables.
- **Frontend Caching**: Utilize RTK Query extensively. Invalidate strictly by `[tag]` to avoid manual state manipulation.

## 🐛 6. Error Handling Patterns
- Never leak stack traces to the client in production.
- Capture asynchronous Express errors using a global error-handling middleware (`app.use((err, req, res, next) => {...})`) utilizing `next(err)`.
