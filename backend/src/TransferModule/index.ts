import { NextFunction, Request, Response, Router } from "express";
import { TransferControllers } from "./Controllers/transfer.controllers";
import { batchTransferValidation } from "./Validations/transfer.validation";
import { execValidation } from "../shared/validate";

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
        this.router.post( // input : { resource: pacsStudyId[], aet: ""DEV_ORTHANC""}
            "/batch",
            batchTransferValidation,
            async(req: Request, res: Response, next: NextFunction)=>execValidation(req, res, next),
            async(req: Request, res: Response)=>await new TransferControllers(req, res).transferBatch()
        );
        this.router.get(
            "/getJobs",
            async (req: Request, res: Response) =>
                await new TransferControllers(req, res).getJobs()
        );
        this.router.get(
            "/getJobs/:jobId",
            async (req: Request, res: Response) =>
                await new TransferControllers(req, res).getJob()
        );
        this.router.post(
            "/getJobs/:jobId/resubmit",
            async (req: Request, res: Response) =>
                await new TransferControllers(req, res).resubmitJob()
        )
    }
}