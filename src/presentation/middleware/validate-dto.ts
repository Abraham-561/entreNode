import { NextFunction, Request, Response } from "express";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

export function validateDTO(DTOClass: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const output = plainToClass(DTOClass, req.body);
    const errors = await validate(output);

    if (errors.length > 0) {
      return res.status(400).json({ message: "Invalid data", errors });
    }

    next();
  };
}
