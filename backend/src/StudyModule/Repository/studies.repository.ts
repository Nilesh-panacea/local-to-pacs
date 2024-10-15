import Study from "../../shared/models/study.model";
import { IPaginataionParams } from "../../shared/Types/pagination.types";

export class StudyRepository {
  public getStudies = async (paginationPayload: IPaginataionParams) => {
    const { page, limit, sortBy, sortOrder } = paginationPayload;
    const validSortFields = Object.keys(Study.schema.paths).map((field) =>
      field.toString()
    );
    const sortField = validSortFields.includes(sortBy) ? sortBy : "createdAt";
    try {
      const findStudies = await Study.find()
        .sort({ [sortField]: sortOrder })
        .skip((page - 1) * limit)
        .limit(limit);
      const totalItems = await Study.countDocuments();
      const totalPages = Math.ceil(totalItems / limit);
      return { findStudies, totalItems, totalPages, page };
    } catch (error) {
      if(error instanceof Error)  throw new Error(error.message);
      else throw new Error("Something went wrong while getting the studies !!");
    }
  };
  static getByPatientUUID = async (patientUUUID: string)=>{
    const findStudy = await Study.findOne({patientId: patientUUUID});
    return findStudy;
  }
}
