import { TalkersRepository } from "../../repositories/talkers-repository";
import { TalkerDomain } from "../../domains/talkers";
import { ITalker } from "../../DTOs/ITalkers";

interface CreateTalkerServiceRequest {
  id?: string;
  name: string;
  email: string;
  password: string;
  userId: string;
  age: number;
  rate: number;
}

export class TalkerService {
  constructor(private talkersRepository: TalkersRepository) {}

  private createTalkerDomain(talker: ITalker | null): TalkerDomain | null {
    if (talker) {
      return new TalkerDomain(talker);
    }
    return null;
  }

  async create(request: CreateTalkerServiceRequest) {
    const { name, email, password, age, rate, userId } = request;
    if (!name) {
      throw new Error("name is required");
    }
    const result = await this.talkersRepository.create({
      name,
      email,
      password,
      age,
      rate,
      userId,
    });
    return this.createTalkerDomain(result);
  }

  async findTalkerById(id:string) {
    const resultRequest = await this.talkersRepository.findTalkerById(id)
    return this.createTalkerDomain(resultRequest)
  }

  async deleteTalkerById(id: string) {
    await this.talkersRepository.deleteTalkerById(id)
  
  }
}
