import { TalkersRepository } from "./../repositories/talkers-repository";
interface CreateTalkerServiceRequest {
  name: string;
  email: string;
  password: string;
  age: number;
  rate: number;
}

export class CreateTalkerService {
  constructor(private talkersRepository: TalkersRepository) {}

  async execute(request: CreateTalkerServiceRequest) {
    const { name, email, password, age, rate } = request;
    if (!name) {
      throw  new Error('name is required');
    }
    await this.talkersRepository.create({
      name,
      email,
      password,
      age,
      rate,
    });
  }
}
