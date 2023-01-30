import express from "express";
import { TalkerController } from "../controllers/talker-controllers/talker.controller";
import { TalkerValidate } from "../middleware/talker-validate";

export const routerTalker = express.Router();

const talkerValidate = new TalkerValidate();
const talkerController = new TalkerController();


routerTalker.post("/",talkerValidate.talkerValidateInputs, talkerController.createTalker);
routerTalker.get("/:id", talkerController.findTakerById);
routerTalker.delete("/:id", talkerController.deleteTalkerById);
routerTalker.patch("/:id", talkerController.updateTalkerById);
routerTalker.get("/", talkerController.getTalks);
