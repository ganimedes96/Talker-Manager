import { TalkerService } from "./talker.service";

const createTalkSpy = jest.fn();
const findTalkerByIdSpy = jest.fn();
const createTalker = new CreateTalkerService({
  create: createTalkSpy,
  findTalkerById: findTalkerByIdSpy,
});

describe("testing create service talker", () => {
  it("should be possible to successfully create a new talker", async () => {
    const result = createTalker.create({
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

  it("should not be possible to create a new talker without name", async () => {
    const result = createTalker.create({
      name: "",
      email: "hudson@gmail.com",
      password: "123456",
      age: 25,
      rate: 5,
      userId: "1a94654b-9653-4d15-8f7b-f3ebaa5ac76f",
    });
    expect(result).rejects.toThrow();
  });
});
