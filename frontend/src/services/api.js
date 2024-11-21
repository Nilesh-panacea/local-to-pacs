import axios from 'axios';
// Example function to fetch data


export const fetchData = async (endpoint) => {
  try {
    const response = await axios.get(endpoint);
    return response.data;
  } catch (error) {
    console.error("API call failed:", error);
    throw error; // Rethrow or handle it as needed
  }
};

export const getDBStudies = async(filters)=>{
    try {
        const queryParams = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                queryParams.append(key, value);
            }
          });
        const apiString = `/api/studies?${queryParams}`;
        console.log("apiString" ,apiString);
        const response = await axios.get(apiString);
        return response;
    } catch (error) {
        if(error instanceof Error){
            console.error(error.message);
            throw error;
        }
        else{
            console.log("Something went wrong while getting DB studies");
            throw new Error("Something went wrong while getting DB studies");
        }
    }
}
export const getPacsStudies = async()=>{
    try {
        const response = await axios.get("/api/studies/getPacsStudies");
        return response;
    } catch (error) {
        if(error instanceof Error){
            console.error(error.message);
            throw error;
        }
        else{
            console.log("Something went wrong while getting PACS studies");
            throw new Error("Something went wrong while getting PACS studies");
        }
    }
}

export const addStudies = async(formData)=>{
    try {
        const response = await axios.post('/api/studies', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Ensure correct content type for file upload
            },
        });
        return response;
    } catch (error) {
        if(error instanceof Error){
            console.error(error.message);
            throw error;
        }
        else{
            console.log("Something went wrong while adding the studies !!");
            throw new Error("Something went wrong while adding the studies !!");
        }
    }
}

export const uploadStudiesToPacs = async(formData)=>{
    try {
        const response = await axios.post("/api/upload/batch", formData );
        return response;
    } catch (error) {
        if(error instanceof Error){
            console.error(error.message);
            throw error;
        }
        else{
            console.log("Something went wrong while uploading the studies to local pacs !!");
            throw new Error("Something went wrong while uploading the studies to local pacs !!");
        }
    }
}
export const getPacsModalities = async()=>{
    try {
        const response = await axios.get("/api/transfer/getModalities");
        return response;
    } catch (error) {
        if(error instanceof Error){
            console.error(error.message);
            throw error;
        }
        else{
            console.log("Something went wrong while modalities from local pacs !!");
            throw new Error("Something went wrong while getting modalities from local pacs !!");
        }
    }
}

export const transferToModality = async(resources, aet)=>{
    try {
        const response = await axios.post("/api/transfer/batch", {
            resources,
            aet
        } );
        return response;
    } catch (error) {
        if(error instanceof Error){
            console.error(error.message);
            throw error;
        }
        else{
            console.log(`Something went wrong while tranferring the studies to ${aet} !!`);
            throw new Error(`Something went wrong while tranferring the studies to ${aet} !!`);
        }
    }
}

export const getPacsJobs = async()=>{
    try {
        const response = await axios.get("/api/transfer/getJobs");
        return response;
    } catch (error) {
        if(error instanceof Error){
            console.error(error.message);
            throw error;
        }else{
            console.log("Something went wrong while getting the Jobs from Pacs !!");
            throw new error("Something went wrong while getting the Jobs from Pacs !!");
        }
    }
}

export const getPacsJobById = async(jobId)=>{
    try {
        const response = await axios.get(`/api/transfer/getJobs/${jobId}`);
        return response;
    } catch (error) {
        if(error instanceof Error){
            console.error(error.message);
            throw error;
        }else{
            console.log(`Something went wrong while getting the Job with jobId : ${jobId} from Pacs !!`);
            throw new error(`Something went wrong while getting the Job with jobId : ${jobId} from Pacs !!`);
        }
    }
}


export const resubmitPacsJobById = async(jobId)=>{
    try {
        const response = await axios.post(`/api/transfer/getJobs/${jobId}/resubmit`);
        return response;
    } catch (error) {
        if(error instanceof Error){
            console.error(error.message);
            throw error;
        }else{
            console.log(`Something went wrong while getting the Job with jobId : ${jobId} from Pacs !!`);
            throw new error(`Something went wrong while getting the Job with jobId : ${jobId} from Pacs !!`);
        }
    }
}
export const resolveStudies = async (patientIds) => {
    try {
        const responsePromises = patientIds.map(async (patientId) => {
            try {
                const response =  await axios.post(`/api/studies/${patientId}/resolve`);
                return response;
            } catch (error) {
                console.error(`Error resolving study for patient ID ${patientId}: ${error.message}`);
                return null; // Handle failed requests gracefully
            }
        });
        const responses = await Promise.all(responsePromises);
        // Filter out any null responses due to failed requests
        const successfulResponses = responses.filter(response => response !== null);

        return successfulResponses;
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            throw error;
        } else {
            console.error("An unexpected error occurred.");
            throw new Error("An unexpected error occurred.");
        }
    }
};




// Export other API functions as needed
