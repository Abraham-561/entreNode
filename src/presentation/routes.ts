import { Router } from "express";
import { UserRouter } from "../presentation/user/user.routes";



import { PinRouter } from "../presentation/pin/pin.routes";import { SecurityBoxRouter } from "./security-box/security-box.routes";
 

export class AppRoutes {
    static get routes(): Router {
        const router = Router();

        router.use("/users", UserRouter.routes); // Rutas de usuarios
        router.use("/pins", PinRouter.routes);   // Rutas de PINs
        //router.use("/credential", CredentialRouter.routes); // Rutas de credenciales
        router.use("/security",    SecurityBoxRouter.routes); // Rutas de seguridad

        return router;
    }
}




