import { Request, Response } from "express";
import { CredentialStorageService } from "../../presentation/services/credential.service";
import { CustomError } from "../../domain/errors/costom.error";

export class CredentialController {
    constructor(private readonly credentialStorageService: CredentialStorageService) {}

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        return res.status(500).json({ message: "Something went very wrong!" });
    };

    findAll = async (req: Request, res: Response) => {
        try {
            const { securityBoxId } = req.params;
            const credentials = await this.credentialStorageService.findAll(securityBoxId);
            res.status(200).json(credentials);
        } catch (error) {
            this.handleError(error, res);
        }
    };

    findOne = async (req: Request, res: Response) => {
        try {
            const credential = await this.credentialStorageService.findOne(req.params.id);
            res.status(200).json(credential);
        } catch (error) {
            this.handleError(error, res);
        }
    };

    create = async (req: Request, res: Response) => {
        try {
            const { securityBoxId, pinId } = req.body;
            const newCredential = await this.credentialStorageService.create({ securityBoxId, pinId, ...req.body });
            res.status(201).json(newCredential);
        } catch (error) {
            this.handleError(error, res);
        }
    };

    update = async (req: Request, res: Response) => {
        try {
            const updatedCredential = await this.credentialStorageService.update(req.params.id, req.body);
            res.status(200).json(updatedCredential);
        } catch (error) {
            this.handleError(error, res);
        }
    };

    delete = async (req: Request, res: Response) => {
        try {
            await this.credentialStorageService.delete(req.params.id);
            res.status(204).send();
        } catch (error) {
            this.handleError(error, res);
        }
    };
}
