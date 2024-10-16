import { body } from "express-validator";
import path from 'path';
import fs from "fs";
import fileUpload, { UploadedFile } from "express-fileupload";

const validatePath = (value: string) => {
    try {
        const dir = path.resolve(value);
        if (!fs.existsSync(dir)) {
            throw new Error("Invalid Path entered")
        }
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            throw new Error(error.message);
        } else {
            throw new Error("Invalid path or something went wrong !")
        }
    }
    return true;
}
const validateCSV = (uploadedCSV: UploadedFile) => {
    const allowedExtension = [".csv"];
    const fileExtension = path.extname(uploadedCSV.name).toLowerCase();
    if(!allowedExtension.includes(fileExtension)){
        throw new Error("Invalid file, file must be a CSV");
    }
    return true;
}
export const uploadStudyToDatabaseValidation = [
    body("studyPath", "studyPath must be a directory path").isString().isLength({
        min: 1
    }).custom(validatePath),
    body("studyCSV").custom((value, { req }) => {
        if (!req.files || !req.files.studyCSV) {
            throw new Error("studyCSV is required !!");
        }
        const uploadedCSV = req.files.studyCSV as UploadedFile;
        return validateCSV(uploadedCSV);
    })
]