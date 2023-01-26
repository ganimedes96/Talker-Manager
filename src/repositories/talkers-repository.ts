export interface TalkersCreateData {
    name: string
    email: string
    password: string
    age: number
    rate: number
}

export interface TalkersRepository {
    create: (data: TalkersCreateData) => Promise<void>;
   
}

export interface GetTalkersRepository {
    findMany: () => Promise<TalkersCreateData[]>
}

