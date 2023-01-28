import { UserRepository } from "../../users-repository";
import { prisma } from "../../../../prisma";
import { TalkersCreateData, TalkersRepository } from "../../talkers-repository";
import { IUserEmail } from "../../../DTOs/IUser";

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
  async findUserId(email : string) {
    const findId = await prisma.user.findMany({
      where: { email },
      select: {
        id: true,
      },
    });
    return findId;
  }
}
