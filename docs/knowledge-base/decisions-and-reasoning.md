# Decisions and Reasoning

## 1. ORM Selection: Prisma over TypeORM/Sequelize
- **Reasoning**: Prisma provides a fully type-safe database client (`PrismaClient`), which integrates perfectly with TypeScript. Its generated client minimizes runtime errors by catching invalid queries at compile time.
- **Alternatives Considered**: TypeORM (requires heavier boilerplate and decorators), Raw SQL with pg (lacks typing, tedious query building).
- **Trade-off**: Prisma's introspection and query engine have an overhead payload, but for this medium-complexity medical app, development speed and safety heavily outbalance the tiny engine weight.

## 2. Onboarding Persistence: JSON DB Drafts
- **Reasoning**: The 3-step onboarding form is long. If a user drops off at step 2, they shouldn't start over. I created an `OnboardingDraft` table featuring a `JSONB` column to dump raw form data per step.
- **Trade-off**: Validating pure JSON is harder at the DB constraint layer, but since the frontend uses strictly typed Zod validation before saving the payload, the JSON draft is reliably well-formed. Upon completing Step 3, the JSON is securely mapped into the strict `Patient` relational model.

## 3. Real-time Infrastructure: Socket.io
- **Reasoning**: Socket.io provides automatic reconnections, multiplexing (rooms/namespaces), and a fallback to HTTP long-polling if WebSockets are blocked by proxies.
- **Alternatives Considered**: Native WebSockets (too raw, lacks rooms and auto-reconnects), Pusher/Ably (third-party dependency; desired self-hosting for medical data privacy).
- **Security**: The initial handshake is intercepted and verified against the `JWT_SECRET` prior to upgrading the connection.

## 4. UI Library: Tailwind CSS & Framer Motion
- **Reasoning**: Tailwind provides rapid, responsive styling without context-switching to CSS files. Framer Motion provides physics-based, declarative animations (like the step transitions in the onboarding wizard) that feel incredibly premium.
- **Trade-off**: Tailwind HTML can get verbose, but this is mitigated by isolating common UI elements directly into reusable React Components.

## 5. Deployment Fix: `tsx` for Production Run
- **Reasoning**: We hit a snag deploying the TypeScript backend to Render because `tsc` under `moduleResolution: bundler` does not emit `.js` file extensions. Standard Node.js ESM loader rejects extensionless relative imports. Using `tsx` at runtime natively evaluates extensionless imports without requiring a heavy re-write of all `import` statements.
