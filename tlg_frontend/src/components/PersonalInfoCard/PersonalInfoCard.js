import React from 'react'
import { Card, CardContent, Typography } from '@mui/material';

const PersonalInfoCard = (props) => {
  
  const {name, address, weightClass } = props

  return (
    
      <CardContent sx={{ width: 400}}>
        <Typography variant="body2">
        Name: {name}
      </Typography>
        <Typography variant="body2">
        Address: {address}
      </Typography>
        <Typography variant="body2">
        Weight Class: {weightClass}
      </Typography>
      </CardContent>

  )
}

export default PersonalInfoCard