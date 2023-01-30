import { IUserLogin } from "./../../DTOs/IUser";
import { LoginRepository } from "../../repositories/users-repository";
import { Token } from "../../auth/jwt";

export class LoginService {
  constructor(private loginRepository: LoginRepository) {}

  public login = async ({ email }: IUserLogin) => {
    const user = await this.loginRepository.login({ email });

    const token = Token.generateToken({
      id: user?.id,
      email: user?.email,
      name: user?.name,
    });

    return token;
  };
}
