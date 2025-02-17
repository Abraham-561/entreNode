import { Repair, RepairStatus } from "../../data/postgres/models/segurity-box.model";
import { CreateRepairDTO, CustomError } from "../../domain";
import { In } from "typeorm";
export class RepairService {
  async findAll() {
    try {
      return await Repair.find({
        where: {
          status: In([RepairStatus.PENDING, RepairStatus.COMPLETED]),
        },
        relations: {
          user: true,
        },
        select: {
          user: {
            id:true,
            name:true,
            email:true,
            role:true,
          },
        }
      });
    
    
    } catch (error) {
      throw CustomError.internalServer("Error fetching repair data");
    }
  }

  async findOne(id: string) {
    const repair = await Repair.findOne({
      where: {
        status: RepairStatus.PENDING,
        id,
      },
    });
    if(!repair) {
        throw CustomError.notFoud("repair not found")
    }
    return repair
  }

  async create(data: CreateRepairDTO) {
    const repair= new Repair()

    repair.date = data.date
    repair.userId = data.userId

    try {
        return await repair.save();

        
    } catch (error) {
        throw CustomError.internalServer("Error crating repair")
    }
  }

  async update(id: string) {
    const repair = await this.findOne(id)

    repair.status = RepairStatus.COMPLETED
    try {
        await repair.save()
        return {
            message: "Reparacion completada"
        }
    } catch (error) {
        throw CustomError.internalServer("Error update repair")
    }
  }

  async delete(id: string) {
    const repair = await this.findOne(id)

    repair.status = RepairStatus.CANCELLED
    try {
        await repair.save()
        return {
            message: "Reparacion cancelada"
        }
    } catch (error) {
        throw CustomError.internalServer("Error deleting repair")
    }
  }
}
