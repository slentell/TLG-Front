import { SignalCellularNullRounded } from "@mui/icons-material";
import React, { useState, useEffect, createContext, useContext } from "react";

const axios = require("axios");
const AthletesContext = createContext({});

export const useAthletes = () => useContext(AthletesContext);

export const AthletesProvider = ({ children }) => {
  const [athletes, setAthletes] = useState([]);
  const [individualAthlete, setIndividualAthlete] = useState('')

  const athletesCalls = async (method, endpoint = "", dataPayload = null) => {
    try {
      const payload = {
        method: method,
        headers: {
          authorization: `JWT ${localStorage.getItem("access")}`,
        },
      };
      console.log('this is the end: ',endpoint)
      payload.url = endpoint
        ? `${process.env.REACT_APP_API_URL}/tlg/athlete/${endpoint}/`
        : `${process.env.REACT_APP_API_URL}/tlg/athlete/`;
      if (dataPayload) {
        payload.data = dataPayload;
      }
      const { data } = await axios(payload);
      return data;
    } catch (error) {
        console.error(`Error ${method} call for Athletes`, error.message);
    }
  };

  const handleAthleteUpdate = async (athleteData, id) => {
    console.log('athlete Data:', athleteData);
    try {
      console.log("i made it in!")
      console.log('athlete data id', id)
      const data = await athletesCalls("put", id , athleteData);
      console.log("AthleteData: ", data);
    } catch (e) {
      console.log("There's an error", e);
    }
  }

  const handleAthleteSubmit = async (athleteData) => {
    console.log('athlete Data:', athleteData);
    try {
      console.log("i made it in!")
      const data = await athletesCalls("post", "", athleteData);
      console.log("AthleteData: ", data);
    } catch (e) {
      console.log("There's an error", e);
    }
  };

  const getAthleteInfo = async (athleteID) => {
    try {
      console.log("i made it in!", athleteID)
      if (individualAthlete.length === 0) {
        const data = await athletesCalls("get", athleteID, null)
        console.log("athlete Info ", data)
        setIndividualAthlete(data)
      }
  }
    catch (e) {
      console.log("There's an error", e);
    }
  };

  useEffect(() => {
    const getAllAthletes = async () => {
      try {
        const response = await athletesCalls("get");
        if (response.length !== athletes.length) {
          setAthletes(response);
        }
      } catch (error) {
        console.error("Error fetching api data", error);
      }
    };
    // console.log(athletes)
    getAllAthletes();
  }, [athletes]);

  return (
    <AthletesContext.Provider
      value={{
        athletes, 
        setAthletes, 
        handleAthleteSubmit,
        getAthleteInfo,
        individualAthlete,
        handleAthleteUpdate,
      }}
    >
      {children}
    </AthletesContext.Provider>
  );
};
