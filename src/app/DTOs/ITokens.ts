export interface ITokenConfig {
    expiresIn: string,
  }
  
  export interface ITokenPayload {
    id?:string,
    name:string,
    email: string
  }
  
  export interface IDecodeUserToken {
    decode: string
    id:string
  }