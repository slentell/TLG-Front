import React, { useEffect } from "react";
import { Tab, Box, Tabs } from "@mui/material";
import ViewAllAthletes from "../components/ViewAllAthletes/ViewAllAthletes";
import AthleteMaxList from "../components/AthleteMaxList/AthleteMaxList";
import Posts from "../components/Posts/Posts";
import { Container } from "@mui/system";
import liftAPI from '../api/liftApi'


const CoachDashboard = () => {
  const [value, setValue] = React.useState("athletes");

  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
  };

  useEffect(() => {

    const getTeamLiftHistory = async (team_id) => {
      const data = await liftAPI.fetchTeamLiftHistory(team_id)
      console.log(data)
    }
    getTeamLiftHistory(1)
  }, [])

  return (
    <div>
      <Container>
        <Box sx={{ borderBottom: 1, borderColor: "divider", backgroundColor: "whitesmoke" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="athletes" value="athletes" />
            <Tab label="Progress" value="progress" />
            <Tab label="More stuff" value="posts" />
          </Tabs>
        </Box>
      </Container>
      {value === "athletes" && (
        <div>
          <Container>
            <Box>
              <h1>Team Roster</h1>
            </Box>
          </Container>
          <Container sx={{
            backgroundColor: "whitesmoke"
          }}>
            <ViewAllAthletes />
          </Container>
        </div>
      )}
      {value === "progress" && (
        <div>
          <Container>
            <Box>
              <h1>Team Max</h1>
            </Box>
          </Container>
          <Container>
            <AthleteMaxList />
          </Container>
        </div>
      )}
      {value === "posts" && (
        <div>
          <Container>
            <Box>
              <h1>From the Coach</h1>
            </Box>
           
            <Posts />
          </Container>
        </div>
      )}
    </div>
  );
};

export default CoachDashboard;
