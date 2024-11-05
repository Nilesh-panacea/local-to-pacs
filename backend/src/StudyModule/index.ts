import { NextFunction, Request, Response, Router } from "express";
import { StudyControllers } from "./Controllers/studies.controllers";
import { uploadStudyToDatabaseValidation } from "./Validations/study.validation";
import { execValidation } from "../shared/validate";

export class StudyModule {
  public router: Router;
  //   public controllers: StudyControllers;
  constructor() {
    this.router = Router();
    // this.controllers = new StudyControllers(req, res);
    this.setRoutes();
  }
  private setRoutes = () => {
    this.router.get(
      "/",
      async (req: Request, res: Response) =>
        await new StudyControllers(req, res).getStudies()
    );
    // this.router.post("/single", async (req: Request, res: Response)=> await new StudyControllers(req, res).postStudies)
    this.router.post(
      "/",
      uploadStudyToDatabaseValidation,
      async (req: Request, res: Response, next: NextFunction) => execValidation(req, res, next),
      async (req: Request, res: Response, next: NextFunction) => await new StudyControllers(req, res).postStudies()
    );
    this.router.post("/:patientId/resolve",
      async (req: Request, res: Response, next: NextFunction) => await new StudyControllers(req, res).resolveStudy()
    )
    this.router.get("/getPacsStudies",
      async (req: Request, res: Response, next: NextFunction) => await new StudyControllers(req, res).getPacsStudies()
    )
  };
}
