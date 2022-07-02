import React, { useState, createContext, useContext, useEffect } from "react";
import { useSelector } from "react-redux";


const UserTypeContext = createContext({});

export const useUserType = () => useContext(UserTypeContext);
export const UserTypeProvider = ({ children }) => {
  // state for the UserType and axios calls
  const [coachUser, setCoachUser] = useState(false);
  const [athleteUser, setAthleteUser] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setCoachUser(currentUser.account_type === 2);
      setAthleteUser(currentUser.account_type === 1);
    }
  }, [currentUser]);

  return (
    <UserTypeContext.Provider
      value={{
        coachUser,
        setCoachUser,
        athleteUser,
        setAthleteUser,
        currentUser,
        auth,
        setAuth,
      }}
    >
      {children}
    </UserTypeContext.Provider>
  );
}