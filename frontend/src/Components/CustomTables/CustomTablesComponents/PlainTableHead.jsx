import { styled, TableCell, tableCellClasses, TableHead, TableRow } from '@mui/material'
import PropTypes from 'prop-types';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const PlainTableHead = ({ headCells }) => {
    console.log("head cells :", headCells);
    return (
        <TableHead>
            <TableRow>
                {headCells.map((item) => (
                    <StyledTableCell key={item.id} align={item.align}>{item["label"]}</StyledTableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

PlainTableHead.propTypes = {
    headCells: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            align: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired, 
        })
    ).isRequired,
};

export default PlainTableHead