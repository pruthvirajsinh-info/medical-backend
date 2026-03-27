import { Router } from "express";
import { ChatController } from "./chat.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

/**
 * @swagger
 * /chat/history/{receiverId}:
 *   get:
 *     summary: Get chat history between two users
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: receiverId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of messages
 */
router.get("/history/:receiverId", authMiddleware, ChatController.getHistory);

export default router;
