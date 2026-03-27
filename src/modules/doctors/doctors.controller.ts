import type { Request, Response } from "express";
import { DoctorService } from "./doctors.service";

export class DoctorController {
  /**
   * @swagger
   * /doctors:
   *   get:
   *     summary: List all doctors
   *     tags: [Doctors]
   *     responses:
   *       200:
   *         description: Doctors list retrieved
   */
  static async list(req: Request, res: Response) {
    try {
      const doctors = await DoctorService.listDoctors();
      res.status(200).json(doctors);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
