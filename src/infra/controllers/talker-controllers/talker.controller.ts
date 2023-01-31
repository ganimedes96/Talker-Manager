import { ITalker } from "./../../../app/DTOs/ITalkers";
import { PrismaTalkerRepository } from "../../../app/repositories/prisma/talker-prisma/talkers-repository";
import { Response, Request } from "express";
import { TalkerService } from "../../../app/services/talker-services/talker.service";
import { Token } from "../../../app/auth/jwt";

export class TalkerController {
  private prismaTalkersRepository: PrismaTalkerRepository;
  private talkerService: TalkerService;
  constructor() {
    this.prismaTalkersRepository = new PrismaTalkerRepository();
    this.talkerService = new TalkerService(this.prismaTalkersRepository);
  }
  public createTalker = async (req: Request, res: Response) => {
    const { name, email, password, age, rate } = req.body;
    const token = req.headers.authorization;
    const userId = Token.decodeToken(String(token));

    const userData = {
      name,
      email,
      password,
      age,
      rate,
      userId,
    };

    const result = await this.talkerService.create(userData);
    return res.status(201).json(result);
  };
  public getTalks = async (_req: Request, res: Response) => {
    const talks = await this.talkerService.findManyTalkers();
    return res.status(200).json(talks);
  };

  public findTalkerByQuery = async (req: Request, res: Response) => {
    const talkerQuery = req.query;
    console.log('Name', talkerQuery);
    
    const talker = await this.talkerService.findTalkerByQuery(
      String(talkerQuery.name)
    );
    return res.status(200).json(talker);
  };

  public findTakerById = async (req: Request, res: Response) => {
    const user = req.params;

    const talker = await this.talkerService.findTalkerById(user.id);
    return res.status(200).json({ talker });
  };

  public deleteTalkerById = async (req: Request, res: Response) => {
    const user = req.params;
    await this.talkerService.deleteTalkerById(user.id);
    return res.status(204).send();
  };

  public updateTalkerById = async (req: Request, res: Response) => {
    const { name, email, password, age, rate } = req.body;
    const { id } = req.params;
    const userData: ITalker = {
      id,
      name,
      email,
      password,
      age,
      rate,
    };

    const resultRequest = await this.talkerService.updateTalkerById(userData);

    return res.status(200).json(resultRequest);
  };
}
