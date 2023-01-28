import { TalkerDomain } from "../../domains/talkers";
import { ITalker } from "../../DTOs/ITalkers";
import { GetTalkersRepository } from "../../repositories/talkers-repository";

export class GetTalkerService {
  constructor(private talkersRepository: GetTalkersRepository) {}

  private createTalkerDomain (talker: ITalker | null): TalkerDomain | null {
    if (talker) {
      return new TalkerDomain(talker)
    }
    return null
  }
  async execute() {
    const talkers = await this.talkersRepository.findMany();
    return talkers.map((talker) => this.createTalkerDomain(talker))
  }
}
