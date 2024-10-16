import { Request, Response } from "express";
import { StudiesPolicy } from "../Policy/studies.policy";
import { StudiesServices } from "../Services/studies.services";
import fs from "fs";
import csvParser from "csv-parser";
import Study from "../../shared/models/study.model";
import { IStudyData } from "../Types/study.types";
import path from "path";

export class StudyControllers {
  private req: Request;
  private res: Response;
  private policy: StudiesPolicy;
  private service: StudiesServices;
  constructor(req: Request, res: Response) {
    this.req = req;
    this.res = res;
    this.policy = new StudiesPolicy(this.req);
    this.service = new StudiesServices();
  }
  public getStudies = async () => {
    const paginationServicePayload = this.policy.paginationQueryPolicy();
    try {
      const { findStudies, totalItems, totalPages, page } =
        await this.service.getStudies(paginationServicePayload);
      if (!findStudies) {
        return this.res
          .status(400)
          .send({ message: "No such studies are found" });
      }
      return this.res
        .status(200)
        .send({ findStudies, totalItems, totalPages, page });
    } catch (error) {
      if (error instanceof Error) {
        return this.res.status(500).send(error.message);
      } else
        return this.res.status(500).send({
          message: "Something went wrong while fetching the studies !",
        });
    }
  };

  public postStudies = async () => {
    const { studyPath } = this.policy.getStudyDir();
    const studyDir = path.resolve(studyPath || "");
    try {
      const studies = await this.service.addStudies(this.req.files, studyDir);
      if(studies && studies.length > 0){
        return this.res.status(201).send(studies);
      }else{
        return this.res.status(200).send({message : "No New study to upload"});
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        return this.res.status(500).send(error);
      } else
      return this.res.status(500).send({ message: "Something went wrong!!" });
    }
  };
  
  public resolveStudy = async()=>{
    try {
      const patientId = this.policy.getPatientId();
      const resolvedStudy = await this.service.resolveStudyByPatientId(patientId);
      if(!resolvedStudy){
        return this.res.status(200).send({message: "Study is path is not resolved( study path is still not present)"});
      }else{
        return this.res.status(200).send(`Study with patient id: ${patientId}, is resolved successfully`);
      }
    } catch (error) {
      console.log(error);
      return this.res.status(500).send(error);
    }
  }
}
