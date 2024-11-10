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
            <TableCell>Study ID</TableCell>
            <TableCell align="right">No. of CT</TableCell>
            <TableCell align="right">No. of Seg</TableCell>
            <TableCell align="right">No. of MR</TableCell>
            <TableCell align="right">No. of SR</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.studyId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.studyId}
              </TableCell>
              <TableCell align="right">{row.noOfCT}</TableCell>
              <TableCell align="right">{row.noOfSeg}</TableCell>
              <TableCell align="right">{row.noOfMR}</TableCell>
              <TableCell align="right">{row.noOfSr}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
