import { Response, Request } from "express";
import {PrismaUsersRepository  } from "../../../app/repositories/prisma/user-prisma/create-user-repository";
import { CreateUserService } from "../../../app/services/user-services/create-user.service";

export class CreateUserController {
  private prismaUsersRepository: PrismaUsersRepository;
  private createUserService: CreateUserService;
  constructor() {
    this.prismaUsersRepository = new PrismaUsersRepository();
    this.createUserService = new CreateUserService(
      this.prismaUsersRepository
    );
  }
  public createUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
   
    
    
    if (!name) {
      return res.status(404).json({ message: "name is required " });
    }
    await this.createUserService.execute(req.body);
    return res.status(201).send();
  };
}
