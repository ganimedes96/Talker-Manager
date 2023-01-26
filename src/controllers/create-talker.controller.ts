import { PrismaTalkerRepository } from "../repositories/prisma/create-talkers-repository";
import { Response, Request } from "express";
import { CreateTalkerService } from "../services/create-talker.service";

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
    if (!name) {
      return res.status(404).json({ message: "name is required " });
    }
    await this.createTalkerService.execute({
      name,
      email,
      password,
      age,
      rate,
    });
    return res.status(201).send();
  };
}
