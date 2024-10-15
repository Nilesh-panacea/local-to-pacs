import { Request, Response } from "express";
import { TransferPolicy } from "../Policy/transfer.policy";
import { TransferService } from "../Services/transfer.service";

export class TransferControllers{
    private req: Request;
    private res: Response;
    private policy: TransferPolicy;
    private service: TransferService;
    constructor(req: Request, res: Response){
        this.req = req;
        this.res = res;
        this.policy = new TransferPolicy(req);
        this.service = new TransferService();
        // this.service = new TranferService;
    }
    public getModalities = async()=>{
        const modalities = await this.service.getModalities();
        return this.res.status(200).send(modalities);
    }
    public transferBatch = async()=>{
        const payload = this.policy.getTransferBatchPayload(this.req);
        const response = await this.service.transferBatch(payload);
        return this.res.status(201).send(response);
    }
}