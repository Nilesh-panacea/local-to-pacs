import { useState } from 'react';
import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';

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

export default function InputFileUpload({ spiResponse }) {
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [ipAddress, setIpAddress] = useState('');
  const [portNumber, setPortNumber] = useState('');
  const [aet, setAET] = useState('');

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file.');
      return;
    }
    if (!ipAddress) {
      alert('Please enter an IP Address.');
      return;
    }
    if (!portNumber) {
      alert('Please enter a Port Number.');
      return;
    }
    if (!aet) {
      alert('Please enter an AET.');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const content = e.target?.result;
      if (content) {
        const blob = new Blob([content], { type: 'text/csv' });
        const formData = new FormData();
        formData.append('file_name', file.name);
        formData.append('content', blob, file.name);
        formData.append('IpAddress', ipAddress);
        formData.append('PortNumber', portNumber);
        formData.append('AET', aet);

        setLoading(true);
        try {
          const response = await axios.post('http://127.0.0.1:8000/Dcm4Chee-upload-file/', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          console.log('File uploaded successfully:', response.data);
          setApiResponse(response.data);
          spiResponse(response.data.rows); // Call the spiResponse callback with response rows
        } catch (error) {
          console.error('Error uploading file:', error);
          setApiResponse(null);
        } finally {
          setLoading(false);
        }
      }
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <VisuallyHiddenInput
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        id="file-upload"
      />
      <label htmlFor="file-upload">
        <Button
          variant="contained"
          component="span"
          startIcon={<CloudUploadIcon />}
        >
          Upload CSV
        </Button>
      </label>

      <div className="" style={{"margin":"10px"}}>
        <input
          type="text"
          placeholder="IP Address"
          value={ipAddress}
          onChange={(e) => setIpAddress(e.target.value)}
          style={{"margin":"10px"}}
        />
        <input
          type="text"
          placeholder="Port Number"
          value={portNumber}
          onChange={(e) => setPortNumber(e.target.value)}
          style={{"margin":"10px"}}
        />
        <input
          type="text"
          placeholder="AET"
          value={aet}
          onChange={(e) => setAET(e.target.value)}
          style={{"margin":"10px"}}
        />
      </div>

      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        disabled={loading}
      >
        {loading ? 'Uploading...' : 'Submit'}
      </Button>

      {apiResponse && (
        <div>
          <p>Upload successful. Check console for details.</p>
        </div>
      )}
    </div>
  );
}
