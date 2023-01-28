import {IUserLogin, IUserCreateData } from '../DTOs/IUser'

interface IUserCreate {
  id: string;
  name: string;
  password: string;
  email: string;
}

  export interface UserRepository {
      create: (data: IUserCreate) => Promise<IUserCreateData> 
  } 

  export interface LoginRepository {
    login: (data: IUserLogin) => Promise<IUserCreateData[] | null>
  }

