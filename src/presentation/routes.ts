import {Router} from 'express'


export class AppRoutes {
    static get routes() : Router{
        const router = Router()

        router.use("/api/v1/repairs",RepairRoutes.routes)
        router.use("/api/v1/users", UsersRouter.routes);
        return router;
    }

}