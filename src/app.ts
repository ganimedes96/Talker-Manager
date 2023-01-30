import express from "express";
import { routers } from "./infra/routes/routes";

export class App {
    public app: express.Express;
    constructor() {
        this.app = express()
        this.config()
    }

    public config(): void{
        this.app.use(express.json())
        this.app.use(routers)
    }

    public start(PORT: string | number):void {
        this.app.listen(PORT, () => console.log(`Running on port ${PORT}`))
        
    }
}