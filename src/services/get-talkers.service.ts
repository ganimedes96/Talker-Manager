import { GetTalkersRepository } from "./../repositories/talkers-repository";

export class GetTalkerService {
  constructor(private talkersRepository: GetTalkersRepository) {}

  async execute() {
    const talkers = await this.talkersRepository.findMany();
    return talkers;
  }
}
