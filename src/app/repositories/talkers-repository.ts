import {IUserEmail, IUserID}from '../DTOs/IUser'

export interface TalkersCreateData {
    id?: string;
    name: string
    email: string
    password: string
    age: number
    userId: string
    rate: number
}

export interface TalkersRepository {
    create: (data: TalkersCreateData) => Promise<TalkersCreateData>;
    findUserId: (email :string) => Promise<IUserID[]> 
}

export interface GetTalkersRepository {
    findMany: () => Promise<TalkersCreateData[]>
}

