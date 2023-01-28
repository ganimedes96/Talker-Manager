import { UserRepository } from "../../users-repository";
import { prisma } from "../../../../prisma";
import { TalkersCreateData, TalkersRepository } from "../../talkers-repository";
import { IUserEmail, IUserID } from "../../../DTOs/IUser";

export class PrismaTalkerRepository implements TalkersRepository {
  async create({
    name,
    email,
    password,
    age,
    rate,
    userId,
  }: TalkersCreateData) {
    const talker = await prisma.talker.create({
      data: {
        name,
        email,
        password,
        userId,
        age,
        rate,
      },
    });
    return talker;
  }
  async findTalkerById(id: string) {
    const findTalker = await prisma.talker.findUnique({ where: { id } });
    return findTalker;
  }

  async deleteTalkerById(id: string) {
     await prisma.talker.delete({ where: { id } });

  }
}
