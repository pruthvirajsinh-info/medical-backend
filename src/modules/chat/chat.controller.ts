import type { Request, Response } from "express";
import { ChatService } from "./chat.service";

export class ChatController {
  static async getHistory(req: Request, res: Response) {
    try {
      const { userId } = (req as any).user;
      const { receiverId } = req.params;
      
      const history = await ChatService.getChatHistory(userId, receiverId as string);
      res.json(history);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
}
