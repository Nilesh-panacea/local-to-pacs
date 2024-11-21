import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

// Row component which will fetch and display the history data dynamically
function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [history, setHistory] = React.useState([
    { studyID: 'S001', jobID: '001', startDate: '2024-11-01', status: 'Completed' },
    { studyID: 'S002', jobID: '002', startDate: '2024-11-05', status: 'Pending' },
    { studyID: 'S003', jobID: '003', startDate: '2024-11-10', status: 'In Progress' },
  ]);

  const handleClick = async () => {
    setOpen(!open);
    if (!open) {
      try {
        // Replace this with your actual API call to fetch history for the row
        const response = await fetch(`http://127.0.0.1:8000/api/history/${row.jobID}`);
        const data = await response.json();
        setHistory(data); // Store the fetched history data
      } catch (error) {
        console.error('Failed to fetch history:', error);
      }
    }
  };

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={handleClick}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.jobID}
        </TableCell>
        <TableCell align="right">{row.startDate}</TableCell>
        <TableCell align="right">{row.status}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="history">
                <TableHead>
                  <TableRow>
                    <TableCell>StudyID</TableCell>
                    <TableCell>JobID</TableCell>
                    <TableCell>StartDate</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {history.map((historyRow, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {historyRow.studyID}
                      </TableCell>
                      <TableCell>{historyRow.jobID}</TableCell>
                      <TableCell>{historyRow.startDate}</TableCell>
                      <TableCell>{historyRow.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    jobID: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};

export default function CollapsibleTable() {
  // const rows = [
  //   { jobID: '001', startDate: '2024-11-01', status: 'In Progress' },
  //   { jobID: '002', startDate: '2024-11-05', status: 'Completed' },
  //   { jobID: '003', startDate: '2024-11-10', status: 'Pending' },
  //   // Add more rows as needed
  // ];
  const [rows, setRows] = React.useState([
    { jobID: '001', startDate: '2024-11-01', status: 'In Progress' },
    { jobID: '002', startDate: '2024-11-05', status: 'Completed' },
    { jobID: '003', startDate: '2024-11-10', status: 'Pending' },
  ]);
  
  React.useEffect(() => {
    const fetchRowsData = async () => {
      try {
        // Replace this with your actual API call to fetch the rows data
        const response = await fetch('http://127.0.0.1:8000/api/rows');
        const data = await response.json();
        setRows(data); // Store the fetched rows data
      } catch (error) {
        console.error('Failed to fetch rows:', error);
      }
    };

    fetchRowsData();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>JobID</TableCell>
            <TableCell align="right">StartDate</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.jobID} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
