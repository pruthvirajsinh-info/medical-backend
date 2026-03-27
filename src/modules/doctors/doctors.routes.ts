import { Router } from "express";
import { DoctorController } from "./doctors.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.get("/", authMiddleware, DoctorController.list);

export default router;
