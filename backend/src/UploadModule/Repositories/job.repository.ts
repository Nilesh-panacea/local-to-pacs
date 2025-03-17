import { Job } from "../../shared/models/job.model";

export class JoBRepository {
    public createNewJob = async () => {
        try {
            const newJob = new Job({
                studies : [],
                patientIds: [],
            });
            return newJob;
        } catch (error) {
            console.error('Error while creating new job:', error);
            throw new Error('Failed to create new job');
        }
    };
}
