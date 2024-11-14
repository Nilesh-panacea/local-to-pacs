import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';

export default function BasicTextFields() {
  // Use useState to manage the input values
  const [outlinedValue, setOutlinedValue] = React.useState('');
  const [filledValue, setFilledValue] = React.useState('');
  const [standardValue, setStandardValue] = React.useState('');
  const [age, setAge] = React.useState('');

  // Handle input change
  const handleOutlinedChange = (event) => setOutlinedValue(event.target.value);
  const handleFilledChange = (event) => setFilledValue(event.target.value);
  const handleStandardChange = (event) => setStandardValue(event.target.value);
  const handleChange = (event) => setAge(event.target.value);

  // Log values for demonstration
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("age:-",age);
    console.log('Outlined:', outlinedValue);
    console.log('Filled:', filledValue);
    console.log('Standard:', standardValue);
  };

  return (
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit} // To handle form submission
    >
      <TextField
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
        value={outlinedValue}
        onChange={handleOutlinedChange}
      />
      <TextField
        id="filled-basic"
        label="Filled"
        variant="filled"
        value={filledValue}
        onChange={handleFilledChange}
      />
      <TextField
        id="standard-basic"
        label="Standard"
        variant="standard"
        value={standardValue}
        onChange={handleStandardChange}
      />
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Submit
      </Button>
    </Box>
  );
}
