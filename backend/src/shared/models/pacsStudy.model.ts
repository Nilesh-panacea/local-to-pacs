import mongoose, { Document, Schema } from 'mongoose';

interface MainDicomTags {
    AccessionNumber: string;
    ReferringPhysicianName: string;
    StudyDate: string;
    StudyID: string;
    StudyInstanceUID: string;
    StudyTime: string;
}

interface PatientMainDicomTags {
    PatientBirthDate: string;
    PatientID: string;
    PatientName: string;
    PatientSex: string;
}

interface Study extends Document {
    ID: string;
    IsStable: boolean;
    Labels: string[];
    LastUpdate: string;
    MainDicomTags: MainDicomTags;
    ParentPatient: string;
    PatientMainDicomTags: PatientMainDicomTags;
    Series: string[];
    Type: string;

    // New attribute
    transferredToPacs: string[]; // Array of PACS to which the study is transferred
}

const MainDicomTagsSchema = new Schema<MainDicomTags>({
    AccessionNumber: { type: String, default: '' },
    ReferringPhysicianName: { type: String, default: '' },
    StudyDate: { type: String, default: '' },
    StudyID: { type: String, default: '' },
    StudyInstanceUID: { type: String, required: true },
    StudyTime: { type: String, default: '' },
});

const PatientMainDicomTagsSchema = new Schema<PatientMainDicomTags>({
    PatientBirthDate: { type: String, default: '' },
    PatientID: { type: String, required: true },
    PatientName: { type: String, required: true },
    PatientSex: { type: String, default: '' },
});

const StudySchema = new Schema<Study>({
    ID: { type: String, required: true },
    IsStable: { type: Boolean, required: true },
    Labels: { type: [String], default: [] },
    LastUpdate: { type: String, required: true },
    MainDicomTags: { type: MainDicomTagsSchema, required: true },
    ParentPatient: { type: String, required: true },
    PatientMainDicomTags: { type: PatientMainDicomTagsSchema, required: true },
    Series: { type: [String], required: true },
    Type: { type: String, required: true },

    // New attribute
    transferredToPacs: { type: [String], default: [] } // Array of PACS
});

const PacsStudy = mongoose.model<Study>('PacsStudy', StudySchema);

export default PacsStudy;
