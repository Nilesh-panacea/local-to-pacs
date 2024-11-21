import React, { useState, useEffect } from 'react';
import './CSS/ThreeSectionLayout.css';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';

import InputFileUpload from './UploadCsvDcm4Chee';
import PostRequestComponent from './UploadedCsvList';






const ThreeSectionLayout = () => {
    const [selectedValue, setSelectedValue] = useState('');  // Initialize with an empty string
    const [showTable, setShowTable] = useState(false);
    const [CSVData, setCSVData] = useState("");
    const [changedCSV, setChangedCSV] = useState(false);
    const [csvList, setCSVList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [SelectedCSVPath, setSelectedCSVPath] = useState('');


    const handleSubmit = async (CSVLocalPath) => {
        try {
          console.log("Third column sending request");
          console.log("Selected csv path:-",CSVLocalPath);
          const response = await axios.post('http://127.0.0.1:8000/GetDataInCSV/', {
                // Include the data you want to send in the POST request body
                // CSVPath: CSVPath,
                CsvPath:CSVLocalPath,
                // title: "dskhfk",
                // description: "Job description here."
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }); 
            
          // axios automatically parses JSON responses, so use response.data directly
          console.log("response.data:-",response.data['patient_ids']);
          setCSVData(response.data['patient_ids']);
          setChangedCSV(true);
        } catch (error) {
          console.error('Error:', error);
          setCSVData({ error: 'An error occurred' });
          setChangedCSV(true);

        }
      };
    const GetCSVList = async () => {
        try {
            setLoading(true);
            const response = await axios.post('http://127.0.0.1:8000/GetUploadedCSVsList/', {
                title: "New Job",
                description: "Job description here."
            });
            setCSVList(response.data.CSV_List);
        } catch (error) {
            console.error('Error:', error);
            setCSVList([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        GetCSVList();  // Fetch CSV list when the component mounts
    }, []);

    // useEffect(() => {
    //     if (selectedValue) {
    //         console.log('Selected value:-',selectedValue);
    //         console.log('CSV path value:-',csvList[selectedValue]['LocalPath']);
    //         // Handle the change when selectedValue changes
    //         setChangedCSV(true); // Trigger state change based on value
    //         setSelectedCSVPath(csvList[selectedValue]['LocalPath'])
    //     }
    // }, [selectedValue,csvList]);  // This will run when selectedValue changes

    const handleChange = (event) => {
        const newValue = event.target.value;
        console.log("Inside handleChange");
        // console.log("newValue:-",newValue);
        setSelectedValue(newValue); // Set the selected value
        console.log("newValue:-",newValue);
        // setChangedCSV(true);
        console.log("Local path:-",csvList[newValue]['LocalPath']);
        setSelectedCSVPath(csvList[newValue]['LocalPath']);
        handleSubmit(csvList[newValue]['LocalPath']);
    };

    return (
        <div className="three-section-container">
            <div className="top-row">
                <div className="section left">
                    <InputFileUpload spiResponse={setShowTable} />
                </div>
                <div className="section right">
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="select-label">Uploaded CSV</InputLabel>
                            <Select
                                labelId="select-label"
                                id="select"
                                value={selectedValue || ''}  // Ensure value is never undefined
                                label="Uploaded CSV"
                                onChange={handleChange}
                            >
                                {loading ? (
                                    <MenuItem value="" disabled>Loading...</MenuItem>
                                ) : csvList.length > 0 ? (
                                    csvList.map((item, index) => (
                                        <MenuItem key={index} value={item.id}>
                                            {item.CSV_Name}
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem value="" disabled>No CSVs Available</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </Box>
                </div>
            </div>
            <div className="bottom-row">
                <div className="section middle">
                    {changedCSV && <PostRequestComponent CSVPath = {SelectedCSVPath} data = {CSVData} />}
                </div>
            </div>
        </div>
    );
};

export default ThreeSectionLayout;
