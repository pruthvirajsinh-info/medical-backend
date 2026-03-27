# Errors and Solutions Log

## 1. Authentication Redirection Loop
- **Context**: Occurred after successfully submitting the login form. The UI routed to `/dashboard`, flashed momentarily, and bounced back to `/login`.
- **Root Cause**: The RTK Query state for the `User` profile was cached in an "unauthorized" error state prior to login. Navigating to the dashboard instantly triggered the `isLoading === false && isError === true` redirect before the fresh token could fetch the real profile.
- **Fix**: 
  1. Updated `authApi.ts` mutations (`login`, `register`) to include `invalidatesTags: ["User"]`. 
  2. Modified the Dashboard `useEffect` to require both `!isLoading && (isError || !user)` to safely trigger the bounce.
- **Prevention Tip**: Always map tag invalidations on data-mutating endpoints to ensure cache integrity across views.

## 2. Prisma Import Failure in Production (Render)
- **Context**: `npm run build` failed on Render with `prisma: not found`.
- **Root Cause**: `prisma`, `typescript`, and `@types/node` were placed in `devDependencies` in `package.json`. Render aggressively prunes devDependencies *before* running custom build scripts, removing the compilers.
- **Fix**: Shifted `prisma` and `typescript` into `dependencies`. Updated `build` script to explicitly invoke `npx prisma generate` to guarantee schema syncing prior to `npx tsc`.
- **Prevention Tip**: In Docker/PaaS pipelines that do not use multi-stage builds, essential code-generation tools must be retained in `dependencies`.

## 3. Node.js ESM Import Resolution (`ERR_MODULE_NOT_FOUND`)
- **Context**: Backend build succeeded, but starting `node dist/src/app.js` crashed looking for `./lib/io`.
- **Root Cause**: `package.json` had `"type": "module"`. However, pure `tsc` was configured with `moduleResolution: "bundler"`. Because no actual bundler (like Webpack/Rollup) was synthesizing the files, Node.js strictly required file extensions (`./lib/io.js`).
- **Fix**: Bypassed pure Extension rewriting by leveraging `tsx` (TypeScript Execute) for the production `start` script, assigning execution responsibility to a tool that natively resolves extensionless imports.
- **Prevention Tip**: When combining `"type": "module"` with pure `tsc` targeting Node, avoid `moduleResolution: bundler` and instead use `NodeNext` (while forcing `.js` extensions manually in your code). Or, use `tsx` in production.

## 4. Chat Room ID Mismatch 
- **Context**: A Patient sent a message to a Doctor, but the Doctor's client did not receive it via Socket.io.
- **Root Cause**: The Patient initialized the chat routing via `/chat/${doctor.id}` (table PK), while the Doctor joined using `/chat/${patient.userId}`. The `.sort().join("_")` logic subsequently generated two distinct, non-overlapping room hashes.
- **Fix**: Enforced a strict standard across the UI to *only* distribute and route via `userId`. Modified the `getMe` service to yield `assignedDoctor: { include: { user: true } }` so the frontend definitively had access to the doctor's `userId`.
- **Prevention Tip**: Always use the underlying identity/authentication ID (`userId`) for generic communication logic rather than role-specific relational IDs.
