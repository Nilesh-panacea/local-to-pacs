import mongoose, { Document, Schema } from 'mongoose';

export enum JobStatus {
    'UPLOADING' = 'uploading',
    'UPLOAD_FAILED' = 'upload-failed',
    'UPLOADED' = 'uploaded',
    'TRANSFER_FAILED' = 'transfer-failed',
    'TRANSFERRED' = 'transferred',
}

export interface IJob extends Document {
    pacsJobId: string;
    studies: string[];
    patientIds: string[];
    status: JobStatus;
}

const jobSchema: Schema<IJob> = new Schema(
    {
        pacsJobId: {
            type: String,
            unique: true, // Ensure pacsJobId is unique if provided
            default: null, // Default value if not provided
        },
        studies: {
            type: [String],
            required: true,
        },
        patientIds: {
            type: [String],
            required: true,
        },
        status: {
            type: String,
            enum: Object.values(JobStatus),
            required: true,
            default: JobStatus.UPLOADING,
        },
    },
    {
        timestamps: true, // Automatically add createdAt and updatedAt fields
    }
);

// Create and export the model
export const Job = mongoose.model<IJob>('Job', jobSchema);

