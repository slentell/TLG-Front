import React, { useState, createContext, useContext } from "react";

const axios = require("axios");
const LiftContext = createContext({});

export const useLifts = () => useContext(LiftContext);

export const LiftProvider = ({ children }) => {
  // state for the Lift and axios calls
  const [lifts, setLifts] = useState([]);

  const liftCalls = async (method, endpoint = "", dataPayload = null) => {
    try {
      const payload = {
        method: method,
        headers: {
          authorization: `JWT ${localStorage.getItem("access")}`,
        },
      };
      payload.url = endpoint
        ? `${process.env.REACT_APP_API_URL}/tlg/lift-history/${endpoint}/`
        : `${process.env.REACT_APP_API_URL}/tlg/lift-history/`;
      console.log('payload url ', payload.url);
      if (dataPayload) {
        payload.data = dataPayload;
      }
      const { data } = await axios(payload);
      return data;
    } catch (error) {
        console.error(`Error ${method} call for Lifts`, error.message);
        return error;
    }
  };

  const getLiftHistory = async (currentUser, setStateTrue=false) => {
    console.log('current user inside get lift history', currentUser)
    try {
      const data = await liftCalls("get", currentUser);
      console.log('data inside getLiftHistory ', data)
      
      if (data.length != lifts.length) {
        console.log('lifts have been set')
        setLifts(data)
      }
    } catch (error) {
      console.log("Error fetching lifts ", error)
    }
  }

  const handleLiftUpdate = async (liftData, currentUser) => {
    console.log("initial lift data ", liftData);
    console.log('current user', currentUser)
    try {
      const data = await liftCalls("put", currentUser, liftData);
      // console.log("inside handleLift Submit in lift provider ", data);
      // console.log("status ", data.status);
      setLifts([...lifts, data])
    } catch (error) {
      // console.log("There's an error", error);
    }
  }

  const handleLiftSubmit = async (liftData) => {
    console.log("initial lift data ", liftData);
    let submitted = 'success'
    try {
      const data = await liftCalls("post", "", liftData);
      // console.log("inside handleLift Submit in lift provider ", data);
      if (!data.status) {
        submitted = 'error'
      }
    } catch (error) {
      // console.log("There's an error", error);
      submitted = 'error'
    }
    // console.log('submitted inside handle lift submit ', submitted);
    return submitted;
  };

  const handleLiftDelete = async (liftData, currentUser) => {
    console.log('liftData and user inside delete ', liftData, currentUser)
    try {
      const data = await liftCalls("delete", currentUser, liftData);
      console.log('handle Lift Delete ', data)
    } catch (error) {
      console.log("There's an error", error);
    }
  };
    
  return (
    <LiftContext.Provider
      value={{
        lifts,
        setLifts,
        handleLiftSubmit,
        getLiftHistory,
        handleLiftUpdate,
        handleLiftDelete,
      }}
    >
      {children}
    </LiftContext.Provider>
  );
};
