import { Request } from "express";

export class UploadPolicy {
  public getUploadPayload = (req: Request) => {
    const { patientUUID, anonymize, customName } = req.body;
    console.log("anonymize : ", anonymize, typeof anonymize);
    return {
      patientUUID: (patientUUID as string) || "",
      anonymize: typeof anonymize !== "boolean" ? true : anonymize,
      customName: (customName as string) || false,
    };
  };
  public getBatchSize = (req: Request) => {
    const { batchSize, anonymize, bleedOnly } = req.body;
    return {
      batchSize: (batchSize as number) || 0,
      anonymize: anonymize ? (anonymize as boolean) : true,
      bleedOnly: (bleedOnly as boolean),
    };
  };
}
