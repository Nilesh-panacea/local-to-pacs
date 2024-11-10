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
            <TableCell>SOP Instance ID</TableCell>
            <TableCell align="right">StudyID</TableCell>
            <TableCell align="right">SeriesID</TableCell>
            <TableCell align="right">Path</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.sopInstanceId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.sopInstanceId}
              </TableCell>
              <TableCell align="right">{row.studyId}</TableCell>
              <TableCell align="right">{row.seriesId}</TableCell>
              <TableCell align="right">{row.path}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
