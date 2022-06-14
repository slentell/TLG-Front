import React from 'react'
import { DataGrid } from '@mui/x-data-grid'

const ViewAllAthletes = () => {
  return (
    <DataGrid 
    columns={[
      {
        field: 'name',
        headerName: 'Athlete Name',
        description: "Athlete's first and last name"
      },
      {
        field: 'grade',
        headerName: 'Grade',
        description: "Athlete grade"
    },
    {
      field: 'weightclass',
      headerName: 'Weight Class',
      description: "Athlete's weight class"
    }

    ]}
    
    />
  )
}

export default ViewAllAthletes