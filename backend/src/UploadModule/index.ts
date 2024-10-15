import { NextFunction, Request, Response, Router } from "express";
import { UploadController } from "./Controllers/upload.controllers";
import { checkSchema } from "express-validator";
import { uploadBatchValidation, uploadSingleValidation } from "./Validations/upload.validation";
import { execValidation } from "../shared/validate";

export class UploadModule {
    public router: Router;
    constructor() {
        this.router = Router();
        this.setRoutes();
    }
    private setRoutes = () => {
        this.router.post("/single", uploadSingleValidation,
            async (req: Request, res: Response, next: NextFunction) => execValidation(req, res, next),
            async (req: Request, res: Response) => {
                try {
                    const response = await new UploadController(req, res).uploadSingle();
                    console.log("res.send : ", response);
                    return res.status(200).send(response);
                } catch (error) {
                    if (error instanceof Error) {
                        console.log(error.message);
                        return res.status(500).send(error.message);
                    } else {
                        console.log(`Something went wrong while uploading the study!`);
                        return res
                            .status(500)
                            .send({ message: `Something went wrong while uploading the study!` });
                    }
                }
            }
        );
        this.router.post("/batch", 
            uploadBatchValidation,
            async (req: Request, res: Response, next: NextFunction) => execValidation(req, res, next),
            async (req: Request, res: Response) => await new UploadController(req, res).uploadBatch()
        );
    }
}