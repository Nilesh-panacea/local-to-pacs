import { globSync } from "glob";
import Study from "../../shared/models/study.model";
import path from "path";
import axios from "axios";
import * as fs from "fs";
import {
  getBatchName,
  getNewName,
  incrementBatchNo,
  updateCounter,
} from "../../shared/Utils/updateCounter";
import { UploadRepositories } from "../Repositories/upload.repositories";

export class UploadServices {
  private repositories: UploadRepositories;
  constructor() {
    this.repositories = new UploadRepositories;
  }
  // public anonymize = async (study: Stu)
  public uploadSingleInstance = async (instancePath: string, orthancUrl: string) => {
    try {
      const username = process.env.PACS_USERNAME;
      const password = process.env.PACS_PASSWORD;
      const credentials = Buffer.from(`${username}:${password}`).toString(
        "base64"
      );
      const fileStream = fs.createReadStream(instancePath);
      const response = await axios.post(
        orthancUrl + "/instances",
        fileStream,
        {
          headers: {
            Authorization: `Basic ${credentials}`,
          },
          maxContentLength: Infinity, // Allow large files
          maxBodyLength: Infinity, // Allow large files
        }
      );
      return response?.data?.ParentStudy;
    } catch (error) {
      if (error && error instanceof Error) {
        console.log("error : ", error.message);
        throw new Error(error.message);
      } else {
        console.log(`Something went wrong while uploading the instance at path : ${instancePath}, `);
        throw new Error(`Something went wrong while uploading the instance at path : ${instancePath}, `);
      }
    }
  }
  public uploadSingle = async (
    patientUUID: string,
    anonymize: boolean = true,
    batchName: string,
    customName?: string | boolean,
  ) => {
    const orthancUrl = process.env.ORTHANC_URL || "http://localhost:8042";
    let studyId: string = "";
    try {
      const username = process.env.PACS_USERNAME;
      const password = process.env.PACS_PASSWORD;
      const credentials = Buffer.from(`${username}:${password}`).toString(
        "base64"
      );
      const findStudy = await Study.findOne({ patientId: patientUUID });  // Getting DB study
      if (!findStudy) {
        throw new Error("Invalid patient Id entered !");
      }
      if(!findStudy.presentLocaly){
        throw new Error("Study not present Locally !!");
      }
      const dcmFiles = globSync(
        `${findStudy.localPath}/**/*.dcm`
      );
      const fullPaths = dcmFiles.map((dcmFile) => path.resolve(dcmFile));
      if (fullPaths.length === 0) {
        console.log({ error: "No Dicom files available at path" });
        throw new Error("No Dicom files available at path");
      }
      for (const dcmFile of fullPaths) {  // upload instances
        studyId = await this.uploadSingleInstance(dcmFile, orthancUrl);
      }
      const orthancStudyResponse = await axios.get(  // get Study name
        orthancUrl + "/studies/" + studyId,
        {
          headers: {
            Authorization: `Basic ${credentials}`,
          },
        }
      );
      let studyNewName =
        orthancStudyResponse.data?.PatientMainDicomTags?.PatientName ||
        patientUUID;
      if (anonymize) {
        if (typeof customName === "string" && customName.length > 0) studyNewName = customName;
        else
          studyNewName = await getNewName(findStudy.bleedSubCategory);
        const response = await axios.post(
          `${orthancUrl}/studies/${studyId}/anonymize`,
          {
            Force: true,
            KeepLabels: true,
            KeepPrivateTags: true,
            KeepSource: false,
            Permissive: true,
            Priority: 0,
            Replace: {
              PatientName: `${studyNewName}`,
            },
            Synchronous: true,
          },
          {
            headers: {
              Authorization: `Basic ${credentials}`,
            },
            maxContentLength: Infinity, // Allow large files
            maxBodyLength: Infinity, // Allow large files
          }
        );
        const studyData = response.data;
        console.log(response.data);
        studyId = studyData.ID;
        findStudy.newStudyId = studyId;
        findStudy.newStudyName = studyNewName;
        findStudy.uploaded = true;
        findStudy.uploadDate = new Date();
        findStudy.batchName = batchName;
        await findStudy.save();
        if (!customName)
          await updateCounter(findStudy.bleedSubCategory);
        return {
          studyId,
          studyName: studyNewName,
        };
      }
      return { studyId, studyName: studyNewName };
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        throw new Error(error.message);
      } else {
        console.log("Error while while uploading the study !");
        throw new Error("Error while while uploading the study !");
      }
    }
  };

  public uploadBatch = async (patientIds: string[], anonymize: boolean) => {
    let batchName = await getBatchName();
    const data = patientIds.map((patientId) => {
      return this.uploadSingle(
        patientId,
        anonymize,
        batchName,
        false
      )
    })
    const result = await Promise.all(data);
    await incrementBatchNo();
    console.log("uploaded studies result : ", result);
    return result;
  };
}
