import { body } from "express-validator";
import { StudyRepository } from "../../StudyModule/Repository/studies.repository";

const validatePatientUUID = async(patientUUID: string)=>{
    const findStudy = await StudyRepository.getByPatientUUID(patientUUID);
    if(!findStudy){
        throw new Error(`Study with provided patientUUID : ${patientUUID}, does not exist`);
    } 
    return true; 
}

export const uploadSingleValidation =[
    body("patientUUID", "patientUUID must be present and must be a string").isString().trim().isLength({
        max: 32,
    }).custom(validatePatientUUID),
    body("anonymize", "anonymize must be present and a boolean").optional().toBoolean().isBoolean(),
    body("customName", "customName must be a string and between 2 to 32 characters").optional().isString().trim().isLength({ min: 2, max: 32}),
]

export const uploadBatchValidation = [
    // batchSize, anonymize, bleedOnly 
    body("batchSize", "batchSize must be present and must be an integer").isInt({gt: 0}),
    body("anonymize", "anonymize must be a boolean").optional().toBoolean().isBoolean(),
    body("bleedOnly", "bleedOnly can either be true or false, but not empty !").toBoolean().isBoolean(),
]