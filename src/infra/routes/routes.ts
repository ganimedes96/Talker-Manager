import express from "express";
import { routerTalker } from "./talker.routes";
import { routerUser } from "./user.routes";

export const routers = express.Router();

routers.use("/talker", routerTalker);
routers.use("/user", routerUser);
