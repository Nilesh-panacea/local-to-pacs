export interface IStudyData{
    "Patient ID (UHID)"?:string;
    "Age"?: string;
    "Gender"?: string;
    "Slice Thickness (in mm)"?: string; 
    "Date of Acquisition"?: string;
    "Name of Protocol"?: string;
    "Name of Manufacture"?: string;
    "Injury Details"?: string;
    "Radiologist Diagnosis"?: string;
    "Pathology Status"?: string;
    "Pathologies/Keywords Identified"?: string;
    "Bleed Only Status"?: string;
    "Bleed Sub-Category"?: string;
    "Major abnormality"?: string;
    "Bleed"?: string; // Assuming '1' means true
    "Uploaded"?: string; // Assuming '1' means true
}