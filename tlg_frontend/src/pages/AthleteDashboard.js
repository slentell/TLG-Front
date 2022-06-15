import React from 'react'
import { Tab, Box, Tabs } from '@mui/material'
import ViewAthleteDetail from '../components/ViewAthleteDetail/ViewAthleteDetail';
import { Container } from '@mui/system';

const AthleteDashboard = () => {

  const [value, setValue] = React.useState('blog');

  const handleChange = (event, newValue) => {
    event.preventDefault()
    setValue(newValue);
  };

  return (
    <div>
    <Container>
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
        <Tab label="Blog" value='blog' />
        <Tab label="Progress" value='progress' />
        <Tab label="Athlete" value='athlete' />
        <Tab label="More stuff" value='1' />
        </Tabs>
      </Box>
      </Container>
      {value === 'blog' &&
    <div> Blog things </div>
    }
      {value === 'progress' &&
    <div> Progress and graphs </div>
    }
      {value === 'athlete' &&
    <div> <ViewAthleteDetail /> </div>
    }
      {value === '1' &&
    <div> Look at all this stuff </div>
    }
    </div>

  )
}

export default AthleteDashboard