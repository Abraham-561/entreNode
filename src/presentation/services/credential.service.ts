import { Repository } from "typeorm";
import Credential from "../../data/postgres/models/credential.model";
import { CustomError } from "../../domain/errors/costom.error";
import { CreateCredentialDTO } from "../../domain/dtos/credential/create-credential.dto";
import { UpdateCredentialDTO } from "../../domain/dtos/credential/update-credential.dto";

export class CredentialService {
    constructor(private readonly credentialRepository: Repository<Credential>) {}

    async findAll() {
        return await this.credentialRepository.find();
    }

    async findOne(id: string) {
        const credential = await this.credentialRepository.findOneBy({ id });
        if (!credential) throw CustomError.notFoud("Credential not found");
        return credential;
    }

    async create(dto: CreateCredentialDTO) {
        const newCredential = this.credentialRepository.create(dto);
        return await this.credentialRepository.save(newCredential);
    }

    async update(id: string, dto: UpdateCredentialDTO) {
        await this.findOne(id);
        await this.credentialRepository.update(id, dto);
        return this.findOne(id);
    }

    async delete(id: string) {
        await this.findOne(id);
        return await this.credentialRepository.delete(id);
    }
}
