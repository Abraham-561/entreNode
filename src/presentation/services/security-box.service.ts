import { Repository } from "typeorm";
import SecurityBox from "../../data/postgres/models/segurity-box.model"
import { CustomError } from "../../domain/errors/costom.error";
import { CreateSecurityBoxDTO } from "../../domain/dtos/security-box/create-security-box.dto";
import { UpdateSecurityBoxDTO } from "../../domain/dtos/security-box/update-security-box.dto";

export class SecurityBoxService {
    constructor(private readonly securityBoxRepository: Repository<SecurityBox>) {}

    async findAll() {
        return await this.securityBoxRepository.find();
    }

    async findOne(id: string) {
        const box = await this.securityBoxRepository.findOneBy({ id });
        if (!box) throw CustomError.notFoud("Security box not found");
        return box;
    }

    async create(dto: CreateSecurityBoxDTO) {
        const newBox = this.securityBoxRepository.create(dto);
        return await this.securityBoxRepository.save(newBox);
    }

    async update(id: string, dto: UpdateSecurityBoxDTO) {
        await this.findOne(id);
        await this.securityBoxRepository.update(id, dto);
        return this.findOne(id);
    }

    async delete(id: string) {
        await this.findOne(id);
        return await this.securityBoxRepository.delete(id);
    }
}
