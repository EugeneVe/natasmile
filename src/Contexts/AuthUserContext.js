import React, { createContext, useState, useContext } from "react";

const AuthUserContext = createContext();

export function AuthUserProvider({ children }) {
  const [authUser, setAuthUser] = useState(false);

  const userExist = () => {
    setAuthUser(true);
  };

  const userNotExist = () => {
    setAuthUser(false);
  };

  return (
    <AuthUserContext.Provider value={{ authUser, userExist, userNotExist }}>
      {children}
    </AuthUserContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthUserContext);
}
