import React, { useState } from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Button, CircularProgress, FormControl, IconButton, InputLabel, MenuItem, Select, Snackbar, TextField, Tooltip } from '@mui/material';
import PostAddIcon from '@mui/icons-material/PostAdd';
import MuiAlert from '@mui/material/Alert';

const UncheckedOptionComponentForDBStudies = (props) => {
    const { setFilters } = props;
    return (<>
        <Tooltip title="Filter list">
            <IconButton>
                {/* <FilterListIcon /> */}
                <BasicModal onApplyFilter={setFilters} />
            </IconButton>
        </Tooltip>
        <Tooltip title="Add Studies">
            <IconButton>
                {/* <FilterListIcon /> */}
                <CsvUploadModal />
            </IconButton>
        </Tooltip>
    </>
    )
}

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import PropTypes from 'prop-types';

// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
// };


// import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
// import { Box, Button, Modal, TextField, Typography, CircularProgress } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { addStudies } from '../../../services/api';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    alignItems: 'center',
};

const CsvUploadModal = () => {
    const [open, setOpen] = useState(false);
    const [folderPath, setFolderPath] = useState('');
    const [csvFile, setCsvFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState('');
    const [snackBarSeverity, setSnackBarSeverity] = useState('success'); // success, error, info, warning

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setCsvFile(null);
        setFolderPath('');
    };

    const onDrop = (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            setCsvFile(acceptedFiles[0]);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: '.csv',
        multiple: false,
    });

    const handleUpload = async () => {
        setIsLoading(true);
        const formData = new FormData();
        formData.append('studyCSV', csvFile);
        formData.append('studyPath', folderPath);

        try {
            const response = await addStudies(formData);
            if (response.status === 201) {
                setSnackBarMessage("New Studies are uploaded Successfully!!");
                setSnackBarSeverity("success");
            } else if (response.status === 200) {
                setSnackBarMessage("There are no new Studies in the CSV to upload!!");
                setSnackBarSeverity("info");
            }
        } catch (error) {
            console.error('Error uploading CSV:', error);
            setSnackBarMessage('Error uploading CSV. Please try again.');
            setSnackBarSeverity('error');
        } finally {
            setIsLoading(false);
            handleClose();
            setSnackBarOpen(true); // Show Snackbar
        }
    };

    const handleSnackBarClose = () => {
        setSnackBarOpen(false);
    };

    return (
        <div>
            <PostAddIcon onClick={handleOpen} sx={{ cursor: 'pointer' }} />
            <Modal open={open} onClose={handleClose} aria-labelledby="upload-modal-title">
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    alignItems: 'center'
                }}>
                    <Typography id="upload-modal-title" variant="h6" component="h2">
                        Upload CSV and Set Folder Path
                    </Typography>

                    <Box {...getRootProps()} sx={{
                        border: '2px dashed #000',
                        padding: 2,
                        width: '100%',
                        textAlign: 'center',
                        cursor: 'pointer',
                        backgroundColor: isDragActive ? '#f0f0f0' : 'transparent'
                    }}>
                        <input {...getInputProps()} type="file" accept=".csv" />
                        {csvFile ? (
                            <Typography variant="body2">{csvFile.name}</Typography>
                        ) : (
                            <Typography variant="body2">
                                {isDragActive ? 'Drop the file here...' : 'Drag & drop a CSV file here, or click to select'}
                            </Typography>
                        )}
                    </Box>

                    <TextField
                        label="Folder Path"
                        value={folderPath}
                        onChange={(e) => setFolderPath(e.target.value)}
                        fullWidth
                        margin="normal"
                    />

                    {isLoading ? (
                        <CircularProgress sx={{ mt: 2 }} />
                    ) : (
                        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<UploadFileIcon />}
                                onClick={handleUpload}
                                disabled={!csvFile || !folderPath}
                            >
                                Upload
                            </Button>
                            <Button variant="outlined" color="secondary" onClick={handleClose}>
                                Cancel
                            </Button>
                        </Box>
                    )}
                </Box>
            </Modal>

            {/* Snackbar for showing response status */}
            <Snackbar
                open={snackBarOpen}
                autoHideDuration={6000}
                onClose={handleSnackBarClose}
            >
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    severity={snackBarSeverity}
                    onClose={handleSnackBarClose}
                    sx={{ width: '100%' }}
                >
                    {snackBarMessage}
                </MuiAlert>
            </Snackbar>
        </div>
    );
};



