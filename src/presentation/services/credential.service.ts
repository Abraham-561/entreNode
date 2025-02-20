import { Credential } from "../../data/postgres/models/credential.model";
import { CustomError } from "../../domain/errors/costom.error";
import { CreateCredentialDTO } from "../../domain/dtos/credential/create-credential.dto";
import { UpdateCredentialDTO } from "../../domain/dtos/credential/update-credential.dto";
import { SecurityBox } from "../../data/postgres/models/segurity-box.model";
import { Pin } from "../../data/postgres/models/pin.model";

export class CredentialStorageService {
    async findAll(securityBoxId: string) {
        return await Credential.find({ where: { securityBox: { id: securityBoxId } } });
    }

    async findOne(id: string) {
        const credential = await Credential.findOne({ where: { id } });
        if (!credential) throw CustomError.notFoud("Credential not found");
        return credential;
    }

    async create(data: CreateCredentialDTO) {
        // Buscar SecurityBox y Pin antes de asignarlos
        const securityBox = await SecurityBox.findOne({ where: { id: data.securityBoxId } });
        if (!securityBox) throw CustomError.notFoud("SecurityBox not found");

        const pin = await Pin.findOne({ where: { id: data.pinId } });
        if (!pin) throw CustomError.notFoud("PIN not found");

        // Crear y guardar la credencial
        const credential = Credential.create({
            account: data.account,
            password: data.password,
            description: data.description,
            code_1: data.code1,
            code_2: data.code2,
            securityBox, // Ahora es una instancia
        });

        await credential.save();
        return credential;
    }

    async update(id: string, data: UpdateCredentialDTO) {
        const credential = await this.findOne(id);
        const [error, dto] = UpdateCredentialDTO.update(data);
        if (error) throw CustomError.badRequest(error);

        Object.assign(credential, dto);
        return await credential.save();
    }

    async delete(id: string) {
        const credential = await this.findOne(id);
        await credential.remove();
        return { message: "Credential deleted" };
    }
}
