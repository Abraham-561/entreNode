import { Request, Response } from "express";
import SecurityBox from "../../data/postgres/models/segurity-box.model";

export const createSecurityBox = async (req: Request, res: Response) => {
  try {
    const { name, favorite, icon, user_id } = req.body;
    const newBox = await SecurityBox.create({ name, favorite, icon, user_id });

    res.status(201).json({ message: "Caja de seguridad creada", securityBox: newBox });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

export const getSecurityBoxes = async (req: Request, res: Response) => {
  try {
    const user_id = req.params.user_id;
    const boxes = await SecurityBox.findAll({ where: { user_id } });

    res.status(200).json({ securityBoxes: boxes });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};
