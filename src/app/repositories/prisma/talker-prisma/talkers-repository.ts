import { UserRepository } from "../../users-repository";
import { prisma } from "../../../../prisma";
import { TalkersCreateData, TalkersRepository } from "../../talkers-repository";
import { IUserEmail, IUserID } from "../../../DTOs/IUser";
import { ITalker } from "../../../DTOs/ITalkers";

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
  async findMany() {
    const talkers = await prisma.talker.findMany();
    return talkers;
  }
  async findTalkerById(id: string) {
    const findTalker = await prisma.talker.findUnique({ where: { id } });
    return findTalker;
  }

  async deleteTalkerById(id: string) {
    await prisma.talker.delete({ where: { id } });
  }

  async updateTalkerById(data: ITalker) {
    const { id, name, email, age, password, rate } = data;
    const resultRequest = await prisma.talker.update({
      where: { id },
      data: {
        name,
        email,
        age,
        password,
        rate,
      },
      select: {
        name: true,
        email: true,
        age: true,
        password: true,
        rate: true,
        userId: true
      },
    });
    return resultRequest;
  }
}
