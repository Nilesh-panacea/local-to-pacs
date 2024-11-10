import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BasicTable from './DownloadTable';
const CountdownTimer = () => {
  const [postData, setPostData] = useState(null); // State to hold the response data
  const [loading, setLoading] = useState(false); // State to indicate loading

  const makePostRequest = async () => {
    setLoading(true); // Set loading state to true
    try {
      const response = await axios.post('http://127.0.0.1:8000/NonAnotatedData/', {
        // Include the data you want to send in the POST request body
        title: "New Job",
        description: "Job description here.",
      });
      console.log('POST request successful:', response.data);
      setPostData(response.data); // Store the response data in state
    } catch (error) {
      console.error('Error making POST request:', error);
    } finally {
      setLoading(false); // Set loading state to false after the request
    }
  };

  // useEffect to make the POST request automatically when the component mounts
  useEffect(() => {
    makePostRequest(); // Call the function to make the POST request
  }, []); // Empty dependency array to run once on mount

  return (
    <div>
      {loading ? (
        <p>Submitting...</p>
      ) : postData ? (
        <div>

          <h3>Response Data:</h3>
          <pre>{JSON.stringify(postData, null, 2)}</pre> Display the response data
          <BasicTable 
          rows={[
            { name: 'Frozen yoghurt', calories: 159, fat: 6.0, carbs: 24, protein: 4.0 }]}
            />
        </div>
      ) : (
        <p>No data yet.</p>
      )}
    </div>
  );
};

export default CountdownTimer;
