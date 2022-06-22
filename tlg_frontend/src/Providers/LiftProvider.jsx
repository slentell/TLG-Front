import React, { useState, createContext, useContext } from "react";

const axios = require("axios");
const LiftContext = createContext({})

export const useLifts = () => useContext(LiftContext)

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
            ? `${process.env.REACT_APP_API_URL}/tlg/lift-history/${endpoint}`
            : `${process.env.REACT_APP_API_URL}/tlg/lift-history/`;
          if (dataPayload) {
            payload.data = dataPayload;
          }
          const { data } = await axios(payload);
          return data;
        } catch (error) {
          console.error(`Error ${method} call for Lifts`, error.message);
        }
    };

    const handleLiftSubmit = async (liftData) => {
        console.log('initial lift data ', liftData);
        try {
          const data = await liftCalls("post", "", liftData);
          console.log('inside handleLift Submit in lift provider ', data);
        //   await getAllPosts();
        } catch (e) {
          console.log("There's an error", e);
        }
    };

    return (
        <LiftContext.Provider
            value={{
                lifts,
                setLifts,
                handleLiftSubmit,
            }}
        >
            {children}
        </LiftContext.Provider>
    )
}

