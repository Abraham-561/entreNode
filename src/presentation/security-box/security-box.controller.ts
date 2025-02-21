import { Request, Response } from "express";
import { SecurityBoxService } from "../services/security-box.service";
import { CustomError } from "../../domain/errors/costom.error";
import { CreateSecurityBoxDTO } from "../../domain/dtos/security-box/create-security-box.dto";
import { UpdateSecurityBoxDTO } from "../../domain/dtos/security-box/update-security-box.dto";

// 🔹 Definir una interfaz extendida de Request
interface AuthenticatedRequest extends Request {
    user?: { id: string };
}

export class SecurityBoxController {
    constructor(private readonly securityBoxService: SecurityBoxService) {}

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        console.error(error);
        return res.status(500).json({ message: "Something went very wrong!" });
    };

    findAll = async (req: AuthenticatedRequest, res: Response) => {
        try {
            if (!req.user) return res.status(401).json({ message: "Unauthorized" });

            const boxes = await this.securityBoxService.findAll(req.user.id);
            res.status(200).json(boxes);
        } catch (error) {
            this.handleError(error, res);
        }
    };

    findOne = async (req: AuthenticatedRequest, res: Response) => {
        try {
            if (!req.user) return res.status(401).json({ message: "Unauthorized" });

            const box = await this.securityBoxService.findOne(req.params.id, req.user.id);
            res.status(200).json(box);
        } catch (error) {
            this.handleError(error, res);
        }
    };

    create = async (req: AuthenticatedRequest, res: Response) => {
        try {
            if (!req.user) return res.status(401).json({ message: "Unauthorized" });

            const [error, createSecurityBoxDto] = CreateSecurityBoxDTO.create(req.body);
            if (error) return res.status(422).json({ message: error });

            const newBox = await this.securityBoxService.create(req.user.id, createSecurityBoxDto!);
            res.status(201).json(newBox);
        } catch (error) {
            this.handleError(error, res);
        }
    };

    update = async (req: AuthenticatedRequest, res: Response) => {
        try {
            if (!req.user) return res.status(401).json({ message: "Unauthorized" });

            const [error, updateSecurityBoxDto] = UpdateSecurityBoxDTO.update(req.body);
            if (error) return res.status(422).json({ message: error });

            const updatedBox = await this.securityBoxService.update(req.params.id, req.user.id, updateSecurityBoxDto!);
            res.status(200).json(updatedBox);
        } catch (error) {
            this.handleError(error, res);
        }
    };

    delete = async (req: AuthenticatedRequest, res: Response) => {
        try {
            if (!req.user) return res.status(401).json({ message: "Unauthorized" });

            await this.securityBoxService.delete(req.params.id, req.user.id);
            res.status(204).send();
        } catch (error) {
            this.handleError(error, res);
        }
    };
}
