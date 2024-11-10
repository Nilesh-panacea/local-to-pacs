import React, { useState } from 'react';
import axios from 'axios';

const TableWithDownload = ({ FullData }) => {
  const [loading, setLoading] = useState(false);
  const [currentDownload, setCurrentDownload] = useState(null); // To track which row is being downloaded
  const data = [];

  console.log("FullData:-",FullData['patient_ids'][0]);
  const username = FullData["username"];
  const password = FullData["password"];
  const OrthancURL = FullData["OrthancUrl"];

  for (let i = 0; i < FullData['patient_ids'].length; i++) {
    data.push({id:i+1,patientId:FullData['patient_ids'][i]});
  }



  // const data = [
  //   { id: 1, patientId: 'P001' },
  //   { id: 2, patientId: 'P002' },
  //   { id: 3, patientId: 'P003' },
  // ];

  // Function to handle the download request
  const handleDownload = async (rowData) => {
    setLoading(true);
    setCurrentDownload(rowData.id);
    try {
      console.log("rowData:-",rowData)
      rowData["patientId"]

      const response = await axios.post('http://localhost:8000/DownloadFromOrthanc/', {
        patientid: rowData["patientId"], // replace with the actual patient ID
        username: username, // replace with the actual username
        password: password, // replace with the actual password
        url: OrthancURL // replace with the actual URL
      });
      // Handle success
      alert('Download started: ' + response.data.message);
    } catch (error) {
      // Handle error
      console.error('Error during download:', error);
      alert('Download failed');
    } finally {
      setLoading(false);
      setCurrentDownload(null);
    }
  };

  return (
    <div>
      {loading && (
        <div style={{ textAlign: 'center', marginBottom: '10px' }}>
          <p>Loading... Please wait</p>
        </div>
      )}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4' }}>
            <th style={{ padding: '8px', textAlign: 'left' }}>Patient ID</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td style={{ padding: '8px' }}>{row.patientId}</td>
              <td style={{ padding: '8px' }}>
                <button
                  onClick={() => handleDownload(row)}
                  disabled={loading && currentDownload === row.id}
                  style={{
                    padding: '5px 10px',
                    cursor: loading && currentDownload === row.id ? 'not-allowed' : 'pointer',
                    backgroundColor: loading && currentDownload === row.id ? '#aaa' : '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                  }}
                >
                  {loading && currentDownload === row.id ? 'Downloading...' : 'Download'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableWithDownload;
