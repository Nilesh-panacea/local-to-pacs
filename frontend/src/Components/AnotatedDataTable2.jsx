import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function BasicTable2({ rows }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>SOP ID</TableCell>
            <TableCell align="right">Series ID</TableCell>
            <TableCell align="right">Study ID</TableCell>
            <TableCell align="right">Path</TableCell>
            <TableCell align="right">Modality</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.sopId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.sopId}
              </TableCell>
              <TableCell align="right">{row.seriesId}</TableCell>
              <TableCell align="right">{row.studyId}</TableCell>
              <TableCell align="right">{row.path}</TableCell>
              <TableCell align="right">{row.modality}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
