import React from 'react'
import { Grid, Typography, Box, Container, Button, Icon  } from '@mui/material';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import ImageIcon from '@mui/icons-material/Image';
import TimelineIcon from '@mui/icons-material/Timeline';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
const AthleteDash = () => {
  
  const athleteNav = [
    {
      id: 1,
      image: 'https://cdn-icons.flaticon.com/png/512/3201/premium/3201671.png?token=exp=1656958966~hmac=8d6316860fdfbc05bf164a246eb96396',
      name: 'Personal Info',
      description: 'View and edit your personal information',
      button: 'Go to profile',

      path: '/update-profile',
    
    },
    {
      id: 2,
      image: 'https://cdn-icons.flaticon.com/png/512/2112/premium/2112333.png?token=exp=1656958930~hmac=71b58bc16a6a4dcc76330abbcfedd6a6',
      name: 'Log a Lift',
      description: 'Log your lift',
      button: 'Log a lift',
      path: '/add-lift-session',
    },
    {
      id: 3,
      image: 'https://cdn-icons.flaticon.com/png/512/3647/premium/3647724.png?token=exp=1656958769~hmac=6a497df42ad4b13ca5f77d7349834b90',
      name: 'Lift History',
      description: 'View your lift history',
      button: 'Go To Progress',
      path: '/progress',
    },
    {
      id: 4,
      image: 'https://cdn-icons.flaticon.com/png/512/2058/premium/2058148.png?token=exp=1656958634~hmac=ad5c445dc92dc0e6ce6af8961bb8a816',
      name: 'Bell Ringers',
      description: 'View who is bell ringing ',
      button: 'Go To Bell Ringers',
      path: '/bell-ringers',
    },
    {
      id: 5,
      image: 'https://cdn-icons-png.flaticon.com/512/2659/2659360.png',
      name: 'Image Gallery',
      description: 'View the image gallery',
      button: 'Go To Images',
      path: '/images',
    },
    {
      id: 6,
      image: 'https://cdn-icons.flaticon.com/png/512/2333/premium/2333043.png?token=exp=1656959012~hmac=0ffa4e6fc3c602d5bb6722a5d46ed7a2',
      name: 'Posts',
      description: 'View the posts',
      button: 'Go To Posts',
      path: '/posts',
    },
    {
      id: 7,
      image: 'https://cdn-icons.flaticon.com/png/512/591/premium/591576.png?token=exp=1656959099~hmac=d86a29a0ac1cf1cd06d9627f746e6628',
      name: 'Calendar',
      description: 'View the calendar',
      button: 'Go To Calendar',
      path: '/',
      
    },
    {
      id: 8,
      image: 'https://cdn-icons-png.flaticon.com/512/724/724715.png',
      name: 'Chat',
      description: 'Chat with other athletes',
      button: 'Go To Chat',
      path: '/chat',
    }


  ]
  return (
    <Box sx={{ flexGrow: 1, minHeight: '400px' }}>
      <Grid container sx={{display: 'flex', justifyContent:'space-around'}}>
        {athleteNav.map((item) => (
          <Grid
            item
            xs={14}
            mt={10}
            md={2.5}
            lg={2.5}
            minHeight={250}
            key={item.id}
            sx={{ backgroundColor:"lightgray", borderRadius: '30px'}}
           
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <img src={item.image} alt='feature' style={{width: '100%', height:'120px'}}/>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="body2">{item.description}</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <Button variant="contained" color="primary" href={item.path}>{item.button}</Button>
                </Box>
              </Box>
            </Box>

      </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AthleteDash