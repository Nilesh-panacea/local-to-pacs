import { Request, Response, Router } from "express";
import { TransferControllers } from "./Controllers/transfer.controllers";

export class TransferModule {
    public router: Router;
    constructor() {
        this.router = Router();
        this.setRoutes();
    }
    public setRoutes = () => {
        this.router.get(
            "/getModalities", 
            async (req: Request, res: Response) => 
            await new TransferControllers(req, res).getModalities()
        );
        this.router.post(
            "/batch",
        async (req: Request, res: Response)=>
            await new TransferControllers(req, res).transferBatch()
        );
    }
}