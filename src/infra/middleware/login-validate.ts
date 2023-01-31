import { Request, Response, NextFunction } from "express";
import { prisma } from "../../prisma";
export class LoginValidate {
  public loginValidateInputs = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { email, password } = req.body;

    if (!email) {
      return res.status(404).json({ message: "email is required" });
    }

    if (!password) {
      return res.status(404).json({ message: "password is required" });
    }

    const user = await prisma.user.findMany({
      where: { email },
    });
    const passwordIsValid = user?.some((item) => item.password === password);
    const emailIsValid = user?.some((item) => item.email === email);
    
    
    if (!passwordIsValid || !emailIsValid) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    next();
  };
}
