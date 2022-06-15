import React from 'react'
import { Tab, Box, Tabs } from '@mui/material'
import ViewAllAthletes from '../components/ViewAllAthletes/ViewAllAthletes';
import AthleteMaxList from '../components/AthleteMaxList/AthleteMaxList';
import Posts from '../components/Posts/Posts';
import { Container } from '@mui/system';





const CoachDashboard = () => {


  const [value, setValue] = React.useState('athletes');

  const handleChange = (event, newValue) => {
    event.preventDefault()
    setValue(newValue);
  };

  return (
    <div>
    <Container>
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="athletes" value='athletes' />
          <Tab label="Progress" value='progress' />
          <Tab label="More stuff" value='posts' />
        </Tabs>
      </Box>
      </Container>
      {value === 'athletes' &&
    <div>
      <Container>
        <Box>
          <h1>Team Roster</h1>
        </Box>
      </Container>
      <Container> 
      <ViewAllAthletes /> 
      </Container>
      </div>
    }
      {value === 'progress' &&
    <div> 
      <Container>
        <Box>
          <h1>Team Max</h1>
        </Box>
      </Container>
      <Container>
      <AthleteMaxList />
      </Container>
    </div>
    }
      {value === 'posts' &&
    <div> 
      <Container>
        <Posts />
      </Container>
    </div>
    }
    </div>

  )
}

export default CoachDashboard