import { Server as SocketServer } from "socket.io";
import { Server as HttpServer } from "http";
import jwt from "jsonwebtoken";
import { ChatService } from "../modules/chat/chat.service";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export function setupSocket(server: HttpServer) {
  const io = new SocketServer(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  // Authentication Middleware
  io.use((socket, next) => {
    const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.split(" ")[1];
    
    if (!token) {
      return next(new Error("Authentication error: No token provided"));
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; role: string };
      socket.data.user = decoded;
      next();
    } catch (err) {
      next(new Error("Authentication error: Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    const { userId, role } = socket.data.user;
    console.log(`User connected: ${userId} (${role})`);

    // Join a private room for direct messages
    // If it's a patient, they join a room named after their ID.
    // Both patient and their assigned doctor will join this room.
    // Or we can just use userId as the room name.
    socket.join(userId);

    socket.on("join_chat", (receiverId: string) => {
      // Logic to join a shared room between two users
      const roomId = [userId, receiverId].sort().join("_");
      socket.join(roomId);
      console.log(`User ${userId} joined room ${roomId}`);
    });

    socket.on("send_message", async (data: { receiverId: string; content: string }) => {
      const { receiverId, content } = data;
      const roomId = [userId, receiverId].sort().join("_");
      
      try {
        // Persist to DB
        const savedMsg = await ChatService.saveMessage(userId, receiverId, content);
        
        // Emit to the room
        io.to(roomId).emit("receive_message", {
          id: savedMsg.id,
          senderId: userId,
          content,
          createdAt: savedMsg.createdAt,
        });
      } catch (err) {
        console.error("Error saving message:", err);
        socket.emit("error", { message: "Failed to send message" });
      }
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${userId}`);
    });
  });

  return io;
}
