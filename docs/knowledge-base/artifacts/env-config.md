# Environment Configurations

## Backend (`medical-backend/.env`)

```env
# Server Port
PORT=4001

# --- Supabase PostgreSQL Database ---
# The pooled connection string (Transaction Mode)
# Used heavily for regular API querying to avoid connection limit exhaustion.
# Appends ?pgbouncer=true&connection_limit=1
DATABASE_URL="postgres://[user]:[password]@[host]:6543/postgres?pgbouncer=true&connection_limit=1"

# The direct connection string (Session Mode)
# Mandatory for Prisma schema and migration execution (`npx prisma migrate`).
# Operates on the direct port (e.g., 5432).
DIRECT_URL="postgres://[user]:[password]@[host]:5432/postgres"

# --- Security ---
# Secret key used to statically sign and decode JWTs.
JWT_SECRET="YOUR_SUPER_SECRET_STRONG_KEY"
```

## Frontend (`medical-frontend/.env.local` or `.env`)

```env
# The target API for standard REST requests
NEXT_PUBLIC_API_URL="http://localhost:4001"

# The target API for the Socket.io negotiation protocol
NEXT_PUBLIC_SOCKET_URL="http://localhost:4001"
```

### Important Nuances
- **`NEXT_PUBLIC_` Prefix**: Mandatory for Next.js to expose the variable securely to client-side bundles. Without it, the variable only exists on the physical server during Server-Side Rendering (SSR).
