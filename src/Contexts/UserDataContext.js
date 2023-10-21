import React, { createContext, useState, useContext, useEffect } from "react";
import { db } from "../Firebase";
import { getDocs, collection } from "firebase/firestore";

const UserDataContext = createContext();

export function UserDataProvider({ children }) {
  const [fetchData, setFetchData] = useState("");

  const dbref = collection(db, "USERDATA");
  const fetch = async () => {
    const snapshot = await getDocs(dbref);
    const fetchdata = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setFetchData(fetchdata);
  };
  useEffect(() => {
    fetch();
  }, []);

  return (
    <UserDataContext.Provider value={{ fetchData, setFetchData, dbref }}>
      {children}
    </UserDataContext.Provider>
  );
}

export function useUserData() {
  return useContext(UserDataContext);
}
