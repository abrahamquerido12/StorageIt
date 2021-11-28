import React, { useContext, useEffect, useState } from "react";
import Activity from "../Components/Dashboard/Activity/Activity";
import QuickAcces from "../Components/Dashboard/QuickAcces/QuickAcces";
import Recent from "../Components/Dashboard/Recent/Recent";
import Navbar from "../Components/Navigation/Navbar";
import { collection, doc, getDocs, query, where } from "firebase/firestore";

import { db } from "../firebase.config";
import MiniDrawer from "../Components/MaterialUi/SideBar";
import { AuthContext } from "../AuthCtx";
import { FilesContext } from "../FilesCtx";
import DocResultInfo from "../Components/Navigation/DocResultInfo";

export default function Home() {
  const { user, userData } = useContext(AuthContext);
  const { files, getFiles } = useContext(FilesContext);
  const [quickFiles, setQuickFiles] = useState([]);

  const [selectedFile, setSelectedFile] = React.useState<any>({});

  const [openDocInfo, setOpenDocInfo] = React.useState(false);
  const handleDocInfoOpen = () => setOpenDocInfo(true);

  const handleSelectedFile = (file) => {
    setSelectedFile(file);

    setOpenDocInfo(true);
  };

  const handleDocInfoClose = () => {
    setSelectedFile({});
    setOpenDocInfo(false);
  };

  const getQuickAccessFiles = async () => {
    var files = [];

    setQuickFiles(userData.quickAccessFiles);
  };

  useEffect(() => {
    if (!user) return;
    getFiles();
    getQuickAccessFiles();
  }, [user]);
  useEffect(() => {
    if (!user) return;
    getFiles();
    getQuickAccessFiles();
  }, [userData]);

  return (
    <div className="home">
      <div className="home__container">
        {quickFiles && (
          <QuickAcces
            quickFiles={quickFiles}
            handleSelectedFile={handleSelectedFile}
          />
        )}
        <div className="recent-activity-container">
          <Recent files={files} getQuickAccessFiles={getQuickAccessFiles} />
          <Activity />
        </div>
      </div>
      <DocResultInfo
        handleDocInfoClose={handleDocInfoClose}
        file={selectedFile}
        openDocInfo={openDocInfo}
        setOpenDocInfo={setOpenDocInfo}
      />
    </div>
  );
}
