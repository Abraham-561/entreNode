import { Request, Response } from "express";
import { PinService } from "../services/pin.service";
import { CustomError } from "../../domain/errors/costom.error";
import {  UpdatePinDTO } from "../../domain/dtos/pin/update-pin.dto";
import { CreatePinDTO } from "../../domain/dtos/pin/create-pin.dto";

interface AuthenticatedRequest extends Request {
  user?: { id: string };
}

export class PinController {
  constructor(private readonly pinService: PinService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: "Internal server error" });
  };

  // Método para actualizar PIN corregido
  async update(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user) return res.status(401).json({ message: "Unauthorized" });
      
      const { id } = req.params;
      const [error, dto] = UpdatePinDTO.update({ ...req.body, id });
      
      if (error) return res.status(400).json({ message: error });
      
      const updatedPin = await this.pinService.update(dto!, req.user.id);
      res.status(200).json(updatedPin);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async create(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user) return res.status(401).json({ message: "Unauthorized" });

      const [error, dto] = CreatePinDTO.create(req.body);
      if (error) return res.status(422).json({ message: error });

      const pin = await this.pinService.create(req.user.id, dto!);
      res.status(201).json(pin);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async validate(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user) return res.status(401).json({ message: "Unauthorized" });

      const { code } = req.body;
      if (!code) return res.status(400).json({ message: "El código es requerido" });

      const response = await this.pinService.validate(req.user.id, code);
      res.json(response);
    } catch (error) {
      this.handleError(error, res);
    }
  }
}