import { IUserLogin } from "./../../DTOs/IUser";
import { CustomError } from "../../error/customError";
import { LoginRepository } from "../../repositories/users-repository";
import { Token } from "../../auth/jwt";

export class LoginService {
  constructor(private loginRepository: LoginRepository) {}

  public login = async ({ email, password }: IUserLogin) => {
    const user = await this.loginRepository.login({ email });

    if (!user) throw new CustomError("Incorrect email or password", 401);

    const passwordIsValid = user?.some((item) => item.password === password);

    if (!passwordIsValid)
      throw new CustomError("Incorrect email or password", 401);

    const [result] = user?.map((item) => {
      return { email: item.email, name: item.name };
    });

    const token = Token.generateToken({
      email: result.email,
      name: result.name,
    });

    return token;
  };
}
