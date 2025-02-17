import { Router } from "express";
import { createCredential, getCredentials } from "./credential.controller";

const router = Router();

router.post("/", createCredential);
router.get("/:security_box_id", getCredentials);

export default router;
