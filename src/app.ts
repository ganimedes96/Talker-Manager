import express from "express";
import { routers } from "./routes/routes";

export const app = express()
app.use(express.json())
app.use(routers)


