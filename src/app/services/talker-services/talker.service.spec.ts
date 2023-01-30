import { TalkerService } from "./talker.service";

const createTalkSpy = jest.fn();
const findTalkerByIdSpy = jest.fn();
const deleteTalkerByIdSpy = jest.fn();
const updateTalkerByIdSpy = jest.fn();
const findManyTalkersSpy = jest.fn();
const talkerService = new TalkerService({
  create: createTalkSpy,
  findTalkerById: findTalkerByIdSpy,
  deleteTalkerById: deleteTalkerByIdSpy,
  updateTalkerById: updateTalkerByIdSpy,
  findMany: findManyTalkersSpy,
});

describe("testing service talker", () => {
  it("should be possible to successfully create a new talker", async () => {
    const result = talkerService.create({
      name: "hudson",
      email: "hudson@gmail.com",
      password: "123456",
      age: 25,
      rate: 5,
      userId: "1a94654b-9653-4d15-8f7b-f3ebaa5ac76f",
    });
    expect(result).resolves.not.toThrow();
    expect(createTalkSpy).toHaveBeenCalled();
  });

  // it("Should be possible to return an array of talkers ", async () => {
  //   const userArray = [
  //     {
  //       id: "8a0e3104-3e3f-4fa2-b70b-8b0045ca2130",
  //       name: "carlos",
  //       email: "carlose@email.com",
  //       password: "123456",
  //       userId: "90891328-d86b-4d7f-857f-e392ff584592",
  //       age: 18,
  //       rate: 5,
  //     },
  //   ];
  //   const result = await talkerService.findManyTalkers();
  //   console.log(result);
    
  //   expect(result).toEqual(userArray);
  //   expect(findManyTalkersSpy).toHaveBeenCalled();
  // });

  it("Should be possible to delete talker", () => {
    const id = "1799e2c1-e2e4-49fd-94d0-f6d42cc7dac8";
    const result = talkerService.deleteTalkerById(id);

    expect(result).resolves.not.toThrow();
    expect(deleteTalkerByIdSpy).toHaveBeenCalled();
  });

  it("Should be possible find talker by id", () => {
    const id = "1799e2c1-e2e4-49fd-94d0-f6d42cc7dac8";
    const result = talkerService.findTalkerById(id);

    expect(result).resolves.not.toThrow();
    expect(findTalkerByIdSpy).toHaveBeenCalled();
  });

  it("Should be possible to update a talker", () => {
    const result = talkerService.updateTalkerById({
      name: "hudson",
      email: "hudson@gmail.com",
      password: "123456",
      age: 25,
      rate: 5,
    });
    expect(result).resolves.not.toThrow();
    expect(updateTalkerByIdSpy).toHaveBeenCalled();
  });
});
