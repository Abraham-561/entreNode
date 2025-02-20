
import {SecurityBox} from "../../data/postgres//models/segurity-box.model"
import { CustomError } from "../../domain/errors/costom.error";
import { CreateSecurityBoxDTO } from "../../domain/dtos/security-box/create-security-box.dto";
import { UpdateSecurityBoxDTO } from "../../domain/dtos/security-box/update-security-box.dto";




import {User} from "../../data/postgres/models/user.model";

export class SecurityBoxService {
    async findAll(userId: string) {
        return await SecurityBox.find({ where: { user: { id: userId } } });
    }

    async findOne(id: string, userId: string) {
        const box = await SecurityBox.findOne({ where: { id, user: { id: userId } } });
        if (!box) throw CustomError.notFoud("Security Box not found");
        return box;
    }

    async create(userId: string, data: CreateSecurityBoxDTO) {
        const user = await User.findOne({ where: { id: userId } });
        if (!user) throw CustomError.notFoud("User not found");

        const [error, dto] = CreateSecurityBoxDTO.create(data);
        if (error) throw CustomError.badRequest(error);

        const securityBox = SecurityBox.create({ ...dto, user });
        return await securityBox.save();
    }

    async update(id: string, userId: string, data: UpdateSecurityBoxDTO) {
        const box = await this.findOne(id, userId);
        const [error, dto] = UpdateSecurityBoxDTO.update(data);
        if (error) throw CustomError.badRequest(error);

        Object.assign(box, dto);
        return await box.save();
    }

    async delete(id: string, userId: string) {
        const box = await this.findOne(id, userId);
        box.status = "DELETED";
        return await box.save();
    }
}
