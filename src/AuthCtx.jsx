import { onAuthStateChanged } from "@firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "./firebase.config";
import { helperFunctions } from "./Utils/helpers";
export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState({});

  const getData = async (uid) => {
    const data = await helperFunctions.GetUserData(uid);
    setUserData({ ...data });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        getData(user.uid);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, userData, getData }}>
      {children}
    </AuthContext.Provider>
  );
}
