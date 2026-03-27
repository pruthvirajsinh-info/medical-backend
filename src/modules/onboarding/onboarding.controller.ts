import type { Response } from "express";
import { OnboardingService } from "./onboarding.service";

export class OnboardingController {
  /**
   * @swagger
   * /onboarding/draft:
   *   get:
   *     summary: Get user's onboarding draft
   *     tags: [Onboarding]
   *     security: [{ bearerAuth: [] }]
   *     responses:
   *       200:
   *         description: Draft retrieved
   */
  static async getDraft(req: any, res: Response) {
    try {
      const draft = await OnboardingService.getDraft(req.user.userId);
      res.status(200).json(draft);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  /**
   * @swagger
   * /onboarding/draft:
   *   put:
   *     summary: Update onboarding draft
   *     tags: [Onboarding]
   *     security: [{ bearerAuth: [] }]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               step: { type: number, minimum: 1, maximum: 3 }
   *               data: { type: object }
   *     responses:
   *       200:
   *         description: Draft updated
   */
  static async updateDraft(req: any, res: Response) {
    try {
      const { step, data } = req.body;
      const draft = await OnboardingService.updateDraft(req.user.userId, step, data);
      res.status(200).json(draft);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  /**
   * @swagger
   * /onboarding/submit:
   *   post:
   *     summary: Submit final onboarding
   *     tags: [Onboarding]
   *     security: [{ bearerAuth: [] }]
   *     responses:
   *       201:
   *         description: Onboarding submitted successfully
   */
  static async submit(req: any, res: Response) {
    try {
      const patient = await OnboardingService.submit(req.user.userId);
      res.status(201).json(patient);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
