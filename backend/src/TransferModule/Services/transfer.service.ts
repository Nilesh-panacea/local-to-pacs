import axios from "axios";
import { ITransferBatchPayload } from "../Types/types";

export class TransferService {
    // private repository: TransferRepository;
    public getModalities = async () => {
        try {
            const modalities = await axios.get(process.env.ORTHANC_URL + "/modalities");
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
        const { resources: Resources, level: Level, aet } = data;
        try {
            const url = `${process.env.ORTHANC_URL}/modalities/${aet}/store`;
            console.log("making request to url : ", url);
            const response = await axios.post(url, {
                Resources,
                Level,
                Asynchronous: true,
            })
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
}