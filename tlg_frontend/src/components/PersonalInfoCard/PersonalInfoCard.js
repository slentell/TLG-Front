import React, { useState } from "react";
import { CardContent, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useAthletes } from "../../Providers/AthleteProvider";
import { useEffect } from "react";

const PersonalInfoCard = () => {
  // const { name, address, weightClass } = props;
  const { user: currentUser } = useSelector((state) => state.auth);
  const { getAthleteInfo, individualAthlete } = useAthletes()
  // const [athleteInfo, setAthleteInfo] = useState([])

  const getAthleteInformation = async () => {
    await getAthleteInfo(currentUser.id)
  }
  useEffect(() => {
    if(currentUser) getAthleteInformation()
}, [currentUser, getAthleteInformation])

  useEffect(()  => {
    getAthleteInformation()
  }, [individualAthlete])
  
  console.log('individualAthlete ', individualAthlete)
  return (
    <CardContent sx={{ width: 400 }}>
      { individualAthlete && 
        <div>
          <Typography variant="body2">Name:{individualAthlete.athlete.first_name} {individualAthlete.athlete.last_name} </Typography>
          <Typography variant="body2">Team: {individualAthlete.team.team_name} </Typography>
          <Typography variant="body2">Grade: {individualAthlete.grade} </Typography>
          <Typography variant="body2">Birthday: {individualAthlete.dob}</Typography>
          <Typography variant="body2">Weight: {individualAthlete.weight}</Typography>
          <Typography variant="body2">Weight Class: {individualAthlete.weightclass}</Typography>
        </div>
      }
    </CardContent>
  );
};

export default PersonalInfoCard;
