import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ITokenConfig, ITokenPayload, IDecodeUserToken } from "../DTOs/ITokens";
import "dotenv/config";
import { CustomError } from "../error/customError";
const secretKey = process.env.JWT_SECRET as string;

export class Token {
  static generateToken = (payload: ITokenPayload): string => {
    const jwtConfig: ITokenConfig = {
      expiresIn: "20h",
    };

    const token = jwt.sign(payload, secretKey, jwtConfig);

    return token;
  };

  static authToken = (
    req: Request,
    _res: Response,
    next: NextFunction
  ): void => {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new CustomError("Token not found!", 401);
    }

    try {
      const verifyToken = jwt.verify(authorization, secretKey);
      req.body = { ...req.body, user: verifyToken };
    } catch (error) {
      throw new CustomError("Token must be a valid token", 401);
    }

    next();
  };

  static decodeToken = (token: string) => {
    const decode = jwt.decode(token) as IDecodeUserToken;

    const { id } = decode;
    return id;
  };
}
