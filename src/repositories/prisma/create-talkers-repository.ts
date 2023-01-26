import { prisma } from '../../prisma';
import { TalkersCreateData, TalkersRepository } from "../talkers-repository";

export class PrismaTalkerRepository implements TalkersRepository {
  async create ({name, email,password ,age, rate}: TalkersCreateData) {
        await prisma.talker.create({
            data: {
                name,
                email,
                password,
                age,
                rate,
            }
        })
    }
   
}