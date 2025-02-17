import { Request, Response } from "express";
import Credential from "../../data/postgres/models/credential.model";

export const createCredential = async (req: Request, res: Response) => {
  try {
    const { account, password, description, code_1, code_2, security_box_id, pin_id } = req.body;
    const newCredential = await Credential.create({ account, password, description, code_1, code_2, security_box_id, pin_id });

    res.status(201).json({ message: "Credencial guardada", credential: newCredential });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

export const getCredentials = async (req: Request, res: Response) => {
  try {
    const security_box_id = req.params.security_box_id;
    const credentials = await Credential.findAll({ where: { security_box_id } });

    res.status(200).json({ credentials });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};
