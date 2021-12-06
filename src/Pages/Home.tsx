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
import Analyze from "../Components/Dashboard/Analyze/Analyze";

export default function Home() {
  const { user, userData } = useContext(AuthContext);
  const { files, getFiles } = useContext(FilesContext);
  const [quickFiles, setQuickFiles] = useState([]);

  const [selectedFile, setSelectedFile] = useState<any>({});

  const [openDocInfo, setOpenDocInfo] = useState(false);
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

  const [openAnalyze, setOpenAnalyze] = useState(false);
  const handleOpenAnalyze = () => setOpenAnalyze(true);
  const handleCloseAnalyze = () => {
    setDocTo(null);
    setOpenAnalyze(false);
  };

  const [docToAnalyze, setDocTo] = useState<any>(null);

  const setDocToAnalyze = (file) => {
    setDocTo(file);
    setOpenAnalyze(true);
  };

  // const docToAnalyze = { id: "9xsEZwS04Jo1r8NTLu0S", name: "prueba.txt" };

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
        <QuickAcces
          quickFiles={quickFiles}
          handleSelectedFile={handleSelectedFile}
        />
        <div className="recent-activity-container">
          <Recent
            setDocToAnalyze={setDocToAnalyze}
            files={files}
            getQuickAccessFiles={getQuickAccessFiles}
          />
          {/* <Activity /> */}
        </div>
      </div>
      <DocResultInfo
        handleDocInfoClose={handleDocInfoClose}
        file={selectedFile}
        openDocInfo={openDocInfo}
        setOpenDocInfo={setOpenDocInfo}
      />
      <Analyze
        docToAnalyze={docToAnalyze}
        openAnalyze={openAnalyze}
        handleCloseAnalyze={handleCloseAnalyze}
        handleOpenAnalyze={handleOpenAnalyze}
      />
    </div>
  );
}
