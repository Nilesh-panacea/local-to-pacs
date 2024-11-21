import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PlainTableHead from './CustomTablesComponents/PlainTableHead';
import PropTypes, { object } from 'prop-types'
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { parseCustomTimestamp } from '../../utils/helperFunctions';
import ClearIcon from '@mui/icons-material/Clear';
import { useState } from 'react';

const CustomTableWithRowClickModal = ({ headCells, data, rowModal }) => {
    return (
        <CustomizedTables headCells={headCells} data={data} rowModal={rowModal} />
    )
}

CustomTableWithRowClickModal.propTypes = {
    headCells: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            align: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            // Add other properties as needed
        })
    ).isRequired,
    data: PropTypes.arrayOf(object).isRequired,
    rowModal: PropTypes.element.isRequired,
};
export default CustomTableWithRowClickModal

// import * as React from 'react';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    cursor: 'pointer',
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover, // Light background for odd rows
    },
    // Hide the border on the last row
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function CustomizedTables({ headCells, data, rowModal }) {
    const [openModal, setOpenModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    // Handle row click to open modal and set selected data
    const handleRowClick = (row) => {
        setSelectedRow(row);
        setOpenModal(true);
    };

    // Handle modal close
    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedRow(null);
    };
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <PlainTableHead headCells={headCells} />
                    <TableBody>
                        {data.map((row, index) => (
                            <>
                                <StyledTableRow key={index} onClick={() => handleRowClick(row)}>
                                    {headCells.map((item) => (
                                        <StyledTableCell key={item.id} align={item.align}>
                                            {item.type === "date"
                                                ? parseCustomTimestamp(row[item.id])
                                                : item.type === "state"
                                                    ? row[item.id] === "Success"
                                                        ? <DoneAllIcon /> : <ClearIcon />
                                                    : row[item.id]}
                                        </StyledTableCell>
                                    ))}
                                </StyledTableRow>

                            </>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {rowModal(openModal, handleCloseModal, selectedRow)}
        </>
    );
}

CustomizedTables.propTypes = {
    headCells: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            align: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            // Add other properties as needed
        })
    ).isRequired,
    data: PropTypes.arrayOf(object).isRequired,
    rowModal: PropTypes.element.isRequired,
};