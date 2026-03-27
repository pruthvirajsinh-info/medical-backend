# File & Folder Structure

## 🌐 Root Workspace Space
```
/projects/interview
  /medical-backend    # Node.js/Express API
  /medical-frontend   # Next.js SPA
  /docs               # Architecture, Plans, Knowledge Base
```

---

## 🏗️ Backend (`medical-backend`)
```
/src
  /config
    swagger.ts        # OpenAPI Specification definitions
  /lib
    prisma.ts         # Prisma Client Singleton Instantiation
    io.ts             # Socket.io Lifecycle & Handshake Logic
  /middlewares
    auth.middleware.ts# JWT Decoding & Request Augmentation
  /modules
    /auth             # Registration, Login, Profile resolution
    /chat             # Message history & DB polling
    /doctors          # Provider directory listings
    /onboarding       # Drafts and Patient formulation
      onboarding.routes.ts
      onboarding.controller.ts
      onboarding.service.ts
      onboarding.schema.ts    # Zod backend validators
  app.ts              # Express initialization & Pipeline
  seed.ts             # Test accounts and mock data population
```

---

## 🖥️ Frontend (`medical-frontend`)
```
/src
  /app
    /(auth)           # Route grouping for /login & /signup
    /chat/[id]        # Realtime dynamic chat view
    /dashboard        # Main authenticated view (Role-branched rendering)
    /onboarding       # Step-based wizard form
    layout.tsx        # Global HTML wrapper
  /hooks
    useSocket.ts      # Abstracted Socket.io bindings & event listeners
  /lib
    utils.ts          # Tailwind class merger (`cn()`)
  /providers
    StoreProvider.tsx # Redux Context boundaries
  /store
    /api
      baseApi.ts      # RTK Query foundational injection point
      authApi.ts      # Endpoints for auth and token hydration
      chatApi.ts      # Historical messages fetching
      onboardingApi.ts# Draft persistence caching
    /slices
      authSlice.ts    # Synchronous state management for Tokens/Auth
    index.ts          # Redux Toolkit ConfigureStore
```
