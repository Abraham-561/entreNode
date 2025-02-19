import { Router } from "express";
import { UserController } from "../../presentation/user/user.controller";

const router = Router();

router.post("/", UserController.createUser);
router.get("/:id", UserController.getUser);

export default router;
