import { ITalker } from "../DTOs/ITalkers";

export interface TalkersCreateData {
  id?: string;
  name: string;
  email: string;
  password: string;
  age: number;
  userId: string;
  rate: number;
}

export interface TalkersRepository {
  create: (data: TalkersCreateData) => Promise<TalkersCreateData>;
  findTalkerById: (id: string) => Promise<TalkersCreateData | null>;
  deleteTalkerById: (id: string) => Promise<void>;
  updateTalkerById: (id: ITalker) => Promise<TalkersCreateData>;
  findMany: () => Promise<TalkersCreateData[]>;
}

export interface GetTalkersRepository {
  findMany: () => Promise<TalkersCreateData[]>;
}
