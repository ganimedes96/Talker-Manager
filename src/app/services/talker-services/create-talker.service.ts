import { TalkersRepository } from "../../repositories/talkers-repository";
import {TalkerDomain} from '../../domains/talkers'
import {ITalker} from '../../DTOs/ITalkers'

interface CreateTalkerServiceRequest {
  id: string;
  name: string;
  email: string;
  password: string;
  userId: string;
  age: number;
  rate: number;
}

export class CreateTalkerService {
  constructor(
    private talkersRepository: TalkersRepository,
    
    ) {}
  
  private createTalkerDomain (talker: ITalker | null): TalkerDomain | null {
    if (talker) {
      return new TalkerDomain(talker)
    }
    return null
  }

  async execute(request: CreateTalkerServiceRequest, userEmail: string) {
    const { name, email, password, age, rate, userId } = request;
    if (!name) {
      throw new Error("name is required");
    }
    const findUserId = await this.talkersRepository.findUserId(String(userEmail))
    const [user] = findUserId
    
   
    const result = await this.talkersRepository.create({
      name,
      email,
      password,
      age,
      rate,
      userId: user.id,
    });
   return this.createTalkerDomain(result)
  }
}
