import sinon from "sinon";
import chai from "chai";
import chaiHttp from "chai-http";
import { App } from "../../../app";
import { prisma } from ".././../../prisma";
import { Token } from "../../../app/auth/jwt";

import { TalkerService } from "./talker.service";

chai.use(chaiHttp);
const { app } = new App();

const createTalkSpy = jest.fn();
const findTalkerByIdSpy = jest.fn();
const deleteTalkerByIdSpy = jest.fn();
const updateTalkerByIdSpy = jest.fn();
const findManyTalkersSpy = jest.fn();
const findTalkerByQuerySpy = jest.fn();
const talkerService = new TalkerService({
  create: createTalkSpy,
  findTalkerById: findTalkerByIdSpy,
  deleteTalkerById: deleteTalkerByIdSpy,
  updateTalkerById: updateTalkerByIdSpy,
  findMany: findManyTalkersSpy,
  findTalkerByQuery: findTalkerByQuerySpy,
});

describe("test middleware validate inputs talker", () => {
  const { expect } = chai;
  it("Should not be possible create a new talker without a name", async () => {
    const talker = {
      name: "",
      email: "hudson@email.com",
      password: "123456",
      age: 18,
      rate: 5,
    };
    const result = await chai.request(app).post("/talker").send(talker);
    expect(result.body).to.be.deep.equal({ message: "name is required" });
    expect(result).to.have.status(404);
  });
  it("Should not be possible create a new talker without a email", async () => {
    const talker = {
      name: "hudson",
      email: "",
      password: "123456",
      age: 18,
      rate: 5,
    };
    const result = await chai.request(app).post("/talker").send(talker);
    expect(result.body).to.be.deep.equal({ message: "email is required" });
    expect(result).to.have.status(404);
  });
  it("Should not be possible create a new talker without a email invalid", async () => {
    const talker = {
      name: "hudson",
      email: "invalidEmail.com",
      password: "123456",
      age: 18,
      rate: 5,
    };
    const result = await chai.request(app).post("/talker").send(talker);
    expect(result.body).to.be.deep.equal({ message: "Invalid email address" });
    expect(result).to.have.status(401);
  });
  it("Should not be possible create a new talker without a password", async () => {
    const talker = {
      name: "hudson",
      email: "hudson@email.com",
      password: "",
      age: 18,
      rate: 5,
    };
    const result = await chai.request(app).post("/talker").send(talker);
    expect(result.body).to.be.deep.equal({ message: "password is required" });
    expect(result).to.have.status(404);
  });
  it("Should not be possible create a new talker without a age", async () => {
    const talker = {
      name: "hudson",
      email: "hudson@email.com",
      password: "123456",
      rate: 5,
    };
    const result = await chai.request(app).post("/talker").send(talker);
    expect(result.body).to.be.deep.equal({ message: "age is required" });
    expect(result).to.have.status(404);
  });
  it("Should not be possible to create a new talker under the age of 18", async () => {
    const talker = {
      name: "hudson",
      email: "hudson@email.com",
      password: "123456",
      age: 15,
      rate: 5,
    };
    const result = await chai.request(app).post("/talker").send(talker);
    expect(result.body).to.be.deep.equal({ message: "Age must be over 18" });
    expect(result).to.have.status(404);
  });
  it("Should not be possible create a new talker without a rate", async () => {
    const talker = {
      name: "hudson",
      email: "hudson@email.com",
      password: "123456",
      age: 18,
    };
    const result = await chai.request(app).post("/talker").send(talker);
    expect(result.body).to.be.deep.equal({ message: "rate is required" });
    expect(result).to.have.status(404);
  });

  it("Should not be possible to create a new with rate bigger 5", async () => {
    const talker = {
      name: "hudson",
      email: "hudson@email.com",
      password: "123456",
      age: 18,
      rate: 6,
    };
    const result = await chai.request(app).post("/talker").send(talker);
    expect(result.body).to.be.deep.equal({
      message: "the rating has to be between 1 and 5",
    });
    expect(result).to.have.status(404);
  });
  it("Should not be possible to create a new with rate under 1", async () => {
    const talker = {
      name: "hudson",
      email: "hudson@email.com",
      password: "123456",
      age: 18,
      rate: -1,
    };
    const result = await chai.request(app).post("/talker").send(talker);
    expect(result.body).to.be.deep.equal({
      message: "the rating has to be between 1 and 5",
    });
    expect(result).to.have.status(404);
  });
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
  it("Should be possible find talker by query", () => {
    const name = "hudson";
    const result = talkerService.findTalkerByQuery(name)

    expect(result).resolves.not.toThrow();
    expect(findTalkerByQuerySpy).toHaveBeenCalled();
  });

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
