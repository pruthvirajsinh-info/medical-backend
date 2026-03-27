import { Router } from "express";
import { OnboardingController } from "./onboarding.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);
router.get("/draft", OnboardingController.getDraft);
router.put("/draft", OnboardingController.updateDraft);
router.post("/submit", OnboardingController.submit);

export default router;
