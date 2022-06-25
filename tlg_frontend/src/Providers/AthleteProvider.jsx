import React, { useState, useEffect, createContext, useContext } from "react";

const axios = require("axios");
const AthletesContext = createContext({});

export const useAthletes = () => useContext(AthletesContext);

export const AthletesProvider = ({ children }) => {
  const [athletes, setAthletes] = useState([]);

  const athletesCalls = async (method, endpoint = "", dataPayload = null) => {
    try {
      const payload = {
        method: method,
        headers: {
          authorization: `JWT ${localStorage.getItem("access")}`,
        },
      };

      payload.url = endpoint
        ? `${process.env.REACT_APP_API_URL}/tlg/athlete/${endpoint}`
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

  const handleAthleteSubmit = async (athleteData) => {
    try {
      console.log("i made it in!")
      const data = await athletesCalls("post", "", athleteData);
      console.log("AthleteData: ", data);
    } catch (e) {
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
      }}
    >
      {children}
    </AthletesContext.Provider>
  );
};
