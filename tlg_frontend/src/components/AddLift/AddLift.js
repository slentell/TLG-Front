import React from 'react'
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField
} from "@mui/material/";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';





const AddLift = () => {

  const handleSubmit = () => {
    return 
  }

  return (
    <Box
    component="form"
    noValidate
    onSubmit={handleSubmit}
    sx={{ mt: 3, color: 'white' }}
  >
    <FormControl fullWidth>
    <InputLabel id="demo-simple-select-label">Lift</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value=''
        label="Lift"
        // onChange={handleChange}
      >
        <MenuItem value={'Bench Press'}>Bench Press</MenuItem>
        <MenuItem value={'Deadlift'}>Deadlift</MenuItem>
        <MenuItem value={'Power Clean'}>Power Clean</MenuItem>
      </Select>
    </FormControl>
    <TextField
          id="outlined-number"
          label="Weight"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Basic example"
          value=''
          
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
  
  </Box>
  )
}

export default AddLift