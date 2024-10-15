import { Request, Response } from "express";
import { UploadPolicy } from "../Policies/upload.policies";
import { UploadServices } from "../Services/upload.services";
import {
  getBatchName,
  incrementBatchNo,
} from "../../shared/Utils/updateCounter";

export class UploadController {
  private policy: UploadPolicy;
  private service: UploadServices;
  private req: Request;
  private res: Response;
  constructor(req: Request, res: Response) {
    this.req = req;
    this.res = res;
    this.policy = new UploadPolicy();
    this.service = new UploadServices();
  }
  uploadSingle = async () => {
    const { patientUUID, anonymize, customName } = this.policy.getUploadPayload(this.req);
    try {
      const batchName = await getBatchName();
      const { studyId, studyName } = await this.service.uploadSingle(
        patientUUID,
        anonymize,
        batchName,
        customName
      );
      await incrementBatchNo();
      return { studyId, studyName };
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        throw new Error(error.message);
      } else {
        console.log(`Something went wrong while uploading the study!`);
        throw new Error(`Something went wrong while uploading the study!`);
      }
    }
  };
  uploadBatch = async () => {
    // return this.res.status(200).send("helllllppppp");
    try {
      const { batchSize, anonymize, bleedOnly } = this.policy.getBatchSize(this.req);
      console.log("{ batchSize, anonymize, bleedOnly } : ", { batchSize, anonymize, bleedOnly });
      // const uploadOptions = this.policy.getUploadOptions(this.req);
      const response = await this.service.uploadBatch(batchSize, anonymize, bleedOnly);
      return this.res.status(200).send(response);
    } catch (error) {
      if (error instanceof Error) {
        return this.res.status(500).send(error.message);
      } else {
        console.log(`Something went wrong while uploading the study BATCH!`);
        return this.res
          .status(500)
          .send({
            message: `Something went wrong while uploading the study BATCH!`,
          });
      }
    }
  };
}
