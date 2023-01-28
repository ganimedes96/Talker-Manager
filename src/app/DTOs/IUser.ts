export interface IUserID {
    id: string;
  }
  
  export interface IUserName {
    name: string;
  }
  
  export interface IUserEmail {
    email: string;
  }
  
  
  export interface IUserLogin extends IUserEmail{
    
    password?: string;
  }
  export interface IUserToken extends IUserName, IUserEmail {}
  
  export interface IUserCreateData extends IUserID, IUserName, IUserLogin{}
  