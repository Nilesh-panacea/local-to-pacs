import { Request, Response } from "express";
import { TransferPolicy } from "../Policy/transfer.policy";
import { TransferService } from "../Services/transfer.service";

export class TransferControllers {
    private req: Request;
    private res: Response;
    private policy: TransferPolicy;
    private service: TransferService;
    constructor(req: Request, res: Response) {
        this.req = req;
        this.res = res;
        this.policy = new TransferPolicy(req);
        this.service = new TransferService();
        // this.service = new TranferService;
    }
    public getModalities = async () => {
        try {
            const modalities = await this.service.getModalities();
            return this.res.status(200).send(modalities);
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
                return this.res.status(500).send({ error: error.message });
            } else {
                console.log("Something went wrong while getting the modalities(AET)");
                return this.res.status(500).send({ error: "Something went wrong while getting the modalities(AET)" });
            }
        }
    }
    public transferBatch = async () => {
        try {
            const payload = this.policy.getTransferBatchPayload(this.req);
            const response = await this.service.transferBatch(payload);
            return this.res.status(201).send(response);
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
                return this.res.status(500).send({ error: error.message });
            } else {
                console.log("Something went wrong while batch Transfer");
                return this.res.status(500).send({ error: "Something went wrong while batch Transfer" });
            }
        }
    }
    public getJobs = async () => {
        try {
            const jobs = await this.service.getJobs();
            return this.res.status(200).send(jobs);
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
                return this.res.status(500).send({ error: error.message });
            } else {
                console.log("Something went wrong while getting the JOBS");
                return this.res.status(500).send({ error: "Something went wrong while getting the JOBS" });
            }
        }
    }
    public getJob = async () => {
        try {
            const jobId = this.policy.getJobId(this.req);
            const job = await this.service.getJobById(jobId);
            return this.res.status(200).send(job);
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
                return this.res.status(500).send({ error: error.message });
            } else {
                console.log("Something went wrong while getting job data");
                return this.res.status(500).send({ error: "Something went wrong while getting job data" });
            }
        }
    }
    public resubmitJob = async () => {
        try {
            const jobId = this.policy.getJobId(this.req);
            const resubmit = await this.service.resubmitJob(jobId);
            if (resubmit) {
                return this.res.status(200).send("Job resubmit is started !!!");
            } else {
                return this.res.status(500).send("Resubmit failed");
            }
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
                return this.res.status(500).send({ error: error.message });
            } else {
                console.log("Something went wrong while resubmitting the job");
                return this.res.status(500).send({ error: "Something went wrong while resubmitting the job" });
            }
        }
    }
}