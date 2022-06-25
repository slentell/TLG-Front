import React, { useState } from "react";
import {
  Grid,
  TextField,
  FormControlLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Button,
  Box,
  Typography,
  Container,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import { useTeam } from "../../Providers/TeamProvider";
import { AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useAthletes } from "../../Providers/AthleteProvider";
import moment from "moment";
import axios from "axios";

const defaultValues = {
  grade: "",
  gender: "",
  weight: 0,
  dob: "",
  team: 0
};

const UpdateProfile = () => {
  // context handlers
  const { handleAthleteSubmit } = useAthletes("GET");
  const { team } = useTeam();
  // this components state
  // const [date, setDate] = useState(new Date());
  const [formValues, setFormValues] = useState(defaultValues);
  const [athleteData, setAthleteData] = useAthletes()
  // event handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  
  const handleChange = (date) => {
    console.log("WHAT I THINK THE DATE IS", date)
    const newDate = moment(date).format("YYYY-MM-DD")
    console.log("WHAT THE DATE SHOULD BECOME", newDate)
    setFormValues({
      ...formValues,
      dob: newDate,
    });
  };

  const handleTeamSelect = (e) => setFormValues({...formValues, team: e.target.value})

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formValues)
    handleAthleteSubmit(formValues);
  };

  return (
    <Box>
      <Typography
        style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
        variant="h3"
      >
        Update Your Profile
      </Typography>
      <Container
        sx={{
          backgroundColor: "lightgray",
          mt: "80px",
          borderRadius: "30px",
          width: "50%",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid
            container
            alignItems="center"
            justify="center"
            direction="column"
          >
            <Grid sx={{ mt: "20px" }} item style={{ width: "200px" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Grade</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="grade"
                  value={formValues.grade}
                  label="Grade"
                  onChange={handleInputChange}
                >
                  <MenuItem value="Freshman">Freshman</MenuItem>
                  <MenuItem value="Sophomore">Sophomore</MenuItem>
                  <MenuItem value="Junior">Junior</MenuItem>
                  <MenuItem value="Senior">Senior</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid sx={{ mt: "20px" }} item>
              <TextField
                id="weight-input"
                name="weight"
                label="Weight"
                type="number"
                value={formValues.weight}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid sx={{ mt: "20px" }} item>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DesktopDatePicker
                  label="Birthday"
                  inputFormat="MM/DD/yyyy"
                  value={formValues.dob}
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid sx={{ mt: "20px" }} item>
              <FormControl>
                <FormLabel
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  Gender
                </FormLabel>
                <RadioGroup
                  name="gender"
                  value={formValues.gender}
                  onChange={handleInputChange}
                  row
                >
                  <FormControlLabel
                    key="male"
                    value="M"
                    control={<Radio size="small" />}
                    label="Male"
                  />
                  <FormControlLabel
                    key="female"
                    value="F"
                    control={<Radio size="small" />}
                    label="Female"
                  />
                </RadioGroup>
                <FormLabel
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  Team
                </FormLabel>
                <select 
                  onChange={handleTeamSelect}
                  name="team"
                  value={formValues.team}
                  label="Team"
                  >
                  <option value="Select a Team"> -- Team Name -- </option>
                  {team.map((team, idx) => <option key={idx} value={team.id}>{team.team_name}</option>)}
                </select> 
              </FormControl>
            </Grid>

            <Button
              variant="contained"
              sx={{ mt: "20px", mb: "10px" }}
              style={{ backgroundColor: "black" }}
              type="submit"
            >
              Submit
            </Button>
          </Grid>
        </form>
      </Container>
    </Box>
  );
};

export default UpdateProfile;
