import React, { useState } from "react";
import {
  Typography,
  FormLabel,
  Box,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Button,
  Grid,
  Alert,
} from "@mui/material";

import { useLifts } from "../../Providers/LiftProvider";
import "../../../src/index.css";
import "./AddLift.css"
import moment from 'moment'
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";


const Form = () => {
  const [submittedStatus, setSubmittedStatus] = React.useState(null);
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [formValues, setFormValues] = useState({
    lift: "clean",
    weight: 100,
    date_of_lift: new Date(),
  });

  const { handleLiftSubmit } = useLifts();

  const handleInputChange = (e) => {
    // if input is date, there is no e.target
    console.log("e is ", e);
    if (!e.target) {
      const date = e;
      console.log("WHAT I THINK THE DATE IS", date)
      const newDate = moment(date).format("YYYY-MM-DD")
      console.log("WHAT THE DATE SHOULD BECOME", newDate)

      setFormValues({
        ...formValues,
        // ["date_of_lift"]: `${yyyy}-${mm}-${dd}`,
        ['date_of_lift']: newDate
      });
      console.log("date  inside if ", formValues.date_of_lift);
    }
    // if input is not date, need to access target property
    else {
      const { name, value } = e.target;
      setFormValues({
        ...formValues,
        [name]: value,
      });
    }
    console.log("after conditionals ", formValues.date_of_lift);
  };
  const displaySubmitMessage = () => {
    console.log(typeof submittedStatus, submittedStatus);
    return (
      <Alert
        severity={submittedStatus}
        onClose={() => {
          setAlertOpen(false);
        }}
      >
        {" "}
        {submittedStatus === "success"
          ? "Your lift was saved !"
          : "Your lift was not saved. Please try again"}
      </Alert>
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isSubmitted = await handleLiftSubmit(formValues);
    setAlertOpen(true);
    setSubmittedStatus(isSubmitted);
  };

  return (
    <div className="add-lift-box">
      <Box
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
          backgroundColor: "background.paper",
          mt: "150px",
          borderRadius: "30px",
          width: "50%",
          m: 15,
        }}
        noValidate
        autoComplete="off"
      >
        <Grid container alignItems="center" justify="center" direction="column">
          <Grid item sx={{ mt: 2 }}>
            <Typography sx={{fontFamily: "Alice"}} variant="h3">Log your lift sesh here</Typography>
          </Grid>
          <form onSubmit={handleSubmit}>
            <Grid item sx={{ m: 1 }} align="center">
              <FormControl>
                <FormLabel id="lift">Select a lift</FormLabel>
                <Select
                  name="lift"
                  value={formValues.lift}
                  label="Select a Lift"
                  onChange={handleInputChange}
                  sx={{fontFamily: "Alice"}}
                >
                  <MenuItem sx={{fontFamily: "Alice"}} value="clean">Clean</MenuItem>
                  <MenuItem sx={{fontFamily: "Alice"}} value="clean_jerk">Clean & Jerk</MenuItem>
                  <MenuItem sx={{fontFamily: "Alice"}} value="snatch">Snatch</MenuItem>
                  <MenuItem sx={{fontFamily: "Alice"}} value="bench">Bench</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item sx={{ m: 1 }}>
              <TextField
                id="weight-input"
                name="weight"
                label="Weight"
                type="number"
                InputProps={{ inputProps: { min: 1, max: 250 }}}
                value={formValues.weight}
                onChange={handleInputChange}
                sx={{fontFamily: "Alice", }}
              />
            </Grid>
            <Grid item sx={{ m: 1 }}>
              <FormControl name="date_of_lift">
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DesktopDatePicker
                    label="Date of Lift"
                    inputFormat="MM/DD/yyyy"
                    value={formValues['date_of_lift']}
                    onChange={(e) => {handleInputChange(e)}}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid>
            <Grid item sx={{ mb: 2 }} align="center">
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </Grid>
          </form>
          {alertOpen && displaySubmitMessage()}
        </Grid>
      </Box>
    </div>
  );
};
export default Form;
