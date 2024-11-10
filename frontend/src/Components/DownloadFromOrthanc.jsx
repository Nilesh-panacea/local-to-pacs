import React, { useState } from 'react'; // Import useState
import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
// import BasicTable from './DownloadTable';
import TableWithDownload from './DownloadFromOrthancTable';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function InputFileUpload() {
  const [apiResponse, setApiResponse] = useState(null); // State to hold API response
  const [loading, setLoading] = useState(false); // State to indicate loading
  const [inputString, setInputString] = useState(''); // State to hold the input string
  const [file, setFile] = useState(null); // State to hold the selected file
  const [username, setUsername] = useState(''); // State to hold the username
  const [password, setPassword] = useState(''); // State to hold the password

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      setFile(files[0]); // Set the selected file
    }
  };

  const handleUpload = async () => {
    if (!inputString || !file || !username || !password) {
      alert('Please enter all fields (username, password, input string, and select a file).');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const content = e.target?.result;
      if (content) {
        const blob = new Blob([content], { type: 'text/csv' }); // Adjust the MIME type as needed
        const formData = new FormData();
        formData.append('file_name', file.name); // Ensure this matches the FastAPI endpoint parameter
        formData.append('content', blob, file.name); // Append the blob with the filename
        formData.append('input_string', inputString); // Append the input string to the form data
        formData.append('username', username); // Append username to the form data
        formData.append('password', password); // Append password to the form data

        setLoading(true); // Set loading state to true
        try {
          const response = await axios.post('http://127.0.0.1:8000/UploadExcelAnotatedData/', formData, {
            headers: {
              'Content-Type': 'multipart/form-data', // Set Content-Type to multipart/form-data
            },
          });
          console.log('File uploaded successfully:', response.data);
          setApiResponse(response.data); // Update apiResponse state with API response
        } catch (error) {
          console.error('Error uploading file:', error);
          setApiResponse(null); // Clear apiResponse state on error
        } finally {
          setLoading(false); // Set loading state to false after API call
        }
      }
    };
    reader.readAsText(file); // Read the file as text
  };

  // Function to render the page based on the API response
  const renderContent = () => {
    if (loading) {
      return <p>Loading...</p>; // Display loading message
    }

    if (apiResponse) {
      console.log("Output:-", apiResponse);
      return <TableWithDownload FullData={apiResponse} />; // Display the table with download after file upload
    }

    // Default content when there's no response
    return (
      <div>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)} // Update username state
          placeholder="Enter username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Update password state
          placeholder="Enter password"
        />
        <input
          type="text"
          value={inputString}
          onChange={(e) => setInputString(e.target.value)} // Update input string state
          placeholder="Enter input string"
        />
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
        >
          Upload CSV
          <VisuallyHiddenInput
            type="file"
            onChange={handleFileChange}
            accept=".csv"
          />
        </Button>
        <Button
          variant="contained"
          onClick={handleUpload}
          disabled={!file || !username || !password} // Disable if no file, username, or password
        >
          Submit
        </Button>
      </div>
    );
  };

  return (
    <div>
      {renderContent()} {/* Render content based on API response */}
    </div>
  );
}
