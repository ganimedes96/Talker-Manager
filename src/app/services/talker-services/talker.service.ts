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
  async findManyTalkers() {
    const talkers = await this.talkersRepository.findMany();
    return talkers.map((talker) => this.createTalkerDomain(talker))
  }

  async findTalkerByQuery(name: string) {
    const talker = await this.talkersRepository.findTalkerByQuery(name) 
    return this.createTalkerDomain(talker)
  }

  async findTalkerById(id: string) {
    const resultRequest = await this.talkersRepository.findTalkerById(id);
    return this.createTalkerDomain(resultRequest);
  }

  async deleteTalkerById(id: string) {
    await this.talkersRepository.deleteTalkerById(id);
  }

  async updateTalkerById(data: ITalker) {
    const resultRequest = await this.talkersRepository.updateTalkerById(data);
    return resultRequest;
  }
}
