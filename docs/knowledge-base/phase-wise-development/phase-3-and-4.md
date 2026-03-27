# Phase 3 & 4: Dashboard & Real-Time Chat

## Goal
Implement role-specific dashboard views and a secure, real-time consultation messaging interface.

## Implementation Steps (Dashboards)
1. **Backend `getMe` Enhancement**: Modified `AuthService.getMe` to meticulously `include` nested relationships (e.g., retrieving the `assignedDoctor` for a patient, and `assignedPatients` for a doctor).
2. **UI Routing State**: `DashboardPage` dynamically branches rendering logic based on `user.role === "PATIENT"`.
3. **Redirection Safeguards**: Implemented `useEffect` hooks to redirect unauthenticated or un-onboarded users (e.g., `user.role === "PATIENT" && !user.patient -> /onboarding`).

## Implementation Steps (Socket.io Chat)
1. **Schema Addition**: Added `Message` model (`senderId`, `receiverId`, `content`).
2. **Socket Initialization**: Configured `socket.io` on the backend HTTP server.
3. **JWT Handshake**:
```typescript
io.use((socket, next) => {
   const token = socket.handshake.auth.token;
   const decoded = jwt.verify(token, JWT_SECRET);
   socket.data.user = decoded; // Bind identity
   next();
});
```
4. **Room Isolation**: Formatted deterministic room IDs (`[userIdA, userIdB].sort().join("_")`) and utilized `io.to(roomId).emit` for point-to-point delivery.
5. **Database Persistence**: Integrated `ChatService.saveMessage()` into the `send_message` event handler.
6. **Frontend Hook**: Created `useSocket` to manage the singleton connection, listening for `receive_message` and returning a `sendMessage` callback.
