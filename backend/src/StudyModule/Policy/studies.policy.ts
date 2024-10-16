import { Request } from "express";
import { IPaginataionParams } from "../../shared/Types/pagination.types";

export class StudiesPolicy {
  private req: Request;
  constructor(req: Request) {
    this.req = req;
  }
  paginationQueryPolicy = (): IPaginataionParams => {
    const { page, limit, sortBy, sortOrder } = this.req.query;
    return {
      page: parseInt(page as string) || 1,
      limit: parseInt(limit as string) || 10,
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