// export default CsvUploadModal;



function BasicModal({ onApplyFilter }) {
    const [filters, setFilters] = useState({
        bleed: undefined,  // undefined represents the "Both" option
        uploaded: undefined,
        presentLocaly: undefined,
        bleedSubCategory: 'All',  // 'All' represents no filter on bleedSubCategory
    });

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (event) => {
        const { name, value } = event.target;

        // When "Both" is selected for a checkbox, remove the filter from the state
        if (value === 'Both') {
            setFilters((prevFilters) => {
                const { [name]: _, ...updatedFilters } = prevFilters;
                return updatedFilters;
            });
        } else {
            setFilters({
                ...filters,
                [name]: value, // treat 'All' for bleedSubCategory as no filter
            });
        }
    };

    const handleApplyFilter = () => {
        onApplyFilter({
            ...filters,
            bleedSubCategory: filters.bleedSubCategory === 'All' ? undefined : filters.bleedSubCategory,
        });
        handleClose();
    };
    const handleClearFilter = () => {
        setFilters({
            bleed: undefined,  // undefined represents the "Both" option
            uploaded: undefined,
            presentLocaly: undefined,
            bleedSubCategory: 'All',
        });
        onApplyFilter({});
        handleClose();
    };

    return (
        <div>
            <FilterListIcon onClick={handleOpen} />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="filter-modal-title" variant="h6" component="h2">
                        Apply Filters
                    </Typography>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Bleed</InputLabel>
                        <Select
                            name="bleed"
                            value={filters.bleed ?? 'Both'}
                            onChange={handleChange}
                            label="Bleed"
                        >
                            <MenuItem value={true}>True</MenuItem>
                            <MenuItem value={false}>False</MenuItem>
                            <MenuItem value="Both">Both</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <InputLabel>Uploaded</InputLabel>
                        <Select
                            name="uploaded"
                            value={filters.uploaded ?? 'Both'}
                            onChange={handleChange}
                            label="Uploaded"
                        >
                            <MenuItem value={true}>True</MenuItem>
                            <MenuItem value={false}>False</MenuItem>
                            <MenuItem value="Both">Both</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <InputLabel>Present Locally</InputLabel>
                        <Select
                            name="presentLocaly"
                            value={filters.presentLocaly ?? 'Both'}
                            onChange={handleChange}
                            label="Present Locally"
                        >
                            <MenuItem value={true}>True</MenuItem>
                            <MenuItem value={false}>False</MenuItem>
                            <MenuItem value="Both">Both</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        select
                        label="Bleed Sub Category"
                        name="bleedSubCategory"
                        value={filters.bleedSubCategory}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    >
                        {[
                            "Bleed-Contusion",
                            "Bleed-Epidural",
                            "Bleed-Hematoma",
                            "Bleed-Intraventricular",
                            "Bleed-Subarachnoid",
                            "Bleed-Subdural",
                            "Midline Shift",
                            "All", // Treat "All" as no filter
                        ].map((option) => (
                            <MenuItem key={option} value={option}>
                                {option || "None"}
                            </MenuItem>
                        ))}
                    </TextField>

                    <Box sx={{ display: 'flex', gap: 2, mt: 2, justifyContent: "space-between" }}>
                        <Button variant="contained" color="primary" onClick={handleApplyFilter}>
                            Apply Filter
                        </Button>
                        <Button variant="contained" color="success" onClick={handleClearFilter}>
                            Clear Filter
                        </Button>
                    </Box>

                </Box>
            </Modal>
        </div>
    );
}

BasicModal.propTypes = {
    onApplyFilter: PropTypes.func.isRequired, // Expects a function to update filters
};
UncheckedOptionComponentForDBStudies.propTypes = {
    setFilters: PropTypes.func.isRequired, // Expects a function to update filters
};

export default UncheckedOptionComponentForDBStudies