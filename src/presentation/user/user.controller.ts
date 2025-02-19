import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { CustomError } from "../../domain/errors/costom.error";


import { CreateUserDTO } from "../../domain/dtos/user/create-user.dto";
import { UpdateUserDTO } from "../../domain/dtos/user/update-user.dto";

import { protectAccountOwner } from "../../config/validate-owner";


export class UserController {
    constructor(private readonly userService: UserService) {}

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        console.error(error);
        return res.status(500).json({ message: "Something went very wrong!" });
    };

    findAllUsers = async (req: Request, res: Response) => {
        try {
            const users = await this.userService.findAll();
            res.status(200).json(users);
        } catch (error) {
            this.handleError(error, res);
        }
    };

    findOneUser = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const user = await this.userService.findOne(id);
            res.status(200).json(user);
        } catch (error) {
            this.handleError(error, res);
        }
    };

    createUser = async (req: Request, res: Response) => {
        const [error, createUserDto] = CreateUserDTO.create(req.body);
        if (error) return res.status(422).json({ message: error });

        try {
            const newUser = await this.userService.create(createUserDto!);
            res.status(201).json(newUser);
        } catch (error) {
            this.handleError(error, res);
        }
    };

    updateUser = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const sessionUserId = req.body.sessionUserId;

            if (!protectAccountOwner(id, sessionUserId)) {
                return res.status(401).json({ message: "You are not the owner of this account" });
            }

            const [error, updateUserDto] = UpdateUserDTO.update(req.body);
            if (error) return res.status(422).json({ message: error });

            const updatedUser = await this.userService.update(id, updateUserDto!);
            res.status(200).json(updatedUser);
        } catch (error) {
            this.handleError(error, res);
        }
    };

    deleteUser = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const sessionUserId = req.body.sessionUserId;

            if (!protectAccountOwner(id, sessionUserId)) {
                return res.status(401).json({ message: "You are not the owner of this account" });
            }

            await this.userService.delete(id);
            res.status(204).send();
        } catch (error) {
            this.handleError(error, res);
        }
    };

    loginUser = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            const data = await this.userService.login(email, password);
            res.status(200).json(data);
        } catch (error) {
            this.handleError(error, res);
        }
    };
}
