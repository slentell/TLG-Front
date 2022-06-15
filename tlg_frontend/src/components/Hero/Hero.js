import React from 'react'
import {Box, Grid, Typography, Button, Container} from '@mui/material'

const Hero = () => {
  return (
    <Box >
      <Grid container spacing={6} >
        <Grid item xs={12} md={7}>
          <Typography variant="h3" >
            Through the Lifting Glass
          </Typography>
          <Typography variant="h6" >
            What this app is...
           
          </Typography>

          <Container>
          <Button
            variant="contained"
            color="primary"
            sx={{ width: '200px', fontSize: '16px' }}
          >
            REGISTER
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{ width: '200px', fontSize: '16px' }}
          >
            Sign in
          </Button>
          </Container>
        </Grid>
        <Grid item xs={12} md={5} style={{display:'flex', justifyContent:'center', alignItems: "center"}}>
          <img style={{objectFit: 'contain', marginRight: '25px', marginTop: '-45px', paddingBottom: '10px', paddingTop: '7px', borderRadius: '30px'}} src={'https://images.unsplash.com/photo-1434754205268-ad3b5f549b11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MnwxMDUyMjAxM3x8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60'} alt="Lifting Mirror" />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Hero