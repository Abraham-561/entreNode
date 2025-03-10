import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config/jwt.adapter";
import { Role, Status, User } from "../../data/postgres/models/user.model";

export class AuthMiddleware {
  static async protect(req: Request, res: Response, next: NextFunction) {
    const authorization = req.header("Authorization");

    if (!authorization) {
      return res.status(401).json({ message: "Proporcione un token, por favor inicie sesión nuevamente." });
    }

    if (!authorization.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token inválido, por favor inicie sesión nuevamente." });
    }

    const token = authorization.split(" ")[1] || "";

    try {
      const payload = (await JwtAdapter.verifyToken(token)) as { id: string };
     if(!payload) return res.status(401).json({message: "Invalid token, plase login again"})

        const user = await User.findOne({
            where: {
                id: payload.id, status: Status.AVAILABLE
            },})

    if (!user) return res.status(401).json({message: "User not found"})

        req.body.sessionUser = user
        next()
      
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  static restricTo = (...roles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.body.sessionUser.role)) {
      return res.status(401).json({ message: "You are not authorized" });
    }
    next();
  };
}


    }
  

