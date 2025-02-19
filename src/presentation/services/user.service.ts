import { CreateUserDTO } from "../../domain/dtos/user/create-user.dto";
import { UpdateUserDTO } from "../../domain/dtos/user/update-user.dto";
import {User, Status  } from "../../data/postgres/models/user.model";
import { CustomError } from "../../domain/errors/costom.error";

import { bcryptAdapter } from "../../config/encrypt";
import { JwtAdapter } from "../../config/jwt.adapter";

export class UserService {
    async findOne(id: string) {
        const user = await User.findOne({
            where: {
                status: Status.AVAILABLE,
                id: id,
            },
        });

        if (!user) {
            throw CustomError.notFoud("User not found");
        }
        return user;
    }

    async findAll() {
        try {
            const users = await User.find({
                where: {
                    status: Status.AVAILABLE,
                },
            });
            return users;
        } catch (error) {
            throw CustomError.internalServer("Error fetching users");
        }
    }

    async create(data: CreateUserDTO) {
        const user = new User();
        user.name = data.name;
        user.surname = data.surname;
        user.email = data.email;
        user.cellphone = data.cellphone;
        user.password = await bcryptAdapter.encrypt(data.password); // Encriptar contraseña
        user.status = Status.AVAILABLE;

        try {
            const newUser = await user.save();
            return {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
            };
        } catch (error) {
            throw CustomError.internalServer("Error creating user");
        }
    }

    async update(id: string, data: UpdateUserDTO) {
        const user = await this.findOne(id);

        user.name = data.name ?? user.name;
        user.surname = data.surname ?? user.surname;
        user.email = data.email ?? user.email;
        user.cellphone = data.cellphone ?? user.cellphone;

        try {
            await user.save();
            return { message: "User updated" };
        } catch (error) {
            throw CustomError.internalServer("Error updating user");
        }
    }

    async delete(id: string) {
        const user = await this.findOne(id);
        user.status = Status.DISABLED; // Marcamos al usuario como inactivo

        try {
            await user.save();
            return { message: "User disabled" };
        } catch (error) {
            throw CustomError.internalServer("Error deleting user");
        }
    }

    async login(email: string, password: string) {
        const user = await this.findUserByEmail(email);
        const isMatching = await bcryptAdapter.compare(password, user.password);
        if (!isMatching) throw CustomError.unAuthorized("Invalid Credentials");

        const token = await JwtAdapter.generateToken({ id: user.id });
        if (!token) throw CustomError.internalServer("Error generating token");

        return { token };
    }

    async findUserByEmail(email: string) {
        const user = await User.findOne({
            where: {
                email,
                status: Status.AVAILABLE,
            },
        });

        if (!user) {
            throw CustomError.notFoud("User not found");
        }

        return user;
    }
}
