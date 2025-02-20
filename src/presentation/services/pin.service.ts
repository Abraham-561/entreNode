

import { CustomError } from "../../domain/errors/costom.error";
import { CreatePinDTO } from "../../domain/dtos/pin/create-pin.dto";



import { User } from "../../data/postgres/models/user.model";


import {Pin} from "../../data/postgres/models/pin.model";
import { getRepository } from "typeorm";
import { UpdatePinDTO } from "../../domain/dtos/pin/update-pin.dto";




export class PinService {
    async findOne(userId: string) {
        const pin = await Pin.findOne({ where: { user: { id: userId } } });
        if (!pin) throw CustomError.notFoud("PIN not found");
        return pin;
    }

    async create(userId: string, data: CreatePinDTO) {
        const user = await User.findOne({ where: { id: userId } });
        if (!user) throw CustomError.notFoud("User not found");

        const [error, dto] = CreatePinDTO.create(data);
        if (error) throw CustomError.badRequest(error);

        const pin = Pin.create({ ...dto, user });
        return await pin.save();
    }

    async validate(userId: string, code: string) {
        const pin = await this.findOne(userId);
        if (pin.code !== code) throw CustomError.unAuthorized("Invalid PIN");
        return { message: "PIN is valid" };
    }
    async update(dto: UpdatePinDTO, userId: string) {
        const pinRepository = getRepository(Pin);
        
        const pin = await pinRepository.findOne({
          where: { id: dto.code, user: { id: userId } }
        });
    
        if (!pin) throw CustomError.notFoud("PIN not found");
        if (dto.code) pin.code = dto.code;
    
        return await pinRepository.save(pin);
}
}  export default PinService;
