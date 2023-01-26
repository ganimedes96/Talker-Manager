import express from "express";
import { routerTalker } from "./talker.routes";

export const routers = express.Router();

routers.use("/talker", routerTalker);
