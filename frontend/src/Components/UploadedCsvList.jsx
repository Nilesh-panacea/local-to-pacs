import PropTypes from 'prop-types';
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useState } from 'react';
import axios from 'axios';

const PostRequestComponent = ({ CSVPath, data }) => {
    console.log(CSVPath);
    console.log(data);

    const columns = [
        { field: 'PatientID', headerName: 'Patient ID', width: 180 },
    ];

    const rows = [];
    for (let i = 0; i < data.length; i++) {
        rows.push({ id: i, PatientID: data[i] });
    }

    const [selectedRows, setSelectedRows] = useState([]);
    const paginationModel = { page: 0, pageSize: 5 };

    const handleCreateJob = async () => {
        // alert(`Create job for selected rows: ${selectedRows.join(', ')}`);
        console.log("Inside Create job");
        console.log("CSV path",CSVPath);
        console.log("data:-",data);
        console.log("Selected rows:-",selectedRows);
        const PatientIds = [];
        for(let i=0;i<selectedRows.length;i++){
            PatientIds.push(data[selectedRows[i]]);
        }
        const response = await axios.post('http://127.0.0.1:8000/CreateJobToDownloadFromDCM4CHEE/', {
            CSVPath,
            PatientIds,
        });
        console.log('Response:', response.data);

        // Add logic to create a new job with selected rows here
    };

    return (
        <div>
            <Paper sx={{ height: 400, width: '100%', marginBottom: 2 }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    onRowSelectionModelChange={(newSelection) => setSelectedRows(newSelection)}
                    sx={{ border: 0 }}
                />
            </Paper>
            {selectedRows.length > 0 && (
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleCreateJob}
                >
                    Create New Job
                </Button>
            )}
        </div>
    );
};

PostRequestComponent.propTypes = {
    CSVPath: PropTypes.string,  // Ensure CSVPath is a string
    data: PropTypes.array,  // This can be any type as per your requirement
};

export default PostRequestComponent;
