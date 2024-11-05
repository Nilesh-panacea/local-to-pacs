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

export const getDBStudies = async()=>{
    try {
        const response = await axios.get("/api/studies");
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

// Export other API functions as needed
