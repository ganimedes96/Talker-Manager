import express from "express";
import { TalkerController } from "../controllers/talker-controllers/talker.controller";
import { GetTalkerController } from "../controllers/talker-controllers/get-talkers.controller";
// import { TalkerValidate } from "../middleware/talker-validate";

export const routerTalker = express.Router();

// const talkerValidate = new TalkerValidate();
const talkerController = new TalkerController();
const getTalkerController = new GetTalkerController();

routerTalker.post("/", talkerController.createTalker);
routerTalker.get("/:id", talkerController.findTakerById);
routerTalker.delete('/:id', talkerController.deleteTalkerById)
routerTalker.get("/", getTalkerController.getTalks);
