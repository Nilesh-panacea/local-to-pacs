import csvParser from "csv-parser";
import { Readable } from "stream";
import { IStudyData } from "../../StudyModule/Types/study.types";
import fileUpload from "express-fileupload";

export const parseCSV = (csvFile:fileUpload.UploadedFile): Promise<IStudyData[]> => {
    const readable = new Readable();
    readable._read = () => { };
    readable.push(csvFile.data);
    readable.push(null);
    return new Promise((resolve, reject) => {
        const result: IStudyData[] = [];
        readable
            .pipe(csvParser())
            .on('data', (row) => {
                result.push(row);
            })
            .on('end', () => {
                console.log("Study CSV parsed successfully !!!");
                resolve(result); // Resolve the promise with the results
            })
            .on('error', (error) => {
                reject(error); // Reject the promise on error
            });
    });
};