import { Router } from "express";
import { createPin, getPins } from "./pin.controller";

const router = Router();

router.post("/", createPin);
router.get("/:userId", getPins);

export default router;
