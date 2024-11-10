import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function BasicTable1({ rows }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Patient ID</TableCell>
            <TableCell align="right">Study ID</TableCell>
            <TableCell align="right">Created Date</TableCell>
            <TableCell align="right">Modified Date</TableCell>
            <TableCell align="right">No. of DCM Files</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.patientId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.patientId}
              </TableCell>
              <TableCell align="right">{row.studyId}</TableCell>
              <TableCell align="right">{row.createdDate}</TableCell>
              <TableCell align="right">{row.modifiedDate}</TableCell>
              <TableCell align="right">{row.noOfDcmFiles}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
