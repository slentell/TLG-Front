import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import TimelineIcon from '@mui/icons-material/Timeline';
import ChatIcon from '@mui/icons-material/Chat';


const Section = () => {


  const sectionItems = [
    {
      id: 1,
      icon: <ManageAccountsIcon sx={{ fontSize: 100 }} color="primary" />,
      sentence:
        'Providing coaches a team management application',
    },
    {
      id: 2,
      icon: <TimelineIcon sx={{ fontSize: 100 }} color="primary" />,
      sentence:
        'Track personal lift progress',
    },
    {
      id: 3,
      icon: <ChatIcon sx={{ fontSize: 100 }} color="primary" />,
      sentence: 'Foster team building by providing in-app communication!',
    },
  ];
  return (
    <Box sx={{ flexGrow: 1, minHeight: '400px' }}>
      <Grid container sx={{display: 'flex', justifyContent:'space-around'}}>
        {sectionItems.map((item) => (
          <Grid
            item
            xs={12}
            mt={10}
            md={3.5}
            minHeight={300}
            key={item.id}
            sx={{ backgroundColor:'lightgray', borderRadius: '30px'}}
            
          >
            {item.icon}
            <Typography sx ={{ backgroundColor: 'whitesmoke'}}>{item.sentence}</Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Section;