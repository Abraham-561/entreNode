import { Request, Response } from "express";
import Pin from "../../data/postgres/models/pin.model";

export const createPin = async (req: Request, res: Response) => {
  try {
    const { code, userId } = req.body;
    const newPin = await Pin.create({ code, userId });

    res.status(201).json({ message: "PIN guardado", pin: newPin });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

export const getPins = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const pins = await Pin.findAll({ where: { userId } });

    res.status(200).json({ pins });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};
