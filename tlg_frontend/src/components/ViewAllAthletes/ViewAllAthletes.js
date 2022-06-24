import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useAthletes } from "../../Providers/AthleteProvider";

const ViewAllAthletes = () => {
  const { athletes, setAthletes } = useAthletes([]);

  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid
        columns={[
          { field: "first_name", headerName: "First Name", width: 250 },
          { field: "last_name", headerName: "Last Name", width: 250 },
          { field: "grade", headerName: "Grade", width: 200 },
          { field: "weight_class", headerName: "Weight Class", width: 250 },
        ]}
        rows={[
        {
            id: 1,
            first_name: "Swole ",
            last_name: "Pikachu",
            grade: "9",
            weight_class: "129",
          },       
          
          {
            id: 2,
            first_name: "UltraSwole",
            last_name: "Charmander",
            grade: "12",
            weight_class: "Heavyweight",
          },
        ]}
        components={{ Toolbar: GridToolbar }}
      />
    </div>
  );
};

export default ViewAllAthletes;
