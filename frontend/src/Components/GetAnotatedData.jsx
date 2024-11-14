import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import BasicTable from './DownloadTable';
import BasicTable1 from './AnotatedDataTable1';
import BasicTable2 from './AnotatedDataTable2';

const GetNonAnotatedData = () => {
  const [postData, setPostData] = useState(null); // State to hold the response data
  const [loading, setLoading] = useState(false); // State to indicate loading
  const [AnotatedStudyData, setAnotatedStudyData] = useState([]);
  const [AnotatedDataData, setAnotatedDataData] = useState([]);

  const makePostRequest = async () => {
    setLoading(true); // Set loading state to true
    try {
      const response = await axios.post('http://127.0.0.1:8000/AnotatedData/', {
        // Include the data you want to send in the POST request body
        title: "New Job",
        description: "Job description here.",
      });
      console.log('POST request successful:', response.data);
      setPostData(response.data); // Store the response data in state
      setAnotatedStudyData(response.data.AnotatedStudyData || []);
      setAnotatedDataData(response.data.AnotatedDataData || []);
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

          {/* <h3>Response Data:</h3>
          <pre>{JSON.stringify(postData.NonAnotatedDataData, null, 2)}</pre> Display the response data */}
          <h2> Table 1</h2>
          <BasicTable1 
          rows = {AnotatedStudyData}
            />
        <h2> Table 2</h2>
         <BasicTable2
         rows = {AnotatedDataData}
            /> 
        </div>
      ) : (
        <p>No data yet.</p>
      )}
    </div>
  );
};

export default GetNonAnotatedData;



//   rows={[
//     {
//       patientId: 'P12345',
//       studyId: 'S67890',
//       createdDate: '2024-08-15',
//       modifiedDate: '2024-09-01',
//       noOfDcmFiles: 25
//     },
//     {
//       patientId: 'P54321',
//       studyId: 'S98765',
//       createdDate: '2024-08-20',
//       modifiedDate: '2024-09-10',
//       noOfDcmFiles: 30
//     },
//     {
//       patientId: 'P11111',
//       studyId: 'S22222',
//       createdDate: '2024-07-10',
//       modifiedDate: '2024-08-05',
//       noOfDcmFiles: 15
//     }
//   ]}


// rows={[
//     {
//       sopInstanceId: '1.2.840.113619.2.55.3.2831180527.847.1438831302.232',
//       studyId: 'S12345',
//       seriesId: 'SERIES1',
//       path: '/path/to/dicom/file1.dcm'
//     },
//     {
//       sopInstanceId: '1.2.840.113619.2.55.3.2831180527.847.1438831302.233',
//       studyId: 'S67890',
//       seriesId: 'SERIES2',
//       path: '/path/to/dicom/file2.dcm'
//     },
//     {
//       sopInstanceId: '1.2.840.113619.2.55.3.2831180527.847.1438831302.234',
//       studyId: 'S54321',
//       seriesId: 'SERIES3',
//       path: '/path/to/dicom/file3.dcm'
//     }
//   ]}