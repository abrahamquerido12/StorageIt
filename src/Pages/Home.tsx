import React, { useEffect, useState } from "react";
import Activity from "../Components/Dashboard/Activity/Activity";
import QuickAcces from "../Components/Dashboard/QuickAcces/QuickAcces";
import Recent from "../Components/Dashboard/Recent/Recent";
import Navbar from "../Components/Navigation/Navbar";
import Sidebar from "../Components/Navigation/Sidebar.jsx";
import { collection, doc, getDocs } from "firebase/firestore";

import { db } from "../firebase.config";

export default function Home() {
  const [files, setFiles] = useState([]);

  const getFiles = async () => {
    var files = [];
    const querySnapshot = await getDocs(collection(db, "files"));
    console.log(querySnapshot);

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      files.push({ uid: doc.id, ...doc.data() });
    });

    setFiles(files);
  };

  useEffect(() => {
    getFiles();
  }, []);

  return (
    <div className="home">
      <Sidebar getFiles={getFiles} />
      <div className="home__container">
        <Navbar />

        <QuickAcces />

        <div className="recent-activity-container">
          <Recent files={files} />
          <Activity />
        </div>
      </div>
    </div>
  );
}
