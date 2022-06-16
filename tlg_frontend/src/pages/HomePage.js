

import {Container, Typography, Box }  from '@mui/material'
import React from 'react'
import Hero from '../components/Hero/Hero'
import Section from '../components/Section/Section'

const HomePage = () => {
  return (
    <>
    
    
    <Container sx={{
            backgroundColor: "lightgray", mt: '150px', borderRadius: '30px'
          }}>
    <Hero />
    </Container>
    <Container style={{display: 'flex', justifyContent: 'center'}}>
            <Typography variant="h3" sx={{color:'whitesmoke'}}>
              What can TLG do for you and your team?
            </Typography>
          </Container>
    <Container >
      <Section />
    </Container>
           
           
           

      </>
  )
}

export default HomePage