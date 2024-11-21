export interface IStudyData {
    "Patient ID (UHID)"?: string;
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

export interface IDBStudiesFilter {
    bleed?: boolean;            // Filter for the bleed status (true/false)
    uploaded?: boolean;         // Filter for the uploaded status (true/false)
    presentLocaly?: boolean;    // Filter for whether the study is present locally (true/false)
    bleedSubCategory?: string
}