import { prisma } from "../../prisma";
import { GetTalkersRepository } from "../talkers-repository";

export class PrismaGetTalkersRepository implements GetTalkersRepository {
  async findMany() {
    const talkers = await prisma.talker.findMany();
    return talkers;
  }
}
