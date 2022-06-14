import React from 'react'
import { Tab, Box, Tabs } from '@mui/material'

const StudentDashboard = () => {

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    event.preventDefault()
    setValue(newValue);
    console.log(newValue)
  };

  return (
    <div>StudentDashboard



    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Item One" value='1' />
          <Tab label="Item Two" value='2' />
          <Tab label="Item Three" value='3' />
        </Tabs>
      </Box>


    </div>

  )
}

export default StudentDashboard