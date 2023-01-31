import sinon from "sinon";
import chai from "chai";
import chaiHttp from "chai-http";
import { App } from "../../../app";
import { LoginService } from "../../services/user-services/login-user.service";
import { prisma } from ".././../../prisma";
import { Token } from "../../../app/auth/jwt";

chai.use(chaiHttp);
const { expect } = chai;
const { app } = new App();
const loginUserSpy = jest.fn();

const loginService = new LoginService({
  login: loginUserSpy,
});
const mockUser = [
  {
    id: "8a0e3104-3e3f-4fa2-b70b-8b0045ca2130",
    name: "hudson",
    email: "hudson@email.com",
    password: "123456",
  },
];

const login = {
  email: "hudson@email.com",
  password: "123456",
};

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkwODkxMzI4LWQ4NmItNGQ3Zi04NTdmLWUzOTJmZjU4NDU5MiIsImVtYWlsIjoiaHVkc29uQGVtYWlsLmNvbSIsIm5hbWUiOiJodWRzb24iLCJpYXQiOjE2NzUwMzQ4OTMsImV4cCI6MTY3NTEwNjg5M30.Y4gJ-gpn_0LgCQLc_XVJO4m_v438i4htuqZK-Um96Fs";

describe("test login route ", () => {
  it("Should be possible to login  successfully", async () => {
    const user = {
      email: "hudson@email.com",
      password: "123456",
    };
    const result = await chai.request(app).post("/user/login").send(user);
    expect(result).to.have.status(201);
  });

  it("Should  be possible return a token", async () => {
    sinon.stub(prisma.user, "findMany").resolves(mockUser);
    sinon.stub(Token, "generateToken").resolves(token);
    const httpResponse = await chai
      .request(app)
      .post("/user/login")
      .send(login);
    expect(httpResponse.body).to.deep.equal(token);
  });
  it("should not be possible to login without an email", async () => {
    const user = {
      password: "123456",
    };
    const result = await chai.request(app).post("/user/login").send(user);
    expect(result.body).to.deep.equal({ message: "email is required" });
  });
  it("should not be possible to login without an password", async () => {
    const user = {
      email: "hudson@email.com",
    };
    const result = await chai.request(app).post("/user/login").send(user);
    expect(result.body).to.deep.equal({ message: "password is required" });
  });

  it("should not be possible to login with email incorrect", async () => {
    const user = {
      email: "incorretEmail@email.com",
      password: "123456",
    };
    const result = await chai.request(app).post("/user/login").send(user);
    expect(result).to.have.status(401);

    expect(result.body).to.be.deep.equal({
      message: "Incorrect email or password",
    });
  });
  it("should not be possible to login with password incorrect", async () => {
    const user = {
      email: "hudson@email.com",
      password: "incorrectPassword",
    };
    const result = await chai.request(app).post("/user/login").send(user);
    expect(result).to.have.status(401);
    expect(result.body).to.be.deep.equal({
      message: "Incorrect email or password",
    });
  });
});
