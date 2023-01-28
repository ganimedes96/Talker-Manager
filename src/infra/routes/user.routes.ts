import express from "express";
import { CreateUserController } from "../controllers/user-controllers/create-user.controller";
import { LoginUserController } from "../controllers/user-controllers/login-user.controller";

export const routerUser = express.Router();

// const talkerValidate = new TalkerValidate();
const createUserController = new CreateUserController();
const loginUserController = new LoginUserController();

routerUser.post("/", createUserController.createUser);
routerUser.post("/login", loginUserController.login);
