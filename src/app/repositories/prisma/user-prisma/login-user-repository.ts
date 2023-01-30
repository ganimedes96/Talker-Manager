import { prisma } from "../../../../prisma";
import { LoginRepository } from "../../users-repository";
import { IUserLogin, IUserCreateData, IUserEmail } from "../../../DTOs/IUser";

export class PrismaLoginRepository implements LoginRepository {
  async login({ email }: IUserEmail): Promise<IUserCreateData | null> {
    const makeLogin = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    });
    return makeLogin;
  }
}
