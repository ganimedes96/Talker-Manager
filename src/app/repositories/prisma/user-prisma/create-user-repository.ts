import { prisma } from "../../../../prisma";
import { UserRepository } from "../../users-repository";

interface IUserCreateData {
  name: string;
  password: string;
  email: string;
}

export class PrismaUsersRepository implements UserRepository {
  async create({ name, email, password }: IUserCreateData) {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    return user;
  }
}
