import { useEffect, useState } from "react";
// import CustomTableWithCheckbox from "./CustomTables/CustomTableWithCheckbox";
import { getTransferJobs } from "../services/api";
import { headCellsTransferJobs } from "../utils/tableHeadersData";
// import CheckedOptionComponentForTransferJobs from "./CustomTables/CustomTablesComponents/CheckedOptionComponentForTransferJobs";
import CustomTableWithRowClickModal from "./CustomTables/CustomTableWithRowClickModal";
import { Button, Modal, Typography } from "@mui/material";
import PropTypes from "prop-types";


const RowModal = ({ openModal, handleCloseModal, selectedRow }) => {
    // const [job, setJob] = useState(selectedRow);
    console.log({selectedRow});
    // const getJob = async (id) => {
    //     const response = await getPacsJobById(id);
    //     if (response.status === 200) {
    //         setJob(response.data);
    //     }
    // }
    // useEffect(() => {
    //     if (selectedRow && selectedRow.ID) { // Ensure selectedRow and selectedRow.ID exist
    //         getJob(selectedRow.ID);
    //     }
    // }, [selectedRow]);
    const handleRetry = async (id) => {
        console.log({id});
        // const response = await resubmitPacsJobById(id);
        // if (response.status === 200) {
        //     alert("Job resubmitted successfully !!");
        //     handleCloseModal();
        // }
    }
    return (
        <Modal open={openModal} onClose={handleCloseModal}>
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                padding: 20,
                backgroundColor: 'white',
                margin: 'auto',
                width: '50%'
            }}>
                {selectedRow && (
                    <>
                        <Typography variant="h6">Row Details</Typography>
                        <Typography variant="body1">ID: {selectedRow._id}</Typography>
                        <Typography variant="body1">Pacs Id: {selectedRow.pacsJobId}</Typography>
                        <Typography variant="body1">State: {selectedRow.status}</Typography>

                        <Typography variant="body1">Resources:</Typography>
                        {selectedRow?.studies.map((item, index) => (
                            <Typography key={index} variant="body2" style={{ marginLeft: 16 }}>
                                {item}
                            </Typography>
                        ))}

                        {/* Conditionally show button if State is "Failure" */}
                        {(selectedRow.status === 'upload-failed' || selectedRow.status === 'transfer-failed') && (
                            <Button variant="contained" color="secondary" onClick={() => handleRetry(selectedRow._id)}>
                                Retry
                            </Button>
                        )}
                    </>
                )}
            </div>
        </Modal>
    );
};

RowModal.propTypes = {
    openModal: PropTypes.bool.isRequired,          // openModal should be a boolean (React state)
    handleCloseModal: PropTypes.func.isRequired,   // handleCloseModal should be a function
    selectedRow: PropTypes.object,      // selectedRow should be an object
};




const TransferJobs = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const getTransferJobsData = async () => {
            const response = await getTransferJobs();
            // if (response.status === 200) {
            console.log("test ---->>> ", response.data);
            setJobs(response.data);
            // }
        }
        getTransferJobsData();
    }, [])

    return <>
        <CustomTableWithRowClickModal
                    data={jobs}
                    headCells={headCellsTransferJobs}
                    defaultOrderBy={"pacsJobId"}
                    itemsPerPage={10}
                    rowModal={(openModal, handleCloseModal, selectedRow) => (
                        <RowModal
                            openModal={openModal}
                            handleCloseModal={handleCloseModal}
                            selectedRow={selectedRow}
                        />
                    )}
                />
    </>
}

export default TransferJobs;