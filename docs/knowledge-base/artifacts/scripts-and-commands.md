# Scripts and Commands Hub

## Development Commands

### Backend
```bash
# Starts the backend auto-reloading environment using TSX
npm run dev

# Starts fresh database from schema
npx prisma db push

# Create a migration history record
npx prisma migrate dev --name init

# Generate the type-safe client based on current schema.prisma
# (MUST be run if schema changes)
npx prisma generate

# Execute seeding script to dump mock test users (Dr. Smith, Patient1)
npm run seed
```

### Frontend
```bash
# Starts the Next.js Turbo dev environment
npm run dev
```

## Production Building Paths

### Rendering the Backend (CI/CD Pipeline)
When deploying a Next.js/Express system where `typescript` is required contextually (e.g. Render, Vercel, Heroku).

```json
  // medical-backend/package.json
  "scripts": {
    "start": "tsx src/app.ts",
    "build": "npm install && npx prisma generate && npx tsc",
  }
```

*Nuance*: Note that the backend deployment leverages `tsx` directly in `start` to natively evaluate `.ts` files rather than fighting raw Node.js ESM `.js` extension logic.

### Building the Frontend
```bash
npm run build
npm run start
```

## Package Installs Reference

### Auth & Security (Backend)
```bash
npm i jsonwebtoken bcryptjs helmet cors zod
npm i -D @types/jsonwebtoken @types/bcryptjs @types/cors
```

### Database Control
```bash
npm i @prisma/client @prisma/adapter-pg pg
npm i -D prisma @types/pg
```

### Frontend Data & Styling
```bash
npm i @reduxjs/toolkit react-redux
npm i react-hook-form @hookform/resolvers zod
npm i framer-motion lucide-react
npm i socket.io-client
```
