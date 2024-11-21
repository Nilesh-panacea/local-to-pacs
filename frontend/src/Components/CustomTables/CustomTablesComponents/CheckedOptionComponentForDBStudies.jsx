import { useEffect, useState } from 'react';
import UploadIcon from '@mui/icons-material/Upload';
import { Box, Button, Checkbox, CircularProgress, FormControlLabel, IconButton, Modal, Snackbar, Tooltip, Typography } from '@mui/material';
import PropTypes, { } from 'prop-types';
import CachedIcon from '@mui/icons-material/Cached';
import { resolveStudies, uploadStudiesToPacs } from '../../../services/api';
import MuiAlert from '@mui/material/Alert';

const CheckedOptionComponentForDBStudies = ({ selectedStudies }) => {

    useEffect(() => {
        console.log("hiiiii selected Studies : ", selectedStudies);
    }, [selectedStudies])
    return (
        <>
            <Tooltip title="Upload Studies">
                <IconButton>
                    <UploadStudiesModal selectedStudies={selectedStudies} />
                </IconButton>
            </Tooltip>
            <Tooltip title="Resolve Studies">
                <IconButton>
                    <ResolveStudiesModal selectedStudies={selectedStudies} />
                </IconButton>
            </Tooltip>
        </>
    )
}


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
//     display: 'flex',
//     flexDirection: 'column',
//     gap: 2,
//     alignItems: 'center',
// };

const ResolveStudiesModal = ({ selectedStudies }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState('');
    const [snackBarSeverity, setSnackBarSeverity] = useState('success');
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleResolve = async () => {
        setIsLoading(true);
        const patientIds = selectedStudies.filter(study => !study.presentLocaly).map(study => study.patientId);

        try {
            const responses = await resolveStudies(patientIds);
            const successfulCount = responses.filter(response => response.status === 200).length;
            const failedCount = patientIds.length - successfulCount;

            if (successfulCount > 0) {
                setSnackBarMessage(`${successfulCount} studies resolved successfully.`);
                setSnackBarSeverity('success');
            }

            if (failedCount > 0) {
                setSnackBarMessage(`${failedCount} studies failed to resolve.`);
                setSnackBarSeverity('warning');
            }
        } catch (error) {
            setSnackBarMessage("Error occurred while resolving studies.");
            setSnackBarSeverity('error');
        } finally {
            setIsLoading(false);
            setSnackBarOpen(true);
            handleClose();
        }
    };

    const handleSnackBarClose = () => setSnackBarOpen(false);

    return (
        <>
            <CachedIcon onClick={handleOpen} />
            <Modal open={open} onClose={handleClose} aria-labelledby="resolve-modal-title">
                <Box sx={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    width: 400, bgcolor: 'background.paper', p: 4, borderRadius: 2, boxShadow: 24,
                    display: 'flex', flexDirection: 'column'
                }}>
                    <Typography id="resolve-modal-title" variant="h6" component="h2">
                        Resolve Studies
                    </Typography>

                    {isLoading ? (
                        <CircularProgress sx={{ mt: 2 }} />
                    ) : (
                        <>
                            <Typography variant="body2" sx={{ mt: 2, mb: 2 }}>
                                Are you sure you want to resolve the {selectedStudies.length} selected studies?
                            </Typography>

                            <Button variant="contained" color="primary" onClick={handleResolve}>
                                Confirm Resolution
                            </Button>
                            <Button variant="outlined" color="secondary" onClick={handleClose} sx={{ mt: 1 }}>
                                Cancel
                            </Button>
                        </>
                    )}
                </Box>
            </Modal>
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
        </>
    );
};

const UploadStudiesModal = ({ selectedStudies }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState('');
    const [snackBarSeverity, setSnackBarSeverity] = useState('success'); // success, error, info, warning
    const [open, setOpen] = useState(false);
    const [anonymize, setAnonymize] = useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
    };

    const onUploadComplete = async () => {
        // Upload files logic here, e.g., sending files to the backend
        alert('Uploading completed');
        setIsLoading(false);
        handleClose();
        // await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating an upload delay
    };

    const handleUpload = async () => {
        setIsLoading(true);
        const patientIds = selectedStudies.filter((studies) => studies.presentLocaly).map((studies) => studies.patientId);
        const response = await uploadStudiesToPacs({
            patientIds,
            anonymize,
        });
        if (response.status === 200) {
            setSnackBarMessage("Studies Uploaded to PACS successfully !!");
            setSnackBarSeverity("success")
        } else {
            setSnackBarMessage("Something went wrong while uploading the studies");
            setSnackBarSeverity("danger")
        }
        onUploadComplete();
    };

    const handleSnackBarClose = () => {
        setSnackBarOpen(false);
    };

    return (<>
        <UploadIcon onClick={handleOpen} />
        <Modal open={open} onClose={handleClose} aria-labelledby="upload-modal-title">
            <Box sx={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                width: 400, bgcolor: 'background.paper', p: 4, borderRadius: 2, boxShadow: 24,
                display: 'flex', flexDirection: 'column', alignItems: ''
            }}>
                <Typography id="upload-modal-title" variant="h6" component="h2">
                    Upload Studies
                </Typography>

                {isLoading ? (
                    <CircularProgress sx={{ mt: 2 }} />
                ) : (
                    <>
                        <Typography variant="body2" sx={{ mt: 2, mb: 2 }}>
                            Are you sure you want to upload the {selectedStudies.length} selected studies?
                        </Typography>

                        {/* Anonymize Checkbox */}
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={anonymize}
                                    onChange={(e) => setAnonymize(e.target.checked)}
                                    name="anonymize"
                                />
                            }
                            label="Anonymize Studies"
                        />

                        <Button variant="contained" color="primary" onClick={handleUpload}>
                            Confirm Upload
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={handleClose} sx={{ mt: 1 }}>
                            Cancel
                        </Button>
                    </>
                )}
            </Box>
        </Modal>
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
    </>
    );
};

UploadStudiesModal.propTypes = {
    selectedStudies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

ResolveStudiesModal.propTypes = {
    selectedStudies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

CheckedOptionComponentForDBStudies.propTypes = {
    selectedStudies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CheckedOptionComponentForDBStudies