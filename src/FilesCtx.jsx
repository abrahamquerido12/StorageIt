import { onAuthStateChanged } from "@firebase/auth";
import { collection, getDocs } from "@firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthCtx";
import { db } from "./firebase.config";
import { helperFunctions } from "./Utils/helpers";
export const FilesContext = createContext();

export default function FilesProvider({ children }) {
  const [files, setFiles] = useState([]);
  const { user, userData } = useContext(AuthContext);

  const getFiles = async () => {
    if (!user) return;
    var filesArr = [];
    const { userLevel } = userData;

    const querySnapshot = await getDocs(collection(db, `/files`));
    querySnapshot.forEach(async (doc) => {
      // doc.data() is never undefined for query doc snapshots
      switch (userLevel) {
        case 1:
          if (doc.data().userId === user.uid) {
            filesArr.push({
              uid: doc.id,
              ...doc.data(),
            });
          }
          break;
        case 2:
          if (doc.data().userLevel < 2 || doc.data().userId === user.uid) {
            filesArr.push({
              uid: doc.id,
              ...doc.data(),
            });
          }
          break;
        case 3:
          filesArr.push({
            uid: doc.id,
            ...doc.data(),
          });
          break;

        default:
          break;
      }
    });

    setFiles(filesArr);
  };

  useEffect(() => {
    getFiles();
  }, []);

  return (
    <FilesContext.Provider value={{ files, setFiles, getFiles }}>
      {children}
    </FilesContext.Provider>
  );
}
