import { Request, Response } from "express";
import { SecurityBoxService } from "../services/security-box.service";
import { CustomError } from "../../domain/errors/costom.error";

export class SecurityBoxController {
    constructor(private readonly securityBoxService: SecurityBoxService) {}

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        return res.status(500).json({ message: "Something went very wrong!" });
    };

    findAll = async (req: Request, res: Response) => {
        try {
            const boxes = await this.securityBoxService.findAll();
            res.status(200).json(boxes);
        } catch (error) {
            this.handleError(error, res);
        }
    };

    findOne = async (req: Request, res: Response) => {
        try {
            const box = await this.securityBoxService.findOne(req.params.id);
            res.status(200).json(box);
        } catch (error) {
            this.handleError(error, res);
        }
    };

    create = async (req: Request, res: Response) => {
        try {
            const newBox = await this.securityBoxService.create(req.body);
            res.status(201).json(newBox);
        } catch (error) {
            this.handleError(error, res);
        }
    };

    update = async (req: Request, res: Response) => {
        try {
            const updatedBox = await this.securityBoxService.update(req.params.id, req.body);
            res.status(200).json(updatedBox);
        } catch (error) {
            this.handleError(error, res);
        }
    };

    delete = async (req: Request, res: Response) => {
        try {
            await this.securityBoxService.delete(req.params.id);
            res.status(204).send();
        } catch (error) {
            this.handleError(error, res);
        }
    };
}
