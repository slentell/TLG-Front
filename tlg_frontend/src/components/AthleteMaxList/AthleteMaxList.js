import React from 'react'
import { DataGrid } from '@mui/x-data-grid';

const AthleteMaxList = () => {
  return (
     <div style={{ height: 300, width: '100%' }}>
    <DataGrid columns={[{ field: 'name', headerName: 'Athlete Name', width: 250 }, { field: 'lift1', headerName: 'Clean', width: 250}, { field: 'lift2', headerName: 'Clean & Jerk', width: 200}, { field: 'lift3', headerName: 'Bench', width: 250 }, { field: 'lift4', headerName: 'Snatch', width: 250 }]}
        rows={[
          { id: 1, name : 'Swole Pikachu', lift1 : '125', lift2: '130', lift3: '200', lift4: '200'  },
          { id: 2, name : 'UltraSwole Charmander', lift1 : '200', lift2: '260', lift3: '300', lift4: '250'  },
        ]}
    />
    </div>
  )
}
  


export default AthleteMaxList