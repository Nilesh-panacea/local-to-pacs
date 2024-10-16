import mongoose from "mongoose";

const studySchema = new mongoose.Schema(
  {
    patientId: {
      type: String,
      required: true,
      unique: true
    },
    age: Number,
    gender: {
      type: String,
      enum: ["F", "M", "O"],
    },
    slickThickness: Number,
    dateOfAcquisition: String,
    protocol: String,
    manufacture: String,
    injuryDetails: String,
    radiologistDiagnosis: String,
    pathologyStatus: {
      type: String,
      enum: ["Normal", "Abnormal", "rest normal"],
    },
    keywords: [String],
    bleedOnlyStatus: {
      type: String,
      enum: ["Yes", "No"],
    },
    bleedSubCategory: {
      type: String,
      default: "",
      enum: [
        "Bleed-Contusion",
        "Bleed-Epidural",
        "Bleed-Hematoma",
        "Bleed-Intraventricular",
        "Bleed-Subarachnoid",
        "Bleed-Subdural",
        "Midline Shift",
        "",
      ],
    },
    majorAbnormality: String,
    bleed: {
      type: Boolean,
      required: true,
    },
    uploaded: {
      type: Boolean,
      required: true,
    },
    uploadDate: {
      type: Date,
    },
    newStudyId: {
      type: String,
    },
    batchName: String,
    newStudyName: {
      type: String,
      default: ""
    },
    //
    localPath: {
      type: String,
      required: true
    },
    presentLocaly: {
      type: Boolean,
      default: false
    },
    transfered: {
      type: Boolean,
    }
    //
  },
  {
    timestamps: true,
  }
);

const Study = mongoose.model("Study", studySchema);
export default Study;
