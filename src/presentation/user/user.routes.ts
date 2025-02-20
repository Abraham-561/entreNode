import { Router } from "express";

import { UserController } from "../../presentation/user/user.controller";
import { validateDTO } from "../middleware/validate-dto";
import { CreateUserDTO } from "../../domain/dtos/user/create-user.dto";
import { UpdateUserDTO } from "../../domain/dtos/user/update-user.dto"

import { AuthMiddleware } from "../middleware/auth.middleware";

import { UserService } from "../../presentation/services/user.service";



export class UserRouter {
    static get routes(): Router {
        const router = Router();
        const userService = new UserService();
        const userController = new UserController(userService);

        // Endpoints públicos
        router.post("/login", userController.loginUser);
        router.post("/", validateDTO(CreateUserDTO), userController.createUser); 

        // Middleware de autenticación
        router.use(AuthMiddleware.protect);

        // Endpoints protegidos
        router.get("/", userController.findAllUsers); 
        router.get("/:id", userController.findOneUser);
        router.patch("/:id", validateDTO(UpdateUserDTO), userController.updateUser);
        router.delete("/:id", userController.deleteUser); 

        return router;
    }
}

