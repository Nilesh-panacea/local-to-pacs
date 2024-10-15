import { Request, Response } from "express";
import { StudiesPolicy } from "../Policy/studies.policy";
import { StudiesServices } from "../Services/studies.services";
import fs from "fs";
import csvParser from "csv-parser";
import Study from "../../shared/models/study.model";

interface StudyData {
  patientId: string | null;
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

export class StudyControllers {
  private req: Request;
  private res: Response;
  private policy: StudiesPolicy;
  private service: StudiesServices;
  constructor(req: Request, res: Response) {
    this.req = req;
    this.res = res;
    this.policy = new StudiesPolicy(this.req);
    this.service = new StudiesServices();
  }
  public getStudies = async () => {
    const paginationServicePayload = this.policy.paginationQueryPolicy();
    try {
      const { findStudies, totalItems, totalPages, page } =
        await this.service.getStudies(paginationServicePayload);
      if (!findStudies) {
        return this.res
          .status(400)
          .send({ message: "No such studies are found" });
      }
      return this.res
        .status(200)
        .send({ findStudies, totalItems, totalPages, page });
    } catch (error) {
      if (error instanceof Error) {
        return this.res.status(500).send(error.message);
      } else
        return this.res.status(500).send({
          message: "Something went wrong while fetching the studies !",
        });
    }
  };

  public postStudies = async () => {
    function readStreamFile(filePath: string): Promise<StudyData[]> {
      return new Promise((resolve, reject) => {
        const results: StudyData[] = [];
        const readStream = fs.createReadStream(filePath).pipe(csvParser());

        readStream.on("data", (data) => {
          // console.log("Processing chunk:", chunk);
          const studyData = {
            patientId: data["Patient ID (UHID)"] || "",
            age: parseInt(data["Age"]) || null,
            gender: data["Gender"] || "",
            slickThickness: parseFloat(data["Slice Thickness (in mm)"]) || null,
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
          };
          results.push(studyData);
        });

        readStream.on("end", async () => {
          try {
            const existingStudies = await Study.find({
              patientId: { $in: results.map((r) => r.patientId) },
            });
            const existingIds = new Set(
              existingStudies.map((study) => study.patientId)
            );

            const postedStudies = results.filter(
              (study) => !existingIds.has(study.patientId || "")
            );
            if (postedStudies.length > 0) {
              await Study.insertMany(postedStudies);
              console.log(`${postedStudies.length} new records inserted.`);
            }
            resolve(postedStudies);
          } catch (error) {
            if (error instanceof Error) throw new Error(error.message);
            else throw new Error("something went wrong adding studies");
          }
        });

        readStream.on("error", (err) => {
          console.error("An error occurred:", err);
          reject({ success: false, error: err }); // Reject with false and the error
        });
      });
    }

    const filePath = process.env.STUDY_CSV_PATH || "";
    // "C:\\Users\\niles\\Desktop\\Office Files\\local to pacs utility\\initialFiles\\studies.csv";
    try {
      const postedStudies = await readStreamFile(filePath);
      if (postedStudies.length > 0)
        return this.res.status(201).send(postedStudies);
      return this.res.sendStatus(200);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        return this.res.status(500).send(error);
      } else
        return this.res.status(500).send({ message: "Something went wrong!!" });
    }
  };
}
