import React, { useContext } from "react";
import { FilesContext } from "../../../FilesCtx";
import DocCard from "./DocCard";

export default function QuickAcces({ quickFiles, handleSelectedFile }) {
  const { files } = useContext(FilesContext);
  return (
    <div className="quick-access">
      <h2>Acceso Rápido</h2>
      <div className="quick-access__docs-container">
        {quickFiles.map((quickFile) => (
          <DocCard
            handleSelectedFile={handleSelectedFile}
            file={files.filter((file) => file.uid === quickFile)}
          />
        ))}
      </div>
    </div>
  );
}
