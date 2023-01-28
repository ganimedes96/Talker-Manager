import { UserRepository } from "../../repositories/users-repository";

interface CreateUserServiceRequest {
  id: string;
  name: string;
  email: string;
  password: string;
}

export class CreateUserService {
  constructor(private usersRepository: UserRepository) {}
  

  async execute(request: CreateUserServiceRequest) {
    const { name, email, password, id } = request;
    if (!name) {
      throw new Error("name is required");
    }
    await this.usersRepository.create(request);
   
  }
}