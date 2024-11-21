import React from 'react'
import DoneAllIcon from '@mui/icons-material/DoneAll';
import PropTypes from 'prop-types';
import { Box, Checkbox, FormControlLabel, Paper, Switch, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow } from '@mui/material';
import { TableHeadWithCheckboxAndOrderBy } from './CustomTablesComponents/TableHeadWithCheckboxAndOrderBy';
import { CheckboxTableToolBar } from './CustomTablesComponents/CheckboxTableToolBar';
import ClearIcon from '@mui/icons-material/Clear';

// data = {studies} headTags = {["", ""]} rowTags = {["",""]} defaultOrderBy = {""}

const CustomTableWithCheckbox = ({
  data,
  headCells,
  defaultOrderBy,
  itemsPerPage,
  title,
  checkedOptionComponent,
  uncheckedOptionComponent,
  setSelectedStudies,
}) => {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState(defaultOrderBy);
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(itemsPerPage);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = data.map((n) => n);
      console.log("test newSelected : ", newSelected);
      setSelected(newSelected);
      setSelectedStudies(newSelected);
      return;
    }
    setSelectedStudies([]);
    setSelected([]);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    console.log("test newSelected : ", newSelected);
    setSelected(newSelected);
    setSelectedStudies(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };


  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;


  const visibleRows = React.useMemo(
    () =>
      [...data]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, data],
  );


  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>

        <CheckboxTableToolBar
          numSelected={selected.length}
          title={title}
          checkedOptionComponent={checkedOptionComponent}
          uncheckedOptionComponent={uncheckedOptionComponent}
        />

        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <TableHeadWithCheckboxAndOrderBy
              headCells={headCells}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
            />


            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = selected.includes(row);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row._id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    {
                      headCells.map((item) => {
                        return (
                          <TableCell
                            key={item.id}
                            align={item.numeric ? "left" : "center"}
                          >
                            {typeof row[item.id] !== "boolean" ? row[item.id] : row[item.id] ? <DoneAllIcon /> : <ClearIcon/>}
                          </TableCell>
                        )
                      })
                    }
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}

export default CustomTableWithCheckbox


CustomTableWithCheckbox.propTypes = {
  data: PropTypes.array.isRequired, // array
  headCells: PropTypes.array.isRequired, // array of strings
  defaultOrderBy: PropTypes.string.isRequired, // string
  itemsPerPage: PropTypes.number.isRequired, // number
  title: PropTypes.string.isRequired,
  checkedOptionComponent: PropTypes.element.isRequired,
  uncheckedOptionComponent: PropTypes.element.isRequired,
  setSelectedStudies: PropTypes.func.isRequired,
};


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}