import { Router } from "express";
import { SecurityBoxController } from "../security-box/security-box.controller";
import { SecurityBoxService } from "../services/security-box.service";
import { AuthMiddleware } from "../middleware/auth.middleware";

export class SecurityBoxRouter {
    static get routes(): Router {
        const router = Router();
        const securityBoxService = new SecurityBoxService();
        const securityBoxController = new SecurityBoxController(securityBoxService);

        router.use(AuthMiddleware.protect);

        router.get("/", securityBoxController.findAll);
        router.get("/:id", securityBoxController.findOne);
        router.post("/", securityBoxController.create);
        router.patch("/:id", securityBoxController.update);
        router.delete("/:id", securityBoxController.delete);

        return router;
    }
}

