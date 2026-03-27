# Reusable Project Template

Use this blueprint when starting a completely new full-stack endeavor parallel to this platform.

## 📦 1. Initial Setup Steps

### Backend
```bash
mkdir backend && cd backend
npm init -y
npm install express cors dotenv helmet pino prisma @prisma/client
npm install -D typescript @types/node @types/express tsx
npx tsc --init
npx prisma init
```

### Frontend
```bash
npx create-next-app@latest frontend --typescript --tailwind --eslint
cd frontend
npm install @reduxjs/toolkit react-redux react-hook-form @hookform/resolvers zod lucide-react framer-motion
```

## 🗂️ 2. Base Boilerplate Configs

### Backend: `src/app.ts` Base
```typescript
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

app.get('/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

### Backend: `tsconfig.json` Boilerplate for Node + TSX Server
```json
{
  "compilerOptions": {
    "module": "ESNext",
    "moduleResolution": "bundler",
    "target": "ES2023",
    "strict": true,
    "esModuleInterop": true,
    "rootDir": "./",
    "outDir": "./dist"
  }
}
```
*Note: Using this config implies you heavily rely on `tsx` to run the code, bypassing pure `tsc` ESM limitations.*

### Frontend: Global Store Provider `StoreProvider.tsx`
```tsx
'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '../store'

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    storeRef.current = makeStore()
  }
  return <Provider store={storeRef.current}>{children}</Provider>
}
```

## 🚀 3. Recommended Stack Formula
When starting a modern SaaS or Platform requiring high data turnover and realtime needs:
- Web Framework: **Next.js (App Router)**
- Styling: **Tailwind CSS + shadcn/ui**
- Server API: **Express + TRPC (or RTK Query)**
- State: **Redux Toolkit**
- Database: **Supabase (PostgreSQL)**
- ORM: **Prisma**
- Realtime: **Socket.io** (Self-hosted) or **Supabase Realtime** (Managed)
