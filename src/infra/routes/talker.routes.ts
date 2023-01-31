import express from "express";
import { TalkerController } from "../controllers/talker-controllers/talker.controller";
import { TalkerValidate } from "../middleware/talker-validate";
import { Token } from "../../app/auth/jwt";

export const routerTalker = express.Router();

const token = Token;
const talkerValidate = new TalkerValidate();
const talkerController = new TalkerController();

routerTalker.post(
  "/",
  talkerValidate.talkerValidateInputs,
  token.authToken,
  talkerController.createTalker
);
routerTalker.get('/search', talkerController.findTalkerByQuery)
routerTalker.get("/:id", talkerController.findTakerById);
routerTalker.delete("/:id", talkerController.deleteTalkerById);
routerTalker.patch("/:id", talkerController.updateTalkerById);
routerTalker.get("/", talkerController.getTalks);
