import { Box, Button, CircularProgress, FormControl, IconButton, InputLabel, List, ListItem, ListItemText, MenuItem, Modal, Select, Tooltip, Typography } from "@mui/material"
import PropTypes from "prop-types";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useEffect, useState } from "react";
import { getPacsModalities, transferToModality } from "../../../services/api";

const CheckedOptionComponentForPacsStudies = ({ selectedStudies }) => {
    console.log("selected studies : ", selectedStudies);
    return (
        <>
            <Tooltip title="Transfer Studies">
                <IconButton>
                    <TransferedStudiesModal selectedStudies={selectedStudies} />
                </IconButton>
            </Tooltip>
        </>
    )
}

const TransferedStudiesModal = ({ selectedStudies }) => {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [modalities, setModalities] = useState([]);
    const [selectedModality, setSelectedModality] = useState('');

    useEffect(() => {
        const addModalities = async () => {
            const response = await getPacsModalities();
            if (response.status === 200) {
                console.log("modalities: ", response.data);
                setModalities(response.data);
            }
        };
        addModalities();
    }, []);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setIsLoading(false); // Reset loading state when closing
    };

    const handleModalityChange = (event) => {
        setSelectedModality(event.target.value);
    };

    const onTransfer = async () => {
        setIsLoading(true); // Set loading to true when transfer starts
        try {
            console.log("transferring to modality:", selectedModality);
            // Simulate async operation (e.g., API call)
            const resources = selectedStudies.map((study)=>(study.ID));
            console.log("resources : ", resources);
            const aet = selectedModality;
            const response = await transferToModality(resources, aet);
            if(response.status === 201){
                console.log("response. data : ", response.data);
                console.alert("Studies transferred Successfully");
            }
        } catch (error) {
            console.error("Error during transfer:", error);
        } finally {
            setIsLoading(false); // Set loading to false after completion
            handleClose();
        }
    };

    return (
        <>
            <FileUploadIcon onClick={handleOpen} sx={{ cursor: 'pointer' }} />
            <Modal open={open} onClose={handleClose} aria-labelledby="transfer-modal-title">
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
                    <Typography id="transfer-modal-title" variant="h6" component="h2">
                        Transfer Studies
                    </Typography>

                    <Typography variant="body2" sx={{ mt: 2, mb: 2 }}>
                        You have selected {selectedStudies.length} studies for transfer. Please review and confirm.
                    </Typography>

                    <List sx={{ maxHeight: '50vh', overflow: 'auto' }} dense>
                        {selectedStudies.map((study, index) => (
                            <ListItem key={index}>
                                <ListItemText
                                    primary={`Patient Name: ${study.patientName}`}
                                />
                            </ListItem>
                        ))}
                    </List>

                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel id="modality-select-label">Select Modality</InputLabel>
                        <Select

                            labelId="modality-select-label"
                            id="modality-select"
                            value={selectedModality}
                            label="Select Modality"
                            onChange={handleModalityChange}
                        >
                            {modalities.map((modality, index) => (
                                <MenuItem key={index} value={modality}>
                                    {modality}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                        {isLoading ? (
                            <CircularProgress />
                        ) : (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={onTransfer}
                                disabled={!selectedModality} // Disable if no modality is selected
                            >
                                Confirm Transfer
                            </Button>
                        )}
                        <Button variant="outlined" color="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

TransferedStudiesModal.propTypes = {
    selectedStudies: PropTypes.arrayOf(PropTypes.object).isRequired,
};



CheckedOptionComponentForPacsStudies.propTypes = {
    selectedStudies: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default CheckedOptionComponentForPacsStudies