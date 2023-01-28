import { PrismaTalkerRepository } from "../../../app/repositories/prisma/talker-prisma/create-talkers-repository";
import { Response, Request } from "express";
import { CreateTalkerService } from "../../../app/services/talker-services/create-talker.service";
import {Token} from '../../../app/auth/jwt'

export class CreateTalkerController {
  private prismaTalkersRepository: PrismaTalkerRepository;
  private createTalkerService: CreateTalkerService;
  constructor() {
    this.prismaTalkersRepository = new PrismaTalkerRepository();
    this.createTalkerService = new CreateTalkerService(
      this.prismaTalkersRepository
    );
  }
  public createTalker = async (req: Request, res: Response) => {
    const { name, email, password, age, rate } = req.body;
    const token = req.headers.authorization;
    const userEmail = Token.decodeToken(String(token))
    if (!name) {
      return res.status(404).json({ message: "name is required " });
    }
    const result = await this.createTalkerService.execute(req.body, userEmail);
    return res.status(201).json(result);
  };
}
