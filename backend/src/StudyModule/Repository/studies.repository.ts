import Study from "../../shared/models/study.model";
import { IPaginataionParams } from "../../shared/Types/pagination.types";
import { StudyData } from "../Services/studies.services";
import path from "path";
import fs from "fs";

export class StudyRepository {
  public addStudy = async (study: StudyData, studyDir: string) => {
    try {
      const findStudy = await Study.findOne({ patientId: study.patientId });
      if (findStudy) {
        return null;
      } else {
        const localPath = path.join(studyDir, study.patientId);
        const newStudy = new Study({ ...study, localPath });
        newStudy.presentLocaly = fs.existsSync(localPath);
        const savedStudy = await newStudy.save();
        return savedStudy;
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log({ error: error.message });
        return null
      }
    }
  }
  public addStudies = async (studies: StudyData[], studyDir: string) => {
    const studyPromises = studies.map((study) => {
      return this.addStudy(study, studyDir);
    })
    const addedStudies = await Promise.all(studyPromises);
    if (!addedStudies) {
      throw new Error("Something went wrong while uploading the studies");
    }
    return addedStudies.filter(study => study);
  }
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
      if (error instanceof Error) throw new Error(error.message);
      else throw new Error("Something went wrong while getting the studies !!");
    }
  };
  static getByPatientUUID = async (patientUUID: string) => {
    const findStudy = await Study.findOne({ patientId: patientUUID });
    return findStudy;
  }
  public getByPatientUUID = async (patientUUID: string) => {
    const findStudy = await StudyRepository.getByPatientUUID(patientUUID);
    return findStudy;
  }
}
