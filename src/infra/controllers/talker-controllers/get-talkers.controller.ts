import { PrismaGetTalkersRepository } from "../../../app/repositories/prisma/talker-prisma/get-talkers-repository";
import { Response, Request } from "express";
import { GetTalkerService } from "../../../app/services/talker-services/get-talkers.service";

export class GetTalkerController {
  private prismaGetTalkersRepository: PrismaGetTalkersRepository;
  private getTalkerService: GetTalkerService;
  constructor() {
    this.prismaGetTalkersRepository = new PrismaGetTalkersRepository();
    this.getTalkerService = new GetTalkerService(
      this.prismaGetTalkersRepository
    );
  }

  public getTalks = async (req: Request, res: Response) => {
    const talks = await this.getTalkerService.execute();
    res.status(200).json(talks);
  };
}