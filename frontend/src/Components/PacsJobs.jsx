import { useEffect, useState } from 'react'
import CustomTableWithRowClickModal from './CustomTables/CustomTableWithRowClickModal'
import { getPacsJobById, getPacsJobs, resubmitPacsJobById } from '../services/api';
import PropTypes from 'prop-types';
import { Button, Modal, Typography } from '@mui/material';
import { headCellsPacs } from '../utils/tableHeadersData';


const RowModal = ({ openModal, handleCloseModal, selectedRow }) => {
    const [job, setJob] = useState({});
    const getJob = async (id) => {
        const response = await getPacsJobById(id);
        if (response.status === 200) {
            setJob(response.data);
        }
    }
    useEffect(() => {
        if (selectedRow && selectedRow.ID) { // Ensure selectedRow and selectedRow.ID exist
            getJob(selectedRow.ID);
        }
    }, [selectedRow]);
    const handleRetry = async (id) => {
        const response = await resubmitPacsJobById(id);
        if (response.status === 200) {
            alert("Job resubmitted successfully !!");
            handleCloseModal();
        }
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
                {job && (
                    <>
                        <Typography variant="h6">Row Details</Typography>
                        <Typography variant="body1">ID: {job.ID}</Typography>
                        <Typography variant="body1">Type: {job.Type}</Typography>
                        <Typography variant="body1">Progress: {job.Progress}</Typography>
                        <Typography variant="body1">State: {job.State}</Typography>
                        <Typography variant="body1">Studies count : {job?.Content?.ParentResources?.length}</Typography>

                        <Typography variant="body1">Resources:</Typography>
                        {job?.Content?.ParentResources.map((item, index) => (
                            <Typography key={index} variant="body2" style={{ marginLeft: 16 }}>
                                {item}
                            </Typography>
                        ))}

                        {/* Conditionally show button if State is "Failure" */}
                        {job.State === 'Failure' && (
                            <Button variant="contained" color="secondary" onClick={() => handleRetry(job.ID)}>
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
    selectedRow: PropTypes.object.isRequired,      // selectedRow should be an object
};
const PacsJobs = () => {
    const [jobs, setJobs] = useState([]);
    const getData = async () => {
        const response = await getPacsJobs();
        if (response.status === 200) {
            console.log("row data : ", response.data);
            setJobs(response.data);
        }
    }
    useEffect(() => {
        getData();
    }, []);
    return (
        <CustomTableWithRowClickModal
            data={jobs}
            headCells={headCellsPacs}
            defaultOrderBy={"date"}
            itemsPerPage={10}
            rowModal={(openModal, handleCloseModal, selectedRow) => (
                <RowModal
                    openModal={openModal}
                    handleCloseModal={handleCloseModal}
                    selectedRow={selectedRow}
                />
            )}
        />
    )
}

export default PacsJobs