import { Router } from "express";
import { createSecurityBox, getSecurityBoxes } from "./security-box.controller";

const router = Router();

router.post("/", createSecurityBox);
router.get("/:user_id", getSecurityBoxes);

export default router;
