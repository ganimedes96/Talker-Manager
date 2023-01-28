import { Request, Response } from 'express';
import {LoginService} from '../../../app/services/user-services/login-user.service'
import {PrismaLoginRepository  } from "../../../app/repositories/prisma/user-prisma/login-user-repository";

export class LoginUserController {
    private prismaLoginRepository: PrismaLoginRepository;
    private loginUserService: LoginService;
    constructor() {
      this.prismaLoginRepository = new PrismaLoginRepository();
      this.loginUserService = new LoginService(
        this.prismaLoginRepository
      );
    }
    public login = async (req: Request, res: Response) => {
      
     const token = await this.loginUserService.login(req.body);
      return res.status(201).json({ token});
    };
  }
  