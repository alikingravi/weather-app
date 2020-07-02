import React, { createContext, useReducer, useEffect } from "react";
import { userReducer } from "../reducers/userReducer";
export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [user, dispatch] = useReducer(userReducer, null, () => {
    const localData = localStorage.getItem("user");
    return localData ? JSON.parse(localData) : null;
  });
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider value={{ user, dispatch }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
