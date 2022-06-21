import React, { useState, useEffect, createContext, useContext } from 'react';

const axios = require('axios');
const AthletesContext = createContext({});

export const useAthletes = () => useContext(AthletesContext);

export const AthletesProvider = ({ children }) => {
  const [athletes, setAthletes] = useState([]);
  useEffect(() => {
    const getAllAthletes = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/tlg/athlete/`, {
          headers: {
            authorization:`JWT ${localStorage.getItem('access')}`,
          },
        });
   
        if (response.length !== athletes.length) {
          setAthletes(response);
        }
    } catch(error) {
    console.error('Error fetching api data', error);
  }
}
  getAllAthletes();
  }, [athletes]);
  
  return (
    <AthletesContext.Provider value={[athletes, setAthletes]}>
      {children}
    </AthletesContext.Provider>
  );
}