import { Router } from "express";
import { PinController } from "../../presentation/pin/pin.controller";
import { PinService } from "../services/pin.service";
import { AuthMiddleware } from "../middleware/auth.middleware";

export class PinRouter {
    static get routes(): Router {
        const router = Router();
        const pinService = new PinService();
        const pinController = new PinController(pinService);

        router.use(AuthMiddleware.protect); // Middleware de autenticación

        // 🔹 Aquí se asegura que `this` en `pinController` esté correctamente ligado
        router.post("/", pinController.create.bind(pinController));
        router.patch("/", pinController.update.bind(pinController));
        router.post("/validate", pinController.validate.bind(pinController));

        return router; // 🔹 Faltaba cerrar correctamente el método
    }
}

