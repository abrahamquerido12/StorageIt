import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthCtx";
import FilesTable from "../Components/Dashboard/AllFiles/FilesTable";
import { FilesContext } from "../FilesCtx";
import { helperFunctions } from "../Utils/helpers";

export default function AllFiles(): any {
  const { files, getFiles } = useContext(FilesContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getFiles();
  }, []);

  return (
    <div className="all-files">
      <h2>Archivos</h2>
      <div className="all-files__container">
        <FilesTable user={user} files={files} archived={false} />
      </div>
    </div>
  );
}
