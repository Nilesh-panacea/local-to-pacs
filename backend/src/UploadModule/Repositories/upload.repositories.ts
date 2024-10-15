import Study from "../../shared/models/study.model";

export class UploadRepositories {
  public getBatchStudies = async (batchSize: number, bleedOnly: boolean) => {

    const findStudies = bleedOnly ?
      await Study.find({ bleed: true, uploaded: false }).limit(batchSize) :
      await Study.find({ uploaded: false }).limit(batchSize);
    return findStudies
  };
}
