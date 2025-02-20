import { Router } from "express";
import { UserRouter } from "../presentation/user/user.routes";


export class AppRoutes {
    static get routes(): Router {
        const router = Router()

        router.use("/users", UserRouter.routes);
        return router;




    }
}


