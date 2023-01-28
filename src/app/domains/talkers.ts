import {ITalker} from '../DTOs/ITalkers'

export class TalkerDomain {
    private id?: string;
    private name: string;
    private email: string;
    private password: string;
    private userId: string
    private age: number;
    private rate: number;

   constructor (talker: ITalker) {
    this.id = talker.id;
    this.name = talker.name;
    this.email = talker.email;
    this.password = talker.password;
    this.userId = talker.userId,
    this.age = talker.age;
    this.rate = talker.rate;
   }

   public getName() {
    return this.name
   }

   public setName(name: string) {
    this.name = name
   }

   public getEmail() {
    return this.email
   }

   public setEmail(email: string) {
    this.email = email
   }

   public getPassword() {
    return this.password
   }

   public setPassword(password: string) {
    this.password = password
   }

   public getUserId() {
    return this.userId
   }

   public getAge() {
    return this.age
   }

   public setAge(age: number) {
    this.age = age
   }

   public getRate() {
    return this.rate
   }

} 