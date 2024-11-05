import axios from "axios";
import { Request } from "express";
import { ITransferBatchPayload } from "../Types/types";

export class TransferPolicy {
    private req: Request;
    constructor(req: Request) {
        this.req = req;
    }
    public getTransferBatchPayload = (req: Request) => {
        const {resources, aet} = req.body;
        const data: ITransferBatchPayload = {
            resources,
            aet,
        }
        return data;
    }
    public getJobId=(req: Request)=>{
        const {jobId} = req.params;
        return jobId as string;
    }
}