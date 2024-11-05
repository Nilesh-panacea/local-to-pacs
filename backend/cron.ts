import mongoose from 'mongoose';
import axios from 'axios';
import cron from 'node-cron';
import "dotenv/config"
import PacsStudy from './src/shared/models/pacsStudy.model';
// import StudyModel from './models/Study'; // Adjust the path to your Study model

// MongoDB connection string
const mongoURI = process.env.MONGO_URL || "mongodb://localhost:27017/local-to-pacs"; // Adjust as necessary

// Orthanc server URL
const orthancURL = process.env.ORTHANC_URL + "/studies?expand" || 'http://localhost:8042/studies?expand'; // Adjust as necessary

// Connect to MongoDB
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Function to fetch studies from Orthanc
const fetchStudies = async (): Promise<any[]> => {
    const username = process.env.PACS_USERNAME;
    const password = process.env.PACS_PASSWORD;
    const credentials = Buffer.from(`${username}:${password}`).toString(
        "base64"
    );
    try {
        const response = await axios.get(orthancURL,
            {
                headers: {
                    Authorization: `Basic ${credentials}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching studies from Orthanc:', error);
        return [];
    }
};

// Function to add new studies to MongoDB
const addNewStudies = async () => {
    const studies = await fetchStudies();

    for (const study of studies) {
        const existingStudy = await PacsStudy.findOne({ ID: study.ID });

        if (!existingStudy) {
            const newStudy = new PacsStudy({
                ID: study.ID,
                IsStable: study.IsStable,
                Labels: study.Labels || [],
                LastUpdate: study.LastUpdate,
                MainDicomTags: study.MainDicomTags,
                ParentPatient: study.ParentPatient,
                PatientMainDicomTags: study.PatientMainDicomTags,
                Series: study.Series,
                Type: study.Type
            });

            await newStudy.save();
            console.log(`Added new study: ${study.ID}`);
        } else {
            console.log(`Study already exists: ${study.ID}`);
        }
    }
};

// Schedule the cron job to run every 5 minutes
cron.schedule('*/5 * * * *', () => {
    console.log('Checking for new studies...');
    addNewStudies().catch(err => console.error('Error adding new studies:', err));
});
