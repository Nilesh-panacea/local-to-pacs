import { Request } from "express";
import { IPaginataionParams } from "../../shared/Types/pagination.types";
import { StudyRepository } from "../Repository/studies.repository";
import fileUpload from "express-fileupload";
import csvParser from "csv-parser";
import { Readable } from "stream";
import { IStudyData } from "../Types/study.types";
import { parseCSV } from "../../shared/Utils/helperFunctions";
import fs from "fs";


export interface StudyData {
    patientId: string;
    age: number | null;
    gender: string;
    slickThickness: number | null;
    dateOfAcquisition: string | null;
    protocol: string;
    manufacture: string;
    injuryDetails: string;
    radiologistDiagnosis: string;
    pathologyStatus: string;
    keywords: string[];
    bleedOnlyStatus: string;
    bleedSubCategory: string;
    majorAbnormality: string;
    bleed: boolean;
    uploaded: boolean;
}
export class StudiesServices {
    private repository: StudyRepository;
    constructor() {
        this.repository = new StudyRepository;
    }
    public getStudies = async (paginationPayload: IPaginataionParams) => {
        const { findStudies, totalItems, totalPages, page } = await this.repository.getStudies(paginationPayload);
        return { findStudies, totalItems, totalPages, page };
    }
    public addStudies = async (files: fileUpload.FileArray | null | undefined, studyDir: string) => {
        if (!files || !files.studyCSV) {
            throw new Error("Invalid studyCSV");
        }
        const studies: StudyData[] = [];
        try {
            const csvFile = files.studyCSV as fileUpload.UploadedFile;
            const results: IStudyData[] = await parseCSV(csvFile);
            for (const data of results) {
                const study:StudyData = {
                    patientId: data["Patient ID (UHID)"] || "",
                    age: parseInt(data["Age"] || "") || null,
                    gender: data["Gender"] || "",
                    slickThickness: parseFloat(data["Slice Thickness (in mm)"] || "") || null,
                    dateOfAcquisition: data["Date of Acquisition"] || null,
                    protocol: data["Name of Protocol"] || "",
                    manufacture: data["Name of Manufacture"] || "",
                    injuryDetails: data["Injury Details"] || "",
                    radiologistDiagnosis: data["Radiologist Diagnosis"] || "",
                    pathologyStatus: data["Pathology Status"] || "",
                    keywords: data["Pathologies/Keywords Identified"]
                        ? data["Pathologies/Keywords Identified"]
                            .split(",")
                            .map((k: string) => k.trim())
                        : [],
                    bleedOnlyStatus: data["Bleed Only Status"] || "",
                    bleedSubCategory: data["Bleed Sub-Category"] || "",
                    majorAbnormality: data["Major abnormality"] || "",
                    bleed: data["Bleed"] === "1", // Assuming '1' means true
                    uploaded: data["Uploaded"] === "1", // Assuming '1' means true
                }
                console.log({study});
                studies.push(study);
            }
            const addedStudies = await this.repository.addStudies(studies, studyDir);
            return addedStudies;
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
                throw new Error(error.message);
            }
        }
    }
    public resolveStudyByPatientId= async (patientId: string)=>{
        const study = await this.repository.getByPatientUUID(patientId);
        if(!study){
            throw new Error("Invalid patientId");
        }else{
            if(fs.existsSync(study.localPath)){
                study.presentLocaly = true;
                await study.save();
                return true;
            }
            return false;
        }
    }

    public getPacsStudies = async ()=>{
        const pacsStudies = await this.repository.getPacsStudies();
        return pacsStudies;
    }
}