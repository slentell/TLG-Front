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
  IconButton,
} from "@mui/material";
import { useSelector } from "react-redux";

import AddPhotoAlternateTwoToneIcon from "@mui/icons-material/AddPhotoAlternateTwoTone";
import { useTeam } from "../../Providers/TeamProvider";
import { AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useAthletes } from "../../Providers/AthleteProvider";
import moment from "moment";

import { useEffect } from "react";
import axios from "axios";


let defaultValues = {
  grade: "",
  gender: "",
  weight: 0,
  dob: "",
  team: 0,
  profile_picture: "",
};

const UpdateProfile = () => {
  // context handlers
  const {user: currentUser, isAuthenticated: auth} = useSelector((state) => state.auth);
  const { athletes, handleAthleteSubmit, getAthleteInfo, individualAthlete, handleAthleteUpdate } = useAthletes();
  const { team } = useTeam();


  // this components state
  // const [date, setDate] = useState(new Date());

  const [formValues, setFormValues] = useState(defaultValues);
  const [imgUpload, setImgUpload] = useState(false);
  const [img, setImg] = useState(null);


  // const [athleteData, setAthleteData] = useAthletes()
  // console.log(athletes)
  // console.log(currentUser)
  // let currentAthlete = athletes.map(athlete => athlete.athlete === currentUser.id)
  // const getCurrentAthlete = () => {
  //   let currentAthlete = athletes.map(athlete => {
  //     if (athlete.athlete === currentUser.id) {
  //       let currentAthlete = athlete
      //  console.log('current athlete',currentAthlete)
      //   return athlete
      // }
      
useEffect(() => {
  if (currentUser) {
    getAthleteInfo(currentUser.id)
    console.log(individualAthlete)
    if (individualAthlete) {
      setFormValues({
      grade:individualAthlete.grade,
      gender:individualAthlete.gender,
      weight:individualAthlete.weight,
      dob: individualAthlete.dob,
      team: individualAthlete.team
      })
      
  }
    else {
      setFormValues(defaultValues)
    }
}
}, [currentUser, getAthleteInfo, individualAthlete])


  
  // console.log(currentAthlete)
  // defaultValues = {
  //   grade:currentAthlete.grade,
  //   gender: currentAthlete.gender,
  //   weight: currentAthlete.weight,
  //   dob: currentAthlete.dob,
  //   team: currentAthlete.team
  // };
//   console.log("default values", defaultValues)
// }
  

  
  // useEffect(() => {
  //   getCurrentAthlete()
  // }
  // , [])


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
    console.log('form values:', formValues)
    if (individualAthlete) {
      console.log("updating athlete")
      console.log('individual:',individualAthlete)
      await handleAthleteUpdate(formValues, individualAthlete.id)
      console.log('id:',individualAthlete.id)
    } else {
      console.log("creating athlete")
      await handleAthleteSubmit(formValues);
  };
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
            <Grid>
              <FormControl>
                <FormLabel
                style={{ display: "flex", justifyContent: "center", marginTop: '10px'}}
                >
                  Upload a Profile Picture
                </FormLabel>
                  <IconButton onClick={() => setImgUpload((val) => !val)}>
                  <AddPhotoAlternateTwoToneIcon />
                </IconButton>
              </FormControl>
            </Grid>
            <Grid>
              {imgUpload && (
                <input
                  accept="image/*"
                  type="file"
                  id="select-image"
                  onChange={(e) => {setImg(e.target.files[0].name)}}
                />
              )}
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
