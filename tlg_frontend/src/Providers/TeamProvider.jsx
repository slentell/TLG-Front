import React, { useState, createContext, useContext } from "react";
import axios from "axios";
const TeamContext = createContext({});

export const useTeams = () => useContext(TeamContext);

export const TeamProvider = ({ children }) => {
  // state for the Team and axios calls
  const [teams, setTeams] = useState([]);

  const teamCalls = async (method, endpoint = "", dataPayload = null) => {
    try {
      const payload = {
        method: method,
        headers: {
          authorization: `JWT ${localStorage.getItem("access")}`,
        },
      };
      payload.url = endpoint
        ? `${process.env.REACT_APP_API_URL}/tlg/team/${endpoint}`
        : `${process.env.REACT_APP_API_URL}/tlg/team/`;
      if (dataPayload) {
        payload.data = dataPayload;
      }
      const { data } = await axios(payload);
      return data;
    } catch (error) {
      console.error(`Error ${method} call for Teams`, error.message);
    }
  };
  const getAllTeams = async () => {
    try {
      const data = await teamCalls("get");
      if (data.length !== teams.length) {
        setTeams(data);
      }
    } catch (error) {
      console.error("Error fetching teams", error);
    }
  }

  const handleTeamSubmit = async (teamData) => {
    try {
      const data = await teamCalls("post", "", teamData);
      console.log(data);
    } catch (e) {
      console.log("There's an error", e);
    }
  };

  return (
    <TeamContext.Provider 
      value={{ 
        teams, 
        setTeams, 
        handleTeamSubmit,
        }}
      >
        {children}
    </TeamContext.Provider>
  );
};
