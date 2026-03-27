import prisma from "../../lib/prisma";

export class ChatService {
  static async saveMessage(senderId: string, receiverId: string, content: string) {
    return prisma.message.create({
      data: {
        senderId,
        receiverId,
        content,
      },
      include: {
        sender: {
          select: { email: true }
        }
      }
    });
  }

  static async getChatHistory(user1Id: string, user2Id: string) {
    return prisma.message.findMany({
      where: {
        OR: [
          { senderId: user1Id, receiverId: user2Id },
          { senderId: user2Id, receiverId: user1Id },
        ],
      },
      orderBy: {
        createdAt: "asc",
      },
      include: {
        sender: {
          select: { email: true }
        }
      }
    });
  }
}
