import { Router } from "express";
import { CredentialController } from "../../presentation/credential/credential.controller";
import { CredentialStorageService } from "../../presentation/services/credential.service";

export class CredentialRouter {
    static get routes(): Router {
        const router = Router();
        const service = new CredentialStorageService();
        const controller = new CredentialController(service);

        // Se pasa la función con una arrow function para evitar problemas con 'this'
        router.post("/", (req, res) => controller.create(req, res));
        router.put("/:id", (req, res) => controller.update(req, res));

        return router;
    }
}
