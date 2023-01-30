import express from "express";
import { CreateUserController } from "../controllers/user-controllers/create-user.controller";
import { LoginUserController } from "../controllers/user-controllers/login-user.controller";
import { LoginValidate } from "../middleware/login-validate";

export const routerUser = express.Router();

const loginValidate = new LoginValidate();
const createUserController = new CreateUserController();
const loginUserController = new LoginUserController();

routerUser.post("/", createUserController.createUser);
routerUser.post("/login",loginValidate.loginValidateInputs, loginUserController.login);
