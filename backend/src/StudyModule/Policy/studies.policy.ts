import { Request } from "express";
import { IPaginataionParams } from "../../shared/Types/pagination.types";
import { IDBStudiesFilter } from "../Types/study.types";

export class StudiesPolicy {
  private req: Request;
  constructor(req: Request) {
    this.req = req;
  }
  getFilter = ()=>{
    const { bleed, uploaded, presentLocaly, bleedSubCategory } = this.req.query;
    const filter: IDBStudiesFilter = {};
    if (bleed !== undefined) {
      filter.bleed = bleed === "true" ? true : bleed === "false" ? false : undefined;
    }
    
    if (uploaded !== undefined) {
      filter.uploaded = uploaded === "true" ? true : uploaded === "false" ? false : undefined;
    }
    
    if (presentLocaly !== undefined) {
      filter.presentLocaly = presentLocaly === "true" ? true : presentLocaly === "false" ? false : undefined;
    }

    if (bleedSubCategory) {
      filter.bleedSubCategory = bleedSubCategory as string || undefined;
    }
    return filter;
  }
  paginationQueryPolicy = (): IPaginataionParams => {
    const { page, limit, sortBy, sortOrder } = this.req.query;
    return {
      page: parseInt(page as string) || 1,
      limit: parseInt(limit as string) || 1000,
      sortBy: (sortBy as string) || "createdAt",
      sortOrder: sortOrder === "desc" ? -1 : 1,
    };
  };
  getStudyDir = () => {
    const { studyPath } = this.req.body;
    return {
      studyPath: (studyPath as string) || "",
    };
  }
  getPatientId=()=>{
    const {patientId} = this.req.params;
    return this.req.params.patientId as string;
  }
  // getPostStudyServicePayload=()=>{
  //   const {}
  // }
}
