import { Repository } from "typeorm";
import Pin from "../../data/postgres/models/pin.model";
import { CustomError } from "../../domain/errors/costom.error";
import { CreatePinDTO } from "../../domain/dtos/pin/create-pin.dto";
import { UpdatePinDTO } from "../../domain/dtos/pin/update-pin.dto";

export class PinService {
    constructor(private readonly pinRepository: Repository<Pin>) {}

    async findAll() {
        return await this.pinRepository.find();
    }

    async findOne(id: string) {
        const pin = await this.pinRepository.findOneBy({ id });
        if (!pin) throw CustomError.notFoud("Pin not found");
        return pin;
    }

    async create(dto: CreatePinDTO) {
        const newPin = this.pinRepository.create(dto);
        return await this.pinRepository.save(newPin);
    }

    async update(id: string, dto: UpdatePinDTO) {
        await this.findOne(id);
        await this.pinRepository.update(id, dto);
        return this.findOne(id);
    }

    async delete(id: string) {
        await this.findOne(id);
        return await this.pinRepository.delete(id);
    }
}
