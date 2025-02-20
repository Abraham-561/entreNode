import { Router } from "express";



import { CredentialController} from "../../presentation/credential/credential.controller";
import { CredentialStorageService } from "../../presentation/services/credential.service"

const router = Router();
const service = new CredentialStorageService();
const controller = new CredentialController(service);

router.post("/", controller.create);
router.put("/:id", controller.update);

export default router;


