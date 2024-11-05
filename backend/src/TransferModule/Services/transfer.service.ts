import axios from "axios";
import { ITransferBatchPayload } from "../Types/types";

export class TransferService {
    // private repository: TransferRepository;
    public getModalities = async () => {
        try {
            const username = process.env.PACS_USERNAME;
            const password = process.env.PACS_PASSWORD;
            const credentials = Buffer.from(`${username}:${password}`).toString(
                "base64"
            );
            const modalities = await axios.get(process.env.ORTHANC_URL + "/modalities", {
                headers: {
                    Authorization: `Basic ${credentials}`,
                },
            });
            return modalities.data;
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
                throw new Error(error.message);
            } else {
                throw new Error("Something went wrong while Getting the modalities");
            }
        }
    }
    public transferBatch = async (data: ITransferBatchPayload) => {
        const { resources: Resources, aet } = data;
        try {
            const url = `${process.env.ORTHANC_URL}/modalities/${aet}/store`;
            const username = process.env.PACS_USERNAME;
            const password = process.env.PACS_PASSWORD;
            const credentials = Buffer.from(`${username}:${password}`).toString(
                "base64"
            );
            const response = await axios.post(url, {
                Resources,
                Level: "study",
                Asynchronous: true,
            },
                {
                    headers: {
                        Authorization: `Basic ${credentials}`,
                    },
                }
            )
            return response.data;
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
                throw new Error(error.message);
            } else {
                throw new Error("Something went wrong while Getting the modalities");
            }
        }
    }
    public getJobs = async () => {
        try {
            const url = `${process.env.ORTHANC_URL}/jobs`;
            const username = process.env.PACS_USERNAME;
            const password = process.env.PACS_PASSWORD;
            const credentials = Buffer.from(`${username}:${password}`).toString(
                "base64"
            );
            const jobs = await axios.get(url, {
                headers: {
                    Authorization: `Basic ${credentials}`,
                },
            }
            );
            return jobs.data;
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
                throw new Error(error.message);
            } else {
                throw new Error("Something went wrong while Getting the jobs");
            }
        }
    }
    public getJobById = async (jobId: string) => {
        try {
            const url = `${process.env.ORTHANC_URL}/jobs/${jobId}`;
            const username = process.env.PACS_USERNAME;
            const password = process.env.PACS_PASSWORD;
            const credentials = Buffer.from(`${username}:${password}`).toString(
                "base64"
            );
            const findJob = await axios.get(url, {
                headers: {
                    Authorization: `Basic ${credentials}`,
                },
            }
            );
            if (!findJob) {
                console.log(`No Job with jobId : ${jobId}, is present, enter valid jobId`);
                throw new Error(`No Job with jobId : ${jobId}, is present, enter valid jobId`);
            }
            return findJob.data;
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
                throw new Error(error.message);
            } else {
                throw new Error("Something went wrong while Getting Job");
            }
        }
    }
    public resubmitJob=async(jobId: string)=>{
        try {
            await this.getJobById(jobId);
            const url = `${process.env.ORTHANC_URL}/jobs/${jobId}/resubmit`;
            const username = process.env.PACS_USERNAME;
            const password = process.env.PACS_PASSWORD;
            const credentials = Buffer.from(`${username}:${password}`).toString(
                "base64"
            );
            const response = await axios.post(url, {
                headers: {
                    Authorization: `Basic ${credentials}`,
                },
            }
            );
            if(response.status === 200) return true;
            else return false;
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
                throw new Error(error.message);
            } else {
                throw new Error("Something went wrong while Getting Job");
            }
        }
    }
}