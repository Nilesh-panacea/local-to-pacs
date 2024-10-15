import axios from "axios";
import { Request } from "express";
import { ITransferBatchPayload } from "../Types/types";

export class TransferPolicy {
    private req: Request;
    constructor(req: Request) {
        this.req = req;
    }
    public getTransferBatchPayload = (req: Request) => {
        const {resources, level, aet} = req.body;
        const data: ITransferBatchPayload = {
            resources,
            level,
            aet,
        }
        return data;
    }
}