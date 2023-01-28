import express from "express";
import { CreateTalkerController } from "../controllers/talker-controllers/create-talker.controller";
import { GetTalkerController } from "../controllers/talker-controllers/get-talkers.controller";
// import { TalkerValidate } from "../middleware/talker-validate";

export const routerTalker = express.Router();

// const talkerValidate = new TalkerValidate();
const createTalkerController = new CreateTalkerController();
const getTalkerController = new GetTalkerController();

routerTalker.post("/", createTalkerController.createTalker);
routerTalker.get("/", getTalkerController.getTalks);
