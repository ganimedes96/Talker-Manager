import { CreateTalkerService } from "./create-talker.service";

const createTalkSpy = jest.fn();
const findManySpy = jest.fn();
const createTalker = new CreateTalkerService({
  create: createTalkSpy,
});


describe("testing create service talker", () => {
  it("should be possible to successfully create a new talker", async () => {
    const result = createTalker.execute({
      name: "hudson",
      email: "hudson@gmail.com",
      password: "123456",
      age: 25,
      rate: 5,
    });
    expect(result).resolves.not.toThrow();
    expect(createTalkSpy).toHaveBeenCalled();
  });

  it("should not be possible to create a new talker without name", async () => {
    const result = createTalker.execute({
      name: "",
      email: "hudson@gmail.com",
      password: "123456",
      age: 25,
      rate: 5,
    });
    expect(result).rejects.toThrow();
  });
});
