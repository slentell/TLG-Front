import React from 'react'
import { Box, Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'

import { useBellRinger } from '../../Providers/BellringerProvider'



const BellRinger = () => {
  const { bellRinger } = useBellRinger();
  console.log('bellRinger:', bellRinger)
  return (
    <Box>
      <Container>
        <Typography variant='h1'>
          Bell Ringers
        </Typography>
        <Container>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Athlete Name </TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Weight</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          {bellRinger ? bellRinger.map((lift) => (
           
            <TableRow
              key={lift.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{lift.athlete.first_name + ' ' + lift.athlete.last_name}</TableCell>
              <TableCell align="right">{lift.max_lift.lift}</TableCell>
              <TableCell align="right">{lift.max_lift.weight}</TableCell>
             
            </TableRow>
          )) : <>Loading</>}
        </TableBody>
      </Table>
    </TableContainer>
  
        </Container>
      </Container>
    </Box>
    

  )
}

export default BellRinger